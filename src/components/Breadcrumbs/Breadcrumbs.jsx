import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol className="crumbs__list">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li className="crumbs__item" key={item.label}>
              {item.to && !last ? (
                <Link to={item.to} className="crumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span className="crumbs__current" aria-current="page">
                  {item.label}
                </span>
              )}
              {!last && <Icon name="chevronNext" size={13} className="crumbs__sep" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
