import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import Button from '../../components/Button/Button';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import './ProductDetails.css';

const sizes = ['Queen', 'King', 'Super King'];
const colors = ['Ivory', 'Sand', 'Olive', 'Rose'];

export default function ProductDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { byId, related } = useProducts();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(sizes[0]);
  const [color, setColor] = useState(colors[0]);

  const product = byId(id);

  if (!product) {
    return (
      <>
        <PageHeader title={t('common.error')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('common.error') }]} />
        <div className="container pd-missing">{t('common.noResults')}</div>
      </>
    );
  }

  const name = i18n.language === 'ar' ? product.name : product.nameEn;
  const images = [product.image, ...related(product, 2).map((p) => p.image)];

  const handleAdd = () => {
    addItem({ ...product, variant: `${size} · ${color}` }, qty);
    navigate('/cart');
  };

  return (
    <>
      <PageHeader
        title={name}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.bedding'), to: '/shop' },
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
              <p className="pd__category">{i18n.language === 'ar' ? product.categoryName : product.categoryNameEn}</p>
              <h1 className="pd__name">{name}</h1>

              <div className="pd__rating">
                <span aria-label={`${product.rating} / 5`}>★ {product.rating}</span>
                <span className={`pd__stock ${product.inStock ? 'is-in' : 'is-out'}`}>
                  {product.inStock ? t('common.inStock') : t('common.outOfStock')}
                </span>
              </div>

              <div className="pd__price">
                <strong>{product.price} EGP</strong>
                {product.oldPrice && <s>{product.oldPrice} EGP</s>}
                {product.discount && <span className="pd__discount">-{product.discount}%</span>}
              </div>

              <p className="pd__desc">{t('hero.text')}</p>

              <div className="pd__option">
                <span className="pd__option-label">{t('common.size')}</span>
                <div className="pd__sizes">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`pd__size ${size === s ? 'is-active' : ''}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pd__option">
                <span className="pd__option-label">{t('common.color')}</span>
                <div className="pd__sizes">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`pd__size ${color === c ? 'is-active' : ''}`}
                      onClick={() => setColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pd__actions">
                <QuantitySelector value={qty} onChange={setQty} label={t('common.quantity')} />
                <Button variant="primary" onClick={handleAdd} disabled={!product.inStock}>
                  {t('common.addToCart')}
                </Button>
                <Button as={Link} to="/checkout" variant="outline">
                  {t('common.buyNow')}
                </Button>
              </div>

              <dl className="pd__facts">
                <div>
                  <dt>{t('nav.shipping')}</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>{t('nav.returns')}</dt>
                  <dd>—</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <SectionHeader title={t('common.continueShopping')} />
        <ProductGrid products={related(product, 4)} />
      </div>
    </>
  );
}
