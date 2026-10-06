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
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </>
  ),
  box: (
    <>
      <path d="M20.5 7.8 12 3.2 3.5 7.8v8.4L12 20.8l8.5-4.6z" />
      <path d="M3.5 7.8 12 12.4l8.5-4.6M12 12.4v8.4" />
    </>
  ),
  orders: (
    <>
      <path d="M6 3.5h12a1.5 1.5 0 0 1 1.5 1.5v14.5L12 16.4 4.5 19.5V5A1.5 1.5 0 0 1 6 3.5z" />
      <path d="M8.5 8.5h7M8.5 12h5" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.4" />
      <path d="M3.5 20c.7-3.4 3.1-5.3 6-5.3s5.3 1.9 6 5.3" />
      <path d="M16.2 5.2a3.4 3.4 0 0 1 0 6.6M17.6 14.9c2 .7 3.3 2.4 3.8 5.1" />
    </>
  ),
  tag: (
    <>
      <path d="M3.6 12.6 11 5.2a1.6 1.6 0 0 1 1.1-.5h5.6A2.5 2.5 0 0 1 20.2 7.2v5.6a1.6 1.6 0 0 1-.5 1.1l-7.4 7.4a1.6 1.6 0 0 1-2.3 0l-6.4-6.4a1.6 1.6 0 0 1 0-2.3z" />
      <circle cx="15.8" cy="8.2" r="1.3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19.5V4.5" />
      <path d="M4 19.5h16" />
      <path d="M7.5 16V11M11.5 16V7.5M15.5 16v-3M19.5 16V9" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.4 14.4a1.5 1.5 0 0 0 .3 1.7l.1.1a1.8 1.8 0 1 1-2.6 2.6l-.1-.1a1.5 1.5 0 0 0-2.5 1v.3a1.8 1.8 0 1 1-3.6 0v-.2a1.5 1.5 0 0 0-2.6-1l-.1.1a1.8 1.8 0 1 1-2.6-2.6l.1-.1a1.5 1.5 0 0 0-1-2.5H4.5a1.8 1.8 0 1 1 0-3.6h.2a1.5 1.5 0 0 0 1-2.6l-.1-.1A1.8 1.8 0 1 1 8.2 4.6l.1.1a1.5 1.5 0 0 0 2.5-1V3.5a1.8 1.8 0 0 1 3.6 0v.2a1.5 1.5 0 0 0 2.5 1l.1-.1a1.8 1.8 0 1 1 2.6 2.6l-.1.1a1.5 1.5 0 0 0 1 2.5h.3a1.8 1.8 0 0 1 0 3.6h-.2a1.5 1.5 0 0 0-1.3.9z" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" />
      <circle cx="8.6" cy="9.6" r="1.6" />
      <path d="M4 17.2 9.4 12l4 3.6 3-2.6 3.6 3.2" />
    </>
  ),
  logout: (
    <>
      <path d="M9.5 3.5H6A1.5 1.5 0 0 0 4.5 5v14A1.5 1.5 0 0 0 6 20.5h3.5" />
      <path d="M15 16.5 19.5 12 15 7.5M19.5 12H9" />
    </>
  ),
  edit: (
    <>
      <path d="M4.5 19.5h4l10-10a2.1 2.1 0 0 0-3-3l-10 10z" />
      <path d="M14.5 6.5l3 3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.9" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.8v11M7.8 11l4.2 4.2 4.2-4.2" />
      <path d="M4.5 19.5h15" />
    </>
  ),
  upload: (
    <>
      <path d="M12 15.5V4.5M7.8 8.7 12 4.5l4.2 4.2" />
      <path d="M4.5 19.5h15" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9.2a6 6 0 1 0-12 0c0 5.2-2 6.6-2 6.6h16s-2-1.4-2-6.6z" />
      <path d="M13.7 19.4a2 2 0 0 1-3.4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.2" width="17" height="15.3" rx="2.2" />
      <path d="M3.5 9.8h17M8.2 3.5v3.4M15.8 3.5v3.4" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
      <path d="M2.5 10h19M6 14.6h3.5" />
    </>
  ),
  ticket: (
    <>
      <path d="M3.5 8.4V6.6A1.6 1.6 0 0 1 5.1 5h13.8a1.6 1.6 0 0 1 1.6 1.6v1.8a2.4 2.4 0 0 0 0 4.8v3.2a1.6 1.6 0 0 1-1.6 1.6H5.1a1.6 1.6 0 0 1-1.6-1.6v-3.2a2.4 2.4 0 0 0 0-4.8z" />
      <path d="M12 6.4v1.8M12 11.1v1.8M12 15.8v1.8" />
    </>
  ),
  send: <path d="M20.5 3.5 3.6 10.2l6.6 2.7 2.7 6.6z M20.5 3.5 10.2 12.9" />,
  save: (
    <>
      <path d="M4.5 5.7A1.2 1.2 0 0 1 5.7 4.5h10.6L19.5 7.7v10.6a1.2 1.2 0 0 1-1.2 1.2H5.7a1.2 1.2 0 0 1-1.2-1.2z" />
      <path d="M8 4.5v5h7v-5M8 19.5v-5.4h8v5.4" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 5.5v-.6a1.4 1.4 0 0 0-1.4-1.4H5.9a1.4 1.4 0 0 0-1.4 1.4v8.2a1.4 1.4 0 0 0 1.4 1.4h.6" />
    </>
  ),
  refresh2: (
    <>
      <path d="M20 11.5A8 8 0 0 0 6.3 6.3L4 8.5" />
      <path d="M4 4.5v4h4" />
      <path d="M4 12.5a8 8 0 0 0 13.7 5.2l2.3-2.2" />
      <path d="M20 19.5v-4h-4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.2M12 7.9v.2" />
    </>
  ),
  alert: (
    <>
      <path d="M10.7 4.3 2.9 17.6A1.5 1.5 0 0 0 4.2 19.9h15.6a1.5 1.5 0 0 0 1.3-2.3L13.3 4.3a1.5 1.5 0 0 0-2.6 0z" />
      <path d="M12 9.4v4M12 16.4v.2" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
      <path d="M9.6 20.5v-6h4.8v6" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5v9A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-9" />
      <path d="M3 9.5 4.8 4.6A1.5 1.5 0 0 1 6.2 3.7h11.6a1.5 1.5 0 0 1 1.4.9L21 9.5a2.6 2.6 0 0 1-4.5 2.3 2.6 2.6 0 0 1-4.5 0 2.6 2.6 0 0 1-4.5 0A2.6 2.6 0 0 1 3 9.5z" />
    </>
  ),
  inbox: (
    <>
      <path d="M3.5 13.5h4l1.5 2.6h6l1.5-2.6h4" />
      <path d="M6.6 4.5h10.8l3.1 9v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5z" />
    </>
  ),
  star2: <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.9z" />,
  menuGrid: (
    <>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
      <circle cx="7.5" cy="6.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="10" cy="17.5" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  shield2: (
    <>
      <path d="M12 3.2 4.8 6v5.4c0 4.4 3 8.1 7.2 9.4 4.2-1.3 7.2-5 7.2-9.4V6z" />
      <path d="M9.2 12.2 11.3 14.3l3.6-3.7" />
    </>
  ),

  layers: (
    <>
      <path d="M12 3.4 3.2 7.9 12 12.4l8.8-4.5z" />
      <path d="M3.2 12.4 12 16.9l8.8-4.5" />
      <path d="M3.2 16.6 12 21.1l8.8-4.5" />
    </>
  ),
  fileText: (
    <>
      <path d="M13.6 3.5H7A1.9 1.9 0 0 0 5.1 5.4v13.2A1.9 1.9 0 0 0 7 20.5h10a1.9 1.9 0 0 0 1.9-1.9V8.7z" />
      <path d="M13.6 3.5v5.2h5.3M8.6 13h6.8M8.6 16.5h4.6" />
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