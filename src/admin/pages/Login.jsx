import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import { useAdminAuth } from '../context/AdminAuth';
import '../admin.css';

export default function AdminLogin() {
  const { t, i18n } = useTranslation();
  const { signIn, busy, error, user } = useAdminAuth();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';

  const [email, setEmail] = useState('admin@no3oma.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = emailValid && password.length >= 6 && !busy;

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid || password.length < 6) return;
    try {
      await signIn(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch {
      /* error is surfaced from the auth context */
    }
  };

  // Already signed in (e.g. deep link) — skip the form.
  useEffect(() => {
    if (user) navigate('/admin', { replace: true });
  }, [user, navigate]);

  const [recovery, setRecovery] = useState(false);

  const points = ['dashboard.point1', 'dashboard.point2', 'dashboard.point3'];

  return (
    <div className="admin-login" dir={isRTL ? 'rtl' : 'ltr'}>
      <aside className="admin-login__aside">
        <BrandLogo variant="admin" />

        <div className="admin-login__pitch">
          <h2>{t('dashboard.heroTitle')}</h2>
          <p>{t('dashboard.heroBody')}</p>
          <ul className="admin-login__points">
            {points.map((key) => (
              <li key={key}>
                <span>
                  <Icon name="check" size={14} />
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <p className="admin-login__foot">{t('dashboard.copyright')}</p>
      </aside>

      <main className="admin-login__main">
        <div className="admin-login__card">
          <div className="admin-login__brand">
            <BrandLogo variant="admin" />
            <span className="admin-login__brand-name">
              {t('brandName')}
              <small>{t('dashboard.brandSub')}</small>
            </span>
          </div>

          <h1>{t('dashboard.welcome')}</h1>
          <p className="admin-login__lede">{t('dashboard.signInLede')}</p>

          <form className="admin-login__form" onSubmit={submit} noValidate>
            {error && (
              <div className="admin-login__alert" role="alert">
                <Icon name="alert" size={16} />
                <span>{t('dashboard.invalid')}</span>
              </div>
            )}

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="admin-email">
                {t('common.email')} <span>*</span>
              </label>
              <input
                id="admin-email"
                className="admin-input"
                type="email"
                autoComplete="username"
                inputMode="email"
                dir="ltr"
                placeholder="admin@no3oma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={touched && !emailValid}
                aria-describedby={touched && !emailValid ? 'admin-email-err' : undefined}
              />
              {touched && !emailValid && (
                <span className="admin-field__error" id="admin-email-err">
                  {t('dashboard.emailInvalid')}
                </span>
              )}
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="admin-password">
                {t('dashboard.password')} <span>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  className="admin-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  dir="ltr"
                  placeholder="••••••••"
                  style={{ paddingInlineEnd: 46 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={touched && password.length < 6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? t('dashboard.hidePassword') : t('dashboard.showPassword')}
                  style={{
                    position: 'absolute',
                    insetInlineEnd: 6,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 34,
                    height: 34,
                    display: 'grid',
                    placeItems: 'center',
                    border: 0,
                    background: 'transparent',
                    color: 'var(--admin-ink-3)',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="eye" size={17} />
                </button>
              </div>
              {touched && password.length < 6 && (
                <span className="admin-field__error">{t('dashboard.passwordShort')}</span>
              )}
            </div>

            <div className="admin-login__row">
              <label className="admin-check">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                {t('dashboard.remember')}
              </label>
              <button
                type="button"
                onClick={() => setRecovery((v) => !v)}
                style={{
                  fontWeight: 600,
                  color: 'var(--admin-gold-deep)',
                  border: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                {t('dashboard.forgot')}
              </button>
            </div>

            {recovery && (
              <div className="admin-login__alert" role="status">
                <Icon name="info" size={16} />
                <span>{t('dashboard.recoveryNote')}</span>
              </div>
            )}

            <button type="submit" className="admin-btn admin-btn--primary admin-btn--lg admin-btn--block" disabled={!canSubmit}>
              {busy ? t('dashboard.signingIn') : t('dashboard.signIn')}
              {!busy && <Icon name={isRTL ? 'arrowPrev' : 'arrowNext'} size={16} />}
            </button>
          </form>

          <div className="admin-login__hint">
            <strong>{t('dashboard.demoTitle')}</strong>
            <br />
            <code dir="ltr">admin@no3oma.com</code> · <code dir="ltr">no3oma2026</code>
            <br />
            <span className="admin-muted">{t('dashboard.demoNote')}</span>
          </div>

          <Link to="/" className="admin-login__back">
            <Icon name={isRTL ? 'arrowNext' : 'arrowPrev'} size={15} />
            {t('dashboard.backToStore')}
          </Link>
        </div>
      </main>
    </div>
  );
}
