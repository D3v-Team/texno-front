import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Environment, Float, Lightformer, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* Markaziy "innovatsiya yadrosi": shisha ikosaedr + yorqin yadro + karkas */
function Core() {
  const outer = useRef();
  const wire = useRef();
  const inner = useRef();
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y += dt * 0.18;
      outer.current.rotation.x = Math.sin(t * 0.3) * 0.25;
    }
    if (wire.current) {
      wire.current.rotation.y -= dt * 0.08;
      wire.current.rotation.z += dt * 0.05;
    }
    if (inner.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.06;
      inner.current.scale.setScalar(s);
    }
  });
  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 3]} />
        <meshStandardMaterial color="#3FE0F5" emissive="#3FE0F5" emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.45, 0]} />
        <meshPhysicalMaterial
          color="#c3d0ff"
          roughness={0.32}
          metalness={0}
          transmission={1}
          thickness={1.6}
          ior={1.5}
          attenuationColor="#5B7FFF"
          attenuationDistance={2.4}
          iridescence={0.7}
          iridescenceIOR={1.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          flatShading
          envMapIntensity={0.9}
        />
        <Edges color="#8BEFFF" threshold={10} />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.95, 1]} />
        <meshBasicMaterial color="#7D9BFF" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

const ORBITS = [
  { r: 2.55, tilt: [1.25, 0.2, 0], speed: 0.35, sats: [{ c: '#4FE08A', s: 0.13, o: 0 }, { c: '#FFC24D', s: 0.09, o: 2.6 }] },
  { r: 3.05, tilt: [1.0, -0.6, 0.3], speed: -0.24, sats: [{ c: '#3FE0F5', s: 0.11, o: 1.2 }, { c: '#5B7FFF', s: 0.15, o: 4.1 }] },
  { r: 3.55, tilt: [1.6, 0.7, -0.2], speed: 0.16, sats: [{ c: '#B78BFF', s: 0.1, o: 0.5 }, { c: '#4FE08A', s: 0.08, o: 3.3 }] },
];

function Orbit({ r, tilt, speed, sats }) {
  const group = useRef();
  const satRefs = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    sats.forEach((s, i) => {
      const m = satRefs.current[i];
      if (!m) return;
      const a = t + s.o;
      m.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
    });
  });
  return (
    <group ref={group} rotation={tilt}>
      <mesh>
        <torusGeometry args={[r, 0.006, 8, 160]} />
        <meshBasicMaterial color="#A9BEFF" transparent opacity={0.28} />
      </mesh>
      {sats.map((s, i) => (
        <mesh key={i} ref={(el) => (satRefs.current[i] = el)}>
          <sphereGeometry args={[s.s, 24, 24]} />
          <meshStandardMaterial color={s.c} emissive={s.c} emissiveIntensity={2.2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* Uchib yuruvchi "startap bloklari" */
function Blocks() {
  const items = useMemo(
    () => [
      { p: [-3.3, 1.6, -0.6], c: '#4FE08A', g: 'box', s: 0.38 },
      { p: [3.4, -1.4, -0.4], c: '#FFC24D', g: 'oct', s: 0.36 },
      { p: [2.9, 2.0, -1.2], c: '#5B7FFF', g: 'box', s: 0.3 },
      { p: [-2.8, -1.9, 0.2], c: '#3FE0F5', g: 'oct', s: 0.3 },
      { p: [0.4, -2.7, -1.0], c: '#B78BFF', g: 'tet', s: 0.32 },
    ],
    []
  );
  return items.map((it, i) => (
    <Float key={i} speed={1.4 + i * 0.2} rotationIntensity={1.4} floatIntensity={1.2}>
      <mesh position={it.p}>
        {it.g === 'box' && <boxGeometry args={[it.s, it.s, it.s]} />}
        {it.g === 'oct' && <octahedronGeometry args={[it.s * 0.8, 0]} />}
        {it.g === 'tet' && <tetrahedronGeometry args={[it.s * 0.85, 0]} />}
        <meshPhysicalMaterial color={it.c} roughness={0.15} metalness={0.3} clearcoat={1} emissive={it.c} emissiveIntensity={0.35} />
      </mesh>
    </Float>
  ));
}

/* Fon zarrachalari */
function Field({ count = 900 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(ph) - 6;
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#A9BEFF" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* Sichqoncha bo'yicha parallaks */
function Rig({ children }) {
  const ref = useRef();
  const target = useMemo(() => new THREE.Vector2(), []);
  useFrame((state, dt) => {
    target.set(state.pointer.x, state.pointer.y);
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, target.x * 0.35, 3, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -target.y * 0.2, 3, dt);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
        style={{ touchAction: 'pan-y' }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} color="#cfd9ff" />
        <pointLight position={[-4, -2, 3]} intensity={40} color="#4FE08A" distance={14} />
        <pointLight position={[4, 2.5, 2]} intensity={40} color="#3FE0F5" distance={14} />
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={1.6} color="#5B7FFF" position={[-5, 2, 2]} scale={[2, 5, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#4FE08A" position={[5, -1, 1]} scale={[2, 4, 1]} />
          <Lightformer form="ring" intensity={2} color="#3FE0F5" position={[0, 5, -4]} scale={2} />
          <Lightformer form="rect" intensity={0.6} color="#ffffff" position={[0, 0, 6]} scale={[6, 1, 1]} />
        </Environment>
        <Rig>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
            <Core />
          </Float>
          {ORBITS.map((o, i) => (
            <Orbit key={i} {...o} />
          ))}
          <Blocks />
        </Rig>
        <Sparkles count={70} scale={[11, 7, 5]} size={2.2} speed={0.35} color="#A9BEFF" opacity={0.7} />
        <Field />
      </Canvas>
    </div>
  );
}
