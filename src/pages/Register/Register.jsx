import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../components/AuthForm/AuthForm';
import './Register.css';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container">
      <AuthForm
        title={t('common.register')}
        subtitle={t('auth.registerSubtitle')}
        fields={[
          { name: 'name', label: t('common.fullName'), autoComplete: 'name' },
          { name: 'phone', label: t('common.phone'), type: 'tel', autoComplete: 'tel' },
          { name: 'email', label: t('common.email'), type: 'email', autoComplete: 'email' },
          { name: 'password', label: t('common.password'), type: 'password', autoComplete: 'new-password' },
        ]}
        submitLabel={t('common.register')}
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/account');
        }}
        footer={<Link to="/login">{t('common.login')}</Link>}
      />
    </div>
  );
}
