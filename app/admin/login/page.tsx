'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/store/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAdmin, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already logged in as admin → go to dashboard
  useEffect(() => {
    if (!isLoading && isAdmin) router.replace('/admin');
  }, [isAdmin, isLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      // isAdmin will flip after onAuthStateChange; useEffect above redirects
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return null;
  if (isAdmin) return null;

  return (
    <>
      <title>Admin Login | Raj Tandoor</title>
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#1c1b18', padding: '24px',
      }}>
        <div style={{
          width: '100%', maxWidth: 400, background: '#2a2926',
          borderRadius: 12, padding: '36px 32px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8c76a', marginBottom: 6 }}>
              Raj Tandoor
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>Admin Sign In</h1>
            <p style={{ fontSize: 13, color: '#9a9890', marginTop: 6 }}>Access restricted to authorised administrators.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#c8c5bc', marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.12)',
                  background: '#1c1b18', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#c8c5bc', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.12)',
                  background: '#1c1b18', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: '#f87171', background: 'rgba(248,113,113,0.1)', padding: '10px 12px', borderRadius: 6, margin: 0 }}>
                {error.includes('Invalid') || error.includes('credentials')
                  ? 'Invalid email or password.'
                  : error.includes('Email not confirmed')
                  ? 'Please confirm your email first.'
                  : 'Sign in failed. Check your credentials.'}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '11px', borderRadius: 7, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                background: '#e8c76a', color: '#1c1b18', fontSize: 14, fontWeight: 700,
                opacity: submitting ? 0.7 : 1, marginTop: 4,
              }}
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p style={{ fontSize: 11, color: '#5a5856', textAlign: 'center', marginTop: 24 }}>
            Not an admin? <a href="/" style={{ color: '#7a7870', textDecoration: 'underline' }}>Return to website</a>
          </p>
        </div>
      </div>
    </>
  );
}
