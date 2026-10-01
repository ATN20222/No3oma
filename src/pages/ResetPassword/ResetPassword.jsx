import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../components/AuthForm/AuthForm';
import './ResetPassword.css';

export default function ResetPassword() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <AuthForm
        title={t('auth.reset')}
        subtitle={t('auth.resetSubtitle')}
        fields={[
          { name: 'code', label: t('auth.code'), autoComplete: 'one-time-code' },
          { name: 'password', label: t('common.password'), type: 'password', autoComplete: 'new-password' },
        ]}
        submitLabel={t('auth.reset')}
        onSubmit={(e) => e.preventDefault()}
        footer={<Link to="/login">{t('common.login')}</Link>}
      />
    </div>
  );
}
