import { Link } from 'react-router-dom';
import { seo } from '../config/site';
import { FAQAccordion } from '../components/home/FAQAccordion';

export function FAQPage() {
  return (
    <>
      <title>{`FAQ | ${seo.title}`}</title>
      <meta name="description" content="Answers to common questions about Raj Tandoor products, ordering, delivery, customisation, and after-sales support." />
      <link rel="canonical" href={`${seo.siteUrl}/faq`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">FAQ</li>
          </ol>
        </nav>

        <div className="container" style={{ maxWidth: 760, paddingTop: '2rem' }}>
          <div className="page-intro-block">
            <h1 className="page-h1">Frequently Asked Questions</h1>
            <p className="page-intro">Common questions about our products and services. For anything not covered here, <Link to="/contact">contact the team directly</Link>.</p>
          </div>
        </div>

        <FAQAccordion />

        <div className="container" style={{ maxWidth: 760, paddingBottom: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--rt-charcoal)', opacity: 0.65, marginBottom: '1.25rem' }}>Didn't find your answer?</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--gold">Contact Us</Link>
            <Link to="/request-quote" className="btn btn--outline">Request a Quote</Link>
          </div>
        </div>
      </main>
    </>
  );
}
