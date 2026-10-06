import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { getSettings, saveSettings } from '../data/api';
import { Card, Field, PageHead, Tabs, Switch } from '../components/ui';
import useToast from '../../hooks/useToast';

const TABS = ['store', 'payments', 'shipping', 'notifications', 'localization', 'danger'];

const PAYMENT_KEYS = ['codEnabled', 'cardEnabled', 'walletEnabled', 'bankEnabled'];

export default function Settings() {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [settings, setSettings] = useState(null);
  const [tab, setTab] = useState('store');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSettings().then((s) => setSettings(s));
  }, []);

  const patch = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const save = async () => {
    const next = {};
    if (!settings.storeName?.trim()) next.storeName = t('admin.validation.required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.supportEmail || '')) next.supportEmail = t('admin.validation.email');
    if (Number(settings.taxRate) < 0 || Number(settings.taxRate) > 100) next.taxRate = t('admin.validation.range');
    if (Number(settings.freeShippingThreshold) < 0) next.freeShippingThreshold = t('admin.validation.nonnegative');
    setErrors(next);
    if (Object.keys(next).length) {
      notify(t('admin.validation.fixErrors'), 'error');
      return;
    }
    setSaving(true);
    try {
      await saveSettings(settings);
      notify(t('admin.settings.saved'), 'success');
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <>
        <PageHead title={t('admin.settings.title')} description={t('admin.settings.sub')} />
        <div className="admin-skeleton" style={{ height: 320, borderRadius: 14 }} />
      </>
    );
  }

  const num = (key, min = 0) => (
    <input
      id={`set-${key}`}
      className="admin-input"
      type="number"
      dir="ltr"
      min={min}
      value={settings[key] ?? 0}
      onChange={(e) => patch(key, Number(e.target.value))}
    />
  );

  return (
    <>
      <PageHead
        title={t('admin.settings.title')}
        description={t('admin.settings.sub')}
        actions={
          <button type="button" className="admin-btn admin-btn--gold" onClick={save} disabled={!dirty || saving}>
            <Icon name="save" size={15} />
            {saving ? t('common.saving') : t('common.save')}
          </button>
        }
      />

      <div className="admin-stack">
        <Card flush>
          <div className="admin-toolbar">
            <Tabs
              label={t('admin.settings.title')}
              value={tab}
              onChange={setTab}
              tabs={TABS.map((v) => ({ value: v, label: t(`admin.settings.tab_${v}`) }))}
            />
          </div>

          <div className="admin-card__body">
            {tab === 'store' && (
              <div className="admin-formgrid admin-formgrid--2">
                <Field label={t('admin.settings.storeName')} required htmlFor="set-storeName" error={errors.storeName}>
                  <input
                    id="set-storeName"
                    className="admin-input"
                    value={settings.storeName}
                    onChange={(e) => patch('storeName', e.target.value)}
                  />
                </Field>
                <Field label={t('admin.settings.supportEmail')} required htmlFor="set-supportEmail" error={errors.supportEmail}>
                  <input
                    id="set-supportEmail"
                    className="admin-input"
                    type="email"
                    dir="ltr"
                    value={settings.supportEmail}
                    onChange={(e) => patch('supportEmail', e.target.value)}
                  />
                </Field>
                <Field label={t('common.phone')} htmlFor="set-phone">
                  <input
                    id="set-phone"
                    className="admin-input"
                    dir="ltr"
                    value={settings.phone}
                    onChange={(e) => patch('phone', e.target.value)}
                  />
                </Field>
                <Field label={t('admin.settings.address')} htmlFor="set-address">
                  <input
                    id="set-address"
                    className="admin-input"
                    value={settings.address}
                    onChange={(e) => patch('address', e.target.value)}
                  />
                </Field>
                <Field label={t('admin.settings.orderPrefix')} htmlFor="set-orderPrefix" hint={t('admin.settings.orderPrefixHint')}>
                  <input
                    id="set-orderPrefix"
                    className="admin-input"
                    dir="ltr"
                    value={settings.orderPrefix}
                    onChange={(e) => patch('orderPrefix', e.target.value)}
                  />
                </Field>
                <Field label={t('admin.settings.taxRate')} htmlFor="set-taxRate" error={errors.taxRate}>
                  {num('taxRate')}
                </Field>
              </div>
            )}

            {tab === 'payments' && (
              <div className="admin-stack" style={{ gap: 12 }}>
                {PAYMENT_KEYS.map((key) => (
                  <Switch
                    key={key}
                    id={`set-${key}`}
                    label={t(`admin.settings.${key}`)}
                    description={t(`admin.settings.${key}_hint`)}
                    checked={Boolean(settings[key])}
                    onChange={(v) => patch(key, v)}
                  />
                ))}
                <div className="admin-formgrid admin-formgrid--2" style={{ marginTop: 6 }}>
                  <Field label={t('admin.settings.currency')} htmlFor="set-currency">
                    <input
                      id="set-currency"
                      className="admin-input"
                      dir="ltr"
                      value={settings.currency}
                      onChange={(e) => patch('currency', e.target.value)}
                    />
                  </Field>
                  <Field label={t('admin.settings.currencySymbol')} htmlFor="set-currencySymbol">
                    <input
                      id="set-currencySymbol"
                      className="admin-input"
                      value={settings.currencySymbol}
                      onChange={(e) => patch('currencySymbol', e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {tab === 'shipping' && (
              <div className="admin-formgrid admin-formgrid--2">
                <Field label={t('admin.settings.shippingFee')} htmlFor="set-shippingFee">
                  {num('shippingFee')}
                </Field>
                <Field
                  label={t('admin.settings.freeShippingThreshold')}
                  htmlFor="set-freeShippingThreshold"
                  hint={t('admin.settings.freeShippingHint')}
                  error={errors.freeShippingThreshold}
                >
                  {num('freeShippingThreshold')}
                </Field>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="admin-stack" style={{ gap: 12 }}>
                <Switch
                  id="set-emailNotifications"
                  label={t('admin.settings.emailNotifications')}
                  description={t('admin.settings.emailNotifications_hint')}
                  checked={Boolean(settings.emailNotifications)}
                  onChange={(v) => patch('emailNotifications', v)}
                />
                <Switch
                  id="set-whatsappNotifications"
                  label={t('admin.settings.whatsappNotifications')}
                  description={t('admin.settings.whatsappNotifications_hint')}
                  checked={Boolean(settings.whatsappNotifications)}
                  onChange={(v) => patch('whatsappNotifications', v)}
                />
                <Switch
                  id="set-lowStockAlerts"
                  label={t('admin.settings.lowStockAlerts')}
                  description={t('admin.settings.lowStockAlerts_hint')}
                  checked={Boolean(settings.lowStockAlerts)}
                  onChange={(v) => patch('lowStockAlerts', v)}
                />
              </div>
            )}

            {tab === 'localization' && (
              <div className="admin-formgrid admin-formgrid--2">
                <Field label={t('admin.settings.defaultLang')} htmlFor="set-defaultLang" hint={t('admin.settings.defaultLangHint')}>
                  <select
                    id="set-defaultLang"
                    className="admin-select-field"
                    value={settings.defaultLang}
                    onChange={(e) => patch('defaultLang', e.target.value)}
                  >
                    <option value="ar">{t('common.arabic')}</option>
                    <option value="en">{t('common.english')}</option>
                  </select>
                </Field>
              </div>
            )}

            {tab === 'danger' && (
              <div className="admin-stack" style={{ gap: 14 }}>
                <Switch
                  id="set-maintenance"
                  label={t('admin.settings.maintenance')}
                  description={t('admin.settings.maintenance_hint')}
                  checked={Boolean(settings.maintenance)}
                  onChange={(v) => patch('maintenance', v)}
                />
                <div className="admin-inline">
                  <Icon name="alert" size={16} />
                  <p className="admin-muted" style={{ margin: 0, fontSize: 13 }}>
                    {t('admin.settings.maintenanceWarn')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
