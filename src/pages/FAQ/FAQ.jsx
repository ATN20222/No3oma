import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import Accordion from '../../components/Accordion/Accordion';
import './FAQ.css';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });

  return (
    <>
      <PageHeader title={t('faq.title')} subtitle={t('faq.subtitle')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('faq.title') }]} />
      <div className="container faq" data-reveal="up">
        <Accordion items={items} />
        <p className="faq__note">{t('contact.placeholderNote')}</p>
      </div>
    </>
  );
}
