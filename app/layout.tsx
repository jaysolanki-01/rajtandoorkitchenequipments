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
import { PageTransitionOverlayNoSSR } from '../src/components/transitions/PageTransitionOverlayNoSSR';

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
      <body>
        <Providers>
          {!isAdmin && <a className="skip-link" href="#main">Skip to main content</a>}
          {!isAdmin && <AnnouncementBar />}
          {!isAdmin && <SiteHeader />}
          {!isAdmin && <SearchOverlay />}
          {children}
          {!isAdmin && <SiteFooter />}
          {!isAdmin && <WhatsAppFAB />}
          {!isAdmin && <PageTransitionOverlayNoSSR />}
        </Providers>
      </body>
    </html>
  );
}
