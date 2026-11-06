import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand, nav } from '../../config/site';
import { useCart } from '../../store/CartContext';
import { useWishlist } from '../../store/WishlistContext';
import { useSearch } from '../../store/SearchContext';
import { useAuth } from '../../store/AuthContext';
import { BrandMark } from '../BrandMark';
import { CartDrawer } from '../cart/CartDrawer';
import { LoginModal } from '../auth/LoginModal';


export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
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

  useEffect(() => { setMobileOpen(false); setAccountOpen(false); }, [location.pathname]);

  // Close account dropdown on outside click
  useEffect(() => {
    if (!accountOpen) return;
    const handler = (e: MouseEvent) => { if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [accountOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const userInitial = user ? user.name[0].toUpperCase() : null;

  return (
    <>
      <header className={`sh ${scrolled ? 'sh--scrolled' : ''} ${mobileOpen ? 'sh--open' : ''}`} role="banner">
        <div className="sh__inner container">

          {/* Logo */}
          <Link to="/" className="sh__logo" aria-label={brand.fullName}>
            <BrandMark size="sm" theme="auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="sh__nav" aria-label="Primary navigation">
            <ul role="list">
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

            {/* Wishlist — hidden on smallest screens */}
            <Link to="/wishlist" className="sh__icon-btn sh__icon-btn--badge sh__wishlist" aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}` : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="sh__badge" aria-hidden="true">{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <button className="sh__icon-btn sh__icon-btn--badge" aria-label={`Shopping cart${itemCount ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`} onClick={() => setCartOpen(true)} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && <span className="sh__badge" aria-hidden="true">{itemCount}</span>}
            </button>

            {/* Login / User avatar with dropdown */}
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

        {/* Mobile nav */}
        <div
          id="sh-mobile-nav"
          ref={mobileNavRef}
          className={`sh__mobile ${mobileOpen ? 'sh__mobile--open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          <nav aria-label="Mobile navigation">
            <ul role="list">
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
              <li className="sh__mobile-cta">
                <Link to="/contact?type=quote" className="btn btn--gold btn--block" tabIndex={mobileOpen ? 0 : -1}>
                  Request a Quote
                </Link>
              </li>
            </ul>
          </nav>
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
