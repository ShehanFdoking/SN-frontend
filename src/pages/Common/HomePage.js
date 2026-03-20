import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CATEGORIES = [
  { emoji: '🍾', label: 'Vinegar',      slug: 'Vinegar'      },
  { emoji: '🫙', label: 'Chutneys',     slug: 'Chutneys'     },
  { emoji: '🌶️', label: 'Chilli Paste', slug: 'Chilli Paste' },
  { emoji: '🍅', label: 'Tomato Sauce', slug: 'Tomato Sauce' },
  { emoji: '🍫', label: 'Cocoa Powder', slug: 'Cocoa Powder' },
  { emoji: '🪵', label: 'Cinnamon',     slug: 'Cinnamon'     },
  { emoji: '✨', label: 'Spices',       slug: 'Spices'       },
];

const FEATURES = [
  { icon: '🌿', title: 'All Natural',      desc: 'Pure ingredients, no additives or preservatives.' },
  { icon: '🏡', title: 'Home Crafted',     desc: 'Made in small batches by passionate artisans.'   },
  { icon: '🚚', title: 'Fast Delivery',    desc: 'Fresh to your door, tracked every step of the way.' },
  { icon: '⭐', title: 'Quality Assured',  desc: 'Every product is tasted and approved before listing.' },
];

const HomePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80')] bg-center bg-cover bg-no-repeat overflow-hidden">
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        <div className="container relative z-10 py-[60px] max-w-[760px] text-left">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-light text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide animate-[fadeSlideUp_0.6s_ease_both]">🌶️ Artisan Condiments &amp; Spices Marketplace</div>
          <h1 className="font-serif text-[clamp(44px,6vw,76px)] leading-[1.1] text-white mb-5 animate-[fadeSlideUp_0.7s_ease_0.1s_both]">
            Flavours That Tell<br />
            <span className="text-primary">A Story</span>
          </h1>
          <p className="text-[18px] text-white/75 leading-[1.7] mb-9 max-w-[560px] animate-[fadeSlideUp_0.7s_ease_0.2s_both]">
            Buy and sell premium vinegar, chutneys, chilli pastes, tomato sauces,
            cocoa powder, cinnamon &amp; hand-picked spices — all in one place.
          </p>
          <div className="flex items-center gap-4 flex-wrap mb-[52px] animate-[fadeSlideUp_0.7s_ease_0.3s_both]">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-primary text-white rounded-lg font-semibold px-8 py-3.5 transition-all shadow-[0_4px_14px_rgba(230,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(230,0,0,0.45)]">
              🛍️ Shop Now
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="inline-flex items-center justify-center bg-transparent border-2 border-white/45 text-white rounded-lg font-semibold px-7 py-3 transition-all hover:bg-white/10 hover:border-white/70">
                Start Selling
              </Link>
            )}
            {isAuthenticated && (
              <span className="text-white/75 text-[15px]">
                👋 Welcome back, <strong>{user?.firstName}!</strong>
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-0 bg-white/5 border border-white/10 rounded-2xl py-5 px-8 backdrop-blur-md w-fit animate-[fadeSlideUp_0.7s_ease_0.4s_both] flex-wrap justify-center max-md:p-4 max-md:mt-4">
            <div className="text-center px-7 max-md:px-4 max-md:py-2">
              <span className="block text-[26px] font-extrabold text-white leading-none">200+</span>
              <p className="text-[12px] text-white/55 uppercase tracking-wide mt-1">Products</p>
            </div>
            <div className="w-px h-10 bg-white/15 max-md:hidden" />
            <div className="text-center px-7 max-md:px-4 max-md:py-2">
              <span className="block text-[26px] font-extrabold text-white leading-none">50+</span>
              <p className="text-[12px] text-white/55 uppercase tracking-wide mt-1">Sellers</p>
            </div>
            <div className="w-px h-10 bg-white/15 max-md:hidden" />
            <div className="text-center px-7 max-md:px-4 max-md:py-2">
              <span className="block text-[26px] font-extrabold text-white leading-none">7</span>
              <p className="text-[12px] text-white/55 uppercase tracking-wide mt-1">Categories</p>
            </div>
            <div className="w-px h-10 bg-white/15 max-md:hidden" />
            <div className="text-center px-7 max-md:px-4 max-md:py-2">
              <span className="block text-[26px] font-extrabold text-white leading-none">4.9★</span>
              <p className="text-[12px] text-white/55 uppercase tracking-wide mt-1">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] text-text mb-3">Browse by Category</h2>
            <p className="text-[16px] text-text-muted max-w-[520px] mx-auto">Everything from tangy vinegars to warming spice blends</p>
            <div className="w-14 h-[3px] bg-primary rounded-sm mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 max-md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] max-md:gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center gap-2.5 pt-7 pb-5 px-4 bg-white border-1.5 border-borderColor rounded-2xl text-text transition-all hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(230,0,0,0.1)] relative overflow-hidden"
              >
                <span className="text-[38px] leading-none block transition-transform duration-250 group-hover:scale-110">{cat.emoji}</span>
                <span className="text-[13px] font-bold text-center tracking-wide">{cat.label}</span>
                <span className="text-[14px] text-primary opacity-0 -translate-x-1 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-black py-[72px] relative overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(230,0,0,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="container flex items-center justify-between gap-10 flex-wrap max-md:flex-col max-md:text-center relative z-10">
          <div>
            <h2 className="font-serif text-[34px] text-white mb-2.5">Have a secret recipe?</h2>
            <p className="text-[16px] text-white/65 max-w-[500px] leading-[1.7]">Turn your homemade condiments and spice blends into a business. Join our seller community today.</p>
          </div>
          <div className="flex items-center gap-5 shrink-0 flex-wrap max-md:justify-center">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-white border-none rounded-lg px-7 py-3 font-semibold transition-all shadow-[0_4px_14px_rgba(230,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(230,0,0,0.45)]">Start Selling</Link>
                <Link to="/login" className="text-white/55 text-[14px] underline transition-colors hover:text-white/85">Already have an account?</Link>
              </>
            ) : (
              <Link to="/officer/products" className="inline-flex items-center justify-center gap-2 bg-primary text-white border-none rounded-lg px-7 py-3 font-semibold transition-all shadow-[0_4px_14px_rgba(230,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(230,0,0,0.45)]">List a Product</Link>
            )}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] text-text mb-3">Why Flavour It?</h2>
            <p className="text-[16px] text-text-muted max-w-[520px] mx-auto">The marketplace built for condiment lovers and artisan sellers</p>
            <div className="w-14 h-[3px] bg-primary rounded-sm mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white border-1.5 border-borderColor rounded-2xl p-8 text-center transition-all duration-250 hover:border-primary hover:shadow-[0_12px_36px_rgba(230,0,0,0.1)] hover:-translate-y-1">
                <div className="text-[44px] mb-4 block">{f.icon}</div>
                <h3 className="text-[17px] font-bold text-text mb-2.5">{f.title}</h3>
                <p className="text-[14px] text-text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS (authenticated) ── */}
      {isAuthenticated && (
        <section className="py-20 bg-white border-t border-borderColor">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] text-text mb-3">Quick Actions</h2>
              <div className="w-14 h-[3px] bg-primary rounded-sm mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
              <Link to="/cart" className="flex flex-col items-center gap-3 py-8 px-5 rounded-2xl text-white font-sans transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,0,0.2)] bg-black">
                <span className="text-[36px]">🛒</span><strong className="text-[15px] font-bold">My Cart</strong>
              </Link>
              <Link to="/orders" className="flex flex-col items-center gap-3 py-8 px-5 rounded-2xl text-white font-sans transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,0,0.2)] bg-primary">
                <span className="text-[36px]">📦</span><strong className="text-[15px] font-bold">My Orders</strong>
              </Link>
              <Link to="/notifications" className="flex flex-col items-center gap-3 py-8 px-5 rounded-2xl text-white font-sans transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,0,0.2)] bg-black">
                <span className="text-[36px]">🔔</span><strong className="text-[15px] font-bold">Notifications</strong>
              </Link>
              <Link to="/profile" className="flex flex-col items-center gap-3 py-8 px-5 rounded-2xl text-white font-sans transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,0,0.2)] bg-primary">
                <span className="text-[36px]">👤</span><strong className="text-[15px] font-bold">My Profile</strong>
              </Link>
              {(user?.role === 'officer' || user?.role === 'admin') && (
                <Link to="/officer-dashboard" className="flex flex-col items-center gap-3 py-8 px-5 rounded-2xl text-white font-sans transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,0,0.2)] bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-primary/20 hover:border-primary">
                  <span className="text-[36px]">📊</span><strong className="text-[15px] font-bold text-center">Seller Hub<br/><span className="text-[12px] opacity-70 font-normal">Manage Products</span></strong>
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin-dashboard" className="flex flex-col items-center gap-3 py-8 px-5 rounded-2xl text-white font-sans transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,0,0.2)] bg-gradient-to-br from-primary to-primary-dark">
                  <span className="text-[36px]">⚙️</span><strong className="text-[15px] font-bold text-center">Admin Panel<br/><span className="text-[12px] opacity-70 font-normal">System Config</span></strong>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-12 pb-8 text-center border-t border-white/10">
        <div className="container flex flex-col items-center gap-3">
          <div className="font-serif text-[22px] text-white font-bold">🌶️ Flavour It</div>
          <p className="text-[13px] text-white/45">By S&N Products</p>
          <div className="flex gap-6 my-2">
            <Link to="/products" className="text-white/55 text-[13px] transition-colors hover:text-primary">Shop</Link>
            <Link to="/news-promos" className="text-white/55 text-[13px] transition-colors hover:text-primary">Offers</Link>
            <Link to="/register" className="text-white/55 text-[13px] transition-colors hover:text-primary">Sell</Link>
          </div>
          <p className="text-[12px] text-white/25">© {new Date().getFullYear()} S&N Products. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
