import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { getContent, saveContent } from '../data/api';
import { Card, EmptyState, Field, PageHead, Tabs } from '../components/ui';
import useToast from '../../hooks/useToast';

const POLICIES = ['shipping', 'returns', 'privacy', 'terms'];

export default function Policies() {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState('shipping');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    getContent().then((c) => setContent(c));
  }, []);

  const patch = (key, value) => {
    setContent((prev) => ({
      ...prev,
      policies: { ...prev.policies, [tab]: { ...prev.policies[tab], [key]: value } },
    }));
    setDirty(true);
  };

  const addFaq = () => {
    setContent((prev) => ({
      ...prev,
      faq: [...(prev.faq || []), { qAr: '', qEn: '', aAr: '', aEn: '' }],
    }));
    setDirty(true);
  };

  const patchFaq = (i, key, value) => {
    setContent((prev) => {
      const faq = [...prev.faq];
      faq[i] = { ...faq[i], [key]: value };
      return { ...prev, faq };
    });
    setDirty(true);
  };

  const removeFaq = (i) => {
    setContent((prev) => ({ ...prev, faq: prev.faq.filter((_, idx) => idx !== i) }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContent('policies', content.policies);
      await saveContent('faq', content.faq);
      notify(t('admin.policies.saved'), 'success');
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return (
      <>
        <PageHead title={t('admin.policies.title')} description={t('admin.policies.sub')} />
        <div className="admin-skeleton" style={{ height: 300, borderRadius: 14 }} />
      </>
    );
  }

  const policy = content.policies[tab] || {};
  const faq = content.faq || [];

  return (
    <>
      <PageHead
        title={t('admin.policies.title')}
        description={t('admin.policies.sub')}
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
              label={t('admin.policies.title')}
              value={tab}
              onChange={setTab}
              tabs={POLICIES.map((p) => ({ value: p, label: t(`admin.policies.tab_${p}`) }))}
            />
          </div>
          <div className="admin-card__body">
            <div className="admin-formgrid admin-formgrid--2">
              <Field label={`${t(`admin.policies.tab_${tab}`)} — ${t('admin.content.textAr')}`} htmlFor="pol-ar">
                <textarea
                  id="pol-ar"
                  className="admin-textarea"
                  value={policy.ar || ''}
                  onChange={(e) => patch('ar', e.target.value)}
                />
              </Field>
              <Field label={`${t(`admin.policies.tab_${tab}`)} — ${t('admin.content.textEn')}`} htmlFor="pol-en">
                <textarea
                  id="pol-en"
                  className="admin-textarea"
                  dir="ltr"
                  value={policy.en || ''}
                  onChange={(e) => patch('en', e.target.value)}
                />
              </Field>
            </div>
          </div>
        </Card>

        <Card
          title={t('admin.policies.faq')}
          subtitle={t('admin.policies.faqSub')}
          action={
            <button type="button" className="admin-btn admin-btn--sm admin-btn--gold" onClick={addFaq}>
              <Icon name="plus" size={15} />
              {t('admin.policies.addFaq')}
            </button>
          }
          flush
        >
          {faq.length === 0 ? (
            <EmptyState icon="inbox" title={t('admin.policies.noFaq')} />
          ) : (
            <div className="admin-rows">
              {faq.map((item, i) => (
                <div className="admin-row" key={i} style={{ alignItems: 'flex-start' }}>
                  <span className="admin-cell-entity__glyph">
                    <Icon name="info" size={17} />
                  </span>
                  <div className="admin-row__main">
                    <div className="admin-formgrid admin-formgrid--2">
                      <Field label={`${t('admin.policies.qAr')} #${i + 1}`} htmlFor={`faq-q-ar-${i}`}>
                        <input
                          id={`faq-q-ar-${i}`}
                          className="admin-input"
                          value={item.qAr}
                          onChange={(e) => patchFaq(i, 'qAr', e.target.value)}
                        />
                      </Field>
                      <Field label={`${t('admin.policies.qEn')} #${i + 1}`} htmlFor={`faq-q-en-${i}`}>
                        <input
                          id={`faq-q-en-${i}`}
                          className="admin-input"
                          dir="ltr"
                          value={item.qEn}
                          onChange={(e) => patchFaq(i, 'qEn', e.target.value)}
                        />
                      </Field>
                      <Field label={`${t('admin.policies.aAr')} #${i + 1}`} htmlFor={`faq-a-ar-${i}`}>
                        <textarea
                          id={`faq-a-ar-${i}`}
                          className="admin-textarea"
                          style={{ minHeight: 70 }}
                          value={item.aAr}
                          onChange={(e) => patchFaq(i, 'aAr', e.target.value)}
                        />
                      </Field>
                      <Field label={`${t('admin.policies.aEn')} #${i + 1}`} htmlFor={`faq-a-en-${i}`}>
                        <textarea
                          id={`faq-a-en-${i}`}
                          className="admin-textarea"
                          dir="ltr"
                          style={{ minHeight: 70 }}
                          value={item.aEn}
                          onChange={(e) => patchFaq(i, 'aEn', e.target.value)}
                        />
                      </Field>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <button
                      type="button"
                      className="admin-btn admin-btn--sm admin-btn--icon admin-btn--danger"
                      onClick={() => removeFaq(i)}
                      aria-label={t('common.delete')}
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
