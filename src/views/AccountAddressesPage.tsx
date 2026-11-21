'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserAddresses, saveUserAddress, deleteUserAddress, type UserAddress } from '../lib/supabase/db';

const blankForm = { label: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', country: 'India', is_default: false };

export function AccountAddressesPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [fetching, setFetching] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => fetchUserAddresses().then(setAddresses).catch(() => {}).finally(() => setFetching(false));
  useEffect(() => { if (isLoggedIn) load(); }, [isLoggedIn]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Full name is required.'); return; }
    if (!form.line1.trim()) { setError('Address line 1 is required.'); return; }
    if (!form.city.trim() || !form.state.trim() || !form.pincode.trim()) { setError('City, state and PIN code are required.'); return; }
    setSaving(true);
    try {
      await saveUserAddress(form);
      setAdding(false);
      setForm(blankForm);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save address. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this address?')) return;
    await deleteUserAddress(id).catch(() => {});
    load();
  }

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  return (
    <>
      <title>{`Addresses | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">
              <div className="acct-subhdr" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <Link href="/account" className="acct-subhdr__back">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                    Overview
                  </Link>
                  <h1 className="acct-subhdr__title">Delivery Addresses</h1>
                </div>
                <button
                  className={`btn btn--sm ${adding ? 'btn--outline' : 'btn--gold'}`}
                  onClick={() => { setAdding(v => !v); setError(''); setForm(blankForm); }}
                >
                  {adding ? 'Cancel' : '+ Add Address'}
                </button>
              </div>

              {/* Add address form */}
              {adding && (
                <div className="acct-section">
                  <h2 className="acct-section__title" style={{ marginBottom: '1.25rem' }}>New Address</h2>
                  {error && <div className="form-status form-status--error" role="alert" style={{ marginBottom: '1rem' }}>{error}</div>}
                  <form className="contact-form" onSubmit={handleSave} noValidate>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">Label</label>
                        <input type="text" className="form-input" value={form.label} onChange={set('label')} placeholder="Home, Office…" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-input" required value={form.name} onChange={set('name')} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Address Line 1 *</label>
                      <input type="text" className="form-input" required value={form.line1} onChange={set('line1')} placeholder="House / flat / building" />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Address Line 2 <span style={{ fontWeight: 400, color: 'var(--rt-text2)', fontSize: '0.8rem' }}>(optional)</span></label>
                      <input type="text" className="form-input" value={form.line2} onChange={set('line2')} placeholder="Area / locality / landmark" />
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">City *</label>
                        <input type="text" className="form-input" required value={form.city} onChange={set('city')} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">State *</label>
                        <input type="text" className="form-input" required value={form.state} onChange={set('state')} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">PIN Code *</label>
                        <input type="text" className="form-input" required value={form.pincode} onChange={set('pincode')} placeholder="6-digit PIN" pattern="\d{6}" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Phone <span style={{ fontWeight: 400, color: 'var(--rt-text2)', fontSize: '0.8rem' }}>(optional)</span></label>
                        <input type="tel" className="form-input" value={form.phone} onChange={set('phone')} placeholder="+91 00000 00000" />
                      </div>
                    </div>
                    <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input type="checkbox" checked={form.is_default} onChange={e => setForm(f => ({ ...f, is_default: e.target.checked }))} />
                      Set as my default delivery address
                    </label>
                    <button type="submit" className="btn btn--gold" disabled={saving}>
                      {saving ? 'Saving…' : 'Save Address'}
                    </button>
                  </form>
                </div>
              )}

              {/* Address cards */}
              <div className="acct-section">
                {fetching ? (
                  <p style={{ color: 'var(--rt-text2)' }}>Loading addresses…</p>
                ) : addresses.length === 0 ? (
                  <div className="acct-empty">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--rt-gold)', opacity: 0.5 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p>No addresses saved yet.</p>
                    {!adding && <button className="btn btn--gold btn--sm" onClick={() => setAdding(true)}>Add Your First Address</button>}
                  </div>
                ) : (
                  <div className="acct-addr-grid">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`acct-addr-card${addr.is_default ? ' acct-addr-card--default' : ''}`}>
                        {addr.is_default && <p className="acct-addr-card__badge">Default</p>}
                        <p className="acct-addr-card__label">{addr.label}</p>
                        <p className="acct-addr-card__name">{addr.name}</p>
                        <p className="acct-addr-card__lines">
                          {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                          {addr.city}, {addr.state} — {addr.pincode}<br />
                          {addr.country}
                          {addr.phone && <><br />{addr.phone}</>}
                        </p>
                        <div className="acct-addr-card__actions">
                          <button className="btn btn--outline btn--sm" onClick={() => handleDelete(addr.id)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
