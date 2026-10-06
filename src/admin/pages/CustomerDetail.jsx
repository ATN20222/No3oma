import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { getCustomer } from '../data/api';
import { Badge, Card, PageHead } from '../components/ui';

const money = (n) => new Intl.NumberFormat('en-US').format(n);
const STATUS_TONE = { delivered: 'ok', processing: 'info', shipped: 'info', pending: 'warn', cancelled: 'danger' };

export default function CustomerDetail() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAR = i18n.language === 'ar';

  useEffect(() => {
    let alive = true;
    getCustomer(id)
      .then((c) => alive && setCustomer(c))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <PageHead title={t('admin.customers.detail')} />
        <div className="admin-skeleton" style={{ height: 260, borderRadius: 14 }} />
      </>
    );
  }

  if (!customer) {
    return (
      <>
        <PageHead title={t('admin.customers.detail')} />
        <Card>
          <div className="admin-empty">
            <span className="admin-empty__icon">
              <Icon name="users" size={22} />
            </span>
            <h3>{t('admin.customers.notFound')}</h3>
          </div>
        </Card>
      </>
    );
  }

  const lifetime = customer.orders.filter((o) => o.status !== 'cancelled');

  return (
    <>
      <PageHead
        title={customer.name}
        description={customer.email}
        actions={
          <Link to="/admin/customers" className="admin-btn">
            <Icon name={isAR ? 'arrowNext' : 'arrowPrev'} size={15} />
            {t('common.back')}
          </Link>
        }
      />

      <div className="admin-stack">
        <div className="admin-grid admin-grid--stats">
          <article className="admin-stat">
            <span className="admin-stat__label">{t('admin.kpi.orders')}</span>
            <strong className="admin-stat__value">{customer.ordersCount}</strong>
          </article>
          <article className="admin-stat">
            <span className="admin-stat__label">{t('admin.customers.lifetime')}</span>
            <strong className="admin-stat__value">{money(customer.totalSpent)}</strong>
          </article>
          <article className="admin-stat">
            <span className="admin-stat__label">{t('admin.customers.segment')}</span>
            <strong className="admin-stat__value" style={{ fontSize: 19 }}>
              {t(`admin.customers.segment_${customer.segment}`)}
            </strong>
          </article>
          <article className="admin-stat">
            <span className="admin-stat__label">{t('admin.customers.joined')}</span>
            <strong className="admin-stat__value" style={{ fontSize: 17 }}>
              {new Date(customer.joined).toLocaleDateString(isAR ? 'ar-EG' : 'en-GB')}
            </strong>
          </article>
        </div>

        <div className="admin-detail-grid admin-grid--sidebar">
          <Card
            title={t('admin.customers.orderHistory')}
            action={
              <Badge plain>{lifetime.length} {t('admin.customers.orders')}</Badge>
            }
            flush
          >
            {customer.orders.length === 0 ? (
              <div className="admin-empty">
                <span className="admin-empty__icon">
                  <Icon name="orders" size={22} />
                </span>
                <h3>{t('admin.customers.noOrders')}</h3>
              </div>
            ) : (
              <div className="admin-rows">
                {customer.orders.map((o) => (
                  <Link className="admin-row" to={`/admin/orders/${o.id}`} key={o.id} style={{ color: 'inherit' }}>
                    <span className="admin-cell-entity__glyph">
                      <Icon name="orders" size={17} />
                    </span>
                    <div className="admin-row__main">
                      <div className="admin-row__title admin-ltr">{o.number}</div>
                      <div className="admin-row__meta">
                        <span>{new Date(o.date).toLocaleDateString(isAR ? 'ar-EG' : 'en-GB')}</span>
                        <Badge tone={STATUS_TONE[o.status]}>{t(`admin.status.${o.status}`)}</Badge>
                      </div>
                    </div>
                    <div className="admin-row__side">
                      <span className="admin-row__price">{money(o.total)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          <div className="admin-stack">
            <Card title={t('admin.customers.contact')}>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('common.email')}</span>
                <span className="admin-kv__v admin-ltr">{customer.email}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('common.phone')}</span>
                <span className="admin-kv__v admin-ltr">{customer.phone}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('admin.orders.city')}</span>
                <span className="admin-kv__v">{isAR ? customer.city : customer.cityEn}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('admin.customers.joined')}</span>
                <span className="admin-kv__v">{customer.joined}</span>
              </div>
            </Card>

            <Card title={t('admin.customers.actions')}>
              <div className="admin-stack" style={{ gap: 9 }}>
                <a href={`mailto:${customer.email}`} className="admin-btn admin-btn--block">
                  <Icon name="mail" size={15} />
                  {t('admin.customers.emailThem')}
                </a>
                <a href={`https://wa.me/${customer.phone.replace(/\D/g, '')}`} className="admin-btn admin-btn--block" target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" size={15} />
                  {t('admin.customers.whatsapp')}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
