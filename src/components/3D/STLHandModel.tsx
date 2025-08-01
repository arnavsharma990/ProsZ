import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { Mesh, BufferGeometry } from 'three';
import { Environment } from '@react-three/drei';

interface STLHandModelProps {
  stlPath?: string;
  color?: string;
  scale?: number;
}

export const STLHandModel: React.FC<STLHandModelProps> = ({ 
  stlPath = '/models/hand.stl', 
  color = '#2a2a2a',
  scale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Try to load STL file, fallback to default geometry if not found
  useEffect(() => {
    const loadSTL = async () => {
      try {
        const loader = new STLLoader();
        const geometry = await loader.loadAsync(stlPath);
        setGeometry(geometry);
      } catch (err) {
        console.warn('STL file not found, using default geometry');
        setError('STL file not found');
      }
    };
    
    loadSTL();
  }, [stlPath]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // If STL loading failed, use default prosthetic hand
  if (error) {
    return <DefaultProstheticHand />;
  }

  if (!geometry) {
    return null; // Loading state
  }

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={[scale, scale, scale]}
    >
      <primitive object={geometry} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8} 
        roughness={0.2}
        emissive="#001122"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

// Default prosthetic hand component (fallback)
const DefaultProstheticHand: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Main Hand Body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.5, 0.8]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Fingers */}
      {[...Array(5)].map((_, i) => (
        <group key={i} position={[-0.6 + i * 0.3, 1.2, 0.2]}>
          {/* Finger segments */}
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[0, j * 0.4, 0]}>
              <boxGeometry args={[0.15, 0.35, 0.15]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                metalness={0.9} 
                roughness={0.1}
                emissive="#002244"
                emissiveIntensity={0.05}
              />
            </mesh>
          ))}
          
          {/* Finger joints */}
          {[...Array(2)].map((_, j) => (
            <mesh key={j} position={[0, 0.2 + j * 0.4, 0]}>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial 
                color="#00aaff" 
                metalness={0.8} 
                roughness={0.1}
                emissive="#0066cc"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Thumb */}
      <group position={[-1, 0.5, 0.4]} rotation={[0, 0, Math.PI / 4]}>
        {[...Array(2)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.3, 0]}>
            <boxGeometry args={[0.15, 0.25, 0.15]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#002244"
              emissiveIntensity={0.05}
            />
          </mesh>
        ))}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial 
            color="#00aaff" 
            metalness={0.8} 
            roughness={0.1}
            emissive="#0066cc"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Wrist/Connection Point */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#333333" 
          metalness={0.7} 
          roughness={0.3}
          emissive="#004400"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Status Lights */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.4 + i * 0.4, -0.5, 0.45]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial 
            color={i === 0 ? "#00ff00" : i === 1 ? "#ffaa00" : "#ff0000"}
            emissive={i === 0 ? "#00ff00" : i === 1 ? "#ffaa00" : "#ff0000"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}; 