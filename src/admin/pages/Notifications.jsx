import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listInventory, listReviews, listOrders } from '../data/api';
import { Badge, Card, EmptyState, PageHead, Tabs } from '../components/ui';
import useToast from '../../hooks/useToast';

const FILTERS = ['all', 'orders', 'stock', 'reviews'];

export default function Notifications() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const [params, setParams] = useSearchParams();
  const filter = params.get('filter') || 'all';
  const [items, setItems] = useState([]);
  const [read, setRead] = useState(() => new Set());
  const [loading, setLoading] = useState(true);
  const isAR = i18n.language === 'ar';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [stock, reviews, orders] = await Promise.all([
        listInventory({ filter: 'low' }),
        listReviews({ status: 'pending', perPage: 6 }),
        listOrders({ page: 1 }),
      ]);

      const built = [
        ...orders.rows.slice(0, 3).map((o) => ({
          id: `o-${o.id}`,
          kind: 'orders',
          tone: 'ok',
          icon: 'orders',
          title: t('admin.notif.newOrderDetail', { number: o.number }),
          body: `${o.customerName} · ${o.items.reduce((s, i) => s + i.qty, 0)} ${t('admin.orders.items')}`,
          at: o.date,
          to: `/admin/orders/${o.id}`,
        })),
        ...stock.map((p) => ({
          id: `s-${p.id}`,
          kind: 'stock',
          tone: p.stock === 0 ? 'danger' : 'warn',
          icon: 'layers',
          title: t('admin.notif.lowStockDetail', { name: isAR ? p.name : p.nameEn }),
          body: `${t('admin.table.stock')}: ${p.stock} · ${t('admin.inventory.reorderPoint')}: ${p.reorderPoint}`,
          at: '2026-10-06',
          to: '/admin/inventory',
        })),
        ...reviews.rows.map((r) => ({
          id: `r-${r.id}`,
          kind: 'reviews',
          tone: 'info',
          icon: 'star2',
          title: t('admin.notif.pendingReviewDetail', { name: r.customerName }),
          body: r.title,
          at: r.date,
          to: '/admin/reviews',
        })),
      ].sort((a, b) => (a.at < b.at ? 1 : -1));

      setItems(built);
    } finally {
      setLoading(false);
    }
  }, [t, isAR]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () => items.filter((i) => filter === 'all' || i.kind === filter),
    [items, filter],
  );

  const unread = items.filter((i) => !read.has(i.id)).length;

  const setFilter = (v) => {
    const next = new URLSearchParams(params);
    if (v === 'all') next.delete('filter');
    else next.set('filter', v);
    setParams(next, { replace: true });
  };

  const markAll = () => {
    setRead(new Set(items.map((i) => i.id)));
    notify(t('admin.notifications.allRead'), 'success');
  };

  return (
    <>
      <PageHead
        title={t('admin.notifications.title')}
        description={t('admin.notifications.sub')}
        actions={
          <button type="button" className="admin-btn" onClick={markAll} disabled={unread === 0}>
            <Icon name="check" size={15} />
            {t('admin.notifications.markAll')}
          </button>
        }
      />

      <div className="admin-inline" style={{ marginBottom: 14 }}>
        <Badge tone={unread ? 'gold' : 'plain'}>
          {t('admin.notifications.unread', { count: unread })}
        </Badge>
        <Badge plain>
          {t('admin.notifications.total', { count: items.length })}
        </Badge>
      </div>

      <Card flush>
        <div className="admin-toolbar">
          <Tabs
            label={t('admin.notifications.title')}
            value={filter}
            onChange={setFilter}
            tabs={FILTERS.map((f) => ({ value: f, label: t(`admin.notifications.filter_${f}`) }))}
          />
        </div>

        {loading ? (
          <div className="admin-rows" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div className="admin-row" key={i}>
                <div className="admin-skeleton" style={{ width: 40, height: 40, borderRadius: 10, flex: 'none' }} />
                <div className="admin-row__main">
                  <div className="admin-skeleton" style={{ width: '55%', height: 13, marginBottom: 7 }} />
                  <div className="admin-skeleton" style={{ width: '35%', height: 11 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="bell"
            title={t('admin.notifications.empty')}
            description={t('admin.notifications.emptySub')}
          />
        ) : (
          <div className="admin-rows">
            {filtered.map((n) => {
              const isRead = read.has(n.id);
              return (
                <Link
                  key={n.id}
                  to={n.to}
                  className={`admin-row ${isRead ? 'admin-row--read' : 'admin-row--unread'}`.trim()}
                  style={{ color: 'inherit' }}
                  onClick={() => setRead((prev) => new Set(prev).add(n.id))}
                >
                  <span className={`admin-cell-entity__glyph admin-cell-entity__glyph--${n.tone}`}>
                    <Icon name={n.icon} size={17} />
                  </span>
                  <div className="admin-row__main">
                    <div className="admin-row__title">
                      {!isRead && <span className="admin-dot" aria-hidden="true" />}
                      {n.title}
                    </div>
                    <div className="admin-row__meta">
                      <span>{n.body}</span>
                      <span>{n.at}</span>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <Badge tone={n.tone}>{t(`admin.notifications.filter_${n.kind}`)}</Badge>
                    <Icon name={i18n.language === 'ar' ? 'arrowPrev' : 'arrowNext'} size={15} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}
