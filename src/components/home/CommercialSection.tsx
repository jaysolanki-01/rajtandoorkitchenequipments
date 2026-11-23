'use client';
import Link from 'next/link';

const businessTypes = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    name: 'Restaurants & Hotels',
    desc: 'Full kitchen setups built for high-volume, day-long service',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    name: 'Cloud Kitchens',
    desc: 'Space-efficient equipment designed for delivery-first operations',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    name: 'Catering Businesses',
    desc: 'Durable, portable equipment ready for large-scale events',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    name: 'Institutional Kitchens',
    desc: 'Large-capacity solutions for canteens, hospitals & messes',
  },
];

const stats = [
  { num: '500+',      label: 'Businesses Equipped' },
  { num: '14+',       label: 'Equipment Categories' },
  { num: '1 Year',    label: 'Product Warranty' },
  { num: 'Pan-India', label: 'Delivery Available' },
];

const benefits = [
  'Custom configurations',
  'Volume-based pricing',
  'Delivery coordination',
  'Dedicated enquiry team',
];

export function CommercialSection() {
  return (
    <section className="cs" aria-labelledby="cs-heading">
      <div className="container cs__wrap">

        {/* Header */}
        <header className="cs__header">
          <p className="eyebrow">For Commercial Buyers</p>
          <h2 id="cs-heading" className="cs__h2">Equipping a<br />Commercial Kitchen?</h2>
          <p className="cs__sub">
            From a single restaurant to a full catering fleet — our team helps you pick the right equipment and arrange bulk pricing.
          </p>
        </header>

        {/* Stats */}
        <dl className="cs__stats">
          {stats.map((s) => (
            <div key={s.label} className="cs__stat">
              <dt className="cs__stat-num">{s.num}</dt>
              <dd className="cs__stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* Business type cards */}
        <ul className="cs__cards" role="list">
          {businessTypes.map((b) => (
            <li key={b.name} className="cs__card">
              <span className="cs__card-icon" aria-hidden="true">{b.icon}</span>
              <h3 className="cs__card-name">{b.name}</h3>
              <p className="cs__card-desc">{b.desc}</p>
            </li>
          ))}
        </ul>

        {/* Benefits + CTA */}
        <div className="cs__bottom">
          <ul className="cs__benefits" role="list" aria-label="Bulk order benefits">
            {benefits.map((b) => (
              <li key={b} className="cs__benefit">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <div className="cs__cta">
            <Link href="/contact?type=quote" className="btn btn--gold btn--lg">Request a Bulk Quote</Link>
            <Link href="/b2b" className="btn cs__outline-btn btn--lg">Learn About B2B →</Link>
          </div>
        </div>

      </div>
    </section>
  );
}
