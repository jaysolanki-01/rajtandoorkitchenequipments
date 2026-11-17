'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrders, type UserOrder } from '../lib/supabase/db';

export function AccountOrdersPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    fetchUserOrders(user.id).then(setOrders).catch(() => {}).finally(() => setLoading(false));
  }, [isLoggedIn, user]);

  if (!isLoading && !isLoggedIn) router.push('/'); return null;

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
                  <Link href="/shop" className="btn btn--gold">Start Shopping</Link>
                </div>
              ) : (
                <table className="orders-table orders-table--full">
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Method</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.order_number}>
                        <td>{o.order_number}</td>
                        <td>{new Date(o.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                        <td><span className={`order-status order-status--${o.status}`}>{o.status.replace(/_/g, ' ')}</span></td>
                        <td>{o.payment_method}</td>
                        <td><Link href={`/account/orders/${o.order_number}`} className="btn btn--outline btn--sm">View</Link></td>
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
