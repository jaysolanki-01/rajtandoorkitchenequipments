import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { DIM } from './dimensions';
import type { TandoorAssets } from './useTandoorAssets';
import { sceneState } from '../animation/storyStore';

/**
 * Procedural approximation of the Raj Tandoor, built from separate parts
 * (body, rim, clay collar, chamber, lid, handles, firebox, feet, emblem) so the
 * lid can move independently. It follows the reference photo's proportions but
 * is not an engineering replica.
 */
export function TandoorModel({ assets }: { assets: TandoorAssets }) {
  const { geometries: g, materials: m } = assets;
  const lid = useRef<Group>(null);
  const R = DIM.radius;
  const TOP = DIM.top;
  const lidBaseY = TOP + DIM.clayRise + 0.003;

  useFrame(() => {
    const l = lid.current;
    if (!l) return;
    l.position.set(0, lidBaseY + sceneState.lidY, sceneState.lidZ);
    l.rotation.x = sceneState.lidTilt;
  });

  const feetAngles = [45, 135, 225, 315].map((d) => (d * Math.PI) / 180);
  const rivets: [number, number][] = [
    [-0.245, 0.425],
    [0.245, 0.425],
    [-0.245, 0.05],
    [0.245, 0.05],
  ];

  return (
    <group>
      {/* Body */}
      <mesh geometry={g.body} material={m.steel} position-y={DIM.feet + DIM.bodyHeight / 2} />
      <mesh geometry={g.bottom} material={m.darkSteel} position-y={DIM.feet} rotation-x={Math.PI / 2} />
      <mesh geometry={g.band} material={m.steelBand} position-y={TOP - 0.0375} />
      <mesh geometry={g.bandCap} material={m.steelBand} position-y={TOP + 0.0005} rotation-x={-Math.PI / 2} />
      <mesh geometry={g.bandCap} material={m.steelBand} position-y={TOP - 0.075} rotation-x={Math.PI / 2} />
      <mesh geometry={g.bandBottom} material={m.steelBand} position-y={DIM.feet + 0.03} />
      <mesh geometry={g.bandCap} material={m.steelBand} position-y={DIM.feet + 0.06} rotation-x={-Math.PI / 2} />

      {/* Clay collar & cooking chamber */}
      <mesh geometry={g.clay} material={m.clay} />
      <mesh geometry={g.chamber} material={m.chamber} />
      <mesh geometry={g.ember} material={m.ember} position-y={0.21} rotation-x={-Math.PI / 2} />

      {/* Emblem */}
      <mesh geometry={g.emblem} material={m.emblem} position-y={DIM.emblemY} />

      {/* Side carrying handles */}
      {[1, -1].map((side) => (
        <group key={side} position-y={DIM.sideHandleY} scale-x={side}>
          <mesh geometry={g.sideHandle} material={m.polished} />
          <mesh geometry={g.sidePlate} material={m.steelBand} position={[R + 0.004, 0.09, 0]} />
          <mesh geometry={g.sidePlate} material={m.steelBand} position={[R + 0.004, -0.09, 0]} />
        </group>
      ))}

      {/* Front firebox */}
      <group position-y={DIM.feet + 0.235}>
        <mesh geometry={g.fireFrame} material={m.steelBand} />
        <mesh geometry={g.fireDoor} material={m.darkSteel} position-y={-0.01} />
        <mesh geometry={g.fireOpening} material={m.opening} position-y={-0.095} />
        <mesh
          geometry={g.hinge}
          material={m.polished}
          position={[Math.sin(0.218 / R) * (R + 0.01), -0.01, Math.cos(0.218 / R) * (R + 0.01)]}
        />
      </group>
      {rivets.map(([x, y]) => {
        const a = x / (R + 0.006);
        return (
          <mesh
            key={`${x}-${y}`}
            geometry={g.rivet}
            material={m.polished}
            position={[Math.sin(a) * (R + 0.006), DIM.feet + y, Math.cos(a) * (R + 0.006)]}
          />
        );
      })}

      {/* Supporting feet */}
      {feetAngles.map((a) => (
        <group key={a} rotation-y={a}>
          <mesh geometry={g.footUpright} material={m.steelBand} position={[0, 0.0425, R - 0.03]} />
          <mesh geometry={g.footPad} material={m.steelBand} position={[0, 0.005, R - 0.01]} />
        </group>
      ))}

      {/* Removable lid — animated separately */}
      <group ref={lid} position-y={lidBaseY}>
        <mesh geometry={g.lid} material={m.steel} />
        <mesh geometry={g.lidHandle} material={m.polished} />
        <mesh geometry={g.lidPlate} material={m.steelBand} position={[-0.15, 0.045, 0]} />
        <mesh geometry={g.lidPlate} material={m.steelBand} position={[0.15, 0.045, 0]} />
      </group>
    </group>
  );
}
