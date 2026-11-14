import { useRef, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { contact, seo } from '../config/site';
import { getProductBySlug, products } from '../config/products';
import { useCart } from '../store/CartContext';
import { useWishlist } from '../store/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';

type TabId = 'overview' | 'features' | 'specs' | 'dimensions' | 'included' | 'delivery' | 'faq' | 'reviews';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview',   label: 'Overview' },
  { id: 'features',   label: 'Key Features' },
  { id: 'specs',      label: 'Specifications' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'included',   label: "What's Included" },
  { id: 'delivery',   label: 'Delivery & Warranty' },
  { id: 'faq',        label: 'FAQs' },
  { id: 'reviews',    label: 'Reviews' },
];

const GENERAL_FAQ = [
  {
    q: 'What fuel types are compatible with this tandoor?',
    a: 'Please refer to the Fuel Type specification on the Specifications tab. Stainless steel tandoors are typically compatible with solid fuel (wood or charcoal) and optionally with a gas burner attachment. Gas models use LPG only.',
  },
  {
    q: 'Is professional installation required?',
    a: 'Installation requirements depend on the model. Gas tandoors require professional gas fitting. Solid-fuel models are ready to use once placed and seasoned.',
  },
  {
    q: 'How do I clean and maintain the tandoor?',
    a: 'Allow the tandoor to cool completely before cleaning. Brush out ash from the firebox. Wipe the stainless steel exterior with a damp cloth. The clay lining should not be scrubbed — light residue is normal and aids seasoning.',
  },
  {
    q: 'Can I customise the size or finish?',
    a: 'Yes, Raj Tandoor offers customisation on many models. Contact us with your requirements and we will advise on options and lead times.',
  },
];

function ChevronIcon({ dir = 'down' }: { dir?: 'left' | 'right' | 'down' }) {
  const rotate = dir === 'left' ? '90' : dir === 'right' ? '-90' : '0';
  return (
    <svg style={{ transform: `rotate(${rotate}deg)`, transition: 'inherit' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.157 5.335 5.495.001 12.05.001 15.231.002 18.218 1.24 20.465 3.49c2.247 2.247 3.483 5.236 3.482 8.414-.003 6.557-5.339 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.889-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function productLD(p: ReturnType<typeof getProductBySlug>) {
  if (!p) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.shortDescription,
    image: `${seo.siteUrl}${p.image}`,
    brand: { '@type': 'Brand', name: 'Raj Tandoor' },
    ...(p.sku ? { sku: p.sku } : {}),
    ...(p.price !== null
      ? { offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }
      : {}),
  };
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug ?? '');
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();

  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bulkStatus, setBulkStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const relatedRef = useRef<HTMLUListElement>(null);

  if (!product) return <Navigate to="/shop" replace />;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
  const sizeVariants = product.sizeGroup
    ? products.filter((p) => p.sizeGroup === product.sizeGroup)
    : [];
  const ld = productLD(product);
  const canonical = `${seo.siteUrl}/products/${product.slug}`;
  const inWishlist = has(product.id);
  const faqItems = product.faq?.length ? product.faq : GENERAL_FAQ;

  const waMessage = encodeURIComponent(`Hi Raj Tandoor! I'm interested in the ${product.name}. Please share more details.`);
  const waNum = contact.whatsapp as string;
  const waHref = waNum
    ? `https://wa.me/${waNum.replace(/\D/g, '')}?text=${waMessage}`
    : `/contact?ref=whatsapp`;
  const waIsExternal = !!contact.whatsapp;

  const nextImg = () => setActiveImg((i) => (i + 1) % product.images.length);
  const prevImg = () => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextImg() : prevImg();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--z-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--z-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/checkout');
  };

  const handleBulkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBulkStatus('submitting');
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: raw.name,
          phone: raw.phone,
          businessName: raw.business,
          enquiryType: 'Bulk order enquiry',
          productInterest: product.name,
          message: `Bulk order request — Qty: ${raw.quantity}. Requirements: ${raw.requirements ?? 'Not specified'}`,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? `Error ${res.status}`);
      setBulkStatus('success');
    } catch {
      setBulkStatus('error');
    }
  };

  const scrollRelated = (dir: 'left' | 'right') => {
    relatedRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  return (
    <>
      <title>{`${product.name} | ${seo.title}`}</title>
      <meta name="description" content={product.shortDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.shortDescription} />
      <meta property="og:image" content={`${seo.siteUrl}${product.image}`} />
      {ld && <script type="application/ld+json">{JSON.stringify(ld)}</script>}

      <main id="main" tabIndex={-1} className="page-main pdp-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to={`/${product.category}`}>{product.categoryLabel}</Link></li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="container">
          {/* ── MAIN TWO-COLUMN ── */}
          <div className="pdp3">

            {/* ── GALLERY ── */}
            <div className="pdp3__gallery">
              <div className="pdp3__main-wrap">
                {product.badge && <span className="pdp3__badge">{product.badge}</span>}
                {!product.inStock && <span className="pdp3__badge pdp3__badge--oos">Out of Stock</span>}

                <div
                  className="pdp3__zoom-wrap"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.removeProperty('--z-x');
                    e.currentTarget.style.removeProperty('--z-y');
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => setZoomed(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="View fullscreen image"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setZoomed(true); }}
                >
                  <img
                    src={product.images[activeImg] ?? product.image}
                    alt={product.name}
                    className="pdp3__main-img"
                  />
                </div>

                {product.images.length > 1 && (
                  <>
                    <button type="button" className="pdp3__arrow pdp3__arrow--prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prevImg(); }}>
                      <ChevronIcon dir="left" />
                    </button>
                    <button type="button" className="pdp3__arrow pdp3__arrow--next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); nextImg(); }}>
                      <ChevronIcon dir="right" />
                    </button>
                  </>
                )}

                <span className="pdp3__zoom-hint" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                  Click to zoom
                </span>

                {product.isDemo && (
                  <div className="pdp3__demo-banner" role="note">Demo — full details coming soon</div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="pdp3__thumbs" role="list" aria-label="Product images">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      role="listitem"
                      className={`pdp3__thumb${i === activeImg ? ' pdp3__thumb--active' : ''}`}
                      onClick={() => setActiveImg(i)}
                      aria-label={`Image ${i + 1}${i === activeImg ? ' (current)' : ''}`}
                      aria-pressed={i === activeImg}
                    >
                      <img src={img} alt="" width={80} height={80} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── PRODUCT INFO ── */}
            <div className="pdp3__info">
              <div className="pdp3__info-top">
                <span className="pdp3__cat">{product.categoryLabel}</span>
                {product.badge && <span className="pdp3__info-badge">{product.badge}</span>}
              </div>

              <h1 className="pdp3__name">{product.name}</h1>

              {product.sku && (
                <p className="pdp3__sku">SKU: <span>{product.sku}</span></p>
              )}

              <div className="pdp3__stock-row">
                {product.inStock ? (
                  <>
                    <span className="pdp3__stock pdp3__stock--in">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      In Stock
                    </span>
                    <span className="pdp3__delivery-pill">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      Dispatches within 3–5 business days
                    </span>
                  </>
                ) : (
                  <span className="pdp3__stock pdp3__stock--out">Out of Stock — Contact Us</span>
                )}
              </div>

              <div className="pdp3__price-row">
                {product.price !== null ? (
                  <>
                    <span className="pdp3__price-sale">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="pdp3__price-gst">Incl. GST</span>
                  </>
                ) : (
                  <span className="pdp3__price-enquiry">{product.priceLabel ?? 'Price on enquiry'}</span>
                )}
              </div>

              <p className="pdp3__short-desc">{product.shortDescription}</p>

              {sizeVariants.length > 1 && (
                <div className="pdp3__size-row">
                  <p className="pdp3__size-label">
                    Size: <strong>{product.sizeLabel}</strong>
                    {product.price !== null && <span className="pdp3__size-price"> — ₹{product.price.toLocaleString('en-IN')}</span>}
                  </p>
                  <div className="pdp3__size-chips">
                    {sizeVariants.map((v) => (
                      <Link
                        key={v.id}
                        to={`/products/${v.slug}`}
                        className={`pdp3__size-chip${v.id === product.id ? ' pdp3__size-chip--active' : ''}`}
                        aria-current={v.id === product.id ? 'page' : undefined}
                      >
                        {v.sizeLabel}
                        {v.price !== null && (
                          <span className="pdp3__size-chip-price">₹{v.price.toLocaleString('en-IN')}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pdp3__trust-mini">
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Quality assured
                </span>
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  Nationwide delivery
                </span>
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secure checkout
                </span>
              </div>

              {!product.isDemo && (
                <div className="pdp3__purchase">
                  {product.price !== null ? (
                    <>
                      <div className="pdp3__qty-row">
                        <div className="pdp3__qty" role="group" aria-label="Quantity">
                          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                          <span aria-live="polite" aria-atomic="true">{qty}</span>
                          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
                        </div>
                        <button
                          type="button"
                          className={`pdp3__add-btn${added ? ' pdp3__add-btn--added' : ''}`}
                          onClick={handleAddToCart}
                          disabled={!product.inStock}
                          aria-live="polite"
                        >
                          {added ? (
                            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Added</>
                          ) : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>

                      <button type="button" className="pdp3__buy-btn" onClick={handleBuyNow} disabled={!product.inStock}>
                        Buy Now
                      </button>

                      <div className="pdp3__actions-row">
                        <button
                          type="button"
                          className={`pdp3__action-btn${inWishlist ? ' pdp3__action-btn--active' : ''}`}
                          onClick={() => toggle(product.id)}
                          aria-pressed={inWishlist}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          {inWishlist ? 'Saved' : 'Wishlist'}
                        </button>

                        <Link to="/contact?type=quote" className="pdp3__action-btn">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          Get Quote
                        </Link>

                        {waIsExternal ? (
                          <a href={waHref} target="_blank" rel="noopener noreferrer" className="pdp3__action-btn pdp3__action-btn--wa">
                            <WaIcon /> WhatsApp
                          </a>
                        ) : (
                          <Link to={waHref} className="pdp3__action-btn pdp3__action-btn--wa">
                            <WaIcon /> WhatsApp
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/contact?type=quote" className="pdp3__buy-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'flex' }}>
                        Request a Quote
                      </Link>
                      <div className="pdp3__actions-row">
                        <button
                          type="button"
                          className={`pdp3__action-btn${inWishlist ? ' pdp3__action-btn--active' : ''}`}
                          onClick={() => toggle(product.id)}
                          aria-pressed={inWishlist}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          {inWishlist ? 'Saved' : 'Wishlist'}
                        </button>
                        <Link to="/contact" className="pdp3__action-btn">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          Ask a Question
                        </Link>
                      </div>
                    </>
                  )}

                  <div className="pdp3__trust-bar">
                    <div className="pdp3__trust-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <div><strong>Quality Material</strong><span>SS 304 stainless steel body</span></div>
                    </div>
                    <div className="pdp3__trust-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      <div><strong>Pan-India Delivery</strong><span>Contact us for timelines</span></div>
                    </div>
                    <div className="pdp3__trust-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <div><strong>After-Sales Support</strong><span>Contact us anytime</span></div>
                    </div>
                    <div className="pdp3__trust-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <div><strong>Secure Checkout</strong><span>UPI · Card · Net Banking</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── INFO TABS ── */}
          <div className="pdp3__tabs-wrap">
            <nav className="pdp3__tab-nav" aria-label="Product information tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  aria-controls={`pdp3-tab-${t.id}`}
                  className={`pdp3__tab-btn${activeTab === t.id ? ' pdp3__tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="pdp3__tab-content">

              {/* Overview */}
              {activeTab === 'overview' && (
                <div id="pdp3-tab-overview" role="tabpanel" className="pdp3__tab-panel pdp3__tab-overview">
                  <div className="pdp3__overview-text">
                    {product.description.split('\n\n').map((para, i) =>
                      para.trim().startsWith('-') ? (
                        <ul key={i}>
                          {para.split('\n').filter((l) => l.startsWith('-')).map((l, j) => (
                            <li key={j}>{l.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      ) : para.trim() ? (
                        <p key={i}>{para.trim()}</p>
                      ) : null
                    )}
                  </div>
                  {product.features.length > 0 && (
                    <div className="pdp3__highlights-grid">
                      {product.features.slice(0, 6).map((f, i) => (
                        <div key={i} className="pdp3__highlight-card">
                          <span className="pdp3__highlight-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {activeTab === 'features' && (
                <div id="pdp3-tab-features" role="tabpanel" className="pdp3__tab-panel">
                  <ul className="pdp3__features-list">
                    {product.features.map((f, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {activeTab === 'specs' && (
                <div id="pdp3-tab-specs" role="tabpanel" className="pdp3__tab-panel">
                  {product.specs.length > 0 ? (
                    <table className="pdp3__specs-table">
                      <tbody>
                        {product.specs.map((s) => (
                          <tr key={s.label}>
                            <th scope="row">{s.label}</th>
                            <td>{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="pdp3__empty">Specifications available on request. <Link to="/contact">Contact us</Link> for full technical details.</p>
                  )}
                </div>
              )}

              {/* Dimensions */}
              {activeTab === 'dimensions' && (
                <div id="pdp3-tab-dimensions" role="tabpanel" className="pdp3__tab-panel">
                  {(() => {
                    const dimSpecs = product.specs.filter((s) =>
                      /size|dimension|diameter|height|depth|width|weight|capacity/i.test(s.label)
                    );
                    return dimSpecs.length > 0 ? (
                      <table className="pdp3__specs-table">
                        <tbody>
                          {dimSpecs.map((s) => (
                            <tr key={s.label}>
                              <th scope="row">{s.label}</th>
                              <td>{s.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="pdp3__empty">Dimension details available on request. <Link to="/contact">Contact us</Link> for precise measurements.</p>
                    );
                  })()}
                </div>
              )}

              {/* What's Included */}
              {activeTab === 'included' && (
                <div id="pdp3-tab-included" role="tabpanel" className="pdp3__tab-panel">
                  {product.included && product.included.length > 0 ? (
                    <ul className="pdp3__included-list">
                      {product.included.map((item, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="pdp3__empty">Box contents are confirmed at order placement. <Link to="/contact">Contact us</Link> for complete package details.</p>
                  )}
                </div>
              )}

              {/* Delivery & Warranty */}
              {activeTab === 'delivery' && (
                <div id="pdp3-tab-delivery" role="tabpanel" className="pdp3__tab-panel">
                  <div className="pdp3__delivery-cards">
                    <div className="pdp3__delivery-card">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      <h3>Delivery</h3>
                      <p>We dispatch orders within 3–5 business days after order confirmation. Delivery timelines to your location are confirmed at the time of order. <Link to="/contact">Contact us</Link> for shipping estimates to your area.</p>
                    </div>
                    <div className="pdp3__delivery-card">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <h3>Warranty</h3>
                      <p>{product.warranty ?? 'Warranty details vary by product and are confirmed at order placement. Contact us for warranty information specific to this model.'}</p>
                    </div>
                    <div className="pdp3__delivery-card">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.76"/></svg>
                      <h3>Returns</h3>
                      <p>Please review our <Link to="/return-policy">Returns Policy</Link> before purchase. Contact us within the return window if you experience any issue with your product.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {activeTab === 'faq' && (
                <div id="pdp3-tab-faq" role="tabpanel" className="pdp3__tab-panel">
                  <dl className="pdp3__faq">
                    {faqItems.map((item, i) => (
                      <div key={i} className={`pdp3__faq-item${openFaq === i ? ' pdp3__faq-item--open' : ''}`}>
                        <dt>
                          <button
                            type="button"
                            aria-expanded={openFaq === i}
                            aria-controls={`faq-answer-${i}`}
                            onClick={() => setOpenFaq((v) => (v === i ? null : i))}
                          >
                            {item.q}
                            <ChevronIcon dir="down" />
                          </button>
                        </dt>
                        <dd id={`faq-answer-${i}`} aria-hidden={openFaq !== i}>
                          <div className="pdp3__faq-answer">{item.a}</div>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <div id="pdp3-tab-reviews" role="tabpanel" className="pdp3__tab-panel pdp3__tab-reviews">
                  <div className="pdp3__reviews-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <h3>No reviews yet</h3>
                    <p>Be the first to share your experience with this product. Contact us to submit a review.</p>
                    <Link to="/contact" className="btn btn--outline">Share Your Feedback</Link>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ── BULK ORDER BANNER ── */}
          <section className="pdp3__bulk-banner" aria-labelledby="bulk-heading">
            <div className="pdp3__bulk-left">
              <span className="pdp3__bulk-eyebrow">For Businesses</span>
              <h2 id="bulk-heading">Looking to Order in Bulk?</h2>
              <p>Get a custom quote for 2 or more units. We work with restaurants, hotels, catering businesses, and cloud kitchens across India.</p>
            </div>
            <div className="pdp3__bulk-right">
              {bulkStatus === 'success' ? (
                <div className="form-status form-status--success" role="alert">
                  <strong>Enquiry received.</strong> We'll be in touch with a quote shortly.
                </div>
              ) : (
                <form className="pdp3__bulk-form" onSubmit={handleBulkSubmit} noValidate>
                  {bulkStatus === 'error' && (
                    <div className="form-status form-status--error" role="alert">
                      Submission failed. Please try again or <Link to="/contact">contact us directly</Link>.
                    </div>
                  )}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="blk-name" className="form-label">Name <span aria-hidden="true">*</span></label>
                      <input id="blk-name" name="name" type="text" className="form-input" required placeholder="Your name" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="blk-business" className="form-label">Business Name</label>
                      <input id="blk-business" name="business" type="text" className="form-input" placeholder="Restaurant, hotel, etc." />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="blk-phone" className="form-label">Phone <span aria-hidden="true">*</span></label>
                      <input id="blk-phone" name="phone" type="tel" className="form-input" required placeholder="+91 00000 00000" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="blk-qty" className="form-label">Quantity Required <span aria-hidden="true">*</span></label>
                      <input id="blk-qty" name="quantity" type="number" min="2" className="form-input" required placeholder="Minimum 2 units" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="blk-req" className="form-label">Additional Requirements</label>
                    <textarea id="blk-req" name="requirements" className="form-input form-textarea" rows={2} placeholder="Size preferences, delivery location, timeline…" />
                  </div>
                  <button type="submit" className="btn btn--gold" disabled={bulkStatus === 'submitting'}>
                    {bulkStatus === 'submitting' ? 'Sending…' : 'Request Bulk Quote'}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* ── RELATED PRODUCTS ── */}
          {related.length > 0 && (
            <section className="pdp3__related" aria-labelledby="related-heading">
              <div className="pdp3__related-header">
                <h2 id="related-heading" className="section-title">Related Products</h2>
                {related.length > 3 && (
                  <div className="pdp3__related-nav" aria-label="Scroll related products">
                    <button type="button" className="pdp3__related-arrow" aria-label="Scroll left" onClick={() => scrollRelated('left')}>
                      <ChevronIcon dir="left" />
                    </button>
                    <button type="button" className="pdp3__related-arrow" aria-label="Scroll right" onClick={() => scrollRelated('right')}>
                      <ChevronIcon dir="right" />
                    </button>
                  </div>
                )}
              </div>
              <ul className="pdp3__related-track" ref={relatedRef} role="list">
                {related.map((p) => (
                  <li key={p.id} className="pdp3__related-item">
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ── MOBILE STICKY BAR ── */}
        {!product.isDemo && (
          <div className="pdp3__sticky-bar" aria-label="Quick purchase" role="region">
            <div className="pdp3__sticky-bar-inner container">
              <div className="pdp3__sticky-bar-name">
                <span className="pdp3__sticky-bar-title">{product.name}</span>
                {product.price !== null ? (
                  <span className="pdp3__sticky-bar-price">₹{product.price.toLocaleString('en-IN')}</span>
                ) : (
                  <span className="pdp3__sticky-bar-price">Price on enquiry</span>
                )}
              </div>
              {product.price !== null ? (
                <button type="button" className="btn btn--gold" onClick={handleAddToCart} disabled={!product.inStock}>
                  {added ? 'Added ✓' : 'Add to Cart'}
                </button>
              ) : (
                <Link to="/contact?type=quote" className="btn btn--gold">
                  Get Quote
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── LIGHTBOX ── */}
        {zoomed && (
          <div
            className="pdp3__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Product image fullscreen"
            onClick={() => setZoomed(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setZoomed(false);
              if (e.key === 'ArrowRight') nextImg();
              if (e.key === 'ArrowLeft') prevImg();
            }}
            tabIndex={0}
          >
            <button type="button" className="pdp3__lightbox-close" aria-label="Close fullscreen" onClick={() => setZoomed(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            {product.images.length > 1 && (
              <>
                <button type="button" className="pdp3__lightbox-arrow pdp3__lightbox-arrow--prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prevImg(); }}>
                  <ChevronIcon dir="left" />
                </button>
                <button type="button" className="pdp3__lightbox-arrow pdp3__lightbox-arrow--next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); nextImg(); }}>
                  <ChevronIcon dir="right" />
                </button>
              </>
            )}
            <img
              src={product.images[activeImg] ?? product.image}
              alt={product.name}
              className="pdp3__lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
            {product.images.length > 1 && (
              <p className="pdp3__lightbox-counter" aria-live="polite">
                {activeImg + 1} / {product.images.length}
              </p>
            )}
          </div>
        )}
      </main>
    </>
  );
}
