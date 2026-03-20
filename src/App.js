import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

// Layouts
import Navbar from './components/Navbar/Navbar';

// Auth Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Common Pages
import HomePage from './pages/Common/HomePage';
import ProductListPage from './pages/Common/ProductListPage';
import ProductDetailPage from './pages/Common/ProductDetailPage';
import NotificationPage from './pages/Common/NotificationPage';
import NewsPromoPage from './pages/Common/NewsPromoPage';

// User Pages
import CartPage from './pages/User/CartPage';
import OrdersPage from './pages/User/OrdersPage';
import OrderDetailPage from './pages/User/OrderDetailPage';
import ProfilePage from './pages/User/ProfilePage';

// Officer Pages
import OfficerDashboard from './pages/Officer/OfficerDashboard';
import ProductManagement from './pages/Officer/ProductManagement';
import OrderManagement from './pages/Officer/OrderManagement';
import DeliveryManagement from './pages/Officer/DeliveryManagement';
import DailyHistoryPage from './pages/Officer/DailyHistoryPage';
import NewsPromoManagement from './pages/Officer/NewsPromoManagement';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import OfficerManagement from './pages/Admin/OfficerManagement';
import ActivityReportPage from './pages/Admin/ActivityReportPage';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = [] }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole.length > 0 && !requiredRole.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Common Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/news-promos" element={<NewsPromoPage />} />

          {/* User Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole={['user', 'officer', 'admin']}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole={['user', 'officer', 'admin']}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute requiredRole={['user', 'officer', 'admin']}>
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute requiredRole={['user', 'officer', 'admin']}>
                <NotificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole={['user', 'officer', 'admin']}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Officer Routes */}
          <Route
            path="/officer-dashboard"
            element={
              <ProtectedRoute requiredRole={['officer', 'admin']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/products"
            element={
              <ProtectedRoute requiredRole={['officer', 'admin']}>
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/orders"
            element={
              <ProtectedRoute requiredRole={['officer', 'admin']}>
                <OrderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/delivery"
            element={
              <ProtectedRoute requiredRole={['officer', 'admin']}>
                <DeliveryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/history"
            element={
              <ProtectedRoute requiredRole={['officer', 'admin']}>
                <DailyHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/news-promo"
            element={
              <ProtectedRoute requiredRole={['officer', 'admin']}>
                <NewsPromoManagement />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/officers"
            element={
              <ProtectedRoute requiredRole={['admin']}>
                <OfficerManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute requiredRole={['admin']}>
                <ActivityReportPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
