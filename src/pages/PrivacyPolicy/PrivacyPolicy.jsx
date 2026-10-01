import { useTranslation } from 'react-i18next';
import PolicyPage from '../../components/PolicyPage/PolicyPage';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <PolicyPage
      title={t('policies.privacy')}
      intro={t('policies.privacyIntro')}
      sections={t('policies.privacySections', { returnObjects: true })}
      note={t('policies.legalNote')}
    />
  );
}
