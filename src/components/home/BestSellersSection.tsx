'use client';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../product/ProductCard';

export function BestSellersSection() {
  const { products } = useProducts();
  const bestSellers = products.filter(p => !p.isDemo).slice(0, 4);
  if (bestSellers.length === 0) return null;

  return (
    <section className="best-sellers-section section-pad" aria-labelledby="best-sellers-heading">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Most Popular</p>
          <h2 id="best-sellers-heading" className="section-title">Customer Favourites</h2>
          <p className="section-subtitle">Our most-requested commercial tandoors, chosen by restaurants and catering teams.</p>
        </div>

        <ul className="product-grid" role="list" aria-label="Best selling products">
          {bestSellers.map((p) => (
            <li key={p.id}><ProductCard product={p} /></li>
          ))}
        </ul>

        <div className="section-footer">
          <Link href="/shop" className="btn btn--outline">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
