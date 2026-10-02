import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Toast from "./components/Toast/Toast";
import Footer from "./components/Footer/Footer";
import LanguageProvider from "./context/LanguageProvider";
import CartProvider from "./context/CartProvider";
import WishlistProvider from "./context/WishlistProvider";
import ToastProvider from "./context/ToastProvider";
import "./App.css";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Category from "./pages/Category/Category";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SearchResults from "./pages/SearchResults/SearchResults";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Account from "./pages/Account/Account";
import Wishlist from "./pages/Wishlist/Wishlist";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import ReturnExchangePolicy from "./pages/ReturnExchangePolicy/ReturnExchangePolicy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <Navbar />
            <main className="app-shell">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/account" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}