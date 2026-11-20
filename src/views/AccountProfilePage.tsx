'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { updateProfile } from '../lib/supabase/db';

export function AccountProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => { setName(user?.name ?? ''); setPhone(user?.phone ?? ''); }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (newPw && newPw.length < 8) { setMsg({ type: 'error', text: 'New password must be at least 8 characters.' }); return; }
    if (newPw && newPw !== confirmPw) { setMsg({ type: 'error', text: 'Passwords do not match.' }); return; }
    setSaving(true);
    try {
      const payload: { full_name?: string; phone?: string; password?: string } = {
        full_name: name.trim(),
        phone: phone.trim(),
      };
      if (newPw) payload.password = newPw;
      await updateProfile(payload);
      setMsg({ type: 'success', text: 'Profile updated successfully.' });
      setNewPw(''); setConfirmPw('');
    } catch (err) {
      setMsg({ type: 'error', text: err instanceof Error ? err.message : 'Update failed. Please try again.' });
    } finally {
      setSaving(false);
    }
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
      <title>{`My Profile | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">
              <div className="acct-subhdr">
                <Link href="/account" className="acct-subhdr__back">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                  Overview
                </Link>
                <h1 className="acct-subhdr__title">My Profile</h1>
              </div>

              <div className="acct-form-card">
                {msg && (
                  <div className={`form-status form-status--${msg.type === 'success' ? 'success' : 'error'}`} role="alert" style={{ marginBottom: '1.25rem' }}>
                    {msg.text}
                  </div>
                )}
                <form onSubmit={handleSave} noValidate>
                  <p className="acct-form-card__section-title" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>Personal Information</p>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="prof-name" className="form-label">Full Name</label>
                      <input id="prof-name" type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="prof-phone" className="form-label">
                        Phone <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--rt-text2)' }}>(optional)</span>
                      </label>
                      <input id="prof-phone" type="tel" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="prof-email" className="form-label">Email Address</label>
                    <input id="prof-email" type="email" className="form-input" value={user?.email ?? ''} disabled />
                    <span style={{ fontSize: '0.78rem', color: 'var(--rt-text2)', marginTop: '0.3rem', display: 'block' }}>Email cannot be changed from here.</span>
                  </div>

                  <p className="acct-form-card__section-title">Change Password</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--rt-text2)', margin: '-0.5rem 0 1rem' }}>Leave blank to keep your current password.</p>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="prof-new-pw" className="form-label">New Password</label>
                      <input id="prof-new-pw" type="password" className="form-input" value={newPw} onChange={e => setNewPw(e.target.value)} autoComplete="new-password" placeholder="Min. 8 characters" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="prof-confirm-pw" className="form-label">Confirm New Password</label>
                      <input id="prof-confirm-pw" type="password" className="form-input" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} autoComplete="new-password" placeholder="Repeat new password" />
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn--gold" disabled={saving} style={{ minWidth: 140 }}>
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Account details summary */}
              <div className="acct-section" style={{ marginTop: '0.5rem' }}>
                <h2 className="acct-section__title" style={{ marginBottom: '1rem' }}>Account Details</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--rt-text2)', marginBottom: '0.25rem' }}>Name</p>
                    <p style={{ fontWeight: 700, margin: 0 }}>{user?.name ?? '—'}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--rt-text2)', marginBottom: '0.25rem' }}>Email</p>
                    <p style={{ fontWeight: 700, margin: 0, wordBreak: 'break-word' }}>{user?.email ?? '—'}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--rt-text2)', marginBottom: '0.25rem' }}>Phone</p>
                    <p style={{ fontWeight: 700, margin: 0 }}>{user?.phone || '—'}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--rt-text2)', marginBottom: '0.25rem' }}>Account type</p>
                    <p style={{ fontWeight: 700, margin: 0, textTransform: 'capitalize' }}>{user?.role ?? 'Customer'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
