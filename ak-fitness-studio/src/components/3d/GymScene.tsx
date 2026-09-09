'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function WeightPlate({ radius = 0.72, thickness = 0.16, color = '#171717', accent = false }: { radius?: number; thickness?: number; color?: string; accent?: boolean }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 64]} />
        <meshStandardMaterial color={color} metalness={0.78} roughness={0.23} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, thickness * 0.51, 0]}>
        <torusGeometry args={[radius * 0.73, radius * 0.055, 12, 64]} />
        <meshStandardMaterial color={accent ? '#d6ff00' : '#3b3b37'} metalness={0.8} roughness={0.2} emissive={accent ? '#687900' : '#000'} emissiveIntensity={accent ? 0.35 : 0} />
      </mesh>
      <mesh position={[0, thickness * 0.52, 0]}>
        <cylinderGeometry args={[radius * 0.19, radius * 0.19, thickness * 0.12, 32]} />
        <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.17} />
      </mesh>
    </group>
  );
}

function Barbell({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.055, 0.055, 5.7, 32]} />
        <meshStandardMaterial color="#8b8b86" metalness={0.95} roughness={0.18} />
      </mesh>
      {[-2.3, -2.0, -1.72, 1.72, 2.0, 2.3].map((y, i) => (
        <group key={y} position={[0, y, 0]}>
          <WeightPlate radius={i % 3 === 0 ? 0.78 : i % 3 === 1 ? 0.66 : 0.55} thickness={0.15} color={i % 3 === 0 ? '#111' : '#20201d'} accent={i === 0 || i === 5} />
        </group>
      ))}
      <mesh position={[0, 2.67, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 32]} />
        <meshStandardMaterial color="#d6ff00" metalness={0.6} roughness={0.25} emissive="#687900" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -2.67, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 32]} />
        <meshStandardMaterial color="#d6ff00" metalness={0.6} roughness={0.25} emissive="#687900" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Dumbbell() {
  return (
    <group rotation={[0.2, 0.3, 0.25]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.09, 1.45, 24]} />
        <meshStandardMaterial color="#85857f" metalness={0.92} roughness={0.2} />
      </mesh>
      {[-0.62, -0.43, 0.43, 0.62].map((x, i) => (
        <mesh key={x} position={[0, x, 0]} castShadow>
          <cylinderGeometry args={[i % 2 === 0 ? 0.34 : 0.28, i % 2 === 0 ? 0.34 : 0.28, 0.15, 32]} />
          <meshStandardMaterial color="#151513" metalness={0.72} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function Rack() {
  const black = useMemo(() => ({ color: '#0d0d0c', metalness: 0.82, roughness: 0.24 }), []);
  return (
    <group>
      {[-1.35, 1.35].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.65, 0]} castShadow><boxGeometry args={[0.12, 2.9, 0.12]} /><meshStandardMaterial {...black} /></mesh>
          <mesh position={[0, 2.05, 0]} castShadow><boxGeometry args={[0.12, 0.12, 2.15]} /><meshStandardMaterial {...black} /></mesh>
          <mesh position={[0, -0.76, 0]} castShadow><boxGeometry args={[0.24, 0.08, 2.5]} /><meshStandardMaterial {...black} /></mesh>
        </group>
      ))}
      <Barbell scale={0.82} />
      <mesh position={[0, -0.83, 0]} receiveShadow>
        <boxGeometry args={[3.3, 0.06, 2.1]} />
        <meshStandardMaterial color="#121210" roughness={0.92} metalness={0.03} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const { mouse } = useThree();

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.current = window.scrollY / max;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const s = scroll.current;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.24 + s * Math.PI * 1.2, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 0.11 + Math.sin(clock.elapsedTime * 0.5) * 0.025, 0.045);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(clock.elapsedTime * 0.7) * 0.06 - s * 0.7, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 0.22, 0.04);
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
        <group position={[0, 0.15, 0]}>
          <Rack />
          <group position={[0.2, 1.25, 1.15]} scale={0.9}><Dumbbell /></group>
          <group position={[-0.35, -0.05, -1.25]} rotation={[0.08, 0.25, 0.08]}><Barbell scale={0.75} /></group>
        </group>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.38, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#070707" roughness={0.8} metalness={0.12} />
      </mesh>
      <mesh position={[0, -0.15, -2.8]}>
        <boxGeometry args={[6.5, 0.025, 0.025]} />
        <meshStandardMaterial color="#d6ff00" emissive="#d6ff00" emissiveIntensity={4} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function GymScene() {
  return (
    <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [4.9, 2.1, 6.9], fov: 38 }}>
      <PerspectiveCamera makeDefault position={[4.9, 2.1, 6.9]} fov={38} />
      <color attach="background" args={['#070707']} />
      <ambientLight intensity={0.42} />
      <spotLight position={[4, 6, 4]} intensity={120} angle={0.34} penumbra={0.9} distance={15} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-5, 2, 1]} intensity={45} color="#d6ff00" angle={0.5} penumbra={1} distance={10} />
      <pointLight position={[0, 1, -4]} intensity={16} color="#b7c700" />
      <SceneContent />
      <ContactShadows position={[0, -1.34, 0]} opacity={0.72} scale={8} blur={2.8} far={4.5} />
      <Environment preset="warehouse" environmentIntensity={0.3} />
    </Canvas>
  );
}
