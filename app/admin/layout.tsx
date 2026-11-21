'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '../../src/store/AdminAuthContext';
import { useEffect } from 'react';

const NAV = [
  { href: '/admin',              label: 'Dashboard',  icon: '◈' },
  { href: '/admin/orders',       label: 'Orders',     icon: '◫' },
  { href: '/admin/quotes',       label: 'Quotes',     icon: '◳' },
  { href: '/admin/products',     label: 'Products',   icon: '◉' },
  { href: '/admin/categories',   label: 'Categories', icon: '⊞' },
  { href: '/admin/inventory',    label: 'Inventory',  icon: '◎' },
  { href: '/admin/customers',    label: 'Customers',  icon: '◷' },
  { href: '/admin/settings',     label: 'Settings',   icon: '⚙' },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isLoading, logout, user } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAdmin) router.replace('/admin/login');
  }, [isAdmin, isLoading, router]);

  // Let the login page render without the admin shell
  if (pathname === '/admin/login') return <>{children}</>;

  if (isLoading || !isAdmin) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-bg, #f5f4f1)' }}>
      <style>{`
        :root {
          --admin-bg: #f5f4f1;
          --admin-sidebar: #1c1b18;
          --admin-sidebar-fg: #c8c5bc;
          --admin-sidebar-active: #e8c76a;
          --admin-card: #ffffff;
          --admin-border: #e8e6e0;
          --admin-fg: #1c1b18;
          --admin-fg-muted: #7a7870;
          --admin-accent: #b05a28;
          --admin-green: #1a6b45;
          --admin-yellow: #92680f;
          --admin-red: #9f1239;
          --admin-blue: #1d4ed8;
        }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) {
            --admin-bg: #0f0e0c;
            --admin-sidebar: #0a0908;
            --admin-sidebar-fg: #9a9890;
            --admin-sidebar-active: #e8c76a;
            --admin-card: #1a1917;
            --admin-border: #2a2926;
            --admin-fg: #f0ede6;
            --admin-fg-muted: #7a7870;
          }
        }
        :root[data-theme="dark"] {
          --admin-bg: #0f0e0c;
          --admin-sidebar: #0a0908;
          --admin-sidebar-fg: #9a9890;
          --admin-sidebar-active: #e8c76a;
          --admin-card: #1a1917;
          --admin-border: #2a2926;
          --admin-fg: #f0ede6;
          --admin-fg-muted: #7a7870;
        }
        .admin-sidebar {
          width: 220px; flex-shrink: 0; background: var(--admin-sidebar);
          display: flex; flex-direction: column;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        .admin-logo {
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .admin-logo-title {
          font-size: 13px; font-weight: 700; color: #fff;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .admin-logo-sub { font-size: 10px; color: var(--admin-sidebar-fg); margin-top: 2px; }
        .admin-nav { padding: 16px 10px; flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .admin-nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 6px;
          font-size: 13px; font-weight: 500; color: var(--admin-sidebar-fg);
          text-decoration: none; transition: background 0.15s, color 0.15s;
        }
        .admin-nav-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .admin-nav-link.active { background: rgba(232,199,106,0.15); color: var(--admin-sidebar-active); }
        .admin-nav-icon { font-size: 15px; width: 18px; text-align: center; }
        .admin-logout {
          padding: 16px 10px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .admin-logout-btn {
          width: 100%; text-align: left; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 6px;
          font-size: 13px; color: var(--admin-sidebar-fg);
          transition: background 0.15s, color 0.15s;
        }
        .admin-logout-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .admin-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .admin-topbar {
          background: var(--admin-card); border-bottom: 1px solid var(--admin-border);
          padding: 14px 28px; display: flex; align-items: center;
          justify-content: space-between; position: sticky; top: 0; z-index: 5;
        }
        .admin-topbar-title { font-size: 15px; font-weight: 600; color: var(--admin-fg); }
        .admin-topbar-badge {
          font-size: 11px; background: var(--admin-accent); color: #fff;
          padding: 2px 8px; border-radius: 100px; font-weight: 600;
        }
        .admin-content { padding: 28px; flex: 1; }
        .admin-card {
          background: var(--admin-card); border: 1px solid var(--admin-border);
          border-radius: 10px; overflow: hidden;
        }
        .admin-stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
        .admin-stat {
          background: var(--admin-card); border: 1px solid var(--admin-border);
          border-radius: 10px; padding: 20px 22px;
        }
        .admin-stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--admin-fg-muted); margin-bottom: 8px; }
        .admin-stat-value { font-size: 28px; font-weight: 700; color: var(--admin-fg); font-variant-numeric: tabular-nums; line-height: 1; }
        .admin-stat-sub { font-size: 12px; color: var(--admin-fg-muted); margin-top: 5px; }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .admin-table th {
          padding: 10px 16px; text-align: left; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.07em; color: var(--admin-fg-muted);
          background: var(--admin-bg); border-bottom: 1px solid var(--admin-border);
        }
        .admin-table td {
          padding: 12px 16px; border-bottom: 1px solid var(--admin-border);
          color: var(--admin-fg); vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: var(--admin-bg); }
        .admin-mono { font-family: ui-monospace, monospace; font-size: 11.5px; color: var(--admin-fg-muted); }
        .admin-badge {
          display: inline-flex; align-items: center;
          padding: 2px 9px; border-radius: 100px; font-size: 11px; font-weight: 600;
          white-space: nowrap;
        }
        .badge-pending    { background: #fef9c3; color: #854d0e; }
        .badge-confirmed  { background: #dbeafe; color: #1d4ed8; }
        .badge-contacted, .badge-processing { background: #e0f2fe; color: #0369a1; }
        .badge-quoted     { background: #ede9fe; color: #6d28d9; }
        .badge-done, .badge-delivered { background: #dcfce7; color: #166534; }
        .badge-cancelled  { background: #fee2e2; color: #991b1b; }
        .badge-shipped    { background: #e8f5e9; color: #2e7d32; }
        .admin-select {
          font-size: 12px; padding: 4px 8px; border-radius: 5px;
          border: 1px solid var(--admin-border); background: var(--admin-bg);
          color: var(--admin-fg); cursor: pointer;
        }
        .admin-filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .admin-filter-btn {
          padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 500;
          border: 1px solid var(--admin-border); background: var(--admin-card);
          color: var(--admin-fg-muted); cursor: pointer; transition: all 0.15s; text-transform: capitalize;
        }
        .admin-filter-btn:hover, .admin-filter-btn.active {
          border-color: var(--admin-accent); color: var(--admin-accent); background: var(--admin-card);
        }
        .admin-filter-btn.active { font-weight: 600; }
        .admin-section-header {
          padding: 14px 18px; border-bottom: 1px solid var(--admin-border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .admin-section-title { font-size: 14px; font-weight: 600; color: var(--admin-fg); }
        .admin-quote-card {
          padding: 18px 20px; border-bottom: 1px solid var(--admin-border);
        }
        .admin-quote-card:last-child { border-bottom: none; }
        .admin-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 900px) {
          .admin-sidebar { display: none; }
          .admin-grid-2 { grid-template-columns: 1fr; }
          .admin-stat-grid { grid-template-columns: 1fr 1fr; }
          .admin-content { padding: 16px; }
          .admin-topbar { padding: 12px 16px; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-title">Raj Tandoor</div>
          <div className="admin-logo-sub">Admin Panel</div>
        </div>
        <nav className="admin-nav">
          {NAV.map(({ href, label, icon }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`admin-nav-link${active ? ' active' : ''}`}>
                <span className="admin-nav-icon">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-logout">
          <button className="admin-logout-btn" onClick={() => { logout(); router.replace('/'); }}>
            <span className="admin-nav-icon">↩</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar-title">
            {NAV.find(n => n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href))?.label ?? 'Admin'}
          </span>
          <span className="admin-topbar-badge" style={user?.role === 'super_admin' ? { background: 'var(--admin-blue)' } : undefined}>
            {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
          </span>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
