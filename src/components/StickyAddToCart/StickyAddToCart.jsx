import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import './StickyAddToCart.css';

export default function StickyAddToCart({ productName, price, visible, disabled, onAdd }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!visible) return undefined;
    document.body.classList.add('has-sticky-atc');
    return () => document.body.classList.remove('has-sticky-atc');
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="sticky-atc" role="region" aria-label={t('common.addToCart')}>
      <div className="container sticky-atc__inner">
        <div className="sticky-atc__info">
          <strong className="sticky-atc__name">{productName}</strong>
          <span className="sticky-atc__price">{price} EGP</span>
        </div>
        <Button variant="primary" onClick={onAdd} disabled={disabled} className="btn--block-sm">
          {t('common.addToCart')}
        </Button>
      </div>
    </div>
  );
}
