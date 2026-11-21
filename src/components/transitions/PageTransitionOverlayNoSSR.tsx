'use client';
import dynamic from 'next/dynamic';

// GSAP accesses window.location at module level — skip SSR to suppress the warning
const PageTransitionOverlay = dynamic(
  () => import('./PageTransitionOverlay').then(m => ({ default: m.PageTransitionOverlay })),
  { ssr: false },
);

export function PageTransitionOverlayNoSSR() {
  return <PageTransitionOverlay />;
}
