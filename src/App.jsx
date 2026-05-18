import React, { useState, useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CartProvider } from "./Pages/Context/CartContext";

// Layout Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/AuthModal/AuthModal";

// Page Components
import LandingPage from "./Pages/LandingPage/LandingPage";
import CartPage from "./Pages/CartPage/CartPage";
import ProfileSettings from "./Pages/ProfileSettings/ProfileSettings";
import Categories from "./Pages/Categories/Categories";
import CategoryDetail from "./Pages/CategoryDetails/CategoryDetails";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import AddressPage from "./Pages/AddressPage/AddressPage";
import RefundMonitoring from "./Pages/RefundMonitoring/RefundMonitoring";
import SellerDashboard from "./Pages/SellerDashboard/SellerDashboard"; 
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AboutUs from "./Pages/AboutUs/AboutUs";


/**
 * Main Application Component
 */
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // Configuration: Define routes that should not display global Header/Footer
  const hideLayoutRoutes = useMemo(() => [
    "/cart", 
    "/address", 
    "/payment", 
    "/product", 
    "/seller-dashboard",
    "/order-history",
    "/admin/dashboard" 
  ], []);

  // Determine if current path belongs to internal layout pages
  const isInternalLayoutPage = hideLayoutRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  const handleAuthOpen = () => setAuthModalOpen(true);
  const handleAuthClose = () => setAuthModalOpen(false);
  
  const handleNavigate = (page) => {
    handleAuthClose();
    navigate(page);
  };

  return (
    <CartProvider>
      <div className="app-root" style={{ backgroundColor: '#F6F7F8', minHeight: '100vh' }}>
        
        {/* Render Header only if not on internal layout pages */}
        {!isInternalLayoutPage && <Header onAuthOpen={handleAuthOpen} />}

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage onAuthOpen={handleAuthOpen} />} />
            <Route path="/home" element={<LandingPage onAuthOpen={handleAuthOpen} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<AboutUs />} />

            <Route path="/categories/:categoryName" element={<CategoryDetail />} />
            <Route path="/product/:productId" element={<ProductDetail />} />

            {/* User & Checkout Routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/profile" element={<ProfileSettings />} />

            {/* Admin & Seller Routes */}
            <Route path="/admin/refunds" element={<RefundMonitoring />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/seller-dashboard/*" element={<SellerDashboard />} />
          </Routes>
        </main>

        {/* Render Footer only if not on internal layout pages */}
        {!isInternalLayoutPage && <Footer />}

        {/* Authentication Overlay */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={handleAuthClose}
          onNavigate={handleNavigate}
        />
      </div>
    </CartProvider>
  );
}

export default App;