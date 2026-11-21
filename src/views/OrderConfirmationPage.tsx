'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo, contact } from '../config/site';

interface ConfirmationState {
  orderRef: string;
  isGuest: boolean;
  customerName: string;
  email: string;
  address: string;
  items: { name: string; qty: number; price: number | null; slug: string }[];
  subtotal: number | null;
  shippingCharge: number;
  couponDiscount: number;
  finalTotal: number | null;
  payMethod: string;
}

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI',
  card: 'Credit / Debit Card',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

const SESSION_KEY = 'rt_order_confirmation';

function AnimatedCheck() {
  return (
    <div className="conf-check" aria-hidden="true">
      <svg className="conf-check__svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="conf-check__circle" cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="4.5" />
        <polyline className="conf-check__mark" points="28,52 43,67 72,33" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function OrderConfirmationPage() {
  const router = useRouter();
  const [state, setState] = useState<ConfirmationState | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-checkout');
    return () => document.body.classList.remove('is-checkout');
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        setState(JSON.parse(raw) as ConfirmationState);
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch { /* sessionStorage blocked */ }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!state?.orderRef) {
    router.push('/shop');
    return null;
  }

  const {
    orderRef, isGuest, customerName, email, address,
    items, subtotal, shippingCharge, couponDiscount, finalTotal, payMethod,
  } = state;

  function copyOrderRef() {
    navigator.clipboard.writeText(orderRef).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const firstName = customerName.split(' ')[0];
  const waNum = contact.whatsapp as string;
  const waHref = waNum
    ? `https://wa.me/${waNum.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi Raj Tandoor! I placed an order. Reference: ${orderRef}`)}`
    : '/contact';

  return (
    <>
      <title>{`Order Confirmed | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <div className="co-page">
        <main id="main" tabIndex={-1}>
          <div className="container">
            <div className="conf">

              {/* ── Hero ── */}
              <div className="conf__hero">
                <AnimatedCheck />

                <h1 className="conf__heading">
                  {isGuest ? 'Enquiry Received!' : 'Order Confirmed!'}
                </h1>
                <p className="conf__thanks">
                  Thank you, <strong>{firstName}</strong>!{' '}
                  {isGuest
                    ? 'Our team will reach out shortly with pricing and availability.'
                    : 'Your order is confirmed and in our hands.'}
                </p>

                {/* Order ID badge */}
                <div className="conf__ref-row">
                  <span className="conf__ref-label">Order ID</span>
                  <span className="conf__ref-num">{orderRef}</span>
                  <button
                    type="button"
                    className="conf__copy-btn"
                    onClick={copyOrderRef}
                    title="Copy order ID"
                    aria-label="Copy order ID"
                  >
                    {copied ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <p className="conf__meta">
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  <span className="conf__meta-dot" aria-hidden="true">·</span>
                  {PAY_LABEL[payMethod] ?? payMethod}
                  {finalTotal !== null && (
                    <>
                      <span className="conf__meta-dot" aria-hidden="true">·</span>
                      <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>
                    </>
                  )}
                </p>
              </div>

              {/* ── Two-column body ── */}
              <div className="conf__grid">

                {/* ── Left column ── */}
                <div className="conf__col">

                  {/* Order summary */}
                  <div className="conf__card">
                    <h2 className="conf__card-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      Order Summary
                    </h2>
                    <ul className="conf__items" role="list">
                      {items.map((item, idx) => (
                        <li key={idx} className="conf__item">
                          <div className="conf__item-info">
                            <Link href={`/products/${item.slug}`} className="conf__item-name">{item.name}</Link>
                            <span className="conf__item-qty">× {item.qty}</span>
                          </div>
                          <span className="conf__item-price">
                            {item.price !== null
                              ? `₹${(item.price * item.qty).toLocaleString('en-IN')}`
                              : 'On request'}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="conf__totals">
                      {subtotal !== null && (
                        <div className="conf__total-row">
                          <span>Subtotal</span>
                          <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="conf__total-row">
                        <span>Shipping</span>
                        <span className="conf__free">{shippingCharge === 0 ? 'FREE' : `₹${shippingCharge.toLocaleString('en-IN')}`}</span>
                      </div>
                      {couponDiscount > 0 && (
                        <div className="conf__total-row conf__total-row--discount">
                          <span>Coupon discount</span>
                          <span>−₹{couponDiscount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="conf__total-row conf__total-row--final">
                        <span>Total <span className="conf__gst">(Incl. GST)</span></span>
                        <span>{finalTotal !== null ? `₹${finalTotal.toLocaleString('en-IN')}` : 'On request'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery & order info */}
                  <div className="conf__card">
                    <h2 className="conf__card-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      Delivery Details
                    </h2>
                    <p className="conf__address">{address}</p>
                    <div className="conf__detail-rows">
                      <div className="conf__detail-row">
                        <span>Customer</span>
                        <span>{customerName}</span>
                      </div>
                      <div className="conf__detail-row">
                        <span>Email</span>
                        <span>{email}</span>
                      </div>
                      <div className="conf__detail-row">
                        <span>Payment</span>
                        <span>{PAY_LABEL[payMethod] ?? payMethod}</span>
                      </div>
                      <div className="conf__detail-row">
                        <span>Order status</span>
                        <span className="conf__status-pill">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right column ── */}
                <div className="conf__col">

                  {/* What's next */}
                  <div className="conf__card">
                    <h2 className="conf__card-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      What Happens Next
                    </h2>
                    <ol className="conf__steps" role="list">
                      <li className="conf__step">
                        <div className="conf__step-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                          </svg>
                        </div>
                        <div className="conf__step-body">
                          <strong>Confirmation email</strong>
                          <p>Order details sent to <strong>{email}</strong></p>
                        </div>
                      </li>
                      <li className="conf__step">
                        <div className="conf__step-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                        </div>
                        <div className="conf__step-body">
                          <strong>Team review</strong>
                          <p>Our team will contact you to confirm and arrange payment.</p>
                        </div>
                      </li>
                      <li className="conf__step">
                        <div className="conf__step-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                          </svg>
                        </div>
                        <div className="conf__step-body">
                          <strong>Dispatch &amp; delivery</strong>
                          <p>We dispatch and share live tracking details with you.</p>
                        </div>
                      </li>
                      {payMethod === 'cod' && (
                        <li className="conf__step conf__step--cod">
                          <div className="conf__step-icon conf__step-icon--gold">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
                            </svg>
                          </div>
                          <div className="conf__step-body">
                            <strong>Cash on Delivery</strong>
                            <p>Keep the exact amount ready at the time of delivery.</p>
                          </div>
                        </li>
                      )}
                    </ol>
                  </div>

                  {/* Need help */}
                  <div className="conf__help-card">
                    <div className="conf__help-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                      </svg>
                    </div>
                    <div className="conf__help-body">
                      <strong>Need help?</strong>
                      <p>Have a question about your order? We&apos;re here.</p>
                    </div>
                    {waNum ? (
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn--gold btn--sm">
                        WhatsApp Us
                      </a>
                    ) : (
                      <Link href="/contact" className="btn btn--gold btn--sm">Contact Us</Link>
                    )}
                  </div>

                  {/* Track order widget */}
                  <div className="conf__track-card">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--rt-gold)', flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <div>
                      <p className="conf__track-label">Track your order anytime using</p>
                      <p className="conf__track-ref">{orderRef}</p>
                    </div>
                    <Link href="/track-order" className="btn btn--outline btn--sm">Track →</Link>
                  </div>
                </div>
              </div>

              {/* ── CTA row ── */}
              <div className="conf__ctas">
                {!isGuest && (
                  <Link href="/account/orders" className="btn btn--gold btn--lg">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    View My Orders
                  </Link>
                )}
                <Link href="/track-order" className="btn btn--outline btn--lg">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Track Order
                </Link>
                <Link href="/shop" className="btn btn--outline btn--lg">Continue Shopping</Link>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
