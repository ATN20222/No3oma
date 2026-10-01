import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCart from '../../hooks/useCart';
import useLanguage from '../../hooks/useLanguage';
import './Navbar.css';

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'bedding', to: '/category/bedding' },
  { key: 'bedSheets', to: '/category/bedSheets' },
  { key: 'pillows', to: '/category/pillows' },
  { key: 'covers', to: '/category/covers' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { lang, toggle } = useLanguage();
  const { itemCount } = useCart();
  const [openPath, setOpenPath] = useState(null);
  const location = useLocation();
  const menuOpen = openPath === location.key;
  const setMenuOpen = (update) => {
    setOpenPath((prev) => {
      const next = typeof update === 'function' ? update(prev === location.key) : update;
      return next ? location.key : null;
    });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="navbar-shell">
      <nav className="navbar container" aria-label={t('nav.home')}>
        <Link to="/" className="navbar__brand">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span className="brand-copy">
            <span className="brand-copy__name">Naouma</span>
            <span className="brand-copy__tag">{t('brandTag')}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <div id="primary-nav" className={`navbar__menu ${menuOpen ? 'is-open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((l) => (
              <li key={l.key}>
                <NavLink to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                  {t(`nav.${l.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar__actions">
          <Link to="/search" className="nav-icon" aria-label={t('search')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16L21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>

          <button type="button" className="nav-lang" onClick={toggle} aria-label="Switch language">
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>

          <Link to="/login" className="nav-icon" aria-label={t('account')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 19c1.8-3.1 5-4.7 8-4.7s6.2 1.6 8 4.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>

          <Link to="/cart" className="nav-icon nav-cart" aria-label={t('cart')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 9.2c.2 1 1 1.8 2 1.8h8.8c1 0 1.8-.8 2-1.8L20 7H6.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="18" r="1.5" fill="currentColor" />
              <circle cx="17" cy="18" r="1.5" fill="currentColor" />
            </svg>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
