'use client';
import { useEffect, useRef, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { tAnim } from '../../three/tAnim';
import { hasWebGL } from '../../hooks/useEnvironment';

const TransitionScene = lazy(() =>
  import('../../three/TransitionScene').then(m => ({ default: m.TransitionScene }))
);

export function PageTransitionOverlay() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const prevPathRef = useRef(pathname);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const webgl = hasWebGL();
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intercept internal link clicks — show overlay immediately so the
  // scroll-to-top reset happens while the overlay covers the screen.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      // Only intercept internal same-origin navigations (not anchors, external, mailto etc.)
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const overlay = overlayRef.current;
      if (!overlay) return;
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'all';
      // Scroll to top immediately so it happens under the overlay
      window.scrollTo(0, 0);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Fire on every route change (but not on initial mount)
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay) return;

    // Clear any previous hide timer
    clearTimeout(hideTimerRef.current);

    // Reset and start 3D model animation
    tAnim.posX = 5;
    tAnim.rotY = 0;
    tAnim.cameraZ = 4.5;
    activeRef.current = true;

    if (webgl && !reduced) {
      gsap.killTweensOf(tAnim);
      gsap.to(tAnim, { posX: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 });
      gsap.to(tAnim, { rotY: Math.PI * 1.85, duration: 0.65, ease: 'power1.inOut', delay: 0.25 });
      gsap.to(tAnim, { cameraZ: 3.9, duration: 0.45, ease: 'power1.inOut', delay: 0.3 });
    }

    // Show overlay — drive pointer-events via inline style (beats CSS specificity issues)
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    if (text) text.classList.add('ptov__text--visible');

    // Start exit after a brief hold
    hideTimerRef.current = setTimeout(() => {
      if (webgl && !reduced) {
        gsap.to(tAnim, { posX: -5, duration: 0.3, ease: 'power3.in' });
      }
      if (text) text.classList.remove('ptov__text--visible');

      setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        activeRef.current = false;
      }, 300);
    }, 600);

  }, [pathname, webgl, reduced]);

  return (
    <div ref={overlayRef} className="ptov" aria-hidden="true" style={{ opacity: 0, pointerEvents: 'none' }}>
      <div className="ptov__glow" style={{ pointerEvents: 'none' }} />

      {webgl && !reduced && (
        <Suspense fallback={null}>
          <TransitionScene activeRef={activeRef} />
        </Suspense>
      )}

      <div ref={textRef} className="ptov__text">
        <p className="ptov__tagline">Engineered for Excellence</p>
      </div>
    </div>
  );
}
