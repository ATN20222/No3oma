import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../components/AuthForm/AuthForm';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <AuthForm
        title={t('auth.forgot')}
        subtitle={t('auth.forgotSubtitle')}
        fields={[{ name: 'email', label: t('common.email'), type: 'email', autoComplete: 'email' }]}
        submitLabel={t('auth.sendReset')}
        onSubmit={(e) => e.preventDefault()}
        footer={<Link to="/reset-password">{t('auth.haveCode')}</Link>}
      />
    </div>
  );
}
