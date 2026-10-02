import { useTranslation } from 'react-i18next';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, loading, error, emptyText, columns = 4 }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid-state" role="status">
        <span className="grid-state__spinner" aria-hidden="true" />
        {t('common.loading')}
      </div>
    );
  }
  if (error) {
    return (
      <div className="grid-state grid-state--error" role="alert">
        {error}
      </div>
    );
  }
  if (!products || products.length === 0) {
    return (
      <div className="grid-state">
        <span className="grid-state__icon" aria-hidden="true">◎</span>
        <p className="grid-state__title">{emptyText || t('common.noResults')}</p>
        <p className="grid-state__text">{t('common.noResultsHint')}</p>
      </div>
    );
  }

  const colClass = `col-6 col-md-${columns === 3 ? 4 : 4} col-lg-${columns === 2 ? 6 : 3} grid__col`;

  return (
    <div className="row grid">
      {products.map((p) => (
        <div className={colClass} key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
