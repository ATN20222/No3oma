import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listCoupons, saveCoupon, deleteCoupon } from '../data/api';
import { Badge, Card, EmptyState, Field, Modal, PageHead, SkeletonRows, Switch } from '../components/ui';
import useToast from '../../hooks/useToast';

const money = (n) => new Intl.NumberFormat('en-US').format(n);
const BLANK = {
  id: '',
  code: '',
  type: 'percent',
  value: 10,
  minOrder: 0,
  used: 0,
  limit: 500,
  active: true,
  expires: '2026-12-31',
};

export default function Coupons() {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(() => {
    listCoupons().then((r) => {
      setRows(r);
      setLoading(false);
    });
  }, []);

  useEffect(() => refresh(), [refresh]);

  const openNew = () => setEditing({ ...BLANK });

  const save = async (e) => {
    e.preventDefault();
    const code = (editing.code || '').trim().toUpperCase();
    if (!code) {
      notify(t('admin.validation.required'), 'error');
      return;
    }
    if (Number(editing.value) <= 0 && editing.type !== 'shipping') {
      notify(t('admin.validation.number'), 'error');
      return;
    }
    setSaving(true);
    try {
      await saveCoupon({ ...editing, code });
      notify(t('admin.coupons.saved'), 'success');
      setEditing(null);
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c) => {
    if (!window.confirm(t('admin.coupons.confirmDelete', { code: c.code }))) return;
    await deleteCoupon(c.id);
    notify(t('admin.coupons.deleted'), 'success');
    refresh();
  };

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    if (url.get('new') === '1') openNew();
  }, []);

  const active = rows.filter((r) => r.active).length;

  return (
    <>
      <PageHead
        title={t('admin.coupons.title')}
        description={t('admin.coupons.count', { total: rows.length, active })}
        actions={
          <button type="button" className="admin-btn admin-btn--gold" onClick={openNew}>
            <Icon name="plus" size={16} />
            {t('admin.coupons.new')}
          </button>
        }
      />

      <Card flush>
        {loading ? (
          <SkeletonRows rows={4} />
        ) : rows.length === 0 ? (
          <EmptyState icon="ticket" title={t('admin.coupons.empty')} />
        ) : (
          <div className="admin-rows">
            {rows.map((c) => {
              const pct = Math.min(100, Math.round((c.used / Math.max(1, c.limit)) * 100));
              const expired = new Date(c.expires) < new Date();
              return (
                <div className="admin-row" key={c.id}>
                  <span className="admin-cell-entity__glyph">
                    <Icon name="ticket" size={18} />
                  </span>
                  <div className="admin-row__main">
                    <div className="admin-row__title admin-ltr" style={{ letterSpacing: '.06em' }}>
                      {c.code}
                    </div>
                    <div className="admin-row__meta">
                      <span>
                        {c.type === 'percent'
                          ? `${c.value}%`
                          : c.type === 'shipping'
                            ? t('admin.coupons.type_shipping')
                            : `${money(c.value)}`}
                      </span>
                      <span>
                        {t('admin.coupons.minOrder')}: {money(c.minOrder)}
                      </span>
                      <span>
                        {t('admin.coupons.expires')}: {c.expires}
                      </span>
                      {expired && <Badge tone="danger">{t('admin.coupons.expired')}</Badge>}
                      {!c.active && <Badge tone="warn">{t('admin.coupons.paused')}</Badge>}
                    </div>
                    <div
                      className="admin-progress"
                      style={{ marginTop: 9, maxWidth: 260 }}
                      role="img"
                      aria-label={`${t('admin.coupons.used')}: ${c.used}/${c.limit}`}
                    >
                      <span className="admin-progress__fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="admin-muted" style={{ fontSize: 11.5, display: 'block', marginTop: 5 }}>
                      {c.used}/{c.limit} {t('admin.coupons.used')}
                    </span>
                  </div>
                  <div className="admin-row__side">
                    <div className="admin-inline" style={{ gap: 5 }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--icon"
                        onClick={() => setEditing({ ...c })}
                        aria-label={t('common.edit')}
                      >
                        <Icon name="edit" size={15} />
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--icon admin-btn--danger"
                        onClick={() => remove(c)}
                        aria-label={t('common.delete')}
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(editing)}
        title={editing?.id ? t('admin.coupons.edit') : t('admin.coupons.new')}
        onClose={() => setEditing(null)}
        footer={
          <>
            <button type="button" className="admin-btn" onClick={() => setEditing(null)}>
              {t('common.cancel')}
            </button>
            <button type="submit" form="coupon-form" className="admin-btn admin-btn--gold" disabled={saving}>
              <Icon name="save" size={15} />
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </>
        }
      >
        <form id="coupon-form" onSubmit={save} className="admin-formgrid admin-formgrid--2">
          <Field label={t('admin.coupons.code')} required htmlFor="cp-code">
            <input
              id="cp-code"
              className="admin-input"
              dir="ltr"
              style={{ textTransform: 'uppercase', letterSpacing: '.06em' }}
              value={editing?.code || ''}
              onChange={(e) => setEditing((v) => ({ ...v, code: e.target.value }))}
            />
          </Field>
          <Field label={t('admin.coupons.type')} htmlFor="cp-type">
            <select
              id="cp-type"
              className="admin-select-field"
              value={editing?.type || 'percent'}
              onChange={(e) => setEditing((v) => ({ ...v, type: e.target.value }))}
            >
              <option value="percent">{t('admin.coupons.type_percent')}</option>
              <option value="fixed">{t('admin.coupons.type_fixed')}</option>
              <option value="shipping">{t('admin.coupons.type_shipping')}</option>
            </select>
          </Field>
          <Field label={t('admin.coupons.value')} required htmlFor="cp-value">
            <input
              id="cp-value"
              className="admin-input"
              type="number"
              dir="ltr"
              min="0"
              value={editing?.value ?? 0}
              onChange={(e) => setEditing((v) => ({ ...v, value: Number(e.target.value) }))}
            />
          </Field>
          <Field label={t('admin.coupons.minOrder')} htmlFor="cp-min">
            <input
              id="cp-min"
              className="admin-input"
              type="number"
              dir="ltr"
              min="0"
              value={editing?.minOrder ?? 0}
              onChange={(e) => setEditing((v) => ({ ...v, minOrder: Number(e.target.value) }))}
            />
          </Field>
          <Field label={t('admin.coupons.limit')} htmlFor="cp-limit">
            <input
              id="cp-limit"
              className="admin-input"
              type="number"
              dir="ltr"
              min="1"
              value={editing?.limit ?? 500}
              onChange={(e) => setEditing((v) => ({ ...v, limit: Number(e.target.value) }))}
            />
          </Field>
          <Field label={t('admin.coupons.expires')} htmlFor="cp-expires">
            <input
              id="cp-expires"
              className="admin-input"
              type="date"
              dir="ltr"
              value={editing?.expires || ''}
              onChange={(e) => setEditing((v) => ({ ...v, expires: e.target.value }))}
            />
          </Field>
          <div style={{ gridColumn: '1 / -1' }}>
            <Switch
              id="cp-active"
              label={t('admin.coupons.active')}
              description={t('admin.coupons.activeHint')}
              checked={Boolean(editing?.active)}
              onChange={(v) => setEditing((s) => ({ ...s, active: v }))}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
