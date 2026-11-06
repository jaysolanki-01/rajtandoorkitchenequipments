import { Link } from 'react-router-dom';
import { seo } from '../config/site';

export function AboutPage() {
  return (
    <>
      <title>{`About Us | ${seo.title}`}</title>
      <meta name="description" content="Learn about Raj Tandoor & Kitchen Equipment — suppliers of stainless-steel tandoors and professional kitchen equipment for commercial kitchens." />
      <link rel="canonical" href={`${seo.siteUrl}/about`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">About Us</li>
          </ol>
        </nav>

        <div className="container">
          <div className="page-header">
            <h1 className="page-h1">About Raj Tandoor &amp; Kitchen Equipment</h1>
          </div>

          <div className="prose-content">
            <p>
              Raj Tandoor &amp; Kitchen Equipment supplies stainless-steel tandoors and professional kitchen equipment designed for commercial cooking environments, including restaurants, hotels, catering businesses, and institutional food service.
            </p>

            <h2>Our Products</h2>
            <p>
              Our product range currently includes stainless-steel cylindrical tandoors built for the demands of professional kitchens. The tandoors feature a clay-lined cooking chamber, a removable lid, side handles, and a bottom firebox.
            </p>
            <p>
              We are expanding our range of commercial kitchen equipment. Contact us to enquire about availability and specifications.
            </p>

            <h2>Working with Us</h2>
            <p>
              We work with commercial kitchen buyers who require product information, specifications, and pricing before making a purchase decision. Use the enquiry form or contact us directly to discuss your requirements.
            </p>

            <div className="about-cta">
              <Link to="/shop" className="btn btn--gold btn--lg">Browse Products</Link>
              <Link to="/contact" className="btn btn--outline btn--lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
