import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/Button/Button';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useCart from '../../hooks/useCart';
import './Checkout.css';

const SHIPPING_FLAT = 75;

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', address: '', city: '', area: '', notes: '',
  });
  const [coupon, setCoupon] = useState('');
  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'required';
    if (!/^[\d+\s]{6,}$/.test(form.phone.trim())) next.phone = 'invalid';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'invalid';
    if (!form.address.trim()) next.address = 'required';
    if (!form.city.trim()) next.city = 'required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ref = `NM-${Date.now().toString().slice(-6)}`;
    clearCart();
    navigate('/order-confirmation', { state: { ref, form, total: subtotal + SHIPPING_FLAT, items } });
  };

  return (
    <div className="container checkout">
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('cart'), to: '/cart' }, { label: t('common.checkout') }]} />
      <h1 className="checkout__title">{t('common.checkout')}</h1>

      {items.length === 0 ? (
        <div className="checkout__empty">
          <p>{t('common.empty')}</p>
          <Button as={Link} to="/shop" variant="primary">{t('common.continueShopping')}</Button>
        </div>
      ) : (
        <form className="row checkout__body" onSubmit={submit} noValidate>
          <div className="col-12 col-lg-7">
            <section className="form-card checkout__section">
              <h2 className="checkout__section-title">{t('common.fullName')}</h2>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="co-name">{t('common.fullName')}</label>
                  <input id="co-name" className="form-control" value={form.fullName} onChange={set('fullName')} />
                  {errors.fullName && <p className="form-error">{t('common.required')}</p>}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="co-phone">{t('common.phone')}</label>
                  <input id="co-phone" className="form-control" inputMode="tel" value={form.phone} onChange={set('phone')} />
                  {errors.phone && <p className="form-error">{t('common.invalid')}</p>}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="co-email">{t('common.email')}</label>
                  <input id="co-email" type="email" className="form-control" value={form.email} onChange={set('email')} />
                  {errors.email && <p className="form-error">{t('common.invalid')}</p>}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="co-address">{t('common.address')}</label>
                  <input id="co-address" className="form-control" value={form.address} onChange={set('address')} />
                  {errors.address && <p className="form-error">{t('common.required')}</p>}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="co-city">{t('common.city')}</label>
                  <input id="co-city" className="form-control" value={form.city} onChange={set('city')} />
                  {errors.city && <p className="form-error">{t('common.required')}</p>}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="co-area">{t('common.area')}</label>
                  <input id="co-area" className="form-control" value={form.area} onChange={set('area')} />
                </div>
              </div>
            </section>

            <section className="form-card checkout__section">
              <h2 className="checkout__section-title">{t('common.checkout')}</h2>
              <label className="checkout__radio">
                <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={(e) => setPayment(e.target.value)} />
                <span>{t('common.cod')}</span>
              </label>
              <label className="checkout__radio">
                <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={(e) => setPayment(e.target.value)} />
                <span>{t('common.card')}</span>
              </label>
            </section>
          </div>

          <div className="col-12 col-lg-5">
            <aside className="checkout__summary">
              <h2 className="checkout__section-title">{t('common.total')}</h2>
              <div className="checkout__items">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} onUpdate={updateQuantity} onRemove={removeItem} />
                ))}
              </div>
              <div className="checkout__coupon">
                <label className="form-label" htmlFor="co-coupon">{t('common.coupon')}</label>
                <div className="d-flex gap-2">
                  <input id="co-coupon" className="form-control" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                  <Button type="button" variant="outline" size="sm">{t('common.apply')}</Button>
                </div>
              </div>
              <dl className="cart__rows">
                <div><dt>{t('common.subtotal')} ({itemCount})</dt><dd>{subtotal} EGP</dd></div>
                <div><dt>{t('common.shipping')}</dt><dd>{SHIPPING_FLAT} EGP</dd></div>
                <div className="cart__rows-total"><dt>{t('common.total')}</dt><dd>{subtotal + SHIPPING_FLAT} EGP</dd></div>
              </dl>
              <Button variant="accent" className="btn--full" type="submit">{t('common.placeOrder')}</Button>
            </aside>
          </div>
        </form>
      )}
    </div>
  );
}
