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
        <p className="eyebrow">Our collection</p>
        <h2 id="collection-title" className="section__title">
          Professional Tandoors Built for Commercial Kitchens
        </h2>
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
              <h3>Stainless-Steel Tandoor</h3>
              <p>A cylindrical stainless-steel tandoor with a refractory-clay cooking chamber, designed for professional kitchens.</p>
              <ul className="tick-list">
                {productFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="cta-row">
                <a className="btn btn--primary" href={links.requestQuote}>
                  Request a Quote
                </a>
              </div>
            </div>
          </article>

          <article id="kitchen-equipment" className="info-card">
            <p className="eyebrow">Kitchen equipment</p>
            <h3>Equipment for professional kitchens</h3>
            <p>
              Alongside our tandoors, {brand.fullName} supplies professional kitchen equipment. Tell us about your kitchen,
              restaurant, catering business or hospitality operation and we will help you find the right equipment.
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
        <p className="eyebrow">About us</p>
        <h2 id="about-title" className="section__title">
          {brand.fullName}
        </h2>
        <p className="about__lead">
          We specialise in commercial tandoors and professional kitchen equipment, bringing together traditional tandoor
          cooking and modern stainless-steel construction.
        </p>
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
            Tell us about your kitchen.
          </h2>
          <p>Share a few details and our team will get back to you about the right tandoor or kitchen equipment.</p>
          {contact.phone && (
            <p>
              Prefer to talk? <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </p>
          )}
        </div>
        <form className="enquiry__form" onSubmit={onSubmit} noValidate={false}>
          <label>
            <span>Name</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>Business name</span>
            <input name="business" autoComplete="organization" />
          </label>
          <label>
            <span>Phone or email</span>
            <input name="reply" required />
          </label>
          <label className="enquiry__full">
            <span>What do you need?</span>
            <textarea name="message" rows={4} required />
          </label>
          <div className="enquiry__full enquiry__actions">
            <button type="submit" className="btn btn--primary btn--lg">
              Request a Quote
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
