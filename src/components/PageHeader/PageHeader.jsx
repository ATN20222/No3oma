import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './PageHeader.css';

export default function PageHeader({ title, subtitle, breadcrumbs, meta }) {
  return (
    <header className="page-header">
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="page-header__row">
          <div>
            <h1 className="page-header__title">{title}</h1>
            {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
          </div>
          {meta && <div className="page-header__meta">{meta}</div>}
        </div>
      </div>
    </header>
  );
}
