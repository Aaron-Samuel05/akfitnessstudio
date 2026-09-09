'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Barbell({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, Math.PI / 2] as [number, number, number] }) {
  return <group position={position} rotation={rotation}>
    <mesh><cylinderGeometry args={[0.055,0.055,5.2,24]}/><meshStandardMaterial color="#b7b7b7" metalness={.9} roughness={.24}/></mesh>
    {[-2.25,-1.95,-1.65,1.65,1.95,2.25].map((x,i)=><mesh key={i} position={[0,x,0]}><cylinderGeometry args={[.22,.22,.15,32]}/><meshStandardMaterial color={i%3===0?'#181818':'#303030'} metalness={.75} roughness={.3}/></mesh>)}
  </group>
}
function Rack({ position }: {position:[number,number,number]}) {
  return <group position={position}>
    {[-1.05,1.05].map(x=><mesh key={x} position={[x,1.15,0]}><boxGeometry args={[.1,2.5,.1]}/><meshStandardMaterial color="#171717" metalness={.65} roughness={.25}/></mesh>)}
    <mesh position={[0,2.25,0]}><boxGeometry args={[2.2,.1,.1]}/><meshStandardMaterial color="#171717" metalness={.65} roughness={.25}/></mesh>
    <Barbell position={[0,1.65,0]} rotation={[0,0,Math.PI/2]}/>
  </group>
}
function SceneContent() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ mouse, clock }) => { if (!group.current) return; group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x*.16, .035); group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y*.055, .035); group.current.position.y = Math.sin(clock.elapsedTime*.55)*.045; });
  return <group ref={group}>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.28,0]}><planeGeometry args={[14,14]}/><meshStandardMaterial color="#080808" roughness={.82} metalness={.08}/></mesh>
    <Rack position={[-1.15,-1.25,0]}/><Rack position={[1.35,-1.25,-.7]}/>
    <Barbell position={[0,-.2,-1.2]} rotation={[0,0,Math.PI/2]}/>
    <Float speed={1.1} rotationIntensity={.15} floatIntensity={.35}><mesh position={[0,1.7,-1.1]} rotation={[0,.2,.1]}><boxGeometry args={[1.1,.5,.3]}/><meshStandardMaterial color="#d6ff00" emissive="#8cae00" emissiveIntensity={.08} metalness={.2} roughness={.4}/></mesh></Float>
    <mesh position={[0,-.35,-2.5]}><boxGeometry args={[6,.08,.08]}/><meshStandardMaterial color="#d6ff00" emissive="#d6ff00" emissiveIntensity={2.2}/></mesh>
  </group>
}
export default function GymScene(){ return <Canvas dpr={[1,1.5]} gl={{antialias:true,alpha:true}}><PerspectiveCamera makeDefault position={[5,2.6,6.7]} fov={37}/><ambientLight intensity={.45}/><spotLight position={[2,6,4]} intensity={90} angle={.38} penumbra={.9} distance={13}/><pointLight position={[-4,1,2]} intensity={18}/><SceneContent/><ContactShadows position={[0,-1.26,0]} opacity={.65} scale={8} blur={2.5} far={4}/><Environment preset="city" environmentIntensity={.22}/></Canvas> }
