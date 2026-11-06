import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [formOpen, setFormOpen] = useState(false);

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
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-section__inner">

          {/* Left: heading + info */}
          <div className="contact-section__header">
            <h2 id="contact-heading" className="section-title">Let's Discuss Your Kitchen Equipment Requirements</h2>
            <p className="section-subtitle">
              Looking for a tandoor or professional kitchen equipment for your business? Contact Raj Tandoor to discuss your requirements.
            </p>
            <Link to="/contact" className="btn btn--outline" style={{ marginTop: '1.25rem' }}>
              View full contact page
            </Link>
          </div>

          {/* Right: folded paper form */}
          <div className={`fold-paper${formOpen ? ' fold-paper--open' : ''}`}>

            {/* ── FACE (closed / folded state) ── */}
            <button
              className="fold-paper__face"
              type="button"
              aria-expanded={formOpen}
              aria-label="Open enquiry form"
              onClick={() => setFormOpen(true)}
            >
              {/* Envelope icon */}
              <span className="fold-paper__face-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 8.5 6a2 2 0 0 0 3 0L22 7" />
                </svg>
              </span>
              <span className="fold-paper__face-title">Enquiry Form</span>
              <span className="fold-paper__face-sub">Tap to open and fill in your details</span>
              <span className="fold-paper__face-cta" aria-hidden="true">
                Open form
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
            </button>

            {/* ── BODY (open / unfolded state) ── */}
            <div className="fold-paper__body" role="region" aria-label="Enquiry form" aria-hidden={!formOpen}>
              <div className="fold-paper__body-inner">

                {/* Mini-header inside the open card */}
                <div className="fold-paper__body-header">
                  <span className="fold-paper__body-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 8.5 6a2 2 0 0 0 3 0L22 7" />
                    </svg>
                    Enquiry Form
                  </span>
                  <button type="button" className="fold-paper__close" aria-label="Close form" onClick={() => setFormOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {status === 'success' && (
                  <div className="form-status form-status--success" role="alert">
                    <strong>Enquiry received.</strong> The Raj Tandoor team will be in touch shortly.
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
                    <button type="submit" className="btn btn--gold btn--lg" style={{ width: '100%' }} disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>{/* /fold-paper */}
        </div>
      </div>
    </section>
  );
}
