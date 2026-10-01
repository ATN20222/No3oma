import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductListing from '../../components/ProductListing/ProductListing';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import './Category.css';

export default function Category() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { byCategory } = useProducts();
  const category = categories.find((c) => c.id === id);
  const name = category ? (i18n.language === 'ar' ? category.name : category.nameEn) : t('common.searchResults');

  return (
    <>
      <PageHeader
        title={name}
        subtitle={t('hero.text')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('common.searchResults'), to: '/shop' }, { label: name }]}
      />
      <div className="container">
        <ProductListing products={byCategory(id)} emptyText={t('common.noResults')} lockCategoryFilter />
      </div>
    </>
  );
}
