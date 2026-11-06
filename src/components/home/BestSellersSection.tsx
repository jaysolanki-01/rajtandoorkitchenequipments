import { Link } from 'react-router-dom';
import { products } from '../../config/products';
import { ProductCard } from '../product/ProductCard';

// Curated best-seller IDs — update when sales data is available
const BEST_SELLER_IDS = [
  'ss-tandoor-mini',
  'ss-tandoor-medium',
  'ss-tandoor-large',
  'copper-tandoor-medium',
];

const bestSellers = BEST_SELLER_IDS
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean) as typeof products;

export function BestSellersSection() {
  if (bestSellers.length === 0) return null;

  return (
    <section className="best-sellers-section section-pad" aria-labelledby="best-sellers-heading">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Most Popular</p>
          <h2 id="best-sellers-heading" className="section-title">Customer Favourites</h2>
          <p className="section-subtitle">Our most-requested commercial tandoors, chosen by restaurants and catering teams.</p>
        </div>

        <ul className="product-grid" role="list" aria-label="Best selling products">
          {bestSellers.map((p) => (
            <li key={p.id}><ProductCard product={p} /></li>
          ))}
        </ul>

        <div className="section-footer">
          <Link to="/shop" className="btn btn--outline">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
