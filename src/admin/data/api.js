/**
 * Admin API layer.
 *
 * Every screen reads through this module so the storefront and the dashboard
 * share one shape. Today the functions resolve from a local seed after a short
 * delay so the UI exercises its real loading/error paths; swapping `request()`
 * for `fetch(BASE + path)` is the only change needed to go live.
 *
 * The contract below is the checklist for the backend team.
 */

import {
  seedProducts,
  seedCategories,
  seedOrders,
  seedCustomers,
  seedCoupons,
  seedReviews,
  seedStaff,
  seedSettings,
  seedAnalytics,
} from './seed';

const LATENCY = 220;

const wait = (ms = LATENCY) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = (value) => JSON.parse(JSON.stringify(value));

/** In-memory stores the mock mutates so the UI feels stateful. */
const db = {
  products: clone(seedProducts),
  categories: clone(seedCategories),
  orders: clone(seedOrders),
  customers: clone(seedCustomers),
  coupons: clone(seedCoupons),
  reviews: clone(seedReviews),
  staff: clone(seedStaff),
  settings: clone(seedSettings),
  analytics: clone(seedAnalytics),
  media: [],
};

let nextId = (collection) =>
  collection.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;

const match = (item, query, fields) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => String(item[f] ?? '').toLowerCase().includes(q));
};

const paginate = (list, page, perPage) => {
  const start = (page - 1) * perPage;
  return { rows: list.slice(start, start + perPage), total: list.length };
};

/* ------------------------------------------------------------------
   Catalogue
   GET/POST/PATCH/DELETE /api/admin/products
   ------------------------------------------------------------------ */
export async function listProducts({ query = '', category = '', status = 'all', page = 1, perPage = 8 } = {}) {
  await wait();
  let rows = db.products.filter((p) => match(p, query, ['name', 'nameEn', 'sku']));
  if (category) rows = rows.filter((p) => p.category === category);
  if (status === 'active') rows = rows.filter((p) => p.status === 'active');
  if (status === 'draft') rows = rows.filter((p) => p.status === 'draft');
  if (status === 'low') rows = rows.filter((p) => p.stock <= p.reorderPoint);
  if (status === 'out') rows = rows.filter((p) => p.stock === 0);
  const { rows: pageRows, total } = paginate(rows, page, perPage);
  return { ...paginate(rows, page, perPage), rows: pageRows, total, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}

export async function getProduct(id) {
  await wait();
  return clone(db.products.find((p) => String(p.id) === String(id)) || null);
}

export async function saveProduct(payload) {
  await wait();
  const existingIndex = db.products.findIndex((p) => String(p.id) === String(payload.id));
  if (existingIndex >= 0) {
    db.products[existingIndex] = { ...db.products[existingIndex], ...payload };
    return clone(db.products[existingIndex]);
  }
  const created = { id: nextId(db.products), status: 'active', stock: 0, reorderPoint: 5, ...payload };
  db.products.unshift(created);
  return clone(created);
}

export async function deleteProduct(id) {
  await wait();
  db.products = db.products.filter((p) => String(p.id) !== String(id));
  return { ok: true };
}

/* ------------------------------------------------------------------
   Categories  — /api/admin/categories
   ------------------------------------------------------------------ */
export async function listCategories() {
  await wait();
  const withCounts = db.categories.map((c) => ({
    ...c,
    productCount: db.products.filter((p) => p.category === c.id).length,
  }));
  return withCounts;
}

export async function saveCategory(payload) {
  await wait();
  const i = db.categories.findIndex((c) => c.id === payload.id);
  if (i >= 0) {
    db.categories[i] = { ...db.categories[i], ...payload };
    return clone(db.categories[i]);
  }
  const created = { id: `cat-${Date.now()}`, productCount: 0, visible: true, ...payload };
  db.categories.push(created);
  return clone(created);
}

export async function deleteCategory(id) {
  await wait();
  db.categories = db.categories.filter((c) => c.id !== id);
  return { ok: true };
}

/* ------------------------------------------------------------------
   Orders  — /api/admin/orders  (+ PATCH status, GET /orders/:id)
   ------------------------------------------------------------------ */
export async function listOrders({ query = '', status = 'all', page = 1, perPage = 8 } = {}) {
  await wait();
  let rows = db.orders.filter((o) =>
    match(o, query, ['number', 'customerName', 'customerEmail', 'city']),
  );
  if (status !== 'all') rows = rows.filter((o) => o.status === status);
  rows = [...rows].sort((a, b) => new Date(b.date) - new Date(a.date));
  const { rows: pageRows, total } = paginate(rows, page, perPage);
  return { rows: pageRows, total, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}

export async function getOrder(id) {
  await wait();
  return clone(db.orders.find((o) => String(o.id) === String(id)) || null);
}

export async function updateOrderStatus(id, status, note) {
  await wait();
  const order = db.orders.find((o) => String(o.id) === String(id));
  if (!order) throw new Error('order-not-found');
  order.status = status;
  order.timeline = [
    { title: note || status, at: new Date().toISOString(), actor: 'admin' },
    ...(order.timeline || []),
  ];
  return clone(order);
}

/* ------------------------------------------------------------------
   Customers  — /api/admin/customers
   ------------------------------------------------------------------ */
export async function listCustomers({ query = '', page = 1, perPage = 8 } = {}) {
  await wait();
  const rows = db.customers.filter((c) => match(c, query, ['name', 'email', 'phone', 'city']));
  const { rows: pageRows, total } = paginate(rows, page, perPage);
  return { rows: pageRows, total, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}

export async function getCustomer(id) {
  await wait();
  const customer = db.customers.find((c) => String(c.id) === String(id)) || null;
  if (!customer) return null;
  return {
    ...clone(customer),
    orders: clone(db.orders.filter((o) => o.customerId === customer.id)),
  };
}

/* ------------------------------------------------------------------
   Coupons  — /api/admin/coupons
   ------------------------------------------------------------------ */
export async function listCoupons() {
  await wait();
  return clone(db.coupons);
}

export async function saveCoupon(payload) {
  await wait();
  const i = db.coupons.findIndex((c) => c.code === payload.code);
  if (i >= 0) {
    db.coupons[i] = { ...db.coupons[i], ...payload };
    return clone(db.coupons[i]);
  }
  const created = { id: nextId(db.coupons), used: 0, active: true, ...payload };
  db.coupons.unshift(created);
  return clone(created);
}

export async function deleteCoupon(id) {
  await wait();
  db.coupons = db.coupons.filter((c) => String(c.id) !== String(id));
  return { ok: true };
}

/* ------------------------------------------------------------------
   Reviews  — /api/admin/reviews  (+ PATCH moderation)
   ------------------------------------------------------------------ */
export async function listReviews({ status = 'all', page = 1, perPage = 8 } = {}) {
  await wait();
  let rows = db.reviews;
  if (status !== 'all') rows = rows.filter((r) => r.status === status);
  const { rows: pageRows, total } = paginate(rows, page, perPage);
  return { rows: pageRows, total, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}

export async function moderateReview(id, status) {
  await wait();
  const review = db.reviews.find((r) => String(r.id) === String(id));
  if (!review) throw new Error('review-not-found');
  review.status = status;
  return clone(review);
}

/* ------------------------------------------------------------------
   Inventory  — /api/admin/inventory  (+ PATCH adjust)
   ------------------------------------------------------------------ */
export async function listInventory({ query = '', filter = 'all' } = {}) {
  await wait();
  let rows = db.products.map((p) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    nameEn: p.nameEn,
    image: p.image,
    stock: p.stock,
    reorderPoint: p.reorderPoint,
    cost: p.cost,
    price: p.price,
    category: p.category,
  }));
  rows = rows.filter((p) => match(p, query, ['name', 'nameEn', 'sku']));
  if (filter === 'low') rows = rows.filter((p) => p.stock > 0 && p.stock <= p.reorderPoint);
  if (filter === 'out') rows = rows.filter((p) => p.stock === 0);
  if (filter === 'healthy') rows = rows.filter((p) => p.stock > p.reorderPoint);
  return rows;
}

export async function adjustStock(id, delta, reason) {
  await wait();
  const product = db.products.find((p) => String(p.id) === String(id));
  if (!product) throw new Error('product-not-found');
  product.stock = Math.max(0, product.stock + delta);
  product.stockLog = [{ delta, reason, at: new Date().toISOString() }, ...(product.stockLog || [])];
  return clone(product);
}

/* ------------------------------------------------------------------
   Content  — /api/admin/content  (homepage blocks, policies, menus)
   ------------------------------------------------------------------ */
export async function getContent() {
  await wait();
  return clone(db.settings.content);
}

export async function saveContent(section, value) {
  await wait();
  db.settings.content[section] = clone(value);
  return clone(db.settings.content[section]);
}

/* ------------------------------------------------------------------
   Settings  — /api/admin/settings
   ------------------------------------------------------------------ */
export async function getSettings() {
  await wait();
  return clone(db.settings);
}

export async function saveSettings(patch) {
  await wait();
  db.settings = { ...db.settings, ...patch };
  return clone(db.settings);
}

/* ------------------------------------------------------------------
   Staff & roles  — /api/admin/staff
   ------------------------------------------------------------------ */
export async function listStaff() {
  await wait();
  return clone(db.staff);
}

export async function saveStaff(payload) {
  await wait();
  const i = db.staff.findIndex((s) => String(s.id) === String(payload.id));
  if (i >= 0) {
    db.staff[i] = { ...db.staff[i], ...payload };
    return clone(db.staff[i]);
  }
  const created = { id: nextId(db.staff), active: true, ...payload };
  db.staff.push(created);
  return clone(created);
}

export async function deleteStaff(id) {
  await wait();
  db.staff = db.staff.filter((s) => String(s.id) !== String(id));
  return { ok: true };
}

/* ------------------------------------------------------------------
   Auth  — POST /api/admin/login
   ------------------------------------------------------------------ */
export async function login({ email, password }) {
  await wait(420);
  const user = db.staff.find((s) => s.email.toLowerCase() === String(email).trim().toLowerCase());
  // Seed accounts all accept the demo password so every role can be explored.
  if (!user || password !== 'no3oma2026' || !user.active) {
    const err = new Error('invalid-credentials');
    err.code = 'invalid-credentials';
    throw err;
  }
  return {
    token: `demo.${btoa(user.email)}.${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      initials: user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    },
  };
}

export async function logout() {
  await wait(120);
  return { ok: true };
}

/* ------------------------------------------------------------------
   Dashboard  — /api/admin/analytics/overview
   ------------------------------------------------------------------ */
export async function getOverview() {
  await wait(300);
  return clone(db.analytics);
}


/* ------------------------------------------------------------------
   Audit log  — GET /api/admin/logs  (query: { level, query, page, perPage })
   Returns a merged activity feed: storefront events, staff actions, stock
   movements and order status changes, newest first.
   ------------------------------------------------------------------ */
const LOG_SOURCES = {
  orders: { level: 'info' },
  stock: { level: 'warning' },
  reviews: { level: 'info' },
  staff: { level: 'auth' },
  system: { level: 'notice' },
};

export async function listLogs({ level = 'all', query = '', page = 1, perPage = 10 } = {}) {
  await wait();
  const logs = [];

  (db.analytics.recentActivity || []).forEach((a, i) => {
    logs.push({
      id: `act-${i}`,
      level: a.tone === 'danger' ? 'warning' : 'notice',
      actor: 'system',
      action: a.titleEn,
      detail: a.titleAr,
      at: a.at,
      source: 'system',
    });
  });

  db.orders.slice(0, 8).forEach((o) => {
    (o.timeline || []).forEach((ev, i) => {
      logs.push({
        id: `ord-${o.id}-${i}`,
        level: 'info',
        actor: o.customerName,
        action: `${ev.title} — ${o.number}`,
        detail: `${o.number} · ${ev.status || o.status}`,
        at: ev.at,
        source: 'orders',
      });
    });
  });

  db.products.forEach((p) => {
    (p.stockLog || []).forEach((sl, i) => {
      logs.push({
        id: `stk-${p.id}-${i}`,
        level: 'warning',
        actor: 'inventory',
        action: `${p.nameEn} ${sl.delta > 0 ? '+' : ''}${sl.delta}`,
        detail: sl.reason,
        at: sl.at,
        source: 'stock',
      });
    });
  });

  db.staff.forEach((s) => {
    if (s.lastSeen) {
      logs.push({
        id: `stf-${s.id}`,
        level: 'auth',
        actor: s.name,
        action: 'auth.signin',
        detail: s.email,
        at: s.lastSeen,
        source: 'staff',
      });
    }
  });

  db.reviews.forEach((r) => {
    logs.push({
      id: `rev-${r.id}`,
      level: 'notice',
      actor: r.customerName,
      action: `reviews.${r.status}`,
      detail: r.title,
      at: r.date,
      source: 'reviews',
    });
  });

  logs.sort((a, b) => (a.at < b.at ? 1 : -1));

  let rows = logs;
  if (level !== 'all') rows = rows.filter((l) => l.level === level);
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    rows = rows.filter(
      (l) =>
        l.action.toLowerCase().includes(q) ||
        String(l.actor).toLowerCase().includes(q) ||
        String(l.detail).toLowerCase().includes(q),
    );
  }

  const { rows: pageRows, total } = paginate(rows, page, perPage);
  return {
    rows: pageRows,
    total,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
    levels: LOG_SOURCES,
  };
}

export default {
  listProducts,
  getProduct,
  saveProduct,
  deleteProduct,
  listCategories,
  saveCategory,
  deleteCategory,
  listOrders,
  getOrder,
  updateOrderStatus,
  listCustomers,
  getCustomer,
  listCoupons,
  saveCoupon,
  deleteCoupon,
  listReviews,
  moderateReview,
  listInventory,
  adjustStock,
  getContent,
  saveContent,
  getSettings,
  saveSettings,
  listStaff,
  saveStaff,
  deleteStaff,
  login,
  logout,
  getOverview,
  listLogs,
};
