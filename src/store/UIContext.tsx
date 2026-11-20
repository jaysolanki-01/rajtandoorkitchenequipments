'use client';
import { createContext, useContext, useState } from 'react';
import type { Product } from '../config/products';

type UIContextType = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <UIContext.Provider value={{
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      loginOpen,
      openLogin: () => setLoginOpen(true),
      closeLogin: () => setLoginOpen(false),
      quickViewProduct,
      openQuickView: (product) => setQuickViewProduct(product),
      closeQuickView: () => setQuickViewProduct(null),
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
