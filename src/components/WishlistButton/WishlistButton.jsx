import { useTranslation } from 'react-i18next';
import useWishlist from '../../hooks/useWishlist';
import Icon from '../Icon/Icon';
import './WishlistButton.css';

export default function WishlistButton({ productId, className = '', size = 18 }) {
  const { t } = useTranslation();
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      className={`wish-btn ${active ? 'is-active' : ''} ${className}`}
      aria-pressed={active}
      aria-label={active ? t('common.removeFromWishlist') : t('common.addToWishlist')}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
    >
      <Icon name="heart" size={size} filled={active} />
    </button>
  );
}
