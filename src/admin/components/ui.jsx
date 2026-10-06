import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export function Badge({ tone = '', children, plain = false }) {
  return (
    <span className={`admin-badge ${tone ? `admin-badge--${tone}` : ''} ${plain ? 'admin-badge--plain' : ''}`.trim()}>
      {children}
    </span>
  );
}

export function Card({ title, subtitle, action, children, flush = false, className = '' }) {
  return (
    <section className={`admin-card ${className}`.trim()}>
      {(title || action) && (
        <header className="admin-card__head">
          <div>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={`admin-card__body ${flush ? 'admin-card__body--flush' : ''}`}>{children}</div>
    </section>
  );
}

export function Stat({ label, value, trend, trendLabel, icon }) {
  const up = typeof trend === 'number' && trend >= 0;
  return (
    <article className="admin-stat">
      <div className="admin-stat__top">
        <span className="admin-stat__label">{label}</span>
        <span className="admin-stat__icon">
          <Icon name={icon} size={17} />
        </span>
      </div>
      <strong className="admin-stat__value">{value}</strong>
      {typeof trend === 'number' && (
        <div className="admin-stat__foot">
          <span className={`admin-trend ${up ? 'admin-trend--up' : 'admin-trend--down'}`}>
            <Icon name={up ? 'chart' : 'chart'} size={12} />
            {up ? '+' : ''}
            {trend}%
          </span>
          <span>{trendLabel}</span>
        </div>
      )}
    </article>
  );
}

export function PageHead({ title, description, actions }) {
  return (
    <div className="admin-page-head">
      <div className="admin-page-head__text">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="admin-page-head__actions">{actions}</div>}
    </div>
  );
}

export function Field({ label, required, hint, error, children, htmlFor }) {
  return (
    <div className="admin-field">
      {label && (
        <label className="admin-field__label" htmlFor={htmlFor}>
          {label} {required && <span>*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className="admin-field__hint">{hint}</span>}
      {error && <span className="admin-field__error">{error}</span>}
    </div>
  );
}

export function Switch({ checked, onChange, label, description, id }) {
  return (
    <label className="admin-switch" htmlFor={id}>
      <span className="admin-switch__text">
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </span>
      <span className="admin-switch__track">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      </span>
    </label>
  );
}

export function Tabs({ tabs, value, onChange, label }) {
  return (
    <div className="admin-tabs" role="tablist" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          className={`admin-tab ${value === tab.value ? 'is-active' : ''}`.trim()}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          {typeof tab.count === 'number' && <span className="admin-muted"> ({tab.count})</span>}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ icon = 'inbox', title, description, action }) {
  return (
    <div className="admin-empty">
      <span className="admin-empty__icon">
        <Icon name={icon} size={24} />
      </span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function SkeletonRows({ rows = 5 }) {
  return (
    <div className="admin-rows" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="admin-row" key={i}>
          <div className="admin-skeleton" style={{ width: 42, height: 42, borderRadius: 9, flex: 'none' }} />
          <div className="admin-row__main">
            <div className="admin-skeleton" style={{ width: '58%', height: 13, marginBottom: 7 }} />
            <div className="admin-skeleton" style={{ width: '34%', height: 11 }} />
          </div>
          <div className="admin-skeleton" style={{ width: 62, height: 22, borderRadius: 999, flex: 'none' }} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pagination                                                          */
/* ------------------------------------------------------------------ */

export function Pagination({ page, totalPages, total, perPage, onPage, labels }) {
  if (total === 0) return null;
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const pages = [];
  const window = 1;
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= window) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }

  return (
    <div className="admin-pagination">
      <span>
        {labels.showing} {from}–{to} {labels.of} {total}
      </span>
      <div className="admin-pagination__pages">
        <button
          type="button"
          className="admin-pagination__page"
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          aria-label={labels.prev}
        >
          <Icon name="chevronPrev" size={14} />
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="admin-pagination__page" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`admin-pagination__page ${p === page ? 'is-active' : ''}`.trim()}
              onClick={() => onPage(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          className="admin-pagination__page"
          onClick={() => onPage(page + 1)}
          disabled={page >= totalPages}
          aria-label={labels.next}
        >
          <Icon name="chevronNext" size={14} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal / bottom sheet                                                */
/* ------------------------------------------------------------------ */

export function Modal({ open, title, onClose, children, footer, wide = false }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="admin-scrim-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`admin-modal ${wide ? 'admin-modal--wide' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="admin-modal__head">
          <h2>{title}</h2>
          <button type="button" className="admin-iconbtn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </header>
        <div className="admin-modal__body">{children}</div>
        {footer && <div className="admin-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts (pure SVG / CSS, no dependency)                              */
/* ------------------------------------------------------------------ */

export function BarChart({ data, labelKey, valueKey, ariaLabel }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="admin-chart">
      <div className="admin-bars" role="img" aria-label={ariaLabel}>
        {data.map((d) => (
          <div className="admin-bars__col" key={String(d[labelKey])}>
            <div
              className="admin-bars__bar"
              style={{ height: `${Math.max(4, (d[valueKey] / max) * 100)}%` }}
              title={`${d[labelKey]}: ${d[valueKey]}`}
            />
            <span className="admin-bars__label">{d[labelKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChart({ points, height = 170, ariaLabel }) {
  const width = 600;
  const h = height;
  const pad = 8;
  const values = points.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = (width - pad * 2) / Math.max(points.length - 1, 1);

  const coords = points.map((p, i) => ({
    x: pad + i * step,
    y: pad + (1 - (p.value - min) / span) * (h - pad * 2),
  }));

  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)} ${h} L${coords[0].x.toFixed(1)} ${h} Z`;

  return (
    <div className="admin-chart">
      <svg viewBox={`0 0 ${width} ${h}`} preserveAspectRatio="none" role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id="adminLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#C9A45C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#adminLineFill)" />
        <path d={line} fill="none" stroke="#A8823C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="3" fill="#241C15" stroke="#fff" strokeWidth="1.6" />
        ))}
      </svg>
      <div className="admin-chart__legend">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row helper shared by the mobile card rendering of every table       */
/* ------------------------------------------------------------------ */

export function EntityRow({ image, glyph, title, subtitle, badges, side, onClick, to }) {
  const inner = (
    <>
      {image ? (
        <img className="admin-cell-entity__thumb" src={image} alt="" loading="lazy" />
      ) : (
        <span className="admin-cell-entity__glyph">{glyph}</span>
      )}
      <div className="admin-row__main">
        <div className="admin-row__title">{title}</div>
        <div className="admin-row__meta">
          {subtitle && <span>{subtitle}</span>}
          {badges}
        </div>
      </div>
      <div className="admin-row__side">{side}</div>
    </>
  );

  if (to) {
    return (
      <Link className="admin-row" to={to} style={{ color: 'inherit' }}>
        {inner}
      </Link>
    );
  }
  return (
    <div
      className="admin-row"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {inner}
    </div>
  );
}
