import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCart from '../../hooks/useCart';
import useLanguage from '../../hooks/useLanguage';
import useWishlist from '../../hooks/useWishlist';
import Icon from '../Icon/Icon';
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar';
import MegaMenu from '../MegaMenu/MegaMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import BrandLogo from '../BrandLogo/BrandLogo';
import './Navbar.css';

const navLinks = [
  { key: 'beds', to: '/category/beds' },
  { key: 'bedSheets', to: '/category/bedSheets' },
  { key: 'bedding', to: '/category/bedding' },
  { key: 'pillows', to: '/category/pillows' },
  { key: 'covers', to: '/category/covers' },
  { key: 'blankets', to: '/category/blankets' },
  { key: 'bedroomTextiles', to: '/category/bedroomTextiles' },
];

const utilityLinks = [
  { key: 'about', to: '/about' },
  { key: 'faq', to: '/faq' },
  { key: 'contact', to: '/contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { lang, toggle } = useLanguage();
  const { itemCount } = useCart();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);

  const routeKey = `${location.pathname}${location.search}`;
  const [lastRoute, setLastRoute] = useState(routeKey);

  if (lastRoute !== routeKey) {
    setLastRoute(routeKey);
    setMenuOpen(false);
    setSearchOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    const close = () => setMegaOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const submitSearch = (e) => {
    const q = new FormData(e.currentTarget).get('q');
    const value = String(q ?? '').trim();
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : '/search');
  };

  return (
    <>
      <header className="site-header">
        <AnnouncementBar />

        <div className="utility">
          <div className="container utility__inner">
            <p className="utility__note">
              <Icon name="phone" size={14} />
              {t('header.helpful')}
            </p>
            <nav className="utility__links" aria-label={t('nav.help')}>
              {utilityLinks.map((l) => (
                <Link key={l.key} to={l.to}>
                  {t(`nav.${l.key}`)}
                </Link>
              ))}
              <Link to="/account">{t('account.title')}</Link>
            </nav>
          </div>
        </div>

        <div className="header-sticky">
          <div className="header container">
            <button
              type="button"
              className="icon-btn header__burger"
              aria-label={t('nav.menu')}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" size={22} />
            </button>

            <Link to="/" className="brand" aria-label={t('brandName')}>
              <BrandLogo variant="mark" className="brand__mark" />
              <span className="brand__text">
                <span className="brand__name">{t('brandName')}</span>
                <span className="brand__tag">{t('brandTag')}</span>
              </span>
            </Link>

            <form className="header-search" role="search" onSubmit={submitSearch}>
              <Icon name="search" size={18} className="header-search__icon" />
              <label htmlFor="header-search" className="visually-hidden">
                {t('search')}
              </label>
              <input
                id="header-search"
                name="q"
                type="search"
                className="header-search__input"
                placeholder={t('searchOverlay.placeholder')}
                autoComplete="off"
              />
              <button type="submit" className="header-search__submit">
                {t('search')}
              </button>
            </form>

            <div className="header__actions">
              <button
                type="button"
                className="icon-btn header__search-trigger"
                aria-label={t('search')}
                onClick={() => setSearchOpen(true)}
              >
                <Icon name="search" size={21} />
              </button>

              <button type="button" className="icon-btn lang-btn" onClick={toggle} aria-label={t('header.switchLanguage')}>
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>

              <Link to="/wishlist" className="icon-btn header__wish" aria-label={t('common.wishlist')}>
                <Icon name="heart" size={21} />
                {wishCount > 0 && <span className="badge badge--soft">{wishCount}</span>}
              </Link>

              <Link to="/account" className="icon-btn header__account" aria-label={t('account.title')}>
                <Icon name="user" size={21} />
              </Link>

              <Link to="/cart" className="icon-btn header__cart" aria-label={t('cart')}>
                <Icon name="bag" size={21} />
                {itemCount > 0 && <span className="badge">{itemCount}</span>}
              </Link>
            </div>
          </div>

          <nav className="mainnav" aria-label={t('nav.menu')}>
            <div className="container mainnav__inner">
              <div onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
                <button
                  type="button"
                  className={`mainnav__trigger ${megaOpen ? 'is-open' : ''}`}
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  <Icon name="filter" size={16} />
                  {t('nav.shop')}
                  <Icon name="chevronDown" size={15} className="mainnav__chev" />
                </button>
              </div>

              <ul className="mainnav__links">
                <li>
                  <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
                    {t('nav.home')}
                  </NavLink>
                </li>
                {navLinks.map((l) => (
                  <li key={l.key}>
                    <NavLink to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                      {t(`nav.${l.key}`)}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink to="/shop" className={({ isActive }) => (isActive ? 'is-active' : '')}>
                    {t('common.allProducts')}
                  </NavLink>
                </li>
              </ul>

              <Link to="/shop?sort=price-asc" className="mainnav__offer">
                <Icon name="gift" size={16} />
                {t('nav.offer')}
              </Link>
            </div>
          </nav>

          <div onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
            <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}