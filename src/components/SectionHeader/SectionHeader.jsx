import './SectionHeader.css';

export default function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="section-header d-flex flex-column flex-row justify-between align-end gap-3">
      <div>
        {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
        <h2 className="section-header__title">{title}</h2>
        {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-header__action flex-shrink-0">{action}</div>}
    </div>
  );
}
