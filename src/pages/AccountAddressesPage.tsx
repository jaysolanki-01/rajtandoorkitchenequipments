import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { api, ApiError } from '../api/client';

interface Address { id: number; label: string; name: string; phone: string | null; line1: string; line2: string | null; city: string; state: string; pincode: string; country: string; is_default: number }

const blankForm = { label: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', country: 'India', isDefault: false };

export function AccountAddressesPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => api.get<Address[]>('/account/addresses').then(setAddresses).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { if (isLoggedIn) load(); }, [isLoggedIn]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.post('/account/addresses', form);
      setAdding(false);
      setForm(blankForm);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save address.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Remove this address?')) return;
    await api.delete(`/account/addresses/${id}`).catch(() => {});
    load();
  }

  if (!isLoading && !isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <title>{`Addresses | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="account-layout">
            <AccountNav />
            <div className="account-content">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h1 className="page-h1" style={{ margin: 0 }}>Addresses</h1>
                <button className="btn btn--gold btn--sm" onClick={() => setAdding(v => !v)}>{adding ? 'Cancel' : '+ Add Address'}</button>
              </div>

              {adding && (
                <form className="contact-form" onSubmit={handleSave} noValidate style={{ maxWidth: 560, marginBottom: '2rem', border: '1px solid var(--rt-border)', borderRadius: 8, padding: '1.5rem' }}>
                  <h2 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700 }}>New Address</h2>
                  {error && <div className="form-status form-status--error" role="alert">{error}</div>}
                  <div className="form-row">
                    <div className="form-field"><label className="form-label">Label</label><input type="text" className="form-input" value={form.label} onChange={set('label')} placeholder="Home, Office, etc." /></div>
                    <div className="form-field"><label className="form-label">Full Name *</label><input type="text" className="form-input" required value={form.name} onChange={set('name')} /></div>
                  </div>
                  <div className="form-field"><label className="form-label">Address Line 1 *</label><input type="text" className="form-input" required value={form.line1} onChange={set('line1')} /></div>
                  <div className="form-field"><label className="form-label">Address Line 2</label><input type="text" className="form-input" value={form.line2} onChange={set('line2')} /></div>
                  <div className="form-row">
                    <div className="form-field"><label className="form-label">City *</label><input type="text" className="form-input" required value={form.city} onChange={set('city')} /></div>
                    <div className="form-field"><label className="form-label">State *</label><input type="text" className="form-input" required value={form.state} onChange={set('state')} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-field"><label className="form-label">PIN Code *</label><input type="text" className="form-input" required value={form.pincode} onChange={set('pincode')} pattern="\d{6}" /></div>
                    <div className="form-field"><label className="form-label">Phone</label><input type="tel" className="form-input" value={form.phone} onChange={set('phone')} /></div>
                  </div>
                  <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))} />
                    Set as default address
                  </label>
                  <button type="submit" className="btn btn--gold" disabled={saving}>{saving ? 'Saving…' : 'Save Address'}</button>
                </form>
              )}

              {loading ? <p>Loading addresses…</p> : addresses.length === 0 && !adding ? (
                <div className="empty-state"><p>No addresses saved yet.</p></div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {addresses.map(addr => (
                    <div key={addr.id} className="address-card" style={{ border: addr.is_default ? '2px solid var(--rt-gold)' : '1px solid var(--rt-border)', borderRadius: 8, padding: '1.25rem' }}>
                      {addr.is_default && <span style={{ fontSize: '0.75rem', color: 'var(--rt-gold)', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>DEFAULT</span>}
                      <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{addr.label} — {addr.name}</p>
                      <p style={{ color: 'var(--rt-charcoal)', opacity: 0.7, lineHeight: 1.5 }}>
                        {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                        {addr.city}, {addr.state} — {addr.pincode}<br />
                        {addr.country}
                      </p>
                      <button className="btn btn--outline btn--sm" style={{ marginTop: '0.75rem' }} onClick={() => handleDelete(addr.id)}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
