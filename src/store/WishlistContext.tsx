import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

interface WishlistContextValue {
  ids: Set<string>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'rt-wishlist';

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {}
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count: ids.size }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
