import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import Button from '../../components/Button/Button';
import Rating from '../../components/Rating/Rating';
import WishlistButton from '../../components/WishlistButton/WishlistButton';
import StickyAddToCart from '../../components/StickyAddToCart/StickyAddToCart';
import Accordion from '../../components/Accordion/Accordion';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import useProducts from '../../hooks/useProducts';
import { categoryById } from '../../data/categories';
import './ProductDetails.css';

const sizes = [
  { id: 'queen', ar: 'كوين', en: 'Queen' },
  { id: 'king', ar: 'كينج', en: 'King' },
  { id: 'super', ar: 'سوبر كينج', en: 'Super King' },
];

export default function ProductDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { byId, related } = useProducts();
  const { addItem } = useCart();
  const { notify } = useToast();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(sizes[0]);
  const [colorIndex, setColorIndex] = useState(0);

  const product = byId(id);
  const isAr = i18n.language === 'ar';

  if (!product) {
    return (
      <>
        <PageHeader
          title={t('common.error')}
          breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('common.error') }]}
        />
        <div className="container pd-missing">
          <p>{t('common.noResults')}</p>
          <Button as={Link} to="/shop" variant="primary">
            {t('common.backToShop')}
          </Button>
        </div>
      </>
    );
  }

  const name = isAr ? product.name : product.nameEn;
  const category = categoryById(product.category);
  const images = [product.image, ...related(product, 2).map((p) => p.image)];
  const colors = product.colors || [];
  const sizeLabel = `${isAr ? size.ar : size.en}${colorIndex < colors.length ? ` · ${isAr ? 'درجة' : 'Shade'} ${colorIndex + 1}` : ''}`;

  const handleAdd = () => {
    addItem({ ...product, variant: sizeLabel }, qty);
    notify(t('product.addedToCart'));
  };

  return (
    <>
      <PageHeader
        title={name}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.shop'), to: '/shop' },
          { label: isAr ? category?.name : category?.nameEn, to: `/category/${product.category}` },
          { label: name },
        ]}
      />

      <div className="container pd">
        <div className="row pd__top">
          <div className="col-12 col-lg-6">
            <ProductGallery images={images} alt={name} />
          </div>

          <div className="col-12 col-lg-6">
            <div className="pd__info">
              <p className="pd__category">{isAr ? product.categoryName : product.categoryNameEn}</p>

              <div className="pd__title-row">
                <h1 className="pd__name">{name}</h1>
                <WishlistButton productId={product.id} className="pd__wish" size={20} />
              </div>

              <div className="pd__meta">
                <Rating value={product.rating} reviews={product.reviews} size={15} />
                <span className={`pd__stock ${product.inStock ? 'is-in' : 'is-out'}`}>
                  <span className="pd__dot" aria-hidden="true" />
                  {product.inStock ? t('common.inStock') : t('common.outOfStock')}
                </span>
                {product.isNew && <span className="pd__flag">{t('product.new')}</span>}
              </div>

              <div className="pd__price">
                <strong>{product.price} EGP</strong>
                {product.oldPrice && <s>{product.oldPrice} EGP</s>}
                {product.discount > 0 && <span className="pd__discount">-{product.discount}%</span>}
              </div>

              <p className="pd__desc">{t('product.description')}</p>

              <div className="pd__option">
                <span className="pd__option-label">
                  {t('common.size')}
                  <span className="pd__option-value">{isAr ? size.ar : size.en}</span>
                </span>
                <div className="pd__sizes">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`pd__size ${size.id === s.id ? 'is-active' : ''}`}
                      onClick={() => setSize(s)}
                      aria-pressed={size.id === s.id}
                    >
                      {isAr ? s.ar : s.en}
                    </button>
                  ))}
                </div>
              </div>

              {colors.length > 0 && (
                <div className="pd__option">
                  <span className="pd__option-label">{t('common.color')}</span>
                  <div className="pd__swatches">
                    {colors.map((c, i) => (
                      <button
                        key={c}
                        type="button"
                        className={`pd__swatch ${colorIndex === i ? 'is-active' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setColorIndex(i)}
                        aria-label={`${t('common.color')} ${i + 1}`}
                        aria-pressed={colorIndex === i}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pd__actions">
                <QuantitySelector value={qty} onChange={setQty} label={t('common.quantity')} />
                <Button variant="primary" onClick={handleAdd} disabled={!product.inStock} className="pd__add">
                  {product.inStock ? t('common.addToCart') : t('common.outOfStock')}
                </Button>
              </div>

              <ul className="pd__perks">
                <li>{t('trust.shippingText')}</li>
                <li>{t('trust.returnsText')}</li>
                <li>{t('trust.qualityText')}</li>
              </ul>

              <Accordion
                items={[
                  { q: t('product.detailsTitle'), a: t('product.detailsBody') },
                  { q: t('product.careTitle'), a: t('product.careBody') },
                  { q: t('product.shippingTitle'), a: t('product.shippingBody') },
                  { q: t('product.returnsTitle'), a: t('product.returnsBody') },
                ]}
              />
            </div>
          </div>
        </div>

        <SectionHeader
          title={t('product.relatedTitle')}
          action={
            <Button as={Link} to={`/category/${product.category}`} variant="link" size="sm">
              {t('common.viewAll')}
            </Button>
          }
        />
        <ProductGrid products={related(product, 4)} />
      </div>

      <StickyAddToCart
        visible
        disabled={!product.inStock}
        productName={name}
        price={product.price}
        onAdd={handleAdd}
      />
    </>
  );
}