'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { seo, contact } from '../config/site';

const ENDPOINT = '/api/contact';

const ENQUIRY_TYPES = [
  'Product enquiry',
  'Request a quote',
  'Bulk order enquiry',
  'Technical specification',
  'Delivery information',
  'General enquiry',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactPage() {
  const params = useSearchParams();
  const defaultType = params.get('type') === 'quote' ? 'Request a quote' : '';
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const data = { name: raw.name, email: raw.email, phone: raw.phone, businessName: raw.business, enquiryType: raw.enquiryType, productInterest: raw.product, message: raw.message };
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || `Error ${res.status}`);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  };

  return (
    <>
      <title>{`Contact Us | ${seo.title}`}</title>
      <meta name="description" content="Contact the Raj Tandoor team to enquire about products, request a quote, or discuss your commercial kitchen requirements." />
      <link rel="canonical" href={`${seo.siteUrl}/contact`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Contact Us</li>
          </ol>
        </nav>

        {/* Map section */}
        {contact.mapEmbedUrl && (
          <div className="contact-map">
            <div className="contact-map__inner">
              <iframe
                src={contact.mapEmbedUrl}
                title="Raj Tandoor & Kitchen Equipment location"
                className="contact-map__iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {'mapShareUrl' in contact && contact.mapShareUrl && (
                <a
                  href={(contact as { mapShareUrl: string }).mapShareUrl}
                  className="contact-map__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  View larger map
                </a>
              )}
            </div>
          </div>
        )}

        <div className="container">
          <div className="contact-page">
            {/* Intro */}
            <div className="contact-page__intro">
              <h1 className="page-h1">Let's Discuss Your Kitchen Equipment Requirements</h1>
              <p className="page-intro">Looking for a tandoor or professional kitchen equipment for your business? Contact the Raj Tandoor team to discuss your requirements.</p>

              {/* Contact details — only shown when configured */}
              {(contact.email || contact.phone || contact.address) && (
                <ul className="contact-details" aria-label="Contact details">
                  {contact.phone && (
                    <li><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
                  )}
                  {contact.email && (
                    <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                  )}
                  {contact.address && (
                    <li>
                      <address style={{ fontStyle: 'normal' }}>
                        {contact.address}{contact.city && `, ${contact.city}`}{contact.state && `, ${contact.state}`}
                      </address>
                    </li>
                  )}
                  {contact.businessHours && <li>{contact.businessHours}</li>}
                </ul>
              )}
            </div>

            {/* Form */}
            <div className="contact-page__form">
              {status === 'success' && (
                <div className="form-status form-status--success" role="alert">
                  <strong>Enquiry received.</strong> The Raj Tandoor team will be in touch with you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="form-status form-status--error" role="alert">
                  <strong>Submission failed.</strong> {errorMsg || 'Please try again or contact us directly.'}
                </div>
              )}

              {status !== 'success' && (
                <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="cp-name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
                      <input id="cp-name" name="name" type="text" className="form-input" required autoComplete="name" placeholder="Your full name" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cp-business" className="form-label">Business Name <span className="form-optional">(optional)</span></label>
                      <input id="cp-business" name="business" type="text" className="form-input" autoComplete="organization" placeholder="Restaurant, hotel, etc." />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="cp-email" className="form-label">Email Address <span aria-hidden="true">*</span></label>
                      <input id="cp-email" name="email" type="email" className="form-input" required autoComplete="email" placeholder="you@example.com" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cp-phone" className="form-label">Phone Number <span className="form-optional">(optional)</span></label>
                      <input id="cp-phone" name="phone" type="tel" className="form-input" autoComplete="tel" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="cp-product" className="form-label">Product of Interest</label>
                      <input id="cp-product" name="product" type="text" className="form-input" placeholder="e.g. Stainless Steel Tandoor" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cp-type" className="form-label">Enquiry Type <span aria-hidden="true">*</span></label>
                      <select id="cp-type" name="enquiryType" className="form-input form-select" required defaultValue={defaultType}>
                        <option value="">Select type…</option>
                        {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="cp-message" className="form-label">Message <span aria-hidden="true">*</span></label>
                    <textarea id="cp-message" name="message" className="form-input form-textarea" required rows={6} placeholder="Describe your requirements…" />
                  </div>
                  <button type="submit" className="btn btn--gold btn--lg" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
