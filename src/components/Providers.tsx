'use client';
import { AuthProvider } from '../store/AuthContext';
import { CartProvider } from '../store/CartContext';
import { WishlistProvider } from '../store/WishlistContext';
import { SearchProvider } from '../store/SearchContext';
import { UIProvider } from '../store/UIContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <UIProvider>
              {children}
            </UIProvider>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
