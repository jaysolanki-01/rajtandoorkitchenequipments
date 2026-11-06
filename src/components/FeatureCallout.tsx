import { useCallback } from 'react';
import type { CalloutConfig } from '../animation/storyConfig';
import { storyBus } from '../animation/storyStore';

/**
 * A label pinned to a 3D point on the product. The outer element is moved every
 * rendered frame by the scene (projected anchor); the inner element is faded by the timeline.
 */
export function FeatureCallout({
  config,
  label,
  index,
  compact = false,
}: {
  config: CalloutConfig;
  label: string;
  index?: string;
  /** Shorter connector lines for tablet widths. */
  compact?: boolean;
}) {
  const register = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) storyBus.calloutEls.set(config.id, el);
      else storyBus.calloutEls.delete(config.id);
    },
    [config.id],
  );

  const lineDx = compact ? 48 : 96;
  const dy = compact ? config.dy * 0.75 : config.dy;
  const dx = config.side === 'right' ? lineDx : -lineDx;
  const len = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <div ref={register} className={`callout callout--${config.side}`}>
      <div className="callout__inner">
        <span className="callout__dot" />
        <span className="callout__line-wrap" style={{ width: `${len}px`, transform: `rotate(${angle}deg)` }}>
          <span className="callout__line" />
        </span>
        <span
          className="callout__label"
          style={{ transform: `translate(${dx}px, ${dy}px) translate(${config.side === 'right' ? '8px' : 'calc(-100% - 8px)'}, -50%)` }}
        >
          {index && <span className="callout__index">{index}</span>}
          {label}
        </span>
      </div>
    </div>
  );
}
