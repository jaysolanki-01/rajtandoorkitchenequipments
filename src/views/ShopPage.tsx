'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { seo } from '../config/site';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { ProductCard } from '../components/product/ProductCard';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'name-asc', label: 'A – Z' },
];

const CATEGORY_ICONS: Record<string, React.ReactElement> = {
  all: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
      <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
    </svg>
  ),
  'tandoor-equipment': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2c0 0-4 3-4 7a4 4 0 0 0 8 0C12 5 8 2 8 2z"/>
      <path d="M8 8c0 0-1.5 1-1.5 2.5a1.5 1.5 0 0 0 3 0C9.5 9 8 8 8 8z" fill="currentColor" stroke="none"/>
    </svg>
  ),
  'burners-gas-stoves': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>
    </svg>
  ),
  'commercial-cooking-ranges': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="14" height="10" rx="1"/>
      <path d="M1 7h14M4 4V2M8 4V2M12 4V2"/>
      <circle cx="4" cy="10.5" r="1"/><circle cx="12" cy="10.5" r="1"/>
    </svg>
  ),
  'fryers-griddles': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h12l-1.5 6H3.5L2 7z"/>
      <path d="M5 7V5a3 3 0 0 1 6 0v2"/>
      <path d="M8 1v2"/>
    </svg>
  ),
  'stainless-steel-fabrication': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 2.5a1.5 1.5 0 0 0-2.12 0L4 9.88V12h2.12l7.38-7.38a1.5 1.5 0 0 0 0-2.12z"/>
      <path d="M11 5l1 1M2 14h4"/>
    </svg>
  ),
  'food-preparation-machines': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h4v2l2 8H4L6 4V2z"/>
      <path d="M4 12h8M5 2h6"/>
      <path d="M8 5v4"/>
    </svg>
  ),
  'food-warming-display': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10a6 6 0 0 1 12 0"/>
      <path d="M1 10h14M5 13h6"/>
      <path d="M6 7c0-1 .5-2 2-2s2 1 2 2"/>
    </svg>
  ),
  'refrigeration-equipment': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1v14M1 8h14M3.17 3.17l9.66 9.66M12.83 3.17 3.17 12.83"/>
      <circle cx="8" cy="8" r="1.5"/>
    </svg>
  ),
  'exhaust-ventilation': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c1.5-2 4-2 5 0s3.5 2 5 0"/>
      <path d="M2 10c1.5-2 4-2 5 0s3.5 2 5 0"/>
    </svg>
  ),
  'kitchen-accessories-spare-parts': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>
    </svg>
  ),
  'bakery-pizza-equipment': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l6 11H2L8 2z"/>
      <path d="M8 2v11M2 9.5h12"/>
      <circle cx="5" cy="11" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="11" cy="11" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="8" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  'dishwashing-cleaning': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6c0-2.21 1.79-4 4-4s4 1.79 4 4v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/>
      <path d="M6 2.5C6 1.5 7 1 8 1s2 .5 2 1.5"/>
    </svg>
  ),
  'storage-material-handling': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5l6-3 6 3v8l-6 3-6-3V5z"/>
      <path d="M2 5l6 3M14 5l-6 3M8 8v6"/>
    </svg>
  ),
  'beverage-equipment': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h8l-1 7H5L4 6z"/>
      <path d="M12 8h1.5a1.5 1.5 0 0 0 0-3H12"/>
      <path d="M6 3c0-1 .4-2 2-2M9 2c0-1 .4-1.5 1-1.5"/>
    </svg>
  ),
};

export function ShopPage() {
  const params = useSearchParams();
  const catFilter = params.get('category') ?? '';
  const [sort, setSort] = useState<SortKey>('default');
  const { products } = useProducts();
  const { categories } = useCategories();

  const countBySlug = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach(p => {
      if (p.category) map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, [products]);

  const filtered = useMemo(() => {
    let list = catFilter ? products.filter((p) => p.category === catFilter) : [...products];
    if (sort === 'price-asc') list = [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === 'price-desc') list = [...list].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    else if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [catFilter, sort, products]);

  const activeCategory = categories.find((c) => c.slug === catFilter);

  return (
    <>
      <title>{activeCategory ? `${activeCategory.label} | ${seo.title}` : `All Products | ${seo.title}`}</title>
      <meta name="description" content="Browse commercial tandoors and kitchen equipment from Raj Tandoor. Filter by category and find the right equipment for your business." />
      <link rel="canonical" href={`${seo.siteUrl}/shop${catFilter ? `?category=${catFilter}` : ''}`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link href="/">Home</Link></li>
            {catFilter ? (
              <><li><Link href="/shop">Shop</Link></li><li aria-current="page">{activeCategory?.label ?? catFilter}</li></>
            ) : (
              <li aria-current="page">Shop</li>
            )}
          </ol>
        </nav>

        {/* ── Filter Section v2: card strip ── */}
        <div className="sf2" role="search" aria-label="Filter products">
          {/* Category card track */}
          <div className="sf2__track" role="group" aria-label="Filter by category">
            <Link href="/shop" className={`sf2-card${!catFilter ? ' sf2-card--active' : ''}`} aria-pressed={!catFilter}>
              <span className="sf2-card__icon">{CATEGORY_ICONS.all}</span>
              <span className="sf2-card__name">All</span>
              {products.length > 0 && <span className="sf2-card__count">{products.length}</span>}
            </Link>
            {categories.map((c) => {
              const count = countBySlug[c.slug] ?? 0;
              const active = catFilter === c.slug;
              return (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  className={`sf2-card${active ? ' sf2-card--active' : ''}${count === 0 ? ' sf2-card--empty' : ''}`}
                  aria-pressed={active}
                >
                  <span className="sf2-card__icon">{CATEGORY_ICONS[c.slug]}</span>
                  <span className="sf2-card__name">{c.label}</span>
                  {count > 0 && <span className="sf2-card__count">{count}</span>}
                </Link>
              );
            })}
          </div>

          {/* Sort row */}
          <div className="sf2__sort-row container" role="group" aria-label="Sort products">
            <span className="sf2__sort-label">Sort by</span>
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`sf2-sort${sort === o.value ? ' sf2-sort--active' : ''}`}
                onClick={() => setSort(o.value)}
                aria-pressed={sort === o.value}
              >
                {o.label}
              </button>
            ))}
            <span className="sf2__count-badge">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* ── Page heading ── */}
        <div className="container">
          <div className="shop-heading">
            <div>
              <h1 className="page-h1">{activeCategory ? activeCategory.label : 'All Products'}</h1>
              <p className="page-intro">
                {activeCategory
                  ? `Browse our ${activeCategory.label.toLowerCase()} for restaurants, hotels, and commercial kitchens.`
                  : 'Browse our range of commercial tandoors and kitchen equipment for restaurants, hotels, and catering businesses.'}
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <h2>No products in this category yet</h2>
              <p>Contact us to enquire about {activeCategory?.label ?? 'this category'}.</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/shop" className="btn btn--outline">Browse all products</Link>
                <Link href="/contact?type=quote" className="btn btn--gold">Request a Quote</Link>
              </div>
            </div>
          ) : (
            <ul className="product-grid" role="list" aria-label={`${filtered.length} products`}>
              {filtered.map((p) => (
                <li key={p.id}><ProductCard product={p} /></li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
