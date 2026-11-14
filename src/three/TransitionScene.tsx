import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { TandoorModel } from './TandoorModel';
import { useTandoorAssets } from './useTandoorAssets';
import { tAnim } from './tAnim';

function TransitionEnvironment() {
  return (
    <Environment frames={1} resolution={128}>
      <color attach="background" args={['#050302']} />
      <Lightformer form="rect" intensity={2.2} color="#ffe9d2" position={[-4.5, 2, 2.5]} scale={[0.9, 8, 1]} />
      <Lightformer form="rect" intensity={2.6} color="#f3f1ec" position={[-1.2, 2, 5]}   scale={[0.6, 8, 1]} />
      <Lightformer form="rect" intensity={1.8} color="#e9ecef" position={[3.5, 2, 3.5]}  scale={[0.5, 8, 1]} />
      <Lightformer form="rect" intensity={2.8} color="#ffd6a3" position={[5, 1.8, -2]}   scale={[0.4, 8, 1]} />
      <Lightformer form="rect" intensity={1.0} color="#f4efe7" position={[0, 6, 0]}      rotation-x={Math.PI / 2} scale={[5, 2, 1]} />
    </Environment>
  );
}

function TransitionModelRig({ activeRef }: { activeRef: React.MutableRefObject<boolean> }) {
  const { camera, invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const assets = useTandoorAssets();

  useEffect(() => {
    const tick = () => { if (activeRef.current) invalidate(); };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [invalidate, activeRef]);

  useFrame(() => {
    if (!activeRef.current) return;
    const g = groupRef.current;
    if (g) {
      g.position.x = tAnim.posX;
      g.rotation.y = tAnim.rotY;
    }
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.z = tAnim.cameraZ;
    cam.updateProjectionMatrix();
  });

  return (
    <>
      <group ref={groupRef} position={[5, 0, 0]} scale={[0.78, 0.78, 0.78]}>
        <TandoorModel assets={assets} />
      </group>
      <ContactShadows
        position={[0, -0.001, 0]}
        opacity={0.55}
        scale={4}
        blur={1.8}
        far={1.6}
        color="#0a0804"
        frames={1}
      />
    </>
  );
}

interface TransitionSceneProps {
  activeRef: React.MutableRefObject<boolean>;
}

export function TransitionScene({ activeRef }: TransitionSceneProps) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 1.6, 4.5], fov: 45, near: 0.1, far: 50 }}
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <TransitionEnvironment />
      <ambientLight intensity={0.1} color="#ffe8cc" />
      <directionalLight color="#ffc995" intensity={2.4} position={[-5, 4, 3]} />
      <directionalLight color="#d6dde6" intensity={0.4} position={[4, 3, 6]} />
      <directionalLight color="#ffcf8f" intensity={1.2} position={[3, 4, -5]} />
      <TransitionModelRig activeRef={activeRef} />
    </Canvas>
  );
}
