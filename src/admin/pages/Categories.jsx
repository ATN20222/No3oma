import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listCategories, saveCategory, deleteCategory } from '../data/api';
import { Badge, Card, EmptyState, Field, PageHead, Modal, Switch } from '../components/ui';
import useToast from '../../hooks/useToast';

const BLANK = { id: '', name: '', nameEn: '', blurb: '', blurbEn: '', image: '', visible: true };

export default function Categories() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [params] = useSearchParams();
  const isAR = i18n.language === 'ar';

  const refresh = useCallback(() => {
    listCategories().then((r) => {
      setRows(r);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openNew = () => setEditing({ ...BLANK });
  const openEdit = (c) => setEditing({ ...c });

  const save = async (e) => {
    e.preventDefault();
    if (!editing.name.trim() || !editing.nameEn.trim()) {
      notify(t('admin.validation.required'), 'error');
      return;
    }
    setSaving(true);
    try {
      await saveCategory(editing);
      notify(t('admin.categories.saved'), 'success');
      setEditing(null);
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c) => {
    if (!window.confirm(t('admin.categories.confirmDelete', { name: isAR ? c.name : c.nameEn }))) return;
    await deleteCategory(c.id);
    notify(t('admin.categories.deleted'), 'success');
    refresh();
  };

  // Allow deep-linking from the overview / inventory shortcuts.
  useEffect(() => {
    if (params.get('new') === '1') openNew();
  }, [params]);

  return (
    <>
      <PageHead
        title={t('admin.categories.title')}
        description={t('admin.categories.count', { total: rows.length })}
        actions={
          <button type="button" className="admin-btn admin-btn--gold" onClick={openNew}>
            <Icon name="plus" size={16} />
            {t('admin.categories.new')}
          </button>
        }
      />

      <Card flush>
        {loading ? (
          <div className="admin-rows">
            {[0, 1, 2, 3].map((i) => (
              <div className="admin-row" key={i}>
                <div className="admin-skeleton" style={{ width: 46, height: 46, borderRadius: 9, flex: 'none' }} />
                <div className="admin-row__main">
                  <div className="admin-skeleton" style={{ width: '45%', height: 13, marginBottom: 7 }} />
                  <div className="admin-skeleton" style={{ width: '70%', height: 11 }} />
                </div>
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <EmptyState icon="tag" title={t('admin.categories.empty')} />
        ) : (
          <div className="admin-rows">
            {rows.map((c) => (
              <div className="admin-row" key={c.id}>
                <img className="admin-cell-entity__thumb" src={c.image} alt="" loading="lazy" />
                <div className="admin-row__main">
                  <div className="admin-row__title">{isAR ? c.name : c.nameEn}</div>
                  <div className="admin-row__meta">
                    <span dir="ltr">{c.id}</span>
                    <Badge tone="info" plain>
                      {c.productCount} {t('admin.categories.products')}
                    </Badge>
                    {!c.visible && <Badge tone="warn">{t('admin.categories.hidden')}</Badge>}
                  </div>
                </div>
                <div className="admin-row__side">
                  <div className="admin-inline" style={{ gap: 5 }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn--sm admin-btn--icon"
                      onClick={() => openEdit(c)}
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
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(editing)}
        title={editing?.id ? t('admin.categories.edit') : t('admin.categories.new')}
        onClose={() => setEditing(null)}
        footer={
          <>
            <button type="button" className="admin-btn" onClick={() => setEditing(null)}>
              {t('common.cancel')}
            </button>
            <button type="submit" form="cat-form" className="admin-btn admin-btn--gold" disabled={saving}>
              <Icon name="save" size={15} />
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </>
        }
      >
        <form id="cat-form" onSubmit={save} className="admin-formgrid admin-formgrid--2">
          <Field label={t('admin.field.nameAr')} required htmlFor="c-name">
            <input
              id="c-name"
              className="admin-input"
              value={editing?.name || ''}
              onChange={(e) => setEditing((v) => ({ ...v, name: e.target.value }))}
            />
          </Field>
          <Field label={t('admin.field.nameEn')} required htmlFor="c-name-en">
            <input
              id="c-name-en"
              className="admin-input"
              dir="ltr"
              value={editing?.nameEn || ''}
              onChange={(e) => setEditing((v) => ({ ...v, nameEn: e.target.value }))}
            />
          </Field>
          <Field label={t('admin.field.blurbAr')} htmlFor="c-blurb">
            <input
              id="c-blurb"
              className="admin-input"
              value={editing?.blurb || ''}
              onChange={(e) => setEditing((v) => ({ ...v, blurb: e.target.value }))}
            />
          </Field>
          <Field label={t('admin.field.blurbEn')} htmlFor="c-blurb-en">
            <input
              id="c-blurb-en"
              className="admin-input"
              dir="ltr"
              value={editing?.blurbEn || ''}
              onChange={(e) => setEditing((v) => ({ ...v, blurbEn: e.target.value }))}
            />
          </Field>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label={t('admin.field.imageUrl')} htmlFor="c-img">
              <input
                id="c-img"
                className="admin-input"
                dir="ltr"
                value={editing?.image || ''}
                onChange={(e) => setEditing((v) => ({ ...v, image: e.target.value }))}
              />
            </Field>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Switch
              id="c-visible"
              label={t('admin.categories.visible')}
              description={t('admin.categories.visibleHint')}
              checked={Boolean(editing?.visible)}
              onChange={(v) => setEditing((s) => ({ ...s, visible: v }))}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
