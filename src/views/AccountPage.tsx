'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { useWishlist } from '../store/WishlistContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrders, type UserOrder } from '../lib/supabase/db';

export function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const [orders, setOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    fetchUserOrders(user.id).then(setOrders).catch(() => {});
  }, [isLoggedIn, user]);

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading your account…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  const initial = user?.name?.[0]?.toUpperCase() ?? '?';

  return (
    <>
      <title>{`My Account | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="account-layout">
            <AccountNav />
            <div className="account-content">

              {/* Profile header */}
              <div className="acct-profile-header">
                <div className="acct-avatar" aria-hidden="true">{initial}</div>
                <div className="acct-profile-info">
                  <h1 className="acct-profile-name">{user?.name}</h1>
                  <p className="acct-profile-email">{user?.email}</p>
                  {user?.phone && <p className="acct-profile-phone">{user.phone}</p>}
                </div>
                <div className="acct-profile-actions">
                  <Link href="/account/profile" className="btn btn--outline btn--sm">Edit Profile</Link>
                  <button
                    type="button"
                    className="btn btn--sm"
                    style={{ background: 'transparent', border: '1px solid var(--rt-border)', color: 'var(--rt-text2)' }}
                    onClick={async () => { await logout(); router.push('/'); }}
                  >
                    Sign out
                  </button>
                </div>
              </div>

              {/* Quick stats */}
              <div className="acct-stats">
                <div className="acct-stat">
                  <span className="acct-stat__val">{orders.length}</span>
                  <span className="acct-stat__label">Orders</span>
                </div>
                <div className="acct-stat">
                  <span className="acct-stat__val">{wishlistCount}</span>
                  <span className="acct-stat__label">Wishlist</span>
                </div>
              </div>

              {/* Navigation cards */}
              <div className="account-grid" style={{ marginTop: '1.5rem' }}>
                <Link href="/account/orders" className="account-card">
                  <span className="account-card__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </span>
                  <h2>My Orders</h2>
                  <p>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
                </Link>
                <Link href="/wishlist" className="account-card">
                  <span className="account-card__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </span>
                  <h2>Wishlist</h2>
                  <p>{wishlistCount} saved product{wishlistCount !== 1 ? 's' : ''}</p>
                </Link>
                <Link href="/account/addresses" className="account-card">
                  <span className="account-card__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <h2>Addresses</h2>
                  <p>Manage delivery addresses</p>
                </Link>
                <Link href="/account/profile" className="account-card">
                  <span className="account-card__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <h2>Profile</h2>
                  <p>Edit your name, phone &amp; password</p>
                </Link>
                <Link href="/contact?type=quote" className="account-card">
                  <span className="account-card__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </span>
                  <h2>Request a Quote</h2>
                  <p>Get pricing for bulk orders</p>
                </Link>
                <Link href="/shop" className="account-card">
                  <span className="account-card__icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </span>
                  <h2>Browse Products</h2>
                  <p>Explore our full catalogue</p>
                </Link>
              </div>

              {/* Recent orders */}
              {orders.length > 0 && (
                <div style={{ marginTop: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Recent Orders</h2>
                    <Link href="/account/orders" style={{ fontSize: '0.85rem', color: 'var(--rt-gold)' }}>View all →</Link>
                  </div>
                  <table className="orders-table">
                    <thead>
                      <tr><th>Order</th><th>Date</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.order_number}>
                          <td><Link href={`/account/orders/${o.order_number}`}>{o.order_number}</Link></td>
                          <td>{new Date(o.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                          <td><span className={`order-status order-status--${o.status}`}>{o.status.replace(/_/g, ' ')}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
