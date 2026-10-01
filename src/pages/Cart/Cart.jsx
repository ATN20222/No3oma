import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/Button/Button';
import useCart from '../../hooks/useCart';
import './Cart.css';

const SHIPPING_FLAT = 75;

export default function Cart() {
  const { t } = useTranslation();
  const { items, subtotal, itemCount, updateQuantity, removeItem } = useCart();
  const shipping = items.length ? SHIPPING_FLAT : 0;

  return (
    <>
      <PageHeader title={t('cart')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('cart') }]} />
      <div className="container cart">
        {items.length === 0 ? (
          <div className="cart__empty">
            <p>{t('common.empty')}</p>
            <Button as={Link} to="/shop" variant="primary">{t('common.continueShopping')}</Button>
          </div>
        ) : (
          <div className="row cart__body">
            <div className="col-12 col-lg-8">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdate={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
              <div className="cart__foot">
                <Button as={Link} to="/shop" variant="ghost" size="sm">← {t('common.continueShopping')}</Button>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <aside className="cart__summary">
                <h2 className="cart__summary-title">{t('common.total')}</h2>
                <dl className="cart__rows">
                  <div><dt>{t('common.subtotal')} ({itemCount})</dt><dd>{subtotal} EGP</dd></div>
                  <div><dt>{t('common.shipping')}</dt><dd>{shipping} EGP</dd></div>
                  <div className="cart__rows-total"><dt>{t('common.total')}</dt><dd>{subtotal + shipping} EGP</dd></div>
                </dl>
                <Button as={Link} to="/checkout" variant="accent" className="btn--full">
                  {t('common.proceedToCheckout')}
                </Button>
              </aside>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
