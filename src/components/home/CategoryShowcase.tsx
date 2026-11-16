'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '../../config/categories';

const ROW1 = CATEGORIES.slice(0, 7);
const ROW2 = CATEGORIES.slice(7);

export function CategoryShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref   = useRef<HTMLUListElement>(null);
  const row2Ref   = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;

      // p: 0 when section top hits viewport bottom → 1 when section bottom hits viewport top
      const range = rect.height + vh;
      const p     = Math.max(0, Math.min(1, (vh - rect.top) / range));

      const drift = (p - 0.5) * 160; // ±80 px around centre

      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${-drift}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${drift}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cshow" aria-labelledby="cshow-heading">
      <div className="cshow__header container">
        <span className="eyebrow">What We Offer</span>
        <h2 id="cshow-heading" className="section-title">Browse All Categories</h2>
        <p className="section-subtitle">
          From authentic clay tandoors to full commercial kitchen setups — everything under one roof.
        </p>
      </div>

      <div className="cshow__tracks">
        {/* Row 1 — drifts left on scroll-down */}
        <ul ref={row1Ref} className="cshow__row" role="list" aria-label="Categories row 1">
          {ROW1.map((cat, i) => (
            <li key={cat.slug} className="cshow__item">
              <Link href={`/shop?category=${cat.slug}`} className="cshow__card">
                <span className="cshow__num">{String(i + 1).padStart(2, '0')}</span>
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

        {/* Row 2 — drifts right on scroll-down */}
        <ul ref={row2Ref} className="cshow__row" role="list" aria-label="Categories row 2">
          {ROW2.map((cat, i) => (
            <li key={cat.slug} className="cshow__item">
              <Link href={`/shop?category=${cat.slug}`} className="cshow__card">
                <span className="cshow__num">{String(ROW1.length + i + 1).padStart(2, '0')}</span>
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
