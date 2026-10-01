import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const order = state || { ref: 'NM-000000', form: {}, total: 0, items: [] };

  return (
    <div className="container confirm">
      <div className="confirm__box">
        <span className="confirm__check" aria-hidden="true">✓</span>
        <h1 className="confirm__title">{t('common.orderConfirmation')}</h1>
        <p className="confirm__ref">
          {t('common.orderRef')}: <strong>{order.ref}</strong>
        </p>

        <dl className="confirm__rows">
          <div><dt>{t('common.fullName')}</dt><dd>{order.form?.fullName || '—'}</dd></div>
          <div><dt>{t('common.phone')}</dt><dd>{order.form?.phone || '—'}</dd></div>
          <div><dt>{t('common.email')}</dt><dd>{order.form?.email || '—'}</dd></div>
          <div><dt>{t('common.address')}</dt><dd>{[order.form?.address, order.form?.area, order.form?.city].filter(Boolean).join(', ') || '—'}</dd></div>
          <div><dt>{t('common.total')}</dt><dd>{order.total} EGP</dd></div>
        </dl>

        {order.items?.length > 0 && (
          <ul className="confirm__items">
            {order.items.map((i) => (
              <li key={i.id}>
                <span>{i18n.language === 'ar' ? i.name : i.nameEn} × {i.quantity}</span>
                <span>{i.price * i.quantity} EGP</span>
              </li>
            ))}
          </ul>
        )}

        <Button as={Link} to="/shop" variant="primary">{t('common.continueShopping')}</Button>
      </div>
    </div>
  );
}
