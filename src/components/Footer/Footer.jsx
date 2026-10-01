import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';

const CURRENT_YEAR = new Date().getFullYear();
import './Footer.css';

const shopLinks = [
  { key: 'bedSets', to: '/category/bedSets' },
  { key: 'bedSheets', to: '/category/bedSheets' },
  { key: 'pillows', to: '/category/pillows' },
  { key: 'blankets', to: '/category/blankets' },
];

const helpLinks = [
  { key: 'faq', to: '/faq' },
  { key: 'shipping', to: '/shipping-policy' },
  { key: 'returns', to: '/return-exchange-policy' },
  { key: 'contact', to: '/contact' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer__grid">
          <div className="col-12 col-md-4">
            <div className="footer__brand">
              <span className="brand-mark" aria-hidden="true">N</span>
              <p className="footer__tag">{t('brandTag')}</p>
            </div>
            <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email">{t('common.email')}</label>
              <div className="d-flex gap-2">
                <input id="footer-email" type="email" className="form-control" placeholder={t('common.email')} />
                <Button variant="accent" size="sm">{t('common.email')}</Button>
              </div>
            </form>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <h3 className="footer__title">{t('nav.bedding')}</h3>
            <ul className="footer__list">
              {shopLinks.map((l) => (
                <li key={l.key}><Link to={l.to}>{t(`nav.${l.key}`)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <h3 className="footer__title">{t('nav.faq')}</h3>
            <ul className="footer__list">
              {helpLinks.map((l) => (
                <li key={l.key}><Link to={l.to}>{t(`nav.${l.key}`)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-2">
            <h3 className="footer__title">{t('nav.contact')}</h3>
            <ul className="footer__list">
              <li><span>{t('common.phone')}: —</span></li>
              <li><span>{t('common.email')}: —</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom d-flex flex-column flex-row justify-between align-center gap-2">
          <small>© {CURRENT_YEAR} Naouma</small>
          <div className="footer__policies">
            <Link to="/privacy-policy">{t('nav.privacy')}</Link>
            <Link to="/terms-conditions">{t('nav.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
