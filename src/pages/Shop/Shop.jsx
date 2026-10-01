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
        title={t('nav.bedding')}
        subtitle={t('hero.text')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('common.searchResults') }]}
      />
      <div className="container">
        <ProductListing products={products} />
      </div>
    </>
  );
}
