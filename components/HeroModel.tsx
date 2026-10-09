"use client";

import { Canvas } from "@react-three/fiber";
import { Edges, Grid, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

type Mode = "blueprint" | "clay" | "render";

type Kind =
  | "plinth"
  | "slab"
  | "wall"
  | "glass"
  | "timber"
  | "column"
  | "deck"
  | "water";

type Block = {
  kind: Kind;
  position: [number, number, number];
  size: [number, number, number];
};

const modes: { id: Mode; label: string; caption: string }[] = [
  { id: "blueprint", label: "Blueprint", caption: "CAD geometry" },
  { id: "clay", label: "Clay", caption: "Massing model" },
  { id: "render", label: "Render", caption: "Materials & light" },
];

/* A two-storey modern villa, modeled from primitive volumes. */
const villa: Block[] = [
  // Site
  { kind: "plinth", position: [0, 0.1, 0.6], size: [10, 0.2, 7.6] },
  { kind: "deck", position: [-1.6, 0.26, 3.4], size: [6.2, 0.12, 2.4] },
  { kind: "water", position: [-2.1, 0.33, 3.45], size: [4.2, 0.04, 1.5] },

  // Ground floor
  { kind: "wall", position: [0.2, 1.6, -2.3], size: [7.6, 2.8, 0.2] },
  { kind: "wall", position: [-3.5, 1.6, -0.55], size: [0.2, 2.8, 3.7] },
  { kind: "timber", position: [-3.38, 1.6, -0.55], size: [0.06, 2.6, 3.4] },
  { kind: "glass", position: [0.1, 1.6, 1.3], size: [7, 2.6, 0.06] },
  { kind: "glass", position: [3.9, 1.6, -0.5], size: [0.06, 2.6, 3.6] },

  // Cantilevered first-floor slab
  { kind: "slab", position: [0.9, 3.15, -0.2], size: [9, 0.3, 4.9] },
  { kind: "column", position: [4.9, 1.6, 1.9], size: [0.18, 2.8, 0.18] },
  { kind: "column", position: [4.9, 1.6, -2.1], size: [0.18, 2.8, 0.18] },

  // First floor volume
  { kind: "wall", position: [-1.5, 4.6, -0.4], size: [3, 2.6, 4] },
  { kind: "glass", position: [2.2, 4.6, 1.5], size: [4.4, 2.4, 0.06] },
  { kind: "wall", position: [2.2, 4.6, -2.3], size: [4.4, 2.6, 0.2] },
  { kind: "glass", position: [4.35, 4.6, -0.4], size: [0.06, 2.4, 3.6] },
  { kind: "timber", position: [-1.5, 4.6, 1.62], size: [2.6, 2.3, 0.06] },

  // Roof
  { kind: "slab", position: [0.6, 6.05, -0.35], size: [7.4, 0.25, 4.7] },
];

const renderColors: Record<Kind, string> = {
  plinth: "#d8d2c7",
  slab: "#f3f0ea",
  wall: "#ece7de",
  glass: "#8fb6c9",
  timber: "#8b5e3c",
  column: "#2a2a2a",
  deck: "#a98b6a",
  water: "#3d8fb3",
};

function BlockMesh({ block, mode }: { block: Block; mode: Mode }) {
  const isGlass = block.kind === "glass";
  const isWater = block.kind === "water";

  return (
    <mesh
      position={block.position}
      castShadow={mode !== "blueprint" && !isGlass}
      receiveShadow={mode !== "blueprint"}
    >
      <boxGeometry args={block.size} />

      {mode === "blueprint" && (
        <meshBasicMaterial
          color="#c8a26b"
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      )}

      {mode === "clay" && (
        <meshStandardMaterial
          color={isGlass ? "#d9dde0" : "#ebe8e3"}
          roughness={0.95}
          transparent={isGlass}
          opacity={isGlass ? 0.55 : 1}
        />
      )}

      {mode === "render" && (
        <meshStandardMaterial
          color={renderColors[block.kind]}
          roughness={isGlass || isWater ? 0.05 : 0.75}
          metalness={isGlass ? 0.3 : 0}
          transparent={isGlass}
          opacity={isGlass ? 0.38 : 1}
          emissive={isWater ? "#1d6a8a" : "#000000"}
          emissiveIntensity={isWater ? 0.35 : 0}
        />
      )}

      {mode === "blueprint" && <Edges color="#e2c592" threshold={15} />}
      {mode === "clay" && <Edges color="#8a8478" threshold={15} />}
    </mesh>
  );
}

function Scene({ mode }: { mode: Mode }) {
  return (
    <>
      <ambientLight intensity={mode === "render" ? 0.7 : 1.1} />

      <directionalLight
        position={[8, 12, 6]}
        intensity={mode === "render" ? 2.6 : 1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color={mode === "render" ? "#fff1dc" : "#ffffff"}
      />

      <directionalLight position={[-6, 4, -8]} intensity={0.5} />

      {/* Warm interior glow for the rendered look */}
      {mode === "render" && (
        <pointLight position={[0, 1.8, -0.5]} intensity={6} distance={7} color="#ffcf8a" />
      )}

      <group position={[-0.4, -1.4, -0.6]}>
        {villa.map((block, index) => (
          <BlockMesh key={index} block={block} mode={mode} />
        ))}

        <Grid
          position={[0, 0, 0]}
          args={[40, 40]}
          cellSize={0.5}
          cellThickness={0.6}
          cellColor="#3a3a3c"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor={mode === "blueprint" ? "#8a7046" : "#4a4a4d"}
          fadeDistance={28}
          fadeStrength={1.5}
          infiniteGrid
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={mode === "blueprint" ? 0 : 0.35} />
        </mesh>
      </group>

      <OrbitControls
        target={[0, 1.3, 0]}
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
      />
    </>
  );
}

export default function HeroModel() {
  const [mode, setMode] = useState<Mode>("blueprint");
  const [autoplay, setAutoplay] = useState(true);

  // Step through the modeling stages until the visitor picks one.
  useEffect(() => {
    if (!autoplay) return;

    const id = window.setInterval(() => {
      setMode((current) => {
        const index = modes.findIndex((m) => m.id === current);
        return modes[(index + 1) % modes.length].id;
      });
    }, 3800);

    return () => window.clearInterval(id);
  }, [autoplay]);

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Interactive 3D model of a two-storey villa, shown as blueprint, clay and rendered model"
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [19, 11, 19], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene mode={mode} />
        </Canvas>
      </div>

      {/* Mode switcher */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center px-4">
        <div
          role="tablist"
          aria-label="Model view"
          className="flex gap-1 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-md"
        >
          {modes.map((m) => {
            const active = m.id === mode;

            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setAutoplay(false);
                  setMode(m.id);
                }}
                className={`rounded-full px-4 py-2 text-xs font-medium transition sm:px-5 ${
                  active
                    ? "bg-white text-ink"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Technical readout */}
      <div className="pointer-events-none absolute right-2 top-2 hidden font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-white/40 sm:block">
        <p className="text-brass">{modes.find((m) => m.id === mode)?.caption}</p>
        <p>Sample villa · G+1</p>
        <p>Drag to orbit</p>
      </div>
    </div>
  );
}
