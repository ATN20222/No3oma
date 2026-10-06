import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import { getOverview, listReviews, listOrders } from '../data/api';
import { BarChart, Badge, Card, EmptyState, PageHead, Stat } from '../components/ui';

const money = (n) => new Intl.NumberFormat('en-US').format(n);

export default function Overview() {
  const { t, i18n } = useTranslation();
  const isAR = i18n.language === 'ar';
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [processing, setProcessing] = useState(0);

  useEffect(() => {
    let alive = true;
    Promise.all([getOverview(), listReviews({ status: 'pending', perPage: 100 }), listOrders({ status: 'processing', perPage: 100 })])
      .then(([overview, reviews, orders]) => {
        if (!alive) return;
        setData(overview);
        setPendingReviews(reviews.total);
        setProcessing(orders.total);
      })
      .finally(() => alive && setPending(false));
    return () => {
      alive = false;
    };
  }, []);

  if (pending || !data) {
    return (
      <>
        <PageHead title={t('admin.overview.title')} description={t('admin.overview.sub')} />
        <div className="admin-grid admin-grid--stats">
          {[0, 1, 2, 3].map((i) => (
            <div className="admin-skeleton" key={i} style={{ height: 118, borderRadius: 14 }} />
          ))}
        </div>
        <div className="admin-stack" style={{ marginTop: 14 }}>
          <div className="admin-skeleton" style={{ height: 240, borderRadius: 14 }} />
          <div className="admin-skeleton" style={{ height: 260, borderRadius: 14 }} />
        </div>
      </>
    );
  }

  const { kpis, revenueSeries, topProducts, lowStock, recentActivity, ordersByStatus } = data;
  const series = revenueSeries.map((p) => ({ ...p, label: isAR ? p.label : p.labelEn }));
  const statusTotal = ordersByStatus.reduce((sum, s) => sum + s.count, 0) || 1;

  return (
    <>
      <PageHead
        title={t('admin.overview.title')}
        description={t('admin.overview.sub')}
        actions={
          <>
            <Link to="/admin/orders" className="admin-btn">
              <Icon name="orders" size={16} />
              {t('admin.overview.viewOrders')}
            </Link>
            <Link to="/admin/products/new" className="admin-btn admin-btn--gold">
              <Icon name="plus" size={16} />
              {t('admin.overview.newProduct')}
            </Link>
          </>
        }
      />

      <div className="admin-stack">
        <div className="admin-grid admin-grid--stats">
          <Stat
            label={t('admin.kpi.revenue')}
            value={money(kpis.revenue)}
            trend={kpis.revenueTrend}
            trendLabel={t('admin.kpi.vsLastMonth')}
            icon="card"
          />
          <Stat
            label={t('admin.kpi.orders')}
            value={money(kpis.orders)}
            trend={kpis.ordersTrend}
            trendLabel={t('admin.kpi.vsLastMonth')}
            icon="orders"
          />
          <Stat
            label={t('admin.kpi.customers')}
            value={money(kpis.customers)}
            trend={kpis.customersTrend}
            trendLabel={t('admin.kpi.vsLastMonth')}
            icon="users"
          />
          <Stat
            label={t('admin.kpi.aov')}
            value={money(kpis.aov)}
            trend={kpis.aovTrend}
            trendLabel={t('admin.kpi.vsLastMonth')}
            icon="chart"
          />
        </div>

        <div className="admin-grid admin-grid--2 admin-grid--sidebar">
          <Card
            title={t('admin.overview.revenue7')}
            subtitle={t('admin.overview.revenue7Sub')}
            action={
              <span className="admin-badge admin-badge--gold admin-badge--plain">
                {t('admin.overview.thisWeek')}
              </span>
            }
          >
            <BarChart data={series} labelKey="label" valueKey="value" ariaLabel={t('admin.overview.revenue7')} />
          </Card>

          <Card title={t('admin.overview.orderStatus')} subtitle={t('admin.overview.orderStatusSub')}>
            <div className="admin-stack" style={{ gap: 13 }}>
              {ordersByStatus.map((s) => (
                <div key={s.status}>
                  <div className="admin-between" style={{ marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t(`admin.status.${s.status}`)}</span>
                    <span className="admin-ltr" style={{ fontSize: 13, fontWeight: 700 }}>
                      {s.count}
                    </span>
                  </div>
                  <div className="admin-meter">
                    <div className="admin-meter__fill" style={{ width: `${(s.count / statusTotal) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="admin-grid admin-grid--2 admin-grid--sidebar">
          <Card
            title={t('admin.overview.topProducts')}
            subtitle={t('admin.overview.topProductsSub')}
            action={
              <Link to="/admin/products" className="admin-btn admin-btn--sm admin-btn--ghost">
                {t('common.viewAll')}
              </Link>
            }
            flush
          >
            <div className="admin-rows">
              {topProducts.map((p, i) => (
                <Link className="admin-row" to={`/admin/products/${p.id}`} key={p.id} style={{ color: 'inherit' }}>
                  <span className="admin-cell-entity__glyph" style={{ width: 30, height: 30, fontSize: 12 }}>
                    {i + 1}
                  </span>
                  <img className="admin-cell-entity__thumb" src={p.image} alt="" loading="lazy" />
                  <div className="admin-row__main">
                    <div className="admin-row__title">{isAR ? p.name : p.nameEn}</div>
                    <div className="admin-row__meta">
                      <span>
                        ★ {p.rating} · {p.reviewCount}
                      </span>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <span className="admin-row__price">{money(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <div className="admin-stack">
            <Card
              title={t('admin.overview.lowStock')}
              action={
                <Link to="/admin/inventory" className="admin-btn admin-btn--sm admin-btn--ghost">
                  {t('common.manage')}
                </Link>
              }
              flush
            >
              <div className="admin-rows">
                {lowStock.length === 0 ? (
                  <EmptyState icon="check" title={t('admin.overview.stockOk')} />
                ) : (
                  lowStock.slice(0, 4).map((p) => (
                    <div className="admin-row" key={p.id}>
                      <img className="admin-cell-entity__thumb" src={p.image} alt="" loading="lazy" />
                      <div className="admin-row__main">
                        <div className="admin-row__title">{isAR ? p.name : p.nameEn}</div>
                        <div className="admin-row__meta">
                          <span dir="ltr">{p.sku}</span>
                        </div>
                      </div>
                      <div className="admin-row__side">
                        <Badge tone={p.stock === 0 ? 'danger' : 'warn'}>
                          {p.stock === 0 ? t('admin.stock.out') : p.stock}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card title={t('admin.overview.quickActions')}>
              <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(132px, 1fr))', gap: 9 }}>
                {[
                  { to: '/admin/orders', icon: 'orders', key: 'admin.nav.orders', badge: processing },
                  { to: '/admin/reviews', icon: 'star2', key: 'admin.nav.reviews', badge: pendingReviews },
                  { to: '/admin/content', icon: 'image', key: 'admin.nav.content' },
                  { to: '/admin/settings', icon: 'settings', key: 'admin.nav.settings' },
                ].map((a) => (
                  <Link
                    key={a.to}
                    to={a.to}
                    className="admin-card"
                    style={{ padding: 13, display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}
                  >
                    <span className="admin-stat__icon">
                      <Icon name={a.icon} size={16} />
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1, minWidth: 0 }}>{t(a.key)}</span>
                    {a.badge > 0 && <span className="admin-badge admin-badge--warn">{a.badge}</span>}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card title={t('admin.overview.activity')} subtitle={t('admin.overview.activitySub')} flush>
          <div className="admin-card__body">
            <div className="admin-timeline">
              {recentActivity.map((a, i) => (
                <div className="admin-timeline__item" key={i}>
                  <span
                    className="admin-timeline__dot"
                    style={{
                      background:
                        a.tone === 'danger'
                          ? 'var(--admin-danger)'
                          : a.tone === 'warn'
                            ? 'var(--admin-warn)'
                            : a.tone === 'info'
                              ? 'var(--admin-info)'
                              : 'var(--admin-ok)',
                      boxShadow: 'none',
                    }}
                  />
                  <div className="admin-timeline__body">
                    <div className="admin-timeline__title">{isAR ? a.titleAr : a.titleEn}</div>
                    <div className="admin-timeline__time">{new Date(a.at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
