import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { getOrder, updateOrderStatus } from '../data/api';
import { Badge, Card, Field, Modal, PageHead } from '../components/ui';
import useToast from '../../hooks/useToast';

const money = (n) => new Intl.NumberFormat('en-US').format(n);

const STATUS_TONE = { delivered: 'ok', processing: 'info', shipped: 'info', pending: 'warn', cancelled: 'danger' };
const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrderDetail() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusOpen, setStatusOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const isAR = i18n.language === 'ar';

  useEffect(() => {
    let alive = true;
    getOrder(id)
      .then((o) => alive && setOrder(o))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  const applyStatus = async () => {
    if (!nextStatus) return;
    setSaving(true);
    try {
      const updated = await updateOrderStatus(id, nextStatus, note || t(`admin.status.${nextStatus}`));
      setOrder(updated);
      setStatusOpen(false);
      setNote('');
      notify(t('admin.orders.statusUpdated'), 'success');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageHead title={t('admin.orders.detail')} />
        <div className="admin-skeleton" style={{ height: 300, borderRadius: 14 }} />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <PageHead title={t('admin.orders.detail')} />
        <Card>
          <div className="admin-empty">
            <span className="admin-empty__icon">
              <Icon name="alert" size={22} />
            </span>
            <h3>{t('admin.orders.notFound')}</h3>
            <Link to="/admin/orders" className="admin-btn" style={{ marginTop: 6 }}>
              {t('admin.nav.orders')}
            </Link>
          </div>
        </Card>
      </>
    );
  }

  const fmtDate = (d) => new Date(d).toLocaleString(isAR ? 'ar-EG' : 'en-GB');

  return (
    <>
      <PageHead
        title={order.number}
        description={`${t('admin.orders.placedOn')} ${fmtDate(order.date)}`}
        actions={
          <>
            <Link to="/admin/orders" className="admin-btn">
              <Icon name={isAR ? 'arrowNext' : 'arrowPrev'} size={15} />
              {t('common.back')}
            </Link>
            <button type="button" className="admin-btn admin-btn--gold" onClick={() => setStatusOpen(true)}>
              <Icon name="refresh2" size={15} />
              {t('admin.orders.updateStatus')}
            </button>
          </>
        }
      />

      <div className="admin-stack">
        <div className="admin-inline">
          <Badge tone={STATUS_TONE[order.status]}>{t(`admin.status.${order.status}`)}</Badge>
          <Badge plain>{t(`admin.payment.${order.paymentMethod}`)}</Badge>
          <span className="admin-muted" style={{ fontSize: 13 }}>
            {order.items.reduce((s, i) => s + i.qty, 0)} {t('admin.orders.items')}
          </span>
        </div>

        <div className="admin-detail-grid admin-grid--sidebar">
          <Card title={t('admin.orders.items')} flush>
            <div className="admin-rows">
              {order.items.map((item, i) => (
                <div className="admin-row" key={`${item.productId}-${i}`}>
                  <img className="admin-cell-entity__thumb" src={item.image} alt="" loading="lazy" />
                  <div className="admin-row__main">
                    <div className="admin-row__title">{isAR ? item.name : item.nameEn}</div>
                    <div className="admin-row__meta">
                      <span>
                        {t('admin.orders.qty')}: {item.qty}
                      </span>
                      <span>{item.color}</span>
                      <span dir="ltr">{item.size}</span>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <span className="admin-row__price">{money(item.price * item.qty)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="admin-card__body">
              <div className="admin-kv">
                <span className="admin-kv__k">{t('admin.orders.subtotal')}</span>
                <span className="admin-kv__v admin-ltr">{money(order.subtotal)}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('admin.orders.shipping')}</span>
                <span className="admin-kv__v admin-ltr">{money(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="admin-kv">
                  <span className="admin-kv__k">{t('admin.orders.discount')}</span>
                  <span className="admin-kv__v admin-ltr">−{money(order.discount)}</span>
                </div>
              )}
              <div className="admin-kv">
                <span className="admin-kv__k" style={{ fontWeight: 700, color: 'var(--admin-ink)' }}>
                  {t('admin.orders.total')}
                </span>
                <span className="admin-kv__v admin-ltr" style={{ fontSize: 17 }}>
                  {money(order.total)} EGP
                </span>
              </div>
            </div>
          </Card>

          <div className="admin-stack">
            <Card title={t('admin.orders.customer')}>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('common.fullName')}</span>
                <span className="admin-kv__v">{order.customerName}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('common.email')}</span>
                <span className="admin-kv__v admin-ltr">{order.customerEmail}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('common.phone')}</span>
                <span className="admin-kv__v admin-ltr">{order.phone}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('admin.orders.city')}</span>
                <span className="admin-kv__v">{isAR ? order.city : order.cityEn}</span>
              </div>
              <div className="admin-kv">
                <span className="admin-kv__k">{t('admin.orders.address')}</span>
                <span className="admin-kv__v">{order.address}</span>
              </div>
            </Card>

            <Card title={t('admin.orders.timeline')}>
              <div className="admin-timeline">
                {(order.timeline || []).map((ev, i) => (
                  <div className="admin-timeline__item" key={i}>
                    <span className="admin-timeline__dot" />
                    <div className="admin-timeline__body">
                      <div className="admin-timeline__title">{ev.title}</div>
                      <div className="admin-timeline__time">{fmtDate(ev.at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        open={statusOpen}
        title={t('admin.orders.updateStatus')}
        onClose={() => setStatusOpen(false)}
        footer={
          <>
            <button type="button" className="admin-btn" onClick={() => setStatusOpen(false)}>
              {t('common.cancel')}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--gold"
              onClick={applyStatus}
              disabled={!nextStatus || saving}
            >
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </>
        }
      >
        <div className="admin-stack" style={{ gap: 14 }}>
          <Field label={t('admin.field.status')} htmlFor="o-status">
            <select
              id="o-status"
              className="admin-select-field"
              value={nextStatus || order.status}
              onChange={(e) => setNextStatus(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t(`admin.status.${s}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('admin.orders.note')} hint={t('admin.orders.noteHint')} htmlFor="o-note">
            <textarea
              id="o-note"
              className="admin-textarea"
              style={{ minHeight: 84 }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        </div>
      </Modal>
    </>
  );
}
