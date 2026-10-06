import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listInventory, adjustStock } from '../data/api';
import { Badge, Card, EmptyState, Field, Modal, PageHead, SkeletonRows } from '../components/ui';
import useToast from '../../hooks/useToast';
import useDebounced from '../hooks/useDebounced';

const money = (n) => new Intl.NumberFormat('en-US').format(n);
const FILTERS = ['all', 'low', 'out'];

export default function Inventory() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const [params, setParams] = useSearchParams();
  const isAR = i18n.language === 'ar';

  const query = params.get('q') || '';
  const filter = params.get('filter') || 'all';

  const [raw, setRaw] = useState(query);
  const debounced = useDebounced(raw);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adjusting, setAdjusting] = useState(null);
  const [delta, setDelta] = useState('');
  const [reason, setReason] = useState('restock');
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(() => {
    let alive = true;
    setLoading(true);
    listInventory({ query, filter })
      .then((r) => alive && setRows(r))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [query, filter]);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (debounced) next.set('q', debounced);
    else next.delete('q');
    if (debounced !== query) {
      next.delete('page');
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => setRaw(query), [query]);
  useEffect(() => refresh(), [refresh]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const commit = async () => {
    const amount = Number(delta);
    if (!Number.isFinite(amount) || amount === 0) {
      notify(t('admin.validation.number'), 'error');
      return;
    }
    setSaving(true);
    try {
      await adjustStock(adjusting.id, amount, reason);
      notify(t('admin.inventory.adjusted'), 'success');
      setAdjusting(null);
      setDelta('');
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const low = rows.filter((r) => r.stock > 0 && r.stock <= r.reorderPoint).length;
  const out = rows.filter((r) => r.stock === 0).length;

  return (
    <>
      <PageHead
        title={t('admin.inventory.title')}
        description={t('admin.inventory.summary', { total: rows.length, low, out })}
        actions={
          <Link to="/admin/products?new=1" className="admin-btn admin-btn--gold">
            <Icon name="plus" size={16} />
            {t('admin.products.new')}
          </Link>
        }
      />

      <Card flush>
        <div className="admin-toolbar">
          <div className="admin-search">
            <span className="admin-search__icon">
              <Icon name="search" size={16} />
            </span>
            <input
              type="search"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder={t('admin.inventory.searchPlaceholder')}
              aria-label={t('admin.inventory.searchPlaceholder')}
            />
          </div>
          <div className="admin-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`admin-chip ${filter === f ? 'is-active' : ''}`.trim()}
                onClick={() => setParam('filter', f)}
              >
                {t(`admin.inventory.filter_${f}`)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <SkeletonRows rows={6} />
        ) : rows.length === 0 ? (
          <EmptyState icon="box" title={t('admin.inventory.empty')} description={t('admin.inventory.emptySub')} />
        ) : (
          <div className="admin-rows">
            {rows.map((p) => {
              const tone = p.stock === 0 ? 'danger' : p.stock <= p.reorderPoint ? 'warn' : 'ok';
              const stockLabel =
                p.stock === 0
                  ? t('admin.inventory.outOfStock')
                  : p.stock <= p.reorderPoint
                    ? t('admin.inventory.lowStock')
                    : t('admin.inventory.inStock');
              const pct = Math.max(4, Math.min(100, Math.round((p.stock / Math.max(1, p.reorderPoint * 3)) * 100)));

              return (
                <div className="admin-row" key={p.id}>
                  <img className="admin-cell-entity__thumb" src={p.image} alt="" loading="lazy" />
                  <div className="admin-row__main">
                    <div className="admin-row__title">{isAR ? p.name : p.nameEn}</div>
                    <div className="admin-row__meta">
                      <span dir="ltr">{p.sku}</span>
                      <span>
                        {t('admin.inventory.reorderPoint')}: {p.reorderPoint}
                      </span>
                      <span>
                        {t('admin.inventory.value')}: {money(p.stock * p.cost)}
                      </span>
                    </div>
                    <div
                      className="admin-progress"
                      role="img"
                      aria-label={`${t('admin.table.stock')}: ${p.stock}`}
                      style={{ marginTop: 9, maxWidth: 240 }}
                    >
                      <span
                        className={`admin-progress__fill admin-progress__fill--${tone}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <div className="admin-row__price admin-ltr">{p.stock}</div>
                    <Badge tone={tone}>{stockLabel}</Badge>
                    <button
                      type="button"
                      className="admin-btn admin-btn--sm"
                      onClick={() => {
                        setAdjusting(p);
                        setDelta('');
                      }}
                    >
                      <Icon name="refresh2" size={14} />
                      {t('admin.inventory.adjust')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(adjusting)}
        title={adjusting ? (isAR ? adjusting.name : adjusting.nameEn) : ''}
        onClose={() => setAdjusting(null)}
        footer={
          <>
            <button type="button" className="admin-btn" onClick={() => setAdjusting(null)}>
              {t('common.cancel')}
            </button>
            <button type="button" className="admin-btn admin-btn--gold" onClick={commit} disabled={saving}>
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </>
        }
      >
        <div className="admin-stack" style={{ gap: 14 }}>
          <div className="admin-inline">
            <Badge plain>
              {t('admin.table.stock')}: {adjusting?.stock}
            </Badge>
            <Badge plain>
              <span dir="ltr">{adjusting?.sku}</span>
            </Badge>
          </div>
          <div className="admin-inline" style={{ gap: 8 }}>
            {[-10, -1, 1, 10].map((d) => (
              <button
                key={d}
                type="button"
                className="admin-chip"
                onClick={() => setDelta(String(Number(delta || 0) + d))}
              >
                {d > 0 ? `+${d}` : d}
              </button>
            ))}
          </div>
          <Field label={t('admin.inventory.delta')} htmlFor="inv-delta" hint={t('admin.inventory.deltaHint')}>
            <input
              id="inv-delta"
              className="admin-input"
              type="number"
              dir="ltr"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
            />
          </Field>
          <Field label={t('admin.inventory.reason')} htmlFor="inv-reason">
            <select
              id="inv-reason"
              className="admin-select-field"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="restock">{t('admin.inventory.reason_restock')}</option>
              <option value="sale">{t('admin.inventory.reason_sale')}</option>
              <option value="damage">{t('admin.inventory.reason_damage')}</option>
              <option value="return">{t('admin.inventory.reason_return')}</option>
              <option value="correction">{t('admin.inventory.reason_correction')}</option>
            </select>
          </Field>
        </div>
      </Modal>
    </>
  );
}
