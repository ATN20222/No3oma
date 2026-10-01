import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader title={t('contact.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('contact.title') }]} />
      <div className="container contact">
        <div className="row contact__body">
          <div className="col-12 col-lg-5">
            <h2 className="contact__h2">{t('contact.infoTitle')}</h2>
            <dl className="contact__rows">
              <div><dt>{t('common.phone')}</dt><dd>—</dd></div>
              <div><dt>{t('common.email')}</dt><dd>—</dd></div>
              <div><dt>{t('common.address')}</dt><dd>—</dd></div>
              <div><dt>{t('nav.faq')}</dt><dd><Link to="/faq">{t('nav.faq')}</Link></dd></div>
            </dl>
            <p className="contact__note">{t('contact.placeholderNote')}</p>
          </div>

          <div className="col-12 col-lg-7">
            {sent ? (
              <div className="form-card contact__sent">{t('contact.sent')}</div>
            ) : (
              <form
                className="form-card"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="ct-name">{t('common.fullName')}</label>
                    <input id="ct-name" className="form-control" required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="ct-phone">{t('common.phone')}</label>
                    <input id="ct-phone" type="tel" className="form-control" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="ct-email">{t('common.email')}</label>
                    <input id="ct-email" type="email" className="form-control" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="ct-message">{t('contact.message')}</label>
                    <textarea id="ct-message" className="form-control" rows="5" required />
                  </div>
                </div>
                <Button variant="primary" type="submit">{t('contact.send')}</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
