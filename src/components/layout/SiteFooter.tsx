import { useState } from 'react';
import { Link } from 'react-router-dom';
import { brand, contact, footerColumns, social } from '../../config/site';
import type { JSX } from 'react';
import { BrandMark } from '../BrandMark';

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  };
  return icons[name] ?? null;
}

export function SiteFooter() {
  const [openCol, setOpenCol] = useState<number | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer className="sf" role="contentinfo">
      <div className="sf__main container">
        {/* Brand column */}
        <div className="sf__brand">
          <Link to="/" aria-label={brand.fullName} className="sf__logo">
            <BrandMark size="sm" theme="light" />
          </Link>
          <p className="sf__desc">
            Professional tandoors and kitchen equipment for restaurants, hotels, catering businesses, and commercial kitchens.
          </p>
          {/* Social links — shown only when configured */}
          {Object.entries(social).some(([, v]) => v) && (
            <ul className="sf__social" role="list" aria-label="Social media links">
              {Object.entries(social).map(([key, url]) =>
                url ? (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={key.charAt(0).toUpperCase() + key.slice(1)}>
                      <SocialIcon name={key} />
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>

        {/* Nav columns */}
        {footerColumns.map((col, i) => (
          <div key={col.heading} className="sf__col">
            <button
              className="sf__col-toggle"
              type="button"
              aria-expanded={openCol === i}
              onClick={() => setOpenCol((v) => (v === i ? null : i))}
              aria-controls={`sf-col-${i}`}
            >
              {col.heading}
              <svg className={`sf__chevron ${openCol === i ? 'sf__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <h3 className="sf__col-heading">{col.heading}</h3>
            <ul id={`sf-col-${i}`} className={`sf__links ${openCol === i ? 'sf__links--open' : ''}`} role="list">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact column */}
        <div className="sf__col">
          <button
            className="sf__col-toggle"
            type="button"
            aria-expanded={openCol === footerColumns.length}
            onClick={() => setOpenCol((v) => (v === footerColumns.length ? null : footerColumns.length))}
            aria-controls="sf-col-contact"
          >
            Contact
            <svg className={`sf__chevron ${openCol === footerColumns.length ? 'sf__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <h3 className="sf__col-heading">Contact</h3>
          <ul id="sf-col-contact" className={`sf__links sf__links--contact ${openCol === footerColumns.length ? 'sf__links--open' : ''}`} role="list">
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            )}
            {contact.address && (
              <li>
                <address style={{ fontStyle: 'normal' }}>
                  {contact.address}
                  {contact.city && `, ${contact.city}`}
                  {contact.state && `, ${contact.state}`}
                </address>
              </li>
            )}
            {contact.businessHours && <li>{contact.businessHours}</li>}
            {!contact.phone && !contact.email && !contact.address && (
              <li className="sf__placeholder">
                Available for enquiries — use the form below or visit our contact page.
              </li>
            )}
            <li style={{ marginTop: '0.5rem' }}>
              <Link to="/contact?type=quote" className="btn btn--gold btn--sm">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sf__bottom">
        <div className="container sf__bottom-inner">
          <p className="sf__copy">© {year} {brand.fullName}. All rights reserved.</p>
          <ul className="sf__legal" role="list">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/return-policy">Returns</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
