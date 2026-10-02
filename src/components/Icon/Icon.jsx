import './Icon.css';

const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20c1.6-3.4 4.5-5.2 7.5-5.2s5.9 1.8 7.5 5.2" />
    </>
  ),
  bag: (
    <>
      <path d="M4.5 7.5h15l-1.2 12a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.3a4.1 4.1 0 0 1 7.5 2.3C19.5 15.4 12 20 12 20z" />,
  menu: (
    <>
      <path d="M3.5 7h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17h17" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  chevronDown: <path d="M5 9l7 7 7-7" />,
  chevronNext: <path d="M9 5l7 7-7 7" />,
  chevronPrev: <path d="M15 5l-7 7 7 7" />,
  arrowNext: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  arrowPrev: (
    <>
      <path d="M20 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v10h-11z" />
      <path d="M13.5 10h4l4 3.2v3.3h-8z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2l7 2.6v5.6c0 4.4-2.9 8-7 9.4-4.1-1.4-7-5-7-9.4V5.8z" />
      <path d="M9 12.2l2.2 2.2 4-4.2" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.5 4.5V10H15" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 15v-2.5a7.5 7.5 0 0 1 15 0V15" />
      <path d="M4.5 14h2.2v5H5.8A1.3 1.3 0 0 1 4.5 17.7z" />
      <path d="M19.5 14h-2.2v5h.9a1.3 1.3 0 0 0 1.3-1.3z" />
    </>
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  trash: (
    <>
      <path d="M4.5 6.5h15" />
      <path d="M9.5 6.5V4.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.7" />
      <path d="M6.5 6.5l.9 13a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l.9-13" />
    </>
  ),
  star: (
    <path
      d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  filter: (
    <>
      <path d="M3.5 6.5h17" />
      <path d="M6.5 12h11" />
      <path d="M9.5 17.5h5" />
    </>
  ),
  check: <path d="M5 12.8l4.4 4.4L19 7.5" />,
  phone: (
    <path d="M6.3 3.8h3l1.5 3.8-2 1.4a12 12 0 0 0 5.2 5.2l1.4-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8C10.6 18.1 5.9 13.4 4.5 5.8a1.8 1.8 0 0 1 1.8-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.6 7l8.4 6 8.4-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15 12 21 12 21z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9.5" width="17" height="11" rx="1.6" />
      <path d="M3.5 13.5h17M12 9.5V20.5" />
      <path d="M12 9.5S10.8 4 8.4 4a2.2 2.2 0 0 0 0 5.5M12 9.5S13.2 4 15.6 4a2.2 2.2 0 0 1 0 5.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="1.8" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="4.6" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M13.8 20.5v-7.3h2.5l.4-2.9h-2.9V8.5c0-.8.2-1.4 1.4-1.4h1.6V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H7.5v2.9h2.1v7.3z" />,
  whatsapp: (
    <path d="M20 11.6a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.6z" />
  ),
  sparkles: (
    <>
      <path d="M12 3.5l1.6 4.4 4.4 1.6-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
};

export default function Icon({ name, size = 20, strokeWidth = 1.6, filled = false, className = '', ...rest }) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  );
}