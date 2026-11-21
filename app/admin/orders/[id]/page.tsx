'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminOrderById, updateOrderStatus, type AdminOrder } from '../../../../src/lib/supabase/admin';

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI', card: 'Credit / Debit Card', netbanking: 'Net Banking',
  wallet: 'Wallet', cod: 'Cash on Delivery',
};
const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}
function fmtDate(s: string) {
  return new Date(s).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--admin-border)' }}>
      <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)', flexShrink: 0, paddingTop: 1 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--admin-fg)', textAlign: 'right' }}>{children}</span>
    </div>
  );
}

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchAdminOrderById(id).then(o => {
      setOrder(o);
      if (o) setPendingStatus(o.status);
    }).finally(() => setLoading(false));
  }, [id]);

  async function handleStatusSave() {
    if (!order || pendingStatus === order.status) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, pendingStatus);
      setOrder(prev => prev ? { ...prev, status: pendingStatus } : prev);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return <div style={{ padding: '32px 0', color: 'var(--admin-fg-muted)', fontSize: 14 }}>Loading order…</div>;
  }
  if (!order) {
    return (
      <div style={{ padding: '32px 0' }}>
        <p style={{ color: 'var(--admin-fg-muted)', fontSize: 14, marginBottom: 16 }}>Order not found.</p>
        <Link href="/admin/orders" style={{ fontSize: 13, color: 'var(--admin-accent)' }}>← Back to Orders</Link>
      </div>
    );
  }

  const address = typeof order.address === 'string'
    ? order.address
    : [
        (order.address as Record<string,string>)?.line1,
        (order.address as Record<string,string>)?.line2,
        (order.address as Record<string,string>)?.city,
        (order.address as Record<string,string>)?.state,
        (order.address as Record<string,string>)?.pincode,
      ].filter(Boolean).join(', ');

  const items = Array.isArray(order.items) ? order.items : [];
  const emailEncoded = encodeURIComponent(order.email);

  return (
    <div>
      <title>{`Order ${order.order_number} | Admin`}</title>

      {/* Breadcrumb + back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
        <Link href="/admin/orders" style={{ color: 'var(--admin-fg-muted)', textDecoration: 'none' }}>Orders</Link>
        <span style={{ color: 'var(--admin-fg-muted)' }}>›</span>
        <span style={{ color: 'var(--admin-fg)', fontWeight: 600, fontFamily: 'ui-monospace, monospace' }}>{order.order_number}</span>
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--admin-fg)', margin: 0, fontFamily: 'ui-monospace, monospace' }}>
            #{order.order_number}
          </h1>
          <StatusBadge status={order.status} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <select
            className="admin-select"
            value={pendingStatus}
            onChange={e => setPendingStatus(e.target.value)}
            disabled={updating}
            style={{ fontSize: 13, padding: '6px 10px' }}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleStatusSave}
            disabled={updating || pendingStatus === order.status}
            style={{
              padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: saved ? '#16a34a' : 'var(--admin-accent)', color: '#fff',
              fontSize: 13, fontWeight: 600, opacity: (updating || pendingStatus === order.status) ? 0.5 : 1,
              transition: 'background 0.2s',
            }}
          >
            {saved ? '✓ Saved' : updating ? 'Saving…' : 'Update Status'}
          </button>
        </div>
      </div>

      <div className="admin-grid-2">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Order items */}
          <div className="admin-card">
            <div className="admin-section-header">
              <span className="admin-section-title">Items Ordered</span>
              <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th style={{ textAlign: 'center' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Unit Price</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const name = (item as {name?: string; product?: {name?: string}}).name
                    ?? (item as {product?: {name?: string}}).product?.name
                    ?? 'Product';
                  const qty = (item as {qty?: number; quantity?: number}).qty
                    ?? (item as {quantity?: number}).quantity
                    ?? 1;
                  const price = (item as {price?: number | null}).price;
                  return (
                    <tr key={i}>
                      <td className="admin-mono">{i + 1}</td>
                      <td style={{ fontWeight: 500 }}>{name}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="admin-badge badge-processing">{qty}</span>
                      </td>
                      <td style={{ textAlign: 'right', color: 'var(--admin-fg-muted)', fontSize: 12 }}>
                        {price != null ? fmt(price) : '—'}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        {price != null ? fmt(price * qty) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'right', fontSize: 13, fontWeight: 600, color: 'var(--admin-fg-muted)', padding: '12px 16px', borderTop: '2px solid var(--admin-border)' }}>
                    Order Total
                  </td>
                  <td style={{ textAlign: 'right', fontSize: 15, fontWeight: 700, color: 'var(--admin-fg)', padding: '12px 16px', borderTop: '2px solid var(--admin-border)' }}>
                    {fmt(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="admin-card">
              <div className="admin-section-header">
                <span className="admin-section-title">Order Notes</span>
              </div>
              <p style={{ padding: '12px 18px', fontSize: 13, color: 'var(--admin-fg)', margin: 0, lineHeight: 1.6 }}>{order.notes}</p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Order details */}
          <div className="admin-card">
            <div className="admin-section-header">
              <span className="admin-section-title">Order Details</span>
            </div>
            <div style={{ padding: '0 18px' }}>
              <InfoRow label="Order number">
                <span className="admin-mono">{order.order_number}</span>
              </InfoRow>
              <InfoRow label="Placed on">{fmtDate(order.created_at)}</InfoRow>
              <InfoRow label="Payment method">{PAY_LABEL[order.payment_method] ?? order.payment_method}</InfoRow>
              <InfoRow label="Status"><StatusBadge status={order.status} /></InfoRow>
              <InfoRow label="Order total">
                <strong style={{ fontSize: 15, color: 'var(--admin-fg)' }}>{fmt(order.total)}</strong>
              </InfoRow>
            </div>
          </div>

          {/* Customer details */}
          <div className="admin-card">
            <div className="admin-section-header">
              <span className="admin-section-title">Customer</span>
              <Link
                href={`/admin/customers/${emailEncoded}`}
                style={{ fontSize: 12, color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 600 }}
              >
                View Profile →
              </Link>
            </div>
            <div style={{ padding: '0 18px' }}>
              <InfoRow label="Name">{order.customer_name}</InfoRow>
              <InfoRow label="Email">
                <a href={`mailto:${order.email}`} style={{ color: 'var(--admin-accent)', textDecoration: 'none' }}>{order.email}</a>
              </InfoRow>
              {order.phone && <InfoRow label="Phone">
                <a href={`tel:${order.phone}`} style={{ color: 'var(--admin-accent)', textDecoration: 'none' }}>{order.phone}</a>
              </InfoRow>}
            </div>
          </div>

          {/* Shipping address */}
          {address && (
            <div className="admin-card">
              <div className="admin-section-header">
                <span className="admin-section-title">Delivery Address</span>
              </div>
              <p style={{ padding: '12px 18px 16px', fontSize: 13, color: 'var(--admin-fg)', margin: 0, lineHeight: 1.75 }}>
                {address}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
