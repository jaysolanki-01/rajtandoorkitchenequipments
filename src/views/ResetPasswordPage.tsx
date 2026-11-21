'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { createClient } from '../lib/supabase/client';

export function ResetPasswordPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw new Error(updateError.message);
      setDone(true);
      setTimeout(() => router.push('/'), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password. The link may have expired.');
    } finally {
      setBusy(false);
    }
  }

  if (isLoading) return null;

  if (!isLoggedIn) {
    return (
      <>
        <title>{`Reset Password | ${seo.title}`}</title>
        <div className="rp-page">
          <div className="container">
            <div className="rp-box">
              <h1 className="rp-title">Invalid Link</h1>
              <p className="rp-desc">This password reset link is invalid or has expired.</p>
              <Link href="/login" className="btn btn--gold btn--md">Back to Login</Link>
            </div>
          </div>
        </div>
      </>
    );
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
