'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MESSAGES = [
  {
    icon: '🔥',
    text: 'Free pan-India delivery on orders above ₹15,000',
    cta: { label: 'Shop Now', href: '/shop' },
  },
  {
    icon: '⚡',
    text: 'Commercial kitchen setup? Get priority support & bulk pricing.',
    cta: { label: 'Request a Quote', href: '/contact?type=quote' },
  },
  {
    icon: '🏆',
    text: 'Trusted by 500+ restaurants across India',
    cta: { label: 'Explore Range', href: '/shop' },
  },
  {
    icon: '✨',
    text: 'ISI certified tandoors — built for demanding commercial kitchens',
    cta: { label: 'View Products', href: '/shop' },
  },
];

export function AnnouncementBar() {
  // Always start false on both server and client to avoid hydration mismatch.
  // A useEffect reads sessionStorage after mount to hide if previously dismissed.
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Read dismissal state from sessionStorage after mount (client-only)
  useEffect(() => {
    try {
      if (sessionStorage.getItem('ann-dismissed') === '1') setDismissed(true);
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!dismissed) root.classList.add('has-ann');
    else root.classList.remove('has-ann');
    return () => root.classList.remove('has-ann');
  }, [dismissed]);

  // Cycle through messages every 4 s with a fade transition
  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  const msg = MESSAGES[index];

  function dismiss() {
    try { sessionStorage.setItem('ann-dismissed', '1'); } catch { /* noop */ }
    setDismissed(true);
  }

  return (
    <div className="ann-bar" role="region" aria-label="Site announcement" aria-live="polite">
      {/* Animated shimmer overlay */}
      <span className="ann-bar__shimmer" aria-hidden="true" />

      <div className={`ann-bar__content${visible ? ' ann-bar__content--visible' : ''}`}>
        <span className="ann-bar__icon" aria-hidden="true">{msg.icon}</span>
        <p className="ann-bar__text">{msg.text}</p>
        <Link href={msg.cta.href} className="ann-bar__cta">
          {msg.cta.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Dot indicators */}
      <div className="ann-bar__dots" aria-hidden="true">
        {MESSAGES.map((_, i) => (
          <span key={i} className={`ann-bar__dot${i === index ? ' ann-bar__dot--active' : ''}`} />
        ))}
      </div>

      <button
        type="button"
        className="ann-bar__close"
        aria-label="Dismiss announcement"
        onClick={dismiss}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
