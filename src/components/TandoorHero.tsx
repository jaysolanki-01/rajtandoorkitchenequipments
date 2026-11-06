import { Component, lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { chapters, links } from '../config/content';
import { callouts, chapterAnchors } from '../animation/storyConfig';
import { sceneState, storyBus } from '../animation/storyStore';
import { applyRestingComposition, buildStoryTimeline, gsap, ScrollTrigger } from '../animation/buildStoryTimeline';
import { hasWebGL, useLayoutMode, useReducedMotion } from '../hooks/useEnvironment';
import { ScrollStory } from './ScrollStory';
import { FeatureCallout } from './FeatureCallout';
import { ProductFallback } from './ProductFallback';

// The 3D scene (three.js + R3F) is code-split so it never blocks the first render.
const TandoorScene = lazy(() => import('../three/TandoorScene'));

/** If WebGL throws at runtime, keep the photo instead of a broken stage. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const calloutLabel = (id: string) => {
  for (const ch of chapters) {
    const f = ch.features?.find((x) => x.id === id);
    if (f) return f;
  }
  return null;
};

export function TandoorHero() {
  const mode = useLayoutMode();
  const reduced = useReducedMotion();
  const [webglFailed, setWebglFailed] = useState(false);
  const webgl = useMemo(() => hasWebGL(), []) && !webglFailed;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterEls = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [loadScene, setLoadScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(storyBus.sceneReady);

  const registerChapter = useCallback((i: number, el: HTMLElement | null) => {
    chapterEls.current[i] = el;
  }, []);

  // Start loading the 3D bundle once the page has painted.
  useEffect(() => {
    if (!webgl) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => setLoadScene(true), { timeout: 600 });
    } else {
      const t = setTimeout(() => setLoadScene(true), 200);
      return () => clearTimeout(t);
    }
  }, [webgl]);

  useEffect(() => {
    storyBus.stageEl = stageRef.current;
    const onReady = () => setSceneReady(true);
    storyBus.readyListeners.add(onReady);
    return () => {
      storyBus.readyListeners.delete(onReady);
      storyBus.stageEl = null;
    };
  }, []);

  // Time-based reveal once the first lit frame exists (independent of scroll).
  useEffect(() => {
    if (!sceneReady) return;
    const tween = gsap.to(sceneState, {
      intro: 1,
      duration: reduced ? 0 : 2.6,
      ease: 'power2.out',
      onUpdate: () => storyBus.invalidate(),
    });
    return () => {
      tween.kill();
    };
  }, [sceneReady, reduced]);

  // The scroll timeline — rebuilt when the layout or motion preference changes.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = chapterEls.current.filter((e): e is HTMLElement => !!e);
    if (reduced) {
      storyBus.calloutsEnabled = false;
      applyRestingComposition(mode);
      return;
    }
    const tl = buildStoryTimeline({
      section,
      mode,
      chapterEls: els,
      fallbackImg: webgl ? null : fallbackRef.current,
      progressEl: progressRef.current,
      onChapterChange: setActive,
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      const inners = [...storyBus.calloutEls.values()].map((el) => el.firstElementChild);
      gsap.set([...els, ...inners, fallbackRef.current].filter(Boolean), { clearProps: 'all' });
    };
  }, [mode, reduced, webgl]);

  // Recalculate trigger positions after fonts load (heights may change).
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const goToChapter = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (distance * chapterAnchors[i]) / 100, behavior: reduced ? 'auto' : 'smooth' });
  };

  const showCallouts = mode !== 'stacked' && webgl && !reduced;
  const motion = reduced ? 'reduced' : 'full';

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero"
      data-layout={mode}
      data-motion={motion}
      data-callouts={showCallouts ? 'on' : 'off'}
      data-active={active}
      aria-label="Raj Tandoor product story"
    >
      <div className="hero__sticky">
        <div ref={stageRef} className="stage">
          <div className="stage__atmosphere" aria-hidden="true" />
          <ProductFallback ref={fallbackRef} hidden={webgl && sceneReady} mode={webgl ? 'poster' : 'fallback'} />
          {webgl && loadScene && (
            <SceneBoundary onError={() => setWebglFailed(true)}>
              <Suspense fallback={null}>
                <div className={`stage__canvas-wrap${sceneReady ? ' is-ready' : ''}`}>
                  <TandoorScene mode={mode} />
                </div>
              </Suspense>
            </SceneBoundary>
          )}
          {showCallouts && (
            <div className={`callout-layer${sceneReady ? ' is-ready' : ''}`} aria-hidden="true">
              {callouts.map((c) => {
                const f = calloutLabel(c.id);
                return f ? <FeatureCallout key={c.id} config={c} label={f.label} index={f.index} compact={mode === 'tablet'} /> : null;
              })}
            </div>
          )}
          <div className="stage__vignette" aria-hidden="true" />
        </div>

        <div className="hero__content">
          <ScrollStory registerChapter={registerChapter} />
        </div>

        {!reduced && (
          <>
            <nav className="chapter-nav" aria-label="Product story chapters">
              <div className="chapter-nav__track" aria-hidden="true">
                <div ref={progressRef} className="chapter-nav__progress" />
              </div>
              <ol>
                {chapters.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={i === active ? 'is-active' : undefined}
                      aria-current={i === active ? 'step' : undefined}
                      onClick={() => goToChapter(i)}
                    >
                      <span className="chapter-nav__dot" aria-hidden="true" />
                      <span className="chapter-nav__label">{c.navLabel}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
            <div className={`scroll-cue${active > 0 ? ' is-hidden' : ''}`} aria-hidden="true">
              <span className="scroll-cue__line" />
              Scroll to explore
            </div>
            <a className="skip-story" href={links.exploreTandoors}>
              Skip the product story
            </a>
          </>
        )}
      </div>
    </section>
  );
}
