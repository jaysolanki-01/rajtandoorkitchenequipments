'use client';
import { useState } from 'react';
import Link from 'next/link';
import { seo } from '../config/site';
import { insertQuote } from '../lib/supabase/db';

type Brochure = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  pages: string;
  items: string[];
  color: string;
};

const BROCHURES: Brochure[] = [
  {
    id: 'full-catalog',
    title: 'Full Product Catalog',
    subtitle: '2025 Edition',
    desc: 'Our complete range of commercial tandoors, kitchen equipment, and accessories. Specs, pricing guidance, and configuration options all in one document.',
    pages: '48 pages',
    items: ['All 14 product categories', 'Technical specifications', 'Pricing guidance', 'Installation notes'],
    color: '#c3a268',
  },
  {
    id: 'tandoor-range',
    title: 'Tandoor Equipment Range',
    subtitle: 'Specialist Brochure',
    desc: 'Deep dive into our stainless steel, copper finish, and gas tandoors. Clay-lined to commercial gas, every model, every size, side by side.',
    pages: '20 pages',
    items: ['SS & copper tandoor range', 'Gas vs solid-fuel comparison', 'Size & capacity guide', 'Accessories & spares'],
    color: '#b45309',
  },
  {
    id: 'kitchen-solutions',
    title: 'Commercial Kitchen Solutions',
    subtitle: 'Equipment Guide',
    desc: 'Cooking ranges, burners, food prep machines, refrigeration, ventilation: everything needed to outfit a commercial kitchen from scratch.',
    pages: '32 pages',
    items: ['Cooking ranges & burners', 'Food prep & bakery', 'Refrigeration & cold storage', 'Ventilation & exhaust'],
    color: '#0369a1',
  },
];

type FormState = { name: string; email: string; phone: string; brochure: string };
const empty = (): FormState => ({ name: '', email: '', phone: '', brochure: 'full-catalog' });

export function BrochurePage() {
  const [form, setForm] = useState<FormState>(empty());
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  function set(k: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus('sending');
    try {
      const chosen = BROCHURES.find(b => b.id === form.brochure);
      await insertQuote({
        customer_name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        product_interest: `Brochure Request: ${chosen?.title ?? form.brochure}`,
        source: 'brochure-page',
      });
      setStatus('done');
      setForm(empty());
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <title>{`Product Brochures & Catalog | ${seo.title}`}</title>
      <meta name="description" content="Download or request Raj Tandoor's product catalog and specialist brochures. Full specs, pricing guidance, and equipment ranges for commercial kitchens." />
      <link rel="canonical" href={`${seo.siteUrl}/brochure`} />

      <main id="main" tabIndex={-1} className="page-main">
        {/* Breadcrumb */}
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Brochures</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="brochure-hero">
          <div className="container brochure-hero__inner">
            <div className="brochure-hero__copy">
              <span className="brochure-hero__tag">Free Download</span>
              <h1 className="brochure-hero__title">Product Catalogs & Brochures</h1>
              <p className="brochure-hero__sub">
                Everything you need to plan your commercial kitchen. Full specs, dimensions, and pricing guidance,
                neatly packaged for sharing with your team or architect.
              </p>
              <div className="brochure-hero__actions">
                <a href="#request" className="btn btn--gold">Request by Email</a>
                <Link href="/shop" className="btn btn--outline">Browse Products</Link>
              </div>
            </div>
            <div className="brochure-hero__visual" aria-hidden="true">
              <div className="brochure-hero__cover">
                <div className="brochure-hero__cover-spine" />
                <div className="brochure-hero__cover-front">
                  <span className="brochure-hero__cover-logo">Raj Tandoor</span>
                  <span className="brochure-hero__cover-year">2025</span>
                  <span className="brochure-hero__cover-title">Product Catalog</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Brochure cards */}
          <section className="brochure-section">
            <h2 className="brochure-section__heading">Available Brochures</h2>
            <p className="brochure-section__sub">Request any brochure via email using the form below, or contact us directly.</p>

            <ul className="brochure-grid" role="list">
              {BROCHURES.map(b => (
                <li key={b.id} className="brochure-card">
                  <div className="brochure-card__cover" style={{ '--bc': b.color } as React.CSSProperties}>
                    <div className="brochure-card__cover-inner">
                      <span className="brochure-card__cover-name">{b.title}</span>
                      <span className="brochure-card__cover-sub">{b.subtitle}</span>
                    </div>
                    <div className="brochure-card__cover-pages">{b.pages}</div>
                  </div>
                  <div className="brochure-card__body">
                    <h3 className="brochure-card__title">{b.title}</h3>
                    <p className="brochure-card__desc">{b.desc}</p>
                    <ul className="brochure-card__items" role="list">
                      {b.items.map(item => (
                        <li key={item}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="#request" className="brochure-card__btn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      Request This Brochure
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Request form */}
          <section id="request" className="brochure-form-section">
            <div className="brochure-form-wrap">
              <div className="brochure-form-copy">
                <h2 className="brochure-form-title">Get It in Your Inbox</h2>
                <p className="brochure-form-desc">
                  Fill in your details and we'll email you the brochure of your choice, usually within one business day.
                </p>
                <ul className="brochure-form-perks" role="list">
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    No spam, just the brochure
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    Sent within 1 business day
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    High-resolution PDF
                  </li>
                </ul>
              </div>

              {status === 'done' ? (
                <div className="brochure-form-success">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
                  </svg>
                  <h3>Request Received!</h3>
                  <p>We'll email your brochure within one business day. Check your spam folder if it doesn't arrive.</p>
                  <Link href="/shop" className="btn btn--gold btn--sm" style={{ marginTop: '1rem' }}>Browse Products</Link>
                </div>
              ) : (
                <form className="brochure-form" onSubmit={handleSubmit} noValidate>
                  <div className="brochure-form__field">
                    <label htmlFor="bf-name">Full Name *</label>
                    <input id="bf-name" type="text" placeholder="Your name" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="brochure-form__field">
                    <label htmlFor="bf-email">Email Address *</label>
                    <input id="bf-email" type="email" placeholder="you@business.com" value={form.email} onChange={set('email')} required />
                  </div>
                  <div className="brochure-form__field">
                    <label htmlFor="bf-phone">Phone (optional)</label>
                    <input id="bf-phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className="brochure-form__field">
                    <label htmlFor="bf-brochure">Which brochure?</label>
                    <select id="bf-brochure" value={form.brochure} onChange={set('brochure')}>
                      {BROCHURES.map(b => (
                        <option key={b.id} value={b.id}>{b.title}</option>
                      ))}
                    </select>
                  </div>
                  {status === 'error' && (
                    <p className="brochure-form__error">Something went wrong. Please try again or contact us directly.</p>
                  )}
                  <button type="submit" className="btn btn--gold brochure-form__submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send Me the Brochure'}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
