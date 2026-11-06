import { Link } from 'react-router-dom';
import { categories } from '../../config/products';

export function CategoryGrid() {
  return (
    <section className="cat-section" aria-labelledby="cat-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="cat-heading" className="section-title">Explore Our Product Categories</h2>
          <p className="section-subtitle">Browse our range of commercial tandoors and kitchen equipment.</p>
        </div>

        <ul className="cat-grid" role="list">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                to={cat.href}
                className={`cat-card ${cat.isDemo ? 'cat-card--demo' : ''}`}
                aria-label={cat.isDemo ? `${cat.label} — ${cat.demoNote ?? 'coming soon'}` : cat.label}
              >
                <div className="cat-card__img-wrap">
                  <img
                    src={cat.image}
                    alt=""
                    className="cat-card__img"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <div className="cat-card__overlay" aria-hidden="true" />
                </div>
                <div className="cat-card__body">
                  {cat.isDemo && (
                    <span className="cat-card__badge">Coming Soon</span>
                  )}
                  <h3 className="cat-card__name">{cat.label}</h3>
                  <p className="cat-card__desc">{cat.isDemo ? (cat.demoNote ?? cat.description) : cat.description}</p>
                  <span className="cat-card__link" aria-hidden="true">
                    {cat.isDemo ? 'Enquire' : 'Explore Category'} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
