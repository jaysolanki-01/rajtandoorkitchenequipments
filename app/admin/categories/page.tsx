'use client';
import { useEffect, useState } from 'react';
import { fetchAdminProducts, type AdminProduct } from '../../../src/lib/supabase/admin';

type CategoryRow = {
  key: string;
  label: string;
  count: number;
  inStock: number;
};

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminProducts().then((products: AdminProduct[]) => {
      const map = new Map<string, CategoryRow>();
      for (const p of products) {
        const r = map.get(p.category);
        if (r) {
          r.count++;
          if (p.in_stock) r.inStock++;
        } else {
          map.set(p.category, { key: p.category, label: p.category_label || p.category, count: 1, inStock: p.in_stock ? 1 : 0 });
        }
      }
      setRows(Array.from(map.values()).sort((a, b) => b.count - a.count));
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <title>Categories | Admin</title>

      <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', marginBottom: 20 }}>
        Categories are derived from your products table. To add a new category, create a product with a new category key.
      </p>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : rows.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No categories found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Key</th>
                <th style={{ textAlign: 'center' }}>Products</th>
                <th style={{ textAlign: 'center' }}>In Stock</th>
                <th style={{ textAlign: 'center' }}>Out of Stock</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.key}>
                  <td style={{ fontWeight: 600 }}>{r.label}</td>
                  <td className="admin-mono">{r.key}</td>
                  <td style={{ textAlign: 'center' }}>{r.count}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="admin-badge badge-done">{r.inStock}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {r.count - r.inStock > 0
                      ? <span className="admin-badge badge-cancelled">{r.count - r.inStock}</span>
                      : <span style={{ color: 'var(--admin-fg-muted)', fontSize: 12 }}>—</span>}
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
