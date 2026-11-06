import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { api } from '../api/client';

interface Order { order_number: string; status: string; placed_at: string; total_minor: number }

export function AccountPage() {
  const { isLoggedIn, isLoading, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;
    api.get<Order[]>('/orders').then(setOrders).catch(() => {});
  }, [isLoggedIn]);

  if (!isLoading && !isLoggedIn) return <Navigate to="/" replace />;
  if (isLoading) return <main className="page-main"><div className="container"><p style={{ padding: '4rem 0' }}>Loading…</p></div></main>;

  return (
    <>
      <title>{`My Account | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="account-layout">
            <AccountNav />
            <div className="account-content">
              <h1 className="page-h1">My Account</h1>
              <p className="account-welcome">Welcome back, <strong>{user?.name}</strong>.</p>

              <div className="account-grid">
                <Link to="/account/orders" className="account-card">
                  <h2>My Orders</h2>
                  <p>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
                </Link>
                <Link to="/wishlist" className="account-card">
                  <h2>Wishlist</h2>
                  <p>View saved products</p>
                </Link>
                <Link to="/account/addresses" className="account-card">
                  <h2>Addresses</h2>
                  <p>Manage delivery addresses</p>
                </Link>
                <Link to="/account/profile" className="account-card">
                  <h2>Profile</h2>
                  <p>Edit your details</p>
                </Link>
              </div>

              {orders.length > 0 && (
                <div style={{ marginTop: '2.5rem' }}>
                  <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>Recent Orders</h2>
                  <table className="orders-table">
                    <thead><tr><th>Order</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.order_number}>
                          <td><Link to={`/account/orders/${o.order_number}`}>{o.order_number}</Link></td>
                          <td>{new Date(o.placed_at).toLocaleDateString('en-IN')}</td>
                          <td><span className={`order-status order-status--${o.status}`}>{o.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length > 5 && <Link to="/account/orders" style={{ fontSize: '0.9rem', marginTop: '0.5rem', display: 'inline-block' }}>View all orders →</Link>}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
