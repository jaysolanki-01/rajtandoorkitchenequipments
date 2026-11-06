import * as THREE from 'three';
import { brand } from '../config/content';

/**
 * Procedural textures generated on a canvas at runtime — no network requests,
 * no large image downloads. Every texture created here must be disposed by the caller.
 */

function makeCanvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  return { c, ctx };
}

/** Seeded random so textures are identical on every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Brushed-steel roughness map: fine vertical grain (along the height of the cylinder),
 * matching the satin finish in the reference photo.
 */
export function createBrushedRoughness(): THREE.CanvasTexture {
  const w = 1024;
  const h = 64;
  const { c, ctx } = makeCanvas(w, h);
  const rand = rng(7);
  ctx.fillStyle = 'rgb(92,92,92)';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 2600; i++) {
    const x = rand() * w;
    const v = 60 + rand() * 80;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.25 + rand() * 0.4})`;
    ctx.fillRect(x, 0, rand() < 0.85 ? 1 : 2, h);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * Refractory clay colour map for the collar (lathe UV: u = around, v = along the profile).
 * Cream on the outer edge, darkening with soot toward the opening.
 */
export function createClayTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 256;
  const { c, ctx } = makeCanvas(w, h);
  const rand = rng(21);
  // v=0 (canvas bottom) = inner lip, v=1 (canvas top) = outer edge
  const g = ctx.createLinearGradient(0, h, 0, 0);
  g.addColorStop(0, '#3b2a1f');
  g.addColorStop(0.18, '#6d5440');
  g.addColorStop(0.36, '#bfa98c');
  g.addColorStop(0.55, '#dccdb4');
  g.addColorStop(1, '#e6dac6');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // speckle
  for (let i = 0; i < 9000; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const dark = rand() < 0.55;
    ctx.fillStyle = dark ? `rgba(90,70,50,${rand() * 0.22})` : `rgba(255,248,235,${rand() * 0.25})`;
    ctx.fillRect(x, y, 1 + rand() * 2, 1 + rand() * 2);
  }
  // irregular soot near the lip
  for (let i = 0; i < 160; i++) {
    const x = rand() * w;
    const y = h - rand() * h * 0.45;
    const r = 6 + rand() * 26;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(40,28,20,${0.18 + rand() * 0.2})`);
    rg.addColorStop(1, 'rgba(40,28,20,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Inside of the cooking chamber: charred clay, darker toward the bottom. */
export function createChamberTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const { c, ctx } = makeCanvas(w, h);
  const rand = rng(5);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#5a4130');
  g.addColorStop(0.25, '#3a281d');
  g.addColorStop(1, '#140d09');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${rand() * 0.3})`;
    ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 3);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Faint embers at the bottom of the chamber — subtle, no flames. */
export function createEmberTexture(): THREE.CanvasTexture {
  const s = 256;
  const { c, ctx } = makeCanvas(s, s);
  const rand = rng(11);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, s, s);
  const base = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  base.addColorStop(0, 'rgba(255,120,40,0.55)');
  base.addColorStop(0.6, 'rgba(160,50,10,0.25)');
  base.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 260; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * s * 0.42;
    const x = s / 2 + Math.cos(a) * d;
    const y = s / 2 + Math.sin(a) * d;
    const r = 2 + rand() * 7;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(255,${150 + rand() * 60},${60 + rand() * 40},${0.5 + rand() * 0.5})`);
    rg.addColorStop(1, 'rgba(120,30,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Draws the Raj Tandoor emblem — black disc, gold ring, "RT" monogram and the
 * brand lines — with real text (never generated lettering).
 * mode "color" draws the artwork; mode "metal" draws a metalness mask (gold = white).
 */
function drawEmblem(ctx: CanvasRenderingContext2D, s: number, mode: 'color' | 'metal') {
  const cx = s / 2;
  const cy = s / 2;
  const R = s * 0.48;
  const gold = (y0: number, y1: number) => {
    if (mode === 'metal') return '#ffffff';
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, '#f0c66a');
    g.addColorStop(0.5, '#d9a441');
    g.addColorStop(1, '#a77a30');
    return g;
  };
  ctx.clearRect(0, 0, s, s);
  // black disc
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = mode === 'metal' ? '#000000' : '#0b0a09';
  ctx.fill();
  // gold ring
  ctx.lineWidth = s * 0.022;
  ctx.strokeStyle = gold(cy - R, cy + R);
  ctx.beginPath();
  ctx.arc(cx, cy, R - s * 0.03, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  // RT monogram
  ctx.fillStyle = gold(s * 0.18, s * 0.5);
  ctx.font = `600 ${s * 0.3}px Montserrat, "Segoe UI", Arial, sans-serif`;
  drawTracked(ctx, brand.monogram, cx, s * 0.47, -s * 0.012);
  // RAJ TANDOOR
  ctx.fillStyle = gold(s * 0.53, s * 0.63);
  ctx.font = `700 ${s * 0.088}px Montserrat, "Segoe UI", Arial, sans-serif`;
  fitText(ctx, brand.logoLine1, s * 0.8);
  drawTracked(ctx, brand.logoLine1, cx, s * 0.62, s * 0.004);
  // AND KITCHEN EQUIPMENT
  ctx.fillStyle = mode === 'metal' ? '#666666' : '#e8dcc2';
  ctx.font = `600 ${s * 0.04}px Montserrat, "Segoe UI", Arial, sans-serif`;
  drawTracked(ctx, brand.logoLine2, cx, s * 0.7, s * 0.004);
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const m = ctx.measureText(text).width;
  if (m > maxW) {
    const size = parseFloat(/(\d+(\.\d+)?)px/.exec(ctx.font)?.[1] ?? '40');
    ctx.font = ctx.font.replace(/\d+(\.\d+)?px/, `${(size * maxW) / m}px`);
  }
}

function drawTracked(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, tracking: number) {
  const chars = [...text];
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
  let x = cx - total / 2;
  ctx.textAlign = 'left';
  chars.forEach((ch, i) => {
    ctx.fillText(ch, x, y);
    x += widths[i] + tracking;
  });
  ctx.textAlign = 'center';
}

export interface EmblemTextures {
  map: THREE.Texture;
  metalnessMap: THREE.Texture | null;
}

export async function createEmblemTextures(): Promise<EmblemTextures> {
  if (brand.emblemTextureUrl) {
    const map = await new THREE.TextureLoader().loadAsync(brand.emblemTextureUrl);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    return { map, metalnessMap: null };
  }
  try {
    await Promise.all([
      document.fonts.load('600 100px Montserrat'),
      document.fonts.load('700 100px Montserrat'),
    ]);
  } catch {
    /* system font fallback is acceptable */
  }
  const s = 1024;
  const color = makeCanvas(s, s);
  drawEmblem(color.ctx, s, 'color');
  const metal = makeCanvas(s, s);
  drawEmblem(metal.ctx, s, 'metal');
  const map = new THREE.CanvasTexture(color.c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const metalnessMap = new THREE.CanvasTexture(metal.c);
  metalnessMap.colorSpace = THREE.NoColorSpace;
  return { map, metalnessMap };
}
