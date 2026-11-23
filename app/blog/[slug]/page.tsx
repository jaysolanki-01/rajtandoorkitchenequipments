import { Suspense } from 'react';
import Link from 'next/link';

export default function BlogPostPage() {
  return (
    <Suspense>
      <main id="main" tabIndex={-1} className="page-main">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <ol role="list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li aria-current="page">Article</li>
          </ol>
        </nav>
        <div className="container" style={{ maxWidth: 740, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--rt-text2)', lineHeight: 1.75 }}>
            Full article coming soon. <Link href="/blog" style={{ color: 'var(--rt-gold)', fontWeight: 600 }}>← Back to Blog</Link>
          </p>
        </div>
      </main>
    </Suspense>
  );
}
