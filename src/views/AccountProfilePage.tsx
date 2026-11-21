'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { updateProfile } from '../lib/supabase/db';

const POLICY_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/return-policy', label: 'Return Policy' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Support' },
];

export function AccountProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete account state
  const [showDeleteZone, setShowDeleteZone] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');

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

  async function handleDeleteAccount() {
    if (deleteText !== 'DELETE') return;
    setDeleting(true);
    setDeleteMsg('');
    try {
      const res = await fetch('/api/account/delete', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Deletion failed.');
      await logout();
      router.push('/?account=deleted');
    } catch (err) {
      setDeleteMsg(err instanceof Error ? err.message : 'Could not delete account. Please contact support.');
      setDeleting(false);
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

  const memberRole = user?.role === 'admin' || user?.role === 'super_admin' ? 'Administrator' : 'Customer';

  return (
    <>
      <title>{`My Profile | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="acct-layout">
            <AccountNav />

            <div className="acct-main">
              {/* Sub-page header */}
              <div className="acct-subhdr">
                <Link href="/account" className="acct-subhdr__back">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                  Overview
                </Link>
                <h1 className="acct-subhdr__title">My Profile</h1>
              </div>

              {/* ── Personal Info + Password ── */}
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
                    <span style={{ fontSize: '0.78rem', color: 'var(--rt-text2)', marginTop: '0.3rem', display: 'block' }}>
                      Email cannot be changed from here. Contact support if needed.
                    </span>
                  </div>

                  <p className="acct-form-card__section-title">Change Password</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--rt-text2)', margin: '-0.4rem 0 1rem' }}>Leave blank to keep your current password.</p>
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

              {/* ── Account Overview ── */}
              <div className="acct-section">
                <div className="acct-section__header">
                  <h2 className="acct-section__title">Account Overview</h2>
                </div>
                <div className="acct-mgmt-grid">
                  <div className="acct-mgmt-card">
                    <span className="acct-mgmt-card__label">Full Name</span>
                    <span className="acct-mgmt-card__val">{user?.name || '—'}</span>
                  </div>
                  <div className="acct-mgmt-card">
                    <span className="acct-mgmt-card__label">Email</span>
                    <span className="acct-mgmt-card__val" style={{ fontSize: '0.82rem', wordBreak: 'break-word' }}>{user?.email || '—'}</span>
                  </div>
                  <div className="acct-mgmt-card">
                    <span className="acct-mgmt-card__label">Phone</span>
                    <span className="acct-mgmt-card__val">{user?.phone || '—'}</span>
                  </div>
                  <div className="acct-mgmt-card">
                    <span className="acct-mgmt-card__label">Account Type</span>
                    <span className="acct-mgmt-card__val">{memberRole}</span>
                    <span className="acct-mgmt-card__sub">Raj Tandoor Account</span>
                  </div>
                </div>
              </div>

              {/* ── Account Security ── */}
              <div className="acct-section">
                <div className="acct-section__header">
                  <h2 className="acct-section__title">Security</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1rem', border: '1px solid var(--rt-border)', borderRadius: 10, flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', margin: '0 0 0.15rem' }}>Password</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--rt-text2)', margin: 0 }}>Use a strong password with 8+ characters, numbers and symbols.</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => { document.getElementById('prof-new-pw')?.focus(); document.getElementById('prof-new-pw')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                    >
                      Change Password
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1rem', border: '1px solid var(--rt-border)', borderRadius: 10, flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', margin: '0 0 0.15rem' }}>Forgot your password?</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--rt-text2)', margin: 0 }}>Receive a reset link at your registered email address.</p>
                    </div>
                    <Link href="/reset-password" className="btn btn--outline btn--sm">Reset Password</Link>
                  </div>
                </div>
              </div>

              {/* ── Policies & Legal ── */}
              <div className="acct-policy-links">
                <p className="acct-policy-links__title">Policies & Legal</p>
                <div className="acct-policy-links__grid">
                  {POLICY_LINKS.map(p => (
                    <Link key={p.href} href={p.href} className="acct-policy-link">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Danger Zone ── */}
              <div className="acct-danger-zone">
                <h2 className="acct-danger-zone__title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '0.4rem' }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Danger Zone
                </h2>
                <p className="acct-danger-zone__desc">
                  Deleting your account is permanent and cannot be undone. All your saved addresses, order history
                  and wishlist will be removed. This action cannot be reversed.
                </p>
                {!showDeleteZone ? (
                  <button type="button" className="btn btn--outline btn--sm" style={{ borderColor: 'var(--rt-error)', color: 'var(--rt-error)' }} onClick={() => setShowDeleteZone(true)}>
                    Delete My Account
                  </button>
                ) : (
                  <div className="acct-danger-confirm">
                    {deleteMsg && (
                      <div className="form-status form-status--error" role="alert">{deleteMsg}</div>
                    )}
                    <label>
                      Type <strong>DELETE</strong> to confirm account deletion:
                      <input
                        type="text"
                        className="form-input"
                        style={{ marginTop: '0.4rem' }}
                        value={deleteText}
                        onChange={e => setDeleteText(e.target.value)}
                        placeholder="Type DELETE"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn--danger"
                        disabled={deleteText !== 'DELETE' || deleting}
                        onClick={handleDeleteAccount}
                      >
                        {deleting ? 'Deleting…' : 'Permanently Delete Account'}
                      </button>
                      <button type="button" className="btn btn--outline btn--sm" onClick={() => { setShowDeleteZone(false); setDeleteText(''); setDeleteMsg(''); }}>
                        Cancel
                      </button>
                    </div>
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
