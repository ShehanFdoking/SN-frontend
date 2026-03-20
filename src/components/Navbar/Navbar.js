import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/75 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between gap-5">

        {/* Logo */}
        <Link to="/" className="font-serif text-[22px] font-bold text-white flex flex-col justify-center whitespace-nowrap tracking-wide hover:opacity-85 transition-opacity">
          <span className="leading-none flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">🌶️</span>
            Flavour It
          </span>
          <span className="text-[10px] text-white/50 font-sans uppercase tracking-widest pl-10 leading-none mt-1">By S&N Products</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-1.5">
          <Link to="/products" className={`hidden sm:flex text-[14px] font-semibold px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 whitespace-nowrap ${isActive('/products') ? 'text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>Shop</Link>
          <Link to="/news-promos" className={`hidden sm:flex text-[14px] font-semibold px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 whitespace-nowrap ${isActive('/news-promos') ? 'text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>Offers</Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link to="/cart" className={`relative flex items-center gap-1.5 text-[14px] font-semibold px-4 py-2 rounded-xl transition-all duration-300 ${isActive('/cart') ? 'text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-primary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1a0f0a] shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/orders" className={`hidden sm:flex text-[14px] font-semibold px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 whitespace-nowrap ${isActive('/orders') ? 'text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>Orders</Link>
              <Link to="/notifications" className={`hidden sm:flex text-[14px] font-semibold px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 whitespace-nowrap ${isActive('/notifications') ? 'text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>🔔</Link>

              {/* Officer Link */}
              {(user?.role === 'officer' || user?.role === 'admin') && (
                <Link to="/officer-dashboard" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/5 text-white text-[13px] font-bold rounded-xl border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 shadow-sm ml-1">
                  📊 Seller Hub
                </Link>
              )}

              {/* Admin Link */}
              {user?.role === 'admin' && (
                <Link to="/admin-dashboard" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white text-[13px] font-bold rounded-xl shadow-[0_4px_12px_rgba(230,0,0,0.3)] hover:shadow-[0_6px_16px_rgba(230,0,0,0.45)] hover:-translate-y-0.5 transition-all duration-300">
                  ⚙️ Admin Panel
                </Link>
              )}

              <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

              <Link to="/profile" className={`hidden sm:flex text-[14px] font-semibold px-4 py-2 rounded-xl transition-all duration-300 items-center gap-1.5 whitespace-nowrap ${isActive('/profile') ? 'text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                👤 {user?.firstName || 'Profile'}
              </Link>
              <button onClick={handleLogout} className="text-[13px] font-medium px-4 py-2 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 cursor-pointer">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-[14px] font-semibold px-5 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300">Login</Link>
              <Link to="/register" className="text-[14px] font-semibold px-6 py-2.5 rounded-xl text-white bg-primary shadow-[0_4px_12px_rgba(230,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(230,0,0,0.45)] hover:-translate-y-0.5 transition-all duration-300">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
