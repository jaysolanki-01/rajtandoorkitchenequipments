'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrder, type UserOrder } from '../lib/supabase/db';

export function AccountOrderDetailPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [order, setOrder] = useState<UserOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn || !orderNumber || !user) return;
    fetchUserOrder(user.id, orderNumber)
      .then(data => { if (data) setOrder(data); else setError('Order not found.'); })
      .catch(() => setError('Could not load order. Please try again.'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, orderNumber, user]);

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
      <title>{`Order ${orderNumber} | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">
              <div className="acct-subhdr">
                <Link href="/account/orders" className="acct-subhdr__back">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                  My Orders
                </Link>
                <h1 className="acct-subhdr__title">Order {orderNumber}</h1>
              </div>

              {loading ? (
                <div className="acct-section">
                  <p style={{ color: 'var(--rt-text2)' }}>Loading order…</p>
                </div>
              ) : error ? (
                <div className="acct-section">
                  <div className="form-status form-status--error" role="alert">{error}</div>
                  <Link href="/account/orders" className="btn btn--outline btn--sm" style={{ marginTop: '1rem', display: 'inline-flex' }}>← Back to orders</Link>
                </div>
              ) : order && (
                <>
                  {/* Order meta */}
                  <div className="acct-section">
                    <div className="acct-section__header">
                      <h2 className="acct-section__title">Order Summary</h2>
                      <span className={`order-status order-status--${order.status}`}>{order.status.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="acct-order-meta">
                      <div className="acct-order-meta__item">
                        <span className="acct-order-meta__key">Order number</span>
                        <span className="acct-order-meta__val">{order.order_number}</span>
                      </div>
                      <div className="acct-order-meta__item">
                        <span className="acct-order-meta__key">Date placed</span>
                        <span className="acct-order-meta__val">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="acct-order-meta__item">
                        <span className="acct-order-meta__key">Payment method</span>
                        <span className="acct-order-meta__val" style={{ textTransform: 'capitalize' }}>{order.payment_method}</span>
                      </div>
                      <div className="acct-order-meta__item">
                        <span className="acct-order-meta__key">Status</span>
                        <span className="acct-order-meta__val" style={{ textTransform: 'capitalize' }}>{order.status.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                    {order.notes && (
                      <div style={{ marginTop: '1rem', padding: '0.9rem 1rem', background: 'var(--rt-bg2)', borderRadius: 8, fontSize: '0.875rem' }}>
                        <strong style={{ display: 'block', marginBottom: '0.3rem' }}>Order notes</strong>
                        <span style={{ color: 'var(--rt-text2)' }}>{order.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Order items */}
                  <div className="acct-section">
                    <h2 className="acct-section__title" style={{ marginBottom: '1rem' }}>Items Ordered</h2>
                    {(order.items ?? []).length === 0 ? (
                      <p style={{ color: 'var(--rt-text2)', fontSize: '0.875rem' }}>No items on this order.</p>
                    ) : (
                      <div className="acct-orders-table-wrap">
                        <table className="orders-table">
                          <thead>
                            <tr><th>Product</th><th>Quantity</th></tr>
                          </thead>
                          <tbody>
                            {(order.items ?? []).map((item, idx) => {
                              const name = item.product?.name ?? item.name ?? 'Product';
                              const slug = item.product?.slug ?? item.slug ?? null;
                              return (
                                <tr key={idx}>
                                  <td>
                                    {slug
                                      ? <Link href={`/products/${slug}`} style={{ color: 'var(--rt-gold)', fontWeight: 600 }}>{name}</Link>
                                      : <span style={{ fontWeight: 600 }}>{name}</span>
                                    }
                                  </td>
                                  <td>{item.quantity}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Help */}
                  <div className="acct-help-banner">
                    <div className="acct-help-banner__icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div className="acct-help-banner__body">
                      <strong>Issue with this order?</strong>
                      <span>Contact our team and we'll help resolve it quickly.</span>
                    </div>
                    <Link href="/contact" className="btn btn--outline btn--sm acct-help-banner__cta">Get Help</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
