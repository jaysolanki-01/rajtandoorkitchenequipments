import { Link } from 'react-router-dom';
import { seo } from '../config/site';

export function NotFoundPage() {
  return (
    <>
      <title>{`Page Not Found | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <div className="not-found">
            <p className="not-found__code" aria-hidden="true">404</p>
            <h1 className="not-found__heading">Page Not Found</h1>
            <p className="not-found__body">The page you were looking for doesn't exist or has been moved.</p>
            <div className="not-found__actions">
              <Link to="/" className="btn btn--gold">Back to Home</Link>
              <Link to="/shop" className="btn btn--outline">Browse Products</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
