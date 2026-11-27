'use client';
import { CATEGORIES } from '../../../src/config/categories';

export default function AdminCategoriesPage() {
  return (
    <div>
      <title>Categories | Admin</title>

      <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', marginBottom: 20 }}>
        These are the categories available when adding or editing products. To add a product to a category, use the Products section.
      </p>

      <div className="admin-card">
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
            {CATEGORIES.map((cat, i) => (
              <tr key={cat.slug}>
                <td style={{ color: 'var(--admin-fg-muted)', fontSize: 12 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{cat.name}</td>
                <td className="admin-mono">{cat.slug}</td>
                <td style={{ fontSize: 12, color: 'var(--admin-fg-muted)', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cat.description || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
