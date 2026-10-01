import { useTranslation } from 'react-i18next';
import PolicyPage from '../../components/PolicyPage/PolicyPage';
import './ShippingPolicy.css';

export default function ShippingPolicy() {
  const { t } = useTranslation();
  return (
    <PolicyPage
      title={t('policies.shipping')}
      intro={t('policies.shippingIntro')}
      sections={t('policies.shippingSections', { returnObjects: true })}
      note={t('policies.legalNote')}
    />
  );
}
