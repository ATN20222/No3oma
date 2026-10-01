import React, { useState } from 'react';
import './Navbar.css';

const navItems = [
  'الرئيسية',
  'الفراش',
  'الملاءات',
  'الوسائد',
  'الأغطية',
  'تواصل معنا',
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar-shell">
      <nav className="navbar container" aria-label="التنقل الرئيسي">
        <div className="navbar__brand" aria-label="Naouma">
          <div className="brand-mark">N</div>
          <div className="brand-copy">
            <span className="brand-copy__name">Naouma</span>
            <span className="brand-copy__tag">مستلزمات نوم أنيقة</span>
          </div>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label="فتح القائمة"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar__menu ${menuOpen ? 'is-open' : ''}`}>
          <ul className="navbar__links">
            {navItems.map((item, index) => (
              <li key={item} className={index === 0 ? 'is-active' : ''}>
                <a href="#" aria-label={item}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar__actions">
          <div className="nav-search" aria-label="بحث">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16L21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>بحث</span>
          </div>

          <button type="button" className="nav-account" aria-label="الحساب">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 19c1.8-3.1 5-4.7 8-4.7s6.2 1.6 8 4.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <button type="button" className="nav-cart" aria-label="السلة">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 9.2c.2 1 1 1.8 2 1.8h8.8c1 0 1.8-.8 2-1.8L20 7H6.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="18" r="1.5" fill="currentColor" />
              <circle cx="17" cy="18" r="1.5" fill="currentColor" />
            </svg>
            <span className="cart-count">2</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
