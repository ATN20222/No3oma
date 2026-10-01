import { useTranslation } from 'react-i18next';
import './ProductSort.css';

export default function ProductSort({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <label className="sort">
      <span className="sort__label">{t('common.price')}</span>
      <select className="sort__select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Rating</option>
      </select>
    </label>
  );
}
