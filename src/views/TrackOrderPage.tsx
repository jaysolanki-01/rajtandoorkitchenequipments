'use client';
import { useState } from 'react';
import Link from 'next/link';
import { seo } from '../config/site';
import { fetchOrderStatus, type OrderTrackStatus } from '../lib/supabase/db';

const STATUS_INFO: Record<string, { label: string; desc: string; step: number }> = {
  pending:    { label: 'Order Received',     desc: 'Your order has been received and is awaiting confirmation.', step: 1 },
  confirmed:  { label: 'Order Confirmed',    desc: 'Your order is confirmed and being prepared.',               step: 2 },
  processing: { label: 'Processing',         desc: 'Your order is being processed and prepared for dispatch.',  step: 3 },
  shipped:    { label: 'Shipped',            desc: 'Your order is on its way.',                                 step: 4 },
  delivered:  { label: 'Delivered',          desc: 'Your order has been delivered.',                            step: 5 },
  cancelled:  { label: 'Cancelled',          desc: 'This order has been cancelled.',                            step: 0 },
};

const STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<OrderTrackStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const data = await fetchOrderStatus(orderNumber.trim(), email.trim());
      if (data) setResult(data);
      else setError('No order found with that number. Please double-check and try again.');
    } catch {
      setError('Could not look up the order. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  }

  const statusInfo = result ? (STATUS_INFO[result.status] ?? { label: result.status, desc: '', step: 0 }) : null;
  const currentStep = statusInfo?.step ?? 0;

  return (
    <>
      <title>{`Track Your Order | ${seo.title}`}</title>
      <meta name="description" content="Track your Raj Tandoor order status by entering your order number." />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container" style={{ maxWidth: 680, paddingTop: '3rem', paddingBottom: '5rem' }}>

          {/* Page header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rt-gold)', margin: '0 0 0.5rem' }}>Order Management</p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 800, margin: '0 0 0.75rem', color: 'var(--rt-charcoal)' }}>Track Your Order</h1>
            <p style={{ color: 'var(--rt-text2)', margin: 0, lineHeight: 1.7 }}>
              Enter your order number to check its current status. Order numbers look like <strong style={{ color: 'var(--rt-charcoal)' }}>ORD-XXXXXXXXXX-AB</strong>.
            </p>
          </div>

          {/* Search form */}
          <div style={{ background: 'var(--rt-bg)', border: '1px solid var(--rt-border)', borderRadius: 14, padding: '1.75rem 2rem', marginBottom: '2rem' }}>
            <form onSubmit={handleTrack} noValidate>
              <div className="form-row" style={{ marginBottom: '0.5rem' }}>
                <div className="form-field">
                  <label htmlFor="track-order" className="form-label">Order Number *</label>
                  <input
                    id="track-order" type="text" className="form-input" required
                    value={orderNumber} onChange={e => setOrderNumber(e.target.value)}
                    placeholder="e.g. RT-1234567890-AB" autoComplete="off"
                    style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="track-email" className="form-label">
                    Email Address <span style={{ fontWeight: 400, color: 'var(--rt-text2)', fontSize: '0.8rem' }}>(optional)</span>
                  </label>
                  <input
                    id="track-email" type="email" className="form-input"
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Helps verify ownership" autoComplete="email"
                  />
                </div>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <button type="submit" className="btn btn--gold" disabled={loading || !orderNumber.trim()} style={{ minWidth: 160 }}>
                  {loading ? 'Searching…' : 'Track Order'}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="form-status form-status--error" role="alert" style={{ marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          {/* Results */}
          {result && statusInfo && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Status card */}
              <div style={{ background: 'var(--rt-charcoal)', borderRadius: 14, padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.3rem' }}>Current Status</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem' }}>{statusInfo.label}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{statusInfo.desc}</p>
                </div>
                <span className={`order-status order-status--${result.status}`} style={{ fontSize: '0.8rem', padding: '0.3em 0.9em' }}>
                  {result.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Progress tracker — hidden for cancelled */}
              {result.status !== 'cancelled' && (
                <div style={{ background: 'var(--rt-bg)', border: '1px solid var(--rt-border)', borderRadius: 14, padding: '1.5rem 2rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', margin: '0 0 1.25rem' }}>Order Progress</p>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                    {STEPS.map((step, idx) => {
                      const info = STATUS_INFO[step];
                      const done = currentStep > idx + 1;
                      const active = currentStep === idx + 1;
                      return (
                        <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                          {/* connector line */}
                          {idx < STEPS.length - 1 && (
                            <div style={{
                              position: 'absolute', top: 14, left: '50%', width: '100%', height: 2,
                              background: done ? 'var(--rt-gold)' : 'var(--rt-border)',
                              zIndex: 0,
                            }} />
                          )}
                          {/* circle */}
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%', zIndex: 1,
                            background: done || active ? 'var(--rt-gold)' : 'var(--rt-bg2)',
                            border: `2px solid ${done || active ? 'var(--rt-gold)' : 'var(--rt-border)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: done || active ? '#fff' : 'var(--rt-text2)',
                            fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                          }}>
                            {done ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : idx + 1}
                          </div>
                          <p style={{
                            fontSize: '0.68rem', textAlign: 'center', margin: '0.4rem 0 0',
                            fontWeight: active ? 700 : 400,
                            color: active ? 'var(--rt-gold-h)' : done ? 'var(--rt-charcoal)' : 'var(--rt-text2)',
                            lineHeight: 1.3, padding: '0 0.2rem',
                          }}>
                            {info.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order details */}
              <div style={{ background: 'var(--rt-bg)', border: '1px solid var(--rt-border)', borderRadius: 14, padding: '1.5rem 2rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', margin: '0 0 1rem' }}>Order Details</p>
                <div className="acct-order-meta" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                  <div className="acct-order-meta__item">
                    <span className="acct-order-meta__key">Order Number</span>
                    <span className="acct-order-meta__val" style={{ fontSize: '0.82rem', fontFamily: 'monospace' }}>{result.order_number}</span>
                  </div>
                  <div className="acct-order-meta__item">
                    <span className="acct-order-meta__key">Date Placed</span>
                    <span className="acct-order-meta__val">{new Date(result.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="acct-order-meta__item">
                    <span className="acct-order-meta__key">Payment Method</span>
                    <span className="acct-order-meta__val" style={{ textTransform: 'capitalize' }}>{result.payment_method}</span>
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn--gold btn--sm">Contact Support</Link>
                <button type="button" className="btn btn--outline btn--sm" onClick={() => { setResult(null); setOrderNumber(''); setEmail(''); }}>
                  Track Another Order
                </button>
              </div>
            </div>
          )}

          {/* Help tip */}
          {!result && !error && (
            <div style={{ marginTop: '2rem', padding: '1.1rem 1.25rem', background: 'var(--rt-gold-pale)', borderRadius: 10, border: '1px solid rgba(195,162,104,0.25)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--rt-gold)', flexShrink: 0, marginTop: 1 }} aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p style={{ fontSize: '0.84rem', color: 'var(--rt-text2)', margin: 0, lineHeight: 1.6 }}>
                Your order number was sent to your email when you placed the order. If you have an account, you can also view your orders in{' '}
                <Link href="/account/orders" style={{ color: 'var(--rt-gold)', fontWeight: 600 }}>My Orders</Link>.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
