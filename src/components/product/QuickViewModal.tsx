'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useUI } from '../../store/UIContext';
import { useCart } from '../../store/CartContext';

export function QuickViewModal() {
  const { quickViewProduct: product, closeQuickView, openCart } = useUI();
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;
    setActiveImg(0);
    setAdded(false);
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeQuickView(); };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [product, closeQuickView]);

  if (!product) return null;

  const images = (product.images?.length ? product.images : [product.image]).filter(Boolean) as string[];

  function handleAddToCart() {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => {
      closeQuickView();
      openCart();
    }, 500);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: QV_CSS }} />
      <div
        className="qv-backdrop"
        ref={backdropRef}
        onClick={(e) => { if (e.target === backdropRef.current) closeQuickView(); }}
        role="presentation"
      >
        <div
          className="qv"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.name}`}
        >
          <button
            type="button"
            className="qv__close"
            aria-label="Close quick view"
            onClick={closeQuickView}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image panel */}
          <div className="qv__gallery">
            <div className="qv__main-img-wrap">
              <img
                src={images[activeImg] ?? product.image}
                alt={product.name}
                className="qv__main-img"
              />
              {!product.inStock && <span className="qv__oos-badge">Out of Stock</span>}
            </div>
            {images.length > 1 && (
              <div className="qv__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`qv__thumb${i === activeImg ? ' qv__thumb--active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Image ${i + 1}`}
                    aria-pressed={i === activeImg}
                  >
                    <img src={img} alt="" width={56} height={56} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="qv__info">
            <span className="qv__cat">{product.categoryLabel}</span>
            <h2 className="qv__name">{product.name}</h2>

            <div className="qv__price">
              {product.price !== null ? (
                <span className="qv__price-val">₹{product.price.toLocaleString('en-IN')}</span>
              ) : (
                <span className="qv__price-enquiry">{product.priceLabel ?? 'Price on enquiry'}</span>
              )}
            </div>

            {product.shortDescription && (
              <p className="qv__desc">{product.shortDescription}</p>
            )}

            {product.features?.length > 0 && (
              <ul className="qv__features">
                {product.features.slice(0, 4).map((f, i) => (
                  <li key={i}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="qv__actions">
              {!product.isDemo && product.price !== null ? (
                <button
                  type="button"
                  className={`btn btn--gold qv__add-btn${added ? ' qv__add-btn--added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {added
                    ? '✓ Added!'
                    : product.inStock
                      ? (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                          Add to Cart
                        </>
                      )
                      : 'Out of Stock'
                  }
                </button>
              ) : (
                <Link href="/contact?type=quote" className="btn btn--gold qv__add-btn" onClick={closeQuickView}>
                  Request a Quote
                </Link>
              )}
              <Link
                href={`/products/${product.slug}`}
                className="btn btn--outline qv__view-btn"
                onClick={closeQuickView}
              >
                View Full Details →
              </Link>
            </div>

            {product.warranty && (
              <p className="qv__warranty">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {product.warranty} warranty
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const QV_CSS = `
.qv-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: qvBackdropIn 0.2s ease;
}
@keyframes qvBackdropIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.qv {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 860px;
  width: 100%;
  max-height: 92vh;
  position: relative;
  animation: qvIn 0.25s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 24px 60px rgba(0,0,0,0.3);
}
@keyframes qvIn {
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.qv__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.08);
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.15s;
  flex-shrink: 0;
}
.qv__close:hover { background: rgba(0,0,0,0.16); }

/* Gallery */
.qv__gallery {
  background: #f7f6f2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  overflow-y: auto;
}
.qv__main-img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  flex: 1;
}
.qv__main-img {
  width: 100%;
  max-height: 340px;
  object-fit: contain;
  display: block;
}
.qv__oos-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #dc2626;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.qv__thumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.qv__thumb {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: #fff;
  transition: border-color 0.15s;
}
.qv__thumb:hover { border-color: #c9a84c; }
.qv__thumb--active { border-color: #b8912a !important; }
.qv__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Info panel */
.qv__info {
  padding: 32px 32px 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.qv__cat {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #b8912a;
}
.qv__name {
  font-size: 21px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.25;
  margin: 0;
}
.qv__price { display: flex; align-items: baseline; gap: 8px; }
.qv__price-val {
  font-size: 24px;
  font-weight: 800;
  color: #1a1a1a;
}
.qv__price-enquiry {
  font-size: 15px;
  font-weight: 600;
  color: #666;
  font-style: italic;
}
.qv__desc {
  font-size: 13.5px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}
.qv__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qv__features li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #333;
  line-height: 1.4;
}
.qv__features li svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: #b8912a;
}
.qv__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}
.qv__add-btn {
  width: 100%;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  padding: 13px;
  transition: background 0.2s, transform 0.1s;
}
.qv__add-btn--added {
  background: #16a34a !important;
  border-color: #16a34a !important;
}
.qv__add-btn:active { transform: scale(0.98); }
.qv__view-btn {
  width: 100%;
  justify-content: center;
  font-size: 13.5px;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.qv__warranty {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #777;
  margin: 0;
  margin-top: 4px;
}
.qv__warranty svg { color: #b8912a; flex-shrink: 0; }

/* Mobile */
@media (max-width: 600px) {
  .qv-backdrop { padding: 0; align-items: flex-end; }
  .qv {
    grid-template-columns: 1fr;
    border-radius: 20px 20px 0 0;
    max-height: 94dvh;
    animation: qvInMobile 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes qvInMobile {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .qv__gallery { padding: 16px; min-height: unset; }
  .qv__main-img { max-height: 220px; }
  .qv__info { padding: 20px; gap: 10px; }
  .qv__name { font-size: 18px; }
  .qv__price-val { font-size: 20px; }
  .qv__close { top: 12px; right: 12px; }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .qv { background: #1c1c1c; }
  .qv__gallery { background: #111; }
  .qv__close { background: rgba(255,255,255,0.1); color: #e0e0e0; }
  .qv__close:hover { background: rgba(255,255,255,0.18); }
  .qv__thumb { background: #2a2a2a; }
  .qv__name { color: #f0ede6; }
  .qv__price-val { color: #f0ede6; }
  .qv__desc { color: #aaa; }
  .qv__features li { color: #ccc; }
}
`;
