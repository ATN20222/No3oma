import logo from './assets/logo.png';

export { logo };

/**
 * The uploaded wordmark is 565x442 (transparent PNG). Every brand slot renders
 * it through the same component so sizing, RTL behaviour and the fallback letter
 * stay consistent across the navbar, footer, drawer, loader and dashboard.
 */
export function brandLetter(t) {
  const name = t('brandName');
  return name ? name.charAt(0) : '';
}
