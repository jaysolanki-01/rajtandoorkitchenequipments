'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">
              <div className="acct-subhdr">
                <Link href="/account" className="acct-subhdr__back">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                  Overview
                </Link>
                <h1 className="acct-subhdr__title">My Orders</h1>
              </div>

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
                    <p style={{ fontSize: '0.82rem', color: 'var(--rt-text2)', marginBottom: '1rem' }}>
                      {orders.length} order{orders.length !== 1 ? 's' : ''} total
                    </p>
                    <div className="acct-orders-table-wrap">
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Method</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(o => (
                            <tr key={o.order_number}>
                              <td>
                                <Link href={`/account/orders/${o.order_number}`} style={{ color: 'var(--rt-gold)', fontWeight: 600 }}>
                                  {o.order_number}
                                </Link>
                              </td>
                              <td>{new Date(o.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                              <td><span className={`order-status order-status--${o.status}`}>{o.status.replace(/_/g, ' ')}</span></td>
                              <td style={{ color: 'var(--rt-text2)', fontSize: '0.85rem' }}>{o.payment_method}</td>
                              <td>
                                <Link href={`/account/orders/${o.order_number}`} className="btn btn--outline btn--sm">View</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
