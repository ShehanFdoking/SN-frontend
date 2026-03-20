import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import * as apiService from '../../services/apiService';

const CATEGORY_META = {
  'Vinegar':      { emoji: '🍾', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
  'Chutneys':     { emoji: '🫙', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
  'Chilli Paste': { emoji: '🌶️', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
  'Tomato Sauce': { emoji: '🍅', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
  'Cocoa Powder': { emoji: '🍫', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
  'Cinnamon':     { emoji: '🪵', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
  'Spices':       { emoji: '✨', color: '#e60000', bg: 'bg-primary/10', text: 'text-primary' },
};

const ALL_CATS = ['Vinegar','Chutneys','Chilli Paste','Tomato Sauce','Cocoa Powder','Cinnamon','Spices'];

const renderStars = (rating) => {
  const full = Math.round(rating || 0);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
};

const ProductListPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext) || {};
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [addingId, setAddingId]   = useState(null);
  const [filter, setFilter]       = useState({
    category: new URLSearchParams(location.search).get('category') || '',
    search:   '',
    page:     1,
    limit:    12,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.getAllProducts(filter);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { 
    fetchProducts(); 
  }, [fetchProducts]);

  const handleCat = (cat) => setFilter({ ...filter, category: cat, page: 1 });
  const handleSearch = (e) => setFilter({ ...filter, search: e.target.value, page: 1 });

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    if (!isAuthenticated) { navigate('/login'); return; }
    try {
      setAddingId(productId);
      await apiService.addToCart({ productId, quantity: 1 });
      if (addToCart) addToCart();
    } catch (err) {
      console.error(err);
    } finally { setAddingId(null); }
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* Page Header */}
      <div className="bg-black pt-[52px] pb-[40px] text-center border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-6">
          <h1 className="font-serif text-[38px] text-white mb-2.5">🛍️ Our Products</h1>
          <p className="text-[16px] text-white/60">Handpicked condiments, sauces &amp; spices from artisan sellers</p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-[240px] shrink-0 md:sticky md:top-[88px]">
            {/* Search */}
            <div className="bg-white border-1.5 border-borderColor rounded-xl p-5 mb-4 shadow-sm">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-text-muted mb-3.5">🔍 Search</h4>
              <input
                type="text"
                placeholder="Search products..."
                value={filter.search}
                onChange={handleSearch}
                className="w-full px-3.5 py-2.5 border-1.5 border-borderColor rounded-lg font-sans text-[14px] text-text bg-bg outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* Categories */}
            <div className="bg-white border-1.5 border-borderColor rounded-xl p-5 mb-4 shadow-sm flex flex-col gap-0.5">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-text-muted mb-3.5">📂 Category</h4>
              <button
                className={`flex items-center gap-2.5 w-full px-3 py-2 border-none rounded-lg bg-transparent font-sans text-[14px] font-medium text-text cursor-pointer text-left transition-all duration-200 ${filter.category === '' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-primary/5 hover:text-primary'}`}
                onClick={() => handleCat('')}
              >
                <span className="text-[16px]">🏪</span> All Products
              </button>
              {ALL_CATS.map(cat => {
                const meta = CATEGORY_META[cat] || {};
                return (
                  <button
                    key={cat}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 border-none rounded-lg bg-transparent font-sans text-[14px] font-medium text-text cursor-pointer text-left transition-all duration-200 ${filter.category === cat ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-primary/5 hover:text-primary'}`}
                    onClick={() => handleCat(cat)}
                  >
                    <span className="text-[16px]">{meta.emoji || '📦'}</span> {cat}
                  </button>
                )
              })}
            </div>
          </aside>

          {/* ── Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Active filter chip */}
            {filter.category && (
              <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/20 text-primary text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-5">
                Showing: <strong>{filter.category}</strong>
                <button onClick={() => handleCat('')} className="bg-none border-none text-primary cursor-pointer text-[14px] font-bold p-0 leading-none opacity-70 hover:opacity-100 transition-opacity">✕</button>
              </div>
            )}

            {loading ? (
              <div className="py-20 flex justify-center"><div className="w-11 h-11 border-4 border-borderColor border-t-primary rounded-full animate-spin" /></div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 max-sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-sm:gap-4">
                {products.map(product => {
                  const meta = CATEGORY_META[product.category] || {};
                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-borderColor transition-all duration-250 cursor-pointer relative hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(230,0,0,0.1)] flex flex-col"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      {/* Image */}
                      {product.image
                        ? <img src={product.image} alt={product.name} className="w-full h-[200px] object-contain block bg-gray-100 px-4 py-2" />
                        : (
                          <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center text-[52px]">
                            {meta.emoji || '📦'}
                          </div>
                        )
                      }

                      <div className="p-[18px] flex-1 flex flex-col">
                        {/* Category tag */}
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-[10px] py-[3px] rounded-full uppercase tracking-wider mb-2.5 w-fit ${meta.bg || 'bg-primary/10'} ${meta.text || 'text-primary'}`}>
                          {meta.emoji} {product.category}
                        </span>

                        <h3 className="font-serif text-[16px] text-text mb-1.5 leading-[1.4] line-clamp-2">{product.name}</h3>
                        <p className="text-[13px] text-text-muted mb-3.5 leading-[1.5] line-clamp-2 flex-1">{product.description}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-auto mb-1">
                          <span className="text-gold text-[13px] tracking-widest">{renderStars(product.rating)}</span>
                          <span className="text-[12px] text-text-muted font-semibold">{product.rating?.toFixed(1) || '0.0'}</span>
                        </div>
                      </div>

                      <div className="px-[18px] pb-[18px] flex items-center justify-between">
                        <div>
                          <div className="text-[20px] font-bold text-primary leading-none mb-1">Rs. {product.price?.toFixed(2)}</div>
                          <div className="text-[12px] text-text-light">
                            {product.quantity > 0
                              ? `✓ ${product.quantity} in stock`
                              : '✕ Out of stock'}
                          </div>
                        </div>
                        <button
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-[18px] shrink-0 transition-all duration-200 ${product.quantity === 0 ? 'bg-[#ddd] cursor-not-allowed shadow-none' : 'bg-primary cursor-pointer shadow-[0_4px_12px_rgba(230,0,0,0.3)] hover:scale-110 hover:shadow-[0_6px_18px_rgba(230,0,0,0.45)]'}`}
                          onClick={(e) => handleAddToCart(e, product._id)}
                          disabled={product.quantity === 0 || addingId === product._id}
                        >
                          {addingId === product._id ? '...' : '🛒'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 px-5 text-text-muted">
                <div className="text-[64px] mb-5">🫙</div>
                <h3 className="text-[22px] mb-2.5 text-text font-serif">No products found</h3>
                <p className="text-[15px] mb-6">Try a different category or search term.</p>
                <button
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white border-none px-7 py-3 rounded-lg font-sans text-[15px] font-semibold cursor-pointer transition-all duration-250 shadow-[0_4px_14px_rgba(230,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(230,0,0,0.45)]"
                  onClick={() => setFilter({ ...filter, category: '', search: '' })}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;