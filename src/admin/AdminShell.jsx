import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../components/Icon/Icon';
import BrandLogo from '../components/BrandLogo/BrandLogo';
import Toast from '../components/Toast/Toast';
import { useAdminAuth } from './context/AdminAuth';
import './admin.css';

const NAV = [
  {
    labelKey: 'admin.nav.overview',
    items: [{ to: '/admin', end: true, icon: 'grid', key: 'admin.nav.overview' }],
  },
  {
    labelKey: 'admin.nav.catalogue',
    items: [
      { to: '/admin/products', icon: 'box', key: 'admin.nav.products' },
      { to: '/admin/categories', icon: 'tag', key: 'admin.nav.categories' },
      { to: '/admin/inventory', icon: 'layers', key: 'admin.nav.inventory', badge: 'low' },
    ],
  },
  {
    labelKey: 'admin.nav.sales',
    items: [
      { to: '/admin/orders', icon: 'orders', key: 'admin.nav.orders', badge: 'pending' },
      { to: '/admin/customers', icon: 'users', key: 'admin.nav.customers' },
      { to: '/admin/coupons', icon: 'ticket', key: 'admin.nav.coupons' },
      { to: '/admin/reviews', icon: 'star2', key: 'admin.nav.reviews', badge: 'review' },
    ],
  },
  {
    labelKey: 'admin.nav.storefront',
    items: [
      { to: '/admin/content', icon: 'image', key: 'admin.nav.content' },
      { to: '/admin/media', icon: 'image', key: 'admin.nav.media' },
      { to: '/admin/policies', icon: 'fileText', key: 'admin.nav.policies' },
      { to: '/admin/notifications', icon: 'bell', key: 'admin.nav.notifications' },
    ],
  },
  {
    labelKey: 'admin.nav.system',
    items: [
      { to: '/admin/staff', icon: 'shield2', key: 'admin.nav.staff' },
      { to: '/admin/settings', icon: 'settings', key: 'admin.nav.settings' },
      { to: '/admin/logs', icon: 'clock', key: 'admin.nav.logs' },
    ],
  },
];

const BOTTOM = [
  { to: '/admin', end: true, icon: 'grid', key: 'admin.nav.overview' },
  { to: '/admin/orders', icon: 'orders', key: 'admin.nav.orders' },
  { to: '/admin/products', icon: 'box', key: 'admin.nav.products' },
  { to: '/admin/customers', icon: 'users', key: 'admin.nav.customers' },
  { to: '/admin/settings', icon: 'settings', key: 'admin.nav.settings' },
];

const TITLES = {
  '/admin': ['admin.overview.title', 'admin.overview.sub'],
  '/admin/products': ['admin.products.title', 'admin.products.sub'],
  '/admin/products/new': ['admin.products.new', 'admin.products.sub'],
  '/admin/categories': ['admin.categories.title', 'admin.categories.sub'],
  '/admin/inventory': ['admin.inventory.title', 'admin.inventory.sub'],
  '/admin/orders': ['admin.orders.title', 'admin.orders.sub'],
  '/admin/customers': ['admin.customers.title', 'admin.customers.sub'],
  '/admin/coupons': ['admin.coupons.title', 'admin.coupons.sub'],
  '/admin/reviews': ['admin.reviews.title', 'admin.reviews.sub'],
  '/admin/content': ['admin.content.title', 'admin.content.sub'],
  '/admin/media': ['admin.media.title', 'admin.media.sub'],
  '/admin/policies': ['admin.policies.title', 'admin.policies.sub'],
  '/admin/notifications': ['admin.notifications.title', 'admin.notifications.sub'],
  '/admin/staff': ['admin.staff.title', 'admin.staff.sub'],
  '/admin/settings': ['admin.settings.title', 'admin.settings.sub'],
  '/admin/logs': ['admin.logs.title', 'admin.logs.sub'],
};

export default function AdminShell() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Close the drawer whenever the route changes — including via the bottom bar.
  useEffect(() => {
    setDrawerOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const titleKey = useMemo(() => {
    const exact = TITLES[location.pathname];
    if (exact) return exact;
    const prefix = Object.keys(TITLES)
      .filter((k) => k !== '/admin' && location.pathname.startsWith(`${k}/`))
      .sort((a, b) => b.length - a.length)[0];
    return TITLES[prefix] || ['admin.nav.overview', ''];
  }, [location.pathname]);

  const isRTL = i18n.dir() === 'rtl';

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const renderLink = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      className={({ isActive }) => `admin-navlink ${isActive ? 'is-active' : ''}`.trim()}
    >
      <span className="admin-navlink__icon">
        <Icon name={item.icon} size={18} />
      </span>
      <span className="admin-navlink__label">{t(item.key)}</span>
      {item.badge && <span className="admin-navlink__badge">{item.badge === 'low' ? '!' : ''}</span>}
    </NavLink>
  );

  return (
    <div className="admin" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="admin-shell">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-topbar__burger"
            onClick={() => setDrawerOpen(true)}
            aria-label={t('admin.nav.openMenu')}
            aria-expanded={drawerOpen}
          >
            <Icon name="menu" size={20} />
          </button>

          <div className="admin-topbar__title">
            {t(titleKey[0])}
            {titleKey[1] && <small>{t(titleKey[1])}</small>}
          </div>

          <div className="admin-topbar__actions">
            <button
              type="button"
              className="admin-iconbtn admin-iconbtn--lang"
              aria-label={t('admin.nav.language')}
              onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
            >
              {i18n.language === 'ar' ? 'EN' : 'ع'}
            </button>

            <button
              type="button"
              className="admin-iconbtn"
              aria-label={t('admin.nav.viewStore')}
              onClick={() => navigate('/')}
            >
              <Icon name="store" size={18} />
            </button>

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="admin-iconbtn"
                aria-label={t('admin.nav.notifications')}
                aria-expanded={notifOpen}
                onClick={() => setNotifOpen((v) => !v)}
              >
                <Icon name="bell" size={18} />
                <span className="admin-iconbtn__dot" />
              </button>
              {notifOpen && (
                <div
                  className="admin-card"
                  style={{
                    position: 'absolute',
                    insetInlineEnd: 0,
                    insetBlockStart: 'calc(100% + 8px)',
                    width: 'min(320px, calc(100vw - 32px))',
                    zIndex: 50,
                    boxShadow: 'var(--admin-shadow-lg)',
                  }}
                >
                  <div className="admin-card__head">
                    <h3>{t('admin.nav.notifications')}</h3>
                  </div>
                  <div className="admin-card__body">
                    <div className="admin-stack" style={{ gap: 10 }}>
                      <div className="admin-inline">
                        <span className="admin-badge admin-badge--warn" />
                        <span style={{ fontSize: 13 }}>{t('admin.notif.lowStock')}</span>
                      </div>
                      <div className="admin-inline">
                        <span className="admin-badge admin-badge--info" />
                        <span style={{ fontSize: 13 }}>{t('admin.notif.newOrder')}</span>
                      </div>
                      <div className="admin-inline">
                        <span className="admin-badge admin-badge--gold" />
                        <span style={{ fontSize: 13 }}>{t('admin.notif.pendingReview')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="admin-avatar"
              onClick={() => navigate('/admin/staff')}
              aria-label={user?.name || t('admin.nav.account')}
              title={user?.name}
            >
              {user?.initials || 'AD'}
            </button>
          </div>
        </header>

        <div className="admin-body">
          <nav
            className={`admin-sidebar ${drawerOpen ? 'is-open' : ''}`.trim()}
            aria-label={t('admin.nav.primary')}
          >
            <div className="admin-sidebar__head">
              <BrandLogo variant="admin" />
              <button
                type="button"
                className="admin-sidebar__close"
                onClick={() => setDrawerOpen(false)}
                aria-label={t('admin.nav.closeMenu')}
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="admin-sidebar__scroll">
              {NAV.map((group) => (
                <div className="admin-navgroup" key={group.labelKey}>
                  <span className="admin-navgroup__label">{t(group.labelKey)}</span>
                  {group.items.map(renderLink)}
                </div>
              ))}
            </div>

            <div className="admin-sidebar__foot">
              <button type="button" className="admin-navlink" onClick={handleSignOut} style={{ width: '100%' }}>
                <span className="admin-navlink__icon">
                  <Icon name="logout" size={18} />
                </span>
                <span className="admin-navlink__label">{t('admin.nav.signOut')}</span>
              </button>
            </div>
          </nav>

          {drawerOpen && (
            <button
              type="button"
              className="admin-scrim"
              aria-label={t('admin.nav.closeMenu')}
              onClick={() => setDrawerOpen(false)}
            />
          )}

          <main className="admin-main">
            <Outlet />
          </main>
        </div>

        <nav className="admin-bottomnav" aria-label={t('admin.nav.quick')}>
          {BOTTOM.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-bottomnav__item ${isActive ? 'is-active' : ''}`.trim()}
            >
              <Icon name={item.icon} size={19} />
              <span>{t(item.key)}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <Toast />
    </div>
  );
}
