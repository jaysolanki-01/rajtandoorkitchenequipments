'use client';
import { useEffect, useState, useRef } from 'react';
import {
  fetchAdminCategories, createCategory, updateCategory, deleteCategory, uploadCategoryImage,
  type AdminCategory,
} from '../../../src/lib/supabase/admin';

const EMPTY: Omit<AdminCategory, 'created_at' | 'updated_at'> = {
  id: '', slug: '', name: '', description: null, image: null, sort_order: 0, is_active: true,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto',
    }}>
      <div style={{
        background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 12,
        width: '100%', maxWidth: 680, padding: '28px 32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--admin-fg)', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--admin-fg-muted)', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--admin-fg-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
      {children}
    </div>
  );
}

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid var(--admin-border)',
  background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 13, boxSizing: 'border-box',
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Omit<AdminCategory, 'created_at' | 'updated_at'>> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAdminCategories().then(setCategories).finally(() => setLoading(false));
  }, []);

  function openNew() {
    const maxSort = categories.reduce((m, c) => Math.max(m, c.sort_order), 0);
    setEditing({ ...EMPTY, id: crypto.randomUUID(), sort_order: maxSort + 1 });
    setIsNew(true);
    setError('');
    setUrlInput('');
  }

  function openEdit(c: AdminCategory) {
    setEditing({ ...c });
    setIsNew(false);
    setError('');
    setUrlInput('');
  }

  function closeModal() { setEditing(null); setError(''); setUrlInput(''); }

  function set(field: string, value: unknown) {
    setEditing(prev => prev ? { ...prev, [field]: value } : prev);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingImage(true);
    setError('');
    try {
      const url = await uploadCategoryImage(file, editing.slug || editing.id || 'tmp');
      set('image', url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingImage(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.name?.trim()) { setError('Name is required.'); return; }
    if (!editing.slug?.trim()) { setError('Slug is required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        const created = await createCategory(editing as Omit<AdminCategory, 'created_at' | 'updated_at'>);
        setCategories(prev => [...prev, created].sort((a, b) => a.sort_order - b.sort_order));
      } else {
        const { id, ...rest } = editing as AdminCategory;
        await updateCategory(id, rest);
        setCategories(prev =>
          prev.map(c => c.id === id ? { ...c, ...editing } as AdminCategory : c)
            .sort((a, b) => a.sort_order - b.sort_order)
        );
      }
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  }

  async function toggleActive(cat: AdminCategory) {
    try {
      await updateCategory(cat.id, { is_active: !cat.is_active });
      setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, is_active: !c.is_active } : c));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  }

  return (
    <div>
      <title>Categories | Admin</title>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--admin-fg-muted)', alignSelf: 'center' }}>
          {loading ? 'Loading…' : `${categories.length} categor${categories.length !== 1 ? 'ies' : 'y'}`}
        </span>
        <button
          onClick={openNew}
          style={{ padding: '9px 18px', background: 'var(--admin-accent)', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + New Category
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : categories.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No categories found. Click "+ New Category" to add one.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 56 }}>Image</th>
                <th>Category</th>
                <th>Slug</th>
                <th style={{ textAlign: 'center' }}>Sort</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td>
                    {cat.image ? (
                      <img src={cat.image} alt="" width={44} height={44}
                        style={{ objectFit: 'cover', borderRadius: 6, border: '1px solid var(--admin-border)', display: 'block' }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: 6, border: '1px dashed var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--admin-fg-muted)' }}>
                        🖼
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.name}</div>
                    {cat.description && (
                      <div style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 2, maxWidth: 320, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cat.description}
                      </div>
                    )}
                  </td>
                  <td><span className="admin-mono">{cat.slug}</span></td>
                  <td style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>{cat.sort_order}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => toggleActive(cat)}
                      style={{ padding: '4px 10px', border: 'none', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer', background: cat.is_active ? '#d1fae5' : '#fee2e2', color: cat.is_active ? '#065f46' : '#991b1b', letterSpacing: '0.03em' }}
                    >
                      {cat.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => openEdit(cat)}
                        style={{ padding: '5px 12px', border: '1px solid var(--admin-border)', borderRadius: 5, background: 'transparent', color: 'var(--admin-fg)', fontSize: 12, cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        disabled={deleting === cat.id}
                        onClick={() => handleDelete(cat.id, cat.name)}
                        style={{ padding: '5px 12px', border: '1px solid #fee2e2', borderRadius: 5, background: 'transparent', color: 'var(--admin-red)', fontSize: 12, cursor: 'pointer' }}
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

      {editing && (
        <Modal title={isNew ? 'New Category' : `Edit: ${editing.name || '—'}`} onClose={closeModal}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <FieldRow label="Category Name *">
              <input
                style={inp}
                value={editing.name ?? ''}
                onChange={e => {
                  set('name', e.target.value);
                  if (isNew) set('slug', slugify(e.target.value));
                }}
                placeholder="e.g. Tandoor Equipment"
              />
            </FieldRow>
            <FieldRow label="Slug *">
              <input
                style={inp}
                value={editing.slug ?? ''}
                onChange={e => set('slug', slugify(e.target.value))}
                placeholder="auto-generated"
              />
            </FieldRow>
          </div>

          <FieldRow label="Description">
            <textarea
              style={{ ...inp, resize: 'vertical' }}
              rows={3}
              value={editing.description ?? ''}
              onChange={e => set('description', e.target.value || null)}
              placeholder="Short description shown in the shop mega menu…"
            />
          </FieldRow>

          <FieldRow label="Category Image">
            {editing.image && (
              <div style={{ marginBottom: 12, position: 'relative', display: 'inline-block' }}>
                <img src={editing.image} alt="" style={{ height: 120, borderRadius: 8, border: '1px solid var(--admin-border)', objectFit: 'cover', display: 'block', maxWidth: '100%' }} />
                <button
                  type="button"
                  onClick={() => set('image', null)}
                  title="Remove image"
                  style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.65)', border: 'none', borderRadius: 4, padding: '2px 7px', cursor: 'pointer', color: '#fff', fontSize: 12, lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                disabled={uploadingImage}
                onClick={() => fileRef.current?.click()}
                style={{ padding: '7px 14px', border: '1px solid var(--admin-border)', borderRadius: 6, background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 12, cursor: uploadingImage ? 'not-allowed' : 'pointer', opacity: uploadingImage ? 0.7 : 1 }}
              >
                {uploadingImage ? 'Uploading…' : editing.image ? 'Replace Image' : '+ Upload Image'}
              </button>
              <span style={{ fontSize: 11, color: 'var(--admin-fg-muted)' }}>JPEG / PNG / WebP — appears in nav mega menu &amp; shop page</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <input
                style={{ ...inp, flex: 1, fontSize: 12 }}
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="Or paste an image URL and press Set URL"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (urlInput.trim()) { set('image', urlInput.trim()); setUrlInput(''); }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => { if (urlInput.trim()) { set('image', urlInput.trim()); setUrlInput(''); } }}
                style={{ padding: '7px 12px', border: '1px solid var(--admin-border)', borderRadius: 6, background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Set URL
              </button>
            </div>
          </FieldRow>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <FieldRow label="Sort Order">
              <input
                style={inp}
                type="number"
                min={0}
                value={editing.sort_order ?? 0}
                onChange={e => set('sort_order', Number(e.target.value))}
                placeholder="0"
              />
            </FieldRow>
            <FieldRow label="Visibility">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', paddingTop: 10 }}>
                <input type="checkbox" checked={editing.is_active ?? true} onChange={e => set('is_active', e.target.checked)} />
                <span style={{ fontSize: 13, color: 'var(--admin-fg)' }}>Visible on site</span>
              </label>
            </FieldRow>
          </div>

          {error && (
            <p style={{ fontSize: 12, color: 'var(--admin-red)', background: 'rgba(159,18,57,0.08)', padding: '8px 12px', borderRadius: 6, marginBottom: 12 }}>{error}</p>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button onClick={closeModal} style={{ padding: '9px 18px', border: '1px solid var(--admin-border)', borderRadius: 7, background: 'transparent', color: 'var(--admin-fg)', fontSize: 13, cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              style={{ padding: '9px 20px', background: 'var(--admin-accent)', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : isNew ? 'Create Category' : 'Save Changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
