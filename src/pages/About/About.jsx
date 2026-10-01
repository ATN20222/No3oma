import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import './About.css';

export default function About() {
  const { t } = useTranslation();
  const values = t('about.values', { returnObjects: true });

  return (
    <>
      <PageHeader title={t('about.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('about.title') }]} />

      <div className="container about">
        <div className="row about__intro">
          <div className="col-12 col-lg-6">
            <h2 className="about__h2">{t('about.storyTitle')}</h2>
            <p>{t('about.story')}</p>
            <p>{t('about.story2')}</p>
          </div>
          <div className="col-12 col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
              alt={t('hero.visualAlt')}
              loading="lazy"
            />
          </div>
        </div>

        <div className="about__values">
          <h2 className="about__h2">{t('about.valuesTitle')}</h2>
          <div className="row">
            {values.map((v) => (
              <div className="col-12 col-md-4 about__value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="about__note">{t('about.placeholderNote')}</p>
      </div>
    </>
  );
}
