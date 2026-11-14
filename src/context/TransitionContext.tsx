import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TransitionCtxValue {
  isShowing: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const TransitionCtx = createContext<TransitionCtxValue>({
  isShowing: false,
  startTransition: () => {},
  endTransition: () => {},
});

export function usePageTransition() {
  return useContext(TransitionCtx);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isShowing, setIsShowing] = useState(false);

  const startTransition = useCallback(() => setIsShowing(true), []);
  const endTransition = useCallback(() => setIsShowing(false), []);

  return (
    <TransitionCtx.Provider value={{ isShowing, startTransition, endTransition }}>
      {children}
    </TransitionCtx.Provider>
  );
}
