import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { getProduct, saveProduct, listCategories } from '../data/api';
import { Card, Field, PageHead, Switch, Badge } from '../components/ui';
import useToast from '../../hooks/useToast';

const EMPTY = {
  name: '',
  nameEn: '',
  sku: '',
  category: 'bedSets',
  price: 0,
  cost: 0,
  oldPrice: null,
  discount: 0,
  stock: 0,
  reorderPoint: 8,
  status: 'active',
  image: '',
  rating: 0,
  reviewCount: 0,
  colors: [],
  sizes: [],
  weight: 0,
  dimensions: '',
  tags: [],
  description: '',
  descriptionEn: '',
  isNew: true,
};

export default function ProductEditor() {
  const { t, i18n } = useTranslation();
  const { notify } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [tab, setTab] = useState('general');
  const isAR = i18n.language === 'ar';

  useEffect(() => {
    listCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (isNew) return;
    let alive = true;
    setLoading(true);
    getProduct(id).then((p) => {
      if (!alive) return;
      if (p) setForm({ ...EMPTY, ...p });
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [id, isNew]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('admin.validation.required');
    if (!form.nameEn.trim()) next.nameEn = t('admin.validation.required');
    if (!form.sku.trim()) next.sku = t('admin.validation.required');
    if (!(Number(form.price) > 0)) next.price = t('admin.validation.positive');
    if (Number(form.stock) < 0) next.stock = t('admin.validation.nonnegative');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      notify(t('admin.validation.fixErrors'), 'error');
      return;
    }
    setSaving(true);
    try {
      const saved = await saveProduct({
        ...form,
        id: isNew ? undefined : Number(id),
        price: Number(form.price),
        cost: Number(form.cost),
        stock: Number(form.stock),
        reorderPoint: Number(form.reorderPoint),
        discount: Number(form.discount),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        weight: Number(form.weight),
        rating: Number(form.rating) || 0,
        reviewCount: Number(form.reviewCount) || 0,
        updatedAt: new Date().toISOString().slice(0, 10),
      });
      notify(t('admin.products.saved'), 'success');
      navigate(`/admin/products/${saved.id}`);
    } catch {
      notify(t('admin.products.saveFailed'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleListValue = (key, value) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  };

  const tabs = [
    { value: 'general', label: t('admin.editor.tabGeneral') },
    { value: 'pricing', label: t('admin.editor.tabPricing') },
    { value: 'inventory', label: t('admin.editor.tabInventory') },
    { value: 'seo', label: t('admin.editor.tabSeo') },
  ];

  if (loading) {
    return (
      <>
        <PageHead title={t('admin.products.edit')} />
        <div className="admin-skeleton" style={{ height: 320, borderRadius: 14 }} />
      </>
    );
  }

  return (
    <>
      <PageHead
        title={isNew ? t('admin.products.new') : isAR ? form.name : form.nameEn}
        description={isNew ? t('admin.products.newSub') : `SKU ${form.sku}`}
        actions={
          <>
            <Link to="/admin/products" className="admin-btn">
              <Icon name={i18n.dir() === 'rtl' ? 'arrowNext' : 'arrowPrev'} size={15} />
              {t('common.back')}
            </Link>
            <button type="submit" form="product-form" className="admin-btn admin-btn--gold" disabled={saving}>
              <Icon name="save" size={15} />
              {saving ? t('common.saving') : t('common.save')}
            </button>
          </>
        }
      />

      <form id="product-form" onSubmit={submit} noValidate>
        <div className="admin-grid admin-grid--sidebar admin-grid--2">
          <div className="admin-stack">
            <Card title={t('admin.editor.tabGeneral')}>
              <div className="admin-formgrid admin-formgrid--2">
                <Field label={t('admin.field.nameAr')} required error={errors.name} htmlFor="p-name">
                  <input
                    id="p-name"
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="مجموعة فراش قطن مصري"
                  />
                </Field>
                <Field label={t('admin.field.nameEn')} required error={errors.nameEn} htmlFor="p-name-en">
                  <input
                    id="p-name-en"
                    className="admin-input"
                    dir="ltr"
                    value={form.nameEn}
                    onChange={(e) => set('nameEn', e.target.value)}
                    placeholder="Luxury Cotton Bed Set"
                  />
                </Field>
                <Field label={t('admin.field.category')} htmlFor="p-cat">
                  <select
                    id="p-cat"
                    className="admin-select-field"
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {isAR ? c.name : c.nameEn}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t('admin.field.sku')} required error={errors.sku} htmlFor="p-sku">
                  <input
                    id="p-sku"
                    className="admin-input"
                    dir="ltr"
                    value={form.sku}
                    onChange={(e) => set('sku', e.target.value)}
                    placeholder="N3-BED-1001"
                  />
                </Field>
              </div>

              <div style={{ height: 14 }} />

              <Field label={t('admin.field.descriptionAr')} htmlFor="p-desc">
                <textarea
                  id="p-desc"
                  className="admin-textarea"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
              </Field>

              <div style={{ height: 14 }} />

              <Field label={t('admin.field.descriptionEn')} htmlFor="p-desc-en">
                <textarea
                  id="p-desc-en"
                  className="admin-textarea"
                  dir="ltr"
                  value={form.descriptionEn}
                  onChange={(e) => set('descriptionEn', e.target.value)}
                />
              </Field>
            </Card>

            <Card title={t('admin.editor.media')} subtitle={t('admin.editor.mediaSub')}>
              <Field label={t('admin.field.imageUrl')} htmlFor="p-img" hint={t('admin.editor.mediaHint')}>
                <input
                  id="p-img"
                  className="admin-input"
                  dir="ltr"
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                  placeholder="https://…"
                />
              </Field>
              <div style={{ height: 12 }} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
                  gap: 9,
                }}
              >
                {form.image ? (
                  <img
                    src={form.image}
                    alt=""
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 10, border: '1px solid var(--admin-line)' }}
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden';
                    }}
                  />
                ) : (
                  <div
                    className="admin-empty__icon"
                    style={{ width: '100%', height: 'auto', aspectRatio: '1', borderRadius: 10 }}
                  >
                    <Icon name="image" size={20} />
                  </div>
                )}
              </div>
            </Card>

            <Card title={t('admin.editor.options')}>
              <Field label={t('admin.field.colors')} hint={t('admin.editor.colorsHint')}>
                <div className="admin-inline" style={{ gap: 8 }}>
                  {['#F2EDE4', '#D8CBB4', '#8C8577', '#B9A88F', '#EFE3D2', '#D9C3A5', '#F5EFE4', '#BFCBC4'].map((c) => {
                    const on = form.colors.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleListValue('colors', c)}
                        aria-pressed={on}
                        aria-label={c}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background: c,
                          border: on ? '2px solid var(--admin-navy)' : '1px solid rgba(36,28,21,.2)',
                          boxShadow: on ? '0 0 0 3px rgba(201,164,92,.4)' : 'none',
                          cursor: 'pointer',
                        }}
                      />
                    );
                  })}
                </div>
              </Field>

              <div style={{ height: 14 }} />

              <Field label={t('admin.field.sizes')} hint={t('admin.editor.sizesHint')}>
                <div className="admin-checkgrid">
                  {['90×200', '120×200', '140×200', '160×200', '180×200', '200×200'].map((sz) => (
                    <label className="admin-check" key={sz}>
                      <input
                        type="checkbox"
                        checked={form.sizes.includes(sz)}
                        onChange={() => toggleListValue('sizes', sz)}
                      />
                      <span dir="ltr">{sz}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <div style={{ height: 14 }} />

              <Field label={t('admin.field.tags')} hint={t('admin.editor.tagsHint')}>
                <input
                  className="admin-input"
                  dir={isAR ? 'rtl' : 'ltr'}
                  value={form.tags.join(', ')}
                  onChange={(e) => set('tags', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                />
              </Field>
            </Card>
          </div>

          <div className="admin-stack">
            <Card title={t('admin.editor.statusCard')}>
              <div className="admin-stack" style={{ gap: 12 }}>
                <Field label={t('admin.field.status')} htmlFor="p-status">
                  <select
                    id="p-status"
                    className="admin-select-field"
                    value={form.status}
                    onChange={(e) => set('status', e.target.value)}
                  >
                    <option value="active">{t('admin.filters.status_active')}</option>
                    <option value="draft">{t('admin.filters.status_draft')}</option>
                  </select>
                </Field>
                <Switch
                  id="p-new"
                  label={t('admin.field.isNew')}
                  description={t('admin.editor.isNewHint')}
                  checked={form.isNew}
                  onChange={(v) => set('isNew', v)}
                />
                <div className="admin-inline">
                  <Badge tone={form.stock === 0 ? 'danger' : form.stock <= form.reorderPoint ? 'warn' : 'ok'}>
                    {form.stock === 0
                      ? t('admin.stock.out')
                      : form.stock <= form.reorderPoint
                        ? t('admin.stock.low')
                        : t('admin.stock.healthy')}
                  </Badge>
                  <span className="admin-muted" style={{ fontSize: 12.5 }}>
                    {t('admin.field.stock')}: {form.stock}
                  </span>
                </div>
              </div>
            </Card>

            <div className="admin-tabs" role="tablist" aria-label={t('admin.editor.tabsLabel')}>
              {tabs.map((x) => (
                <button
                  key={x.value}
                  type="button"
                  role="tab"
                  aria-selected={tab === x.value}
                  className={`admin-tab ${tab === x.value ? 'is-active' : ''}`.trim()}
                  onClick={() => setTab(x.value)}
                >
                  {x.label}
                </button>
              ))}
            </div>

            {tab === 'general' && (
              <Card title={t('admin.editor.tabGeneral')}>
                <div className="admin-formgrid admin-formgrid--2">
                  <Field label={t('admin.field.rating')} htmlFor="p-rating">
                    <input
                      id="p-rating"
                      className="admin-input"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      dir="ltr"
                      value={form.rating}
                      onChange={(e) => set('rating', e.target.value)}
                    />
                  </Field>
                  <Field label={t('admin.field.reviewCount')} htmlFor="p-rc">
                    <input
                      id="p-rc"
                      className="admin-input"
                      type="number"
                      min="0"
                      dir="ltr"
                      value={form.reviewCount}
                      onChange={(e) => set('reviewCount', e.target.value)}
                    />
                  </Field>
                </div>
              </Card>
            )}

            {tab === 'pricing' && (
              <Card title={t('admin.editor.tabPricing')}>
                <div className="admin-formgrid admin-formgrid--2">
                  <Field label={`${t('admin.field.price')} (EGP)`} required error={errors.price} htmlFor="p-price">
                    <input
                      id="p-price"
                      className="admin-input"
                      type="number"
                      min="0"
                      dir="ltr"
                      value={form.price}
                      onChange={(e) => set('price', e.target.value)}
                    />
                  </Field>
                  <Field label={`${t('admin.field.cost')} (EGP)`} htmlFor="p-cost">
                    <input
                      id="p-cost"
                      className="admin-input"
                      type="number"
                      min="0"
                      dir="ltr"
                      value={form.cost}
                      onChange={(e) => set('cost', e.target.value)}
                    />
                  </Field>
                  <Field label={t('admin.field.oldPrice')} htmlFor="p-old">
                    <input
                      id="p-old"
                      className="admin-input"
                      type="number"
                      min="0"
                      dir="ltr"
                      value={form.oldPrice ?? ''}
                      onChange={(e) => set('oldPrice', e.target.value || null)}
                    />
                  </Field>
                  <Field label={t('admin.field.discount')} htmlFor="p-disc" hint="%">
                    <input
                      id="p-disc"
                      className="admin-input"
                      type="number"
                      min="0"
                      max="90"
                      dir="ltr"
                      value={form.discount}
                      onChange={(e) => set('discount', e.target.value)}
                    />
                  </Field>
                </div>
                <div style={{ height: 12 }} />
                <div className="admin-kv">
                  <span className="admin-kv__k">{t('admin.editor.margin')}</span>
                  <span className="admin-kv__v admin-ltr">
                    {form.price > 0 && form.cost > 0
                      ? `${(((Number(form.price) - Number(form.cost)) / Number(form.price)) * 100).toFixed(1)}%`
                      : '—'}
                  </span>
                </div>
                <div className="admin-kv">
                  <span className="admin-kv__k">{t('admin.editor.profit')}</span>
                  <span className="admin-kv__v admin-ltr">
                    {form.price > 0 && form.cost > 0 ? Number(form.price) - Number(form.cost) : '—'}
                  </span>
                </div>
              </Card>
            )}

            {tab === 'inventory' && (
              <Card title={t('admin.editor.tabInventory')}>
                <div className="admin-formgrid admin-formgrid--2">
                  <Field label={t('admin.field.stock')} required error={errors.stock} htmlFor="p-stock">
                    <input
                      id="p-stock"
                      className="admin-input"
                      type="number"
                      min="0"
                      dir="ltr"
                      value={form.stock}
                      onChange={(e) => set('stock', e.target.value)}
                    />
                  </Field>
                  <Field label={t('admin.field.reorderPoint')} htmlFor="p-rp" hint={t('admin.editor.reorderHint')}>
                    <input
                      id="p-rp"
                      className="admin-input"
                      type="number"
                      min="0"
                      dir="ltr"
                      value={form.reorderPoint}
                      onChange={(e) => set('reorderPoint', e.target.value)}
                    />
                  </Field>
                  <Field label={t('admin.field.weight')} htmlFor="p-w" hint="kg">
                    <input
                      id="p-w"
                      className="admin-input"
                      type="number"
                      min="0"
                      step="0.1"
                      dir="ltr"
                      value={form.weight}
                      onChange={(e) => set('weight', e.target.value)}
                    />
                  </Field>
                  <Field label={t('admin.field.dimensions')} htmlFor="p-dim">
                    <input
                      id="p-dim"
                      className="admin-input"
                      dir="ltr"
                      value={form.dimensions}
                      onChange={(e) => set('dimensions', e.target.value)}
                      placeholder="120 × 90 × 25 cm"
                    />
                  </Field>
                </div>
              </Card>
            )}

            {tab === 'seo' && (
              <Card title={t('admin.editor.tabSeo')} subtitle={t('admin.editor.seoSub')}>
                <div className="admin-stack" style={{ gap: 12 }}>
                  <Field label={t('admin.field.slug')} htmlFor="p-slug" hint={t('admin.editor.slugHint')}>
                    <input
                      id="p-slug"
                      className="admin-input"
                      dir="ltr"
                      defaultValue={(form.nameEn || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
                      placeholder="luxury-egyptian-cotton-bed-set"
                    />
                  </Field>
                  <Field label={t('admin.field.metaTitle')} htmlFor="p-mt">
                    <input id="p-mt" className="admin-input" defaultValue={form.nameEn} />
                  </Field>
                  <Field label={t('admin.field.metaDesc')} htmlFor="p-md">
                    <textarea id="p-md" className="admin-textarea" defaultValue={form.descriptionEn} />
                  </Field>
                </div>
              </Card>
            )}

            <div className="admin-inline">
              <button type="submit" className="admin-btn admin-btn--gold admin-btn--lg" disabled={saving} style={{ flex: 1 }}>
                <Icon name="save" size={16} />
                {saving ? t('common.saving') : t('common.save')}
              </button>
              <Link to="/admin/products" className="admin-btn admin-btn--lg">
                {t('common.cancel')}
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
