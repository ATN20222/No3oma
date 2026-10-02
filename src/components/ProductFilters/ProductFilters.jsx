import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import './ProductFilters.css';

const priceBands = [
  { id: '', ar: 'كل الأسعار', en: 'All prices' },
  { id: 'low', ar: 'أقل من 1000 ج.م', en: 'Under EGP 1,000' },
  { id: 'mid', ar: '1000 – 2000 ج.م', en: 'EGP 1,000 – 2,000' },
  { id: 'high', ar: 'أكثر من 2000 ج.م', en: 'Over EGP 2,000' },
];

export default function ProductFilters({ filters, onChange, showCategory = true }) {
  const { t, i18n } = useTranslation();
  const { byCategory } = useProducts();

  const toggleCategory = (id) => {
    onChange({ ...filters, category: filters.category === id ? '' : id });
  };

  return (
    <div className="filters">
      {showCategory && (
        <fieldset className="filters__group">
          <legend className="filters__legend">{t('filters.category')}</legend>
          <ul className="filters__list">
            {categories.map((c) => {
              const count = byCategory(c.id).length;
              return (
                <li key={c.id}>
                  <label className={`filters__check ${filters.category === c.id ? 'is-on' : ''}`}>
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === c.id}
                      onChange={() => toggleCategory(c.id)}
                    />
                    <span className="filters__check-text">{i18n.language === 'ar' ? c.name : c.nameEn}</span>
                    <span className="filters__check-count">{count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      <fieldset className="filters__group">
        <legend className="filters__legend">{t('filters.priceRange')}</legend>
        <div className="filters__stack">
          {priceBands.map((b) => (
            <label className={`filters__check ${filters.price === b.id ? 'is-on' : ''}`} key={b.id}>
              <input
                type="radio"
                name="price"
                checked={filters.price === b.id}
                onChange={() => onChange({ ...filters, price: b.id })}
              />
              <span className="filters__check-text">{i18n.language === 'ar' ? b.ar : b.en}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__legend">{t('filters.availability')}</legend>
        <label className={`filters__check ${filters.inStockOnly ? 'is-on' : ''}`}>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
          />
          <span className="filters__check-text">{t('filters.inStockOnly')}</span>
        </label>
      </fieldset>
    </div>
  );
}
