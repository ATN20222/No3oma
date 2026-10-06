import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listProducts, listCategories, getContent } from '../data/api';
import { Badge, Card, EmptyState, Field, PageHead, Tabs } from '../components/ui';
import useToast from '../../hooks/useToast';
import useDebounced from '../hooks/useDebounced';

const SOURCES = ['all', 'products', 'categories', 'content'];
const PAGE_SIZE = 12;

export default function Media() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const debounced = useDebounced(query);
  const isAR = i18n.language === 'ar';

  useEffect(() => {
    let alive = true;
    Promise.all([listProducts({ perPage: 1000 }), listCategories(), getContent()]).then(
      ([productPage, categories, content]) => {
        if (!alive) return;
        const products = productPage.rows;
        const collected = [
          { id: 'hero', source: 'content', label: t('admin.media.hero'), url: content.hero.image },
          ...products.flatMap((p) => [
            {
              id: `p-${p.id}`,
              source: 'products',
              label: isAR ? p.name : p.nameEn,
              url: p.image,
              meta: p.sku,
            },
            ...(p.gallery || [])
              .filter((g) => g !== p.image)
              .map((g, i) => ({
                id: `p-${p.id}-g${i}`,
                source: 'products',
                label: isAR ? p.name : p.nameEn,
                url: g,
                meta: p.sku,
              })),
          ]),
          ...categories.map((c) => ({
            id: `c-${c.id}`,
            source: 'categories',
            label: isAR ? c.name : c.nameEn,
            url: c.image,
          })),
        ].filter((x) => x.url);
        setItems(collected);
        setLoading(false);
      },
    );
    return () => {
      alive = false;
    };
  }, [isAR, t]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return items.filter(
      (x) => (source === 'all' || x.source === source) && (!q || (x.label || '').toLowerCase().includes(q)),
    );
  }, [items, source, debounced]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(0, page * PAGE_SIZE);

  const copy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      notify(t('admin.media.copied'), 'success');
    } catch {
      notify(t('admin.media.copyFailed'), 'error');
    }
  };

  return (
    <>
      <PageHead
        title={t('admin.media.title')}
        description={t('admin.media.sub', { total: items.length })}
        actions={
          <span className="admin-badge admin-badge--gold">
            <Icon name="image" size={14} /> {t('admin.media.assets')}
          </span>
        }
      />

      <Card flush>
        <div className="admin-toolbar">
          <div className="admin-search">
            <span className="admin-search__icon">
              <Icon name="search" size={16} />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={t('admin.media.searchPlaceholder')}
              aria-label={t('admin.media.searchPlaceholder')}
            />
          </div>
          <Tabs
            label={t('admin.media.title')}
            value={source}
            onChange={(v) => {
              setSource(v);
              setPage(1);
            }}
            tabs={SOURCES.map((s) => ({ value: s, label: t(`admin.media.source_${s}`) }))}
          />
        </div>

        {loading ? (
          <div className="admin-media-grid" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="admin-skeleton" style={{ aspectRatio: '4/3', borderRadius: 12 }} key={i} />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState icon="image" title={t('admin.media.empty')} description={t('admin.media.emptySub')} />
        ) : (
          <>
            <div className="admin-media-grid">
              {visible.map((item) => (
                <button
                  type="button"
                  className="admin-media-tile"
                  key={item.id}
                  onClick={() => setSelected(item)}
                >
                  <img src={item.url} alt={item.label} loading="lazy" />
                  <span className="admin-media-tile__meta">
                    <span className="admin-media-tile__label">{item.label}</span>
                    <Badge tone="info" plain>
                      {t(`admin.media.source_${item.source}`)}
                    </Badge>
                  </span>
                </button>
              ))}
            </div>

            <div className="admin-card__body" style={{ borderTop: '1px solid var(--admin-line)' }}>
              {page < pages ? (
                <button type="button" className="admin-btn admin-btn--block" onClick={() => setPage((p) => p + 1)}>
                  <Icon name="chevronDown" size={15} />
                  {t('common.loadMore')}
                </button>
              ) : (
                <p className="admin-muted" style={{ textAlign: 'center', fontSize: 13, margin: 0 }}>
                  {t('admin.media.showingAll', { count: visible.length, total: filtered.length })}
                </p>
              )}
            </div>
          </>
        )}
      </Card>

      {selected && (
        <div className="admin-scrim-modal" role="presentation" onClick={() => setSelected(null)}>
          <div
            className="admin-modal admin-modal--wide"
            role="dialog"
            aria-modal="true"
            aria-label={selected.label}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="admin-modal__head">
              <h3>{selected.label}</h3>
              <button
                type="button"
                className="admin-btn admin-btn--icon"
                onClick={() => setSelected(null)}
                aria-label={t('common.close')}
              >
                <Icon name="close" size={16} />
              </button>
            </header>
            <div className="admin-modal__body">
              <img
                src={selected.url}
                alt={selected.label}
                style={{ width: '100%', borderRadius: 12, display: 'block' }}
              />
              <div className="admin-formgrid" style={{ marginTop: 14 }}>
                <Field label={t('admin.media.source')} htmlFor="md-source">
                  <input
                    id="md-source"
                    className="admin-input"
                    readOnly
                    value={t(`admin.media.source_${selected.source}`)}
                  />
                </Field>
                <Field label={t('admin.field.dimensions')} htmlFor="md-dim">
                  <input
                    id="md-dim"
                    className="admin-input"
                    readOnly
                    dir="ltr"
                    value={selected.meta || '—'}
                  />
                </Field>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label={t('admin.media.url')} htmlFor="md-url">
                    <input
                      id="md-url"
                      className="admin-input"
                      readOnly
                      dir="ltr"
                      value={selected.url}
                      onFocus={(e) => e.target.select()}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <footer className="admin-modal__foot">
              <button type="button" className="admin-btn" onClick={() => setSelected(null)}>
                {t('common.close')}
              </button>
              <a className="admin-btn" href={selected.url} target="_blank" rel="noreferrer">
                <Icon name="eye" size={15} />
                {t('common.view')}
              </a>
              <button type="button" className="admin-btn admin-btn--gold" onClick={() => copy(selected.url)}>
                <Icon name="copy" size={15} />
                {t('admin.media.copyUrl')}
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
