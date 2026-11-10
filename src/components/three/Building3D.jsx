import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Grid, Html, OrbitControls, RoundedBox, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { FLOORS, ROOMS } from '../../data/rooms';
import { useLang } from '../../i18n/LangContext';

const FLOOR_H = 1.05;
const SLAB = [6.2, 0.07, 3.8];
const ROOM_H = 0.72;

/* Xona ichidagi "jihozlar" — deterministik kichik bloklar */
function useFurniture(room) {
  return useMemo(() => {
    const [w, d] = room.size;
    const items = [];
    const cols = Math.max(2, Math.floor(w / 0.7));
    const rows = Math.max(2, Math.floor(d / 0.9));
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if ((i + j + room.id.length) % 3 === 0) continue;
        const x = -w / 2 + (i + 0.5) * (w / cols);
        const z = -d / 2 + (j + 0.5) * (d / rows);
        items.push({ x, z, h: 0.1 + ((i * 7 + j * 3) % 4) * 0.05 });
      }
    }
    return items;
  }, [room]);
}

function Room({ room, selected, hovered, onHover, onSelect, label }) {
  const mesh = useRef();
  const mat = useRef();
  const furniture = useFurniture(room);
  const active = selected || hovered;

  useFrame((_, dt) => {
    if (!mat.current || !mesh.current) return;
    mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, selected ? 0.62 : hovered ? 0.48 : 0.2, 8, dt);
    mat.current.emissiveIntensity = THREE.MathUtils.damp(mat.current.emissiveIntensity, selected ? 0.9 : hovered ? 0.55 : 0.12, 8, dt);
    const targetY = ROOM_H / 2 + 0.04 + (active ? 0.08 : 0);
    mesh.current.position.y = THREE.MathUtils.damp(mesh.current.position.y, targetY, 8, dt);
  });

  const [w, d] = room.size;
  return (
    <group position={[room.pos[0], 0, room.pos[1]]}>
      <mesh
        ref={mesh}
        position={[0, ROOM_H / 2 + 0.04, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(room.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(room.id);
        }}
      >
        <boxGeometry args={[w, ROOM_H, d]} />
        <meshStandardMaterial
          ref={mat}
          color={room.color}
          emissive={room.color}
          emissiveIntensity={0.12}
          transparent
          opacity={0.2}
          roughness={0.35}
          metalness={0.1}
          depthWrite={false}
        />
        <Edges color={room.color} threshold={15} />
        {(active || label) && (
          <Html center position={[0, ROOM_H / 2 + 0.32, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
            <div
              className="whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md"
              style={{ borderColor: `${room.color}88`, background: 'rgba(7,13,31,.82)' }}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: room.color }} />
              {label}
            </div>
          </Html>
        )}
      </mesh>
      {furniture.map((f, i) => (
        <mesh key={i} position={[f.x, 0.04 + f.h / 2, f.z]}>
          <boxGeometry args={[0.26, f.h, 0.2]} />
          <meshStandardMaterial color={room.color} emissive={room.color} emissiveIntensity={0.25} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Floor({ level, rooms, selectedId, selectedFloor, hovered, setHovered, onSelect, t }) {
  const ref = useRef();
  const baseY = (level - 1) * FLOOR_H;
  useFrame((_, dt) => {
    if (!ref.current) return;
    const lift = selectedFloor && level > selectedFloor ? 1.1 : 0;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, baseY + lift, 5, dt);
  });
  const dim = selectedFloor && level > selectedFloor;
  return (
    <group ref={ref} position={[0, baseY, 0]}>
      <RoundedBox args={SLAB} radius={0.03} smoothness={2}>
        <meshPhysicalMaterial color="#1a2550" transparent opacity={dim ? 0.18 : 0.55} roughness={0.2} metalness={0.2} clearcoat={1} />
      </RoundedBox>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={SLAB} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color="#7D9BFF" threshold={15} />
      </mesh>
      {rooms.map((r) => (
        <Room
          key={r.id}
          room={r}
          selected={selectedId === r.id}
          hovered={hovered === r.id}
          onHover={setHovered}
          onSelect={onSelect}
          label={selectedId === r.id || hovered === r.id ? t(r.name) : null}
        />
      ))}
    </group>
  );
}

function Beacon({ y }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 1.4;
  });
  return (
    <group position={[2.4, y, -1.3]}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 6]} />
        <meshStandardMaterial color="#A9BEFF" />
      </mesh>
      <mesh ref={ref} position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#4FE08A" emissive="#4FE08A" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Roof({ y, lifted }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, y + (lifted ? 1.1 : 0), 5, dt);
  });
  return (
    <group ref={ref} position={[0, y, 0]}>
      <RoundedBox args={SLAB} radius={0.03} smoothness={2}>
        <meshPhysicalMaterial color="#22305E" transparent opacity={0.6} roughness={0.25} clearcoat={1} />
      </RoundedBox>
      <Beacon y={0.04} />
    </group>
  );
}

function Building({ selectedId, onSelect, autoRotate }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(null);
  useCursor(!!hovered);
  const group = useRef();
  const selectedFloor = ROOMS.find((r) => r.id === selectedId)?.floor || 0;

  useFrame((_, dt) => {
    if (autoRotate && group.current && !hovered) group.current.rotation.y += dt * 0.12;
  });

  const roofY = FLOORS.length * FLOOR_H;
  return (
    <group ref={group} position={[0, -1.9, 0]}>
      {FLOORS.map((f) => (
        <Floor
          key={f.level}
          level={f.level}
          rooms={ROOMS.filter((r) => r.floor === f.level)}
          selectedId={selectedId}
          selectedFloor={selectedFloor}
          hovered={hovered}
          setHovered={setHovered}
          onSelect={onSelect}
          t={t}
        />
      ))}
      <Roof y={roofY} lifted={!!selectedFloor} />
      {/* poydevor */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[7.2, 0.14, 4.8]} />
        <meshStandardMaterial color="#0E1834" roughness={0.6} />
        <Edges color="#3A4A7E" threshold={15} />
      </mesh>
    </group>
  );
}

export default function Building3D({ selectedId, onSelect, interactive = true, height = '100%' }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const [fine, setFine] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ height }} className="relative w-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [8.4, 5.6, 9.6], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? 'always' : 'never'}
        style={{ touchAction: 'pan-y' }}
        onPointerMissed={() => interactive && onSelect?.(null)}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 10, 6]} intensity={1.6} color="#dfe6ff" />
        <pointLight position={[-6, 3, -4]} intensity={30} color="#3FE0F5" distance={20} />
        <pointLight position={[6, 1, 5]} intensity={25} color="#4FE08A" distance={18} />
        <Building selectedId={selectedId} onSelect={(id) => interactive && onSelect?.(id)} autoRotate={!fine && !selectedId} />
        <Grid
          position={[0, -2.06, 0]}
          infiniteGrid
          cellSize={0.5}
          cellThickness={0.6}
          sectionSize={2.5}
          sectionThickness={1}
          cellColor="#16224a"
          sectionColor="#2a3a72"
          fadeDistance={26}
          fadeStrength={1.5}
        />
        {fine && (
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.55}
            maxPolarAngle={1.25}
            autoRotate={!selectedId && !dragging}
            autoRotateSpeed={0.55}
            target={[0, 0.2, 0]}
            onStart={() => setDragging(true)}
            onEnd={() => setDragging(false)}
          />
        )}
      </Canvas>
    </div>
  );
}
