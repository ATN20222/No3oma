import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import SmartImage from '../SmartImage/SmartImage';
import Icon from '../Icon/Icon';
import './Hero.css';

const heroImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80';
const insetImage = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';

export default function Hero() {
  const { t } = useTranslation();
  const highlights = t('hero.highlights', { returnObjects: true });
  const icons = ['sparkles', 'shield', 'truck'];

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="row hero__row align-center g-0">
          <div className="col-12 col-lg-5 hero__col-text">
            <div className="hero__content">
              <p className="u-eyebrow">{t('hero.eyebrow')}</p>
              <h1 className="hero__title">{t('hero.title')}</h1>
              <p className="hero__text">{t('hero.text')}</p>

              <div className="hero__actions">
                <Button as={Link} to="/shop" variant="primary" size="lg">
                  {t('hero.ctaPrimary')}
                </Button>
                <Button as={Link} to="/category/bedSets" variant="outline" size="lg">
                  {t('hero.ctaSecondary')}
                </Button>
              </div>

              <ul className="hero__highlights">
                {highlights.map((h, i) => (
                  <li key={h}>
                    <Icon name={icons[i] || 'check'} size={17} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-7 hero__col-media">
            <div className="hero__visual">
              <Link to="/shop" className="hero__main">
                <SmartImage src={heroImage} alt={t('hero.visualAlt')} />
              </Link>

              <Link to="/category/blankets" className="hero__inset">
                <SmartImage src={insetImage} alt={t('hero.insetAlt')} />
                <span className="hero__inset-caption">
                  <Rating value={4.8} size={12} showValue={false} />
                  <span className="hero__inset-text">{t('hero.insetText')}</span>
                </span>
              </Link>

              <span className="hero__chip">
                <Icon name="gift" size={15} />
                {t('hero.chip')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}