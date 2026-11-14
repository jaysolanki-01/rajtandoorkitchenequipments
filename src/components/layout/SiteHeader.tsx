import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand, nav } from '../../config/site';
import { CATEGORIES } from '../../config/categories';
import { useCart } from '../../store/CartContext';
import { useWishlist } from '../../store/WishlistContext';
import { useSearch } from '../../store/SearchContext';
import { useAuth } from '../../store/AuthContext';
import { BrandMark } from '../BrandMark';
import { CartDrawer } from '../cart/CartDrawer';
import { LoginModal } from '../auth/LoginModal';

const MEGA_COLS = [
  CATEGORIES.slice(0, 4),
  CATEGORIES.slice(4, 8),
  CATEGORIES.slice(8, 12),
  CATEGORIES.slice(12),
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProdOpen, setMobileProdOpen] = useState(false);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { open: openSearch } = useSearch();
  const { isLoggedIn, user, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!accountOpen) return;
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [accountOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setMegaOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const openMega = () => { clearTimeout(megaTimerRef.current); setMegaOpen(true); };
  const closeMega = () => { megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150); };

  const userInitial = user ? user.name[0].toUpperCase() : null;

  return (
    <>
      <header className={`sh ${scrolled ? 'sh--scrolled' : ''} ${mobileOpen ? 'sh--open' : ''}`} role="banner">
        <div className="sh__inner container">

          {/* Logo */}
          <Link to="/" className="sh__logo" aria-label={brand.fullName}>
            <BrandMark size="sm" theme="light" />
          </Link>

          {/* Desktop nav */}
          <nav className="sh__nav" aria-label="Primary navigation">
            <ul role="list">
              {/* Products mega menu trigger */}
              <li
                className={`sh__mega-trigger${megaOpen ? ' sh__mega-trigger--active' : ''}`}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button
                  type="button"
                  className="sh__link sh__link--mega"
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                >
                  Products
                  <span className="sh__link-caret" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => isActive ? 'sh__link sh__link--active' : 'sh__link'}
                    end={item.href === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="sh__actions">
            {/* Search */}
            <button className="sh__icon-btn" aria-label="Open search" onClick={openSearch} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="sh__icon-btn sh__icon-btn--badge sh__wishlist" aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}` : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="sh__badge" aria-hidden="true">{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <button className="sh__icon-btn sh__icon-btn--badge sh__cart-btn" aria-label={`Shopping cart${itemCount ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`} onClick={() => setCartOpen(true)} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && <span className="sh__badge" aria-hidden="true">{itemCount}</span>}
            </button>

            {/* Login / User avatar */}
            {isLoggedIn ? (
              <div className="sh__account" ref={accountRef}>
                <button
                  type="button"
                  className="sh__avatar"
                  aria-label={`Account: ${user?.name}`}
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  onClick={() => setAccountOpen(v => !v)}
                >
                  {userInitial}
                </button>
                {accountOpen && (
                  <div className="sh__account-menu" role="menu">
                    <p className="sh__account-name">{user?.name}</p>
                    <Link to="/account" role="menuitem" className="sh__account-item">My Account</Link>
                    <Link to="/account/orders" role="menuitem" className="sh__account-item">My Orders</Link>
                    <Link to="/wishlist" role="menuitem" className="sh__account-item">My Wishlist</Link>
                    <Link to="/account/addresses" role="menuitem" className="sh__account-item">Addresses</Link>
                    <div className="sh__account-divider" />
                    <button type="button" role="menuitem" className="sh__account-item sh__account-item--danger" onClick={() => { logout(); setAccountOpen(false); }}>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="btn btn--outline sh__login-btn"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </button>
            )}

            {/* Quote CTA — desktop only */}
            <Link to="/contact?type=quote" className="btn btn--gold sh__quote-btn">
              Request a Quote
            </Link>

            {/* Mobile hamburger */}
            <button
              className="sh__burger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="sh-mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
            >
              <span className="sh__burger-bar" />
              <span className="sh__burger-bar" />
            </button>
          </div>
        </div>

        {/* Full-width Mega Menu Panel */}
        <div
          className={`sh-mega ${megaOpen ? 'sh-mega--open' : ''}`}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          aria-hidden={!megaOpen}
        >
          <div className="sh-mega__inner container">
            <div className="sh-mega__grid">
              {MEGA_COLS.map((col, ci) => (
                <div key={ci} className="sh-mega__col">
                  {col.map(cat => (
                    <div key={cat.slug} className="sh-mega__section">
                      <Link
                        to={`/shop?category=${cat.slug}`}
                        className="sh-mega__title"
                        onClick={() => setMegaOpen(false)}
                      >
                        {cat.name}
                        <span className="sh-mega__arrow" aria-hidden="true">→</span>
                      </Link>
                      <ul className="sh-mega__list">
                        {cat.products.slice(0, 4).map(p => (
                          <li key={p.slug}>
                            <Link
                              to={`/products/${p.slug}`}
                              className="sh-mega__item"
                              onClick={() => setMegaOpen(false)}
                            >
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {cat.products.length > 4 && (
                        <Link
                          to={`/shop?category=${cat.slug}`}
                          className="sh-mega__more"
                          onClick={() => setMegaOpen(false)}
                        >
                          +{cat.products.length - 4} more
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile overlay backdrop */}
        <div className="sh__overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />

        {/* Mobile nav — right slide-in drawer */}
        <div
          id="sh-mobile-nav"
          ref={mobileNavRef}
          className="sh__mobile"
          aria-hidden={!mobileOpen}
        >
          {/* Drawer header */}
          <div className="sh__mobile-head">
            <BrandMark size="sm" theme="light" />
            <button
              type="button"
              className="sh__mobile-close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul role="list">
              {/* Products accordion */}
              <li>
                <button
                  type="button"
                  className="sh__mobile-link sh__mobile-link--btn sh__mobile-prod-toggle"
                  tabIndex={mobileOpen ? 0 : -1}
                  onClick={() => setMobileProdOpen(v => !v)}
                  aria-expanded={mobileProdOpen}
                >
                  Products
                  <svg
                    className={`sh__mobile-prod-caret${mobileProdOpen ? ' sh__mobile-prod-caret--open' : ''}`}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`sh__mobile-cats${mobileProdOpen ? ' sh__mobile-cats--open' : ''}`}>
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/shop?category=${cat.slug}`}
                      className="sh__mobile-cat-link"
                      tabIndex={mobileOpen && mobileProdOpen ? 0 : -1}
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => isActive ? 'sh__mobile-link sh__mobile-link--active' : 'sh__mobile-link'}
                    end={item.href === '/'}
                    tabIndex={mobileOpen ? 0 : -1}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="sh__mobile-divider" />
              <li>
                <Link to="/wishlist" className="sh__mobile-link" tabIndex={mobileOpen ? 0 : -1}>
                  Wishlist {wishlistCount > 0 && <span className="sh__mobile-badge">{wishlistCount}</span>}
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/account" className="sh__mobile-link" tabIndex={mobileOpen ? 0 : -1}>My Account ({user?.name})</Link></li>
                  <li><Link to="/account/orders" className="sh__mobile-link" tabIndex={mobileOpen ? 0 : -1}>My Orders</Link></li>
                  <li>
                    <button type="button" className="sh__mobile-link sh__mobile-link--btn" tabIndex={mobileOpen ? 0 : -1} onClick={() => { logout(); setMobileOpen(false); }}>
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    type="button"
                    className="sh__mobile-link sh__mobile-link--btn"
                    tabIndex={mobileOpen ? 0 : -1}
                    onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                  >
                    Login / Sign in
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* CTA at drawer bottom */}
          <div className="sh__mobile-cta">
            <Link to="/contact?type=quote" className="sh__quote-btn" style={{ width: '100%', justifyContent: 'center' }} tabIndex={mobileOpen ? 0 : -1}>
              Request a Quote
            </Link>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <LoginModal
        forceOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}
