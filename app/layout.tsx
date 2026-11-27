import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { seo } from '../src/config/site';
import '../src/styles/global.css';
import '../src/styles/glass.css';
import { Providers } from '../src/components/Providers';
import { AnnouncementBar } from '../src/components/layout/AnnouncementBar';
import { SiteHeader } from '../src/components/layout/SiteHeader';
import { SiteFooter } from '../src/components/layout/SiteFooter';
import { WhatsAppFAB } from '../src/components/WhatsAppFAB';
import { SearchOverlay } from '../src/components/search/SearchOverlay';
import { CookieConsent } from '../src/components/CookieConsent';

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? headersList.get('x-invoke-path') ?? '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Set has-ann class before first paint to prevent layout shift from fixed header */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(sessionStorage.getItem('ann-dismissed')!=='1')document.documentElement.classList.add('has-ann');}catch(e){}})();` }} />
      </head>
      <body>
        <Providers>
          {!isAdmin && <a className="skip-link" href="#main">Skip to main content</a>}
          {!isAdmin && <AnnouncementBar />}
          {!isAdmin && <SiteHeader />}
          {!isAdmin && <SearchOverlay />}
          {children}
          {!isAdmin && <SiteFooter />}
          {!isAdmin && <WhatsAppFAB />}
          {!isAdmin && <CookieConsent />}
        </Providers>
      </body>
    </html>
  );
}
