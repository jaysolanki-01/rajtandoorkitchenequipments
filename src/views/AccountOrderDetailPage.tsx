'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrder, requestOrderCancellation, type UserOrder, type OrderItem } from '../lib/supabase/db';

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI',
  card: 'Credit / Debit Card',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

function itemQty(item: OrderItem): number { return item.qty ?? item.quantity ?? 1; }

function resolveImg(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  // relative path — make absolute using window.location.origin
  if (typeof window !== 'undefined') return `${window.location.origin}${src.startsWith('/') ? '' : '/'}${src}`;
  return src;
}

function ProductPlaceholder() {
  return (
    <div className="od-item__img-ph" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    </div>
  );
}

export function AccountOrderDetailPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [order, setOrder] = useState<UserOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !orderNumber || !user) return;
    fetchUserOrder(user.id, orderNumber)
      .then(data => { if (data) setOrder(data); else setError('Order not found.'); })
      .catch(() => setError('Could not load order. Please try again.'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, orderNumber, user]);

  async function handleCancel() {
    if (!order || cancelling) return;
    if (!window.confirm(`Cancel order ${order.order_number}? This cannot be undone.`)) return;
    setCancelling(true);
    setCancelError('');
    try {
      await requestOrderCancellation(order.order_number);
      setOrder(o => o ? { ...o, status: 'cancelled' } : o);
      setCancelled(true);
    } catch (err: unknown) {
      setCancelError(err instanceof Error ? err.message : 'Could not cancel order.');
    } finally {
      setCancelling(false);
    }
  }

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  const currentStatus = order?.status ?? '';
  const canCancel = ['pending', 'confirmed'].includes(currentStatus) && !cancelled;

  return (
    <>
      <title>{`Order ${orderNumber} | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">

          {/* Page header — full width, above the sidebar+content grid */}
          <div className="acct-page-hdr">
            <Link href="/account/orders" className="acct-page-hdr__back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              My Orders
            </Link>
            <h1 className="acct-page-hdr__title">Order {orderNumber}</h1>
          </div>

          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">

              {loading ? (
                <div className="acct-section"><p style={{ color: 'var(--rt-text2)' }}>Loading order…</p></div>
              ) : error ? (
                <div className="acct-section">
                  <div className="form-status form-status--error" role="alert">{error}</div>
                  <Link href="/account/orders" className="btn btn--outline btn--sm" style={{ marginTop: '1rem', display: 'inline-flex' }}>← Back to orders</Link>
                </div>
              ) : order && (
                <>
                  {/* ── Summary card ── */}
                  <div className="od-summary-card">
                    <div className="od-summary-card__row">
                      <div>
                        <p className="od-summary-card__label">Order ID</p>
                        <p className="od-summary-card__val od-summary-card__val--mono">{order.order_number}</p>
                      </div>
                      <div>
                        <p className="od-summary-card__label">Date Placed</p>
                        <p className="od-summary-card__val">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="od-summary-card__label">Payment</p>
                        <p className="od-summary-card__val">{PAY_LABEL[order.payment_method] ?? order.payment_method}</p>
                      </div>
                      <div>
                        <p className="od-summary-card__label">Status</p>
                        <span className={`order-status order-status--${currentStatus}`}>
                          {currentStatus.replace(/_/g, ' ')}
                        </span>
                      </div>
                      {order.total != null && order.total > 0 && (
                        <div>
                          <p className="od-summary-card__label">Total</p>
                          <p className="od-summary-card__val od-summary-card__val--total">₹{order.total.toLocaleString('en-IN')}</p>
                        </div>
                      )}
                    </div>
                    {order.notes && (
                      <div className="od-notes">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span>{order.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* ── Items card ── */}
                  <div className="acct-section">
                    <h2 className="acct-section__title" style={{ marginBottom: '1rem' }}>Items Ordered</h2>
                    {(order.items ?? []).length === 0 ? (
                      <p style={{ color: 'var(--rt-text2)', fontSize: '0.875rem' }}>No items on this order.</p>
                    ) : (
                      <ul className="od-items" role="list">
                        {(order.items ?? []).map((item, idx) => {
                          const name = item.name ?? 'Product';
                          const slug = item.slug ?? null;
                          const qty = itemQty(item);
                          const lineTotal = item.price != null ? item.price * qty : null;
                          const imgSrc = resolveImg(item.image);

                          const ImgNode = imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={name}
                              className="od-item__img"
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.parentElement as HTMLElement).classList.add('od-item__img-ph--err'); }}
                            />
                          ) : null;

                          return (
                            <li key={idx} className="od-item">
                              {/* Image / placeholder */}
                              {slug ? (
                                <Link href={`/products/${slug}`} className="od-item__img-link" tabIndex={-1} aria-hidden="true">
                                  {ImgNode ?? <ProductPlaceholder />}
                                </Link>
                              ) : imgSrc ? (
                                <div className="od-item__img-wrap">{ImgNode}</div>
                              ) : (
                                <ProductPlaceholder />
                              )}

                              {/* Name + qty */}
                              <div className="od-item__info">
                                {slug ? (
                                  <Link href={`/products/${slug}`} className="od-item__name">{name}</Link>
                                ) : (
                                  <span className="od-item__name">{name}</span>
                                )}
                                <span className="od-item__qty">Qty: {qty}</span>
                              </div>

                              {/* Price */}
                              <div className="od-item__price-col">
                                {item.price != null && (
                                  <span className="od-item__unit-price">₹{item.price.toLocaleString('en-IN')} × {qty}</span>
                                )}
                                <span className="od-item__total">
                                  {lineTotal != null ? `₹${lineTotal.toLocaleString('en-IN')}` : 'On request'}
                                </span>
                              </div>

                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* Price breakdown */}
                    {order.total != null && order.total > 0 && (() => {
                      const itemsTotal = (order.items ?? []).reduce((s, it) => s + (it.price ?? 0) * (it.qty ?? it.quantity ?? 1), 0);
                      const subtotal = order.subtotal > 0 ? order.subtotal : itemsTotal;
                      const shipping = order.shipping ?? 0;
                      const discount = order.coupon_discount ?? 0;
                      return (
                        <div className="od-price-breakdown">
                          {subtotal > 0 && (
                            <div className="od-price-row">
                              <span>Subtotal</span>
                              <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <div className="od-price-row">
                            <span>Shipping</span>
                            <span style={{ color: shipping === 0 ? 'var(--rt-success)' : undefined }}>
                              {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                            </span>
                          </div>
                          {discount > 0 && (
                            <div className="od-price-row od-price-row--discount">
                              <span>
                                Coupon discount
                                {order.coupon_code && (
                                  <span className="od-coupon-tag">{order.coupon_code}</span>
                                )}
                              </span>
                              <span>−₹{discount.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <div className="od-price-row od-price-row--total">
                            <span>
                              Order Total
                              <span className="od-price-row__gst">Incl. GST</span>
                            </span>
                            <strong>₹{order.total.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* ── Cancel order ── */}
                  {(canCancel || currentStatus === 'cancelled') && (
                    <div className="od-cancel-section">
                      {currentStatus === 'cancelled' ? (
                        <div className="od-cancel-notice od-cancel-notice--done">
                          <div className="od-cancel-notice__icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                          </div>
                          <div>
                            <strong>Order Cancelled</strong>
                            <p>This order has been cancelled. A confirmation email has been sent to your email address.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="od-cancel-wrap">
                          <div className="od-cancel-info">
                            <strong>Need to cancel?</strong>
                            <p>You can cancel this order while it is pending or confirmed. Once it is shipped, cancellation is not possible. A cancellation confirmation will be sent to your email.</p>
                          </div>
                          {cancelError && (
                            <div className="form-status form-status--error od-cancel-err" role="alert">{cancelError}</div>
                          )}
                          <button
                            type="button"
                            className="btn od-cancel-btn"
                            onClick={handleCancel}
                            disabled={cancelling}
                          >
                            {cancelling ? (
                              <>
                                <span className="od-cancel-btn__spinner" aria-hidden="true" />
                                Cancelling…
                              </>
                            ) : 'Cancel Order'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Help banner ── */}
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
