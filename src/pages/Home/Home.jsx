import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero/Hero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import './Home.css';

export default function Home() {
  const { t, i18n } = useTranslation();
  const { featured, newArrivals, bestSellers } = useProducts();

  return (
    <>
      <Hero />

      <section className="home-section">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.featuredEyebrow')}
            title={t('nav.bedding')}
            action={<Link to="/shop">{t('common.continueShopping')} →</Link>}
          />
          <div className="row">
            {categories.slice(0, 6).map((c) => (
              <div className="col-6 col-lg-4 home-cat" key={c.id}>
                <Link to={`/category/${c.id}`} className="home-cat__card">
                  <span className="home-cat__name">{i18n.language === 'ar' ? c.name : c.nameEn}</span>
                </Link>
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
            subtitle={t('hero.text')}
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="row align-center home-promo">
            <div className="col-12 col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
                alt={t('hero.visualAlt')}
                loading="lazy"
              />
            </div>
            <div className="col-12 col-lg-6">
              <div className="home-promo__body">
                <p className="home-promo__eyebrow">{t('home.showcaseEyebrow')}</p>
                <h2>{t('home.showcaseTitle')}</h2>
                <p>{t('hero.text')}</p>
                <Link to="/category/bedding" className="home-promo__link">
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeader title={t('home.newTitle')} />
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <SectionHeader title={t('home.bestTitle')} />
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
