import { forwardRef } from 'react';
import { productImage } from '../config/content';

/**
 * The product photograph. Used as the instant poster while the 3D scene loads,
 * and as the full image-based experience when WebGL is unavailable.
 */
export const ProductFallback = forwardRef<HTMLDivElement, { hidden: boolean; mode: 'poster' | 'fallback' }>(
  function ProductFallback({ hidden, mode }, ref) {
    return (
      <div className={`product-photo product-photo--${mode}${hidden ? ' is-hidden' : ''}`} aria-hidden={hidden}>
        <div ref={ref} className="product-photo__frame">
          <img
            src={productImage.src}
            width={productImage.width}
            height={productImage.height}
            alt={productImage.alt}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    );
  },
);
