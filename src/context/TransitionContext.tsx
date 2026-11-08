import { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface TransitionCtxValue {
  navigateTo: (path: string) => void;
  isActive: boolean;
  targetPath: string;
  onComplete: () => void;
}

const TransitionCtx = createContext<TransitionCtxValue>({
  navigateTo: () => {},
  isActive: false,
  targetPath: '',
  onComplete: () => {},
});

export function usePageTransition() {
  return useContext(TransitionCtx);
}

function isInternalPath(href: string): boolean {
  if (!href) return false;
  if (href.startsWith('http') || href.startsWith('//')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('data:') || href.startsWith('blob:')) return false;
  return true;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const inProgressRef = useRef(false);

  const onComplete = useCallback(() => {
    inProgressRef.current = false;
    setIsActive(false);
    setTargetPath('');
  }, []);

  const navigateTo = useCallback((path: string) => {
    if (inProgressRef.current) return;
    const current = window.location.pathname + window.location.search;
    if (path === current || path === window.location.pathname) return;
    inProgressRef.current = true;
    setTargetPath(path);
    setIsActive(true);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inProgressRef.current) {
        const a = (e.target as Element).closest('a[href]');
        if (a) { e.preventDefault(); e.stopPropagation(); }
        return;
      }

      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (!isInternalPath(href)) return;
      if (anchor.hasAttribute('download')) return;
      if (anchor.getAttribute('target') === '_blank') return;
      if (href === '#' || href.startsWith('#')) return;

      e.preventDefault();
      e.stopPropagation();
      navigateTo(href);
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, [navigateTo]);

  return (
    <TransitionCtx.Provider value={{ navigateTo, isActive, targetPath, onComplete }}>
      {children}
    </TransitionCtx.Provider>
  );
}
