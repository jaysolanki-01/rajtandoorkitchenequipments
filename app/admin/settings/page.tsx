'use client';
import { useState } from 'react';
import { useAdminAuth } from '../../../src/store/AdminAuthContext';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const { user, logout } = useAdminAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showDevNotes, setShowDevNotes] = useState(false);

  const isSuperAdmin = user?.role === 'super_admin';

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleSignOut() {
    logout();
    router.replace('/admin/login');
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <title>Settings | Admin</title>

      {/* Account */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--admin-fg-muted)' }}>Account</span>
            <span className={`admin-badge ${isSuperAdmin ? 'badge-processing' : 'badge-confirmed'}`}>
              {isSuperAdmin ? 'Super Admin' : 'Admin'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>Email</span>
              <span style={{ fontSize: 13, color: 'var(--admin-fg)', fontWeight: 500 }}>{user?.email ?? '—'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>User ID</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="admin-mono" style={{ fontSize: 11 }}>{user?.id ? `${user.id.slice(0, 8)}…` : '—'}</span>
                {user?.id && (
                  <button
                    onClick={() => copy(user.id)}
                    style={{ fontSize: 11, padding: '2px 8px', border: '1px solid var(--admin-border)', borderRadius: 4, background: 'transparent', color: 'var(--admin-fg-muted)', cursor: 'pointer' }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            style={{ marginTop: 4, padding: '8px 16px', border: '1px solid var(--admin-border)', borderRadius: 7, background: 'transparent', color: 'var(--admin-fg-muted)', fontSize: 13, cursor: 'pointer', textAlign: 'left', width: 'fit-content' }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--admin-fg-muted)', marginBottom: 2 }}>Quick Links</span>
          {[
            { label: 'Supabase Dashboard', url: 'https://supabase.com/dashboard' },
            { label: 'Vercel Dashboard', url: 'https://vercel.com/dashboard' },
            { label: 'View Live Site', url: '/' },
          ].map(link => (
            <a
              key={link.url}
              href={link.url}
              target={link.url.startsWith('/') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--admin-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ↗ {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Developer notes — collapsed */}
      <button
        onClick={() => setShowDevNotes(o => !o)}
        style={{ fontSize: 12, color: 'var(--admin-fg-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <span style={{ fontSize: 10, transform: showDevNotes ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.15s' }}>▶</span>
        Developer notes
      </button>

      {showDevNotes && (
        <div className="admin-card" style={{ marginTop: 10 }}>
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-fg)', marginBottom: 6 }}>Adding Admin Users</p>
              <p style={{ fontSize: 12, color: 'var(--admin-fg-muted)', lineHeight: 1.6, margin: 0 }}>
                Supabase Dashboard → Authentication → Users → find user → User Metadata:
              </p>
              <pre style={{ background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 6, padding: '8px 12px', fontSize: 11, fontFamily: 'monospace', marginTop: 8, overflowX: 'auto', color: 'var(--admin-fg)', margin: '8px 0 0' }}>
{`{ "role": "admin" }
// or
{ "role": "super_admin" }`}
              </pre>
              <p style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 6 }}>User must log out and back in.</p>
            </div>

            <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-fg)', marginBottom: 6 }}>Database Migration</p>
              <p style={{ fontSize: 12, color: 'var(--admin-fg-muted)', lineHeight: 1.6, margin: 0 }}>
                If product CRUD is broken, run <span className="admin-mono" style={{ fontSize: 11 }}>supabase/migrations/004_admin_panel.sql</span> in the Supabase SQL editor.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
