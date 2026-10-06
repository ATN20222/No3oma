import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logo } from '../../brand';
import './BrandLogo.css';

/**
 * Single home for the uploaded wordmark so every brand slot (navbar, footer,
 * drawer, loader, dashboard) renders the same asset the same way.
 *
 * `variant="mark"` drops the image in place of the old letter tile and keeps the
 * wordmark text beside it. `variant="stacked"` renders the image on its own
 * (used where the name is not spelled out next to it).
 *
 * If the asset ever fails to load we fall back to the first letter of the brand
 * name so no slot collapses to an empty box.
 */
export default function BrandLogo({ variant = 'mark', className = '' }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  const name = t('brandName');
  const letter = name ? name.charAt(0) : '';

  if (failed) {
    return <span className={`brand-logo brand-logo--fallback ${className}`.trim()}>{letter}</span>;
  }

  return (
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      width={565}
      height={442}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      className={`brand-logo brand-logo--${variant} ${className}`.trim()}
    />
  );
}
