'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { seo } from '../config/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function RequestQuotePage() {
  const params = useSearchParams();
  const prefillProduct = params.get('product') ?? '';

  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', businessName: '',
    productInterest: prefillProduct, quantity: '', requirements: '', deliveryLocation: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.requirements.trim()) {
      setError('Please fill in all required fields.'); return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/quotes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          email: form.email,
          phone: form.phone,
          business_name: form.businessName,
          product_interest: form.productInterest,
          quantity: form.quantity,
          requirements: form.requirements,
          delivery_location: form.deliveryLocation,
          source: 'quote-form',
        }),
      });
      const json = await res.json() as { reference?: string; error?: string };
      if (!res.ok || json.error) throw new Error(json.error ?? 'Submission failed.');
      setReference(json.reference ?? '');
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      setStatus('error');
    }
  }

  return (
    <>
      <title>{`Request a Quote | ${seo.title}`}</title>
      <meta name="description" content="Request a customised quotation for tandoors and commercial kitchen equipment from Raj Tandoor." />
      <link rel="canonical" href={`${seo.siteUrl}/request-quote`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Request a Quote</li>
          </ol>
        </nav>

        <div className="container" style={{ maxWidth: 760 }}>
          <div className="page-intro-block">
            <h1 className="page-h1">Request a Quote</h1>
            <p className="page-intro">Describe your requirements and the Raj Tandoor team will provide a detailed quotation. For bulk orders, customised specifications, or commercial kitchen projects, use this form.</p>
          </div>

          {status === 'success' ? (
            <div className="rq-success">
              <div className="rq-success__icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#2d7a4f"/>
                  <path d="M12 20.5l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="rq-success__title">Enquiry received.</h2>
              <p className="rq-success__sub">The Raj Tandoor team will be in touch with you shortly.</p>
              {reference && (
                <div className="rq-success__ref">
                  <span className="rq-success__ref-label">Your reference number</span>
                  <span className="rq-success__ref-value">{reference}</span>
                  <span className="rq-success__ref-hint">A confirmation email is on its way to you.</span>
                </div>
              )}
              <div className="rq-success__actions">
                <button
                  className="btn btn--outline"
                  onClick={() => {
                    setStatus('idle');
                    setReference('');
                    setError('');
                    setForm({ name: '', email: '', phone: '', businessName: '', productInterest: '', quantity: '', requirements: '', deliveryLocation: '' });
                  }}
                >
                  Request Another Quote
                </button>
                <Link href="/shop" className="btn btn--gold">Browse Products</Link>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Quote request form">
              {error && <div className="form-status form-status--error" role="alert">{error}</div>}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="rq-name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
                  <input id="rq-name" type="text" className="form-input" required value={form.name} onChange={set('name')} autoComplete="name" />
                </div>
                <div className="form-field">
                  <label htmlFor="rq-biz" className="form-label">Business Name <span className="form-optional">(optional)</span></label>
                  <input id="rq-biz" type="text" className="form-input" value={form.businessName} onChange={set('businessName')} autoComplete="organization" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="rq-email" className="form-label">Email Address <span aria-hidden="true">*</span></label>
                  <input id="rq-email" type="email" className="form-input" required value={form.email} onChange={set('email')} autoComplete="email" />
                </div>
                <div className="form-field">
                  <label htmlFor="rq-phone" className="form-label">Phone Number</label>
                  <input id="rq-phone" type="tel" className="form-input" required value={form.phone} onChange={set('phone')} autoComplete="tel" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="rq-product" className="form-label">Product of Interest</label>
                  <input id="rq-product" type="text" className="form-input" value={form.productInterest} onChange={set('productInterest')} placeholder="e.g. Stainless Steel Tandoor" />
                </div>
                <div className="form-field">
                  <label htmlFor="rq-qty" className="form-label">Quantity Required</label>
                  <input id="rq-qty" type="text" className="form-input" value={form.quantity} onChange={set('quantity')} placeholder="e.g. 2 units" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="rq-location" className="form-label">Delivery Location</label>
                <input id="rq-location" type="text" className="form-input" value={form.deliveryLocation} onChange={set('deliveryLocation')} placeholder="City, State" />
              </div>
              <div className="form-field">
                <label htmlFor="rq-req" className="form-label">Requirements <span aria-hidden="true">*</span></label>
                <textarea id="rq-req" className="form-input form-textarea" required rows={6} value={form.requirements} onChange={set('requirements')} placeholder="Describe your requirements, specifications, customization needs, or any questions…" />
              </div>
              <button type="submit" className="btn btn--gold btn--lg" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting…' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
