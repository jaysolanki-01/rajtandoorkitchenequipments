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
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeRef = useRef(false);
  const webgl = hasWebGL();
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stable refs — prevents the effect from re-running when router gives a new navigate fn
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive || !targetPath) return;

    tAnim.posX = 5;
    tAnim.rotY = 0;
    tAnim.cameraZ = 4.5;
    activeRef.current = true;

    tlRef.current?.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    const overlay = overlayRef.current;
    const text = textRef.current;

    const resetOverlay = () => {
      if (overlay) gsap.set(overlay, { opacity: 0, pointerEvents: 'none' });
      activeRef.current = false;
    };

    const fallback = setTimeout(() => {
      tl.kill();
      resetOverlay();
      navigateRef.current(targetPath);
      onCompleteRef.current();
    }, 2500);

    // Phase 1 (0–0.15s): dark background fades in
    if (overlay) {
      tl.set(overlay, { pointerEvents: 'all' }, 0);
      tl.to(overlay, { opacity: 1, duration: 0.15, ease: 'power2.in' }, 0);
    }

    // Phase 2 (0.15–0.45s): tandoor enters from right
    if (webgl && !reduced) {
      tl.to(tAnim, { posX: 0, duration: 0.3, ease: 'power3.out' }, 0.15);
    }

    // Phase 3 (0.45–1.0s): 360° showcase + text fade-in
    if (webgl && !reduced) {
      tl.to(tAnim, { rotY: Math.PI * 1.85, duration: 0.55, ease: 'power1.inOut' }, 0.45);
      tl.to(tAnim, { cameraZ: 4.0, duration: 0.35, ease: 'power1.inOut' }, 0.5);
    }
    if (text) {
      tl.to(text, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.5);
    }

    // Navigate at T=1.0s
    tl.call(() => navigateRef.current(targetPath), [], 1.0);

    // Phase 4 (1.0–1.25s): exit
    if (webgl && !reduced) {
      tl.to(tAnim, { posX: -5, duration: 0.25, ease: 'power3.in' }, 1.0);
    }
    if (text) {
      tl.to(text, { opacity: 0, duration: 0.15, ease: 'power2.in' }, 1.0);
    }
    if (overlay) {
      tl.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 1.02);
      tl.set(overlay, { pointerEvents: 'none' }, 1.27);
    }

    tl.call(() => {
      clearTimeout(fallback);
      activeRef.current = false;
      onCompleteRef.current();
    }, [], 1.27);

    return () => {
      tl.kill();
      clearTimeout(fallback);
      // Always reset the overlay so it never blocks clicks after cleanup
      resetOverlay();
    };
    // Only re-run when the transition state changes — not when navigate/onComplete refs update
  }, [isActive, targetPath, webgl, reduced]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        opacity: 0,
        pointerEvents: 'none',
        background: '#050302',
        isolation: 'isolate',
      }}
    >
      {/* Radial spotlight glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 55% 65% at 50% 52%, rgba(195,162,104,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* 3D Scene — lazy-loaded, only when WebGL is available and motion not reduced */}
      {webgl && !reduced && (
        <Suspense fallback={null}>
          <TransitionScene activeRef={activeRef} />
        </Suspense>
      )}

      {/* Tagline */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 6vh, 4rem)',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(8px)',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: "'Mont', 'Segoe UI', Arial, sans-serif",
          fontSize: 'clamp(0.6rem, 1.2vw, 0.78rem)',
          fontWeight: 700,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(195,162,104,0.75)',
          margin: 0,
        }}>
          Engineered for Excellence
        </p>
      </div>
    </div>
  );
}
