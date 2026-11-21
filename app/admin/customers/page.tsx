'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAdminCustomers, fmtCustomerId, type AdminCustomer } from '../../../src/lib/supabase/admin';

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAdminCustomers().then(setCustomers).finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(c =>
    !search ||
    c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const totalRevenue = customers.reduce((s, c) => s + c.total_spent, 0);

  return (
    <div>
      <title>Customers | Admin</title>

      <div className="admin-stat-grid" style={{ marginBottom: 24 }}>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Customers</div>
          <div className="admin-stat-value">{loading ? '…' : customers.length}</div>
          <div className="admin-stat-sub">unique emails</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Revenue</div>
          <div className="admin-stat-value" style={{ fontSize: 22 }}>
            {loading ? '…' : `₹${totalRevenue.toLocaleString('en-IN')}`}
          </div>
          <div className="admin-stat-sub">from all orders</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          type="search" placeholder="Search by name, email or phone…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 240px', maxWidth: 360, padding: '9px 12px', borderRadius: 6,
            border: '1px solid var(--admin-border)', background: 'var(--admin-bg)',
            color: 'var(--admin-fg)', fontSize: 13,
          }}
        />
        <span style={{ fontSize: 13, color: 'var(--admin-fg-muted)', alignSelf: 'center' }}>
          {!loading && `${filtered.length} customer${filtered.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No customers found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th style={{ textAlign: 'center' }}>Orders</th>
                <th style={{ textAlign: 'right' }}>Total Spent</th>
                <th>Last Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.email} style={{ cursor: 'pointer' }}>
                  <td>
                    <span className="admin-mono" style={{ color: 'var(--admin-accent)', fontWeight: 700 }}>
                      {c.customer_number ? fmtCustomerId(c.customer_number) : '—'}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/customers/${encodeURIComponent(c.email)}`} style={{ textDecoration: 'none' }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--admin-fg)' }}>{c.customer_name}</div>
                      <div style={{ fontSize: 11, color: 'var(--admin-accent)', marginTop: 2 }}>{c.email}</div>
                    </Link>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--admin-fg-muted)' }}>{c.phone || '—'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="admin-badge badge-processing">{c.order_count}</span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, fontSize: 13 }}>
                    {c.total_spent > 0 ? `₹${c.total_spent.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', whiteSpace: 'nowrap' }}>
                    {fmtDate(c.last_order)}
                  </td>
                  <td>
                    <Link href={`/admin/customers/${encodeURIComponent(c.email)}`} style={{ fontSize: 12, color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 600 }}>
                      View →
                    </Link>
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
