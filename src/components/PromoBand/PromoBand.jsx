import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import SmartImage from '../SmartImage/SmartImage';
import Icon from '../Icon/Icon';
import './PromoBand.css';

export default function PromoBand({
  eyebrow,
  title,
  text,
  image,
  ctaLabel,
  ctaTo = '/shop',
  secondaryLabel,
  secondaryTo = '/category/bedSets',
  align = 'start',
  tone = 'dark',
}) {
  const { t } = useTranslation();

  return (
    <section className={`promo promo--${tone} promo--${align}`}>
      <div className="container">
        <div className="promo__frame">
          <SmartImage className="promo__img" src={image} alt="" />
          <div className="promo__overlay" aria-hidden="true" />

          <div className="promo__content" data-reveal="left">
            {eyebrow && (
              <p className="promo__eyebrow">
                <Icon name="sparkles" size={15} />
                {eyebrow}
              </p>
            )}
            <h2 className="promo__title">{title}</h2>
            {text && <p className="promo__text">{text}</p>}

            <div className="promo__actions">
              <Button as={Link} to={ctaTo} variant="accent" size="lg">
                {ctaLabel || t('common.shopNow')}
              </Button>
              {secondaryLabel && (
                <Button as={Link} to={secondaryTo} variant="ghost" size="lg" className="promo__ghost">
                  {secondaryLabel}
                  <Icon name="arrowNext" size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}