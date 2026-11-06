const row1 = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: '24 / 7 Support',
    desc: 'Round-the-clock assistance for every order.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'Premium Quality',
    desc: 'Heavy-gauge stainless steel, built to last.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    label: 'Easy Returns',
    desc: '7-day hassle-free return policy.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    label: 'Fast Delivery',
    desc: 'Pan-India shipping with real-time tracking.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
    label: 'ISI Certified',
    desc: 'Products meet Indian safety standards.',
  },
];

const row2 = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    label: 'Bulk Pricing',
    desc: 'Exclusive rates for restaurants and hotels.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    label: '1-Year Warranty',
    desc: 'All tandoors covered against defects.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: 'Custom Sizing',
    desc: 'Bespoke dimensions for your kitchen.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    label: 'Expert Install',
    desc: 'Professional setup guidance on request.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Trusted by 500+',
    desc: 'Restaurants across India rely on us.',
  },
];

const track1 = [...row1, ...row1];
const track2 = [...row2, ...row2];

export function TrustSection() {
  return (
    <section className="trust-section" aria-label="Why choose Raj Tandoor">
      <div className="trust-glow" aria-hidden="true" />

      {/* Row 1 — right to left */}
      <div className="trust-marquee" aria-hidden="true">
        <ul className="trust-track trust-track--rtl" role="list">
          {track1.map((s, i) => (
            <li key={i} className="trust-pill">
              <span className="trust-pill__icon">{s.icon}</span>
              <span className="trust-pill__text">
                <strong className="trust-pill__label">{s.label}</strong>
                <span className="trust-pill__desc">{s.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Row 2 — left to right */}
      <div className="trust-marquee" aria-hidden="true">
        <ul className="trust-track trust-track--ltr" role="list">
          {track2.map((s, i) => (
            <li key={i} className="trust-pill trust-pill--alt">
              <span className="trust-pill__icon">{s.icon}</span>
              <span className="trust-pill__text">
                <strong className="trust-pill__label">{s.label}</strong>
                <span className="trust-pill__desc">{s.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
