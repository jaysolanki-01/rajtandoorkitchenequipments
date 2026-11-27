'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '../../src/store/AdminAuthContext';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/admin',            label: 'Dashboard' },
  { href: '/admin/orders',     label: 'Orders' },
  { href: '/admin/quotes',     label: 'Quotes' },
  { href: '/admin/products',   label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/inventory',  label: 'Inventory' },
  { href: '/admin/customers',  label: 'Customers' },
  { href: '/admin/settings',   label: 'Settings' },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isLoading, logout, user } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin) router.replace('/admin/login');
  }, [isAdmin, isLoading, router]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (isLoading || !isAdmin) return null;

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--adm-bg)' }}>
      <style>{`
        /* ── Tokens ── */
        :root {
          --adm-bg:          #f3f2ef;
          --adm-nav:         #111110;
          --adm-nav-border:  rgba(255,255,255,0.08);
          --adm-nav-fg:      rgba(255,255,255,0.55);
          --adm-nav-hover:   rgba(255,255,255,0.9);
          --adm-nav-active:  #ffffff;
          --adm-gold:        #c3a268;
          --adm-gold-dim:    rgba(195,162,104,0.2);
          --admin-card:      #ffffff;
          --admin-border:    #e5e3de;
          --admin-fg:        #111110;
          --admin-fg-muted:  #7a7870;
          --admin-bg:        #f3f2ef;
          --admin-accent:    #b05a28;
          --admin-green:     #1a6b45;
          --admin-yellow:    #92680f;
          --admin-red:       #9f1239;
          --admin-blue:      #1d4ed8;
        }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) {
            --adm-bg:       #0c0b09;
            --adm-nav:      #080807;
            --admin-card:   #1a1917;
            --admin-border: #2a2926;
            --admin-fg:     #f0ede6;
            --admin-bg:     #0c0b09;
          }
        }
        :root[data-theme="dark"] {
          --adm-bg:       #0c0b09;
          --adm-nav:      #080807;
          --admin-card:   #1a1917;
          --admin-border: #2a2926;
          --admin-fg:     #f0ede6;
          --admin-bg:     #0c0b09;
        }

        /* ── Top navbar ── */
        .adm-nav {
          background: var(--adm-nav);
          border-bottom: 1px solid var(--adm-nav-border);
          position: sticky; top: 0; z-index: 200;
        }
        .adm-nav__row {
          max-width: 1440px; margin: 0 auto;
          padding: 0 28px;
          height: 56px;
          display: flex; align-items: center; gap: 0;
        }

        /* Logo */
        .adm-nav__brand {
          display: flex; align-items: center; gap: 10px;
          padding-right: 28px;
          border-right: 1px solid var(--adm-nav-border);
          margin-right: 4px; flex-shrink: 0; text-decoration: none;
        }
        .adm-nav__brand-logo {
          width: 32px; height: 32px; object-fit: contain; display: block; flex-shrink: 0;
        }
        .adm-nav__brand-text { display: flex; flex-direction: column; }
        .adm-nav__brand-name {
          font-size: 13px; font-weight: 700; color: #fff;
          letter-spacing: 0.03em; line-height: 1;
        }
        .adm-nav__brand-sub {
          font-size: 9px; color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px;
        }

        /* Nav links */
        .adm-nav__links {
          display: flex; align-items: stretch; flex: 1; height: 56px;
          overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .adm-nav__links::-webkit-scrollbar { display: none; }
        .adm-nav__link {
          display: flex; align-items: center; padding: 0 15px;
          font-size: 13px; font-weight: 500;
          color: var(--adm-nav-fg); text-decoration: none;
          white-space: nowrap; border-bottom: 2px solid transparent;
          transition: color 0.14s, border-color 0.14s;
          flex-shrink: 0;
        }
        .adm-nav__link:hover { color: var(--adm-nav-hover); }
        .adm-nav__link.is-active {
          color: var(--adm-nav-active);
          border-bottom-color: var(--adm-gold);
        }

        /* Actions */
        .adm-nav__actions {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
          padding-left: 20px; border-left: 1px solid var(--adm-nav-border);
          margin-left: 4px;
        }
        .adm-nav__role {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          padding: 3px 10px; border-radius: 999px;
          background: var(--adm-gold-dim); color: var(--adm-gold);
          white-space: nowrap;
        }
        .adm-nav__role--super { background: rgba(29,78,216,0.2); color: #93c5fd; }
        .adm-nav__signout {
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4);
          background: none; border: none; cursor: pointer;
          padding: 6px 10px; border-radius: 6px;
          transition: color 0.14s, background 0.14s;
          white-space: nowrap;
        }
        .adm-nav__signout:hover { color: #fff; background: rgba(255,255,255,0.08); }

        /* Mobile menu toggle */
        .adm-nav__toggle {
          display: none; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px; border: none;
          background: rgba(255,255,255,0.08); color: #fff; cursor: pointer;
          flex-shrink: 0; margin-left: 10px; font-size: 16px; line-height: 1;
        }

        /* Mobile drawer */
        .adm-nav__drawer {
          display: none;
          background: var(--adm-nav); border-top: 1px solid var(--adm-nav-border);
          padding: 8px 16px 16px;
          flex-direction: column; gap: 2px;
        }
        .adm-nav__drawer.is-open { display: flex; }
        .adm-nav__drawer-link {
          display: block; padding: 10px 12px; border-radius: 8px;
          font-size: 14px; font-weight: 500; color: var(--adm-nav-fg);
          text-decoration: none; transition: background 0.12s, color 0.12s;
        }
        .adm-nav__drawer-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .adm-nav__drawer-link.is-active {
          background: var(--adm-gold-dim); color: var(--adm-gold); font-weight: 600;
        }
        .adm-nav__drawer-signout {
          margin-top: 8px; padding: 10px 12px; border-radius: 8px; border: none;
          background: none; color: rgba(255,255,255,0.4); font-size: 14px;
          font-weight: 500; cursor: pointer; text-align: left;
          transition: background 0.12s, color 0.12s; width: 100%;
        }
        .adm-nav__drawer-signout:hover { background: rgba(255,255,255,0.07); color: #fff; }

        /* ── Page content ── */
        .adm-content {
          max-width: 1440px; margin: 0 auto;
          padding: 32px 28px 72px;
        }

        /* ── Shared admin components ── */
        .admin-card {
          background: var(--admin-card); border: 1px solid var(--admin-border);
          border-radius: 12px; overflow: hidden;
        }
        .admin-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 14px; margin-bottom: 28px;
        }
        .admin-stat {
          background: var(--admin-card); border: 1px solid var(--admin-border);
          border-radius: 12px; padding: 20px 22px;
        }
        .admin-stat-label {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--admin-fg-muted); margin-bottom: 8px;
        }
        .admin-stat-value {
          font-size: 28px; font-weight: 700; color: var(--admin-fg);
          font-variant-numeric: tabular-nums; line-height: 1;
        }
        .admin-stat-sub { font-size: 12px; color: var(--admin-fg-muted); margin-top: 5px; }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .admin-table th {
          padding: 10px 16px; text-align: left; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.07em; color: var(--admin-fg-muted);
          background: var(--adm-bg); border-bottom: 1px solid var(--admin-border);
        }
        .admin-table td {
          padding: 12px 16px; border-bottom: 1px solid var(--admin-border);
          color: var(--admin-fg); vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: #faf9f7; }
        .admin-mono {
          font-family: ui-monospace, monospace; font-size: 11.5px;
          color: var(--admin-fg-muted);
        }
        .admin-badge {
          display: inline-flex; align-items: center;
          padding: 2px 9px; border-radius: 100px;
          font-size: 11px; font-weight: 600; white-space: nowrap;
        }
        .badge-pending    { background: #fef9c3; color: #854d0e; }
        .badge-confirmed  { background: #dbeafe; color: #1d4ed8; }
        .badge-contacted, .badge-processing { background: #e0f2fe; color: #0369a1; }
        .badge-quoted     { background: #ede9fe; color: #6d28d9; }
        .badge-done, .badge-delivered { background: #dcfce7; color: #166534; }
        .badge-cancelled  { background: #fee2e2; color: #991b1b; }
        .badge-shipped    { background: #e8f5e9; color: #2e7d32; }
        .admin-select {
          font-size: 12px; padding: 6px 10px; border-radius: 7px;
          border: 1px solid var(--admin-border); background: var(--admin-card);
          color: var(--admin-fg); cursor: pointer;
        }
        .admin-filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .admin-filter-btn {
          padding: 6px 14px; border-radius: 7px; font-size: 12px; font-weight: 500;
          border: 1px solid var(--admin-border); background: var(--admin-card);
          color: var(--admin-fg-muted); cursor: pointer; transition: all 0.14s;
          text-transform: capitalize;
        }
        .admin-filter-btn:hover, .admin-filter-btn.active {
          border-color: var(--admin-accent); color: var(--admin-accent);
        }
        .admin-filter-btn.active { font-weight: 600; }
        .admin-section-header {
          padding: 14px 18px; border-bottom: 1px solid var(--admin-border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .admin-section-title { font-size: 14px; font-weight: 600; color: var(--admin-fg); }
        .admin-quote-card { padding: 16px 20px; border-bottom: 1px solid var(--admin-border); }
        .admin-quote-card:last-child { border-bottom: none; }
        .admin-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .adm-nav__links { display: none; }
          .adm-nav__actions { display: none; }
          .adm-nav__toggle { display: flex; }
        }
        @media (max-width: 900px) {
          .admin-grid-2 { grid-template-columns: 1fr; }
          .admin-stat-grid { grid-template-columns: 1fr 1fr; }
          .adm-content { padding: 20px 16px 48px; }
          .adm-nav__row { padding: 0 16px; }
        }
        @media (max-width: 480px) {
          .admin-stat-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── Top navbar ── */}
      <header className="adm-nav">
        <div className="adm-nav__row">

          {/* Brand */}
          <Link href="/admin" className="adm-nav__brand">
            <img src="/images/raj-tandoor-logo.webp" alt="Raj Tandoor logo" className="adm-nav__brand-logo" />
            <span className="adm-nav__brand-text">
              <span className="adm-nav__brand-name">Raj Tandoor</span>
              <span className="adm-nav__brand-sub">Admin Panel</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="adm-nav__links" aria-label="Admin navigation">
            {NAV.map(({ href, label }) => {
              const isActive = href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`adm-nav__link${isActive ? ' is-active' : ''}`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="adm-nav__actions">
            <span className={`adm-nav__role${isSuperAdmin ? ' adm-nav__role--super' : ''}`}>
              {isSuperAdmin ? 'Super Admin' : 'Admin'}
            </span>
            <button className="adm-nav__signout" onClick={() => { logout(); router.replace('/'); }}>
              Sign out
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="adm-nav__toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile drawer */}
        <nav className={`adm-nav__drawer${menuOpen ? ' is-open' : ''}`} aria-label="Mobile admin navigation">
          {NAV.map(({ href, label }) => {
            const isActive = href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`adm-nav__drawer-link${isActive ? ' is-active' : ''}`}>
                {label}
              </Link>
            );
          })}
          <button className="adm-nav__drawer-signout" onClick={() => { logout(); router.replace('/'); }}>
            Sign out
          </button>
        </nav>
      </header>

      {/* ── Page content ── */}
      <main className="adm-content">
        {children}
      </main>
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
