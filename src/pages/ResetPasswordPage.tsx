import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { seo } from '../config/site';

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="rp-page">
        <div className="container">
          <div className="rp-box">
            <h1 className="rp-title">Invalid Link</h1>
            <p className="rp-desc">This password reset link is invalid or has expired.</p>
            <Link to="/" className="btn btn--gold btn--md">Go to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      setDone(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e?.message ?? 'Failed to reset password. The link may have expired.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <title>{`Reset Password | ${seo.title}`}</title>
      <div className="rp-page">
        <div className="container">
          <div className="rp-box">
            {done ? (
              <>
                <div className="rp-success-icon" aria-hidden="true">✓</div>
                <h1 className="rp-title">Password Updated</h1>
                <p className="rp-desc">Your password has been updated. Redirecting you home…</p>
              </>
            ) : (
              <>
                <h1 className="rp-title">Set New Password</h1>
                <p className="rp-desc">Enter your new password below.</p>
                <form onSubmit={handleSubmit} className="rp-form" noValidate>
                  {error && <p className="rp-error" role="alert">{error}</p>}
                  <div className="rp-field">
                    <label htmlFor="rp-pw" className="rp-label">New Password</label>
                    <input
                      id="rp-pw"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="rp-input"
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="rp-field">
                    <label htmlFor="rp-pw2" className="rp-label">Confirm Password</label>
                    <input
                      id="rp-pw2"
                      type="password"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      className="rp-input"
                      required
                      placeholder="Repeat your new password"
                      autoComplete="new-password"
                    />
                  </div>
                  <button type="submit" disabled={busy} className="btn btn--gold btn--md rp-submit">
                    {busy ? 'Saving…' : 'Set New Password'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
