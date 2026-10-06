import { useTranslation } from 'react-i18next';
import PageHeader from '../PageHeader/PageHeader';
import './PolicyPage.css';

export default function PolicyPage({ title, intro, sections = [], note }) {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={title} breadcrumbs={[{ label: t('brandName'), to: '/' }, { label: title }]} />
      <article className="container policy" data-reveal="up">
        {intro && <p className="policy__intro">{intro}</p>}
        {sections.map((s) => (
          <section className="policy__section" key={s.title}>
            <h2>{s.title}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        {note && <p className="policy__note">{note}</p>}
      </article>
    </>
  );
}
