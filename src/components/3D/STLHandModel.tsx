import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

interface STLHandModelProps {
  color?: string;
  scale?: number;
}

export const STLHandModel: React.FC<STLHandModelProps> = ({ 
  color = '#1a1a1a',
  scale = 1 
}) => {
  const [error, setError] = useState<string | null>(null);

  // Memoize materials to prevent recreation
  const materials = useMemo(() => ({
    base: {
      color: "#1a1a1a",
      metalness: 0.9,
      roughness: 0.1,
      emissive: "#001a33",
      emissiveIntensity: 0.05
    },
    accent: {
      color: "#0066cc",
      metalness: 0.8,
      roughness: 0.2,
      emissive: "#003366",
      emissiveIntensity: 0.3
    }
  }), []);

  // Use simplified prosthetic hand directly
  return <SimplifiedProstheticHand />;
};

// Simplified prosthetic hand for better performance
const SimplifiedProstheticHand: React.FC = () => {
  const handRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (handRef.current) {
      handRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
      handRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.01;
    }
  });

  return (
    <group ref={handRef}>
      {/* Main Hand Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 2.8, 1]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#001a33"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Fingers - Simplified */}
      {[...Array(4)].map((_, i) => (
        <group key={i} position={[-0.7 + i * 0.45, 1.4, 0.2]}>
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[0, j * 0.35, 0]} castShadow>
              <boxGeometry args={[0.12, 0.3, 0.12]} />
              <meshStandardMaterial 
                color="#1a1a1a"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Thumb */}
      <group position={[-1.2, 0.3, 0.4]} rotation={[0, 0, Math.PI / 3]}>
        {[...Array(2)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.25, 0]} castShadow>
            <boxGeometry args={[0.12, 0.22, 0.12]} />
            <meshStandardMaterial 
              color="#1a1a1a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Wrist */}
      <group position={[0, -1.6, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.6, 0.6]} />
          <meshStandardMaterial 
            color="#333333"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Status Lights */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.5 + i * 0.5, -0.3, 0.55]} castShadow>
          <sphereGeometry args={[0.04]} />
          <meshStandardMaterial 
            color={i === 0 ? "#00ff88" : i === 1 ? "#ffaa00" : "#ff4444"}
            emissive={i === 0 ? "#00ff88" : i === 1 ? "#ffaa00" : "#ff4444"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}; 