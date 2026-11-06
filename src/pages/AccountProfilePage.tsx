import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { api, ApiError } from '../api/client';

export function AccountProfilePage() {
  const { isLoggedIn, isLoading, user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => { setName(user?.name ?? ''); setPhone(user?.phone ?? ''); }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const payload: Record<string, string> = { name: name.trim(), phone: phone.trim() };
      if (newPw) { payload.currentPassword = curPw; payload.newPassword = newPw; }
      await api.patch('/account/profile', payload);
      setMsg({ type: 'success', text: 'Profile updated successfully.' });
      setCurPw(''); setNewPw('');
    } catch (err) {
      setMsg({ type: 'error', text: err instanceof ApiError ? err.message : 'Update failed.' });
    } finally {
      setSaving(false);
    }
  }

  if (!isLoading && !isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <title>{`Profile | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="account-layout">
            <AccountNav />
            <div className="account-content">
              <h1 className="page-h1">My Profile</h1>
              {msg && <div className={`form-status form-status--${msg.type === 'success' ? 'success' : 'error'}`} role="alert">{msg.text}</div>}
              <form className="contact-form" onSubmit={handleSave} noValidate style={{ maxWidth: 560 }}>
                <div className="form-field">
                  <label htmlFor="prof-name" className="form-label">Full Name</label>
                  <input id="prof-name" type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
                </div>
                <div className="form-field">
                  <label htmlFor="prof-email" className="form-label">Email Address</label>
                  <input id="prof-email" type="email" className="form-input" value={user?.email ?? ''} disabled aria-describedby="prof-email-note" />
                  <span id="prof-email-note" style={{ fontSize: '0.8rem', color: 'var(--rt-border)' }}>Email cannot be changed here.</span>
                </div>
                <div className="form-field">
                  <label htmlFor="prof-phone" className="form-label">Phone Number</label>
                  <input id="prof-phone" type="tel" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
                </div>

                <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 700 }}>Change Password <span style={{ fontWeight: 400, fontSize: '0.85rem', color: 'var(--rt-border)' }}>(leave blank to keep current)</span></h2>
                <div className="form-field">
                  <label htmlFor="prof-cur-pw" className="form-label">Current Password</label>
                  <input id="prof-cur-pw" type="password" className="form-input" value={curPw} onChange={e => setCurPw(e.target.value)} autoComplete="current-password" />
                </div>
                <div className="form-field">
                  <label htmlFor="prof-new-pw" className="form-label">New Password</label>
                  <input id="prof-new-pw" type="password" className="form-input" value={newPw} onChange={e => setNewPw(e.target.value)} autoComplete="new-password" placeholder="Min. 8 characters" />
                </div>

                <button type="submit" className="btn btn--gold" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
