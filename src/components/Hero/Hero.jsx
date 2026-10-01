import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const highlights = t('hero.highlights', { returnObjects: true });

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="row hero__row align-center">
          <div className="col-12 col-lg-6">
            <div className="hero__content">
              <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
              <h1>{t('hero.title')}</h1>
              <p className="hero__text">{t('hero.text')}</p>
              <div className="hero__actions">
                <Button as={Link} to="/shop" variant="primary" size="lg">{t('hero.ctaPrimary')}</Button>
                <Button as={Link} to="/category/bedding" variant="outline" size="lg">{t('hero.ctaSecondary')}</Button>
              </div>
              <ul className="hero__highlights">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <figure className="hero__visual">
              <div className="hero__image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=1200&q=80"
                  alt={t('hero.visualAlt')}
                />
              </div>
              <div className="hero__badge hero__badge--top"><span>{t('hero.badge1')}</span></div>
              <div className="hero__badge hero__badge--bottom">
                <strong>{t('hero.badge2')}</strong>
                <span>{t('hero.badge2Sub')}</span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
