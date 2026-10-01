import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './PageHeader.css';

export default function PageHeader({ title, subtitle, breadcrumbs }) {
  return (
    <header className="page-header">
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}
