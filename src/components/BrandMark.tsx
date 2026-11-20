'use client';
import { brand } from '../config/content';

const LOGO_SRC = '/images/raj-tandoor-logo.webp';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'auto' | 'light' | 'dark';
  logoOnly?: boolean;
}

export function BrandMark({ size = 'sm' }: BrandMarkProps) {
  const height = size === 'lg' ? 80 : size === 'md' ? 68 : 48;

  return (
    <span
      className="bm"
      style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
    >
      <img
        src={LOGO_SRC}
        alt={brand.fullName}
        height={height}
        style={{
          height,
          width: 'auto',
          maxWidth: size === 'lg' ? 380 : size === 'md' ? 320 : 210,
          objectFit: 'contain',
          display: 'block',
          borderRadius: 4,
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    </span>
  );
}

/** Legacy emblem-only component kept for the 3D hero scene */
export function BrandEmblem({ size = 40 }: { size?: number }) {
  return (
    <img
      src={LOGO_SRC}
      alt={brand.name}
      width={size * 4}
      height={size}
      style={{ width: 'auto', height: size, objectFit: 'contain' }}
    />
  );
}

/** @deprecated Use BrandMark instead */
export function BrandLockup() {
  return <BrandMark />;
}
