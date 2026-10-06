import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { getContent, saveContent } from '../data/api';
import { Card, Field, PageHead, SkeletonRows, Switch } from '../components/ui';
import useToast from '../../hooks/useToast';

/**
 * Homepage / shared content blocks. Every field that appears in the storefront
 * is bilingual, so each block is edited as an AR + EN pair side by side.
 */
const SECTIONS = [
  { id: 'announcement', fields: ['ar', 'en'], toggle: true },
  { id: 'hero', fields: ['eyebrowAr', 'eyebrowEn', 'titleAr', 'titleEn', 'ctaLabelAr', 'ctaLabelEn', 'ctaHref', 'image'], toggle: true },
  { id: 'promo', fields: ['titleAr', 'titleEn', 'href'], toggle: true },
  { id: 'newsletter', fields: ['titleAr', 'titleEn'], toggle: true },
  { id: 'footerAbout', fields: ['ar', 'en'], toggle: false },
];

const LABELS = {
  ar: 'admin.content.textAr',
  en: 'admin.content.textEn',
  eyebrowAr: 'admin.content.eyebrowAr',
  eyebrowEn: 'admin.content.eyebrowEn',
  titleAr: 'admin.content.titleAr',
  titleEn: 'admin.content.titleEn',
  ctaLabelAr: 'admin.content.ctaLabelAr',
  ctaLabelEn: 'admin.content.ctaLabelEn',
  ctaHref: 'admin.content.ctaHref',
  image: 'admin.field.imageUrl',
  href: 'admin.content.href',
  textAr: 'admin.content.textAr',
  textEn: 'admin.content.textEn',
};

export default function Content() {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    getContent().then((c) => setContent({ ...c, hero: { ...c.hero }, footerAbout: { ...c.footerAbout } }));
  }, []);

  const patch = (section, key, value) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    setDirty(true);
  };

  const toggle = (section, next) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], enabled: next } }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      for (const s of SECTIONS) {
        // eslint-disable-next-line no-await-in-loop
        await saveContent(s.id, content[s.id]);
      }
      notify(t('admin.content.saved'), 'success');
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return (
      <>
        <PageHead title={t('admin.content.title')} description={t('admin.content.sub')} />
        <div className="admin-stack">
          <div className="admin-skeleton" style={{ height: 220, borderRadius: 14 }} />
          <div className="admin-skeleton" style={{ height: 260, borderRadius: 14 }} />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHead
        title={t('admin.content.title')}
        description={t('admin.content.sub')}
        actions={
          <button type="button" className="admin-btn admin-btn--gold" onClick={save} disabled={!dirty || saving}>
            <Icon name="save" size={15} />
            {saving ? t('common.saving') : t('common.save')}
          </button>
        }
      />

      <div className="admin-stack">
        {SECTIONS.map((section) => {
          const block = content[section.id];
          if (!block) return null;
          return (
            <Card
              key={section.id}
              title={t(`admin.content.section_${section.id}`)}
              subtitle={t(`admin.content.section_${section.id}_sub`)}
              action={
                section.toggle ? (
                  <Switch
                    id={`sec-${section.id}`}
                    label={t('common.enabled')}
                    checked={Boolean(block.enabled)}
                    onChange={(v) => toggle(section.id, v)}
                  />
                ) : null
              }
            >
              <div className={`admin-formgrid ${section.fields.length > 2 ? 'admin-formgrid--2' : ''}`}>
                {section.fields.map((key) => (
                  <Field
                    key={key}
                    label={t(LABELS[key])}
                    htmlFor={`${section.id}-${key}`}
                    hint={key.endsWith('Ar') || key.endsWith('En') ? undefined : t('admin.content.bilingualHint')}
                  >
                    {key === 'image' ? (
                      <div className="admin-urlfield">
                        <input
                          id={`${section.id}-${key}`}
                          className="admin-input"
                          dir="ltr"
                          value={block[key] || ''}
                          onChange={(e) => patch(section.id, key, e.target.value)}
                        />
                        {block[key] && (
                          <span className="admin-urlfield__preview">
                            <img src={block[key]} alt="" loading="lazy" />
                          </span>
                        )}
                      </div>
                    ) : (
                      <input
                        id={`${section.id}-${key}`}
                        className="admin-input"
                        dir={key.endsWith('En') || key === 'href' || key === 'ctaHref' ? 'ltr' : undefined}
                        value={block[key] || ''}
                        onChange={(e) => patch(section.id, key, e.target.value)}
                      />
                    )}
                  </Field>
                ))}
              </div>
            </Card>
          );
        })}
        <SkeletonRows rows={0} />
      </div>
    </>
  );
}
