import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SmartImage from '../SmartImage/SmartImage';
import Icon from '../Icon/Icon';
import './CategoryCard.css';

export default function CategoryCard({ category, count }) {
  const { i18n } = useTranslation();
  const label = i18n.language === 'ar' ? category.name : category.nameEn;
  const blurb = i18n.language === 'ar' ? category.blurb : category.blurbEn;

  return (
    <Link to={`/category/${category.id}`} className="cat-card">
      <span className="cat-card__media">
        <SmartImage src={category.image} alt={label} loading="lazy" />
      </span>
      <span className="cat-card__overlay" aria-hidden="true" />
      <span className="cat-card__body">
        <span className="cat-card__name">{label}</span>
        <span className="cat-card__blurb">{blurb}</span>
        <span className="cat-card__meta">
          {count !== undefined && <span className="cat-card__count">{count}</span>}
          <Icon name="arrowNext" size={16} className="cat-card__arrow" />
        </span>
      </span>
    </Link>
  );
}