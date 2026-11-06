import { Link } from 'react-router-dom';
import { seo } from '../config/site';
import { getProductsByCategory } from '../config/products';
import { ProductCard } from '../components/product/ProductCard';

export function KitchenEquipmentPage() {
  const items = getProductsByCategory('kitchen-equipment');

  return (
    <>
      <title>{`Kitchen Equipment | ${seo.title}`}</title>
      <meta name="description" content="Professional kitchen equipment for commercial kitchens from Raj Tandoor. Contact us for product details and quotations." />
      <link rel="canonical" href={`${seo.siteUrl}/kitchen-equipment`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">Kitchen Equipment</li>
          </ol>
        </nav>

        <div className="container">
          <div className="page-header">
            <h1 className="page-h1">Kitchen Equipment</h1>
            <p className="page-intro">Professional kitchen equipment for commercial cooking environments. Product details and availability are provided on enquiry.</p>
          </div>

          {items.length === 0 ? (
            <div className="empty-state">
              <p>Kitchen equipment products are coming soon. Contact us to discuss your requirements.</p>
              <Link to="/contact?type=quote" className="btn btn--gold">Request Information</Link>
            </div>
          ) : (
            <ul className="product-grid" role="list">
              {items.map((p) => (
                <li key={p.id}><ProductCard product={p} /></li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
