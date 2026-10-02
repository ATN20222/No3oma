import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductFilters from '../ProductFilters/ProductFilters';
import ProductSort from '../ProductSort/ProductSort';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import './ProductListing.css';

const PER_PAGE = 8;

export default function ProductListing({ products, emptyText, lockCategoryFilter = false, activeCategory }) {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState({ category: '', price: '', inStockOnly: false });
  const [sort, setSort] = useState(params.get('sort') || 'featured');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeFilterCount =
    (filters.price ? 1 : 0) + (filters.inStockOnly ? 1 : 0) + (filters.category && !lockCategoryFilter ? 1 : 0);

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
    if (sort === 'newest') list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === 'name') list.sort((a, b) => a.id - b.id);
    return list;
  }, [products, filters, sort, lockCategoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const filterPanel = (
    <ProductFilters filters={filters} onChange={setFilters} showCategory={!lockCategoryFilter} />
  );

  const changeSort = (value) => {
    setSort(value);
    const next = new URLSearchParams(params);
    if (value === 'featured') next.delete('sort');
    else next.set('sort', value);
    setParams(next, { replace: true });
  };

  const resetFilters = () => setFilters({ category: '', price: '', inStockOnly: false });

  return (
    <div className="listing">
      <div className="listing__toolbar">
        <div className="listing__count-block">
          <strong className="listing__count">{filtered.length}</strong>
          <span className="listing__count-label">
            {activeCategory ? t('listing.productsIn') : t('listing.products')}
          </span>
        </div>

        <div className="listing__tools">
          <Button
            variant="light"
            size="sm"
            className="listing__filter-btn"
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="filter" size={16} />
            {t('common.filters')}
            {activeFilterCount > 0 && <span className="listing__filter-count">{activeFilterCount}</span>}
          </Button>
          <ProductSort value={sort} onChange={changeSort} />
        </div>
      </div>

      <div className="row listing__body">
        <aside className="col-12 col-lg-3 listing__aside">
          <div className="listing__filters-card">
            <div className="listing__filters-head">
              <span>{t('common.filters')}</span>
              {activeFilterCount > 0 && (
                <button type="button" className="listing__reset" onClick={resetFilters}>
                  {t('common.reset')}
                </button>
              )}
            </div>
            {filterPanel}
          </div>
        </aside>

        <div className="col-12 col-lg-9">
          <ProductGrid products={paged} emptyText={emptyText || t('common.noResults')} />

          {pageCount > 1 && (
            <nav className="pagination" aria-label={t('listing.pagination')}>
              <button
                type="button"
                className="pagination__arrow"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label={t('listing.previous')}
              >
                <Icon name="chevronPrev" size={16} />
              </button>

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

              <button
                type="button"
                className="pagination__arrow"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                aria-label={t('listing.next')}
              >
                <Icon name="chevronNext" size={16} />
              </button>
            </nav>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="drawer-filters" role="dialog" aria-modal="true" aria-label={t('common.filters')}>
          <button
            type="button"
            className="drawer-filters__backdrop"
            aria-label={t('common.close')}
            onClick={() => setDrawerOpen(false)}
          />
          <div className="drawer-filters__panel">
            <div className="drawer-filters__head">
              <h2 className="drawer-filters__title">{t('common.filters')}</h2>
              <button
                type="button"
                className="drawer-filters__close"
                onClick={() => setDrawerOpen(false)}
                aria-label={t('common.close')}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="drawer-filters__body">{filterPanel}</div>

            <div className="drawer-filters__foot">
              <Button variant="light" onClick={resetFilters} className="btn--full">
                {t('common.reset')}
              </Button>
              <Button variant="primary" onClick={() => setDrawerOpen(false)} className="btn--full">
                {t('listing.showResults')} ({filtered.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}