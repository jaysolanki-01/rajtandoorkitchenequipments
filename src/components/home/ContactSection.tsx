import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contact } from '../../config/site';

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

export function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      businessName: raw.business,
      enquiryType: raw.enquiryType,
      productInterest: raw.product,
      message: raw.message,
    };
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
    <section id="contact" className="contact-section section-pad" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-section__inner">

          {/* Left: heading + contact details */}
          <div className="contact-section__header">
            <p className="eyebrow contact-section__eyebrow">Get in touch</p>
            <h2 id="contact-heading" className="section-title">
              Let's discuss your kitchen requirements
            </h2>
            <p className="section-subtitle">
              Looking for a tandoor or professional kitchen equipment for your business? Contact Raj Tandoor to discuss your requirements.
            </p>

            <div className="contact-section__details">
              {contact.phone && (
                <div className="contact-section__detail">
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
              )}
              {contact.email && (
                <div className="contact-section__detail">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              )}
              {contact.address && (
                <div className="contact-section__detail">
                  <address style={{ fontStyle: 'normal' }}>
                    {contact.address}{contact.city && `, ${contact.city}`}{contact.state && `, ${contact.state}`}
                  </address>
                </div>
              )}
            </div>

            <Link to="/contact" className="btn btn--outline contact-section__link">
              View full contact page →
            </Link>
          </div>

          {/* Right: always-visible form in a white card */}
          <div className="contact-section__form-wrap">
            {status === 'success' ? (
              <div className="form-status form-status--success" role="alert">
                <strong>Enquiry received.</strong> The Raj Tandoor team will be in touch shortly.
              </div>
            ) : (
              <>
                {status === 'error' && (
                  <div className="form-status form-status--error" role="alert">
                    <strong>Submission failed.</strong> {errorMsg || 'Please try again or contact us directly.'}
                  </div>
                )}
                <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="cf-name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
                      <input id="cf-name" name="name" type="text" className="form-input" required autoComplete="name" placeholder="Your full name" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cf-business" className="form-label">Business Name <span className="form-optional">(optional)</span></label>
                      <input id="cf-business" name="business" type="text" className="form-input" autoComplete="organization" placeholder="Restaurant, hotel, etc." />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="cf-email" className="form-label">Email Address <span aria-hidden="true">*</span></label>
                      <input id="cf-email" name="email" type="email" className="form-input" required autoComplete="email" placeholder="you@example.com" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cf-phone" className="form-label">Phone Number <span className="form-optional">(optional)</span></label>
                      <input id="cf-phone" name="phone" type="tel" className="form-input" autoComplete="tel" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="cf-product" className="form-label">Product of Interest</label>
                      <input id="cf-product" name="product" type="text" className="form-input" placeholder="e.g. Stainless Steel Tandoor" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cf-type" className="form-label">Enquiry Type <span aria-hidden="true">*</span></label>
                      <select id="cf-type" name="enquiryType" className="form-input form-select" required>
                        <option value="">Select type…</option>
                        {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="cf-message" className="form-label">Message <span aria-hidden="true">*</span></label>
                    <textarea id="cf-message" name="message" className="form-input form-textarea" required rows={4} placeholder="Describe your requirements…" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn--gold btn--lg"
                    style={{ width: '100%' }}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
