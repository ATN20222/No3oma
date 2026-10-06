import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listProducts, deleteProduct, listCategories } from '../data/api';
import { Badge, Card, EmptyState, PageHead, Pagination, SkeletonRows } from '../components/ui';
import useToast from '../../hooks/useToast';

const money = (n) => new Intl.NumberFormat('en-US').format(n);

export default function Products() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const isAR = i18n.language === 'ar';

  const query = params.get('q') || '';
  const category = params.get('category') || '';
  const status = params.get('status') || 'all';
  const page = Number(params.get('page') || 1);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const setParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(params);
      if (value) next.set(key, value);
      else next.delete(key);
      if (key !== 'page') next.delete('page');
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  useEffect(() => {
    listCategories().then(setCategories);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listProducts({ query, category, status, page })
      .then((res) => {
        if (!alive) return;
        setRows(res.rows);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [query, category, status, page]);

  const statusTone = (s) => (s === 'active' ? 'ok' : s === 'draft' ? 'warn' : 'info');

  const remove = async (id, name) => {
    if (!window.confirm(t('admin.products.confirmDelete', { name }))) return;
    await deleteProduct(id);
    notify(t('admin.products.deleted'), 'success');
    listProducts({ query, category, status, page }).then((res) => {
      setRows(res.rows);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    });
  };

  const activeFilters = useMemo(() => [query, category, status !== 'all'].filter(Boolean).length, [query, category, status]);

  return (
    <>
      <PageHead
        title={t('admin.products.title')}
        description={t('admin.products.count', { total })}
        actions={
          <Link to="/admin/products/new" className="admin-btn admin-btn--gold">
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
              value={query}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder={t('admin.products.searchPlaceholder')}
              aria-label={t('admin.products.searchPlaceholder')}
            />
          </div>

          <div className="admin-filters">
            <select
              className="admin-select"
              value={category}
              onChange={(e) => setParam('category', e.target.value)}
              aria-label={t('admin.filters.category')}
            >
              <option value="">{t('admin.filters.allCategories')}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {isAR ? c.name : c.nameEn}
                </option>
              ))}
            </select>

            {['all', 'active', 'draft', 'low'].map((s) => (
              <button
                key={s}
                type="button"
                className={`admin-chip ${status === s ? 'is-active' : ''}`.trim()}
                onClick={() => setParam('status', s === 'all' ? '' : s)}
              >
                {t(`admin.filters.status_${s}`)}
              </button>
            ))}

            {activeFilters > 0 && (
              <button
                type="button"
                className="admin-chip"
                onClick={() => setParams({}, { replace: true })}
              >
                <Icon name="close" size={13} />
                {t('admin.filters.clear')}
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <SkeletonRows rows={6} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="box"
            title={t('admin.products.empty')}
            description={t('admin.products.emptySub')}
            action={
              <Link to="/admin/products/new" className="admin-btn admin-btn--gold" style={{ marginTop: 6 }}>
                <Icon name="plus" size={16} />
                {t('admin.products.new')}
              </Link>
            }
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="admin-tablewrap admin-dt-desktop">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('admin.table.product')}</th>
                    <th>{t('admin.table.sku')}</th>
                    <th>{t('admin.table.category')}</th>
                    <th>{t('admin.table.price')}</th>
                    <th>{t('admin.table.stock')}</th>
                    <th>{t('admin.table.status')}</th>
                    <th style={{ textAlign: 'end' }}>{t('admin.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="admin-cell-entity">
                          <img className="admin-cell-entity__thumb" src={p.image} alt="" loading="lazy" />
                          <div className="admin-cell-entity__text">
                            <div className="admin-cell-entity__title">{isAR ? p.name : p.nameEn}</div>
                            <div className="admin-cell-entity__sub">★ {p.rating} · {p.reviewCount}</div>
                          </div>
                        </div>
                      </td>
                      <td className="admin-ltr admin-muted">{p.sku}</td>
                      <td>{t(`admin.categoryName.${p.category}`, p.category)}</td>
                      <td className="admin-table__num">{money(p.price)}</td>
                      <td>
                        <Badge tone={p.stock === 0 ? 'danger' : p.stock <= p.reorderPoint ? 'warn' : 'ok'}>
                          {p.stock}
                        </Badge>
                      </td>
                      <td>
                        <Badge tone={statusTone(p.status)}>{t(`admin.filters.status_${p.status}`)}</Badge>
                      </td>
                      <td>
                        <div className="admin-table__actions">
                          <button
                            type="button"
                            className="admin-btn admin-btn--sm admin-btn--icon"
                            onClick={() => navigate(`/admin/products/${p.id}`)}
                            aria-label={t('common.edit')}
                          >
                            <Icon name="edit" size={15} />
                          </button>
                          <button
                            type="button"
                            className="admin-btn admin-btn--sm admin-btn--icon admin-btn--danger"
                            onClick={() => remove(p.id, isAR ? p.name : p.nameEn)}
                            aria-label={t('common.delete')}
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="admin-rows admin-dt-mobile">
              {rows.map((p) => (
                <div className="admin-row" key={p.id}>
                  <img className="admin-cell-entity__thumb" src={p.image} alt="" loading="lazy" />
                  <div className="admin-row__main">
                    <div className="admin-row__title">{isAR ? p.name : p.nameEn}</div>
                    <div className="admin-row__meta">
                      <span dir="ltr">{p.sku}</span>
                      <Badge tone={p.stock === 0 ? 'danger' : p.stock <= p.reorderPoint ? 'warn' : 'ok'}>
                        {p.stock}
                      </Badge>
                      <Badge tone={statusTone(p.status)}>{t(`admin.filters.status_${p.status}`)}</Badge>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <span className="admin-row__price">{money(p.price)}</span>
                    <div className="admin-inline" style={{ gap: 5 }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--icon"
                        onClick={() => navigate(`/admin/products/${p.id}`)}
                        aria-label={t('common.edit')}
                      >
                        <Icon name="edit" size={15} />
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--icon admin-btn--danger"
                        onClick={() => remove(p.id, isAR ? p.name : p.nameEn)}
                        aria-label={t('common.delete')}
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={8}
              onPage={(p) => setParam('page', String(p))}
              labels={{
                showing: t('admin.pagination.showing'),
                of: t('admin.pagination.of'),
                prev: t('admin.pagination.prev'),
                next: t('admin.pagination.next'),
              }}
            />
          </>
        )}
      </Card>
    </>
  );
}
