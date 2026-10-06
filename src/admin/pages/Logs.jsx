import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listLogs } from '../data/api';
import { Badge, Card, EmptyState, PageHead, Pagination, SkeletonRows } from '../components/ui';
import useDebounced from '../hooks/useDebounced';

const LEVELS = ['all', 'info', 'notice', 'warning', 'auth'];
const TONE = { info: 'info', notice: 'plain', warning: 'warn', auth: 'gold' };

const fmt = (iso, locale) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function Logs() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const isAR = i18n.language === 'ar';

  const level = params.get('level') || 'all';
  const query = params.get('q') || '';
  const page = Number(params.get('page') || 1);

  const [raw, setRaw] = useState(query);
  const debounced = useDebounced(raw);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    let alive = true;
    setLoading(true);
    listLogs({ level, query, page })
      .then((res) => {
        if (!alive) return;
        setRows(res.rows);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [level, query, page]);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (debounced) next.set('q', debounced);
    else next.delete('q');
    if (debounced !== query) {
      next.delete('page');
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => setRaw(query), [query]);
  useEffect(() => refresh(), [refresh]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHead
        title={t('admin.logs.title')}
        description={t('admin.logs.sub')}
        actions={
          <button type="button" className="admin-btn" onClick={() => window.print()}>
            <Icon name="download" size={15} />
            {t('common.export')}
          </button>
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
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder={t('admin.logs.searchPlaceholder')}
              aria-label={t('admin.logs.searchPlaceholder')}
            />
          </div>
          <div className="admin-filters">
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                className={`admin-chip ${level === l ? 'is-active' : ''}`.trim()}
                onClick={() => setParam('level', l)}
              >
                {t(`admin.logs.level_${l}`)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <SkeletonRows rows={7} />
        ) : rows.length === 0 ? (
          <EmptyState icon="clock" title={t('admin.logs.empty')} description={t('admin.logs.emptySub')} />
        ) : (
          <>
            <div className="admin-loglist">
              {rows.map((log) => (
                <div className="admin-logrow" key={log.id}>
                  <span className={`admin-logrow__dot admin-logrow__dot--${log.level}`} aria-hidden="true" />
                  <div className="admin-logrow__body">
                    <div className="admin-logrow__top">
                      <code className="admin-logrow__action" dir="ltr">
                        {log.action}
                      </code>
                      <Badge tone={TONE[log.level] || 'plain'}>{t(`admin.logs.level_${log.level}`)}</Badge>
                    </div>
                    <div className="admin-logrow__meta">
                      <span>
                        <Icon name="user" size={12} /> {log.actor}
                      </span>
                      <span>
                        <Icon name="tag" size={12} /> {t(`admin.logs.source_${log.source}`)}
                      </span>
                      <span>{fmt(log.at, isAR ? 'ar' : 'en')}</span>
                    </div>
                    {log.detail && <p className="admin-logrow__detail">{log.detail}</p>}
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={10}
              onPage={(p) => setParam('page', String(p), false)}
              labels={{
                showing: t('admin.pagination.showing'),
                of: t('admin.pagination.of'),
                prev: t('admin.pagination.prev'),
                next: t('admin.pagination.next'),
              }}
            />
          </>
        )}
      </Card>
    </>
  );
}
