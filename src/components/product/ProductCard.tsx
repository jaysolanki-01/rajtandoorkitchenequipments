'use client';
import Link from 'next/link';
import type { Product } from '../../config/products';
import { useCart } from '../../store/CartContext';
import { useUI } from '../../store/UIContext';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { openCart, openQuickView } = useUI();

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
      <div className="pc__img-wrap">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="pc__img-link">
          <img
            src={product.image}
            alt={product.name}
            className="pc__img"
            loading="lazy"
            width={400}
            height={400}
          />
        </Link>
        <button
          type="button"
          className="pc__img-overlay"
          onClick={() => openQuickView(product)}
          aria-label={`Quick view ${product.name}`}
        >
          <span className="pc__img-overlay-label">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Quick View
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="pc__body">
        <span className="pc__cat">{product.categoryLabel}</span>
        <h3 className="pc__name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="pc__price">
          {product.price !== null ? (
            <>
              <div className="pc__price-row">
                {originalPrice != null && (
                  <span className="pc__price-orig">₹{originalPrice.toLocaleString('en-IN')}</span>
                )}
                <span className="pc__price-val">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              {originalPrice != null && (
                <span className="pc__price-save">Save ₹{(originalPrice - product.price).toLocaleString('en-IN')}</span>
              )}
            </>
          ) : (
            <span className="pc__price-enquiry">Request a Quote</span>
          )}
        </div>

        {/* Actions: full-width dark CTA + gold view link */}
        <div className="pc__actions">
          {!product.isDemo ? (
            product.price !== null ? (
              <button
                type="button"
                className="pc__btn-add"
                onClick={() => { addItem(product); openCart(); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Add to Cart
              </button>
            ) : (
              <Link href="/contact?type=quote" className="pc__btn-add">
                Request a Quote
              </Link>
            )
          ) : (
            <Link href={`/products/${product.slug}`} className="pc__btn-add">
              Learn More
            </Link>
          )}
          <Link href={`/products/${product.slug}`} className="pc__btn-view" aria-label={`View ${product.name} details`}>
            View full details →
          </Link>
        </div>
      </div>
    </article>
  );
}
