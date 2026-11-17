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
      .catch(() => setError('Could not load order.'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, orderNumber, user]);

  if (!isLoading && !isLoggedIn) router.push('/'); return null;

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
                <ol role="list"><li><Link href="/account/orders">My Orders</Link></li><li aria-current="page">{orderNumber}</li></ol>
              </nav>
              <h1 className="page-h1">Order {orderNumber}</h1>

              {loading ? <p>Loading…</p> : error ? <p className="form-status form-status--error">{error}</p> : order && (
                <>
                  <div className="order-meta">
                    <div><span>Date</span><strong>{new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
                    <div><span>Status</span><strong className={`order-status order-status--${order.status}`}>{order.status.replace(/_/g, ' ')}</strong></div>
                    <div><span>Payment</span><strong>{order.payment_method}</strong></div>
                  </div>

                  <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.05rem', fontWeight: 700 }}>Items</h2>
                  <table className="orders-table orders-table--full">
                    <thead><tr><th>Product</th><th>Qty</th></tr></thead>
                    <tbody>
                      {(order.items ?? []).map((i, idx) => {
                        const name = i.product?.name ?? i.name ?? 'Product';
                        const slug = i.product?.slug ?? i.slug ?? '#';
                        return (
                          <tr key={idx}>
                            <td><Link href={`/products/${slug}`}>{name}</Link></td>
                            <td>{i.quantity}</td>
                          </tr>
                        );
                      })}
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
