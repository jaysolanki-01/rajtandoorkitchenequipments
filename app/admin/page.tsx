'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAdminStats, fetchAdminOrders, fetchAdminQuotes, type AdminStats, type AdminOrder, type AdminQuote } from '../../src/lib/supabase/admin';

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchAdminStats(),
      fetchAdminOrders(5),
      fetchAdminQuotes(5),
    ]).then(([s, o, q]) => {
      setStats(s);
      setOrders(o);
      setQuotes(q.filter(q => q.status === 'pending').slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: 'var(--admin-fg-muted)', fontSize: 14 }}>Loading…</p>;

  return (
    <div>
      <title>Dashboard | Admin</title>

      {/* Stats */}
      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-label">Total Orders</div>
          <div className="admin-stat-value">{stats?.totalOrders ?? 0}</div>
          <div className="admin-stat-sub">{stats?.pendingOrders ?? 0} pending</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Quote Requests</div>
          <div className="admin-stat-value">{stats?.totalQuotes ?? 0}</div>
          <div className="admin-stat-sub">{stats?.pendingQuotes ?? 0} pending</div>
        </div>
      </div>

      <div className="admin-grid-2">
        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-section-header">
            <span className="admin-section-title">Recent Orders</span>
            <Link href="/admin/orders" style={{ fontSize: 12, color: 'var(--admin-accent)' }}>View all →</Link>
          </div>
          {orders.length === 0 ? (
            <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No orders yet.</p>
          ) : (
            <table className="admin-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="admin-mono">{o.order_number}</td>
                    <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.customer_name}</td>
                    <td style={{ fontWeight: 600 }}>{fmt(o.total)}</td>
                    <td><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pending Quotes */}
        <div className="admin-card">
          <div className="admin-section-header">
            <span className="admin-section-title">Pending Quotes</span>
            <Link href="/admin/quotes" style={{ fontSize: 12, color: 'var(--admin-accent)' }}>View all →</Link>
          </div>
          {quotes.length === 0 ? (
            <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No pending quotes.</p>
          ) : (
            <div>
              {quotes.map(q => (
                <div key={q.id} className="admin-quote-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <span className="admin-mono">{q.reference}</span>
                      <p style={{ fontWeight: 600, fontSize: 13, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.customer_name}</p>
                      <p style={{ fontSize: 12, color: 'var(--admin-fg-muted)', marginTop: 2 }}>{q.email}</p>
                      {q.product_interest && <p style={{ fontSize: 12, color: 'var(--admin-fg)', marginTop: 4 }}>{q.product_interest}</p>}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <StatusBadge status={q.status} />
                      <p style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 6 }}>{fmtDate(q.created_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
