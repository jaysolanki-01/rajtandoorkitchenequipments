import { Link } from 'react-router-dom';
import { seo } from '../config/site';
import { getProductsByCategory } from '../config/products';
import { ProductCard } from '../components/product/ProductCard';

export function TandoorsPage() {
  const tandoors = getProductsByCategory('tandoors');

  return (
    <>
      <title>{`Tandoors | ${seo.title}`}</title>
      <meta name="description" content="Explore stainless-steel tandoors designed for commercial kitchens, restaurants, and hotels from Raj Tandoor." />
      <link rel="canonical" href={`${seo.siteUrl}/tandoors`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">Tandoors</li>
          </ol>
        </nav>

        <div className="container">
          <div className="page-header">
            <h1 className="page-h1">Tandoors</h1>
            <p className="page-intro">Stainless-steel tandoors designed for commercial kitchens, restaurants, hotels, and catering businesses. Contact us for specifications and quotations.</p>
          </div>

          {tandoors.length === 0 ? (
            <div className="empty-state">
              <p>No tandoor products are currently listed. Please contact us for product information.</p>
              <Link to="/contact" className="btn btn--gold">Contact Us</Link>
            </div>
          ) : (
            <ul className="product-grid" role="list">
              {tandoors.map((p) => (
                <li key={p.id}><ProductCard product={p} /></li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
