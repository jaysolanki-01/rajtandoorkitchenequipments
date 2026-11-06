import { useEffect, useState } from 'react';
import type { LayoutMode } from '../animation/storyConfig';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** Media queries shared by CSS (via data-layout on the hero) and the animation timeline. */
export const LAYOUT_QUERIES = {
  desktop: '(min-width: 1200px) and (min-aspect-ratio: 1/1)',
  tablet: '(min-width: 820px) and (min-aspect-ratio: 1/1)',
};

export function useLayoutMode(): LayoutMode {
  const desktop = useMediaQuery(LAYOUT_QUERIES.desktop);
  const tablet = useMediaQuery(LAYOUT_QUERIES.tablet);
  if (desktop) return 'desktop';
  if (tablet) return 'tablet';
  return 'stacked';
}

/** Honours the OS setting. Append ?reduced-motion to the URL to preview this mode. */
export function useReducedMotion() {
  const prefers = useMediaQuery('(prefers-reduced-motion: reduce)');
  return prefers || new URLSearchParams(window.location.search).has('reduced-motion');
}

let webglCache: boolean | null = null;
/** True when WebGL is available. Append ?static to the URL to force the image fallback. */
export function hasWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  if (new URLSearchParams(window.location.search).has('static')) return (webglCache = false);
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    webglCache = !!gl;
    (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglCache = false;
  }
  return webglCache;
}
