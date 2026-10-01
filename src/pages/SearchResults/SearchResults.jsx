import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProductListing from '../../components/ProductListing/ProductListing';
import Button from '../../components/Button/Button';
import useProducts from '../../hooks/useProducts';
import './SearchResults.css';

export default function SearchResults() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const { search } = useProducts();
  const [value, setValue] = useState(params.get('q') || '');

  const query = params.get('q') || '';
  const results = search(query);

  const submit = (e) => {
    e.preventDefault();
    setParams(value.trim() ? { q: value.trim() } : {});
  };

  return (
    <>
      <PageHeader
        title={t('common.searchResults')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('common.searchResults') }]}
      />
      <div className="container">
        <form className="search-form" onSubmit={submit} role="search">
          <label htmlFor="search-input" className="visually-hidden">{t('search')}</label>
          <input
            id="search-input"
            className="form-control"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('search')}
          />
          <Button variant="primary" type="submit">{t('search')}</Button>
        </form>
        <p className="search-count">{results.length} {t('common.searchResults')}</p>
        <ProductListing products={results} emptyText={t('common.noResults')} />
      </div>
    </>
  );
}
