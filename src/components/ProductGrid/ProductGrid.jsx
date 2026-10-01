import { useTranslation } from 'react-i18next';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, loading, error, emptyText }) {
  const { t } = useTranslation();

  if (loading) {
    return <div className="product-grid__state" role="status">{t('common.loading')}</div>;
  }
  if (error) {
    return <div className="product-grid__state product-grid__state--error" role="alert">{error}</div>;
  }
  if (!products || products.length === 0) {
    return <div className="product-grid__state">{emptyText || t('common.noResults')}</div>;
  }
  return (
    <div className="row product-grid">
      {products.map((p) => (
        <div className="col-12 col-sm-6 col-lg-4 product-grid__col" key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
