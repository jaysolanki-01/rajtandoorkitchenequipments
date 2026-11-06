import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../config/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  /** null when any item has no price */
  subtotal: number | null;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'rt-cart';

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, quantity } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const subtotal =
    items.some((i) => i.product.price === null)
      ? null
      : items.reduce((s, i) => s + (i.product.price ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
