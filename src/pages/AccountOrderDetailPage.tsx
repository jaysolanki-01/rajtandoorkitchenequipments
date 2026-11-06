import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { api, ApiError } from '../api/client';

interface OrderItem { id: number; product_name: string; product_slug: string; quantity: number; unit_price_minor: number; line_total_minor: number }
interface OrderDetail { order_number: string; status: string; placed_at: string; total_minor: number; payment_status: string; payment_method: string; notes: string | null; items: OrderItem[] }

export function AccountOrderDetailPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { isLoggedIn, isLoading } = useAuth();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn || !orderNumber) return;
    api.get<OrderDetail>(`/orders/${orderNumber}`)
      .then(setOrder)
      .catch(e => setError(e instanceof ApiError ? e.message : 'Order not found.'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, orderNumber]);

  if (!isLoading && !isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <title>{`Order ${orderNumber} | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="account-layout">
            <AccountNav />
            <div className="account-content">
              <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
                <ol role="list"><li><Link to="/account/orders">My Orders</Link></li><li aria-current="page">{orderNumber}</li></ol>
              </nav>
              <h1 className="page-h1">Order {orderNumber}</h1>

              {loading ? <p>Loading…</p> : error ? <p className="form-status form-status--error">{error}</p> : order && (
                <>
                  <div className="order-meta">
                    <div><span>Date</span><strong>{new Date(order.placed_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
                    <div><span>Status</span><strong className={`order-status order-status--${order.status}`}>{order.status.replace(/_/g, ' ')}</strong></div>
                    <div><span>Payment</span><strong>{order.payment_status} ({order.payment_method})</strong></div>
                  </div>

                  <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.05rem', fontWeight: 700 }}>Items</h2>
                  <table className="orders-table orders-table--full">
                    <thead><tr><th>Product</th><th>Qty</th></tr></thead>
                    <tbody>
                      {order.items.map(i => (
                        <tr key={i.id}>
                          <td><Link to={`/products/${i.product_slug}`}>{i.product_name}</Link></td>
                          <td>{i.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {order.notes && <p style={{ marginTop: '1.5rem', color: 'var(--rt-charcoal)', opacity: 0.7 }}><strong>Notes:</strong> {order.notes}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
