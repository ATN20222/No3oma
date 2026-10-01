import PageHeader from '../PageHeader/PageHeader';
import './PolicyPage.css';

export default function PolicyPage({ title, intro, sections = [], note }) {
  return (
    <>
      <PageHeader title={title} breadcrumbs={[{ label: 'Naouma', to: '/' }, { label: title }]} />
      <article className="container policy">
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
