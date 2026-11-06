import { seo } from '../config/site';
import { TrustSection } from '../components/home/TrustSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CommercialSection } from '../components/home/CommercialSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { BusinessTypeSection } from '../components/home/BusinessTypeSection';
import { ChooseTandoorGuide } from '../components/home/ChooseTandoorGuide';
import { FAQAccordion } from '../components/home/FAQAccordion';
import { ContactSection } from '../components/home/ContactSection';
import { TandoorHero } from '../components/TandoorHero';
import { useReducedMotion } from '../hooks/useEnvironment';
import { StoryStatic } from '../components/PageSections';

// JSON-LD structured data for the homepage
const orgLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Raj Tandoor & Kitchen Equipment',
  url: seo.siteUrl,
};

const websiteLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Raj Tandoor',
  url: seo.siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${seo.siteUrl}/shop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function HomePage() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* React 19 native document head */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.siteUrl} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={`${seo.siteUrl}${seo.ogImage}`} />
      <meta property="og:url" content={seo.siteUrl} />
      <script type="application/ld+json">{JSON.stringify(orgLD)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLD)}</script>

      <main id="main" tabIndex={-1}>
        {/* 1. Scroll-driven 3D product story */}
        <TandoorHero />
        {reduced && <StoryStatic />}

        {/* 3. Trust / value props */}
        <TrustSection />

        {/* 4. Category grid */}
        <CategoryGrid />

        {/* 5. Featured products */}
        <FeaturedProducts />

        {/* 5b. Best sellers */}
        <BestSellersSection />

        {/* 6. Commercial buyers */}
        <CommercialSection />

        {/* 6b. Shop by business type */}
        <BusinessTypeSection />

        {/* 7. Buying guide */}
        <ChooseTandoorGuide />

        {/* 7. FAQ */}
        <FAQAccordion />

        {/* 8. Contact */}
        <ContactSection />
      </main>
    </>
  );
}
