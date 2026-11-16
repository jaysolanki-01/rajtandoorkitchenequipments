import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../config/categories';

const ICON: Record<string, string> = {
  'tandoor-equipment':              '🔥',
  'burners-gas-stoves':             '🫕',
  'commercial-cooking-ranges':      '🍳',
  'fryers-griddles':                '🥘',
  'stainless-steel-fabrication':    '⚙️',
  'food-preparation-machines':      '🥣',
  'food-warming-display':           '♨️',
  'refrigeration-equipment':        '❄️',
  'exhaust-ventilation':            '💨',
  'kitchen-accessories-spare-parts':'🔧',
  'bakery-pizza-equipment':         '🍕',
  'dishwashing-cleaning':           '🫧',
  'storage-material-handling':      '📦',
  'beverage-equipment':             '☕',
};

export function CategoryShowcase() {
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add('cshow__grid--visible');
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="cshow" aria-labelledby="cshow-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">What We Offer</span>
          <h2 id="cshow-heading" className="section-title">Browse All Categories</h2>
          <p className="section-subtitle">
            From authentic clay tandoors to full commercial kitchen setups — everything under one roof.
          </p>
        </div>

        <ul ref={gridRef} className="cshow__grid" role="list">
          {CATEGORIES.map((cat, i) => (
            <li
              key={cat.slug}
              className="cshow__item"
              style={{ '--ci': i } as React.CSSProperties}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="cshow__card"
                aria-label={`${cat.name} — ${cat.products.length} products`}
              >
                <div className="cshow__icon" aria-hidden="true">
                  {ICON[cat.slug] ?? '🔧'}
                </div>
                <div className="cshow__body">
                  <h3 className="cshow__name">{cat.name}</h3>
                  <p className="cshow__count">{cat.products.length} products</p>
                </div>
                <svg className="cshow__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
