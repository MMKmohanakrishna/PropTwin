"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { asset } from "@/components/site";

const MODEL_URL = asset("/models/villa.glb");
const DRACO_PATH = asset("/draco/");

/** Three-quarter view from the front-right, slightly above. */
const VIEW_DIRECTION = new THREE.Vector3(27, 15, 32).normalize();
const BASE_AZIMUTH = Math.atan2(VIEW_DIRECTION.x, VIEW_DIRECTION.z);
const POLAR = Math.acos(VIEW_DIRECTION.y);

/** The model sways this far either side of the 3/4 view (radians). */
const SWAY = 0.28;
/** Visitors can drag this much further either way. */
const DRAG = 0.3;

/**
 * How much of the canvas the model may fill, in normalised device coordinates.
 * Kept inside the feathered mask so nothing is ever cut or faded.
 */
const SAFE_X = 0.9;
const SAFE_Y = 0.9;

/** The Blender villa, tuned for the site's dark twilight look. */
function Villa({ onLoaded }: { onLoaded: (bounds: THREE.Box3) => void }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);
  const group = useRef<THREE.Group>(null);

  const { model, bounds } = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const transparent = materials.some((m) => m.transparent);

      mesh.castShadow = !transparent;
      mesh.receiveShadow = true;

      for (const material of materials) {
        const m = material as THREE.MeshStandardMaterial;
        if (m.transparent) {
          // Glass: don't occlude the lit interiors behind it.
          m.depthWrite = false;
          m.envMapIntensity = 0.6;
        }
        // Blender emission strengths are tuned for Cycles; tame them for bloom.
        if (m.emissiveIntensity > 4) m.emissiveIntensity = 4;
      }
    });

    return { model: root, bounds: new THREE.Box3().setFromObject(root) };
  }, [scene]);

  useEffect(() => onLoaded(bounds), [bounds, onLoaded]);

  // Slow sway around the three-quarter view instead of a full spin.
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = SWAY * Math.sin(clock.elapsedTime * 0.22);
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

/**
 * Places the camera as close as possible while keeping every corner of the
 * model on screen at every angle it can reach (sway + drag), for any canvas size.
 */
function FitCamera({ bounds }: { bounds: THREE.Box3 }) {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  useLayoutEffect(() => {
    const target = new THREE.Vector3(0, (bounds.min.y + bounds.max.y) / 2, 0);

    const corners: THREE.Vector3[] = [];
    for (const x of [bounds.min.x, bounds.max.x])
      for (const y of [bounds.min.y, bounds.max.y])
        for (const z of [bounds.min.z, bounds.max.z]) corners.push(new THREE.Vector3(x, y, z));

    const range = SWAY + DRAG;
    const angles = Array.from({ length: 25 }, (_, i) => -range + (2 * range * i) / 24);

    const probe = camera.clone();
    probe.aspect = width / height;
    probe.updateProjectionMatrix();

    const point = new THREE.Vector3();
    const fits = (distance: number) => {
      probe.position.copy(target).addScaledVector(VIEW_DIRECTION, distance);
      probe.lookAt(target);
      probe.updateMatrixWorld();

      return angles.every((angle) =>
        corners.every((corner) => {
          point.copy(corner).applyAxisAngle(THREE.Object3D.DEFAULT_UP, angle).project(probe);
          return Math.abs(point.x) <= SAFE_X && Math.abs(point.y) <= SAFE_Y;
        })
      );
    };

    let near = 5;
    let far = 250;
    for (let i = 0; i < 30; i++) {
      const mid = (near + far) / 2;
      if (fits(mid)) far = mid;
      else near = mid;
    }

    camera.position.copy(target).addScaledVector(VIEW_DIRECTION, far);
    camera.lookAt(target);

    if (controls) {
      controls.target.copy(target);
      controls.update();
    }
  }, [bounds, camera, controls, width, height]);

  return null;
}

function Lights() {
  return (
    <>
      {/* Dusk sky over a warm ground bounce */}
      <hemisphereLight args={["#5b7bb5", "#2a1f16", 1.1]} />

      {/* Low cool moonlight casting soft shadows */}
      <directionalLight
        position={[-14, 18, 10]}
        intensity={1.1}
        color="#b9c9ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0004}
      />

      {/* Warm fill from the lit interior */}
      <pointLight position={[0, 2.2, 4]} intensity={40} distance={18} color="#ffc98a" />
    </>
  );
}

export default function VillaModel() {
  const [bounds, setBounds] = useState<THREE.Box3 | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Only render while visible: saves battery and keeps scrolling smooth.
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: "100px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className={`relative h-full w-full transition-opacity duration-1000 ${
        bounds ? "opacity-100" : "opacity-0"
      }`}
      role="img"
      aria-label="Interactive 3D model of a modern two-storey villa at twilight, modeled in Blender"
    >
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        shadows
        dpr={[1, 1.75]}
        camera={{ position: VIEW_DIRECTION.clone().multiplyScalar(50).toArray(), fov: 30, near: 0.5, far: 400 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        // Post-processing renders an opaque frame; feather it into the page.
        className="cursor-grab [mask-image:radial-gradient(ellipse_72%_70%_at_50%_50%,black_66%,transparent_100%)] active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Lights />
          <Villa onLoaded={setBounds} />
          {bounds && <FitCamera bounds={bounds} />}

          <ContactShadows
            position={[0, (bounds?.min.y ?? -1.9) - 0.05, 0]}
            scale={48}
            blur={2.8}
            far={6}
            opacity={0.65}
            color="#000000"
          />

          <EffectComposer multisampling={4}>
            <Bloom mipmapBlur luminanceThreshold={0.9} luminanceSmoothing={0.2} intensity={0.9} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping
          rotateSpeed={0.5}
          minAzimuthAngle={BASE_AZIMUTH - DRAG}
          maxAzimuthAngle={BASE_AZIMUTH + DRAG}
          minPolarAngle={POLAR}
          maxPolarAngle={POLAR}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-brass" />
        Modern Villa · Twilight · Blender
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL, DRACO_PATH);
