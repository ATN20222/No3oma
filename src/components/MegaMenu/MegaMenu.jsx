import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import Icon from '../Icon/Icon';
import SmartImage from '../SmartImage/SmartImage';
import './MegaMenu.css';

export default function MegaMenu({ open, onClose }) {
  const { t, i18n } = useTranslation();
  if (!open) return null;

  const label = (c) => (i18n.language === 'ar' ? c.name : c.nameEn);

  return (
    <div className="mega" role="region" aria-label={label(categories[0])}>
      <div className="container mega__inner">
        <div className="mega__links">
          <p className="mega__heading">{t('home.categoriesEyebrow')}</p>
          <ul className="mega__grid">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.id}`} className="mega__link" onClick={onClose}>
                  <span>{label(c)}</span>
                  <Icon name="chevronNext" size={15} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/category/bedSets" className="mega__promo" onClick={onClose}>
          <SmartImage
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
            alt={t('nav.bedSets')}
          />
          <span className="mega__promo-body">
            <span className="mega__promo-title">{t('nav.bedSets')}</span>
            <span className="mega__promo-text">{t('mega.promoText')}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}