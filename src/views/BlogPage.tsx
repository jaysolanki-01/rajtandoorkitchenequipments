'use client';
import { useState } from 'react';
import Link from 'next/link';
import { seo } from '../config/site';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

const POSTS: Post[] = [
  {
    slug: 'how-to-season-a-new-clay-tandoor',
    title: 'How to Season a New Clay Tandoor for the First Time',
    excerpt: 'Proper seasoning extends the life of your tandoor and ensures authentic flavour from day one. Follow these steps before your first commercial service.',
    category: 'Tips & Care',
    date: 'Nov 2025',
    readTime: '5 min read',
    image: '/images/raj-tandoor-product.webp',
  },
  {
    slug: 'choosing-the-right-commercial-gas-stove',
    title: 'Choosing the Right Commercial Gas Stove for Your Restaurant',
    excerpt: 'Single burner, double burner, or a full cooking range? We break down what capacity, BTU, and build quality mean for your kitchen throughput.',
    category: 'Buying Guide',
    date: 'Oct 2025',
    readTime: '7 min read',
    image: '/images/raj-tandoor-product.webp',
  },
  {
    slug: 'stainless-steel-kitchen-equipment-maintenance',
    title: '5 Essential Maintenance Tips for Stainless Steel Kitchen Equipment',
    excerpt: 'Commercial SS equipment lasts decades with correct care. Learn how to prevent corrosion, maintain shine, and avoid costly repairs.',
    category: 'Maintenance',
    date: 'Oct 2025',
    readTime: '4 min read',
    image: '/images/raj-tandoor-product.webp',
  },
  {
    slug: 'understanding-btu-commercial-kitchen',
    title: 'Understanding BTU: What It Means for Your Commercial Kitchen',
    excerpt: 'BTU determines how fast and how hot your burners get. Here\'s how to calculate the right output for your volume without overpaying for capacity you don\'t need.',
    category: 'Education',
    date: 'Sep 2025',
    readTime: '6 min read',
    image: '/images/raj-tandoor-product.webp',
  },
  {
    slug: 'tandoor-vs-gas-oven-roti-production',
    title: 'Tandoor vs Gas Oven: Which is Better for Commercial Roti Production?',
    excerpt: 'Both produce excellent bread, but they suit very different operations. We compare speed, texture, fuel cost, and maintenance overhead.',
    category: 'Comparison',
    date: 'Sep 2025',
    readTime: '8 min read',
    image: '/images/raj-tandoor-product.webp',
  },
  {
    slug: 'cloud-kitchen-equipment-checklist',
    title: 'Setting Up a Cloud Kitchen: Essential Equipment Checklist',
    excerpt: 'Opening a delivery-only kitchen? Here\'s the compact, high-output equipment setup that lets you maximise output from a small footprint.',
    category: 'Business Tips',
    date: 'Aug 2025',
    readTime: '6 min read',
    image: '/images/raj-tandoor-product.webp',
  },
];

const ALL_CATS = ['All', ...Array.from(new Set(POSTS.map(p => p.category)))];

const CAT_COLORS: Record<string, string> = {
  'Tips & Care': '#16a34a',
  'Buying Guide': '#0369a1',
  'Maintenance': '#d97706',
  'Education': '#7c3aed',
  'Comparison': '#be185d',
  'Business Tips': '#0f766e',
};

export function BlogPage() {
  const [active, setActive] = useState('All');

  const visible = active === 'All' ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <>
      <title>{`Kitchen & Tandoor Blog | ${seo.title}`}</title>
      <meta name="description" content="Tips, buying guides, maintenance advice and industry insights for commercial kitchen and tandoor equipment from Raj Tandoor." />
      <link rel="canonical" href={`${seo.siteUrl}/blog`} />

      <main id="main" tabIndex={-1} className="page-main">
        {/* Breadcrumb */}
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Blog</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="blog-hero">
          <div className="container">
            <span className="blog-hero__tag">Knowledge Base</span>
            <h1 className="blog-hero__title">Kitchen & Tandoor Insights</h1>
            <p className="blog-hero__sub">
              Expert tips on equipment care, buying guides, and commercial kitchen best practices, straight from Raj Tandoor.
            </p>
          </div>
          <div className="blog-hero__accent" aria-hidden="true" />
        </div>

        <div className="container">
          {/* Category filter */}
          <div className="blog-filter" role="group" aria-label="Filter by category">
            {ALL_CATS.map(cat => (
              <button
                key={cat}
                className={`blog-filter__btn${active === cat ? ' blog-filter__btn--active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post grid */}
          <ul className="blog-grid" role="list">
            {visible.map(post => (
              <li key={post.slug} className="blog-card">
                <div className="blog-card__img-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-card__img"
                    loading="lazy"
                  />
                  <span
                    className="blog-card__cat"
                    style={{ background: CAT_COLORS[post.category] ?? 'var(--rt-gold)' }}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span>{post.date}</span>
                    <span className="blog-card__dot" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-card__link">
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA strip */}
          <div className="blog-cta">
            <div className="blog-cta__inner">
              <div>
                <p className="blog-cta__label">Need help choosing equipment?</p>
                <p className="blog-cta__sub">Our team is happy to advise on specifications, capacity, and budget.</p>
              </div>
              <div className="blog-cta__btns">
                <Link href="/contact?type=quote" className="btn btn--gold">Request a Quote</Link>
                <Link href="/contact" className="btn btn--outline">Talk to Us</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
