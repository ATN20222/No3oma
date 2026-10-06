# No3oma — نعومة

A bilingual (Arabic / English, RTL-first) bedding & sleepwear e-commerce frontend, plus a
mobile-first admin dashboard. React 19 + Vite + react-router v6, i18next, GSAP.

```
Storefront  →  https://…/            Arabic by default, full RTL, 21 routes
Dashboard   →  https://…/admin       Login gate, 19 screens, responsive (320 → 1440+)
```

---

## 1. Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | `oxlint` (must exit 0) |

No test runner is installed. The QA harness used during development lives in
`.motion-check/` (jsdom render sweep + behaviour checks) and is removed before each commit —
see §9.

---

## 2. Brand & design system

| Token | Value |
| --- | --- |
| Brand (EN) | `No3oma` — tagline “Elegant Bedding Essentials” |
| Brand (AR) | `نعومة` — tagline `مستلزمات نوم أنيقة` |
| Logo | `src/assets/logo.png` (565×442 PNG), exposed as `src/brand.js` |
| Favicon | `public/favicon.png` (same artwork) |
| Primary gold | `--color-primary: #C9A45C` |
| Ink / dark | `--color-primary-dark: #241C15` |
| Display font | `Playfair Display, Cairo, serif` |
| Body font | `Cairo, system-ui, sans-serif` |

The logo is rendered through a single component, `src/components/BrandLogo/BrandLogo.jsx`,
with variants: `mark` (navbar), `footer`, `loader` (page loader), `stacked` (mobile drawer),
`admin` (dashboard sidebar + login), `fallback` (letter on image error). If the PNG fails to
load the component falls back to a typographic monogram so no slot is ever empty.

CSS variables live in `src/styles/variables.css`. There is **no** utility framework; layout
grid is `src/styles/bootstrap-layout.min.css`; every icon is an inline SVG path in
`src/components/Icon/Icon.jsx` (62 icons).

The page loader (`src/components/PageLoader/PageLoader.jsx`) plays once per session
(`no3oma.intro.seen`, event `no3oma:ready`), shows the bilingual wordmark, and collapses
instantly under `prefers-reduced-motion`.

---

## 3. Internationalisation

- Config: `src/i18n.js` — `ns: ['common']`, `defaultNS: 'common'`, `fallbackLng: 'ar'`,
  `supportedLngs: ['ar','en']`, detection order `localStorage → navigator → htmlTag`.
- Dictionaries: `src/locales/ar/common.json`, `src/locales/en/common.json`.
- `LanguageProvider` sets `<html lang>`/`<html dir>`, `document.title`
  (`brandName | brandTag`) and the `meta[name=description]` on every locale change.
- Every dashboard label is a key under `admin.*` or `dashboard.*`; nothing is hard-coded.
- Placeholders use i18next interpolation, e.g. `admin.orders.count` → `{{total}} orders`.

**Top-level namespaces:** `nav search account cart brandTag brandName meta hero common auth
about contact faq policies newsletter home announcement header searchOverlay shop listing
trust product wishlist checkout footer mega filters preload admin dashboard`

---

## 4. Storefront screens

| Route | Component | Notes |
| --- | --- | --- |
| `/` | `pages/Home/Home` | Announcement bar, hero, categories, promo, best sellers, trust strip, newsletter |
| `/shop` | `pages/Shop/Shop` | All products, filters, sort, grid/list |
| `/category/:id` | `pages/Category/Category` | Per-category listing (`beds`, `bedSheets`, `sheetSets`, `bedding`, `bedSets`, `covers`, `blankets`, `pillows`, `bedroomTextiles`) |
| `/product/:id` | `pages/ProductDetails/ProductDetails` | Gallery, colour/size pickers, qty, reviews, related |
| `/search` | `pages/SearchResults/SearchResults` | `?q=` query |
| `/cart` | `pages/Cart/Cart` | Line edit, coupon, totals |
| `/checkout` | `pages/Checkout/Checkout` | Address → shipping → payment (COD/card/wallet/bank) → review |
| `/order-confirmation` | `pages/OrderConfirmation/OrderConfirmation` | Order ref + summary |
| `/login` `/register` | `pages/Login`, `pages/Register` | Customer auth |
| `/forgot-password` `/reset-password` | `pages/ForgotPassword`, `pages/ResetPassword` | Token flow |
| `/account` | `pages/Account/Account` | Profile, orders, addresses, settings |
| `/wishlist` | `pages/Wishlist/Wishlist` | Saved products |
| `/about` `/contact` `/faq` | `pages/About`, `pages/Contact`, `pages/FAQ` | Static + form |
| `/privacy-policy` `/terms-conditions` `/shipping-policy` `/return-exchange-policy` | `components/PolicyPage` variants | Copy comes from the dashboard (`admin.policies`) |
| `*` | Falls back to `Home` | |

Shared shell: `Navbar` → `RouteTransition` → `Routes` → `Footer`, plus `PageLoader`,
`ScrollProgress`, `AmbientLayer`, `Toast`.

### Context providers (storefront)

`ToastProvider` → `LanguageProvider` → `CartProvider` → `WishlistProvider` → `MotionProvider`.
`MotionProvider` lazily imports GSAP in the browser only and respects
`prefers-reduced-motion`.

---

## 5. Admin dashboard

Mounted from `src/App.jsx`: any URL under `/admin` renders
`src/admin/AdminApp.jsx` (code-split, `React.lazy`) instead of the storefront shell — no
navbar, no page loader, no ambient motion.

### 5.1 Auth

- `src/admin/context/AdminAuth.jsx` — `AdminAuthProvider` / `useAdminAuth`
  (`{ session, user, token, busy, error, signIn, signOut }`).
- Session is stored in `sessionStorage` under **`no3oma.admin.session`** and cleared when the
  tab closes (deliberately: safest default until real tokens arrive).
- `RequireAuth` redirects unauthenticated visitors to `/admin/login`.
- **Demo credentials:** `admin@no3oma.com` / `no3oma2026`
  (every seeded staff member accepts this password while `active: true`).

### 5.2 Layout

`src/admin/AdminShell.jsx` + `src/admin/admin.css`.

- ≥1024px: fixed left rail (grouped nav) + top bar + content.
- 768–1023px: collapsible drawer nav.
- <768px: burger drawer + bottom navigation bar (Overview, Orders, Products, Customers,
  Settings); tables swap to stacked cards (`.admin-dt-desktop` / `.admin-dt-mobile`).
- <600px: modals become bottom sheets.
- Top bar: language quick-switch (ع/EN), “view storefront”, notification popover, avatar.
- Body scroll locks while the mobile drawer is open; the drawer closes on route change.

### 5.3 Screens

| Route | Screen | Key behaviour |
| --- | --- | --- |
| `/admin/login` | Split-screen login | Validation, show/hide password, demo hint, recovery note, back to store |
| `/admin` | Overview | 4 KPIs (revenue / orders / customers / AOV) with trends, 7-day revenue bar chart, order-status meters, best sellers, low stock, quick actions, activity timeline |
| `/admin/products` | Product list | Search (debounced, URL-backed), category + status filters, responsive table/cards, delete confirm, pagination |
| `/admin/products/new` · `/admin/products/:id` | Product editor | 4 tabs (General, Pricing, Inventory, SEO), colours/sizes/tags pickers, live media preview, per-field validation, profit/margin readout |
| `/admin/categories` | Categories | Create/edit/delete, AR+EN names & blurbs, image URL with thumbnail, visibility switch |
| `/admin/inventory` | Inventory | Stock meter per SKU, `all/low/out` filters, quick ±10/±1 chips, signed adjustment with reason, stock value |
| `/admin/orders` | Order list | Search by number/customer/city, status tabs, payment + totals, pagination |
| `/admin/orders/:id` | Order detail | Line items, totals breakdown, customer card, timeline, “update status” modal with staff note |
| `/admin/customers` | Customer list | Search, segment badges (VIP / Returning / New), lifetime spend, pagination |
| `/admin/customers/:id` | Customer detail | KPI strip, order history, contact card, email + WhatsApp actions |
| `/admin/coupons` | Coupons | %, fixed and free-shipping types, min order, usage meter, expiry, enable/disable |
| `/admin/reviews` | Moderation | Status tabs, star rendering, one-tap approve/reject, pagination |
| `/admin/content` | Homepage content | Announcement, hero, promo, newsletter, footer blurb — every field as an AR + EN pair, per-block enable switch, live image preview |
| `/admin/media` | Media library | Aggregates hero + product/gallery + category images, source tabs, search, lazy “load more”, detail modal with copy-URL |
| `/admin/policies` | Policies & FAQ | Tabbed shipping/returns/privacy/terms (AR + EN), add/remove FAQ entries |
| `/admin/notifications` | Notifications | Derived feed (new orders, low stock, pending reviews), unread count, mark-all-read, filters |
| `/admin/staff` | Staff & roles | Add/edit/remove, roles `owner/manager/support/inventory`, activate/deactivate, password reset, last seen |
| `/admin/settings` | Settings | Tabs: Store, Payments, Shipping, Notifications, Language, Maintenance — with validation |
| `/admin/logs` | Activity log | Merged audit trail (orders, inventory, reviews, team sign-ins, system), level filters, search, pagination, print/export |

Navigation, page titles and icon mapping live in `src/admin/AdminShell.jsx`
(`NAV`, `BOTTOM`, `TITLES`). Shared primitives — `Badge Card Stat PageHead Field Switch Tabs
EmptyState SkeletonRows Pagination Modal BarChart LineChart EntityRow` — are in
`src/admin/components/ui.jsx`. Toasts reuse the storefront `Toast` via `useToast()`.

---

## 6. Data models

Source of truth for the prototype: `src/admin/data/seed.js`. All shapes below are what the
backend should return.

### Product
```
id:int  sku:string  name:string (AR)  nameEn:string (EN)  category:categoryId
price:number  oldPrice:number|null  cost:number
image:url  gallery:url[]
rating:number  reviewCount:int  discount:percent  isNew:bool
stock:int  reorderPoint:int  status:'active'|'draft'
colors:string[]  sizes:string[]  weight:number  dimensions:string
tags:string[]  description:string  descriptionEn:string  updatedAt:iso
stockLog:{ delta:int, reason:'restock'|'sale'|'damage'|'return'|'correction', at:iso }[]
```

### Category
```
id:slug ('beds'|'bedSheets'|'sheetSets'|'bedding'|'bedSets'|'covers'|'blankets'|'pillows'|'bedroomTextiles')
name  nameEn  blurb  blurbEn  image:url  visible:bool   (+ productCount, computed)
```

### Order
```
id:int  number:string ('N3-10001'…)  customerId:int  customerName  customerEmail
phone  city  cityEn  address
items:[{ productId, name, nameEn, image, price, qty, color, size }]
subtotal  shipping  discount  total  currency:'EGP'
paymentMethod:'cod'|'card'|'wallet'|'bank'
status:'pending'|'processing'|'shipped'|'delivered'|'cancelled'
date:iso  note:string
timeline:[{ title, at:iso, actor:'admin'|'customer'|'system', status? }]
```

### Customer
```
id:int  name  nameEn  email  phone  city  cityEn
ordersCount:int  totalSpent:number  segment:'vip'|'returning'|'new'  joined:iso  active:bool
```
`GET /admin/customers/:id` also embeds `orders: Order[]`.

### Coupon
```
id:int  code:string  type:'percent'|'fixed'|'shipping'  value:number
minOrder:number  used:int  limit:int  active:bool  expires:'YYYY-MM-DD'
```

### Review
```
id:int  productId:int  productName  productNameEn  productImage
customerName  customerEmail  rating:1..5  title  body
status:'pending'|'approved'|'rejected'  date:iso  helpful:int
```

### Staff
```
id:int  name  email  role:'admin'|'manager'|'support'|'inventory'  active:bool  lastSeen:iso
```

### Settings (`GET /admin/settings`)
```
storeName  supportEmail  phone  address  currency  currencySymbol
taxRate:percent  freeShippingThreshold:number  shippingFee:number
codEnabled  cardEnabled  walletEnabled  bankEnabled:bool
orderPrefix  lowStockAlerts  emailNotifications  whatsappNotifications:bool
maintenance:bool  defaultLang:'ar'|'en'
```

### Content (`GET /admin/content`)
```
announcement: { enabled, ar, en }
hero:         { enabled, eyebrowAr, eyebrowEn, titleAr, titleEn, ctaLabelAr, ctaLabelEn, ctaHref, image }
promo:        { enabled, titleAr, titleEn, href }
newsletter:   { enabled, titleAr, titleEn }
footerAbout:  { ar, en }
policies:     { shipping|returns|privacy|terms: { ar, en } }
faq:          [ { qAr, qEn, aAr, aEn } ]
```

### Analytics overview (`GET /admin/analytics/overview`)
```
kpis:          { revenue, revenueTrend, orders, ordersTrend, customers, customersTrend, aov, aovTrend }
revenueSeries: [ { label (AR), labelEn, value } ]
ordersByStatus:[ { status, count } ]
topProducts:   Product[]
lowStock:      Product[]
recentActivity:[ { titleAr, titleEn, at: iso, tone:'ok'|'warn'|'danger'|'info' } ]
```

---

## 7. API contract

`src/admin/data/api.js` is a **mock implementation**: every function is annotated with the
endpoint it stands in for, simulates ~220 ms latency (`login` 420 ms, overview 300 ms) and
mutates an in-memory copy of the seed. Swap each function for a `fetch` and the UI needs no
changes. All routes are under `/api/admin`.

| # | Method & path | Function | Query / body | Returns |
| --- | --- | --- | --- | --- |
| 1 | `POST /login` | `login` | `{ email, password }` | `{ token, user:{ id,name,email,role,initials } }` · 401 `invalid-credentials` |
| 2 | `POST /logout` | `logout` | — | `{ ok:true }` |
| 3 | `GET /products` | `listProducts` | `?query&category&status&page&perPage` | `{ rows, total, totalPages }` |
| 4 | `GET /products/:id` | `getProduct` | — | `Product \| null` |
| 5 | `POST /products` | `saveProduct` (no id) | `Product` | `Product` |
| 6 | `PATCH /products/:id` | `saveProduct` (with id) | partial `Product` | `Product` |
| 7 | `DELETE /products/:id` | `deleteProduct` | — | `{ ok:true }` |
| 8 | `GET /categories` | `listCategories` | — | `Category[]` (with `productCount`) |
| 9 | `POST/PATCH /categories` | `saveCategory` | `Category` | `Category` |
| 10 | `DELETE /categories/:id` | `deleteCategory` | — | `{ ok:true }` |
| 11 | `GET /orders` | `listOrders` | `?query&status&page&perPage` | `{ rows, total, totalPages }` |
| 12 | `GET /orders/:id` | `getOrder` | — | `Order` |
| 13 | `PATCH /orders/:id/status` | `updateOrderStatus` | `{ status, note }` | `Order` (timeline prepended) |
| 14 | `GET /customers` | `listCustomers` | `?query&page&perPage` | `{ rows, total, totalPages }` |
| 15 | `GET /customers/:id` | `getCustomer` | — | `Customer & { orders: Order[] }` |
| 16 | `GET /coupons` | `listCoupons` | — | `Coupon[]` |
| 17 | `POST/PATCH /coupons` | `saveCoupon` | `Coupon` (matched by `code`) | `Coupon` |
| 18 | `DELETE /coupons/:id` | `deleteCoupon` | — | `{ ok:true }` |
| 19 | `GET /reviews` | `listReviews` | `?status&page&perPage` | `{ rows, total, totalPages }` |
| 20 | `PATCH /reviews/:id/moderation` | `moderateReview` | `{ status }` | `Review` · 404 `review-not-found` |
| 21 | `GET /inventory` | `listInventory` | `?query&filter=all\|low\|out` | `InventoryRow[]` |
| 22 | `PATCH /inventory/:id/adjust` | `adjustStock` | `{ delta, reason }` | `Product` (stock floored at 0) · 404 `product-not-found` |
| 23 | `GET /content` | `getContent` | — | `Content` |
| 24 | `PATCH /content/:section` | `saveContent` | section value | saved section |
| 25 | `GET /settings` | `getSettings` | — | `Settings` |
| 26 | `PATCH /settings` | `saveSettings` | partial `Settings` | `Settings` |
| 27 | `GET /staff` | `listStaff` | — | `Staff[]` |
| 28 | `POST/PATCH /staff` | `saveStaff` | `Staff` (+ `password` on create) | `Staff` |
| 29 | `DELETE /staff/:id` | `deleteStaff` | — | `{ ok:true }` |
| 30 | `GET /analytics/overview` | `getOverview` | — | `Analytics` |
| 31 | `GET /logs` | `listLogs` | `?level=all\|info\|notice\|warning\|auth&q&page&perPage` | `{ rows, total, totalPages }` |

### Log entry shape
```
{ id:string, level:'info'|'notice'|'warning'|'auth', actor:string,
  action:string, detail:string, at:iso, source:'orders'|'stock'|'reviews'|'staff'|'system' }
```

### Conventions the backend should keep
- Pagination responses are always `{ rows, total, totalPages }`.
- `status` on orders uses the six values in `admin.status.*`; reviews use
  `pending|approved|rejected`.
- Errors are thrown with a stable `code` (`invalid-credentials`, `product-not-found`,
  `review-not-found`) which the UI maps to `admin.*` copy.
- Everything user-visible is returned in **both languages** (or a slug the UI resolves via
  `admin.categoryName.*`).

---

## 8. Frontend state & persistence

| Concern | Where | Persistence |
| --- | --- | --- |
| Locale | i18next | `localStorage` |
| Cart / wishlist | `CartProvider`, `WishlistProvider` | `localStorage` |
| Admin session | `AdminAuth` | `sessionStorage` (`no3oma.admin.session`) |
| Admin list filters | URL query string (`?q=&status=&page=&filter=`) | URL — shareable, survives refresh |
| Toasts | `ToastProvider` | in-memory, auto-dismiss 3.2 s |
| Storefront intro | `no3oma.intro.seen` | `sessionStorage` |

---

## 9. QA performed

- `npm run lint` → exit 0 (warnings only: `set-state-in-effect` on data-fetch effects,
  `only-export-components` on the auth context).
- `npm run build` → succeeds; the dashboard is emitted as its own chunk
  (`AdminApp` ≈ 177 kB / 33 kB CSS gzipped to ≈ 32 kB / 6.7 kB), so store visitors never
  download it.
- jsdom render sweep: **45 renders** (20 admin routes × {ar,en} × {guest,staff} + 3
  storefront routes) — 0 runtime errors, 0 empty shells, **0 missing i18n keys**, correct
  `document.title`/`dir` per locale.
- Behaviour checks (11): sign-in stores a session and reaches `/admin`, language switch
  flips `rtl → ltr`, sidebar navigation renders Inventory and Orders with rows, a guest
  deep-linking to `/admin/orders` is bounced to the login screen and never sees the shell.

---

## 10. Known gaps / next steps

1. **Wire the API** — replace `src/admin/data/api.js` with real `fetch` calls (contract in §7)
   and add CSRF/auth headers to `AdminAuthProvider`.
2. **Uploads** — media/content currently take URLs; file upload + object storage is pending.
3. **Notifications popover** in the top bar shows seeded highlights; make it read `GET /logs`.
4. **`Media` page** reads from products/categories/content, not a dedicated asset table —
   introduce one when the backend has uploads.
5. **Role enforcement** is client-side only; the UI should gate routes by `user.role`.
6. **Order exports** currently call `window.print()`; needs a real CSV/PDF endpoint.
7. **Customer account area** (storefront `/account`) is not yet fed by the same API.
