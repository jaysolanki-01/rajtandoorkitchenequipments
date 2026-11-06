import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TandoorModel } from './TandoorModel';
import { useTandoorAssets, type TandoorAssets } from './useTandoorAssets';
import { sceneState, storyBus } from '../animation/storyStore';
import { callouts, type LayoutMode } from '../animation/storyConfig';

/** Studio lighting baked into a small environment map once (frames=1): warm key panel, soft top, rim strip. */
function StudioEnvironment() {
  return (
    <Environment frames={1} resolution={256}>
      <color attach="background" args={['#050403']} />
      {/* Tall strip softboxes give brushed steel its vertical light/dark banding. */}
      <Lightformer form="rect" intensity={2.0} color="#ffe9d2" position={[-4.5, 2, 2.5]} scale={[0.9, 8, 1]} />
      <Lightformer form="rect" intensity={2.4} color="#f3f1ec" position={[-1.2, 2, 5]} scale={[0.6, 8, 1]} />
      <Lightformer form="rect" intensity={1.6} color="#e9ecef" position={[3.5, 2, 3.5]} scale={[0.5, 8, 1]} />
      <Lightformer form="rect" intensity={2.6} color="#ffd6a3" position={[5, 1.8, -2]} scale={[0.4, 8, 1]} />
      <Lightformer form="rect" intensity={0.9} color="#f4efe7" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[5, 2, 1]} />
      <Lightformer form="ring" intensity={0.6} color="#ff8f3a" position={[-2, 0.5, -6]} scale={3} />
    </Environment>
  );
}

const tmp = new THREE.Vector3();
const keyPos = new THREE.Vector3();

/** Reads the shared animation state every rendered frame and applies it to camera, lights, product & callouts. */
function StoryRig({ assets }: { assets: TandoorAssets }) {
  const { camera, gl, size, scene } = useThree();
  const product = useRef<THREE.Group>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const inner = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const s = sceneState;
    const cam = camera as THREE.PerspectiveCamera;
    const introPull = (1 - s.intro) * 1.6;

    cam.position.set(s.camX + introPull * 0.15, s.camY + introPull * 0.12, s.camZ + introPull);
    cam.lookAt(s.tgtX, s.tgtY, s.tgtZ);
    if (cam.fov !== s.fov) cam.fov = s.fov;
    // Shift the framing (product right of the copy on desktop, below it on phones) without changing perspective.
    cam.setViewOffset(size.width, size.height, -s.shiftX * size.width, -s.shiftY * size.height, size.width, size.height);
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();

    gl.toneMappingExposure = 0.25 + 0.8 * s.intro;
    scene.environmentRotation.y = s.envRot;

    if (product.current) {
      product.current.rotation.y = s.rotY;
      product.current.updateMatrixWorld();
    }

    if (key.current) {
      const r = 6;
      keyPos.set(Math.sin(s.keyAz) * r, 1 + s.keyEl * 5, Math.cos(s.keyAz) * r);
      key.current.position.copy(keyPos);
      key.current.intensity = 2.6 * s.key;
    }

    const glow = s.glow;
    if (inner.current) inner.current.intensity = glow * 3.2;
    assets.materials.ember.color.setScalar(glow * 0.85);
    assets.materials.opening.emissiveIntensity = glow * 0.35;

    // Pin DOM callouts to their 3D anchors.
    const w = size.width;
    const h = size.height;
    if (storyBus.calloutsEnabled && product.current) {
      for (const c of callouts) {
        const el = storyBus.calloutEls.get(c.id);
        if (!el) continue;
        tmp.set(c.anchor[0], c.anchor[1], c.anchor[2]).applyMatrix4(product.current.matrixWorld).project(cam);
        const x = (tmp.x * 0.5 + 0.5) * w;
        const y = (-tmp.y * 0.5 + 0.5) * h;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
    }

    // Warm atmospheric glow behind the product follows it on screen.
    if (storyBus.stageEl) {
      tmp.set(0, 1.1, 0).project(cam);
      storyBus.stageEl.style.setProperty('--glow-x', `${((tmp.x * 0.5 + 0.5) * 100).toFixed(2)}%`);
      storyBus.stageEl.style.setProperty('--glow-y', `${((-tmp.y * 0.5 + 0.5) * 100).toFixed(2)}%`);
    }
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#ffe9cf" />
      <directionalLight ref={key} color="#ffc995" intensity={2.6} position={[-5, 4, 3]} />
      <directionalLight color="#d6dde6" intensity={0.35} position={[4, 3, 6]} />
      <directionalLight color="#ffcf8f" intensity={1.3} position={[3, 4, -5]} />
      <pointLight ref={inner} color="#ff7f2e" intensity={0} distance={2.6} decay={2} position={[0, 0.95, 0]} />

      <group ref={product}>
        <TandoorModel assets={assets} />
      </group>
    </>
  );
}

function useRadialFade() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, '#fff');
    g.addColorStop(0.35, '#ddd');
    g.addColorStop(0.75, '#333');
    g.addColorStop(1, '#000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function Floor({ reflections }: { reflections: boolean }) {
  const fade = useRadialFade();
  return (
    <>
      {/* A finite floor disc that fades out radially, so there is never a hard horizon line. */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001}>
        <circleGeometry args={[7, 64]} />
        {reflections ? (
          <MeshReflectorMaterial
            blur={[400, 120]}
            resolution={512}
            mixBlur={1}
            mixStrength={4}
            mixContrast={1}
            roughness={0.9}
            depthScale={1.1}
            minDepthThreshold={0.35}
            maxDepthThreshold={1.3}
            color="#15110d"
            metalness={0.5}
            mirror={0}
            transparent
            alphaMap={fade}
            depthWrite={false}
          />
        ) : (
          <meshStandardMaterial
            color="#15110d"
            roughness={0.6}
            metalness={0.4}
            transparent
            alphaMap={fade}
            depthWrite={false}
          />
        )}
      </mesh>
      <ContactShadows
        position-y={0.002}
        opacity={0.75}
        scale={4.5}
        blur={2.6}
        far={1.6}
        resolution={512}
        frames={1}
        color="#000000"
      />
    </>
  );
}

function ReadySignal({ ready }: { ready: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    storyBus.invalidate = () => invalidate();
    return () => {
      storyBus.invalidate = () => {};
    };
  }, [invalidate]);
  useEffect(() => {
    if (!ready) return;
    invalidate();
    // Wait two frames so the first lit frame is on screen before the poster fades.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => storyBus.markReady());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [ready, invalidate]);
  return null;
}

function SceneContent({ mode }: { mode: LayoutMode }) {
  const assets = useTandoorAssets();
  const reflections = mode === 'desktop';
  return (
    <>
            <StudioEnvironment />
      <StoryRig assets={assets} />
      <Floor reflections={reflections} />
      <ReadySignal ready={assets.emblemReady} />
    </>
  );
}

export default function TandoorScene({ mode }: { mode: LayoutMode }) {
  const dpr: [number, number] = mode === 'stacked' ? [1, 1.5] : [1, 1.75];
  return (
    <Canvas
      className="stage__canvas"
      frameloop="demand"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 30, near: 0.1, far: 60, position: [1.7, 2.25, 9] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      aria-hidden="true"
    >
      <SceneContent mode={mode} />
    </Canvas>
  );
}

