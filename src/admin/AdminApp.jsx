import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuth';
import AdminShell from './AdminShell';
import './admin.css';

import Login from './pages/Login';
import Overview from './pages/Overview';
import Products from './pages/Products';
import ProductEditor from './pages/ProductEditor';
import Categories from './pages/Categories';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Coupons from './pages/Coupons';
import Reviews from './pages/Reviews';
import Content from './pages/Content';
import Media from './pages/Media';
import Policies from './pages/Policies';
import Notifications from './pages/Notifications';
import Staff from './pages/Staff';
import Settings from './pages/Settings';
import Logs from './pages/Logs';

function RequireAuth({ children }) {
  const { user } = useAdminAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminShell />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductEditor />} />
          <Route path="products/:id" element={<ProductEditor />} />
          <Route path="categories" element={<Categories />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="content" element={<Content />} />
          <Route path="media" element={<Media />} />
          <Route path="policies" element={<Policies />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="staff" element={<Staff />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logs" element={<Logs />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
