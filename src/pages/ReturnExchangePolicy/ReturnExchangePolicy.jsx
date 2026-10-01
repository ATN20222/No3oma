import { useTranslation } from 'react-i18next';
import PolicyPage from '../../components/PolicyPage/PolicyPage';
import './ReturnExchangePolicy.css';

export default function ReturnExchangePolicy() {
  const { t } = useTranslation();
  return (
    <PolicyPage
      title={t('policies.returns')}
      intro={t('policies.returnsIntro')}
      sections={t('policies.returnsSections', { returnObjects: true })}
      note={t('policies.legalNote')}
    />
  );
}
