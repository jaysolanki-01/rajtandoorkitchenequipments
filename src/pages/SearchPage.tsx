import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { seo } from '../config/site';
import { products as localProducts } from '../config/products';

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [input, setInput] = useState(params.get('q') ?? '');

  const trimmed = query.trim().toLowerCase();
  const results = trimmed.length < 2 ? [] : localProducts.filter(p =>
    p.name.toLowerCase().includes(trimmed) ||
    p.shortDescription?.toLowerCase().includes(trimmed) ||
    p.description?.toLowerCase().includes(trimmed)
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(input);
    setParams(input.trim() ? { q: input.trim() } : {});
  }

  useEffect(() => { setQuery(params.get('q') ?? ''); setInput(params.get('q') ?? ''); }, [params]);

  return (
    <>
      <title>{`Search${query ? `: ${query}` : ''} | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container">
          <h1 className="page-h1" style={{ marginBottom: '1.5rem' }}>Search Products</h1>

          <form onSubmit={handleSearch} role="search" className="search-page-form">
            <input
              type="search"
              className="form-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Search for tandoors, kitchen equipment…"
              aria-label="Search products"
              autoFocus
            />
            <button type="submit" className="btn btn--gold">Search</button>
          </form>

          {trimmed.length >= 2 && (
            <p className="search-page-count" role="status" aria-live="polite">
              {results.length === 0 ? `No results for "${query}"` : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
            </p>
          )}

          {results.length > 0 && (
            <div className="product-grid" style={{ marginTop: '2rem' }}>
              {results.map(p => (
                <article key={p.id} className="pc">
                  <Link to={`/products/${p.id}`} className="pc__link" tabIndex={-1} aria-hidden="true">
                    <div className="pc__img-wrap">
                      {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="pc__img" /> : <div className="pc__img-placeholder" />}
                    </div>
                  </Link>
                  <div className="pc__body">
                    <h2 className="pc__name"><Link to={`/products/${p.id}`}>{p.name}</Link></h2>
                    <p className="pc__desc">{p.description}</p>
                    <p className="pc__price">{p.price != null ? `₹${p.price.toLocaleString('en-IN')}` : 'Price on request'}</p>
                    <Link to={`/products/${p.id}`} className="btn btn--gold btn--sm">View Product</Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {trimmed.length >= 2 && results.length === 0 && (
            <div className="empty-state">
              <p>No products matched your search. Try different keywords, or <Link to="/shop">browse all products</Link>.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
