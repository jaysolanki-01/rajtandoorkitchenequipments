'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  fetchAdminStats, fetchAdminOrders, fetchAdminQuotes,
  type AdminStats, type AdminOrder, type AdminQuote,
} from '../../src/lib/supabase/admin';

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
const QUOTE_STATUSES = ['pending', 'contacted', 'quoted', 'done', 'cancelled'] as const;

const STATUS_COLOR: Record<string, string> = {
  pending:    '#92400e',
  confirmed:  '#1d4ed8',
  processing: '#6d28d9',
  shipped:    '#0369a1',
  delivered:  '#166534',
  done:       '#166534',
  cancelled:  '#991b1b',
  contacted:  '#0369a1',
  quoted:     '#6d28d9',
};
const STATUS_BG: Record<string, string> = {
  pending:    '#fef3c7',
  confirmed:  '#dbeafe',
  processing: '#ede9fe',
  shipped:    '#e0f2fe',
  delivered:  '#dcfce7',
  done:       '#dcfce7',
  cancelled:  '#fee2e2',
  contacted:  '#e0f2fe',
  quoted:     '#ede9fe',
};

function KpiCard({ label, value, sub, accentColor, alert }: {
  label: string; value: string | number; sub: string; accentColor: string; alert?: boolean;
}) {
  return (
    <div className="admin-card" style={{ padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 4,
        background: accentColor, borderRadius: '10px 0 0 10px',
      }} />
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--admin-fg-muted)', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: accentColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
        {alert && typeof value === 'number' && value > 0 ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {value}
            <span style={{ fontSize: 12, background: accentColor, color: '#fff', borderRadius: 4, padding: '2px 6px', fontWeight: 700 }}>Action needed</span>
          </span>
        ) : value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--admin-fg-muted)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAdminStats(), fetchAdminOrders(6), fetchAdminQuotes(50)]).then(([s, o, q]) => {
      setStats(s);
      setOrders(o);
      setQuotes(q.filter(x => x.status === 'pending').slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const needsAttention =
    (stats?.ordersByStatus['pending'] ?? 0) +
    (stats?.ordersByStatus['confirmed'] ?? 0) +
    (stats?.quotesByStatus['pending'] ?? 0);

  return (
    <div>
      <title>Dashboard | Admin</title>

      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--admin-fg)', margin: 0 }}>{greeting}</h1>
        <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', marginTop: 3 }}>{today}</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KpiCard
          label="Total Revenue"
          value={fmt(stats?.totalRevenue ?? 0)}
          sub={`from ${stats?.totalOrders ?? 0} orders`}
          accentColor="var(--admin-green)"
        />
        <KpiCard
          label="Total Orders"
          value={stats?.totalOrders ?? 0}
          sub={`${stats?.pendingOrders ?? 0} pending · ${stats?.ordersByStatus['delivered'] ?? 0} delivered`}
          accentColor="var(--admin-blue)"
        />
        <KpiCard
          label="Quote Requests"
          value={stats?.totalQuotes ?? 0}
          sub={`${stats?.pendingQuotes ?? 0} pending · ${stats?.quotesByStatus['done'] ?? 0} done`}
          accentColor="#7c3aed"
        />
        <KpiCard
          label="Needs Attention"
          value={needsAttention}
          sub="pending orders + pending quotes"
          accentColor={needsAttention > 0 ? 'var(--admin-accent)' : 'var(--admin-fg-muted)'}
          alert
        />
      </div>

      {/* Status Overview */}
      <div className="admin-card" style={{ marginBottom: 28 }}>
        <div className="admin-section-header">
          <span className="admin-section-title">Status Overview</span>
        </div>
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Orders by status */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--admin-fg-muted)', marginBottom: 10 }}>
              Orders by Status
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ORDER_STATUSES.map(s => {
                const count = stats?.ordersByStatus[s] ?? 0;
                return (
                  <div key={s} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px', borderRadius: 8,
                    background: STATUS_BG[s],
                    border: `1px solid ${STATUS_COLOR[s]}33`,
                    minWidth: 100,
                  }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: STATUS_COLOR[s], fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{count}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: STATUS_COLOR[s], textTransform: 'capitalize' }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quotes by status */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--admin-fg-muted)', marginBottom: 10 }}>
              Quotes by Status
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {QUOTE_STATUSES.map(s => {
                const count = stats?.quotesByStatus[s] ?? 0;
                return (
                  <div key={s} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px', borderRadius: 8,
                    background: STATUS_BG[s],
                    border: `1px solid ${STATUS_COLOR[s]}33`,
                    minWidth: 100,
                  }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: STATUS_COLOR[s], fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{count}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: STATUS_COLOR[s], textTransform: 'capitalize' }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Recent Orders + Pending Quotes */}
      <div className="admin-grid-2">

        <div className="admin-card">
          <div className="admin-section-header">
            <span className="admin-section-title">Recent Orders</span>
            <Link href="/admin/orders" style={{ fontSize: 12, color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 500 }}>
              View all →
            </Link>
          </div>
          {orders.length === 0 ? (
            <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No orders yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td><span className="admin-mono">{o.order_number}</span></td>
                    <td style={{ maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {o.customer_name}
                    </td>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(o.total)}</td>
                    <td><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-card">
          <div className="admin-section-header">
            <span className="admin-section-title">Pending Quotes</span>
            <Link href="/admin/quotes" style={{ fontSize: 12, color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 500 }}>
              View all →
            </Link>
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
                      <p style={{ fontWeight: 600, fontSize: 13, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {q.customer_name}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--admin-fg-muted)', marginTop: 2 }}>{q.email}</p>
                      {q.product_interest && (
                        <p style={{ fontSize: 12, color: 'var(--admin-fg)', marginTop: 4 }}>{q.product_interest}</p>
                      )}
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
