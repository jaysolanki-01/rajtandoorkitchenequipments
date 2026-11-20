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
  const [urlInput, setUrlInput] = useState('');
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
    // Ensure images array always includes the cover image
    let images = p.images ?? [];
    if (p.image && !images.includes(p.image)) {
      images = [p.image, ...images];
    }
    setEditing({ ...p, images });
    setIsNew(false);
    setError('');
    setUrlInput('');
  }

  function closeModal() { setEditing(null); setError(''); setUrlInput(''); }

  function set(field: string, value: unknown) {
    setEditing(prev => prev ? { ...prev, [field]: value } : prev);
  }

  function setCover(url: string) {
    setEditing(prev => prev ? { ...prev, image: url } : prev);
  }

  function removeImage(url: string) {
    setEditing(prev => {
      if (!prev) return prev;
      const newImages = (prev.images ?? []).filter(u => u !== url);
      const newCover = prev.image === url ? (newImages[0] ?? '') : prev.image;
      return { ...prev, images: newImages, image: newCover };
    });
  }

  function addImageUrl(url: string) {
    const trimmed = url.trim();
    if (!trimmed || !editing) return;
    const current = editing.images ?? [];
    if (current.includes(trimmed)) { setUrlInput(''); return; }
    const newImages = [...current, trimmed];
    setEditing(prev => prev ? { ...prev, images: newImages, image: prev.image || trimmed } : prev);
    setUrlInput('');
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length || !editing) return;
    setUploadingImage(true);
    setError('');
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadProductImage(file, editing.id ?? 'tmp');
        urls.push(url);
      }
      setEditing(prev => {
        if (!prev) return prev;
        const newImages = [...(prev.images ?? []), ...urls];
        return { ...prev, images: newImages, image: prev.image || urls[0] };
      });
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
            <FieldRow label="Price Label (when no price)">
              <input style={inp} value={editing.price_label ?? ''} onChange={e => set('price_label', e.target.value || null)} placeholder="e.g. Contact for Pricing" />
            </FieldRow>
          </div>

          <FieldRow label="Short description">
            <input style={inp} value={editing.short_description ?? ''} onChange={e => set('short_description', e.target.value)} placeholder="One-line summary" />
          </FieldRow>

          <FieldRow label="Full description">
            <textarea style={{ ...inp, resize: 'vertical' }} rows={4} value={editing.description ?? ''} onChange={e => set('description', e.target.value)} placeholder="Detailed product description…" />
          </FieldRow>

          {/* ── Key Features ── */}
          <FieldRow label="Key Features (shown on Features tab)">
            {(editing.features ?? []).map((feat, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  style={{ ...inp, flex: 1 }}
                  value={feat}
                  onChange={e => {
                    const updated = [...(editing.features ?? [])];
                    updated[i] = e.target.value;
                    set('features', updated);
                  }}
                  placeholder={`Feature ${i + 1}, e.g. SS 304 grade body`}
                />
                <button type="button"
                  onClick={() => set('features', (editing.features ?? []).filter((_, j) => j !== i))}
                  style={{ padding: '7px 10px', border: '1px solid #fee2e2', borderRadius: 6, background: 'transparent', color: 'var(--admin-red)', cursor: 'pointer', fontSize: 13, flexShrink: 0 }}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button"
              onClick={() => set('features', [...(editing.features ?? []), ''])}
              style={{ padding: '7px 14px', border: '1px dashed var(--admin-border)', borderRadius: 6, background: 'transparent', color: 'var(--admin-fg-muted)', fontSize: 12, cursor: 'pointer' }}>
              + Add Feature
            </button>
          </FieldRow>

          {/* ── Specifications ── */}
          <FieldRow label="Specifications (shown on Specs & Dimensions tabs)">
            {(editing.specs ?? []).length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, marginBottom: 6, paddingLeft: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--admin-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Label</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--admin-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</span>
                <span />
              </div>
            )}
            {(editing.specs ?? []).map((spec, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, marginBottom: 8 }}>
                <input
                  style={inp}
                  value={spec.label}
                  onChange={e => {
                    const updated = [...(editing.specs ?? [])];
                    updated[i] = { ...updated[i], label: e.target.value };
                    set('specs', updated);
                  }}
                  placeholder="e.g. Material"
                />
                <input
                  style={inp}
                  value={spec.value}
                  onChange={e => {
                    const updated = [...(editing.specs ?? [])];
                    updated[i] = { ...updated[i], value: e.target.value };
                    set('specs', updated);
                  }}
                  placeholder="e.g. SS 304 Stainless Steel"
                />
                <button type="button"
                  onClick={() => set('specs', (editing.specs ?? []).filter((_, j) => j !== i))}
                  style={{ padding: '7px 8px', border: '1px solid #fee2e2', borderRadius: 6, background: 'transparent', color: 'var(--admin-red)', cursor: 'pointer', fontSize: 13 }}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button"
              onClick={() => set('specs', [...(editing.specs ?? []), { label: '', value: '' }])}
              style={{ padding: '7px 14px', border: '1px dashed var(--admin-border)', borderRadius: 6, background: 'transparent', color: 'var(--admin-fg-muted)', fontSize: 12, cursor: 'pointer' }}>
              + Add Specification Row
            </button>
          </FieldRow>

          <FieldRow label="Product Images">
            {/* Thumbnail grid */}
            {(editing.images?.length ?? 0) > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 10, marginBottom: 12 }}>
                {editing.images!.map((url, i) => {
                  const isCover = url === editing.image;
                  return (
                    <div key={url + i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: `2px solid ${isCover ? '#b8912a' : 'var(--admin-border)'}`, aspectRatio: '1', background: '#111' }}>
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      {isCover ? (
                        <span style={{ position: 'absolute', top: 4, left: 4, background: '#b8912a', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em' }}>COVER</span>
                      ) : (
                        <button title="Set as cover image" onClick={() => setCover(url)}
                          style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,0.65)', border: 'none', borderRadius: 4, padding: '2px 5px', cursor: 'pointer', color: '#facc15', fontSize: 12, lineHeight: 1 }}>
                          ★
                        </button>
                      )}
                      <button title="Remove image" onClick={() => removeImage(url)}
                        style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.65)', border: 'none', borderRadius: 4, padding: '2px 5px', cursor: 'pointer', color: '#fff', fontSize: 11, lineHeight: 1 }}>
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {/* Upload button */}
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="button" disabled={uploadingImage} onClick={() => fileRef.current?.click()}
                style={{ padding: '7px 14px', border: '1px solid var(--admin-border)', borderRadius: 6, background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 12, cursor: uploadingImage ? 'not-allowed' : 'pointer', opacity: uploadingImage ? 0.7 : 1 }}>
                {uploadingImage ? 'Uploading…' : '+ Add Images'}
              </button>
              <span style={{ fontSize: 11, color: 'var(--admin-fg-muted)' }}>
                {(editing.images?.length ?? 0) > 0 ? 'Click ★ to set cover · ✕ to remove' : 'JPEG / PNG / WebP, max 10 MB each. First image becomes cover.'}
              </span>
            </div>
            {/* URL paste input */}
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <input
                style={{ ...inp, flex: 1, fontSize: 12 }}
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="Or paste an image URL and press Add URL"
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(urlInput); } }}
              />
              <button type="button" onClick={() => addImageUrl(urlInput)}
                style={{ padding: '7px 12px', border: '1px solid var(--admin-border)', borderRadius: 6, background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Add URL
              </button>
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
