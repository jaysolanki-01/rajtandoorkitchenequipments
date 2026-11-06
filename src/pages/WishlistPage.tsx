import { Link } from 'react-router-dom';
import { seo } from '../config/site';
import { products } from '../config/products';
import { useWishlist } from '../store/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';

export function WishlistPage() {
  const { ids } = useWishlist();
  const wishlistProducts = products.filter((p) => ids.has(p.id));

  return (
    <>
      <title>{`Wishlist | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">Wishlist</li>
          </ol>
        </nav>

        <div className="container">
          <div className="page-header">
            <h1 className="page-h1">
              Your Wishlist
              {ids.size > 0 && <span className="page-h1-count"> ({ids.size})</span>}
            </h1>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="empty-state">
              <p>Your wishlist is empty. Browse our products and click the heart icon to save items.</p>
              <Link to="/shop" className="btn btn--gold">Browse Products</Link>
            </div>
          ) : (
            <ul className="product-grid" role="list">
              {wishlistProducts.map((p) => (
                <li key={p.id}><ProductCard product={p} /></li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
