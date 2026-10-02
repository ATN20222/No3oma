import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import useProducts from '../../hooks/useProducts';
import useWishlist from '../../hooks/useWishlist';
import './Wishlist.css';

export default function Wishlist() {
  const { t } = useTranslation();
  const { items } = useWishlist();
  const { byId } = useProducts();

  const products = items.map((id) => byId(id)).filter(Boolean);
  const total = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      <PageHeader
        title={t('wishlist.title')}
        subtitle={t('wishlist.subtitle')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('wishlist.title') }]}
      />

      <section className="container wishlist">
        {products.length === 0 ? (
          <div className="wishlist__empty">
            <span className="wishlist__empty-icon">
              <Icon name="heart" size={30} />
            </span>
            <h2 className="wishlist__empty-title">{t('wishlist.emptyTitle')}</h2>
            <p className="wishlist__empty-text">{t('wishlist.emptyText')}</p>
            <Button as={Link} to="/shop" variant="primary">
              {t('wishlist.browse')}
            </Button>
          </div>
        ) : (
          <>
            <div className="wishlist__bar">
              <p className="wishlist__summary">
                {t('wishlist.itemsCount', { count: products.length })}
              </p>
              <p className="wishlist__total">
                {t('wishlist.total')}: <strong>{total} EGP</strong>
              </p>
            </div>

            <ProductGrid products={products} />

            <div className="wishlist__actions">
              <Button as={Link} to="/shop" variant="outline">
                {t('common.continueShopping')}
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
}