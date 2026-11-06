import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './store/CartContext';
import { WishlistProvider } from './store/WishlistContext';
import { SearchProvider } from './store/SearchContext';
import { AuthProvider } from './store/AuthContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { SearchOverlay } from './components/search/SearchOverlay';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { TandoorsPage } from './pages/TandoorsPage';
import { KitchenEquipmentPage } from './pages/KitchenEquipmentPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { FAQPage } from './pages/FAQPage';
import { SearchPage } from './pages/SearchPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AccountPage } from './pages/AccountPage';
import { AccountProfilePage } from './pages/AccountProfilePage';
import { AccountOrdersPage } from './pages/AccountOrdersPage';
import { AccountOrderDetailPage } from './pages/AccountOrderDetailPage';
import { AccountAddressesPage } from './pages/AccountAddressesPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <a className="skip-link" href="#main">Skip to main content</a>
            <AnnouncementBar />
            <SiteHeader />
            <SearchOverlay />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/tandoors" element={<TandoorsPage />} />
              <Route path="/kitchen-equipment" element={<KitchenEquipmentPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/confirmation" element={<OrderConfirmationPage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/profile" element={<AccountProfilePage />} />
              <Route path="/account/orders" element={<AccountOrdersPage />} />
              <Route path="/account/orders/:orderNumber" element={<AccountOrderDetailPage />} />
              <Route path="/account/addresses" element={<AccountAddressesPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/return-policy" element={<ReturnPolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <SiteFooter />
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
