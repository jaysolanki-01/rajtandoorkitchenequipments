'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';

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
  createdAt?: string;
}

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

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export function OrderConfirmationPage({ orderNumber }: { orderNumber?: string }) {
  const router = useRouter();
  const [state, setState] = useState<ConfirmationState | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-checkout');
    return () => document.body.classList.remove('is-checkout');
  }, []);

  useEffect(() => {
    if (orderNumber) {
      // Fetch real order data from DB (logged-in user path)
      fetch(`/api/orders/by-number/${encodeURIComponent(orderNumber)}`)
        .then(async r => {
          if (!r.ok) {
            if (r.status === 401) router.push('/');
            else router.push('/shop');
            return null;
          }
          return r.json() as Promise<{ order: Record<string, unknown> }>;
        })
        .then(data => {
          if (!data) return;
          const o = data.order;
          const addr = (o.address ?? {}) as Record<string, string>;
          const addressStr = [addr.address, addr.city, addr.state, addr.pinCode].filter(Boolean).join(', ');
          const rawItems = (o.items ?? []) as Array<{ name?: string; qty?: number; quantity?: number; price?: number | null; slug?: string | null }>;
          setState({
            orderRef: o.order_number as string,
            isGuest: false,
            customerName: o.customer_name as string,
            email: o.email as string,
            address: addressStr,
            items: rawItems.map(item => ({
              name: item.name ?? '',
              qty: item.qty ?? item.quantity ?? 1,
              price: item.price ?? null,
              slug: item.slug ?? '',
            })),
            subtotal: o.subtotal as number | null,
            shippingCharge: (o.shipping as number) ?? 0,
            couponDiscount: (o.coupon_discount as number) ?? 0,
            finalTotal: o.total as number | null,
            payMethod: o.payment_method as string,
            createdAt: o.created_at as string,
          });
          setReady(true);
        })
        .catch(() => { router.push('/shop'); });
    } else {
      // sessionStorage fallback (guest checkout or old static route)
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) {
          setState(JSON.parse(raw) as ConfirmationState);
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch { /* sessionStorage blocked */ }
      setReady(true);
    }
  }, [orderNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) return null;

  if (!state?.orderRef) {
    router.push('/shop');
    return null;
  }

  const { orderRef, isGuest, customerName } = state;

  function copyOrderRef() {
    navigator.clipboard.writeText(orderRef).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const firstName = customerName.split(' ')[0];

  return (
    <>
      <title>{`Order Confirmed | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <div className="co-page">
        <main id="main" tabIndex={-1}>
          <div className="conf__hero conf__hero--full">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className={`conf__spark conf__spark--${i + 1}`} aria-hidden="true" />
            ))}

            <div className="conf__hero-inner">
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

              <div className="conf__ref-row">
                <span className="conf__ref-label">Order ID</span>
                <span className="conf__ref-num">{orderRef}</span>
                <button
                  type="button"
                  className="conf__copy-btn"
                  onClick={copyOrderRef}
                  aria-label="Copy order ID"
                >
                  {copied ? (
                    <><IconCheck /> Copied!</>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="conf__simple-ctas">
                {!isGuest && (
                  <Link href="/account/orders" className="btn btn--gold btn--lg">
                    View My Orders
                  </Link>
                )}
                <Link href="/shop" className="btn btn--outline-light btn--lg">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
