import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import './SearchOverlay.css';

export default function SearchOverlay({ open, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.classList.add('u-no-scroll');
    }
    return () => document.body.classList.remove('u-no-scroll');
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const q = e.target.elements.q.value.trim();
    onClose();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label={t('search')}>
      <button type="button" className="search-overlay__backdrop" aria-label={t('common.close')} onClick={onClose} />
      <div className="search-overlay__panel">
        <div className="container">
          <div className="search-overlay__head">
            <h2 className="search-overlay__title">{t('searchOverlay.title')}</h2>
            <button type="button" className="search-overlay__close" onClick={onClose} aria-label={t('common.close')}>
              <Icon name="close" size={20} />
            </button>
          </div>

          <form className="search-overlay__form" role="search" onSubmit={submit}>
            <Icon name="search" size={20} className="search-overlay__icon" />
            <label htmlFor="overlay-search" className="visually-hidden">
              {t('search')}
            </label>
            <input
              id="overlay-search"
              ref={inputRef}
              name="q"
              className="search-overlay__input"
              type="search"
              placeholder={t('searchOverlay.placeholder')}
              autoComplete="off"
            />
            <Button variant="primary" type="submit">
              {t('search')}
            </Button>
          </form>

          <div className="search-overlay__hints">
            <p className="search-overlay__hint-title">{t('searchOverlay.popular')}</p>
            <div className="search-overlay__chips">
              {t('searchOverlay.suggestions', { returnObjects: true }).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="search-overlay__chip"
                  onClick={() => {
                    onClose();
                    navigate(`/search?q=${encodeURIComponent(s)}`);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}