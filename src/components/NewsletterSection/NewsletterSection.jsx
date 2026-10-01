import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import useToast from '../../hooks/useToast';
import './NewsletterSection.css';

export default function NewsletterSection() {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [email, setEmail] = useState('');

  return (
    <section className="newsletter">
      <div className="container newsletter__inner">
        <div>
          <h2 className="newsletter__title">{t('newsletter.title')}</h2>
          <p className="newsletter__text">{t('newsletter.text')}</p>
        </div>
        <form
          className="newsletter__form"
          onSubmit={(e) => {
            e.preventDefault();
            notify(t('newsletter.done'));
            setEmail('');
          }}
        >
          <label className="visually-hidden" htmlFor="newsletter-email">{t('common.email')}</label>
          <input
            id="newsletter-email"
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('common.email')}
          />
          <Button variant="accent" type="submit">{t('newsletter.submit')}</Button>
        </form>
      </div>
    </section>
  );
}
