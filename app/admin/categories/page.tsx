'use client';
import { useEffect, useState } from 'react';
import { fetchAdminCategories, type AdminCategory } from '../../../src/lib/supabase/admin';

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminCategories()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <title>Categories | Admin</title>

      <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', marginBottom: 20 }}>
        Categories are managed through the Products section. This page shows all active categories.
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
                <th style={{ width: 40 }}>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(cat => (
                <tr key={cat.id}>
                  <td style={{ color: 'var(--admin-fg-muted)', fontSize: 12 }}>{cat.sort_order}</td>
                  <td style={{ fontWeight: 600 }}>{cat.name}</td>
                  <td className="admin-mono">{cat.slug}</td>
                  <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cat.description || '—'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`admin-badge ${cat.is_active ? 'badge-done' : 'badge-cancelled'}`}>
                      {cat.is_active ? 'Active' : 'Inactive'}
                    </span>
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
