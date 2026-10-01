import { useTranslation } from 'react-i18next';
import PolicyPage from '../../components/PolicyPage/PolicyPage';
import './TermsConditions.css';

export default function TermsConditions() {
  const { t } = useTranslation();
  return (
    <PolicyPage
      title={t('policies.terms')}
      intro={t('policies.termsIntro')}
      sections={t('policies.termsSections', { returnObjects: true })}
      note={t('policies.legalNote')}
    />
  );
}
