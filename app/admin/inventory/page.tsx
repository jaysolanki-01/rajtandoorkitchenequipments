'use client';
import { useEffect, useState } from 'react';
import { fetchAdminInventory, updateInventoryStock, type AdminInventoryItem } from '../../../src/lib/supabase/admin';

export default function AdminInventoryPage() {
  const [items, setItems] = useState<AdminInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');

  useEffect(() => {
    fetchAdminInventory().then(setItems).finally(() => setLoading(false));
  }, []);

  const filtered = items.filter(i => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'in_stock' ? i.in_stock : !i.in_stock);
    return matchSearch && matchFilter;
  });

  async function toggleStock(id: string, current: boolean) {
    setUpdating(id);
    try {
      await updateInventoryStock(id, !current);
      setItems(prev => prev.map(i => i.id === id ? { ...i, in_stock: !current } : i));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdating(null);
    }
  }

  const inStockCount = items.filter(i => i.in_stock).length;
  const outCount = items.length - inStockCount;
  const categoryCount = new Set(items.map(i => i.category)).size;

  return (
    <div>
      <title>Inventory | Admin</title>

      <div className="admin-stat-grid" style={{ marginBottom: 24 }}>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Products</div>
          <div className="admin-stat-value">{loading ? '…' : items.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">In Stock</div>
          <div className="admin-stat-value" style={{ color: 'var(--admin-green)' }}>{loading ? '…' : inStockCount}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Out of Stock</div>
          <div className="admin-stat-value" style={{ color: 'var(--admin-red)' }}>{loading ? '…' : outCount}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Categories</div>
          <div className="admin-stat-value">{loading ? '…' : categoryCount}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="search" placeholder="Search products…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 240px', maxWidth: 320, padding: '9px 12px', borderRadius: 6, border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 13 }}
        />
        <div className="admin-filter-row" style={{ margin: 0 }}>
          {(['all', 'in_stock', 'out_of_stock'] as const).map(f => (
            <button key={f} className={`admin-filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'in_stock' ? 'In Stock' : 'Out of Stock'}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No products match.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th style={{ textAlign: 'center' }}>Visibility</th>
                <th style={{ textAlign: 'center' }}>Stock Status</th>
                <th style={{ textAlign: 'center' }}>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{i.name}</div>
                    <div className="admin-mono" style={{ marginTop: 2 }}>{i.slug}</div>
                  </td>
                  <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{i.category.replace(/-/g, ' ')}</td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>
                    {i.price != null ? `₹${i.price.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`admin-badge ${i.is_demo ? 'badge-quoted' : 'badge-done'}`}>
                      {i.is_demo ? 'Demo' : 'Live'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`admin-badge ${i.in_stock ? 'badge-done' : 'badge-cancelled'}`}>
                      {i.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      disabled={updating === i.id}
                      onClick={() => toggleStock(i.id, i.in_stock)}
                      style={{
                        padding: '5px 14px', borderRadius: 5, border: '1px solid var(--admin-border)',
                        background: i.in_stock ? 'rgba(159,18,57,0.08)' : 'rgba(26,107,69,0.1)',
                        color: i.in_stock ? 'var(--admin-red)' : 'var(--admin-green)',
                        fontSize: 12, fontWeight: 600, cursor: updating === i.id ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {updating === i.id ? '…' : i.in_stock ? 'Mark Out' : 'Mark In'}
                    </button>
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
