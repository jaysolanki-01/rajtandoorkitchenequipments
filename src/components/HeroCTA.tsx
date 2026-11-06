import type { ChapterContent } from '../config/content';

export function HeroCTA({ ctas }: { ctas: NonNullable<ChapterContent['ctas']> }) {
  return (
    <div className="cta-row">
      {ctas.map((cta) => (
        <a key={cta.label} className={`btn btn--${cta.variant} btn--lg`} href={cta.href}>
          {cta.label}
          {cta.variant === 'primary' && (
            <svg className="btn__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}
