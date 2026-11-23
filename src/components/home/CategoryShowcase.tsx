'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '../../config/categories';

export function CategoryShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.cshow__card'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cshow" aria-labelledby="cshow-heading">
      <div className="cshow__header container">
        <span className="eyebrow">What We Offer</span>
        <h2 id="cshow-heading" className="section-title">Browse All Categories</h2>
        <p className="section-subtitle">
          From authentic clay tandoors to full commercial kitchen setups — everything under one roof.
        </p>
      </div>

      <div className="cshow__grid container" ref={gridRef}>
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className="cshow__card"
            style={{ '--cshow-delay': `${i * 55}ms` } as React.CSSProperties}
          >
            <div className="cshow__img-wrap">
              {cat.image ? (
                <img src={cat.image} alt="" className="cshow__img" aria-hidden="true" />
              ) : (
                <div className="cshow__img-placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="cshow__body">
              <span className="cshow__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="cshow__name">{cat.name}</h3>
              {cat.description && (
                <p className="cshow__desc">{cat.description}</p>
              )}
            </div>
            <div className="cshow__footer">
              <span className="cshow__count">{cat.products.length} products</span>
              <svg className="cshow__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
