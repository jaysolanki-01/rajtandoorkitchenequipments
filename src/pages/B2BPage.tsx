import { Link } from 'react-router-dom';
import { brand } from '../config/site';

const WHO_WE_SERVE = [
  { title: 'Restaurants & Dhabas', desc: 'From single-outlet restaurants to multi-chain operations needing consistent, high-output equipment.' },
  { title: 'Hotels & Resorts', desc: 'Complete kitchen solutions for hospitality properties — from room-service pantries to banquet-scale cooking lines.' },
  { title: 'Catering Companies', desc: 'High-volume, mobile-ready equipment for event caterers, cloud kitchens, and tiffin services.' },
  { title: 'Food Courts & Malls', desc: 'Modular setups that fit tight spaces while delivering full commercial capacity.' },
  { title: 'Institutional Canteens', desc: 'Hospitals, schools, corporates, and mess contractors serving hundreds of covers daily.' },
  { title: 'Bakeries & QSRs', desc: 'Quick-service restaurant chains and bakeries needing standardized equipment across locations.' },
];

const WHY_US = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Volume Pricing',
    desc: 'Competitive bulk-order pricing for multi-unit purchases. The more you order, the better the rate.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="m4.22 4.22 2.12 2.12M17.66 17.66l2.12 2.12M17.66 6.34l-2.12 2.12M4.22 19.78l2.12-2.12"/>
      </svg>
    ),
    title: 'Custom Fabrication',
    desc: 'Stainless steel counters, hoods, shelving, and equipment tailored to your exact kitchen dimensions.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Dedicated Account Manager',
    desc: 'A single point of contact from enquiry through installation and beyond.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Pan-India Delivery',
    desc: 'Logistics handled to any city. We coordinate freight, insurance, and last-mile for large equipment.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Installation & AMC',
    desc: 'Professional on-site installation, commissioning, and optional annual maintenance contracts.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Fast Turnaround',
    desc: 'Stocked inventory on key lines. Custom orders quoted within 24 hours, delivered on schedule.',
  },
];

const PROCESS = [
  { step: '01', title: 'Send Your Requirements', desc: 'Share your kitchen layout, capacity needs, and equipment list via our quote form or directly by phone.' },
  { step: '02', title: 'Get a Detailed Quote', desc: 'We review your brief and send itemised pricing with lead times within one business day.' },
  { step: '03', title: 'Confirm & Manufacture', desc: 'Approve the quote to trigger production. Standard items ship from stock; custom fabrication gets a fixed schedule.' },
  { step: '04', title: 'Delivery & Installation', desc: 'Equipment arrives packed for safety. Our team handles installation, testing, and staff orientation on-site.' },
];

export function B2BPage() {
  return (
    <>
      <title>B2B & Commercial Supply | {brand.fullName}</title>
      <meta name="description" content="Complete commercial kitchen supply for restaurants, hotels, caterers and institutions. Volume pricing, custom fabrication, pan-India delivery." />

      <main id="main" tabIndex={-1}>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="b2b-hero" aria-label="B2B hero">
          <div className="b2b-hero__bg" aria-hidden="true" />
          <div className="b2b-hero__content container">
            <span className="eyebrow b2b-hero__eyebrow">Commercial Supply</span>
            <h1 className="b2b-hero__h1">
              Equip Your Commercial<br />Kitchen End‑to‑End
            </h1>
            <p className="b2b-hero__sub">
              From a single tandoor to a full kitchen build-out — we supply, fabricate, deliver, and install for restaurants, hotels, caterers, and institutions across India.
            </p>
            <div className="b2b-hero__ctas">
              <Link to="/contact?type=quote" className="btn btn--gold b2b-hero__cta-primary">
                Request a Quote
              </Link>
              <Link to="/shop" className="btn btn--outline b2b-hero__cta-secondary">
                Browse Products
              </Link>
            </div>
          </div>
        </section>

        {/* ── Who we serve ────────────────────────────────────────────────────── */}
        <section className="b2b-who" aria-labelledby="b2b-who-heading">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Who We Serve</span>
              <h2 id="b2b-who-heading" className="section-title">Built for Every Commercial Kitchen</h2>
              <p className="section-subtitle">Whether you're opening your first outlet or scaling a chain, we have the right equipment and the experience to match.</p>
            </div>
            <ul className="b2b-who__grid" role="list">
              {WHO_WE_SERVE.map((item) => (
                <li key={item.title} className="b2b-who__card">
                  <div className="b2b-who__dot" aria-hidden="true" />
                  <h3 className="b2b-who__title">{item.title}</h3>
                  <p className="b2b-who__desc">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why choose us ────────────────────────────────────────────────────── */}
        <section className="b2b-why" aria-labelledby="b2b-why-heading">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Why Raj Tandoor</span>
              <h2 id="b2b-why-heading" className="section-title">Everything a Commercial Buyer Needs</h2>
            </div>
            <ul className="b2b-why__grid" role="list">
              {WHY_US.map((item) => (
                <li key={item.title} className="b2b-why__card">
                  <div className="b2b-why__icon" aria-hidden="true">{item.icon}</div>
                  <h3 className="b2b-why__title">{item.title}</h3>
                  <p className="b2b-why__desc">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ─────────────────────────────────────────────────────────── */}
        <section className="b2b-process" aria-labelledby="b2b-process-heading">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">How It Works</span>
              <h2 id="b2b-process-heading" className="section-title">Simple. Fast. Reliable.</h2>
              <p className="section-subtitle">Four straightforward steps from first contact to a fully equipped kitchen.</p>
            </div>
            <ol className="b2b-process__steps" role="list">
              {PROCESS.map((item) => (
                <li key={item.step} className="b2b-process__step">
                  <span className="b2b-process__num" aria-hidden="true">{item.step}</span>
                  <div className="b2b-process__body">
                    <h3 className="b2b-process__title">{item.title}</h3>
                    <p className="b2b-process__desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
        <section className="b2b-cta" aria-label="B2B call to action">
          <div className="container b2b-cta__inner">
            <div className="b2b-cta__copy">
              <h2 className="b2b-cta__h2">Ready to Build Your Kitchen?</h2>
              <p className="b2b-cta__sub">Share your requirements and we'll put together a quote within one business day.</p>
            </div>
            <div className="b2b-cta__actions">
              <Link to="/contact?type=quote" className="btn btn--gold">Get a Free Quote</Link>
              <Link to="/shop" className="btn btn--outline">View All Products</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
