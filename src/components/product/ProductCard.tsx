import { Link } from 'react-router-dom';
import type { Product } from '../../config/products';
import { useCart } from '../../store/CartContext';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const originalPrice = product.price != null
    ? Math.round((product.price * 1.1) / 100) * 100
    : null;
  const discountPct = product.price != null && originalPrice != null
    ? Math.round((1 - product.price / originalPrice) * 100)
    : null;

  return (
    <article className={`pc ${product.isDemo ? 'pc--demo' : ''}`} aria-label={product.name}>
      {/* Demo badge */}
      {product.isDemo && (
        <div className="pc__demo-badge" role="note" aria-label="Demo product — details coming soon">
          Coming Soon
        </div>
      )}

      {/* Discount badge */}
      {!product.isDemo && discountPct != null && (
        <div className="pc__discount-badge" aria-label={`${discountPct}% off`}>
          −{discountPct}%
        </div>
      )}

      {/* Wishlist */}
      <WishlistButton productId={product.id} productName={product.name} className="pc__wishlist" />

      {/* Image + hover overlay */}
      <Link to={`/products/${product.slug}`} className="pc__img-wrap" aria-label={`View ${product.name}`}>
        <img
          src={product.image}
          alt={product.name}
          className="pc__img"
          loading="lazy"
          width={400}
          height={400}
        />
        <div className="pc__img-overlay" aria-hidden="true">
          <span className="pc__img-overlay-label">View Details</span>
        </div>
      </Link>

      {/* Info */}
      <div className="pc__body">
        <span className="pc__cat">{product.categoryLabel}</span>
        <h3 className="pc__name">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="pc__price">
          {product.price !== null ? (
            <>
              {originalPrice != null && (
                <span className="pc__price-orig">₹{originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span className="pc__price-val">₹{product.price.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="pc__price-enquiry">Request a Quote</span>
          )}
        </div>

        {/* Actions: primary CTA + compact View link */}
        <div className="pc__actions">
          {!product.isDemo ? (
            product.price !== null ? (
              <button
                type="button"
                className="btn btn--gold btn--sm"
                onClick={() => addItem(product)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Add to Cart
              </button>
            ) : (
              <Link to="/contact?type=quote" className="btn btn--gold btn--sm">
                Request a Quote
              </Link>
            )
          ) : (
            <Link to={`/products/${product.slug}`} className="btn btn--gold btn--sm">
              Learn More
            </Link>
          )}
          <Link to={`/products/${product.slug}`} className="btn btn--outline btn--sm" aria-label={`View ${product.name} details`}>
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}
