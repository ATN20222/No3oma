import Icon from '../Icon/Icon';
import './Rating.css';

export default function Rating({ value = 0, count, size = 14, showValue = true, className = '' }) {
  const full = Math.round(value);
  return (
    <span className={`rating ${className}`}>
      <span className="rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name="star" size={size} filled={i <= full} className={i <= full ? 'is-on' : 'is-off'} />
        ))}
      </span>
      {showValue && <span className="rating__value">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="rating__count">({count})</span>}
      <span className="visually-hidden">{value} / 5</span>
    </span>
  );
}
