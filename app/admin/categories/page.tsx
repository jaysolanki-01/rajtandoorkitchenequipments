'use client';
import { useEffect, useState } from 'react';
import { fetchUsedCategories } from '../../../src/lib/supabase/admin';
import { CATEGORIES } from '../../../src/config/categories';

export default function AdminCategoriesPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsedCategories().then(setSlugs).finally(() => setLoading(false));
  }, []);

  const catMap = Object.fromEntries(CATEGORIES.map(c => [c.slug, c]));

  return (
    <div>
      <title>Categories | Admin</title>

      <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', marginBottom: 20 }}>
        Categories currently used by your products. To assign a category, edit a product in the Products section.
      </p>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : slugs.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No categories in use yet. Add products with categories first.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {slugs.map((slug, i) => {
                const cat = catMap[slug];
                return (
                  <tr key={slug}>
                    <td style={{ color: 'var(--admin-fg-muted)', fontSize: 12 }}>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{cat?.name ?? slug}</td>
                    <td className="admin-mono">{slug}</td>
                    <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cat?.description || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
