import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import useToast from '../../hooks/useToast';
import BrandLogo from '../BrandLogo/BrandLogo';
import './Footer.css';

const shopLinks = [
  { key: 'beds', to: '/category/beds' },
  { key: 'bedSets', to: '/category/bedSets' },
  { key: 'bedSheets', to: '/category/bedSheets' },
  { key: 'pillows', to: '/category/pillows' },
  { key: 'blankets', to: '/category/blankets' },
  { key: 'bedroomTextiles', to: '/category/bedroomTextiles' },
];

const helpLinks = [
  { key: 'faq', to: '/faq' },
  { key: 'shipping', to: '/shipping-policy' },
  { key: 'returns', to: '/return-exchange-policy' },
  { key: 'contact', to: '/contact' },
];

const legalLinks = [
  { key: 'privacy', to: '/privacy-policy' },
  { key: 'terms', to: '/terms-conditions' },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [email, setEmail] = useState('');

  const socials = [
    { icon: 'instagram', label: 'Instagram' },
    { icon: 'facebook', label: 'Facebook' },
    { icon: 'whatsapp', label: 'WhatsApp' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__newsletter" data-reveal="up">
          <div>
            <h2 className="footer__nl-title">{t('newsletter.title')}</h2>
            <p className="footer__nl-text">{t('newsletter.text')}</p>
          </div>
          <form
            className="footer__nl-form"
            onSubmit={(e) => {
              e.preventDefault();
              notify(t('newsletter.done'));
              setEmail('');
            }}
          >
            <label htmlFor="footer-email" className="visually-hidden">
              {t('common.email')}
            </label>
            <input
              id="footer-email"
              type="email"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
            />
            <Button variant="primary" type="submit">
              {t('newsletter.submit')}
            </Button>
          </form>
        </div>

        <div className="footer__grid">
          <div className="footer__brand-col" data-reveal="up" data-reveal-delay="0.05">
            <Link to="/" className="footer__brand">
              <BrandLogo variant="footer" className="footer__mark" />
              <span>
                <span className="footer__name">{t('brandName')}</span>
                <span className="footer__tag">{t('brandTag')}</span>
              </span>
            </Link>
            <p className="footer__about">{t('footer.about')}</p>
            <ul className="footer__contact">
              <li>
                <Icon name="phone" size={15} />
                <span>{t('contact.phonePlaceholder')}</span>
              </li>
              <li>
                <Icon name="mail" size={15} />
                <span>{t('contact.emailPlaceholder')}</span>
              </li>
              <li>
                <Icon name="clock" size={15} />
                <span>{t('contact.hours')}</span>
              </li>
            </ul>
            <div className="footer__socials">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href="#"
                  className="footer__social"
                  aria-label={s.label}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon name={s.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">{t('footer.shop')}</h3>
            <ul className="footer__list">
              {shopLinks.map((l) => (
                <li key={l.key}>
                  <Link to={l.to}>{t(`nav.${l.key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">{t('nav.help')}</h3>
            <ul className="footer__list">
              {helpLinks.map((l) => (
                <li key={l.key}>
                  <Link to={l.to}>{t(`nav.${l.key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">{t('footer.account')}</h3>
            <ul className="footer__list">
              <li>
                <Link to="/login">{t('common.login')}</Link>
              </li>
              <li>
                <Link to="/register">{t('common.register')}</Link>
              </li>
              <li>
                <Link to="/account">{t('account.orders')}</Link>
              </li>
              <li>
                <Link to="/wishlist">{t('common.wishlist')}</Link>
              </li>
              <li>
                <Link to="/cart">{t('cart')}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {t('footer.copyright')} {YEAR} {t('brandName')}. {t('footer.rights')}
          </p>
          <nav className="footer__legal" aria-label={t('footer.legal')}>
            {legalLinks.map((l) => (
              <Link key={l.key} to={l.to}>
                {t(`nav.${l.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}