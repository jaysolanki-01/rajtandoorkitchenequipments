'use client';
import { useEffect, useState } from 'react';
import { fetchAdminOrders, updateOrderStatus, type AdminOrder } from '../../../src/lib/supabase/admin';

const STATUSES = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminOrders(200).then(setOrders).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    try {
      await updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <title>Orders | Admin</title>

      <div className="admin-filter-row">
        {STATUSES.map(s => (
          <button key={s} className={`admin-filter-btn${filter === s ? ' active' : ''}`} onClick={() => setFilter(s)}>
            {s === 'all' ? 'All' : s}
            {s !== 'all' && (
              <span style={{ marginLeft: 5, opacity: 0.65 }}>
                ({orders.filter(o => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No orders.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="admin-mono">{o.order_number}</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{o.customer_name}</div>
                    <div style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 2 }}>{o.email}</div>
                    {o.phone && <div style={{ fontSize: 11, color: 'var(--admin-fg-muted)' }}>{o.phone}</div>}
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>
                    {Array.isArray(o.items) ? o.items.map((i, idx) => (
                      <div key={idx}>{i.product?.name ?? i.name ?? 'Product'} ×{(i as {qty?:number;quantity?:number}).qty ?? i.quantity ?? 1}</div>
                    )) : '—'}
                  </td>
                  <td style={{ fontWeight: 600 }}>{fmt(o.total)}</td>
                  <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{o.payment_method?.replace(/_/g, ' ') ?? '—'}</td>
                  <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', whiteSpace: 'nowrap' }}>{fmtDate(o.created_at)}</td>
                  <td>
                    <select
                      className="admin-select"
                      value={o.status}
                      disabled={updating === o.id}
                      onChange={e => handleStatusChange(o.id, e.target.value)}
                    >
                      {STATUSES.filter(s => s !== 'all').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
