import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import './AuthForm.css';

export default function AuthForm({ title, subtitle, fields, submitLabel, footer, onSubmit }) {
  const { t } = useTranslation();

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">{title}</h1>
        {subtitle && <p className="auth__subtitle">{subtitle}</p>}
        <form className="auth__form" onSubmit={onSubmit}>
          {fields.map((f) => (
            <div className="auth__field" key={f.name}>
              <label className="form-label" htmlFor={`auth-${f.name}`}>{f.label}</label>
              <input
                id={`auth-${f.name}`}
                className="form-control"
                type={f.type || 'text'}
                name={f.name}
                autoComplete={f.autoComplete}
                required={f.required !== false}
              />
            </div>
          ))}
          <Button variant="primary" type="submit" className="btn--full">{submitLabel}</Button>
        </form>
        {footer && <div className="auth__footer">{footer}</div>}
        <p className="auth__back">
          <Link to="/">{t('nav.home')}</Link>
        </p>
      </div>
    </div>
  );
}
