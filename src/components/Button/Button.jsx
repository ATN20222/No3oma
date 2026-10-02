import './Button.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  className = '',
  loading = false,
  disabled = false,
  children,
  ...rest
}) {
  const Tag = as;
  return (
    <Tag
      className={`btn btn--${variant} btn--${size} ${loading ? 'is-loading' : ''} ${className}`}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className="btn__label">{children}</span>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
    </Tag>
  );
}