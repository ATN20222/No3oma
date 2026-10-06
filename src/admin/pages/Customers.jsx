import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listCustomers } from '../data/api';
import { Badge, Card, EmptyState, PageHead, Pagination, SkeletonRows } from '../components/ui';
import useDebounced from '../hooks/useDebounced';

const money = (n) => new Intl.NumberFormat('en-US').format(n);

const SEGMENT_TONE = { vip: 'gold', returning: 'info', new: 'ok' };

export default function Customers() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();

  const query = params.get('q') || '';
  const page = Number(params.get('page') || 1);
  const [rawQuery, setRawQuery] = useState(query);
  const debounced = useDebounced(rawQuery);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => setRawQuery(query), [query]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listCustomers({ query, page })
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
  }, [query, page]);

  const setPage = (p) => {
    const next = new URLSearchParams(params);
    next.set('page', String(p));
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHead
        title={t('admin.customers.title')}
        description={t('admin.customers.count', { total })}
        actions={
          <button type="button" className="admin-btn">
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
              placeholder={t('admin.customers.searchPlaceholder')}
              aria-label={t('admin.customers.searchPlaceholder')}
            />
          </div>
        </div>

        {loading ? (
          <SkeletonRows rows={6} />
        ) : rows.length === 0 ? (
          <EmptyState icon="users" title={t('admin.customers.empty')} description={t('admin.customers.emptySub')} />
        ) : (
          <>
            <div className="admin-rows">
              {rows.map((c) => (
                <Link className="admin-row" to={`/admin/customers/${c.id}`} key={c.id} style={{ color: 'inherit' }}>
                  <span className="admin-cell-entity__glyph">
                    {c.name.trim().charAt(0)}
                  </span>
                  <div className="admin-row__main">
                    <div className="admin-row__title">{c.name}</div>
                    <div className="admin-row__meta">
                      <span dir="ltr">{c.email}</span>
                      <Badge tone={SEGMENT_TONE[c.segment]} plain>
                        {t(`admin.customers.segment_${c.segment}`)}
                      </Badge>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <span className="admin-row__price">{money(c.totalSpent)}</span>
                    <span className="admin-muted" style={{ fontSize: 11.5 }}>
                      {c.ordersCount} {t('admin.customers.orders')}
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
              onPage={setPage}
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
