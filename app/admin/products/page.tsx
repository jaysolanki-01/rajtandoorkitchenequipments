'use client';
import { useEffect, useState, useRef } from 'react';
import {
  fetchAdminProducts, createProduct, updateProduct, deleteProduct, uploadProductImage,
  type AdminProduct,
} from '../../../src/lib/supabase/admin';
import { CATEGORIES } from '../../../src/config/categories';

const EMPTY: Omit<AdminProduct, 'created_at' | 'updated_at'> = {
  id: '', slug: '', name: '', category: '', category_label: '', short_description: '',
  description: '', image: '', images: [], price: null, currency: 'INR', specs: [],
  features: [], is_demo: false, in_stock: true, price_label: null, group_id: null,
  warranty: null, tags: null,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function fmt(n: number | null) {
  return n != null ? `₹${n.toLocaleString('en-IN')}` : '—';
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Partial<Omit<AdminProduct, 'created_at' | 'updated_at'>> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAdminProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  function openNew() {
    setEditing({ ...EMPTY, id: crypto.randomUUID() });
    setIsNew(true);
    setError('');
  }

  function openEdit(p: AdminProduct) {
    setEditing({ ...p });
    setIsNew(false);
    setError('');
  }

  function closeModal() { setEditing(null); setError(''); }

  function set(field: string, value: unknown) {
    setEditing(prev => prev ? { ...prev, [field]: value } : prev);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadProductImage(file, editing.id ?? 'tmp');
      set('image', url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.name?.trim()) { setError('Name is required.'); return; }
    if (!editing.slug?.trim()) { setError('Slug is required.'); return; }
    if (!editing.category?.trim()) { setError('Category is required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        const created = await createProduct(editing as Omit<AdminProduct, 'created_at' | 'updated_at'>);
        setProducts(prev => [created, ...prev]);
      } else {
        const { id, ...rest } = editing as AdminProduct;
        await updateProduct(id, rest);
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...editing } as AdminProduct : p));
      }
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <title>Products | Admin</title>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="search" placeholder="Search products…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inp, flex: '1 1 240px', maxWidth: 320 }}
        />
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--admin-fg-muted)', alignSelf: 'center' }}>
          {loading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
        </span>
        <button
          onClick={openNew}
          style={{ padding: '9px 18px', background: 'var(--admin-accent)', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + New Product
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No products found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      {p.image && (
                        <img src={p.image} alt="" width={40} height={40}
                          style={{ objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: '1px solid var(--admin-border)' }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                        <div className="admin-mono" style={{ marginTop: 2 }}>{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{p.category_label || p.category.replace(/-/g, ' ')}</td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{fmt(p.price)}</td>
                  <td>
                    <span className={`admin-badge ${p.in_stock ? 'badge-done' : 'badge-cancelled'}`}>
                      {p.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => openEdit(p)}
                        style={{ padding: '5px 12px', border: '1px solid var(--admin-border)', borderRadius: 5, background: 'transparent', color: 'var(--admin-fg)', fontSize: 12, cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        disabled={deleting === p.id}
                        onClick={() => handleDelete(p.id)}
                        style={{ padding: '5px 12px', border: '1px solid #fee2e2', borderRadius: 5, background: 'transparent', color: 'var(--admin-red)', fontSize: 12, cursor: 'pointer' }}
                      >
                        {deleting === p.id ? '…' : 'Delete'}
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
        <Modal title={isNew ? 'New Product' : `Edit: ${editing.name || '—'}`} onClose={closeModal}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <FieldRow label="Product Name *">
              <input style={inp} value={editing.name ?? ''} onChange={e => { set('name', e.target.value); if (isNew) set('slug', slugify(e.target.value)); }} placeholder="e.g. Clay Tandoor 24 inch" />
            </FieldRow>
            <FieldRow label="Slug *">
              <input style={inp} value={editing.slug ?? ''} onChange={e => set('slug', slugify(e.target.value))} placeholder="auto-generated" />
            </FieldRow>
            <FieldRow label="Category *">
              <select
                style={inp}
                value={editing.category ?? ''}
                onChange={e => {
                  const cat = CATEGORIES.find(c => c.slug === e.target.value);
                  setEditing(prev => prev ? { ...prev, category: cat?.slug ?? '', category_label: cat?.name ?? '' } : prev);
                }}
              >
                <option value="">— Select a category —</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </FieldRow>
            <FieldRow label="Price (₹, leave blank = on request)">
              <input style={inp} type="number" min={0} value={editing.price ?? ''} onChange={e => set('price', e.target.value === '' ? null : Number(e.target.value))} placeholder="Leave blank for enquiry" />
            </FieldRow>
            <FieldRow label="Warranty">
              <input style={inp} value={editing.warranty ?? ''} onChange={e => set('warranty', e.target.value)} placeholder="e.g. 1 Year" />
            </FieldRow>
          </div>

          <FieldRow label="Short description">
            <input style={inp} value={editing.short_description ?? ''} onChange={e => set('short_description', e.target.value)} placeholder="One-line summary" />
          </FieldRow>

          <FieldRow label="Full description">
            <textarea style={{ ...inp, resize: 'vertical' }} rows={4} value={editing.description ?? ''} onChange={e => set('description', e.target.value)} placeholder="Detailed product description…" />
          </FieldRow>

          <FieldRow label="Product Image URL (or upload below)">
            <div style={{ display: 'flex', gap: 8 }}>
              <input style={{ ...inp, flex: 1 }} value={editing.image ?? ''} onChange={e => set('image', e.target.value)} placeholder="https://…" />
              {editing.image && (
                <img src={editing.image} alt="" width={40} height={40} style={{ objectFit: 'cover', borderRadius: 5, border: '1px solid var(--admin-border)', flexShrink: 0 }} />
              )}
            </div>
          </FieldRow>

          <FieldRow label="Upload image">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              <button
                type="button"
                disabled={uploadingImage}
                onClick={() => fileRef.current?.click()}
                style={{ padding: '7px 14px', border: '1px solid var(--admin-border)', borderRadius: 6, background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 12, cursor: 'pointer' }}
              >
                {uploadingImage ? 'Uploading…' : 'Choose file'}
              </button>
              <span style={{ fontSize: 11, color: 'var(--admin-fg-muted)' }}>JPEG, PNG or WebP, max 5 MB</span>
            </div>
          </FieldRow>

          <div style={{ display: 'flex', gap: 20 }}>
            <FieldRow label="In stock">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={editing.in_stock ?? true} onChange={e => set('in_stock', e.target.checked)} />
                <span style={{ fontSize: 13, color: 'var(--admin-fg)' }}>Available for order</span>
              </label>
            </FieldRow>
            <FieldRow label="Demo only">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={editing.is_demo ?? false} onChange={e => set('is_demo', e.target.checked)} />
                <span style={{ fontSize: 13, color: 'var(--admin-fg)' }}>Hidden from customers</span>
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
              {saving ? 'Saving…' : isNew ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
