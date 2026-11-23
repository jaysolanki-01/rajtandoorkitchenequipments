'use client';
import { useEffect, useState } from 'react';
import {
  fetchAdminCategories, createCategory, updateCategory, deleteCategory,
  type AdminCategory,
} from '../../../src/lib/supabase/admin';

type FormState = {
  id: string | null;
  slug: string;
  name: string;
  description: string;
  image: string;
  sort_order: number;
  is_active: boolean;
};

const emptyForm = (): FormState => ({
  id: null, slug: '', name: '', description: '', image: '', sort_order: 0, is_active: true,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid var(--admin-border)',
  background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 13, boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--admin-fg-muted)',
  marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em',
};

const btnPrimary: React.CSSProperties = {
  padding: '8px 18px', borderRadius: 6, border: 'none', cursor: 'pointer',
  background: 'var(--admin-accent)', color: '#fff', fontSize: 13, fontWeight: 600,
};

const btnSecondary: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
  border: '1px solid var(--admin-border)', background: 'var(--admin-card)',
  color: 'var(--admin-fg)',
};

const btnDanger: React.CSSProperties = {
  padding: '5px 10px', borderRadius: 5, cursor: 'pointer', fontSize: 12,
  border: '1px solid #fca5a5', background: '#fff1f2', color: '#b91c1c',
};

const btnEdit: React.CSSProperties = {
  padding: '5px 10px', borderRadius: 5, cursor: 'pointer', fontSize: 12,
  border: '1px solid var(--admin-border)', background: 'var(--admin-card)',
  color: 'var(--admin-fg)',
};

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    fetchAdminCategories()
      .then(setRows)
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(emptyForm());
    setError(null);
  }

  function openEdit(cat: AdminCategory) {
    setForm({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
      sort_order: cat.sort_order,
      is_active: cat.is_active,
    });
    setError(null);
  }

  function closeForm() {
    setForm(null);
    setError(null);
  }

  async function handleSave() {
    if (!form) return;
    if (!form.name.trim() || !form.slug.trim()) {
      setError('Name and Slug are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (form.id) {
        await updateCategory(form.id, {
          slug: form.slug.trim(),
          name: form.name.trim(),
          description: form.description.trim() || null,
          image: form.image.trim() || null,
          sort_order: Number(form.sort_order),
          is_active: form.is_active,
        });
      } else {
        await createCategory({
          id: crypto.randomUUID(),
          slug: form.slug.trim(),
          name: form.name.trim(),
          description: form.description.trim() || null,
          image: form.image.trim() || null,
          sort_order: Number(form.sort_order),
          is_active: form.is_active,
        });
      }
      closeForm();
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(cat: AdminCategory) {
    try {
      await updateCategory(cat.id, { is_active: !cat.is_active });
      load();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this category? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await deleteCategory(id);
      load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Failed to delete.');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <title>Categories | Admin</title>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', margin: 0 }}>
          Manage categories shown in the shop. Changes go live immediately.
        </p>
        <button style={btnPrimary} onClick={openAdd}>+ Add Category</button>
      </div>

      {/* Add / Edit form */}
      {form && (
        <div className="admin-card" style={{ marginBottom: 20 }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--admin-border)', fontWeight: 600, fontSize: 14, color: 'var(--admin-fg)' }}>
            {form.id ? 'Edit Category' : 'New Category'}
          </div>
          <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                style={inp}
                value={form.name}
                onChange={e => {
                  const name = e.target.value;
                  setForm(f => f ? { ...f, name, slug: f.id ? f.slug : slugify(name) } : f);
                }}
                placeholder="e.g. Tandoor Equipment"
              />
            </div>
            <div>
              <label style={labelStyle}>Slug *</label>
              <input
                style={{ ...inp, fontFamily: 'ui-monospace, monospace', fontSize: 12 }}
                value={form.slug}
                onChange={e => setForm(f => f ? { ...f, slug: e.target.value } : f)}
                placeholder="e.g. tandoor-equipment"
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inp, resize: 'vertical' }}
                rows={2}
                value={form.description}
                onChange={e => setForm(f => f ? { ...f, description: e.target.value } : f)}
                placeholder="Short description shown in the shop"
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Image URL</label>
              <input
                style={inp}
                value={form.image}
                onChange={e => setForm(f => f ? { ...f, image: e.target.value } : f)}
                placeholder="/images/category-tandoor.webp"
              />
            </div>
            <div>
              <label style={labelStyle}>Sort Order</label>
              <input
                style={inp}
                type="number"
                value={form.sort_order}
                onChange={e => setForm(f => f ? { ...f, sort_order: parseInt(e.target.value) || 0 } : f)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}>
              <input
                type="checkbox"
                id="cat-active"
                checked={form.is_active}
                onChange={e => setForm(f => f ? { ...f, is_active: e.target.checked } : f)}
                style={{ width: 16, height: 16, cursor: 'pointer' }}
              />
              <label htmlFor="cat-active" style={{ fontSize: 13, cursor: 'pointer', color: 'var(--admin-fg)' }}>
                Active (visible in shop)
              </label>
            </div>
          </div>
          {error && (
            <p style={{ margin: '0 20px 12px', color: '#b91c1c', fontSize: 13 }}>{error}</p>
          )}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button style={btnSecondary} onClick={closeForm} disabled={saving}>Cancel</button>
            <button style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </div>
      )}

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : rows.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No categories yet. Add one above.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
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
                    <button
                      onClick={() => handleToggleActive(cat)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      title={cat.is_active ? 'Click to deactivate' : 'Click to activate'}
                    >
                      <span className={`admin-badge ${cat.is_active ? 'badge-done' : 'badge-cancelled'}`}>
                        {cat.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button style={btnEdit} onClick={() => openEdit(cat)}>Edit</button>
                      <button
                        style={{ ...btnDanger, opacity: deleting === cat.id ? 0.6 : 1 }}
                        onClick={() => handleDelete(cat.id)}
                        disabled={deleting === cat.id}
                      >
                        {deleting === cat.id ? '…' : 'Delete'}
                      </button>
                    </div>
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
