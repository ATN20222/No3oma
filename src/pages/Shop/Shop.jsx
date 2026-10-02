import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductListing from '../../components/ProductListing/ProductListing';
import useProducts from '../../hooks/useProducts';
import './Shop.css';

export default function Shop() {
  const { t } = useTranslation();
  const { products } = useProducts();

  return (
    <>
      <PageHeader
        title={t('common.allProducts')}
        subtitle={t('shop.subtitle')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('common.allProducts') }]}
      />
      <div className="container">
        <ProductListing products={products} />
      </div>
    </>
  );
}
