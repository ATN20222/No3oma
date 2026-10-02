import { useTranslation } from 'react-i18next';
import './ProductSort.css';

export default function ProductSort({ value, onChange }) {
  const { t } = useTranslation();
  const options = t('listing.sortOptions', { returnObjects: true });

  return (
    <label className="sort">
      <span className="visually-hidden">{t('listing.sortBy')}</span>
      <select className="select-control sort__select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
