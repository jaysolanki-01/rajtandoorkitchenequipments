'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchOrdersByEmail, type AdminOrder } from '../../../../src/lib/supabase/admin';

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI', card: 'Card', netbanking: 'Net Banking',
  wallet: 'Wallet', cod: 'COD',
};

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

export default function AdminCustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const email = decodeURIComponent(id ?? '');

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    fetchOrdersByEmail(email).then(setOrders).finally(() => setLoading(false));
  }, [email]);

  const totalSpent = orders.reduce((s, o) => s + (o.total ?? 0), 0);
  const customerName = orders[0]?.customer_name ?? '—';
  const phone = orders[0]?.phone ?? '';

  if (loading) {
    return <div style={{ padding: '32px 0', color: 'var(--admin-fg-muted)', fontSize: 14 }}>Loading…</div>;
  }

  if (!orders.length) {
    return (
      <div style={{ padding: '32px 0' }}>
        <p style={{ color: 'var(--admin-fg-muted)', fontSize: 14, marginBottom: 16 }}>No orders found for <strong>{email}</strong>.</p>
        <Link href="/admin/customers" style={{ fontSize: 13, color: 'var(--admin-accent)' }}>← Back to Customers</Link>
      </div>
    );
  }

  return (
    <div>
      <title>{`${customerName} | Customers | Admin`}</title>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
        <Link href="/admin/customers" style={{ color: 'var(--admin-fg-muted)', textDecoration: 'none' }}>Customers</Link>
        <span style={{ color: 'var(--admin-fg-muted)' }}>›</span>
        <span style={{ color: 'var(--admin-fg)', fontWeight: 600 }}>{customerName}</span>
      </div>

      {/* Customer header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div
          style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--admin-accent), #e8a060)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 20, fontWeight: 700, flexShrink: 0,
          }}
        >
          {customerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--admin-fg)', margin: '0 0 4px' }}>{customerName}</h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 13, color: 'var(--admin-fg-muted)' }}>
            <a href={`mailto:${email}`} style={{ color: 'var(--admin-accent)', textDecoration: 'none' }}>{email}</a>
            {phone && <span>{phone}</span>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stat-grid" style={{ marginBottom: 24 }}>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Orders</div>
          <div className="admin-stat-value">{orders.length}</div>
          <div className="admin-stat-sub">all time</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Spent</div>
          <div className="admin-stat-value" style={{ fontSize: 22 }}>{fmt(totalSpent)}</div>
          <div className="admin-stat-sub">incl. GST</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Avg. Order Value</div>
          <div className="admin-stat-value" style={{ fontSize: 22 }}>
            {orders.length ? fmt(Math.round(totalSpent / orders.length)) : '—'}
          </div>
          <div className="admin-stat-sub">per order</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Last Order</div>
          <div className="admin-stat-value" style={{ fontSize: 16, marginTop: 6 }}>{fmtDate(orders[0].created_at)}</div>
          <div className="admin-stat-sub">{orders[orders.length - 1] && `first: ${fmtDate(orders[orders.length - 1].created_at)}`}</div>
        </div>
      </div>

      {/* Orders list */}
      <div className="admin-card">
        <div className="admin-section-header">
          <span className="admin-section-title">Order History</span>
          <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => {
              const items = Array.isArray(o.items) ? o.items : [];
              return (
                <tr key={o.id}>
                  <td className="admin-mono">{o.order_number}</td>
                  <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', maxWidth: 200 }}>
                    {items.map((i, idx) => {
                      const name = (i as {name?: string; product?: {name?: string}}).name
                        ?? (i as {product?: {name?: string}}).product?.name
                        ?? 'Product';
                      const qty = (i as {qty?: number; quantity?: number}).qty
                        ?? (i as {quantity?: number}).quantity
                        ?? 1;
                      return <div key={idx} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name} ×{qty}</div>;
                    })}
                  </td>
                  <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{PAY_LABEL[o.payment_method] ?? o.payment_method}</td>
                  <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', whiteSpace: 'nowrap' }}>{fmtDate(o.created_at)}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{fmt(o.total)}</td>
                  <td>
                    <Link
                      href={`/admin/orders/${o.id}`}
                      style={{ fontSize: 12, color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
