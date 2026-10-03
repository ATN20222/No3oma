import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero/Hero';
import TrustBar from '../../components/TrustBar/TrustBar';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PromoBand from '../../components/PromoBand/PromoBand';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import SmartImage from '../../components/SmartImage/SmartImage';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import './Home.css';

const editorialImage = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80';

export default function Home() {
  const { t } = useTranslation();
  const { featured, newArrivals, bestSellers, byCategory } = useProducts();

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="home-section home-section--first">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.categoriesEyebrow')}
            title={t('home.categoriesTitle')}
            subtitle={t('home.categoriesSubtitle')}
            action={
              <Button as={Link} to="/shop" variant="outline" size="sm">
                {t('common.viewAll')}
                <Icon name="arrowNext" size={15} />
              </Button>
            }
          />

          <div className="row home-cats" data-reveal="stagger" data-reveal-stagger="0.08">
            {categories.slice(0, 6).map((c) => (
              <div className="col-6 col-md-4 col-lg-2 home-cats__col" key={c.id}>
                <CategoryCard category={c} count={byCategory(c.id).length} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.featuredEyebrow')}
            title={t('home.featuredTitle')}
            subtitle={t('home.featuredSubtitle')}
            action={
              <Button as={Link} to="/shop" variant="link" size="sm">
                {t('common.viewAll')}
                <Icon name="arrowNext" size={15} />
              </Button>
            }
          />
          <ProductGrid products={featured.slice(0, 8)} />
        </div>
      </section>

      <PromoBand
        eyebrow={t('home.showcaseEyebrow')}
        title={t('home.showcaseTitle')}
        text={t('home.showcaseText')}
        image="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=80"
        ctaLabel={t('hero.ctaPrimary')}
        secondaryLabel={t('hero.ctaSecondary')}
      />

      <section className="home-section home-section--editorial">
        <div className="container">
          <div className="row align-center g-0">
            <div className="col-12 col-lg-6 home-editorial__col" data-reveal="mask">
              <SmartImage className="home-editorial__img" src={editorialImage} alt={t('hero.insetAlt')} />
            </div>
            <div className="col-12 col-lg-6">
              <div className="home-editorial__body" data-reveal="right">
                <p className="u-eyebrow">{t('home.craftEyebrow')}</p>
                <h2 className="home-editorial__title">{t('home.craftTitle')}</h2>
                <p className="home-editorial__text">{t('home.craftText')}</p>

                <ul className="home-editorial__list">
                  {t('home.craftPoints', { returnObjects: true }).map((p) => (
                    <li key={p}>
                      <span className="home-editorial__check">
                        <Icon name="check" size={13} strokeWidth={2.4} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <Button as={Link} to="/about" variant="primary">
                  {t('home.craftCta')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.newEyebrow')}
            title={t('home.newTitle')}
            action={
              <Button as={Link} to="/shop?sort=newest" variant="link" size="sm">
                {t('common.viewAll')}
                <Icon name="arrowNext" size={15} />
              </Button>
            }
          />
          <ProductGrid products={newArrivals.slice(0, 4)} />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.bestEyebrow')}
            title={t('home.bestTitle')}
            subtitle={t('home.bestSubtitle')}
          />
          <ProductGrid products={bestSellers.slice(0, 4)} />
        </div>
      </section>

      <PromoBand
        eyebrow={t('home.bundleEyebrow')}
        title={t('home.bundleTitle')}
        text={t('home.bundleText')}
        image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80"
        ctaLabel={t('home.bundleCta')}
        ctaTo="/category/bedSets"
        secondaryLabel={t('common.contactUs')}
        secondaryTo="/contact"
        tone="light"
        align="center"
      />

      <NewsletterSection />
    </>
  );
}