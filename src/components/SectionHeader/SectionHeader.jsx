import './SectionHeader.css';

export default function SectionHeader({ eyebrow, title, subtitle, action, align = 'start' }) {
  return (
    <div className={`sect-head sect-head--${align}`}>
      <div className="sect-head__text">
        {eyebrow && <p className="u-eyebrow">{eyebrow}</p>}
        <h2 className="sect-head__title">{title}</h2>
        {subtitle && <p className="sect-head__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="sect-head__action">{action}</div>}
    </div>
  );
}
