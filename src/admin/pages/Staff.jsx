import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listStaff, saveStaff, deleteStaff } from '../data/api';
import { Badge, Card, EmptyState, Field, Modal, PageHead, SkeletonRows, Switch } from '../components/ui';
import useToast from '../../hooks/useToast';

const BLANK = { id: '', name: '', email: '', role: 'support', active: true, lastSeen: null };

const ROLES = ['admin', 'manager', 'support', 'inventory'];

export default function Staff() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const isAR = i18n.language === 'ar';

  const refresh = useCallback(() => {
    listStaff().then((r) => {
      setRows(r);
      setLoading(false);
    });
  }, []);

  useEffect(() => refresh(), [refresh]);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    if (url.get('new') === '1') setEditing({ ...BLANK });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const next = {};
    if (!editing.name.trim()) next.name = t('admin.validation.required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editing.email)) next.email = t('admin.validation.email');
    if (!editing.id && (editing.password || '').length < 6) next.password = t('admin.validation.password');
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    try {
      await saveStaff(editing);
      notify(t('admin.staff.saved'), 'success');
      setEditing(null);
      setErrors({});
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s) => {
    if (!window.confirm(t('admin.staff.confirmDelete', { name: s.name }))) return;
    await deleteStaff(s.id);
    notify(t('admin.staff.deleted'), 'success');
    refresh();
  };

  const active = rows.filter((r) => r.active).length;

  return (
    <>
      <PageHead
        title={t('admin.staff.title')}
        description={t('admin.staff.count', { total: rows.length, active })}
        actions={
          <button
            type="button"
            className="admin-btn admin-btn--gold"
            onClick={() => setEditing({ ...BLANK })}
          >
            <Icon name="plus" size={16} />
            {t('admin.staff.new')}
          </button>
        }
      />

      <Card flush>
        {loading ? (
          <SkeletonRows rows={4} />
        ) : rows.length === 0 ? (
          <EmptyState icon="shield2" title={t('admin.staff.empty')} />
        ) : (
          <div className="admin-rows">
            {rows.map((s) => (
              <div className="admin-row" key={s.id}>
                <span className="admin-cell-entity__glyph admin-cell-entity__glyph--gold">
                  {s.name.trim().charAt(0)}
                </span>
                <div className="admin-row__main">
                  <div className="admin-row__title">{s.name}</div>
                  <div className="admin-row__meta">
                    <span dir="ltr">{s.email}</span>
                    <Badge tone={s.role === 'admin' ? 'gold' : s.role === 'manager' ? 'info' : 'plain'}>
                      {t(`admin.staff.role_${s.role}`)}
                    </Badge>
                    {!s.active && <Badge tone="danger">{t('admin.staff.inactive')}</Badge>}
                    {s.lastSeen && (
                      <span className="admin-muted">
                        {t('admin.staff.lastSeen')}: {new Date(s.lastSeen).toLocaleDateString(isAR ? 'ar-EG' : 'en-GB')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="admin-row__side">
                  <div className="admin-inline" style={{ gap: 5 }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn--sm admin-btn--icon"
                      onClick={() => setEditing({ ...s, password: '' })}
                      aria-label={t('common.edit')}
                    >
                      <Icon name="edit" size={15} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn--sm admin-btn--icon admin-btn--danger"
                      onClick={() => remove(s)}
                      aria-label={t('common.delete')}
                      disabled={s.role === 'admin'}
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
        title={editing?.id ? t('admin.staff.edit') : t('admin.staff.new')}
        onClose={() => setEditing(null)}
        footer={
          <>
            <button type="button" className="admin-btn" onClick={() => setEditing(null)}>
              {t('common.cancel')}
            </button>
            <button type="submit" form="staff-form" className="admin-btn admin-btn--gold" disabled={saving}>
              <Icon name="save" size={15} />
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </>
        }
      >
        <form id="staff-form" onSubmit={save} className="admin-formgrid admin-formgrid--2">
          <Field label={t('common.fullName')} required htmlFor="st-name" error={errors.name}>
            <input
              id="st-name"
              className="admin-input"
              value={editing?.name || ''}
              onChange={(e) => setEditing((v) => ({ ...v, name: e.target.value }))}
            />
          </Field>
          <Field label={t('common.email')} required htmlFor="st-email" error={errors.email}>
            <input
              id="st-email"
              className="admin-input"
              type="email"
              dir="ltr"
              value={editing?.email || ''}
              onChange={(e) => setEditing((v) => ({ ...v, email: e.target.value }))}
            />
          </Field>
          <Field label={t('admin.staff.role')} htmlFor="st-role">
            <select
              id="st-role"
              className="admin-select-field"
              value={editing?.role || 'support'}
              onChange={(e) => setEditing((v) => ({ ...v, role: e.target.value }))}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {t(`admin.staff.role_${r}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={editing?.id ? t('admin.staff.newPassword') : t('common.password')}
            htmlFor="st-pass"
            error={errors.password}
            hint={editing?.id ? t('admin.staff.passwordHint') : undefined}
          >
            <input
              id="st-pass"
              className="admin-input"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              value={editing?.password || ''}
              onChange={(e) => setEditing((v) => ({ ...v, password: e.target.value }))}
            />
          </Field>
          <div style={{ gridColumn: '1 / -1' }}>
            <Switch
              id="st-active"
              label={t('admin.staff.activeLabel')}
              description={t('admin.staff.activeHint')}
              checked={Boolean(editing?.active)}
              onChange={(v) => setEditing((s) => ({ ...s, active: v }))}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
