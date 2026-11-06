import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../store/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, itemCount, subtotal, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Cart
            {itemCount > 0 && <span className="cart-drawer__count"> ({itemCount})</span>}
          </h2>
          <button type="button" className="cart-drawer__close" aria-label="Close cart" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is empty.</p>
              <Link to="/shop" className="btn btn--outline btn--sm" onClick={onClose}>
                Browse products
              </Link>
            </div>
          ) : (
            <ul className="cart-drawer__items" role="list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item__img"
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <div className="cart-item__details">
                    <Link to={`/products/${product.slug}`} className="cart-item__name" onClick={onClose}>
                      {product.name}
                    </Link>
                    <span className="cart-item__cat">{product.categoryLabel}</span>
                    <span className="cart-item__price">
                      {product.price
                        ? `₹${(product.price * quantity).toLocaleString('en-IN')}`
                        : 'Price on enquiry'}
                    </span>
                  </div>
                  <div className="cart-item__actions">
                    <div className="cart-item__qty" role="group" aria-label={`Quantity for ${product.name}`}>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >−</button>
                      <span aria-live="polite">{quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >+</button>
                    </div>
                    <button
                      type="button"
                      className="cart-item__remove"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            {subtotal !== null && (
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            )}
            <Link
              to="/checkout"
              className="btn btn--gold btn--block"
              onClick={onClose}
            >
              Checkout
            </Link>
            <Link
              to="/cart"
              className="btn btn--outline btn--sm btn--block cart-drawer__view-cart"
              onClick={onClose}
            >
              View Cart
            </Link>
            <button
              type="button"
              className="cart-drawer__clear"
              onClick={clearCart}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
