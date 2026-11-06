import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { seo } from '../config/site';
import { categories, products } from '../config/products';
import { ProductCard } from '../components/product/ProductCard';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export function ShopPage() {
  const [params] = useSearchParams();
  const catFilter = params.get('category') ?? '';
  const [sort, setSort] = useState<SortKey>('default');

  const filtered = useMemo(() => {
    let list = catFilter ? products.filter((p) => p.category === catFilter) : [...products];

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => {
        if (a.price == null && b.price == null) return 0;
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return a.price - b.price;
      });
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => {
        if (a.price == null && b.price == null) return 0;
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return b.price - a.price;
      });
    } else if (sort === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [catFilter, sort]);

  const activeCategory = categories.find((c) => c.slug === catFilter);

  return (
    <>
      <title>{activeCategory ? `${activeCategory.label} | ${seo.title}` : `All Products | ${seo.title}`}</title>
      <meta name="description" content="Browse commercial tandoors and kitchen equipment from Raj Tandoor. Filter by category and find the right equipment for your business." />
      <link rel="canonical" href={`${seo.siteUrl}/shop${catFilter ? `?category=${catFilter}` : ''}`} />

      <main id="main" tabIndex={-1} className="page-main">
        {/* Breadcrumb */}
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            {catFilter ? (
              <>
                <li><Link to="/shop">Shop</Link></li>
                <li aria-current="page">{activeCategory?.label ?? catFilter}</li>
              </>
            ) : (
              <li aria-current="page">Shop</li>
            )}
          </ol>
        </nav>

        <div className="container">
          <div className="shop-header">
            <div>
              <h1 className="page-h1">{activeCategory ? activeCategory.label : 'All Products'}</h1>
              <p className="page-intro">
                {activeCategory
                  ? `Browse our ${activeCategory.label.toLowerCase()} for restaurants, hotels, and commercial kitchens.`
                  : 'Browse our range of commercial tandoors and kitchen equipment for restaurants, hotels, and catering businesses.'}
              </p>
            </div>
            <p className="shop-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Toolbar */}
          <div className="shop-toolbar">
            {/* Category filter tabs */}
            <div className="filter-tabs" role="group" aria-label="Filter by category">
              <Link to="/shop" className={`filter-tab ${!catFilter ? 'filter-tab--active' : ''}`}>
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/shop?category=${c.slug}`}
                  className={`filter-tab ${catFilter === c.slug ? 'filter-tab--active' : ''}`}
                >
                  {c.label}
                </Link>
              ))}
            </div>

            {/* Sort */}
            <div className="shop-sort">
              <label htmlFor="shop-sort-select" className="shop-sort__label">Sort by</label>
              <select
                id="shop-sort-select"
                className="shop-sort__select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <h2>No products found</h2>
              <p>No products in this category yet.</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn btn--outline">Browse all products</Link>
                <Link to="/contact?type=quote" className="btn btn--gold">Request a Quote</Link>
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
