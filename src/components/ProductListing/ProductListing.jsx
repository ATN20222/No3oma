import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductFilters from '../ProductFilters/ProductFilters';
import ProductSort from '../ProductSort/ProductSort';
import Button from '../Button/Button';
import './ProductListing.css';

const PER_PAGE = 6;

export default function ProductListing({ products, emptyText, lockCategoryFilter = false }) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ category: '', price: '', inStockOnly: false });
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.category && !lockCategoryFilter) list = list.filter((p) => p.category === filters.category);
    if (filters.price === 'low') list = list.filter((p) => p.price < 1000);
    if (filters.price === 'mid') list = list.filter((p) => p.price >= 1000 && p.price <= 2000);
    if (filters.price === 'high') list = list.filter((p) => p.price > 2000);
    if (filters.inStockOnly) list = list.filter((p) => p.inStock);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, filters, sort, lockCategoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const filterPanel = (
    <ProductFilters filters={filters} onChange={setFilters} showCategory={!lockCategoryFilter} />
  );

  return (
    <div className="listing">
      <div className="listing__toolbar d-flex flex-column flex-row justify-between align-start align-center gap-3">
        <span className="listing__count">
          {filtered.length} {t('nav.bedding')}
        </span>
        <div className="d-flex align-center gap-3">
          <Button variant="outline" size="sm" className="listing__filter-btn" onClick={() => setDrawerOpen(true)}>
            {t('common.filters')}
          </Button>
          <ProductSort value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="row listing__body">
        <aside className="col-12 col-lg-3 listing__aside">{filterPanel}</aside>
        <div className="col-12 col-lg-9">
          <ProductGrid products={paged} emptyText={emptyText || t('common.noResults')} />
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Pagination">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`pagination__btn ${n === page ? 'is-active' : ''}`}
                  onClick={() => setPage(n)}
                  aria-current={n === page ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="listing__drawer" role="dialog" aria-modal="true" aria-label={t('common.filters')}>
          <button
            type="button"
            className="listing__drawer-backdrop"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="listing__drawer-panel">
            <div className="d-flex justify-between align-center">
              <h2 className="listing__drawer-title">{t('common.filters')}</h2>
              <button
                type="button"
                className="listing__drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {filterPanel}
            <Button variant="primary" className="btn--full" onClick={() => setDrawerOpen(false)}>
              {t('common.filters')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
