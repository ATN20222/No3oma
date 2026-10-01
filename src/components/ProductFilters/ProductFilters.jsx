import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories';
import './ProductFilters.css';

export default function ProductFilters({ filters, onChange, showCategory = true }) {
  const { t, i18n } = useTranslation();

  const toggleCategory = (id) => {
    onChange({ ...filters, category: filters.category === id ? '' : id });
  };

  return (
    <div className="filters">
      {showCategory && (
        <fieldset className="filters__group">
          <legend className="filters__legend">{t('nav.bedding')}</legend>
          <ul className="filters__list">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <label className="filters__check">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === c.id}
                    onChange={() => toggleCategory(c.id)}
                  />
                  <span>{i18n.language === 'ar' ? c.name : c.nameEn}</span>
                </label>
              </li>
            ))}
            {filters.category && (
              <li>
                <button type="button" className="filters__clear" onClick={() => onChange({ ...filters, category: '' })}>
                  {t('common.remove')}
                </button>
              </li>
            )}
          </ul>
        </fieldset>
      )}

      <fieldset className="filters__group">
        <legend className="filters__legend">{t('common.price')}</legend>
        <div className="d-flex flex-column gap-2">
          <label className="filters__check">
            <input type="radio" name="price" checked={filters.price === ''} onChange={() => onChange({ ...filters, price: '' })} />
            <span>{t('common.price')} — {t('common.total')}</span>
          </label>
          <label className="filters__check">
            <input type="radio" name="price" checked={filters.price === 'low'} onChange={() => onChange({ ...filters, price: 'low' })} />
            <span>&lt; 1000 EGP</span>
          </label>
          <label className="filters__check">
            <input type="radio" name="price" checked={filters.price === 'mid'} onChange={() => onChange({ ...filters, price: 'mid' })} />
            <span>1000 – 2000 EGP</span>
          </label>
          <label className="filters__check">
            <input type="radio" name="price" checked={filters.price === 'high'} onChange={() => onChange({ ...filters, price: 'high' })} />
            <span>&gt; 2000 EGP</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__legend">{t('common.inStock')}</legend>
        <label className="filters__check">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
          />
          <span>{t('common.inStock')}</span>
        </label>
      </fieldset>
    </div>
  );
}
