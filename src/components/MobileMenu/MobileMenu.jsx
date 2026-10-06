import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import BrandLogo from '../BrandLogo/BrandLogo';
import './MobileMenu.css';

const serviceLinks = [
  { key: 'faq', to: '/faq' },
  { key: 'shipping', to: '/shipping-policy' },
  { key: 'returns', to: '/return-exchange-policy' },
];

export default function MobileMenu({ open, onClose }) {
  const { t, i18n } = useTranslation();
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add('u-no-scroll');
      closeRef.current?.focus();
    }
    return () => document.body.classList.remove('u-no-scroll');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const catLabel = (c) => (i18n.language === 'ar' ? c.name : c.nameEn);

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label={t('nav.menu')}>
      <button type="button" className="drawer__backdrop" aria-label={t('common.close')} onClick={onClose} />

      <div className="drawer__panel">
        <div className="drawer__head">
          <span className="drawer__brand">
            <BrandLogo variant="stacked" />
            <span className="drawer__brand-name">{t('brandName')}</span>
          </span>
          <button ref={closeRef} type="button" className="drawer__close" onClick={onClose} aria-label={t('common.close')}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav className="drawer__nav" aria-label={t('nav.menu')}>
          <p className="drawer__label">{t('nav.shop')}</p>
          <Link to="/shop" className="drawer__link" onClick={onClose}>
            <Icon name="arrowNext" size={17} />
            <span>{t('common.allProducts')}</span>
          </Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="drawer__link" onClick={onClose}>
              <Icon name="arrowNext" size={17} />
              <span>{catLabel(c)}</span>
            </Link>
          ))}

          <p className="drawer__label drawer__label--spaced">{t('nav.help')}</p>
          {serviceLinks.map((l) => (
            <Link key={l.key} to={l.to} className="drawer__link" onClick={onClose}>
              <Icon name="arrowNext" size={17} />
              <span>{t(`nav.${l.key}`)}</span>
            </Link>
          ))}
          <Link to="/about" className="drawer__link" onClick={onClose}>
            <Icon name="arrowNext" size={17} />
            <span>{t('nav.about')}</span>
          </Link>
          <Link to="/contact" className="drawer__link" onClick={onClose}>
            <Icon name="arrowNext" size={17} />
            <span>{t('nav.contact')}</span>
          </Link>
        </nav>

        <div className="drawer__foot">
          <Button as={Link} to="/login" variant="primary" className="btn--full" onClick={onClose}>
            {t('common.login')}
          </Button>
          <Button as={Link} to="/register" variant="outline" className="btn--full" onClick={onClose}>
            {t('common.register')}
          </Button>
        </div>
      </div>
    </div>
  );
}