import { brand } from '../config/content';

const LOGO_SRC = '/images/raj-tandoor-logo.png';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  /** 'auto' = adapt to bg, 'light' = on dark bg (white text), 'dark' = on light bg */
  theme?: 'auto' | 'light' | 'dark';
  /** Hide the text wordmark next to the logo */
  logoOnly?: boolean;
}

/**
 * Primary logo unit. Uses the real logo image when available,
 * falls back to SVG emblem if the image fails to load.
 */
export function BrandMark({ size = 'sm', theme = 'auto', logoOnly = false }: BrandMarkProps) {
  const px = size === 'lg' ? 52 : size === 'md' ? 44 : 36;
  const onDark = theme === 'light';

  return (
    <span
      className="bm"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        textDecoration: 'none',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo image */}
      <span
        style={{
          width: px,
          height: px,
          flexShrink: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          /* Gold ring makes white circle look intentional on dark surfaces */
          boxShadow: onDark ? '0 0 0 1.5px rgba(196,136,42,0.6)' : 'none',
          background: 'transparent',
        }}
      >
        <img
          src={LOGO_SRC}
          alt=""
          aria-hidden="true"
          width={px}
          height={px}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '50%',
            /* multiply removes white bg on light surfaces; on dark, ring handles it */
            mixBlendMode: onDark ? 'normal' : 'multiply',
            filter: onDark ? 'brightness(1.1) contrast(1.05)' : 'none',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </span>

      {/* Wordmark — shown beside logo */}
      {!logoOnly && (
        <span
          className="bm__text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.15,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: "'Mont', 'Segoe UI', Arial, sans-serif",
              fontWeight: 700,
              fontSize: size === 'lg' ? '1.05rem' : '0.875rem',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
              color: onDark ? '#fff' : '#181715',
            }}
          >
            {brand.logoLine1}
          </span>
          <span
            style={{
              fontFamily: "'Mont', 'Segoe UI', Arial, sans-serif",
              fontWeight: 500,
              fontSize: size === 'lg' ? '0.6rem' : '0.52rem',
              letterSpacing: '0.14em',
              whiteSpace: 'nowrap',
              color: onDark ? 'rgba(255,255,255,0.6)' : '#888',
            }}
          >
            {brand.logoLine2}
          </span>
        </span>
      )}
    </span>
  );
}

/** Legacy emblem-only component kept for the 3D hero scene */
export function BrandEmblem({ size = 40 }: { size?: number }) {
  return (
    <img
      src={LOGO_SRC}
      alt={brand.name}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

/** @deprecated Use BrandMark instead */
export function BrandLockup() {
  return <BrandMark />;
}
