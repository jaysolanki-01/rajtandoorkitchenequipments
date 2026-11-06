import { Link } from 'react-router-dom';
import { seo } from '../config/site';
import { categories } from '../config/products';

export function CategoriesPage() {
  return (
    <>
      <title>{`Product Categories | ${seo.title}`}</title>
      <meta name="description" content="Browse all tandoor and commercial kitchen equipment categories from Raj Tandoor." />
      <link rel="canonical" href={`${seo.siteUrl}/categories`} />

      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">Categories</li>
          </ol>
        </nav>

        <div className="container">
          <h1 className="page-h1">Product Categories</h1>
          <p className="page-intro">Explore our range of commercial tandoors and kitchen equipment.</p>

          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {categories.map(cat => (
              <Link key={cat.slug} to={cat.href} className="category-card">
                <div className="category-card__img-wrap">
                  {cat.image ? <img src={cat.image} alt={cat.label} className="category-card__img" /> : <div className="category-card__img-placeholder" aria-hidden="true" />}
                </div>
                <div className="category-card__body">
                  <h2 className="category-card__name">{cat.label}</h2>
                  {cat.description && <p className="category-card__desc">{cat.description}</p>}
                  <span className="category-card__cta">Browse {cat.label} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
