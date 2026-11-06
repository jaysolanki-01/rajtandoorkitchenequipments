import { useWishlist } from '../../store/WishlistContext';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
}

export function WishlistButton({ productId, productName, className = '' }: WishlistButtonProps) {
  const { toggle, has } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      className={`wishlist-btn ${active ? 'wishlist-btn--active' : ''} ${className}`}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
