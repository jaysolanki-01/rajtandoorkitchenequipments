import { Link } from 'react-router-dom';

const businessTypes = [
  {
    label: 'Restaurants',
    description: 'High-throughput tandoors and cooking stations for restaurant kitchens.',
    href: '/shop?category=tandoors',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Hotels',
    description: 'Durable, high-capacity equipment suited to hotel banquet and à la carte kitchens.',
    href: '/shop',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    label: 'Catering Businesses',
    description: 'Portable and robust equipment for outdoor catering and event kitchens.',
    href: '/shop?category=tandoors',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Cloud Kitchens',
    description: 'Space-efficient tandoors and accessories optimised for delivery-first operations.',
    href: '/shop?category=tandoors',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    label: 'Bakeries',
    description: 'Traditional tandoors and bhattis suited to flatbread, naan, and roti production.',
    href: '/shop?category=tandoors',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z"/><path d="M5.45 12a7 7 0 0 0 13.1 0"/>
        <line x1="12" y1="12" x2="12" y2="22"/>
      </svg>
    ),
  },
  {
    label: 'Institutional Kitchens',
    description: 'Heavy-duty equipment for hospitals, canteens, and institutional cooking at scale.',
    href: '/contact?type=quote',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

export function BusinessTypeSection() {
  return (
    <section className="biz-section section-pad" aria-labelledby="biz-heading">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Shop by Business Type</p>
          <h2 id="biz-heading" className="section-title">Find the Right Equipment</h2>
          <p className="section-subtitle">Select your business type to discover the most relevant tandoors and kitchen equipment.</p>
        </div>

        <ul className="biz-grid" role="list">
          {businessTypes.map((biz) => (
            <li key={biz.label}>
              <Link to={biz.href} className="biz-card">
                <div className="biz-card__icon" aria-hidden="true">{biz.icon}</div>
                <h3 className="biz-card__label">{biz.label}</h3>
                <p className="biz-card__desc">{biz.description}</p>
                <span className="biz-card__arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
