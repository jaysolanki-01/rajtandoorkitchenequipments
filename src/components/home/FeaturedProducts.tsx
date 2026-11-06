import { products } from '../../config/products';
import { ProductCard } from '../product/ProductCard';

export function FeaturedProducts() {
  // Show all real products first, then demo products
  const featured = [...products].sort((a, b) => Number(a.isDemo) - Number(b.isDemo));

  return (
    <section id="featured" className="featured-section" aria-labelledby="featured-heading">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Our Products</p>
          <h2 id="featured-heading" className="section-title">Tandoors &amp; Kitchen Equipment</h2>
          <p className="section-subtitle">
            Commercial-grade stainless-steel tandoors and kitchen equipment for restaurants, hotels, catering businesses, and cloud kitchens.
          </p>
        </div>

        <ul className="product-grid" role="list">
          {featured.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
