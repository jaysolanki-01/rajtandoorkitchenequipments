import { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
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

export function OrderConfirmationPage() {
  const location = useLocation();
  const state = location.state as ConfirmationState | null;

  useEffect(() => {
    document.body.classList.add('is-checkout');
    return () => document.body.classList.remove('is-checkout');
  }, []);

  if (!state?.orderRef) return <Navigate to="/shop" replace />;

  const {
    orderRef, isGuest, customerName, email, address,
    items, subtotal, shippingCharge, couponDiscount, finalTotal, payMethod,
  } = state;

  const waNum = contact.whatsapp as string;
  const waHref = waNum
    ? `https://wa.me/${waNum.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi Raj Tandoor! I placed an order. Reference: ${orderRef}`)}`
    : '/contact';
  const waIsExternal = !!contact.whatsapp;

  return (
    <>
      <title>{`Order Confirmed | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <div className="co-page">
        <main id="main" tabIndex={-1}>
          <div className="container">
            <div className="co-confirm">

              {/* Success hero */}
              <div className="co-confirm__hero">
                <div className="co-confirm__icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h1 className="co-confirm__heading">
                  {isGuest ? 'Enquiry Received' : 'Order Placed Successfully'}
                </h1>
                <p className="co-confirm__sub">
                  {isGuest
                    ? 'Thank you! The Raj Tandoor team will contact you at your email with pricing and availability details.'
                    : 'Thank you! The Raj Tandoor team will contact you to confirm payment and delivery details.'}
                </p>
              </div>

              <div className="co-confirm__body">

                {/* Order details card */}
                <div className="co-confirm__card">
                  <h2 className="co-confirm__card-title">
                    {isGuest ? 'Enquiry Details' : 'Order Details'}
                  </h2>
                  <dl className="co-confirm__details">
                    <div className="co-confirm__detail">
                      <dt>Reference number</dt>
                      <dd><strong className="co-confirm__ref">{orderRef}</strong></dd>
                    </div>
                    <div className="co-confirm__detail">
                      <dt>Date</dt>
                      <dd>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</dd>
                    </div>
                    <div className="co-confirm__detail">
                      <dt>Customer</dt>
                      <dd>{customerName}</dd>
                    </div>
                    <div className="co-confirm__detail">
                      <dt>Email</dt>
                      <dd>{email}</dd>
                    </div>
                    <div className="co-confirm__detail">
                      <dt>Payment method</dt>
                      <dd>{PAY_LABEL[payMethod] ?? payMethod}</dd>
                    </div>
                    <div className="co-confirm__detail">
                      <dt>Payment status</dt>
                      <dd><span className="co-confirm__status co-confirm__status--pending">Pending confirmation</span></dd>
                    </div>
                    <div className="co-confirm__detail">
                      <dt>Delivery address</dt>
                      <dd>{address}</dd>
                    </div>
                  </dl>
                </div>

                {/* Items card */}
                <div className="co-confirm__card">
                  <h2 className="co-confirm__card-title">Items Ordered</h2>
                  <ul className="co-confirm__items" role="list">
                    {items.map((item, idx) => (
                      <li key={idx} className="co-confirm__item">
                        <div className="co-confirm__item-info">
                          <Link to={`/products/${item.slug}`} className="co-confirm__item-name">
                            {item.name}
                          </Link>
                          <span className="co-confirm__item-qty">Qty: {item.qty}</span>
                        </div>
                        <span className="co-confirm__item-price">
                          {item.price !== null
                            ? `₹${(item.price * item.qty).toLocaleString('en-IN')}`
                            : 'On request'}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="co-confirm__totals">
                    {subtotal !== null && (
                      <div className="co-confirm__total-row">
                        <dt>Subtotal</dt>
                        <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
                      </div>
                    )}
                    <div className="co-confirm__total-row">
                      <dt>Shipping</dt>
                      <dd>{shippingCharge === 0 ? 'FREE' : `₹${shippingCharge.toLocaleString('en-IN')}`}</dd>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="co-confirm__total-row co-confirm__total-row--discount">
                        <dt>Coupon discount</dt>
                        <dd>−₹{couponDiscount.toLocaleString('en-IN')}</dd>
                      </div>
                    )}
                    <div className="co-confirm__total-row co-confirm__total-row--final">
                      <dt>Total <span className="co-summary__gst-note">(Incl. GST)</span></dt>
                      <dd>{finalTotal !== null ? `₹${finalTotal.toLocaleString('en-IN')}` : 'On request'}</dd>
                    </div>
                  </dl>
                </div>

                {/* What's next card */}
                <div className="co-confirm__card co-confirm__card--next">
                  <h2 className="co-confirm__card-title">What Happens Next</h2>
                  <ol className="co-confirm__next-steps" role="list">
                    <li>
                      <span className="co-confirm__next-num" aria-hidden="true">1</span>
                      <div>
                        <strong>Confirmation email</strong>
                        <p>We'll send confirmation details to <strong>{email}</strong></p>
                      </div>
                    </li>
                    <li>
                      <span className="co-confirm__next-num" aria-hidden="true">2</span>
                      <div>
                        <strong>Team review &amp; payment</strong>
                        <p>Our team will contact you to confirm your order and arrange secure payment.</p>
                      </div>
                    </li>
                    <li>
                      <span className="co-confirm__next-num" aria-hidden="true">3</span>
                      <div>
                        <strong>Dispatch &amp; delivery</strong>
                        <p>Once payment is confirmed, we'll dispatch your order and share tracking details.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* CTA row */}
              <div className="co-confirm__ctas">
                {!isGuest && (
                  <Link to="/account/orders" className="btn btn--gold btn--lg">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    View My Orders
                  </Link>
                )}
                <Link to="/track-order" className="btn btn--outline btn--lg">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Track Order
                </Link>
                <Link to="/shop" className="btn btn--outline btn--lg">
                  Continue Shopping
                </Link>
                {waIsExternal ? (
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg co-confirm__wa-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    WhatsApp Support
                  </a>
                ) : (
                  <Link to="/contact" className="btn btn--outline btn--lg">
                    Contact Support
                  </Link>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
