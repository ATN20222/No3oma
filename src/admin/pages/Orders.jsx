import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listOrders } from '../data/api';
import { Badge, Card, EmptyState, PageHead, Pagination, SkeletonRows } from '../components/ui';
import useDebounced from '../hooks/useDebounced';

const money = (n) => new Intl.NumberFormat('en-US').format(n);

const STATUS_TONE = {
  delivered: 'ok',
  processing: 'info',
  shipped: 'info',
  pending: 'warn',
  cancelled: 'danger',
};

const STATUS_TABS = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function Orders() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const isAR = i18n.language === 'ar';

  const query = params.get('q') || '';
  const status = params.get('status') || 'all';
  const page = Number(params.get('page') || 1);

  const [rawQuery, setRawQuery] = useState(query);
  const debouncedQuery = useDebounced(rawQuery);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const setParam = (key, value, resetPage = true) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (resetPage && key !== 'page') next.delete('page');
    setParams(next, { replace: true });
  };

  useEffect(() => {
    if (debouncedQuery !== query) setParam('q', debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setRawQuery(query);
  }, [query]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listOrders({ query, status, page })
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
  }, [query, status, page]);

  const dateFmt = (d) =>
    new Date(d).toLocaleDateString(isAR ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <PageHead
        title={t('admin.orders.title')}
        description={t('admin.orders.count', { total })}
        actions={
          <button type="button" className="admin-btn" onClick={() => window.print()}>
            <Icon name="download" size={15} />
            {t('common.export')}
          </button>
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
              value={rawQuery}
              onChange={(e) => setRawQuery(e.target.value)}
              placeholder={t('admin.orders.searchPlaceholder')}
              aria-label={t('admin.orders.searchPlaceholder')}
            />
          </div>
          <div className="admin-filters">
            {STATUS_TABS.map((s) => (
              <button
                key={s}
                type="button"
                className={`admin-chip ${status === s ? 'is-active' : ''}`.trim()}
                onClick={() => setParam('status', s === 'all' ? '' : s)}
              >
                {t(`admin.status.${s}`)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <SkeletonRows rows={7} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="orders"
            title={t('admin.orders.empty')}
            description={t('admin.orders.emptySub')}
            action={
              <button
                type="button"
                className="admin-btn"
                style={{ marginTop: 6 }}
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
              >
                {t('admin.filters.clear')}
              </button>
            }
          />
        ) : (
          <>
            <div className="admin-tablewrap admin-dt-desktop">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('admin.table.order')}</th>
                    <th>{t('admin.table.customer')}</th>
                    <th>{t('admin.table.date')}</th>
                    <th>{t('admin.table.items')}</th>
                    <th>{t('admin.table.payment')}</th>
                    <th>{t('admin.table.total')}</th>
                    <th>{t('admin.table.status')}</th>
                    <th style={{ textAlign: 'end' }}>{t('admin.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((o) => (
                    <tr key={o.id}>
                      <td className="admin-ltr" style={{ fontWeight: 700 }}>
                        {o.number}
                      </td>
                      <td>
                        <div className="admin-cell-entity__text">
                          <div className="admin-cell-entity__title">{o.customerName}</div>
                          <div className="admin-cell-entity__sub">{isAR ? o.city : o.cityEn}</div>
                        </div>
                      </td>
                      <td className="admin-muted">{dateFmt(o.date)}</td>
                      <td className="admin-table__num">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                      <td>{t(`admin.payment.${o.paymentMethod}`)}</td>
                      <td className="admin-table__num" style={{ fontWeight: 700 }}>
                        {money(o.total)}
                      </td>
                      <td>
                        <Badge tone={STATUS_TONE[o.status]}>{t(`admin.status.${o.status}`)}</Badge>
                      </td>
                      <td>
                        <div className="admin-table__actions">
                          <Link
                            to={`/admin/orders/${o.id}`}
                            className="admin-btn admin-btn--sm admin-btn--icon"
                            aria-label={t('common.view')}
                          >
                            <Icon name="eye" size={15} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-rows admin-dt-mobile">
              {rows.map((o) => (
                <Link className="admin-row" to={`/admin/orders/${o.id}`} key={o.id} style={{ color: 'inherit' }}>
                  <span className="admin-cell-entity__glyph">
                    <Icon name="orders" size={18} />
                  </span>
                  <div className="admin-row__main">
                    <div className="admin-row__title admin-ltr">{o.number}</div>
                    <div className="admin-row__meta">
                      <span>{o.customerName}</span>
                      <span>{dateFmt(o.date)}</span>
                      <Badge tone={STATUS_TONE[o.status]}>{t(`admin.status.${o.status}`)}</Badge>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <span className="admin-row__price">{money(o.total)}</span>
                    <span className="admin-muted" style={{ fontSize: 11.5 }}>
                      {t(`admin.payment.${o.paymentMethod}`)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={8}
              onPage={(p) => setParam('page', String(p), false)}
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
