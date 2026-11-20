'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { useWishlist } from '../store/WishlistContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrders, type UserOrder } from '../lib/supabase/db';

const QUICK_ACTIONS = [
  {
    href: '/account/orders',
    label: 'My Orders',
    desc: 'Track & view order history',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: '/wishlist',
    label: 'Wishlist',
    desc: 'View your saved products',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    href: '/account/addresses',
    label: 'Delivery Addresses',
    desc: 'Add or update addresses',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    href: '/account/profile',
    label: 'Edit Profile',
    desc: 'Name, phone & password',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    href: '/contact?type=quote',
    label: 'Request a Quote',
    desc: 'Pricing for bulk orders',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: '/shop',
    label: 'Browse Products',
    desc: 'Explore our full catalogue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    href: '/contact',
    label: 'Contact Support',
    desc: 'Get help from our team',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    href: '/about',
    label: 'About Raj Tandoor',
    desc: 'Our story & products',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
];

export function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const [orders, setOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    fetchUserOrders(user.id).then(setOrders).catch(() => {});
  }, [isLoggedIn, user]);

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading your account…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  const initial = user?.name?.[0]?.toUpperCase() ?? '?';
  const memberSince = user?.id
    ? new Date().getFullYear()
    : null;

  return (
    <>
      <title>{`My Account | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main acct-page">
        {/* Page banner */}
        <div className="acct-banner">
          <div className="container">
            <div className="acct-banner__inner">
              <div className="acct-banner__avatar" aria-hidden="true">{initial}</div>
              <div className="acct-banner__info">
                <h1 className="acct-banner__name">{user?.name}</h1>
                <p className="acct-banner__email">{user?.email}</p>
                {user?.phone && <p className="acct-banner__phone">{user.phone}</p>}
                {memberSince && <p className="acct-banner__since">Member since {memberSince}</p>}
              </div>
              <div className="acct-banner__cta">
                <Link href="/account/profile" className="btn btn--gold btn--sm">Edit Profile</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="acct-layout">
            <AccountNav />

            <div className="acct-main">
              {/* Stats */}
              <div className="acct-stats-row">
                <div className="acct-stat-card">
                  <span className="acct-stat-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </span>
                  <span className="acct-stat-card__val">{orders.length}</span>
                  <span className="acct-stat-card__label">Total Orders</span>
                  <Link href="/account/orders" className="acct-stat-card__link">View all →</Link>
                </div>
                <div className="acct-stat-card">
                  <span className="acct-stat-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </span>
                  <span className="acct-stat-card__val">{wishlistCount}</span>
                  <span className="acct-stat-card__label">Saved Products</span>
                  <Link href="/wishlist" className="acct-stat-card__link">View wishlist →</Link>
                </div>
                <div className="acct-stat-card">
                  <span className="acct-stat-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="acct-stat-card__val acct-stat-card__val--sm">Address</span>
                  <span className="acct-stat-card__label">Book</span>
                  <Link href="/account/addresses" className="acct-stat-card__link">Manage →</Link>
                </div>
                <div className="acct-stat-card acct-stat-card--cta">
                  <span className="acct-stat-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </span>
                  <span className="acct-stat-card__val acct-stat-card__val--sm">Get a</span>
                  <span className="acct-stat-card__label">Custom Quote</span>
                  <Link href="/contact?type=quote" className="acct-stat-card__link">Request now →</Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="acct-section">
                <h2 className="acct-section__title">Quick Actions</h2>
                <div className="acct-actions-grid">
                  {QUICK_ACTIONS.map(a => (
                    <Link key={a.href} href={a.href} className="acct-action-card">
                      <span className="acct-action-card__icon" aria-hidden="true">{a.icon}</span>
                      <div className="acct-action-card__body">
                        <span className="acct-action-card__label">{a.label}</span>
                        <span className="acct-action-card__desc">{a.desc}</span>
                      </div>
                      <span className="acct-action-card__arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="acct-section">
                <div className="acct-section__header">
                  <h2 className="acct-section__title">Recent Orders</h2>
                  {orders.length > 0 && (
                    <Link href="/account/orders" className="acct-section__viewall">View all →</Link>
                  )}
                </div>
                {orders.length === 0 ? (
                  <div className="acct-empty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--rt-gold)', opacity: 0.5 }}>
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <p>No orders placed yet.</p>
                    <Link href="/shop" className="btn btn--gold btn--sm">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="acct-orders-table-wrap">
                    <table className="orders-table">
                      <thead>
                        <tr><th>Order #</th><th>Date</th><th>Status</th><th></th></tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(o => (
                          <tr key={o.order_number}>
                            <td><Link href={`/account/orders/${o.order_number}`} style={{ color: 'var(--rt-gold)' }}>{o.order_number}</Link></td>
                            <td>{new Date(o.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            <td><span className={`order-status order-status--${o.status}`}>{o.status.replace(/_/g, ' ')}</span></td>
                            <td><Link href={`/account/orders/${o.order_number}`} className="btn btn--outline btn--sm">View</Link></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Help banner */}
              <div className="acct-help-banner">
                <div className="acct-help-banner__icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div className="acct-help-banner__body">
                  <strong>Need help?</strong>
                  <span>Our team is here Monday – Saturday, 9 am – 6 pm IST.</span>
                </div>
                <Link href="/contact" className="btn btn--outline btn--sm acct-help-banner__cta">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
