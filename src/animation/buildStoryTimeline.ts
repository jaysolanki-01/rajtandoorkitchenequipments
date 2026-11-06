import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  callouts,
  chapterAnchors,
  chapterWindows,
  lidSchedule,
  shotSchedule,
  shotsByMode,
  type CameraKey,
  type LayoutMode,
} from './storyConfig';
import { sceneState, storyBus } from './storyStore';

gsap.registerPlugin(ScrollTrigger);

const flat = (k: CameraKey) => ({
  camX: k.pos[0],
  camY: k.pos[1],
  camZ: k.pos[2],
  tgtX: k.target[0],
  tgtY: k.target[1],
  tgtZ: k.target[2],
  rotY: k.rotY,
  shiftX: k.shiftX,
  shiftY: k.shiftY,
  fov: k.fov,
});

/** Put the scene in the final, resting composition (used for reduced motion). */
export function applyRestingComposition(mode: LayoutMode) {
  Object.assign(sceneState, flat(shotsByMode[mode].complete), {
    lidY: 0,
    lidTilt: 0,
    lidZ: 0,
    glow: 0,
    key: 1,
    keyAz: -1.0,
    keyEl: 0.55,
    envRot: -0.1,
  });
  storyBus.invalidate();
}

interface BuildOptions {
  section: HTMLElement;
  mode: LayoutMode;
  chapterEls: HTMLElement[];
  /** Image layer animated instead of the 3D camera when WebGL is unavailable. */
  fallbackImg: HTMLElement | null;
  progressEl: HTMLElement | null;
  onChapterChange: (index: number) => void;
}

/**
 * One scrubbed GSAP timeline (duration 100 = 100% of the hero's scroll distance)
 * drives the camera, product, lid, light and every overlay, so scrolling backwards
 * reverses everything in sync.
 */
export function buildStoryTimeline(o: BuildOptions) {
  const shots = shotsByMode[o.mode];
  const useCallouts = o.mode !== 'stacked' && !o.fallbackImg;
  storyBus.calloutsEnabled = useCallouts;

  Object.assign(sceneState, flat(shots.reveal0), {
    lidY: 0,
    lidTilt: 0,
    lidZ: 0,
    glow: 0,
    key: 1,
    keyAz: -1.0,
    keyEl: 0.55,
    envRot: -0.35,
  });

  let activeChapter = -1;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onUpdate: () => storyBus.invalidate(),
    scrollTrigger: {
      trigger: o.section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.9,
      invalidateOnRefresh: false,
      onUpdate: (self) => {
        if (o.progressEl) o.progressEl.style.transform = `scaleY(${self.progress.toFixed(4)})`;
        const p = self.progress * 100;
        let idx = 0;
        chapterAnchors.forEach((a, i) => {
          if (p >= a - 6) idx = i;
        });
        if (idx !== activeChapter) {
          activeChapter = idx;
          o.onChapterChange(idx);
        }
      },
    },
  });

  // ── Camera & product path ───────────────────────────────────────────
  for (const step of shotSchedule) {
    tl.to(sceneState, { ...flat(shots[step.shot]), duration: step.to - step.from, ease: 'power2.inOut' }, step.from);
  }
  tl.set({}, {}, 100); // pin the timeline length to exactly 100

  // ── Light: highlights travel across the steel ───────────────────────
  tl.to(sceneState, { envRot: 0.15, keyAz: -0.75, duration: 18, ease: 'sine.inOut' }, 0)
    .to(sceneState, { envRot: 0.55, keyAz: -1.25, keyEl: 0.45, duration: 14, ease: 'sine.inOut' }, 18)
    .to(sceneState, { key: 0.7, keyEl: 0.85, envRot: 0.3, duration: 10, ease: 'sine.inOut' }, 40)
    .to(sceneState, { key: 1.2, keyAz: -1.45, keyEl: 0.12, envRot: -0.2, duration: 10, ease: 'sine.inOut' }, 61)
    .to(sceneState, { key: 1.05, keyAz: -0.9, keyEl: 0.55, envRot: 0.05, duration: 12, ease: 'sine.inOut' }, 80);

  // ── Lid lift & chamber glow ─────────────────────────────────────────
  const L = lidSchedule;
  tl.to(
    sceneState,
    { lidY: L.lift, lidTilt: L.tilt, lidZ: L.backOffset, duration: L.liftTo - L.liftFrom, ease: 'power2.inOut' },
    L.liftFrom,
  )
    .to(sceneState, { glow: 1, duration: 9, ease: 'sine.inOut' }, L.liftFrom + 2)
    .to(sceneState, { lidY: 0, lidTilt: 0, lidZ: 0, duration: L.lowerTo - L.lowerFrom, ease: 'power2.inOut' }, L.lowerFrom)
    .to(sceneState, { glow: 0, duration: 7, ease: 'sine.inOut' }, L.lowerFrom + 1);

  // ── Chapter copy ────────────────────────────────────────────────────
  o.chapterEls.forEach((el, i) => {
    const win = chapterWindows[i];
    if (!win) return;
    if (i === 0) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
    } else {
      tl.fromTo(el, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 4, ease: 'power2.out' }, win.in);
    }
    if (win.out !== null) {
      tl.to(el, { autoAlpha: 0, y: -28, duration: 3.5, ease: 'power2.in' }, win.out);
    }
  });

  // ── 3D-anchored callouts ────────────────────────────────────────────
  if (useCallouts) {
    for (const c of callouts) {
      const el = storyBus.calloutEls.get(c.id);
      const inner = el?.firstElementChild as HTMLElement | null;
      if (!inner) continue;
      tl.fromTo(inner, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.5 }, c.in);
      const line = inner.querySelector<HTMLElement>('.callout__line');
      if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 2.5, ease: 'power2.out' }, c.in);
      tl.to(inner, { autoAlpha: 0, duration: 2.5 }, c.out);
    }
  }

  // ── Image-based fallback (no WebGL) ─────────────────────────────────
  if (o.fallbackImg) {
    const img = o.fallbackImg;
    tl.fromTo(img, { scale: 1, yPercent: 0 }, { scale: 1.04, duration: 14 }, 0)
      .to(img, { scale: 1.35, yPercent: 14, duration: 10, ease: 'power2.inOut' }, 16)
      .to(img, { scale: 1.7, yPercent: 34, duration: 10, ease: 'power2.inOut' }, 38)
      .to(img, { scale: 1.45, yPercent: -20, duration: 9, ease: 'power2.inOut' }, 61)
      .to(img, { scale: 1, yPercent: 0, duration: 10, ease: 'power2.inOut' }, 80);
  }

  storyBus.invalidate();
  return tl;
}

export { ScrollTrigger, gsap };
