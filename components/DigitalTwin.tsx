"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, OrbitControls, Text, useCursor } from "@react-three/drei";
import {
  Maximize,
  Minimize,
  RotateCcw,
  MousePointer2,
} from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type RoomName =
  | "Overview"
  | "Living Room"
  | "Master Bedroom"
  | "Bedroom 2"
  | "Kitchen"
  | "Balcony";

const roomInfo: Record<
  RoomName,
  {
    title: string;
    description: string;
    camera: [number, number, number];
    target: [number, number, number];
  }
> = {
  Overview: {
    title: "2BHK Overview",
    description:
      "Explore the complete PropTwin digital property twin. Rotate, zoom and select individual spaces.",
    camera: [14, 12, 16],
    target: [0, 0, 0],
  },

  "Living Room": {
    title: "Living Room",
    description:
      "A spacious living area designed for family gatherings, relaxation and entertainment.",
    camera: [-10, 8, -10],
    target: [-2, 0, -2],
  },

  "Master Bedroom": {
    title: "Master Bedroom",
    description:
      "A comfortable private bedroom designed with space for a large bed and storage.",
    camera: [9, 7, 10],
    target: [3, 0, 3],
  },

  "Bedroom 2": {
    title: "Bedroom 2",
    description:
      "A flexible bedroom suitable for children, guests, family members or a home office.",
    camera: [-9, 7, 10],
    target: [-2.5, 0, 3],
  },

  Kitchen: {
    title: "Kitchen",
    description:
      "A practical kitchen zone with countertop, storage and sink area.",
    camera: [10, 6, -9],
    target: [3.5, 0, -3],
  },

  Balcony: {
    title: "Balcony",
    description:
      "An open balcony area providing additional space for relaxation and outdoor views.",
    camera: [0, 7, -13],
    target: [0, 0, -6],
  },
};

/* ---------------------------------------------------------
   FLOOR
--------------------------------------------------------- */

function Floor({
  position,
  size,
  color = "#b89b78",
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* ---------------------------------------------------------
   WALL
--------------------------------------------------------- */

function Wall({
  position,
  size,
  color = "#e8e3da",
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* ---------------------------------------------------------
   WINDOW
--------------------------------------------------------- */

function Window({
  position,
  rotation = [0, 0, 0],
  width = 2.4,
  height = 1.6,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  return (
    <group position={position} rotation={rotation}>

      <mesh>
        <boxGeometry args={[width, height, 0.12]} />
        <meshStandardMaterial
          color="#202a32"
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <boxGeometry
          args={[
            width - 0.18,
            height - 0.18,
            0.04,
          ]}
        />

        <meshStandardMaterial
          color="#6fa8c9"
          transparent
          opacity={0.65}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, 0.12]}>
        <boxGeometry
          args={[
            0.08,
            height - 0.15,
            0.08,
          ]}
        />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0, 0, 0.12]}>
        <boxGeometry
          args={[
            width - 0.15,
            0.08,
            0.08,
          ]}
        />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   DOOR
--------------------------------------------------------- */

function Door({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>

      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.8, 3, 0.15]} />
        <meshStandardMaterial color="#4a3525" />
      </mesh>

      <mesh position={[0, 1.5, 0.12]}>
        <boxGeometry args={[1.5, 2.75, 0.08]} />
        <meshStandardMaterial
          color="#7b5638"
          roughness={0.65}
        />
      </mesh>

      <mesh position={[0.55, 1.5, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#d6b56d"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   SOFA
--------------------------------------------------------- */

function Sofa() {
  return (
    <group position={[-2, 0.65, -2.8]}>

      <mesh>
        <boxGeometry args={[3.6, 0.8, 1.4]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      <mesh position={[0, 0.65, 0.55]}>
        <boxGeometry args={[3.6, 1.3, 0.35]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      <mesh position={[-1.8, 0.45, 0]}>
        <boxGeometry args={[0.35, 1, 1.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      <mesh position={[1.8, 0.45, 0]}>
        <boxGeometry args={[0.35, 1, 1.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   BED
--------------------------------------------------------- */

function Bed({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>

      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[3.2, 0.45, 5]} />
        <meshStandardMaterial color="#f1f1ed" />
      </mesh>

      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[3.5, 0.5, 5.3]} />
        <meshStandardMaterial color="#7a5c43" />
      </mesh>

      <mesh position={[0, 1.8, -2.35]}>
        <boxGeometry args={[3.5, 2.4, 0.25]} />
        <meshStandardMaterial color="#654c38" />
      </mesh>

      <mesh position={[-0.8, 0.95, -1.5]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0.8, 0.95, -1.5]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   DINING TABLE
--------------------------------------------------------- */

function DiningTable() {
  return (
    <group position={[2, 0.8, 0]}>

      <mesh>
        <boxGeometry args={[2.8, 0.25, 1.5]} />
        <meshStandardMaterial color="#76553b" />
      </mesh>

      {[
        [-1.1, -0.65],
        [1.1, -0.65],
        [-1.1, 0.65],
        [1.1, 0.65],
      ].map(([x, z], index) => (
        <mesh key={index} position={[x, -0.65, z]}>
          <boxGeometry args={[0.15, 1.3, 0.15]} />
          <meshStandardMaterial color="#4d3828" />
        </mesh>
      ))}

    </group>
  );
}

/* ---------------------------------------------------------
   KITCHEN
--------------------------------------------------------- */

function Kitchen() {
  return (
    <group position={[3.7, 0, -3.2]}>

      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3.2, 1.8, 1]} />
        <meshStandardMaterial color="#d0d0cc" />
      </mesh>

      <mesh position={[0, 1.95, 0]}>
        <boxGeometry args={[3.3, 0.15, 1.1]} />
        <meshStandardMaterial color="#4d4d4d" />
      </mesh>

      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[3.1, 1.2, 0.6]} />
        <meshStandardMaterial color="#9c8065" />
      </mesh>

      <mesh position={[0, 2.06, 0]}>
        <boxGeometry args={[0.8, 0.08, 0.6]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   TV
--------------------------------------------------------- */

function TVUnit() {
  return (
    <group position={[-1, 0, 4]}>

      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[3.5, 2, 0.15]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[4, 0.8, 0.7]} />
        <meshStandardMaterial color="#654c38" />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   BALCONY
--------------------------------------------------------- */

function Balcony() {
  return (
    <group position={[0, 0, -6]}>

      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[10, 0.2, 2.5]} />
        <meshStandardMaterial color="#c9c1b5" />
      </mesh>

      <mesh position={[-4.8, 1, 0]}>
        <boxGeometry args={[0.1, 2, 2.5]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      <mesh position={[4.8, 1, 0]}>
        <boxGeometry args={[0.1, 2, 2.5]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      <mesh position={[0, 1, -1.1]}>
        <boxGeometry args={[9.6, 2, 0.1]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

    </group>
  );
}

/* ---------------------------------------------------------
   HOTSPOT
--------------------------------------------------------- */

function Hotspot({
  position,
  label,
  onClick,
}: {
  position: [number, number, number];
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ring = useRef<THREE.Mesh>(null);

  useCursor(hovered);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const pulse = 1 + (Math.sin(clock.elapsedTime * 2.5) + 1) * 0.25;
    ring.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>

      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.25 : 1}
      >
        <sphereGeometry args={[0.3, 24, 24]} />

        <meshStandardMaterial
          color={hovered ? "#e2c592" : "#ffffff"}
          emissive={hovered ? "#c8a26b" : "#ffffff"}
          emissiveIntensity={0.9}
        />
      </mesh>

      <mesh ref={ring}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshBasicMaterial
          color="#c8a26b"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>

      <Text
        position={[0, 0.65, 0]}
        fontSize={0.32}
        color={hovered ? "#e2c592" : "white"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>

    </group>
  );
}

/* ---------------------------------------------------------
   APARTMENT
--------------------------------------------------------- */

function Apartment({
  onRoomSelect,
}: {
  onRoomSelect: (room: RoomName) => void;
}) {
  const model = useRef<THREE.Group>(null);

  // Every architectural mesh casts and receives shadows.
  useLayoutEffect(() => {
    model.current?.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, []);

  return (
    <group ref={model}>

      {/* FLOORS */}

      <Floor
        position={[0, 0, 0]}
        size={[10, 0.2, 10]}
      />

      <Floor
        position={[-2.5, 0.02, -2]}
        size={[5, 0.12, 4]}
      />

      <Floor
        position={[3, 0.02, 2.8]}
        size={[4, 0.12, 4]}
      />

      <Floor
        position={[-2.5, 0.02, 3]}
        size={[5, 0.12, 3.5]}
      />

      {/* EXTERNAL WALLS */}

      <Wall
        position={[0, 2, 5]}
        size={[10, 4, 0.2]}
      />

      <Wall
        position={[-5, 2, 0]}
        size={[0.2, 4, 10]}
      />

      <Wall
        position={[5, 2, 0]}
        size={[0.2, 4, 10]}
      />

      {/* INTERNAL WALLS */}

      <Wall
        position={[0, 2, 0.8]}
        size={[0.2, 4, 4.4]}
      />

      <Wall
        position={[2.5, 2, 3]}
        size={[5, 4, 0.2]}
      />

      <Wall
        position={[2.5, 2, -3.2]}
        size={[5, 4, 0.2]}
      />

      {/* DOORS */}

      <Door
        position={[4.15, 0, 5.05]}
        rotation={[0, Math.PI, 0]}
      />

      <Door
        position={[0.15, 0, 3]}
        rotation={[0, Math.PI / 2, 0]}
      />

      <Door
        position={[2.5, 0, -3.05]}
      />

      {/* WINDOWS */}

      <Window
        position={[-2.3, 2.3, 5.05]}
      />

      <Window
        position={[2.5, 2.3, 5.05]}
        width={2}
      />

      <Window
        position={[-5.05, 2.3, 2.5]}
        rotation={[0, Math.PI / 2, 0]}
      />

      <Window
        position={[5.05, 2.3, -2]}
        rotation={[0, Math.PI / 2, 0]}
        width={1.8}
      />

      {/* FURNITURE */}

      <Sofa />

      <DiningTable />

      <TVUnit />

      <Bed position={[-2.5, 0, 3]} />

      <Bed position={[3, 0, 2.8]} />

      <Kitchen />

      <Balcony />

      {/* HOTSPOTS */}

      <Hotspot
        position={[-2, 2.5, -2]}
        label="LIVING ROOM"
        onClick={() => onRoomSelect("Living Room")}
      />

      <Hotspot
        position={[3, 2.5, 2.8]}
        label="MASTER BEDROOM"
        onClick={() => onRoomSelect("Master Bedroom")}
      />

      <Hotspot
        position={[-2.5, 2.5, 3]}
        label="BEDROOM 2"
        onClick={() => onRoomSelect("Bedroom 2")}
      />

      <Hotspot
        position={[3.7, 2.5, -3.2]}
        label="KITCHEN"
        onClick={() => onRoomSelect("Kitchen")}
      />

      <Hotspot
        position={[0, 2.5, -6]}
        label="BALCONY"
        onClick={() => onRoomSelect("Balcony")}
      />

    </group>
  );
}

/* ---------------------------------------------------------
   CAMERA RIG
   Glides to the selected room, then hands control back to
   the visitor as soon as they start orbiting.
--------------------------------------------------------- */

function CameraRig({
  room,
  version,
}: {
  room: RoomName;
  version: number;
}) {
  const camera = useThree((state) => state.camera);
  const controls = useThree(
    (state) => state.controls
  ) as OrbitControlsImpl | null;

  const animating = useRef(true);

  const goal = useMemo(
    () => ({
      position: new THREE.Vector3(...roomInfo[room].camera),
      target: new THREE.Vector3(...roomInfo[room].target),
    }),
    [room]
  );

  // Re-run the fly-to whenever a room is (re)selected.
  useEffect(() => {
    animating.current = true;
  }, [room, version]);

  useEffect(() => {
    if (!controls) return;

    const stop = () => {
      animating.current = false;
    };

    controls.addEventListener("start", stop);
    return () => controls.removeEventListener("start", stop);
  }, [controls]);

  useFrame((_, delta) => {
    if (!animating.current || !controls) return;

    // Frame-rate independent easing.
    const t = 1 - Math.pow(0.02, delta);

    camera.position.lerp(goal.position, t);
    controls.target.lerp(goal.target, t);
    controls.update();

    if (
      camera.position.distanceTo(goal.position) < 0.02 &&
      controls.target.distanceTo(goal.target) < 0.02
    ) {
      animating.current = false;
    }
  });

  return null;
}

/* ---------------------------------------------------------
   NAVIGATION
--------------------------------------------------------- */

const navigationItems: RoomName[] = [
  "Overview",
  "Living Room",
  "Master Bedroom",
  "Bedroom 2",
  "Kitchen",
  "Balcony",
];

/* ---------------------------------------------------------
   DIGITAL TWIN
--------------------------------------------------------- */

export default function DigitalTwin() {
  const [selectedRoom, setSelectedRoom] =
    useState<RoomName>("Overview");

  // Bumped on every selection so re-clicking a room re-centres it.
  const [selectionVersion, setSelectionVersion] =
    useState(0);

  const [fullscreen, setFullscreen] =
    useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);

  const selectedInfo =
    roomInfo[selectedRoom];

  const selectRoom = (room: RoomName) => {
    setSelectedRoom(room);
    setSelectionVersion((value) => value + 1);
  };

  // Keep state in sync when the user leaves fullscreen with Esc.
  useEffect(() => {
    const onChange = () =>
      setFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", onChange);
    return () =>
      document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await viewerRef.current?.requestFullscreen();
      }
    } catch {
      // Fullscreen is unavailable (e.g. iOS Safari); ignore.
    }
  };

  return (
    <div
      ref={viewerRef}
      className={`relative w-full overflow-hidden bg-[#141416] ${
        fullscreen
          ? "h-screen rounded-none"
          : "h-[560px] rounded-3xl md:h-[680px]"
      }`}
    >

      {/* 3D CANVAS */}

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: roomInfo.Overview.camera,
          fov: 45,
        }}
        aria-label="Interactive 3D model of a 2BHK apartment"
      >

        <color
          attach="background"
          args={["#141416"]}
        />

        <fog
          attach="fog"
          args={["#141416", 30, 55]}
        />

        <ambientLight intensity={1.2} />

        <hemisphereLight
          args={["#fff6e8", "#2a2a2e", 0.8]}
        />

        <directionalLight
          position={[10, 15, 8]}
          intensity={2.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.0005}
        />

        <pointLight
          position={[-5, 8, -5]}
          intensity={1.2}
        />

        <Apartment
          onRoomSelect={selectRoom}
        />

        <Grid
          position={[0, -0.11, 0]}
          args={[60, 60]}
          cellSize={1}
          cellThickness={0.6}
          cellColor="#2e2e32"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#5a4a32"
          fadeDistance={45}
          fadeStrength={1.5}
          infiniteGrid
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={8}
          maxDistance={28}
          maxPolarAngle={Math.PI / 2.05}
        />

        <CameraRig
          room={selectedRoom}
          version={selectionVersion}
        />

      </Canvas>

      {/* TOP BAR */}

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3 md:inset-x-5 md:top-5">

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live · 2BHK Digital Twin
        </div>

        <div className="pointer-events-auto flex gap-2">

          <button
            type="button"
            onClick={() => selectRoom("Overview")}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
            aria-label="Reset to overview"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">
              Reset
            </span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {fullscreen ? (
              <Minimize size={14} />
            ) : (
              <Maximize size={14} />
            )}

            <span className="hidden sm:inline">
              {fullscreen ? "Exit" : "Fullscreen"}
            </span>
          </button>

        </div>

      </div>

      {/* BOTTOM: ROOM INFO + NAVIGATION */}

      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-3 md:inset-x-5 md:bottom-5">

        <div className="flex items-end justify-between gap-4">

          <div className="max-w-sm rounded-2xl border border-white/10 bg-black/65 p-5 text-white shadow-2xl backdrop-blur-md">

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              Selected space
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
              {selectedInfo.title}
            </h3>

            <p className="mt-2 hidden text-sm leading-6 text-white/60 sm:block">
              {selectedInfo.description}
            </p>

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white/60 backdrop-blur-md lg:flex">
            <MousePointer2 size={14} />
            Drag to orbit · Scroll to zoom · Click a hotspot
          </div>

        </div>

        <div
          role="tablist"
          aria-label="Rooms"
          className="no-scrollbar pointer-events-auto flex gap-1 self-start overflow-x-auto rounded-full border border-white/10 bg-black/65 p-1 backdrop-blur-md max-w-full"
        >
          {navigationItems.map((room) => {
            const active = selectedRoom === room;

            return (
              <button
                key={room}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectRoom(room)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-white text-black"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                {room}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
