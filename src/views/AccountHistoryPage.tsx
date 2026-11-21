'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { fetchUserOrders, type UserOrder, type OrderItem } from '../lib/supabase/db';

type StatusTab = 'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled';

const TABS: { id: StatusTab; label: string }[] = [
  { id: 'all',       label: 'All' },
  { id: 'pending',   label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

function resolveImg(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  return src.startsWith('/') ? src : `/${src}`;
}

function ItemImgs({ items }: { items: OrderItem[] }) {
  const shown = items.slice(0, 3);
  return (
    <div className="hist-ord__imgs">
      {shown.map((it, i) => {
        const src = resolveImg(it.image);
        return src ? (
          <div key={i} className="hist-ord__img-wrap">
            <Image src={src} alt={it.name ?? ''} fill sizes="40px" className="hist-ord__img" />
          </div>
        ) : (
          <div key={i} className="hist-ord__img-ph" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
        );
      })}
      {items.length > 3 && (
        <div className="hist-ord__img-more">+{items.length - 3}</div>
      )}
    </div>
  );
}

export function AccountHistoryPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusTab>('all');

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    fetchUserOrders(user.id)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [isLoggedIn, user]);

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  const filtered = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);

  const counts: Record<StatusTab, number> = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <>
      <title>{`Order History | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">

          {/* Page header above the grid */}
          <div className="acct-page-hdr">
            <Link href="/account" className="acct-page-hdr__back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              Account
            </Link>
            <h1 className="acct-page-hdr__title">Order History</h1>
          </div>

          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">

              {/* Status tabs */}
              <div className="hist-tabs" role="tablist" aria-label="Filter orders by status">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`hist-tab${activeTab === tab.id ? ' hist-tab--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    {counts[tab.id] > 0 && (
                      <span className="hist-tab__count">{counts[tab.id]}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Order list */}
              <div className="acct-section">
                {loading ? (
                  <p style={{ color: 'var(--rt-text2)', fontSize: '0.875rem', padding: '2rem 0' }}>Loading orders…</p>
                ) : filtered.length === 0 ? (
                  <div className="hist-empty">
                    <div className="hist-empty__icon" aria-hidden="true">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                    </div>
                    <p className="hist-empty__title">
                      {activeTab === 'all' ? 'No orders yet' : `No ${activeTab} orders`}
                    </p>
                    <p className="hist-empty__desc">
                      {activeTab === 'all'
                        ? 'Your orders will appear here once you place them.'
                        : `You don't have any ${activeTab} orders.`}
                    </p>
                    {activeTab === 'all' && (
                      <Link href="/shop" className="btn btn--gold btn--sm">Browse Products</Link>
                    )}
                  </div>
                ) : (
                  <ul className="hist-ord-list" role="list">
                    {filtered.map(order => {
                      const items = order.items ?? [];
                      const names = items.slice(0, 2).map(it => it.name).filter(Boolean).join(', ');
                      const extra = items.length > 2 ? ` +${items.length - 2} more` : '';
                      return (
                        <li key={order.order_number} className="hist-ord">
                          <ItemImgs items={items} />

                          <div className="hist-ord__info">
                            <div className="hist-ord__top">
                              <span className="hist-ord__num">{order.order_number}</span>
                              <span className={`order-status order-status--${order.status}`}>
                                {order.status.replace(/_/g, ' ')}
                              </span>
                            </div>
                            <p className="hist-ord__names">{names}{extra || ''}</p>
                            <div className="hist-ord__meta">
                              <span>{new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              <span className="hist-ord__dot">·</span>
                              <span>{items.length} item{items.length !== 1 ? 's' : ''}</span>
                            </div>
                          </div>

                          <div className="hist-ord__right">
                            <span className="hist-ord__total">₹{(order.total ?? 0).toLocaleString('en-IN')}</span>
                            <Link href={`/account/orders/${order.order_number}`} className="hist-ord__view">
                              View
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
