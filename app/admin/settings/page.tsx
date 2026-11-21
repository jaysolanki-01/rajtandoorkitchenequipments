'use client';
import { useState } from 'react';
import { useAuth } from '../../../src/store/AuthContext';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState('');

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <div>
      <title>Settings | Admin</title>

      {/* Account Info */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--admin-fg)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--admin-border)' }}>
          Account
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          <Row label="Email" value={user?.email ?? '—'} />
          <Row label="Role">
            <span className={`admin-badge ${isSuperAdmin ? 'badge-processing' : 'badge-done'}`} style={{ fontSize: 12 }}>
              {isSuperAdmin ? 'Super Admin' : 'Admin'}
            </span>
          </Row>
          <Row label="User ID">
            <span className="admin-mono" style={{ fontSize: 12 }}>{user?.id ?? '—'}</span>
            {user?.id && (
              <button onClick={() => copy(user.id, 'uid')} style={btnStyle}>
                {copied === 'uid' ? 'Copied!' : 'Copy'}
              </button>
            )}
          </Row>
        </div>
      </div>

      {/* How to create admin users */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--admin-fg)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--admin-border)' }}>
          Adding Admin Users
        </h2>
        <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', lineHeight: 1.65, marginBottom: 12 }}>
          Admin access is granted through Supabase. To give someone admin access:
        </p>
        <ol style={{ fontSize: 13, color: 'var(--admin-fg-muted)', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
          <li>Open <strong style={{ color: 'var(--admin-fg)' }}>Supabase Dashboard</strong> → Authentication → Users</li>
          <li>Find the user and click their email</li>
          <li>Under <strong style={{ color: 'var(--admin-fg)' }}>User Metadata</strong>, add or edit the JSON:</li>
        </ol>
        <pre style={{
          background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 6,
          padding: '10px 14px', fontSize: 12, fontFamily: 'monospace', marginTop: 12, overflowX: 'auto',
          color: 'var(--admin-fg)',
        }}>
{`{
  "role": "admin"
}

// or for full access:
{
  "role": "super_admin"
}`}
        </pre>
        <p style={{ fontSize: 12, color: 'var(--admin-fg-muted)', marginTop: 10 }}>
          The user must log out and log back in to pick up the new role.
        </p>
      </div>

      {/* Database / SQL Migration */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--admin-fg)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--admin-border)' }}>
          Database Migration
        </h2>
        <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', lineHeight: 1.65, marginBottom: 12 }}>
          If product create/edit/delete is not working, run the admin migration SQL in your Supabase SQL editor.
          The file is at <span className="admin-mono" style={{ fontSize: 12 }}>supabase/migrations/004_admin_panel.sql</span> in the project.
        </p>
        <p style={{ fontSize: 13, color: 'var(--admin-fg-muted)', lineHeight: 1.65 }}>
          This migration:
        </p>
        <ul style={{ fontSize: 13, color: 'var(--admin-fg-muted)', lineHeight: 1.9, paddingLeft: 20, margin: '8px 0 0' }}>
          <li>Grants admin/super_admin write access to the products table</li>
          <li>Creates the <span className="admin-mono" style={{ fontSize: 12 }}>product-images</span> storage bucket for image uploads</li>
          <li>Sets up RLS policies for the storage bucket</li>
        </ul>
      </div>

      {/* Links */}
      <div className="admin-card">
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--admin-fg)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--admin-border)' }}>
          Quick Links
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Supabase Dashboard', url: 'https://supabase.com/dashboard' },
            { label: 'Vercel Dashboard', url: 'https://vercel.com/dashboard' },
          ].map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--admin-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>↗</span> {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 28 }}>
      <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)', width: 90, flexShrink: 0 }}>{label}</span>
      {value && <span style={{ fontSize: 13, color: 'var(--admin-fg)' }}>{value}</span>}
      {children}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  marginLeft: 8, padding: '3px 10px', fontSize: 11, border: '1px solid var(--admin-border)',
  borderRadius: 4, background: 'transparent', color: 'var(--admin-fg-muted)', cursor: 'pointer',
};
