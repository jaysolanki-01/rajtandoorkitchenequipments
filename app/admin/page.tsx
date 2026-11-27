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

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
const QUOTE_STATUSES = ['pending', 'contacted', 'quoted', 'done', 'cancelled'] as const;

function StatCard({ label, value, sub, color }: { label: string; value: number | string; sub?: string; color?: string }) {
  return (
    <div className="admin-stat">
      <div className="admin-stat-label">{label}</div>
      <div className="admin-stat-value" style={color ? { color } : {}}>{value}</div>
      {sub && <div className="admin-stat-sub">{sub}</div>}
    </div>
  );
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

  const statusColor: Record<string, string> = {
    pending: 'var(--admin-accent)',
    confirmed: '#0369a1',
    processing: '#7c3aed',
    shipped: '#0891b2',
    delivered: 'var(--admin-green)',
    cancelled: 'var(--admin-red)',
    contacted: '#0369a1',
    quoted: '#7c3aed',
    done: 'var(--admin-green)',
  };

  return (
    <div>
      <title>Dashboard | Admin</title>

      {/* Totals */}
      <div className="admin-stat-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} sub={`${stats?.pendingOrders ?? 0} pending`} />
        <StatCard label="Quote Requests" value={stats?.totalQuotes ?? 0} sub={`${stats?.pendingQuotes ?? 0} pending`} />
      </div>

      {/* Orders by status */}
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--admin-fg-muted)', marginBottom: 10 }}>
          Orders by Status
        </p>
        <div className="admin-stat-grid">
          {ORDER_STATUSES.map(s => (
            <StatCard
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              value={stats?.ordersByStatus[s] ?? 0}
              color={statusColor[s]}
            />
          ))}
        </div>
      </div>

      {/* Quotes by status */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--admin-fg-muted)', marginBottom: 10 }}>
          Quotes by Status
        </p>
        <div className="admin-stat-grid">
          {QUOTE_STATUSES.map(s => (
            <StatCard
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              value={stats?.quotesByStatus[s] ?? 0}
              color={statusColor[s]}
            />
          ))}
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
