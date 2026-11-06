import type { CalloutId } from '../config/content';
import { DIM } from '../three/dimensions';

/**
 * Scroll story configuration.
 * The whole story is one GSAP timeline with a duration of 100 units, so every
 * number below reads as "percent of hero scroll progress".
 */

export type LayoutMode = 'desktop' | 'tablet' | 'stacked';
export type Vec3 = [number, number, number];

export interface CameraKey {
  pos: Vec3;
  target: Vec3;
  /** Product rotation around its vertical axis (radians). */
  rotY: number;
  /** Shift the rendered frame horizontally/vertically, as a fraction of the viewport (+x right, +y down). */
  shiftX: number;
  shiftY: number;
  fov: number;
}

export type ShotName = 'reveal0' | 'reveal1' | 'craft' | 'chamber' | 'details' | 'complete';

const desktopShots: Record<ShotName, CameraKey> = {
  reveal0: { pos: [1.5, 3.3, 7.7], target: [0, 1.0, 0], rotY: 0.08, shiftX: 0.18, shiftY: 0.1, fov: 30 },
  reveal1: { pos: [1.3, 3.1, 6.4], target: [0, 1.0, 0], rotY: 0.02, shiftX: 0.18, shiftY: 0.1, fov: 30 },
  craft: { pos: [1.6, 2.6, 5.6], target: [0, 1.25, 0], rotY: -0.32, shiftX: 0.15, shiftY: 0.08, fov: 30 },
  chamber: { pos: [0.6, 4.25, 3.5], target: [0, 1.85, 0], rotY: -0.12, shiftX: 0.15, shiftY: 0.12, fov: 30 },
  details: { pos: [2.0, 1.05, 4.9], target: [0, 0.85, 0], rotY: 0.18, shiftX: 0.1, shiftY: 0.06, fov: 30 },
  complete: { pos: [1.25, 3.0, 6.5], target: [0, 1.0, 0], rotY: 0.04, shiftX: 0.2, shiftY: 0.1, fov: 30 },
};

/** Tablet landscape: same story, gentler moves and a little more breathing room. */
const tabletShots: Record<ShotName, CameraKey> = {
  reveal0: { ...desktopShots.reveal0, pos: [1.6, 3.3, 9.6] },
  reveal1: { ...desktopShots.reveal1, pos: [1.5, 3.1, 8.4] },
  craft: { ...desktopShots.craft, pos: [1.6, 2.7, 7.2], rotY: -0.25, shiftX: 0.03 },
  chamber: { ...desktopShots.chamber, pos: [0.6, 4.6, 4.2] },
  details: { ...desktopShots.details, pos: [2.1, 1.3, 6.6], target: [0, 0.9, 0], shiftX: 0.12 },
  complete: { ...desktopShots.complete, pos: [1.45, 3.0, 8.2] },
};

/** Phones & portrait tablets: text on top, product below, reduced camera travel. */
const stackedShots: Record<ShotName, CameraKey> = {
  reveal0: { pos: [1.4, 3.9, 12.6], target: [0, 1.0, 0], rotY: 0.06, shiftX: 0, shiftY: 0.2, fov: 30 },
  reveal1: { pos: [1.2, 3.6, 11.4], target: [0, 1.0, 0], rotY: 0.02, shiftX: 0, shiftY: 0.2, fov: 30 },
  craft: { pos: [1.4, 3.2, 9.8], target: [0, 1.1, 0], rotY: -0.25, shiftX: 0, shiftY: 0.21, fov: 30 },
  chamber: { pos: [0.5, 5.8, 7.4], target: [0, 1.6, 0], rotY: -0.1, shiftX: 0, shiftY: 0.2, fov: 30 },
  details: { pos: [1.6, 1.7, 9.6], target: [0, 0.85, 0], rotY: 0.15, shiftX: 0, shiftY: 0.2, fov: 30 },
  complete: { pos: [1.2, 3.5, 11.4], target: [0, 1.0, 0], rotY: 0.03, shiftX: 0, shiftY: 0.22, fov: 30 },
};

export const shotsByMode: Record<LayoutMode, Record<ShotName, CameraKey>> = {
  desktop: desktopShots,
  tablet: tabletShots,
  stacked: stackedShots,
};

/** Where each shot is reached on the 0–100 timeline: [startMoving, arrive]. */
export const shotSchedule: { shot: ShotName; from: number; to: number }[] = [
  { shot: 'reveal1', from: 0, to: 14 },
  { shot: 'craft', from: 16, to: 26 },
  { shot: 'chamber', from: 38, to: 48 },
  { shot: 'details', from: 61, to: 70 },
  { shot: 'complete', from: 80, to: 90 },
];

/** Chapter copy visibility windows (percent). The first chapter is visible at load. */
export const chapterWindows: { in: number; out: number | null }[] = [
  { in: 0, out: 12 },
  { in: 19, out: 35 },
  { in: 42, out: 58 },
  { in: 65, out: 78 },
  { in: 85, out: null },
];

/** Chapter start positions used by the progress navigation (percent). */
export const chapterAnchors = [0, 24, 50, 71, 94];

/** Lid, glow and light timing (percent). */
export const lidSchedule = {
  liftFrom: 43,
  liftTo: 52,
  lowerFrom: 57,
  lowerTo: 64,
  /** How far the lid lifts and how much it tilts back. */
  lift: 0.4,
  tilt: -0.32,
  backOffset: -0.34,
};

export interface CalloutConfig {
  id: CalloutId;
  chapter: number;
  /** Anchor point on the model, in model space (rotates with the product). */
  anchor: Vec3;
  /** Which side of the anchor the label sits on. */
  side: 'left' | 'right';
  /** Vertical label offset in px, to keep labels from stacking. */
  dy: number;
  /** Percent when it appears and disappears. */
  in: number;
  out: number;
}

const R = DIM.radius;
const deg = (d: number) => (d * Math.PI) / 180;

export const callouts: CalloutConfig[] = [
  {
    id: 'steel',
    chapter: 1,
    anchor: [R * Math.sin(deg(40)), 0.72, R * Math.cos(deg(40))],
    side: 'right',
    dy: 40,
    in: 23,
    out: 35,
  },
  {
    id: 'clay',
    chapter: 1,
    anchor: [0.58 * Math.sin(deg(25)), DIM.top + DIM.clayRise, 0.58 * Math.cos(deg(25))],
    side: 'right',
    dy: -46,
    in: 26.5,
    out: 35,
  },
  {
    id: 'design',
    chapter: 1,
    anchor: [R + 0.11, DIM.sideHandleY, 0],
    side: 'right',
    dy: 0,
    in: 30,
    out: 35,
  },
  {
    id: 'firebox',
    chapter: 3,
    anchor: [0, 0.26, R + 0.01],
    side: 'right',
    dy: 34,
    in: 68,
    out: 78,
  },
  {
    id: 'body',
    chapter: 3,
    anchor: [R * Math.sin(deg(38)), 0.95, R * Math.cos(deg(38))],
    side: 'right',
    dy: -20,
    in: 70,
    out: 78,
  },
  {
    id: 'handles',
    chapter: 3,
    anchor: [R + 0.11, DIM.sideHandleY - 0.08, 0],
    side: 'right',
    dy: -52,
    in: 72,
    out: 78,
  },
  {
    id: 'base',
    chapter: 3,
    anchor: [0.62 * Math.sin(deg(45)), 0.04, 0.62 * Math.cos(deg(45))],
    side: 'right',
    dy: 46,
    in: 74,
    out: 78,
  },
];
