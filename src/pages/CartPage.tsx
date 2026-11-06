import { Link } from 'react-router-dom';
import { seo } from '../config/site';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <title>{`Cart | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">Cart</li>
          </ol>
        </nav>

        <div className="container">
          <h1 className="page-h1">Your Cart</h1>

          {items.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <h2>Your cart is empty</h2>
              <p>Add products from the shop to get started.</p>
              <Link to="/shop" className="btn btn--gold">Browse Products</Link>
            </div>
          ) : (
            <div className="cp">
              <div className="cp__items">
                {items.map((item) => (
                  <div key={item.product.id} className="cp-item">
                    <div className="cp-item__img-wrap">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} className="cp-item__img" />
                      ) : (
                        <div className="cp-item__img-placeholder" aria-hidden="true" />
                      )}
                    </div>
                    <div className="cp-item__info">
                      <Link to={`/products/${item.product.slug}`} className="cp-item__name">{item.product.name}</Link>
                      <p className="cp-item__cat">{item.product.categoryLabel}</p>
                      <p className="cp-item__price">
                        {item.product.price != null
                          ? `₹${item.product.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
                          : 'Price on enquiry'}
                      </p>
                    </div>
                    <div className="cp-item__controls">
                      <div className="cp-item__qty" role="group" aria-label={`Quantity for ${item.product.name}`}>
                        <button type="button" aria-label="Decrease" onClick={() => item.quantity > 1 ? updateQuantity(item.product.id, item.quantity - 1) : removeItem(item.product.id)}>−</button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" aria-label="Increase" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      </div>
                      <button type="button" className="cp-item__remove" aria-label={`Remove ${item.product.name}`} onClick={() => removeItem(item.product.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cp__clear-row">
                  <button type="button" className="cp__clear" onClick={clearCart}>Clear cart</button>
                  <Link to="/shop" className="btn btn--outline btn--sm">Continue Shopping</Link>
                </div>
              </div>

              <aside className="cp__summary">
                <h2 className="cp__summary-title">Order Summary</h2>
                <dl className="cp__totals">
                  <div>
                    <dt>Items ({items.reduce((s, i) => s + i.quantity, 0)})</dt>
                    <dd>{subtotal == null ? 'Price on enquiry' : `₹${subtotal.toLocaleString('en-IN')}`}</dd>
                  </div>
                  <div>
                    <dt>Shipping</dt>
                    <dd>Calculated at checkout</dd>
                  </div>
                  {subtotal != null && (
                    <div className="cp__totals-final">
                      <dt>Subtotal</dt>
                      <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
                    </div>
                  )}
                </dl>
                <div className="cp__cta">
                  <Link to="/checkout" className="btn btn--gold btn--block btn--lg">
                    {isLoggedIn ? 'Proceed to Checkout' : 'Checkout'}
                  </Link>
                  {!isLoggedIn && (
                    <p className="cp__signin-note">
                      <button type="button" className="cp__signin-link">Sign in</button> to save your order and track it.
                    </p>
                  )}
                </div>
                <div className="cp__secure">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Secure checkout
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
