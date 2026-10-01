import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, i) => (
          <li key={item.label} className="breadcrumbs__item">
            {item.to && i < items.length - 1 ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
