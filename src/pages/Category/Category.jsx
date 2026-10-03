import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductListing from '../../components/ProductListing/ProductListing';
import SmartImage from '../../components/SmartImage/SmartImage';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import './Category.css';

export default function Category() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { byCategory } = useProducts();
  const isAr = i18n.language === 'ar';
  const category = categories.find((c) => c.id === id);
  const name = category ? (isAr ? category.name : category.nameEn) : t('common.allProducts');
  const blurb = category ? (isAr ? category.blurb : category.blurbEn) : '';

  return (
    <>
      <PageHeader
        title={name}
        subtitle={blurb}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('common.allProducts'), to: '/shop' },
          { label: name },
        ]}
      />

      <div className="container">
        {category && (
          <div className="category__hero-wrap" data-reveal="mask">
            <SmartImage className="category__hero" src={category.image} alt={name} />
          </div>
        )}
        <ProductListing
          products={byCategory(id)}
          emptyText={t('common.noResults')}
          lockCategoryFilter
          activeCategory={name}
        />
      </div>
    </>
  );
}
