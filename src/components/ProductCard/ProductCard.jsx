import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import Rating from '../Rating/Rating';
import SmartImage from '../SmartImage/SmartImage';
import WishlistButton from '../WishlistButton/WishlistButton';
import Icon from '../Icon/Icon';
import './ProductCard.css';

export default function ProductCard({ product, compact = false }) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const { notify } = useToast();
  const name = i18n.language === 'ar' ? product.name : product.nameEn;
  const category = i18n.language === 'ar' ? product.categoryName : product.categoryNameEn;
  const outOfStock = !product.inStock;

  const quickAdd = () => {
    addItem(product);
    notify(t('product.addedToCart'));
  };

  return (
    <article className={`pcard ${outOfStock ? 'is-out' : ''} ${compact ? 'pcard--compact' : ''}`}>
      <div className="pcard__media">
        <Link to={`/product/${product.id}`} className="pcard__media-link" tabIndex={-1} aria-hidden="true">
          <SmartImage src={product.image} alt={name} loading="lazy" />
        </Link>

        <div className="pcard__badges">
          {product.discount > 0 && (
            <span className="pcard__badge pcard__badge--sale">-{product.discount}%</span>
          )}
          {product.isNew && <span className="pcard__badge pcard__badge--new">{t('product.new')}</span>}
          {outOfStock && <span className="pcard__badge pcard__badge--out">{t('common.outOfStock')}</span>}
        </div>

        {!outOfStock && (
          <div className="pcard__quick">
            <button type="button" className="pcard__quick-btn" onClick={quickAdd}>
              <Icon name="bag" size={16} />
              {t('common.addToCart')}
            </button>
          </div>
        )}
      </div>

      <div className="pcard__top">
        <WishlistButton productId={product.id} className="pcard__wish" size={17} />
      </div>

      <div className="pcard__body">
        <p className="pcard__category">{category}</p>
        <h3 className="pcard__name">
          <Link to={`/product/${product.id}`}>{name}</Link>
        </h3>

        {!compact && (
          <div className="pcard__rating">
            <Rating value={product.rating} size={13} />
          </div>
        )}

        {product.colors?.length > 0 && (
          <div className="pcard__swatches" aria-hidden="true">
            {product.colors.slice(0, 4).map((c) => (
              <span className="pcard__swatch" key={c} style={{ background: c }} />
            ))}
            {product.colors.length > 4 && <span className="pcard__swatch-more">+{product.colors.length - 4}</span>}
          </div>
        )}

        <div className="pcard__foot">
          <div className="pcard__prices">
            <span className="pcard__price">{product.price} EGP</span>
            {product.oldPrice && <s className="pcard__old">{product.oldPrice} EGP</s>}
          </div>
          {!compact && (
            <button
              type="button"
              className="pcard__add"
              disabled={outOfStock}
              aria-label={`${t('common.addToCart')}: ${name}`}
              onClick={quickAdd}
            >
              <Icon name="plus" size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}