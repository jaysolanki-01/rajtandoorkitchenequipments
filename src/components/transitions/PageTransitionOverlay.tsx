import { useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { usePageTransition } from '../../context/TransitionContext';
import { tAnim } from '../../three/tAnim';
import { hasWebGL } from '../../hooks/useEnvironment';

const TransitionScene = lazy(() =>
  import('../../three/TransitionScene').then(m => ({ default: m.TransitionScene }))
);

export function PageTransitionOverlay() {
  const navigate = useNavigate();
  const { isActive, targetPath, onComplete } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const webgl = hasWebGL();
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stable refs — not in effect deps, so refs keep the latest without re-running the effect
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive || !targetPath) return;

    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay) return;

    // Reset 3D positions and start render loop
    tAnim.posX = 5;
    tAnim.rotY = 0;
    tAnim.cameraZ = 4.5;
    activeRef.current = true;

    // Animate the 3D model while overlay is showing
    if (webgl && !reduced) {
      gsap.to(tAnim, { posX: 0, duration: 0.35, ease: 'power3.out', delay: 0.15 });
      gsap.to(tAnim, { rotY: Math.PI * 1.85, duration: 0.65, ease: 'power1.inOut', delay: 0.4 });
      gsap.to(tAnim, { cameraZ: 3.9, duration: 0.45, ease: 'power1.inOut', delay: 0.45 });
    }

    // Show overlay using CSS class (bypasses React → no vDOM conflict)
    overlay.classList.add('ptov--active');
    if (text) text.classList.add('ptov__text--visible');

    // Navigate to new page under the overlay
    const navTimer = window.setTimeout(() => {
      navigateRef.current(targetPath);
    }, 900);

    // Slide 3D model out, then hide overlay
    const exitTimer = window.setTimeout(() => {
      if (webgl && !reduced) {
        gsap.to(tAnim, { posX: -5, duration: 0.25, ease: 'power3.in' });
      }
      if (text) text.classList.remove('ptov__text--visible');
    }, 900);

    const doneTimer = window.setTimeout(() => {
      overlay.classList.remove('ptov--active');
      activeRef.current = false;
      onCompleteRef.current();
    }, 1300);

    return () => {
      window.clearTimeout(navTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      gsap.killTweensOf(tAnim);
      overlay.classList.remove('ptov--active');
      if (text) text.classList.remove('ptov__text--visible');
      activeRef.current = false;
      // Always reset inProgressRef even if transition is interrupted
      onCompleteRef.current();
    };
  }, [isActive, targetPath, webgl, reduced]);

  return (
    <div ref={overlayRef} className="ptov" aria-hidden="true">
        <div className="ptov__glow" />

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
