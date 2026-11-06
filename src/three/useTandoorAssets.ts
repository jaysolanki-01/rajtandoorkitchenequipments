import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { DIM } from './dimensions';
import {
  createBrushedRoughness,
  createChamberTexture,
  createClayTexture,
  createEmberTexture,
  createEmblemTextures,
  type EmblemTextures,
} from './textures';

/**
 * Builds every geometry, material and texture of the procedural tandoor once.
 * They are shared by the product and its floor reflection, and disposed on unmount.
 */

const v2 = (x: number, y: number) => new THREE.Vector2(x, y);

/** A polyline with rounded corners as a smooth 3D curve (used for handles). */
function roundedPath(points: THREE.Vector3[], radius: number) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  let prev = points[0].clone();
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const inDir = p.clone().sub(points[i - 1]).normalize();
    const outDir = points[i + 1].clone().sub(p).normalize();
    const a = p.clone().addScaledVector(inDir, -radius);
    const b = p.clone().addScaledVector(outDir, radius);
    path.add(new THREE.LineCurve3(prev, a));
    path.add(new THREE.QuadraticBezierCurve3(a, p.clone(), b));
    prev = b;
  }
  path.add(new THREE.LineCurve3(prev, points[points.length - 1].clone()));
  return path;
}

/** A curved rectangular panel that sits on the cylinder surface, centred on the front (+z). */
function frontPanel(radius: number, width: number, height: number, segments = 32) {
  const len = width / radius;
  return new THREE.CylinderGeometry(radius, radius, height, segments, 1, true, -len / 2, len);
}

export function useTandoorAssets() {
  const [emblem, setEmblem] = useState<EmblemTextures | null>(null);

  const assets = useMemo(() => {
    const { radius: R, top: TOP } = DIM;
    const textures = {
      brushed: createBrushedRoughness(),
      clay: createClayTexture(),
      chamber: createChamberTexture(),
      ember: createEmberTexture(),
    };
    textures.brushed.repeat.set(3, 1);

    const materials = {
      steel: new THREE.MeshPhysicalMaterial({
        color: '#d9dadb',
        metalness: 1,
        roughness: 0.78,
        roughnessMap: textures.brushed,
        anisotropy: 0.55,
        anisotropyRotation: Math.PI / 2,
        envMapIntensity: 1,
      }),
      steelBand: new THREE.MeshPhysicalMaterial({
        color: '#dcdddf',
        metalness: 1,
        roughness: 0.62,
        roughnessMap: textures.brushed,
        envMapIntensity: 1.1,
      }),
      polished: new THREE.MeshStandardMaterial({ color: '#e2e3e4', metalness: 1, roughness: 0.16 }),
      darkSteel: new THREE.MeshStandardMaterial({ color: '#33302d', metalness: 0.85, roughness: 0.42 }),
      opening: new THREE.MeshStandardMaterial({
        color: '#060504',
        roughness: 1,
        metalness: 0,
        emissive: new THREE.Color('#ff6a1a'),
        emissiveIntensity: 0,
      }),
      clay: new THREE.MeshStandardMaterial({
        map: textures.clay,
        roughness: 0.96,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
      chamber: new THREE.MeshStandardMaterial({
        map: textures.chamber,
        roughness: 1,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
      ember: new THREE.MeshBasicMaterial({
        map: textures.ember,
        color: new THREE.Color(0, 0, 0),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      emblem: new THREE.MeshStandardMaterial({
        transparent: true,
        alphaTest: 0.5,
        metalness: 0.75,
        roughness: 0.38,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.16,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        visible: false,
      }),
    };

    const handleR = 0.0125;
    const geometries = {
      body: new THREE.CylinderGeometry(R, R, DIM.bodyHeight, 160, 1, true),
      bottom: new THREE.CircleGeometry(R, 96),
      band: new THREE.CylinderGeometry(R + 0.012, R + 0.012, 0.075, 160, 1, true),
      bandCap: new THREE.RingGeometry(R - 0.002, R + 0.012, 160),
      bandBottom: new THREE.CylinderGeometry(R + 0.01, R + 0.01, 0.06, 160, 1, true),
      clay: new THREE.LatheGeometry(
        [
          v2(0.452, TOP - 0.16),
          v2(0.449, TOP - 0.06),
          v2(0.452, TOP - 0.006),
          v2(0.462, TOP + 0.013),
          v2(0.482, TOP + 0.021),
          v2(0.56, TOP + DIM.clayRise + 0.002),
          v2(0.66, TOP + DIM.clayRise),
          v2(0.692, TOP + 0.014),
          v2(0.7, TOP + 0.002),
          v2(0.7, TOP - 0.01),
        ],
        160,
      ),
      chamber: new THREE.LatheGeometry(
        [
          v2(0.452, TOP - 0.16),
          v2(0.48, TOP - 0.36),
          v2(0.54, TOP - 0.72),
          v2(0.585, 0.85),
          v2(0.58, 0.45),
          v2(0.52, 0.26),
          v2(0.4, 0.2),
          v2(0.001, 0.2),
        ],
        96,
      ),
      ember: new THREE.CircleGeometry(0.44, 48),
      lid: new THREE.LatheGeometry(
        [
          v2(0.001, 0.05),
          v2(0.2, 0.048),
          v2(0.4, 0.04),
          v2(0.5, 0.029),
          v2(0.532, 0.02),
          v2(0.545, 0.009),
          v2(0.545, 0.0),
          v2(0.53, -0.004),
          v2(0.3, 0.004),
          v2(0.001, 0.01),
        ],
        128,
      ),
      lidHandle: new THREE.TubeGeometry(
        roundedPath(
          [
            new THREE.Vector3(-0.15, 0.04, 0),
            new THREE.Vector3(-0.15, 0.17, 0),
            new THREE.Vector3(0.15, 0.17, 0),
            new THREE.Vector3(0.15, 0.04, 0),
          ],
          0.035,
        ),
        64,
        handleR,
        12,
        false,
      ),
      lidPlate: new THREE.BoxGeometry(0.06, 0.01, 0.04),
      sideHandle: new THREE.TubeGeometry(
        roundedPath(
          [
            new THREE.Vector3(R - 0.004, 0.09, 0),
            new THREE.Vector3(R + 0.115, 0.09, 0),
            new THREE.Vector3(R + 0.13, -0.09, 0),
            new THREE.Vector3(R - 0.004, -0.09, 0),
          ],
          0.025,
        ),
        64,
        handleR,
        12,
        false,
      ),
      sidePlate: new THREE.BoxGeometry(0.012, 0.055, 0.075),
      fireFrame: frontPanel(R + 0.004, 0.54, 0.42),
      fireDoor: frontPanel(R + 0.008, 0.43, 0.33),
      fireOpening: frontPanel(R + 0.011, 0.2, 0.15, 12),
      rivet: new THREE.SphereGeometry(0.011, 12, 8),
      hinge: new THREE.CylinderGeometry(0.012, 0.012, 0.24, 12),
      footUpright: new THREE.BoxGeometry(0.1, 0.085, 0.014),
      footPad: new THREE.BoxGeometry(0.1, 0.01, 0.07),
      emblem: frontPanel(R + 0.0025, DIM.emblemSize, DIM.emblemSize, 64),
    };

    return { textures, materials, geometries };
  }, []);

  // Emblem needs fonts (or an image) — load it asynchronously, then attach.
  useEffect(() => {
    let cancelled = false;
    let loaded: EmblemTextures | null = null;
    createEmblemTextures()
      .then((t) => {
        if (cancelled) {
          t.map.dispose();
          t.metalnessMap?.dispose();
          return;
        }
        loaded = t;
        const m = assets.materials.emblem;
        m.map = t.map;
        m.emissiveMap = t.map;
        m.metalnessMap = t.metalnessMap;
        if (!t.metalnessMap) m.metalness = 0.2;
        m.visible = true;
        m.needsUpdate = true;
        setEmblem(t);
      })
      .catch(() => {
        /* Product still renders without the emblem. */
        setEmblem({ map: new THREE.Texture(), metalnessMap: null });
      });
    return () => {
      cancelled = true;
      loaded?.map.dispose();
      loaded?.metalnessMap?.dispose();
    };
  }, [assets]);

  // Release GPU resources on unmount.
  useEffect(
    () => () => {
      Object.values(assets.geometries).forEach((g) => g.dispose());
      Object.values(assets.materials).forEach((m) => m.dispose());
      Object.values(assets.textures).forEach((t) => t.dispose());
    },
    [assets],
  );

  return { ...assets, emblemReady: emblem !== null };
}

export type TandoorAssets = ReturnType<typeof useTandoorAssets>;
