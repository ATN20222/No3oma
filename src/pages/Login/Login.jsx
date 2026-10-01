import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../components/AuthForm/AuthForm';
import './Login.css';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container">
      <AuthForm
        title={t('common.login')}
        subtitle={t('auth.loginSubtitle')}
        fields={[
          { name: 'email', label: t('common.email'), type: 'email', autoComplete: 'email' },
          { name: 'password', label: t('common.password'), type: 'password', autoComplete: 'current-password' },
        ]}
        submitLabel={t('common.login')}
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/account');
        }}
        footer={
          <>
            <Link to="/forgot-password">{t('auth.forgot')}</Link>
            {' · '}
            <Link to="/register">{t('common.register')}</Link>
          </>
        }
      />
    </div>
  );
}
