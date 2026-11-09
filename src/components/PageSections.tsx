import { useState, type FormEvent } from 'react';
import { brand, chapters, contact, links, productFeatures, productImage } from '../config/content';
import { BrandLockup } from './BrandMark';

/** Static version of the story chapters, shown when the visitor prefers reduced motion. */
export function StoryStatic() {
  return (
    <section className="section story-static" aria-label="Product highlights">
      <div className="container story-static__grid">
        {chapters.slice(1, 4).map((c) => (
          <article key={c.id} className="story-static__item">
            {c.eyebrow && <p className="eyebrow">{c.eyebrow}</p>}
            <h2 className="section__title section__title--sm">{c.heading.replace('\n', ' ')}</h2>
            <p>{c.body}</p>
            {c.features && (
              <ul className="tick-list">
                {c.features.map((f) => (
                  <li key={f.id}>{f.label}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductCollection() {
  return (
    <section id="tandoors" className="section collection" aria-labelledby="collection-title">
      <div className="container">
        <div className="section-header-block">
          <p className="eyebrow">Our collection</p>
          <h2 id="collection-title" className="section__title">
            Professional Tandoors<br />for Commercial Kitchens
          </h2>
          <p className="section__sub">
            Crafted for restaurants, catering businesses, and hospitality operations that demand authentic performance.
          </p>
        </div>
        <div className="collection__grid">
          <article className="product-card">
            <div className="product-card__media">
              <img
                src={productImage.src}
                alt={productImage.alt}
                width={productImage.width}
                height={productImage.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="product-card__body">
              <h3>Stainless-Steel Commercial Tandoor</h3>
              <p>A fully welded stainless-steel body with an authentic refractory-clay cooking chamber — built to perform in demanding professional kitchens day after day.</p>
              <ul className="tick-list">
                {productFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="cta-row">
                <a className="btn btn--primary" href={links.requestQuote}>
                  Get a Quote
                </a>
                <a className="btn btn--ghost" href={links.exploreTandoors}>
                  View Details
                </a>
              </div>
            </div>
          </article>

          <article id="kitchen-equipment" className="info-card">
            <p className="eyebrow">Kitchen equipment</p>
            <h3>Everything your kitchen needs</h3>
            <p>
              Beyond tandoors, {brand.fullName} supplies a range of professional kitchen equipment.
              Tell us about your operation and we'll help you find exactly the right fit.
            </p>
            <a className="btn btn--ghost" href={links.requestQuote}>
              Enquire about equipment
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__inner">
        <div>
          <p className="eyebrow">About us</p>
          <p className="about__statement">
            Tandoor craft.
            <em>Built for professionals.</em>
          </p>
        </div>
        <div>
          <h2 id="about-title" className="section__title--sm">{brand.fullName}</h2>
          <p className="about__lead">
            We specialise in commercial tandoors and professional kitchen equipment — combining traditional tandoor cooking
            with modern stainless-steel construction built for the demands of real service.
          </p>
          <ul className="about__facts">
            <li>Commercial tandoors for restaurants, caterers &amp; hospitality</li>
            <li>Stainless-steel construction with refractory-clay cooking chambers</li>
            <li>Professional kitchen equipment to complement every setup</li>
          </ul>
          <div className="cta-row">
            <a className="btn btn--outline-dark" href={links.requestQuote}>Request a Quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnquirySection() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'unconfigured'>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!contact.email) {
      console.warn('[Raj Tandoor] Set contact.email in src/config/content.ts to enable enquiries.');
      setStatus('unconfigured');
      return;
    }
    const get = (k: string) => String(data.get(k) ?? '').trim();
    const subject = `Quote request from ${get('name') || 'website visitor'}`;
    const body = [
      `Name: ${get('name')}`,
      `Business: ${get('business')}`,
      `Phone / email: ${get('reply')}`,
      '',
      get('message'),
    ].join('\n');
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  return (
    <section id="contact" className="section enquiry" aria-labelledby="enquiry-title">
      <div className="container enquiry__inner">
        <div className="enquiry__intro">
          <p className="eyebrow">Request a quote</p>
          <h2 id="enquiry-title" className="section__title">
            Let's find the right<br />equipment for you.
          </h2>
          <p>Share a few details about your kitchen and we'll get back to you with the right tandoor or equipment recommendation.</p>
          {contact.phone && (
            <p>
              Prefer to call? <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </p>
          )}
        </div>
        <form className="enquiry__form" onSubmit={onSubmit} noValidate={false}>
          <label>
            <span>Your name</span>
            <input name="name" autoComplete="name" placeholder="e.g. Raj Kumar" required />
          </label>
          <label>
            <span>Business name</span>
            <input name="business" autoComplete="organization" placeholder="Restaurant or company" />
          </label>
          <label className="enquiry__full">
            <span>Phone or email</span>
            <input name="reply" placeholder="Best way to reach you" required />
          </label>
          <label className="enquiry__full">
            <span>What do you need?</span>
            <textarea name="message" rows={4} placeholder="Tell us about your kitchen, the equipment you're looking for, or any questions you have." required />
          </label>
          <div className="enquiry__full enquiry__actions">
            <button type="submit" className="btn btn--primary btn--lg">
              Send Enquiry
            </button>
            <p className="enquiry__status" role="status" aria-live="polite">
              {status === 'sent' && 'Your email app should now open with your enquiry ready to send.'}
              {status === 'unconfigured' &&
                'Online enquiries are not connected yet. Please contact Raj Tandoor directly — thank you.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <BrandLockup />
        <p>
          © {new Date().getFullYear()} {brand.fullName}
        </p>
      </div>
    </footer>
  );
}
