import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { api } from '../api/client';

interface Order { order_number: string; status: string; placed_at: string; total_minor: number; payment_status: string }

export function AccountOrdersPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;
    api.get<Order[]>('/orders').then(setOrders).catch(() => {}).finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoading && !isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <title>{`My Orders | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="account-layout">
            <AccountNav />
            <div className="account-content">
              <h1 className="page-h1">My Orders</h1>

              {loading ? <p>Loading orders…</p> : orders.length === 0 ? (
                <div className="empty-state">
                  <p>No orders yet.</p>
                  <Link to="/shop" className="btn btn--gold">Start Shopping</Link>
                </div>
              ) : (
                <table className="orders-table orders-table--full">
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.order_number}>
                        <td>{o.order_number}</td>
                        <td>{new Date(o.placed_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                        <td><span className={`order-status order-status--${o.status}`}>{o.status.replace(/_/g, ' ')}</span></td>
                        <td>{o.payment_status}</td>
                        <td><Link to={`/account/orders/${o.order_number}`} className="btn btn--outline btn--sm">View</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
