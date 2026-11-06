import { useState } from 'react';
import { seo } from '../config/site';
import { api, ApiError } from '../api/client';

interface OrderStatus { order_number: string; status: string; placed_at: string; payment_status: string }

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const data = await api.get<OrderStatus>(`/orders/${orderNumber.trim()}`);
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError && err.status === 404 ? 'No order found with that number. Please check and try again.' : err instanceof ApiError ? err.message : 'Could not look up order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <title>{`Track Your Order | ${seo.title}`}</title>
      <meta name="description" content="Track the status of your Raj Tandoor enquiry order by entering your order number." />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container" style={{ maxWidth: 640, paddingTop: '3rem', paddingBottom: '4rem' }}>
          <h1 className="page-h1">Track Your Order</h1>
          <p style={{ marginBottom: '2rem', color: 'var(--rt-charcoal)', opacity: 0.75 }}>
            Enter your order number to check its current status. Order numbers begin with <strong>RT-</strong>.
          </p>

          <form className="contact-form" onSubmit={handleTrack} noValidate>
            <div className="form-field">
              <label htmlFor="track-order" className="form-label">Order Number *</label>
              <input id="track-order" type="text" className="form-input" required value={orderNumber} onChange={e => setOrderNumber(e.target.value)} placeholder="e.g. RT-1234567890-AB" autoComplete="off" />
            </div>
            <div className="form-field">
              <label htmlFor="track-email" className="form-label">Email Address (optional)</label>
              <input id="track-email" type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Used to verify ownership" autoComplete="email" />
            </div>
            <button type="submit" className="btn btn--gold" disabled={loading || !orderNumber.trim()}>{loading ? 'Searching…' : 'Track Order'}</button>
          </form>

          {error && <div className="form-status form-status--error" role="alert" style={{ marginTop: '1.5rem' }}>{error}</div>}

          {result && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--rt-border)', borderRadius: 8 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Order Details</h2>
              <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1.5rem' }}>
                <dt style={{ fontWeight: 600 }}>Order Number</dt><dd>{result.order_number}</dd>
                <dt style={{ fontWeight: 600 }}>Date Placed</dt><dd>{new Date(result.placed_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                <dt style={{ fontWeight: 600 }}>Status</dt><dd><span className={`order-status order-status--${result.status}`}>{result.status.replace(/_/g, ' ')}</span></dd>
                <dt style={{ fontWeight: 600 }}>Payment</dt><dd>{result.payment_status}</dd>
              </dl>
              <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--rt-charcoal)', opacity: 0.7 }}>
                For detailed enquiries about your order, please use our <a href="/contact">contact page</a>.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
