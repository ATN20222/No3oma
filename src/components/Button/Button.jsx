import './Button.css';

export default function Button({ variant = 'primary', size = 'md', as = 'button', className = '', children, ...rest }) {
  const Tag = as;
  return (
    <Tag className={`btn btn--${variant} btn--${size} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
