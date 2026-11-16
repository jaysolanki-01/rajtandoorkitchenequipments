'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { brand } from '../config/site';

/* ── Scroll-reveal: adds .b2b-vis to every [data-reveal] element when it enters the viewport ── */
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('b2b-vis'); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Animated number counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = spanRef.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const dur = 1800;
      let start: number | null = null;
      let raf: number;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={spanRef}>{val}{suffix}</span>;
}

/* ── Image placeholder — replace <ImgSlot> with an <img> tag when you have photos ── */
function ImgSlot({ label, aspect = '4/3' }: { label: string; aspect?: string }) {
  return (
    <div className="b2b-imgslot" style={{ aspectRatio: aspect }} aria-label={label}>
      {/* ↓ Replace this entire div with <img src="..." alt="..." /> when ready */}
      <div className="b2b-imgslot__ph" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>
        <span>Add Photo</span>
        <small>{label}</small>
      </div>
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────────────── */

const STATS = [
  { to: 500, suffix: '+', label: 'Kitchens Equipped' },
  { to: 14,  suffix: '+', label: 'Equipment Categories' },
  { to: 24,  suffix: 'hr', label: 'Quote Turnaround' },
  { to: 100, suffix: '+', label: 'Cities Served' },
];

const WHO_WE_SERVE = [
  {
    title: 'Restaurants & Dhabas',
    desc: 'From single outlets to multi-chain operations.',
    tags: ['Tandoors', 'Cooking Ranges', 'Fryers', 'Refrigeration'],
  },
  {
    title: 'Hotels & Resorts',
    desc: 'Full-kitchen solutions for hospitality at any scale.',
    tags: ['Banquet Lines', 'Cold Rooms', 'Custom Fabrication', 'Exhaust Systems'],
  },
  {
    title: 'Catering & Cloud Kitchens',
    desc: 'High-volume, mobile-ready equipment for event and delivery kitchens.',
    tags: ['Bulk Cookers', 'Warmers', 'Food Prep Machines', 'Storage'],
  },
  {
    title: 'Food Courts & Malls',
    desc: 'Compact, high-output equipment for dense foodservice layouts.',
    tags: ['Modular Counters', 'Display Warmers', 'Griddles', 'Beverage Equipment'],
  },
  {
    title: 'Institutional Canteens',
    desc: 'Hospitals, schools, corporates, and mess contractors.',
    tags: ['Bulk Cooking', 'Bain-Marie', 'Dishwashing', 'Work Tables'],
  },
  {
    title: 'Bakeries & QSRs',
    desc: 'Standardised equipment for chain roll-outs and central kitchens.',
    tags: ['Deck Ovens', 'Dough Mixers', 'Proofers', 'Stainless Fabrication'],
  },
];

const GALLERY_SLOTS = [
  { label: 'Restaurant kitchen setup photo', aspect: '4/3' },
  { label: 'Hotel commercial kitchen photo', aspect: '4/3' },
  { label: 'Custom fabrication / stainless steel work photo', aspect: '4/3' },
  { label: 'Tandoor installation photo', aspect: '4/3' },
  { label: 'Catering equipment setup photo', aspect: '16/9' },
  { label: 'Institutional canteen photo', aspect: '16/9' },
];

const WHY_US = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: 'Volume Pricing',
    desc: 'Multi-unit orders get itemised bulk rates. The more you procure, the better the per-unit cost — with no hidden charges.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: 'GST-Compliant Invoicing',
    desc: 'Full B2B tax invoices with HSN codes, enabling complete input-tax credit on your commercial purchases.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Dedicated Account Manager',
    desc: 'One point of contact — from your first enquiry through installation, warranty, and future reorders.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    title: 'Pan-India Delivery',
    desc: 'We handle freight, insurance, and last-mile for large equipment to any city — no self-arrangement needed.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'Installation & AMC',
    desc: 'On-site installation, gas-line testing, and optional Annual Maintenance Contracts for worry-free kitchen uptime.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: '1-Year Warranty',
    desc: 'All equipment comes with a minimum 12-month manufacturing warranty. Spare parts available across the range.',
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'Share Your Brief',
    detail: 'Send us your kitchen layout (even a rough sketch), daily cover count, cuisine type, and a list of equipment you need. The more detail, the sharper the quote.',
  },
  {
    step: '02',
    title: 'Receive a Detailed Quote',
    detail: 'We send itemised pricing with product specs, HSN codes, lead times, and delivery estimate — all within one business day.',
  },
  {
    step: '03',
    title: 'Approve & Manufacture',
    detail: 'Confirm the order with a purchase order or advance. Standard-stock items dispatch in days; custom fabrication gets a confirmed production schedule.',
  },
  {
    step: '04',
    title: 'Delivery & Go-Live',
    detail: 'Equipment arrives safely packed. Our team installs, tests, and hands over with a live-operation check and your staff walkthrough.',
  },
];

const INCLUDES = [
  'GST tax invoice with HSN codes',
  'Product warranty certificate',
  'Installation & commissioning',
  'Operating & maintenance manual',
  'Dedicated post-sale support contact',
  'Spare parts availability',
];

/* ── Page ─────────────────────────────────────────────────────────────────────── */

export function B2BPage() {
  useScrollReveal();

  return (
    <>
      <title>B2B & Commercial Supply | {brand.fullName}</title>
      <meta name="description" content="Complete commercial kitchen supply for restaurants, hotels, caterers and institutions. Volume pricing, custom fabrication, pan-India delivery, GST invoicing." />

      <main id="main" tabIndex={-1}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="b2b-hero" aria-label="B2B hero">
          <div className="b2b-hero__bg" aria-hidden="true" />

          <div className="b2b-hero__layout container">
            {/* Left — text */}
            <div className="b2b-hero__text">
              <span className="b2b-hero__eyebrow">Commercial Supply</span>
              <h1 className="b2b-hero__h1">
                Equip Your<br />Commercial Kitchen<br /><em>End‑to‑End</em>
              </h1>
              <p className="b2b-hero__sub">
                From a single tandoor to a full kitchen build-out — we supply, fabricate, deliver, and install for restaurants, hotels, caterers, and institutions across India.
              </p>
              <ul className="b2b-hero__pills" aria-label="Key features">
                {['Volume Pricing', 'GST Invoicing', 'Pan-India Delivery', 'Installation Included'].map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="b2b-hero__ctas">
                <Link href="/contact?type=quote" className="btn btn--gold b2b-hero__cta-primary">Request a Quote</Link>
                <Link href="/shop" className="btn btn--outline b2b-hero__cta-secondary">Browse Products</Link>
              </div>
            </div>

            {/* Right — hero image placeholder */}
            <div className="b2b-hero__img-wrap" data-reveal>
              {/* ↓ Replace ImgSlot with <img src="..." alt="Your commercial kitchen" /> */}
              <ImgSlot label="Hero — commercial kitchen or tandoor installation photo" aspect="3/4" />
              <div className="b2b-hero__img-badge" aria-hidden="true">
                <span>500+</span>
                <small>Kitchens Equipped</small>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <div className="b2b-stats" role="region" aria-label="Key statistics">
          <div className="container b2b-stats__inner">
            {STATS.map((s, i) => (
              <div key={s.label} className="b2b-stats__item" data-reveal style={{ '--si': i } as React.CSSProperties}>
                <strong className="b2b-stats__num">
                  <Counter href={s.to} suffix={s.suffix} />
                </strong>
                <span className="b2b-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Who we serve ──────────────────────────────────────────────────── */}
        <section className="b2b-who" aria-labelledby="b2b-who-heading">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="eyebrow">Who We Serve</span>
              <h2 id="b2b-who-heading" className="section-title">Built for Every Commercial Kitchen</h2>
              <p className="section-subtitle">Whether you're opening your first outlet or scaling a chain, we have the equipment and the experience to match.</p>
            </div>
            <ul className="b2b-who__grid" role="list">
              {WHO_WE_SERVE.map((item, i) => (
                <li key={item.title} className="b2b-who__card" data-reveal style={{ '--si': i } as React.CSSProperties}>
                  <h3 className="b2b-who__title">{item.title}</h3>
                  <p className="b2b-who__desc">{item.desc}</p>
                  <ul className="b2b-who__tags" aria-label="Typical equipment">
                    {item.tags.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────────────────── */}
        <section className="b2b-gallery" aria-labelledby="b2b-gallery-heading">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="eyebrow">Our Work</span>
              <h2 id="b2b-gallery-heading" className="section-title">Installations Across India</h2>
              <p className="section-subtitle">Every project is delivered to spec — on time, on budget, fully operational.</p>
            </div>
            {/* Top row — 4 equal columns */}
            <div className="b2b-gallery__row b2b-gallery__row--4" data-reveal>
              {GALLERY_SLOTS.slice(0, 4).map((s, i) => (
                <div key={i} className="b2b-gallery__cell" style={{ '--si': i } as React.CSSProperties}>
                  <ImgSlot label={s.label} aspect={s.aspect} />
                </div>
              ))}
            </div>
            {/* Bottom row — 2 wide */}
            <div className="b2b-gallery__row b2b-gallery__row--2" data-reveal>
              {GALLERY_SLOTS.slice(4).map((s, i) => (
                <div key={i} className="b2b-gallery__cell" style={{ '--si': i } as React.CSSProperties}>
                  <ImgSlot label={s.label} aspect={s.aspect} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why choose us ─────────────────────────────────────────────────── */}
        <section className="b2b-why" aria-labelledby="b2b-why-heading">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="eyebrow">Why Raj Tandoor</span>
              <h2 id="b2b-why-heading" className="section-title">Everything a Commercial Buyer Needs</h2>
              <p className="section-subtitle b2b-why__sub">Trusted by restaurant chains, hotel groups, and institutional kitchens for quality, support, and fair pricing.</p>
            </div>
            <ul className="b2b-why__grid" role="list">
              {WHY_US.map((item, i) => (
                <li key={item.title} className="b2b-why__card" data-reveal style={{ '--si': i } as React.CSSProperties}>
                  <div className="b2b-why__icon">{item.icon}</div>
                  <h3 className="b2b-why__title">{item.title}</h3>
                  <p className="b2b-why__desc">{item.desc}</p>
                </li>
              ))}
            </ul>

            {/* What's included panel */}
            <div className="b2b-includes" data-reveal>
              <p className="b2b-includes__heading">Every B2B order includes:</p>
              <ul className="b2b-includes__list" role="list">
                {INCLUDES.map(item => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────────────── */}
        <section className="b2b-process" aria-labelledby="b2b-process-heading">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="eyebrow">How It Works</span>
              <h2 id="b2b-process-heading" className="section-title">Simple. Fast. Reliable.</h2>
              <p className="section-subtitle">Four straightforward steps from first contact to a fully operational kitchen.</p>
            </div>
            <ol className="b2b-process__steps">
              {PROCESS.map((item, i) => (
                <li key={item.step} className="b2b-process__step" data-reveal style={{ '--si': i } as React.CSSProperties}>
                  <div className="b2b-process__connector" aria-hidden="true" />
                  <div className="b2b-process__circle" aria-hidden="true">{item.step}</div>
                  <h3 className="b2b-process__title">{item.title}</h3>
                  <p className="b2b-process__detail">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Showroom image strip ───────────────────────────────────────────── */}
        <section className="b2b-showroom" aria-labelledby="b2b-showroom-heading">
          <div className="container">
            <div className="b2b-showroom__inner" data-reveal>
              <div className="b2b-showroom__img">
                {/* ↓ Replace ImgSlot with your showroom / warehouse photo */}
                <ImgSlot label="Showroom or warehouse photo" aspect="16/9" />
              </div>
              <div className="b2b-showroom__copy">
                <span className="eyebrow">Visit Us</span>
                <h2 id="b2b-showroom-heading" className="b2b-showroom__h2">See Equipment Before You Buy</h2>
                <p>Browse our stocked showroom to touch, inspect, and compare equipment in person before committing to a large order. Bring your kitchen drawings — our team will walk you through the right configuration.</p>
                <ul className="b2b-showroom__list">
                  <li>Live display of tandoors, ranges &amp; fabrication</li>
                  <li>In-person consultation at no charge</li>
                  <li>Floor plan advice and equipment layout guidance</li>
                  <li>Immediate quotation on the spot</li>
                </ul>
                <Link href="/contact" className="btn btn--gold" style={{ marginTop: '1.75rem', display: 'inline-flex' }}>
                  Book a Showroom Visit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="b2b-cta" aria-label="B2B call to action">
          <div className="b2b-cta__bg" aria-hidden="true" />
          <div className="container b2b-cta__inner" data-reveal>
            <div className="b2b-cta__copy">
              <h2 className="b2b-cta__h2">Ready to Build Your Kitchen?</h2>
              <p className="b2b-cta__sub">Share your requirements and we'll return a detailed quote within one business day — no obligation, no pressure.</p>
            </div>
            <div className="b2b-cta__actions">
              <Link href="/contact?type=quote" className="btn btn--gold b2b-cta__btn">Get a Free Quote</Link>
              <Link href="/shop" className="btn btn--outline b2b-cta__btn-sec">View All Products</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
