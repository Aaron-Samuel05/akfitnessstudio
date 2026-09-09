'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Focus = 'barbell' | 'plate' | 'dumbbell' | 'rack';

type Props = { focus?: Focus };

function Plate({ radius = 0.82, thickness = 0.18, accent = false }: { radius?: number; thickness?: number; accent?: boolean }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, radius * 0.19, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.045, bevelThickness: 0.035, curveSegments: 64 });
  }, [radius, thickness]);

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#11110f" metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, thickness * 0.55]} rotation={[0, 0, 0]}>
        <torusGeometry args={[radius * 0.7, radius * 0.045, 16, 96]} />
        <meshStandardMaterial color={accent ? '#d6ff00' : '#3b3b37'} metalness={0.86} roughness={0.2} emissive={accent ? '#6b8000' : '#000'} emissiveIntensity={accent ? 0.22 : 0} />
      </mesh>
      <mesh position={[0, 0, thickness * 0.58]}>
        <torusGeometry args={[radius * 0.19, radius * 0.035, 12, 48]} />
        <meshStandardMaterial color="#9a9a91" metalness={0.9} roughness={0.17} />
      </mesh>
    </group>
  );
}

function Barbell({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow><cylinderGeometry args={[0.045, 0.045, 5.8, 48]} /><meshStandardMaterial color="#a7a79e" metalness={0.98} roughness={0.16} /></mesh>
      {[-2.42, -2.12, -1.82, 1.82, 2.12, 2.42].map((x, i) => <group key={x} position={[0, x, 0]}><Plate radius={i % 3 === 0 ? 0.82 : i % 3 === 1 ? 0.68 : 0.56} accent={i === 0 || i === 5} /></group>)}
      {[-2.72, 2.72].map((x) => <mesh key={x} position={[0, x, 0]} castShadow><cylinderGeometry args={[0.105, 0.105, 0.2, 40]} /><meshStandardMaterial color="#d6ff00" metalness={0.7} roughness={0.2} emissive="#667900" emissiveIntensity={0.2} /></mesh>)}
      {[-1.45, -1.25, -1.05, -0.85, 0.85, 1.05, 1.25, 1.45].map((x) => <mesh key={x} position={[0, x, 0]}><torusGeometry args={[0.058, 0.012, 8, 24]} /><meshStandardMaterial color="#55554f" metalness={0.9} roughness={0.22} /></mesh>)}
    </group>
  );
}

function Dumbbell() {
  return (
    <group rotation={[0.2, 0.25, 0.15]}>
      <mesh castShadow><cylinderGeometry args={[0.075, 0.075, 1.55, 40]} /><meshStandardMaterial color="#a6a69d" metalness={0.96} roughness={0.18} /></mesh>
      {[-0.72, -0.54, -0.36, 0.36, 0.54, 0.72].map((y, i) => <mesh key={y} position={[0, y, 0]} castShadow><cylinderGeometry args={[i % 3 === 0 ? 0.36 : 0.31, i % 3 === 0 ? 0.36 : 0.31, 0.13, 40]} /><meshStandardMaterial color={i === 0 || i === 5 ? '#d6ff00' : '#141412'} metalness={0.76} roughness={0.22} emissive={i === 0 || i === 5 ? '#5f7100' : '#000'} emissiveIntensity={0.18} /></mesh>)}
    </group>
  );
}

function Rack() {
  return (
    <group>
      {[-1.35, 1.35].map((x) => <group key={x} position={[x, 0, 0]}>
        <mesh position={[0, 0.6, 0]} castShadow><boxGeometry args={[0.14, 3.0, 0.14]} /><meshStandardMaterial color="#0b0b0a" metalness={0.88} roughness={0.2} /></mesh>
        <mesh position={[0, 2.05, 0]} castShadow><boxGeometry args={[0.14, 0.14, 2.4]} /><meshStandardMaterial color="#0b0b0a" metalness={0.88} roughness={0.2} /></mesh>
        <mesh position={[0, -0.88, 0]} castShadow><boxGeometry args={[0.28, 0.08, 2.8]} /><meshStandardMaterial color="#11110f" metalness={0.72} roughness={0.28} /></mesh>
      </group>)}
      <Barbell scale={0.82} />
      <mesh position={[0, -0.95, 0]} receiveShadow><boxGeometry args={[3.4, 0.07, 2.3]} /><meshStandardMaterial color="#151513" roughness={0.88} metalness={0.04} /></mesh>
    </group>
  );
}

function SceneContent({ focus }: Props) {
  const root = useRef<THREE.Group>(null);
  const object = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!root.current || !object.current) return;
    const target = focus === 'rack' ? [0, -0.05, 0] : [0, 0.05, 0];
    const scale = focus === 'rack' ? 0.92 : focus === 'plate' ? 1.38 : focus === 'dumbbell' ? 1.22 : 1.08;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, mouse.x * 0.34 + Math.sin(clock.elapsedTime * 0.28) * 0.08, 4.2, 1 / 60);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -mouse.y * 0.13, 4.2, 1 / 60);
    object.current.position.x = THREE.MathUtils.damp(object.current.position.x, target[0] + mouse.x * 0.12, 4.5, 1 / 60);
    object.current.position.y = THREE.MathUtils.damp(object.current.position.y, target[1] + Math.sin(clock.elapsedTime * 0.75) * 0.035, 4.5, 1 / 60);
    object.current.scale.setScalar(THREE.MathUtils.damp(object.current.scale.x, scale, 4.5, 1 / 60));
  });

  return <group ref={root}>
    <Float speed={1.1} rotationIntensity={0.025} floatIntensity={0.08}>
      <group ref={object}>
        {focus === 'plate' ? <Plate radius={1.12} thickness={0.24} accent /> : focus === 'dumbbell' ? <Dumbbell /> : focus === 'rack' ? <Rack /> : <Barbell />}
      </group>
    </Float>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#080807" roughness={0.86} metalness={0.08} /></mesh>
  </group>;
}

export default function GymScene({ focus = 'barbell' }: Props) {
  return <Canvas shadows dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.35, 6.4], fov: 32 }}>
    <PerspectiveCamera makeDefault position={[0, 0.35, 6.4]} fov={32} />
    <color attach="background" args={['#070707']} />
    <ambientLight intensity={0.25} />
    <spotLight position={[3.8, 5.5, 4]} intensity={95} angle={0.3} penumbra={0.85} distance={14} castShadow shadow-mapSize={[1024, 1024]} />
    <spotLight position={[-3.5, 2.5, 2]} intensity={35} color="#d6ff00" angle={0.45} penumbra={1} distance={10} />
    <pointLight position={[0, 1.5, -3]} intensity={22} color="#c4d400" />
    <SceneContent focus={focus} />
    <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={7} blur={2.5} far={4.2} />
    <Environment preset="studio" environmentIntensity={0.55} />
  </Canvas>;
}
