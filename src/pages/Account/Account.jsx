import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import './Account.css';

const tabs = ['profile', 'orders', 'addresses', 'settings'];
const orders = [{ ref: 'NM-1024', date: '—', total: 2499, status: 'processing' }];

export default function Account() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('profile');

  return (
    <>
      <PageHeader title={t('account.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('account.title') }]} />
      <div className="container account">
        <nav className="account__tabs" aria-label={t('account.title')}>
          {tabs.map((x) => (
            <button
              key={x}
              type="button"
              className={`account__tab ${tab === x ? 'is-active' : ''}`}
              onClick={() => setTab(x)}
              aria-current={tab === x ? 'page' : undefined}
            >
              {t(`account.${x}`)}
            </button>
          ))}
        </nav>

        <div className="account__panel">
          {tab === 'profile' && (
            <div className="form-card">
              <h2 className="account__title">{t('account.profile')}</h2>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="ac-name">{t('common.fullName')}</label>
                  <input id="ac-name" className="form-control" defaultValue="" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="ac-phone">{t('common.phone')}</label>
                  <input id="ac-phone" className="form-control" defaultValue="" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="ac-email">{t('common.email')}</label>
                  <input id="ac-email" type="email" className="form-control" defaultValue="" />
                </div>
              </div>
              <Button variant="primary" size="sm">{t('common.save')}</Button>
            </div>
          )}

          {tab === 'orders' && (
            <div className="form-card">
              <h2 className="account__title">{t('account.orders')}</h2>
              <ul className="account__orders">
                {orders.map((o) => (
                  <li key={o.ref}>
                    <div>
                      <strong>{o.ref}</strong>
                      <small>{t('account.status')}: {t(`account.status_${o.status}`)}</small>
                    </div>
                    <div className="account__order-end">
                      <span>{o.total} EGP</span>
                      <Link to="/order-confirmation">{t('account.details')}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'addresses' && (
            <div className="form-card">
              <h2 className="account__title">{t('account.addresses')}</h2>
              <p className="form-hint">{t('account.noAddresses')}</p>
              <Button variant="outline" size="sm">{t('account.addAddress')}</Button>
            </div>
          )}

          {tab === 'settings' && (
            <div className="form-card">
              <h2 className="account__title">{t('account.settings')}</h2>
              <Button as={Link} to="/" variant="outline" size="sm">{t('common.logout')}</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
