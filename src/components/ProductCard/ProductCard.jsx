import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import Button from '../Button/Button';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const { notify } = useToast();
  const name = i18n.language === 'ar' ? product.name : product.nameEn;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__media">
        {product.discount && <span className="product-card__badge">{product.discount}%</span>}
        <img src={product.image} alt={name} loading="lazy" />
      </Link>
      <div className="product-card__body">
        <p className="product-card__category">{i18n.language === 'ar' ? product.categoryName : product.categoryNameEn}</p>
        <h3 className="product-card__name">
          <Link to={`/product/${product.id}`}>{name}</Link>
        </h3>
        <div className="product-card__meta">
          <span className="product-card__rating" aria-label={`${product.rating} / 5`}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.6l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8z" fill="currentColor" /></svg>
            {product.rating}
          </span>
          <span className="product-card__price">
            {product.oldPrice && <s>{product.oldPrice} EGP</s>}
            <strong>{product.price} EGP</strong>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="product-card__action"
          disabled={!product.inStock}
          onClick={() => {
            addItem(product);
            notify(`${name} — ${t('common.addToCart')}`);
          }}
        >
          {product.inStock ? t('common.addToCart') : t('common.outOfStock')}
        </Button>
      </div>
    </article>
  );
}
