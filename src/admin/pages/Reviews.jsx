import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { listReviews, moderateReview } from '../data/api';
import { Badge, Card, EmptyState, Pagination, PageHead, SkeletonRows } from '../components/ui';
import useToast from '../../hooks/useToast';

const STATUSES = ['all', 'pending', 'approved', 'rejected'];
const TONE = { approved: 'ok', pending: 'warn', rejected: 'danger' };

function Stars({ value, label }) {
  return (
    <span className="admin-stars" aria-label={label} dir="ltr">
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name="star2" size={13} style={{ opacity: n <= Math.round(value) ? 1 : 0.22 }} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const [params, setParams] = useSearchParams();
  const isAR = i18n.language === 'ar';

  const status = params.get('status') || 'all';
  const page = Number(params.get('page') || 1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const refresh = useCallback(() => {
    let alive = true;
    setLoading(true);
    listReviews({ status, page })
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
  }, [status, page]);

  useEffect(() => refresh(), [refresh]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const decide = async (review, next) => {
    setBusyId(review.id);
    try {
      await moderateReview(review.id, next);
      notify(
        next === 'approved' ? t('admin.reviews.approved') : t('admin.reviews.rejected'),
        'success',
      );
      refresh();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHead
        title={t('admin.reviews.title')}
        description={t('admin.reviews.count', { total })}
        actions={
          <span className="admin-muted" style={{ fontSize: 13, alignSelf: 'center' }}>
            <Icon name="star2" size={14} /> {t('admin.reviews.autoSync')}
          </span>
        }
      />

      <Card flush>
        <div className="admin-toolbar">
          <div className="admin-filters">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={`admin-chip ${status === s ? 'is-active' : ''}`.trim()}
                onClick={() => setParam('status', s)}
              >
                {t(`admin.reviews.status_${s}`)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <SkeletonRows rows={5} />
        ) : rows.length === 0 ? (
          <EmptyState icon="star2" title={t('admin.reviews.empty')} description={t('admin.reviews.emptySub')} />
        ) : (
          <>
            <div className="admin-rows">
              {rows.map((r) => (
                <div className="admin-row admin-row--tall" key={r.id}>
                  <img className="admin-cell-entity__thumb" src={r.productImage} alt="" loading="lazy" />
                  <div className="admin-row__main">
                    <div className="admin-inline" style={{ gap: 8, marginBottom: 4 }}>
                      <strong>{r.customerName}</strong>
                      <Stars value={r.rating} label={`${r.rating}/5`} />
                      <Badge tone={TONE[r.status]}>{t(`admin.reviews.status_${r.status}`)}</Badge>
                    </div>
                    <div className="admin-row__title" style={{ fontWeight: 600 }}>
                      {r.title}
                    </div>
                    <p className="admin-muted" style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.6 }}>
                      {r.body}
                    </p>
                    <div className="admin-row__meta" style={{ marginTop: 7 }}>
                      <span>{isAR ? r.productName : r.productNameEn}</span>
                      <span>{r.date}</span>
                      <span dir="ltr">{r.customerEmail}</span>
                      <span>
                        <Icon name="star2" size={12} /> {r.helpful}
                      </span>
                    </div>
                  </div>
                  <div className="admin-row__side">
                    <div className="admin-inline" style={{ gap: 5, flexDirection: 'column', alignItems: 'stretch' }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--icon"
                        disabled={busyId === r.id || r.status === 'approved'}
                        onClick={() => decide(r, 'approved')}
                        aria-label={t('admin.reviews.approve')}
                      >
                        <Icon name="check" size={15} />
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--icon admin-btn--danger"
                        disabled={busyId === r.id || r.status === 'rejected'}
                        onClick={() => decide(r, 'rejected')}
                        aria-label={t('admin.reviews.reject')}
                      >
                        <Icon name="close" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={8}
              onPage={(p) => setParam('page', String(p))}
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
