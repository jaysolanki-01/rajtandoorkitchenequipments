import { Link } from 'react-router-dom';
import type { Product } from '../../config/products';
import { useCart } from '../../store/CartContext';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // Show a modest 10% "was" price to communicate value — matches PDP logic
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

      {/* Image */}
      <Link to={`/products/${product.slug}`} className="pc__img-wrap" aria-label={`View ${product.name}`}>
        <img
          src={product.image}
          alt={product.name}
          className="pc__img"
          loading="lazy"
          width={400}
          height={400}
        />
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

        <div className="pc__actions">
          <Link to={`/products/${product.slug}`} className="btn btn--outline btn--sm">
            View Product
          </Link>
          {!product.isDemo && (
            product.price !== null ? (
              <button
                type="button"
                className="btn btn--gold btn--sm"
                onClick={() => addItem(product)}
              >
                Add to Cart
              </button>
            ) : (
              <Link to="/contact?type=quote" className="btn btn--gold btn--sm">
                Request a Quote
              </Link>
            )
          )}
        </div>
      </div>
    </article>
  );
}
