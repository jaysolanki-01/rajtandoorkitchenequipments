import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { seo, brand } from '../config/site';

/* ── Scroll-reveal hook ─────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Animated counter ───────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView(0.5);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const inc = to / (duration / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [visible, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Section wrapper with reveal ────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`ab-reveal${visible ? ' ab-reveal--in' : ''} ${className}`} style={{ '--ab-delay': `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export function AboutPage() {
  return (
    <>
      <title>{`About Us | ${seo.title}`}</title>
      <meta name="description" content="Learn about Raj Tandoor & Kitchen Equipment — suppliers of stainless-steel tandoors and professional kitchen equipment for commercial kitchens." />
      <link rel="canonical" href={`${seo.siteUrl}/about`} />

      <main id="main" tabIndex={-1} className="ab-page">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section className="ab-hero" aria-label="About us hero">
          <div className="ab-hero__bg" aria-hidden="true">
            <div className="ab-hero__bg-glow" />
            <div className="ab-hero__bg-grid" />
          </div>
          <div className="ab-hero__inner container">
            <div className="ab-hero__badge">
              <span className="ab-hero__badge-dot" />
              Commercial Kitchen Specialists
            </div>
            <h1 className="ab-hero__title">
              Built for the{' '}
              <span className="ab-hero__title-gold">Heat</span>,<br />
              Crafted for the{' '}
              <span className="ab-hero__title-gold">Kitchen</span>.
            </h1>
            <p className="ab-hero__sub">
              {brand.fullName} supplies professional-grade tandoors and kitchen equipment
              trusted by restaurants, hotels, and catering businesses across India.
            </p>
            <div className="ab-hero__actions">
              <Link to="/shop" className="btn btn--gold btn--lg ab-hero__btn-primary">Explore Products</Link>
              <Link to="/contact" className="btn btn--outline ab-hero__btn-secondary">Get in Touch</Link>
            </div>
          </div>
          {/* Stats bar */}
          <div className="ab-stats-bar">
            <div className="container">
              <div className="ab-stats-bar__grid">
                <div className="ab-stats-bar__item">
                  <strong className="ab-stats-bar__num"><Counter to={500} suffix="+" /></strong>
                  <span className="ab-stats-bar__label">Restaurants Served</span>
                </div>
                <div className="ab-stats-bar__divider" aria-hidden="true" />
                <div className="ab-stats-bar__item">
                  <strong className="ab-stats-bar__num"><Counter to={12} suffix="+" /></strong>
                  <span className="ab-stats-bar__label">Product Variants</span>
                </div>
                <div className="ab-stats-bar__divider" aria-hidden="true" />
                <div className="ab-stats-bar__item">
                  <strong className="ab-stats-bar__num"><Counter to={100} suffix="%" /></strong>
                  <span className="ab-stats-bar__label">Commercial Grade</span>
                </div>
                <div className="ab-stats-bar__divider" aria-hidden="true" />
                <div className="ab-stats-bar__item">
                  <strong className="ab-stats-bar__num">Pan-India</strong>
                  <span className="ab-stats-bar__label">Delivery Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. OUR STORY ─────────────────────────────────────────────── */}
        <section className="ab-story" aria-labelledby="story-h2">
          <div className="container ab-story__inner">
            <Reveal className="ab-story__text">
              <span className="ab-label">Our Story</span>
              <h2 id="story-h2" className="ab-h2">Where Tradition Meets<br />Commercial Excellence</h2>
              <p className="ab-story__para">
                Raj Tandoor was born from a simple conviction: commercial kitchens deserve equipment
                that can keep up with the pace of professional cooking. We set out to design tandoors
                and kitchen equipment that marry centuries-old clay-fired techniques with the durability
                demanded by modern food-service operations.
              </p>
              <p className="ab-story__para">
                Today our stainless-steel tandoors grace the kitchens of restaurants, hotels, dhabas,
                and catering businesses across India — trusted for their consistent performance,
                hygienic construction, and low maintenance.
              </p>
              <div className="ab-story__highlights">
                <div className="ab-story__hl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Clay-lined chamber for authentic results
                </div>
                <div className="ab-story__hl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Stainless-steel outer shell for hygiene &amp; longevity
                </div>
                <div className="ab-story__hl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Built for the rigours of commercial kitchens
                </div>
                <div className="ab-story__hl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Pan-India delivery for all order sizes
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="ab-story__visual">
              <div className="ab-story__img-wrap">
                <img src="/images/raj-tandoor-product.webp" alt="Raj Tandoor stainless steel commercial tandoor" className="ab-story__img" width={560} height={560} loading="lazy" />
                <div className="ab-story__img-badge">
                  <span>🔥</span>
                  <span>Commercial<br />Grade</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 3. WHAT WE OFFER ─────────────────────────────────────────── */}
        <section className="ab-offer" aria-labelledby="offer-h2">
          <div className="container">
            <Reveal>
              <span className="ab-label">What We Offer</span>
              <h2 id="offer-h2" className="ab-h2 ab-h2--center">Products Built for Professionals</h2>
              <p className="ab-offer__intro">
                Every product in our range is designed from the ground up for commercial use —
                not scaled-up home appliances, but purpose-built professional equipment.
              </p>
            </Reveal>
            <div className="ab-offer__grid">
              {[
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  ),
                  title: 'Tandoors',
                  desc: 'Stainless-steel cylindrical tandoors with clay-lined chambers. Available in multiple sizes for restaurants, hotels, and catering operations.',
                  link: '/tandoors',
                  color: '#c3a268',
                },
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2"/>
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      <line x1="12" y1="12" x2="12" y2="16"/>
                      <line x1="10" y1="14" x2="14" y2="14"/>
                    </svg>
                  ),
                  title: 'Kitchen Equipment',
                  desc: 'Professional commercial kitchen equipment for high-volume food service. Contact us to discuss specifications and availability.',
                  link: '/kitchen-equipment',
                  color: '#374b7f',
                },
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                    </svg>
                  ),
                  title: 'Accessories',
                  desc: 'Skewers, maintenance tools, and essential accessories for professional tandoor operation and upkeep.',
                  link: '/shop?category=accessories',
                  color: '#56c4d5',
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <Link to={item.link} className="ab-offer__card">
                    <div className="ab-offer__card-icon" style={{ '--ab-icon-color': item.color } as React.CSSProperties}>
                      {item.icon}
                    </div>
                    <h3 className="ab-offer__card-title">{item.title}</h3>
                    <p className="ab-offer__card-desc">{item.desc}</p>
                    <span className="ab-offer__card-link">
                      Explore {item.title}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. WHY CHOOSE US ─────────────────────────────────────────── */}
        <section className="ab-why" aria-labelledby="why-h2">
          <div className="container">
            <Reveal>
              <span className="ab-label ab-label--light">Why Choose Us</span>
              <h2 id="why-h2" className="ab-h2 ab-h2--center ab-h2--light">The Raj Tandoor Difference</h2>
            </Reveal>
            <div className="ab-why__grid">
              {[
                { icon: '🏗️', title: 'Commercial-Grade Build', desc: 'Every product is engineered for the rigours of daily commercial kitchen use — not domestic adaptations.' },
                { icon: '✨', title: 'Hygienic Stainless Steel', desc: 'Food-safe stainless-steel exteriors are easy to clean, corrosion-resistant, and built to health-code standards.' },
                { icon: '🔥', title: 'Authentic Clay Chamber', desc: 'Traditional clay lining delivers the characteristic tandoor flavour and heat retention that chefs depend on.' },
                { icon: '📐', title: 'Multiple Sizes', desc: 'From compact countertop models to large-capacity floor tandoors — choose the right fit for your kitchen volume.' },
                { icon: '🚚', title: 'Pan-India Delivery', desc: 'We deliver across India. Contact us to discuss delivery timelines and logistics for your location.' },
                { icon: '💬', title: 'Expert Consultation', desc: 'Our team works with you to understand your kitchen requirements and recommend the right equipment.' },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="ab-why__card">
                    <span className="ab-why__icon" aria-hidden="true">{item.icon}</span>
                    <h3 className="ab-why__card-title">{item.title}</h3>
                    <p className="ab-why__card-desc">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. OUR PROCESS ───────────────────────────────────────────── */}
        <section className="ab-process" aria-labelledby="process-h2">
          <div className="container">
            <Reveal>
              <span className="ab-label">How We Work</span>
              <h2 id="process-h2" className="ab-h2 ab-h2--center">From Enquiry to Kitchen</h2>
              <p className="ab-process__intro">
                We make it simple to get the right equipment for your commercial kitchen.
              </p>
            </Reveal>
            <div className="ab-process__steps">
              {[
                { n: '01', title: 'Send an Enquiry', desc: 'Share your kitchen requirements, volume needs, and space constraints through our contact form or enquiry page.' },
                { n: '02', title: 'Get a Recommendation', desc: 'Our team reviews your needs and recommends the right product size and configuration, with full specifications and pricing.' },
                { n: '03', title: 'Confirm & Deliver', desc: 'Once you confirm your order, we arrange packaging and pan-India delivery to your kitchen.' },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 120}>
                  <div className="ab-process__step">
                    <div className="ab-process__step-num">{step.n}</div>
                    <div className="ab-process__step-line" aria-hidden="true" />
                    <h3 className="ab-process__step-title">{step.title}</h3>
                    <p className="ab-process__step-desc">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. QUALITY PROMISE ───────────────────────────────────────── */}
        <section className="ab-promise" aria-labelledby="promise-h2">
          <div className="container ab-promise__inner">
            <Reveal className="ab-promise__content">
              <span className="ab-label ab-label--light">Our Commitment</span>
              <h2 id="promise-h2" className="ab-h2 ab-h2--light">Quality You Can Count On</h2>
              <p className="ab-promise__text">
                We supply to commercial kitchens where downtime is not an option.
                That's why every tandoor and piece of equipment we offer is selected for durability,
                ease of maintenance, and consistent performance under daily professional use.
              </p>
              <div className="ab-promise__pillars">
                <div className="ab-promise__pillar">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Durable Construction
                </div>
                <div className="ab-promise__pillar">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Low Maintenance
                </div>
                <div className="ab-promise__pillar">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  Consistent Performance
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} className="ab-promise__visual">
              <div className="ab-promise__quote">
                <svg className="ab-promise__quote-mark" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <p className="ab-promise__quote-text">
                  Professional kitchens need equipment that performs every single service,
                  every single day. That's the standard we build to.
                </p>
                <span className="ab-promise__quote-attr">— Raj Tandoor &amp; Kitchen Equipment</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 7. WHO WE SERVE ──────────────────────────────────────────── */}
        <section className="ab-serve" aria-labelledby="serve-h2">
          <div className="container">
            <Reveal>
              <span className="ab-label">Who We Serve</span>
              <h2 id="serve-h2" className="ab-h2 ab-h2--center">Trusted Across the Industry</h2>
            </Reveal>
            <div className="ab-serve__grid">
              {[
                { icon: '🍽️', label: 'Restaurants' },
                { icon: '🏨', label: 'Hotels' },
                { icon: '🍱', label: 'Catering Businesses' },
                { icon: '🏫', label: 'Institutional Kitchens' },
                { icon: '🛒', label: 'Cloud Kitchens' },
                { icon: '🎪', label: 'Event Caterers' },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <div className="ab-serve__item">
                    <span className="ab-serve__icon" aria-hidden="true">{s.icon}</span>
                    <span className="ab-serve__label">{s.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. CTA ───────────────────────────────────────────────────── */}
        <section className="ab-cta" aria-labelledby="cta-h2">
          <div className="ab-cta__bg" aria-hidden="true" />
          <div className="container ab-cta__inner">
            <Reveal>
              <h2 id="cta-h2" className="ab-cta__title">Ready to Equip Your Kitchen?</h2>
              <p className="ab-cta__sub">
                Browse our range of commercial tandoors and kitchen equipment, or get in touch
                to discuss your specific requirements with our team.
              </p>
              <div className="ab-cta__actions">
                <Link to="/shop" className="btn btn--gold btn--lg">Browse All Products</Link>
                <Link to="/request-quote" className="btn btn--outline ab-cta__btn-outline">Request a Quote</Link>
                <Link to="/contact" className="btn btn--outline ab-cta__btn-outline">Contact Us</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
