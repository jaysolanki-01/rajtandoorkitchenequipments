import type { CalloutId } from '../config/content';
import { shotsByMode } from './storyConfig';

/**
 * Mutable animation state shared between the GSAP timeline (writer) and the
 * three.js render loop (reader). It is deliberately NOT React state: GSAP tweens
 * these numbers directly and the canvas re-renders on demand, so React never
 * re-renders on scroll.
 */
const start = shotsByMode.desktop.reveal0;

export const sceneState = {
  camX: start.pos[0],
  camY: start.pos[1],
  camZ: start.pos[2],
  tgtX: start.target[0],
  tgtY: start.target[1],
  tgtZ: start.target[2],
  rotY: start.rotY,
  shiftX: start.shiftX,
  shiftY: start.shiftY,
  fov: start.fov,
  lidY: 0,
  lidTilt: 0,
  lidZ: 0,
  /** Warm glow inside the cooking chamber, 0–1. */
  glow: 0,
  /** Key light strength multiplier. */
  key: 1,
  /** Key light azimuth (radians around the product) and elevation (0–1). */
  keyAz: -1.0,
  keyEl: 0.55,
  /** Environment rotation — moves reflections across the steel. */
  envRot: -0.35,
  /** Load-in reveal, 0–1 (time based, not scroll based). */
  intro: 0,
};

export type SceneState = typeof sceneState;

type Listener = () => void;

/** Small registry so the DOM layer and the canvas can find each other without React re-renders. */
export const storyBus = {
  /** Set by the canvas: request a new frame (frameloop = "demand"). */
  invalidate: (() => {}) as () => void,
  /** Callout DOM nodes, positioned every rendered frame from projected 3D anchors. */
  calloutEls: new Map<CalloutId, HTMLElement>(),
  /** Stage element receives CSS variables for the product glow position. */
  stageEl: null as HTMLElement | null,
  /** Whether 3D-anchored callouts are active for the current layout. */
  calloutsEnabled: false,
  sceneReady: false,
  readyListeners: new Set<Listener>(),
  markReady() {
    this.sceneReady = true;
    this.readyListeners.forEach((l) => l());
  },
};
