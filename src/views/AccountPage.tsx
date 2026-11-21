'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { useWishlist } from '../store/WishlistContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrders, type UserOrder } from '../lib/supabase/db';

function pad(n: number) { return String(n).padStart(2, '0'); }

const STATUS_COLOR: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  processing: '#8b5cf6',
  shipped: '#06b6d4',
  delivered: '#22c55e',
  cancelled: '#ef4444',
};

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

  const initial = (user?.name?.[0] ?? '?').toUpperCase();
  const initials = user?.name
    ? user.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
    : '?';

  return (
    <>
      <title>{`My Account | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main acct-page">
        <div className="container">

          {/* ── Profile Card — full width above the sidebar grid ── */}
          <div className="acct-profile-card">
                <div className="acct-profile-card__left">
                  <div className="acct-profile-avatar-wrap">
                    <div className="acct-profile-avatar" aria-hidden="true">{initials}</div>
                    <Link href="/account/profile" className="acct-profile-edit" aria-label="Edit profile">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </Link>
                  </div>

                  <div className="acct-profile-info">
                    <h1 className="acct-profile-name">
                      {user?.name}
                      <span className="acct-verified" title="Verified account">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                        </svg>
                      </span>
                    </h1>
                    <div className="acct-profile-meta">
                      <span className="acct-profile-meta__item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        {user?.email}
                      </span>
                      {user?.phone && (
                        <span className="acct-profile-meta__item">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          {user.phone}
                        </span>
                      )}
                    </div>
                    <Link href="/account/profile" className="btn btn--outline btn--sm acct-profile-edit-btn">
                      Edit Profile →
                    </Link>
                  </div>
                </div>

                <div className="acct-profile-card__stats">
                  <Link href="/account/orders" className="acct-pstat">
                    <div className="acct-pstat__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <div className="acct-pstat__val">{pad(orders.length)}</div>
                    <div className="acct-pstat__label">Total Orders</div>
                  </Link>
                  <Link href="/wishlist" className="acct-pstat">
                    <div className="acct-pstat__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                    <div className="acct-pstat__val">{pad(wishlistCount)}</div>
                    <div className="acct-pstat__label">Wishlist Items</div>
                  </Link>
                  <Link href="/account/addresses" className="acct-pstat">
                    <div className="acct-pstat__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="acct-pstat__val acct-pstat__val--link">Manage</div>
                    <div className="acct-pstat__label">Saved Addresses</div>
                  </Link>
                </div>
          </div>

          {/* ── Sidebar + Content ── */}
          <div className="acct-layout">
            <AccountNav />

            <div className="acct-main">

              {/* ── Recent Orders ── */}
              <div className="acct-section">
                <div className="acct-section__header">
                  <h2 className="acct-section__title">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '0.4rem' }}>
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Recent Orders
                  </h2>
                  {orders.length > 0 && (
                    <Link href="/account/orders" className="acct-section__viewall">View All Orders →</Link>
                  )}
                </div>

                {orders.length === 0 ? (
                  <div className="acct-empty">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--rt-gold)', opacity: 0.5 }}>
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <p>No orders placed yet.</p>
                    <Link href="/shop" className="btn btn--gold btn--sm">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="acct-order-rows">
                    {orders.slice(0, 3).map(o => {
                      const items = o.items ?? [];
                      return (
                        <div key={o.order_number} className="acct-order-row">
                          {/* Product image(s) — clickable to product page */}
                          <div className="acct-order-row__imgs">
                            {items.length > 0 ? items.slice(0, 3).map((it, i) => (
                              it.slug ? (
                                <Link
                                  key={i}
                                  href={`/products/${it.slug}`}
                                  className="acct-order-row__img-wrap"
                                  style={{ zIndex: items.length - i }}
                                  title={it.name ?? ''}
                                >
                                  {it.image ? (
                                    <Image src={it.image} alt={it.name ?? ''} fill sizes="52px" style={{ objectFit: 'cover' }} />
                                  ) : (
                                    <span className="acct-order-row__img-fallback" aria-hidden="true">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                    </span>
                                  )}
                                </Link>
                              ) : (
                                <div key={i} className="acct-order-row__img-wrap" style={{ zIndex: items.length - i }}>
                                  {it.image ? (
                                    <Image src={it.image} alt={it.name ?? ''} fill sizes="52px" style={{ objectFit: 'cover' }} />
                                  ) : (
                                    <span className="acct-order-row__img-fallback" aria-hidden="true">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                    </span>
                                  )}
                                </div>
                              )
                            )) : (
                              <div className="acct-order-row__img-wrap">
                                <span className="acct-order-row__img-fallback" aria-hidden="true">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="acct-order-row__info">
                            <div className="acct-order-row__num">#{o.order_number}</div>
                            <div className="acct-order-row__date">
                              {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                          <span
                            className="acct-order-row__status"
                            style={{ background: `${STATUS_COLOR[o.status] ?? '#888'}18`, color: STATUS_COLOR[o.status] ?? '#888', borderColor: `${STATUS_COLOR[o.status] ?? '#888'}40` }}
                          >
                            {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                          </span>
                          {o.total != null && (
                            <div className="acct-order-row__price">₹{o.total.toLocaleString('en-IN')}</div>
                          )}
                          <Link href={`/account/orders/${o.order_number}`} className="btn btn--outline btn--sm acct-order-row__track">
                            Track Order →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── Business Info Banner ── */}
              <div className="acct-biz-banner">
                <div className="acct-biz-banner__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div className="acct-biz-banner__body">
                  <p className="acct-biz-banner__title">Your Business Information</p>
                  <p className="acct-biz-banner__desc">Help us serve you better with your business details for B2B pricing and bulk orders.</p>
                  <Link href="/contact?type=quote" className="btn btn--outline btn--sm" style={{ marginTop: '0.75rem', display: 'inline-flex' }}>
                    Add Business Details →
                  </Link>
                </div>
                <div className="acct-biz-banner__secure">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--rt-gold)', flexShrink: 0 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Trusted &amp; Secure<br /><span style={{ opacity: 0.6 }}>Your data is safe with us</span></span>
                </div>
              </div>

              {/* ── Policy links ── */}
              <div className="acct-policy-links">
                <p className="acct-policy-links__title">Policies & Information</p>
                <div className="acct-policy-links__grid">
                  {[
                    { href: '/privacy-policy', label: 'Privacy Policy' },
                    { href: '/terms', label: 'Terms & Conditions' },
                    { href: '/shipping-policy', label: 'Shipping Policy' },
                    { href: '/return-policy', label: 'Return Policy' },
                    { href: '/track-order', label: 'Track an Order' },
                    { href: '/faq', label: 'FAQ' },
                  ].map(p => (
                    <Link key={p.href} href={p.href} className="acct-policy-link">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}
