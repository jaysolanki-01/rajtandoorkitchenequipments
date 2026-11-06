import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: 'Restaurants & Hotels',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    label: 'Cloud Kitchens',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Catering Businesses',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: 'Institutional Kitchens',
  },
];

export function CommercialSection() {
  return (
    <section className="commercial-section" aria-labelledby="commercial-heading">
      <div className="container">
        <div className="commercial-section__inner">
          <div className="commercial-section__copy">
            <p className="eyebrow">For Commercial Buyers</p>
            <h2 id="commercial-heading" className="commercial-section__h2">
              Equipping a<br />Commercial Kitchen?
            </h2>
            <p className="commercial-section__body">
              Whether you're outfitting a new restaurant, upgrading a hotel kitchen, or equipping a catering fleet — our team can help you select the right equipment and arrange bulk pricing.
            </p>
            <ul className="commercial-section__features" role="list" aria-label="Supported business types">
              {features.map((f) => (
                <li key={f.label}>
                  <span className="commercial-section__feature-icon" aria-hidden="true">{f.icon}</span>
                  {f.label}
                </li>
              ))}
            </ul>
            <div className="commercial-section__cta">
              <Link to="/contact?type=quote" className="btn btn--gold btn--lg">Request a Bulk Quote</Link>
              <Link to="/shop" className="btn btn--outline commercial-section__browse">Browse Products</Link>
            </div>
          </div>

          <div className="commercial-section__visual" aria-hidden="true">
            <div className="commercial-section__card">
              <div className="commercial-section__card-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Bulk Order Benefits</h3>
              <ul>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Custom configurations available
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Volume-based pricing
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Delivery coordination support
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Dedicated enquiry team
                </li>
              </ul>
              <Link to="/contact?type=quote" className="btn btn--gold btn--sm btn--block" style={{ marginTop: '1.5rem' }}>
                Start Your Enquiry →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
