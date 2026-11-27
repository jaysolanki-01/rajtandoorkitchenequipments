'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '../../config/categories';

/* ─── Category meta ──────────────────────────────────────────── */

const ICONS: Record<string, string> = {
  'tandoor-equipment':              '🔥',
  'burners-gas-stoves':             '🌡️',
  'commercial-cooking-ranges':      '🍳',
  'fryers-griddles':                '🥘',
  'stainless-steel-fabrication':    '🔩',
  'food-preparation-machines':      '⚙️',
  'food-warming-display':           '🍲',
  'refrigeration-equipment':        '❄️',
  'exhaust-ventilation':            '💨',
  'kitchen-accessories-spare-parts':'🔧',
  'bakery-pizza-equipment':         '🍕',
  'dishwashing-cleaning':           '🧽',
  'storage-material-handling':      '📦',
  'beverage-equipment':             '🥤',
};

const SHORT_DESC: Record<string, string> = {
  'tandoor-equipment':              'Clay, gas, electric & custom tandoors',
  'burners-gas-stoves':             'High-pressure burners for every cuisine',
  'commercial-cooking-ranges':      'Indian, Chinese & multi-burner ranges',
  'fryers-griddles':                'Deep fryers, flat tops & char grills',
  'stainless-steel-fabrication':    'Work tables, sinks & custom steelwork',
  'food-preparation-machines':      'Dough kneaders, cutters & mixers',
  'food-warming-display':           'Bain-maries, buffet counters & warmers',
  'refrigeration-equipment':        'Chillers, freezers & cold rooms',
  'exhaust-ventilation':            'Hoods, ducts & kitchen ventilation',
  'kitchen-accessories-spare-parts':'Tools, skewers & replacement parts',
  'bakery-pizza-equipment':         'Ovens, sheeters & proofing cabinets',
  'dishwashing-cleaning':           'Commercial dishwashers & glass washers',
  'storage-material-handling':      'Shelves, racks & ingredient bins',
  'beverage-equipment':             'Coffee urns, dispensers & blenders',
};

/* ─── Hooks ──────────────────────────────────────────────────── */

function useStaggerReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─── Card ───────────────────────────────────────────────────── */

function CatCard({ cat, index, featured }: { cat: (typeof CATEGORIES)[0]; index: number; featured?: boolean }) {
  const href = `/shop?category=${cat.slug}`;
  const icon = ICONS[cat.slug] ?? '🏭';
  const desc = SHORT_DESC[cat.slug] ?? '';

  return (
    <Link
      href={href}
      className={`ccat-card${featured ? ' ccat-card--featured' : ''}`}
      style={{ animationDelay: `${index * 0.055}s` }}
    >
      <div className="ccat-card__top">
        <span className="ccat-card__count">{cat.products.length} products</span>
      </div>
      <h3 className="ccat-card__name">{cat.name}</h3>
      <p className="ccat-card__desc">{desc}</p>

      {featured && (
        <ul className="ccat-card__products" aria-label="Sample products">
          {cat.products.slice(0, 4).map(p => (
            <li key={p.slug}>{p.name}</li>
          ))}
          {cat.products.length > 4 && <li className="ccat-card__more">+{cat.products.length - 4} more</li>}
        </ul>
      )}

      <span className="ccat-card__arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 14 0M13 6l6 6-6 6" />
        </svg>
      </span>
      <div className="ccat-card__glow" aria-hidden="true" />
    </Link>
  );
}

/* ─── Section ────────────────────────────────────────────────── */

export function CategoryGrid() {
  const { ref, vis } = useStaggerReveal();
  const featured = CATEGORIES[0];
  const rest = CATEGORIES.slice(1);

  return (
    <section className="ccat" aria-labelledby="ccat-heading">
      <div className="container">

        {/* Header */}
        <div className={`ccat__head${vis ? ' ccat__head--vis' : ''}`} ref={ref}>
          <div className="ccat__head-left">
            <span className="ccat__eyebrow">Product Range</span>
            <h2 className="ccat__h2" id="ccat-heading">
              Every piece your kitchen needs,<br />
              <em>under one roof</em>
            </h2>
          </div>
          <div className="ccat__head-right">
            <span className="ccat__count-num">14</span>
            <span className="ccat__count-label">Equipment<br />Categories</span>
          </div>
        </div>

        {/* Grid */}
        <div className={`ccat__grid${vis ? ' ccat__grid--vis' : ''}`}>

          {/* Featured — Tandoor Equipment (wide card) */}
          <CatCard cat={featured} index={0} featured />

          {/* Remaining 13 */}
          {rest.map((cat, i) => (
            <CatCard key={cat.slug} cat={cat} index={i + 1} />
          ))}

        </div>

        {/* Footer CTA */}
        <div className={`ccat__footer${vis ? ' ccat__footer--vis' : ''}`}>
          <Link href="/shop" className="ccat__all-btn">
            Browse all products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12 14 0M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
