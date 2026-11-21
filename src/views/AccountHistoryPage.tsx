'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { seo } from '../config/site';
import { useAuth } from '../store/AuthContext';
import { AccountNav } from '../components/account/AccountNav';
import { getHistoryItems, removeHistoryItem, clearHistory, type HistoryItem } from '../lib/browsingHistory';

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ms).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

export function AccountHistoryPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setItems(getHistoryItems());
  }, []);

  function handleRemove(slug: string) {
    removeHistoryItem(slug);
    setItems(prev => prev.filter(h => h.slug !== slug));
  }

  function handleClear() {
    if (!confirmClear) { setConfirmClear(true); return; }
    clearHistory();
    setItems([]);
    setConfirmClear(false);
  }

  if (isLoading) return (
    <main className="page-main">
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--rt-text2)' }}>Loading…</p>
      </div>
    </main>
  );
  if (!isLoggedIn) { router.push('/'); return null; }

  return (
    <>
      <title>{`Browsing History | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="acct-layout">
            <AccountNav />
            <div className="acct-main">

              <div className="acct-subhdr">
                <Link href="/account" className="acct-subhdr__back">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                  Account
                </Link>
                <h1 className="acct-subhdr__title">Browsing History</h1>
              </div>

              <div className="acct-section">
                <div className="hist-header">
                  <div>
                    <h2 className="acct-section__title">Recently Viewed</h2>
                    <p className="hist-header__sub">Products you&apos;ve visited — stored in this browser only</p>
                  </div>
                  {items.length > 0 && (
                    <button
                      type="button"
                      className={`hist-clear-btn${confirmClear ? ' hist-clear-btn--confirm' : ''}`}
                      onClick={handleClear}
                      onBlur={() => setConfirmClear(false)}
                    >
                      {confirmClear ? 'Tap again to confirm' : 'Clear All'}
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="hist-empty">
                    <div className="hist-empty__icon" aria-hidden="true">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                    </div>
                    <p className="hist-empty__title">No history yet</p>
                    <p className="hist-empty__desc">Products you browse will appear here so you can find them again easily.</p>
                    <Link href="/shop" className="btn btn--gold btn--sm">Browse Products</Link>
                  </div>
                ) : (
                  <ul className="hist-grid" role="list">
                    {items.map(item => (
                      <li key={item.slug} className="hist-card">
                        <button
                          type="button"
                          className="hist-card__remove"
                          aria-label={`Remove ${item.name} from history`}
                          onClick={() => handleRemove(item.slug)}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>

                        <Link href={`/products/${item.slug}`} className="hist-card__img-wrap">
                          {item.image ? (
                            <Image
                              src={item.image.startsWith('http') ? item.image : `/${item.image.replace(/^\//, '')}`}
                              alt={item.name}
                              fill
                              sizes="(max-width:600px) 45vw, 160px"
                              className="hist-card__img"
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <div className="hist-card__img-ph" aria-hidden="true">
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                              </svg>
                            </div>
                          )}
                        </Link>

                        <div className="hist-card__body">
                          <span className="hist-card__cat">{item.category_label}</span>
                          <Link href={`/products/${item.slug}`} className="hist-card__name">{item.name}</Link>
                          <div className="hist-card__footer">
                            <span className="hist-card__price">
                              {item.price != null ? `₹${item.price.toLocaleString('en-IN')}` : 'On request'}
                            </span>
                            <span className="hist-card__time">{timeAgo(item.viewedAt)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
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
