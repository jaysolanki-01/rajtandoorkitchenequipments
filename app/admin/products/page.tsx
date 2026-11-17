'use client';
import { useProducts } from '../../../src/hooks/useProducts';

export default function AdminProductsPage() {
  const { products, loading } = useProducts();

  return (
    <div>
      <title>Products | Admin</title>

      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--admin-fg-muted)' }}>
          {loading ? 'Loading…' : `${products.length} product${products.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : products.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No products found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Slug</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.slug}>
                  <td>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          width={40}
                          height={40}
                          style={{ objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: '1px solid var(--admin-border)' }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                        {p.description && (
                          <div style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 2, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{p.category?.replace(/-/g, ' ') ?? '—'}</td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>
                    {p.price != null ? `₹${Number(p.price).toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="admin-mono">{p.slug}</td>
                  <td>
                    {Array.isArray(p.tags) && p.tags.map((t: string) => (
                      <span key={t} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 100, background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-fg-muted)', marginRight: 4, display: 'inline-block' }}>{t}</span>
                    ))}
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
