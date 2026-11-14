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
        <div id="raj-s0"><TandoorHero />{reduced && <StoryStatic />}</div>
        <div id="raj-s1"><TrustSection /></div>
        <div id="raj-s2"><CategoryGrid /></div>
        <div id="raj-s3"><FeaturedProducts /></div>
        <div id="raj-s4"><BestSellersSection /></div>
        <div id="raj-s5"><CommercialSection /></div>
        <div id="raj-s6"><BusinessTypeSection /></div>
        <div id="raj-s7"><ChooseTandoorGuide /></div>
        <div id="raj-s8"><FAQAccordion /></div>
        <div id="raj-s9"><ContactSection /></div>
      </main>
    </>
  );
}
