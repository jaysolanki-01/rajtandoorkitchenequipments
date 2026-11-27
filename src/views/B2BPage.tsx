'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── Hooks ─────────────────────────────────────────────────── */

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const t0 = performance.now();
        const dur = 2200;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (spanRef.current) obs.observe(spanRef.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={spanRef}>{val}{suffix}</span>;
}

/* ─── Data ────────────────────────────────────────────────────── */

const INDUSTRIES = [
  { icon: '🍽️', name: 'Restaurant Chains', count: '120+', desc: 'From single outlets to 50‑location chains needing consistent equipment across every site.' },
  { icon: '🏨', name: 'Hotel Groups', count: '80+', desc: 'Five‑star banquet kitchens to boutique property setups, custom‑built for hospitality specs.' },
  { icon: '📦', name: 'Cloud Kitchens', count: '90+', desc: 'High‑volume delivery-first kitchens where reliability and throughput are everything.' },
  { icon: '🎪', name: 'Catering Services', count: '150+', desc: 'Portable and fixed installations for events, weddings, and corporate catering.' },
  { icon: '🏫', name: 'Institutions', count: '60+', desc: 'Schools, hospitals, and college canteens with demanding volume requirements.' },
  { icon: '⚡', name: 'QSR Brands', count: '40+', desc: 'Quick service restaurants with standardised equipment across multiple locations.' },
];

const PROCESS = [
  { n: '01', label: 'Enquire', desc: 'Tell us your kitchen size, cuisine type, volume, and budget. No forms, just a call or WhatsApp.' },
  { n: '02', label: 'Get Quoted', desc: 'Receive a detailed B2B proposal with volume pricing within 24 hours.' },
  { n: '03', label: 'We Build', desc: 'Custom-fabricated to your exact specs. Standard lead time: 2–3 weeks.' },
  { n: '04', label: 'Installed', desc: 'Pan-India delivery with professional installation and staff training included.' },
];

const BENEFITS = [
  { tag: 'Pricing', icon: '💰', title: 'Volume Discounts', desc: 'Save up to 30% on orders of 5+ units. Dedicated pricing tiers for chains and large groups.', wide: true },
  { tag: 'Support', icon: '👤', title: 'Dedicated Manager', desc: 'One point of contact from first enquiry through after-sales service.' },
  { tag: 'Build', icon: '🔧', title: 'Custom Fabrication', desc: 'Non-standard sizes, materials, or configurations made to your exact spec.' },
  { tag: 'Logistics', icon: '🚚', title: 'Pan-India Delivery', desc: 'Installed and commissioned in all major cities and tier-2 towns.' },
  { tag: 'Quality', icon: '🛡️', title: '2-Year Warranty', desc: 'Full parts-and-labour warranty on all commercial equipment.' },
  { tag: 'Speed', icon: '⚡', title: 'Fast Turnaround', desc: 'Emergency orders fulfilled in 7 business days on stocked products.', wide: true },
];

const TESTIMONIALS = [
  { q: 'We equipped 12 outlets in one order. The pricing, the quality, and the after-sales support all exceeded expectations.', name: 'Ravi Mehta', title: 'Operations Head', co: 'Restaurant Chain, North India' },
  { q: 'The custom tandoor for our banquet kitchen exceeded expectations. Build quality is outstanding and the team was professional throughout.', name: 'Priya Sharma', title: 'F&B Director', co: 'Five-Star Hotel Group' },
  { q: 'Our cloud kitchen was live in under a week. Quick turnaround, professional installation, zero downtime on day one.', name: 'Amit Patel', title: 'Founder', co: 'Cloud Kitchen Brand, Ahmedabad' },
];

const MARQUEE = ['RESTAURANT CHAINS', 'HOTEL GROUPS', 'CLOUD KITCHENS', 'CATERING SERVICES', 'QSR BRANDS', 'INSTITUTIONAL KITCHENS', 'DHABA CHAINS'];

/* ─── Main page component ─────────────────────────────────────── */

export function B2BPage() {
  const CYCLE_WORDS = ['Restaurants', 'Hotels', 'Cloud Kitchens', 'Caterers', 'Institutions'];
  const [cycleIdx, setCycleIdx] = useState(0);
  const [cycleIn, setCycleIn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setCycleIn(false);
      setTimeout(() => { setCycleIdx(i => (i + 1) % CYCLE_WORDS.length); setCycleIn(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const heroReveal = useReveal(0.05);
  const bentoReveal = useReveal();
  const indReveal = useReveal();
  const procReveal = useReveal();
  const testimonialReveal = useReveal();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: B2B_CSS }} />

      <main id="main" className="b2b">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="b2b-hero" ref={heroReveal.ref}>
          {/* Atmospheric orbs */}
          <div className="b2b-orb b2b-orb--1" aria-hidden="true" />
          <div className="b2b-orb b2b-orb--2" aria-hidden="true" />
          <div className="b2b-orb b2b-orb--3" aria-hidden="true" />

          <div className="b2b-hero__inner container">
            {/* Left — headline */}
            <div className={`b2b-hero__copy${heroReveal.vis ? ' b2b-vis' : ''}`}>
              <span className="b2b-eyebrow">B2B &amp; Bulk Supply</span>
              <h1 className="b2b-hero__h1">
                Commercial kitchens
                <br />
                built for
                <br />
                <span className={`b2b-hero__cycle${cycleIn ? ' b2b-cycle-in' : ' b2b-cycle-out'}`}>
                  {CYCLE_WORDS[cycleIdx]}
                </span>
              </h1>
              <p className="b2b-hero__sub">
                Volume pricing, custom fabrication, dedicated account management. Everything a growing food business needs to equip fast and scale confidently.
              </p>
              <div className="b2b-hero__ctas">
                <a href={`https://wa.me/${'+919687861313'.replace(/\D/g, '')}?text=Hi%2C%20I%20want%20to%20enquire%20about%20B2B%20pricing`}
                   target="_blank" rel="noopener noreferrer"
                   className="b2b-btn b2b-btn--gold">
                  Get B2B Quote
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 14 0M13 6l6 6-6 6"/></svg>
                </a>
                <Link href="/contact" className="b2b-btn b2b-btn--outline">Talk to Sales</Link>
              </div>
            </div>

            {/* Right — stat grid */}
            <div className={`b2b-hero__stats${heroReveal.vis ? ' b2b-vis' : ''}`}>
              {[
                { n: 500, s: '+', l: 'Businesses Served' },
                { n: 15,  s: ' yrs', l: 'Industry Experience' },
                { n: 2000, s: '+', l: 'Units Installed' },
                { n: 98, s: '%', l: 'Client Retention' },
              ].map((st, i) => (
                <div key={i} className="b2b-stat-card" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <span className="b2b-stat-card__n">
                    <CountUp to={st.n} suffix={st.s} />
                  </span>
                  <span className="b2b-stat-card__l">{st.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="b2b-scroll-cue" aria-hidden="true">
            <span />
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────── */}
        <div className="b2b-ticker" aria-hidden="true">
          <div className="b2b-ticker__track">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
              <span key={i} className="b2b-ticker__item">{w}<span className="b2b-ticker__dot" /></span>
            ))}
          </div>
        </div>

        {/* ── BENTO — WHY B2B ──────────────────────────────── */}
        <section className="b2b-section" ref={bentoReveal.ref}>
          <div className="container">
            <div className={`b2b-section__header${bentoReveal.vis ? ' b2b-vis' : ''}`}>
              <span className="b2b-eyebrow">Why work with us</span>
              <h2 className="b2b-h2">Everything a growing food business needs</h2>
            </div>
            <div className={`b2b-bento${bentoReveal.vis ? ' b2b-vis' : ''}`}>
              {BENEFITS.map((b, i) => (
                <div key={i} className={`b2b-bento__card${b.wide ? ' b2b-bento__card--wide' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="b2b-bento__tag">{b.tag}</span>
                  <div className="b2b-bento__icon" aria-hidden="true">{b.icon}</div>
                  <h3 className="b2b-bento__title">{b.title}</h3>
                  <p className="b2b-bento__desc">{b.desc}</p>
                  <div className="b2b-bento__glow" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ───────────────────────────────────── */}
        <section className="b2b-section b2b-section--alt" ref={indReveal.ref}>
          <div className="container">
            <div className={`b2b-section__header${indReveal.vis ? ' b2b-vis' : ''}`}>
              <span className="b2b-eyebrow">Industries We Serve</span>
              <h2 className="b2b-h2">Built for every type of food business</h2>
            </div>
            <div className={`b2b-industries${indReveal.vis ? ' b2b-vis' : ''}`}>
              {INDUSTRIES.map((ind, i) => (
                <div key={i} className="b2b-ind-card" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="b2b-ind-card__icon" aria-hidden="true">{ind.icon}</div>
                  <div className="b2b-ind-card__count">{ind.count}</div>
                  <h3 className="b2b-ind-card__name">{ind.name}</h3>
                  <p className="b2b-ind-card__desc">{ind.desc}</p>
                  <div className="b2b-ind-card__bar" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="b2b-section" ref={procReveal.ref}>
          <div className="container">
            <div className={`b2b-section__header${procReveal.vis ? ' b2b-vis' : ''}`}>
              <span className="b2b-eyebrow">How it works</span>
              <h2 className="b2b-h2">From enquiry to installed, in four steps</h2>
            </div>
            <div className={`b2b-process${procReveal.vis ? ' b2b-vis' : ''}`}>
              {PROCESS.map((step, i) => (
                <div key={i} className="b2b-step" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="b2b-step__num">{step.n}</div>
                  <div className="b2b-step__body">
                    <h3 className="b2b-step__label">{step.label}</h3>
                    <p className="b2b-step__desc">{step.desc}</p>
                  </div>
                  {i < PROCESS.length - 1 && <div className="b2b-step__connector" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <section className="b2b-section b2b-section--alt" ref={testimonialReveal.ref}>
          <div className="container">
            <div className={`b2b-section__header${testimonialReveal.vis ? ' b2b-vis' : ''}`}>
              <span className="b2b-eyebrow">Client Stories</span>
              <h2 className="b2b-h2">Trusted by food businesses across India</h2>
            </div>
            <div className={`b2b-testimonials${testimonialReveal.vis ? ' b2b-vis' : ''}`}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="b2b-tcard" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="b2b-tcard__mark" aria-hidden="true">"</div>
                  <p className="b2b-tcard__q">{t.q}</p>
                  <div className="b2b-tcard__meta">
                    <strong className="b2b-tcard__name">{t.name}</strong>
                    <span className="b2b-tcard__role">{t.title}</span>
                    <span className="b2b-tcard__co">{t.co}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="b2b-cta">
          <div className="b2b-orb b2b-orb--cta1" aria-hidden="true" />
          <div className="b2b-orb b2b-orb--cta2" aria-hidden="true" />
          <div className="container b2b-cta__inner">
            <div className="b2b-cta__copy">
              <span className="b2b-eyebrow b2b-eyebrow--light">Ready to scale?</span>
              <h2 className="b2b-cta__h2">Let's equip your<br /><em>next kitchen</em></h2>
              <p className="b2b-cta__sub">Share your requirements and we'll have a B2B proposal to you within 24 hours. No obligation.</p>
            </div>
            <div className="b2b-cta__actions">
              <a
                href={`https://wa.me/${'+919687861313'.replace(/\D/g, '')}?text=Hi%2C%20I%20want%20to%20enquire%20about%20B2B%20pricing%20for%20commercial%20kitchen%20equipment`}
                target="_blank" rel="noopener noreferrer"
                className="b2b-btn b2b-btn--gold b2b-btn--lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <a href="tel:+919687861313" className="b2b-btn b2b-btn--outline b2b-btn--lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Now
              </a>
              <Link href="/contact?type=quote" className="b2b-btn b2b-btn--ghost b2b-btn--lg">
                Fill Enquiry Form
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

/* ─── CSS ──────────────────────────────────────────────────────── */

const B2B_CSS = `
/* Root tokens */
.b2b {
  --b2b-bg:   #06080f;
  --b2b-bg2:  #0a0e1a;
  --b2b-card: #0d1220;
  --b2b-gold: #c4882a;
  --b2b-gold2:#e4a84a;
  --b2b-line: rgba(196,136,42,0.18);
  --b2b-glass:rgba(255,255,255,0.03);
  background: var(--b2b-bg);
  color: #fff;
  overflow-x: hidden;
}

/* ── Utility ── */
.b2b-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--b2b-gold);
  margin-bottom: 0.9rem;
}
.b2b-eyebrow--light { color: rgba(196,136,42,0.75); }

.b2b-h2 {
  font-size: clamp(1.9rem, 3.5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 2.5rem;
}

.b2b-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  font-size: 0.9rem; font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
  white-space: nowrap;
}
.b2b-btn:hover { transform: translateY(-2px); }
.b2b-btn--gold {
  background: var(--b2b-gold);
  color: #fff;
  box-shadow: 0 4px 24px rgba(196,136,42,0.35);
}
.b2b-btn--gold:hover {
  background: var(--b2b-gold2);
  box-shadow: 0 6px 32px rgba(196,136,42,0.5);
}
.b2b-btn--outline {
  background: transparent;
  color: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.22);
}
.b2b-btn--outline:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
.b2b-btn--ghost {
  background: transparent;
  color: rgba(255,255,255,0.55);
  border: 1px solid transparent;
}
.b2b-btn--ghost:hover { color: rgba(255,255,255,0.85); }
.b2b-btn--lg { padding: 1.1rem 2.2rem; font-size: 1rem; }

/* ── Orbs ── */
.b2b-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: b2b-float 8s ease-in-out infinite;
}
.b2b-orb--1 { width: 420px; height: 420px; background: rgba(196,136,42,0.1); top: -60px; right: 10%; animation-delay: 0s; }
.b2b-orb--2 { width: 280px; height: 280px; background: rgba(80,120,220,0.08); bottom: 10%; left: 5%; animation-delay: -3s; }
.b2b-orb--3 { width: 200px; height: 200px; background: rgba(196,136,42,0.07); top: 40%; left: 30%; animation-delay: -6s; }
.b2b-orb--cta1 { width: 500px; height: 500px; background: rgba(196,136,42,0.12); top: -100px; left: -100px; animation-delay: 0s; }
.b2b-orb--cta2 { width: 300px; height: 300px; background: rgba(100,80,220,0.1); bottom: -60px; right: 5%; animation-delay: -4s; }

@keyframes b2b-float {
  0%,100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-28px) scale(1.04); }
}

/* ── Section base ── */
.b2b-section { padding: clamp(5rem, 8vw, 9rem) 0; }
.b2b-section--alt { background: var(--b2b-bg2); }

.b2b-section__header { text-align: center; opacity: 0; transform: translateY(30px); transition: opacity 0.7s, transform 0.7s; }
.b2b-section__header.b2b-vis { opacity: 1; transform: translateY(0); }

/* ── Reveal animation ── */
.b2b-vis { animation: b2b-fadeUp 0.7s ease both; }
@keyframes b2b-fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── HERO ── */
.b2b-hero {
  position: relative;
  min-height: 100svh;
  display: flex; flex-direction: column; justify-content: center;
  overflow: hidden;
  padding: 7rem 0 5rem;
  background: radial-gradient(ellipse at 70% 10%, rgba(196,136,42,0.07) 0%, transparent 60%),
              radial-gradient(ellipse at 10% 80%, rgba(60,80,180,0.06) 0%, transparent 55%),
              var(--b2b-bg);
}

.b2b-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative; z-index: 1;
}

.b2b-hero__copy { opacity: 0; transform: translateY(40px); transition: opacity 0.9s 0.1s, transform 0.9s 0.1s; }
.b2b-hero__copy.b2b-vis { opacity: 1; transform: translateY(0); }

.b2b-hero__h1 {
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin: 0.6rem 0 1.4rem;
}

.b2b-hero__cycle {
  display: block;
  color: var(--b2b-gold);
  transition: opacity 0.3s, transform 0.3s;
  min-height: 1.1em;
}
.b2b-cycle-in  { opacity: 1; transform: translateY(0); }
.b2b-cycle-out { opacity: 0; transform: translateY(16px); }

.b2b-hero__sub {
  color: rgba(255,255,255,0.6);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 46ch;
  margin: 0 0 2.2rem;
}
.b2b-hero__ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

.b2b-hero__stats {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.9s 0.3s, transform 0.9s 0.3s;
}
.b2b-hero__stats.b2b-vis { opacity: 1; transform: translateY(0); }

.b2b-stat-card {
  background: var(--b2b-glass);
  border: 1px solid var(--b2b-line);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 1.8rem 1.5rem;
  transition: transform 0.25s, border-color 0.25s, background 0.25s;
}
.b2b-stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(196,136,42,0.4);
  background: rgba(255,255,255,0.05);
}
.b2b-stat-card__n {
  display: block;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 900;
  color: var(--b2b-gold);
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0.4rem;
}
.b2b-stat-card__l {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Scroll cue */
.b2b-scroll-cue {
  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
  width: 28px; height: 48px;
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 20px;
}
.b2b-scroll-cue span {
  display: block; width: 4px; height: 10px;
  background: var(--b2b-gold); border-radius: 2px;
  margin: 7px auto;
  animation: b2b-scroll 2s ease infinite;
}
@keyframes b2b-scroll {
  0%   { transform: translateY(0); opacity: 1; }
  80%  { transform: translateY(16px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}

/* ── TICKER ── */
.b2b-ticker {
  background: var(--b2b-gold);
  overflow: hidden;
  padding: 0.9rem 0;
  user-select: none;
}
.b2b-ticker__track {
  display: flex; white-space: nowrap;
  animation: b2b-marquee 30s linear infinite;
}
.b2b-ticker__track:hover { animation-play-state: paused; }
.b2b-ticker__item {
  flex-shrink: 0;
  font-size: 0.72rem; font-weight: 800; letter-spacing: 0.16em;
  text-transform: uppercase; color: rgba(0,0,0,0.75);
  display: flex; align-items: center; padding: 0 1.5rem;
}
.b2b-ticker__dot {
  display: inline-block; width: 5px; height: 5px;
  background: rgba(0,0,0,0.4); border-radius: 50%; margin-left: 1.5rem;
}
@keyframes b2b-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}

/* ── BENTO ── */
.b2b-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1.2rem;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s 0.15s, transform 0.6s 0.15s;
}
.b2b-bento.b2b-vis { opacity: 1; transform: translateY(0); }
.b2b-bento.b2b-vis .b2b-bento__card { animation: b2b-fadeUp 0.6s ease both; }

.b2b-bento__card {
  position: relative; overflow: hidden;
  background: var(--b2b-card);
  border: 1px solid var(--b2b-line);
  border-radius: 20px;
  padding: 2rem 1.8rem;
  transition: transform 0.25s, border-color 0.25s;
}
.b2b-bento__card:hover { transform: translateY(-5px); border-color: rgba(196,136,42,0.4); }
.b2b-bento__card:hover .b2b-bento__glow { opacity: 1; }
.b2b-bento__card--wide { grid-column: span 2; }

.b2b-bento__glow {
  position: absolute; inset: 0; pointer-events: none; opacity: 0;
  background: radial-gradient(circle at 30% 50%, rgba(196,136,42,0.08) 0%, transparent 65%);
  transition: opacity 0.4s;
}

.b2b-bento__tag {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--b2b-gold);
  display: block; margin-bottom: 1rem;
}
.b2b-bento__icon { font-size: 2rem; margin-bottom: 0.9rem; display: block; }
.b2b-bento__title {
  font-size: 1.15rem; font-weight: 800; margin: 0 0 0.6rem; letter-spacing: -0.01em;
}
.b2b-bento__desc { font-size: 0.875rem; color: rgba(255,255,255,0.55); line-height: 1.65; margin: 0; }

/* ── INDUSTRIES ── */
.b2b-industries {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s 0.15s, transform 0.6s 0.15s;
}
.b2b-industries.b2b-vis { opacity: 1; transform: translateY(0); }
.b2b-industries.b2b-vis .b2b-ind-card { animation: b2b-fadeUp 0.6s ease both; }

.b2b-ind-card {
  position: relative; overflow: hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 2rem 1.6rem 1.6rem;
  transition: transform 0.25s, border-color 0.25s, background 0.25s;
  cursor: default;
}
.b2b-ind-card:hover {
  transform: translateY(-6px) scale(1.015);
  border-color: rgba(196,136,42,0.35);
  background: rgba(255,255,255,0.045);
}
.b2b-ind-card:hover .b2b-ind-card__bar { width: 60%; }

.b2b-ind-card__icon { font-size: 2.2rem; display: block; margin-bottom: 0.8rem; }
.b2b-ind-card__count {
  font-size: 1.9rem; font-weight: 900; color: var(--b2b-gold);
  letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.4rem;
}
.b2b-ind-card__name { font-size: 1rem; font-weight: 700; margin: 0 0 0.6rem; }
.b2b-ind-card__desc { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.6; margin: 0; }
.b2b-ind-card__bar {
  position: absolute; bottom: 0; left: 0;
  height: 2px; width: 0;
  background: linear-gradient(90deg, var(--b2b-gold), transparent);
  transition: width 0.4s ease;
}

/* ── PROCESS ── */
.b2b-process {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0; position: relative;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s 0.1s, transform 0.6s 0.1s;
}
.b2b-process.b2b-vis { opacity: 1; transform: translateY(0); }
.b2b-process.b2b-vis .b2b-step { animation: b2b-fadeUp 0.6s ease both; }

.b2b-step {
  position: relative;
  padding: 2.5rem 2rem 2.5rem 0;
}
.b2b-step:not(:first-child) { padding-left: 2rem; }

.b2b-step__connector {
  position: absolute; top: 3rem; right: 0;
  width: 100%; height: 2px;
  background: linear-gradient(90deg, rgba(196,136,42,0.6), rgba(196,136,42,0.1));
  pointer-events: none;
}

.b2b-step__num {
  font-size: 3.5rem; font-weight: 900;
  color: rgba(196,136,42,0.15);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1rem;
  font-variant-numeric: tabular-nums;
}

.b2b-step__label {
  font-size: 1.15rem; font-weight: 800;
  margin: 0 0 0.6rem;
}
.b2b-step__desc {
  font-size: 0.85rem; color: rgba(255,255,255,0.5);
  line-height: 1.7; margin: 0;
}

/* ── TESTIMONIALS ── */
.b2b-testimonials {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s 0.15s, transform 0.6s 0.15s;
}
.b2b-testimonials.b2b-vis { opacity: 1; transform: translateY(0); }
.b2b-testimonials.b2b-vis .b2b-tcard { animation: b2b-fadeUp 0.6s ease both; }

.b2b-tcard {
  background: var(--b2b-card);
  border: 1px solid var(--b2b-line);
  border-radius: 20px;
  padding: 2.2rem 2rem;
  transition: transform 0.25s, border-color 0.25s;
  display: flex; flex-direction: column;
}
.b2b-tcard:hover { transform: translateY(-5px); border-color: rgba(196,136,42,0.35); }

.b2b-tcard__mark {
  font-size: 5rem; line-height: 0.6;
  color: var(--b2b-gold); opacity: 0.4;
  font-family: Georgia, serif;
  margin-bottom: 1.2rem; display: block;
}
.b2b-tcard__q {
  font-size: 0.95rem; line-height: 1.75;
  color: rgba(255,255,255,0.8);
  margin: 0 0 1.5rem; flex: 1;
  font-style: italic;
}
.b2b-tcard__meta { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.2rem; }
.b2b-tcard__name { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.2rem; }
.b2b-tcard__role { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.4); }
.b2b-tcard__co { display: block; font-size: 0.75rem; color: var(--b2b-gold); opacity: 0.75; margin-top: 0.3rem; }

/* ── CTA ── */
.b2b-cta {
  position: relative; overflow: hidden;
  padding: clamp(5rem, 9vw, 10rem) 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(196,136,42,0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 50%, rgba(60,80,200,0.07) 0%, transparent 60%),
              var(--b2b-bg2);
  border-top: 1px solid var(--b2b-line);
}
.b2b-cta__inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
  position: relative; z-index: 1;
}
.b2b-cta__h2 {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 900; line-height: 1.1;
  letter-spacing: -0.03em; margin: 0.6rem 0 1.2rem;
}
.b2b-cta__h2 em { font-style: normal; color: var(--b2b-gold); }
.b2b-cta__sub {
  color: rgba(255,255,255,0.5);
  font-size: 1rem; line-height: 1.7; margin: 0;
}
.b2b-cta__actions { display: flex; flex-direction: column; gap: 1rem; }
.b2b-cta__actions .b2b-btn { justify-content: center; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .b2b-bento { grid-template-columns: repeat(2, 1fr); }
  .b2b-bento__card--wide { grid-column: span 2; }
  .b2b-industries { grid-template-columns: repeat(2, 1fr); }
  .b2b-process { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  .b2b-step__connector { display: none; }
  .b2b-testimonials { grid-template-columns: 1fr 1fr; }
  .b2b-testimonials .b2b-tcard:last-child { grid-column: span 2; }
  .b2b-cta__inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .b2b-cta__actions { flex-direction: row; flex-wrap: wrap; }
}

@media (max-width: 768px) {
  .b2b-hero__inner { grid-template-columns: 1fr; gap: 3rem; }
  .b2b-hero__h1 { font-size: clamp(2.2rem, 8vw, 3rem); }
  .b2b-hero__stats { grid-template-columns: 1fr 1fr; }
  .b2b-bento { grid-template-columns: 1fr; }
  .b2b-bento__card--wide { grid-column: span 1; }
  .b2b-industries { grid-template-columns: 1fr 1fr; }
  .b2b-process { grid-template-columns: 1fr; }
  .b2b-testimonials { grid-template-columns: 1fr; }
  .b2b-testimonials .b2b-tcard:last-child { grid-column: span 1; }
  .b2b-cta__actions { flex-direction: column; }
  .b2b-cta__inner { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .b2b-industries { grid-template-columns: 1fr; }
  .b2b-hero__stats { grid-template-columns: 1fr 1fr; }
  .b2b-hero__ctas { flex-direction: column; }
}
`;
