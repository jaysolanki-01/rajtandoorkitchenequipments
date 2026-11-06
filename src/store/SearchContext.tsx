import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { products, type Product } from '../config/products';

interface SearchContextValue {
  isOpen: boolean;
  query: string;
  results: Product[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function search(q: string): Product[] {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) => {
    return (
      p.name.toLowerCase().includes(term) ||
      p.categoryLabel.toLowerCase().includes(term) ||
      p.shortDescription.toLowerCase().includes(term) ||
      p.features.some((f) => f.toLowerCase().includes(term)) ||
      p.specs.some((s) => s.label.toLowerCase().includes(term) || s.value.toLowerCase().includes(term))
    );
  });
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => search(query), [query]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <SearchContext.Provider value={{ isOpen, query, results, open, close, toggle, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used inside SearchProvider');
  return ctx;
}
