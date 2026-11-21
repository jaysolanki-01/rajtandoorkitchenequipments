'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrders, type UserOrder } from '../lib/supabase/db';

export function AccountOrdersPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    fetchUserOrders(user.id).then(setOrders).catch(() => {}).finally(() => setLoading(false));
  }, [isLoggedIn, user]);

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  return (
    <>
      <title>{`My Orders | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">

          <div className="acct-page-hdr">
            <Link href="/account" className="acct-page-hdr__back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              Overview
            </Link>
            <h1 className="acct-page-hdr__title">My Orders</h1>
          </div>

          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">

              <div className="acct-section">
                {loading ? (
                  <p style={{ color: 'var(--rt-text2)', padding: '1rem 0' }}>Loading orders…</p>
                ) : orders.length === 0 ? (
                  <div className="acct-empty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--rt-gold)', opacity: 0.5 }}>
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <p>No orders placed yet.</p>
                    <Link href="/shop" className="btn btn--gold btn--sm">Browse Products</Link>
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: '0.82rem', color: 'var(--rt-text2)', marginBottom: '1.25rem' }}>
                      {orders.length} order{orders.length !== 1 ? 's' : ''} total
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {orders.map(o => {
                        const imgs = (o.items ?? [])
                          .slice(0, 4)
                          .map(it => it.image)
                          .filter(Boolean) as string[];
                        const names = (o.items ?? []).map(it => it.name).filter(Boolean).join(', ');
                        return (
                          <Link
                            key={o.order_number}
                            href={`/account/orders/${o.order_number}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="order-row-card">
                              {/* Product image stack */}
                              <div className="order-row-imgs">
                                {imgs.length > 0 ? imgs.map((src, i) => (
                                  <div key={i} className="order-row-img-wrap" style={{ zIndex: imgs.length - i }}>
                                    <Image src={src} alt="" fill sizes="52px" style={{ objectFit: 'cover' }} />
                                  </div>
                                )) : (
                                  <div className="order-row-img-wrap order-row-img-placeholder">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" style={{ color: 'var(--rt-gold)', opacity: 0.5 }}>
                                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                                    </svg>
                                  </div>
                                )}
                              </div>

                              {/* Order info */}
                              <div className="order-row-info">
                                <div className="order-row-top">
                                  <span className="order-row-num">#{o.order_number}</span>
                                  <span className={`order-status order-status--${o.status}`}>{o.status.replace(/_/g, ' ')}</span>
                                </div>
                                {names && <p className="order-row-names">{names}</p>}
                                <div className="order-row-meta">
                                  <span>{new Date(o.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                  <span className="order-row-dot">·</span>
                                  <span style={{ textTransform: 'uppercase', fontSize: '0.78rem' }}>{o.payment_method}</span>
                                  <span className="order-row-dot">·</span>
                                  <span style={{ fontWeight: 600, color: 'var(--rt-fg)' }}>₹{(o.total ?? 0).toLocaleString('en-IN')}</span>
                                </div>
                              </div>

                              {/* Arrow */}
                              <div className="order-row-arrow" aria-hidden="true">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className="acct-help-banner">
                <div className="acct-help-banner__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div className="acct-help-banner__body">
                  <strong>Question about an order?</strong>
                  <span>Contact our team and we'll help you track or manage any order.</span>
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
