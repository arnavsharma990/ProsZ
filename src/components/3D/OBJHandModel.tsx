import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { Group } from 'three';

interface OBJHandModelProps {
  objPath?: string;
  mtlPath?: string;
  scale?: number;
}

export const OBJHandModel: React.FC<OBJHandModelProps> = ({ 
  objPath = '/models/hand.obj', 
  mtlPath = '/models/hand.mtl',
  scale = 1 
}) => {
  const groupRef = useRef<Group>(null);
  const [model, setModel] = useState<Group | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Try to load OBJ file
  useEffect(() => {
    const loadOBJ = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading OBJ file from:', objPath);
        
        const objLoader = new OBJLoader();
        
        // Try to load with material file first
        try {
          const mtlLoader = new MTLLoader();
          const materials = await mtlLoader.loadAsync(mtlPath);
          materials.preload();
          objLoader.setMaterials(materials);
          console.log('MTL materials loaded successfully');
        } catch (mtlError) {
          console.log('No MTL file found, using default materials');
        }
        
        const object = await objLoader.loadAsync(objPath);
        console.log('OBJ file loaded successfully:', object);
        setModel(object);
      } catch (err) {
        console.error('Error loading OBJ file:', err);
        setError(err instanceof Error ? err.message : 'OBJ file not found');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOBJ();
  }, [objPath, mtlPath]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Show loading state
  if (isLoading) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#666666" 
          metalness={0.5} 
          roughness={0.5}
        />
      </mesh>
    );
  }

  // If OBJ loading failed, use default prosthetic hand
  if (error) {
    console.log('Using default prosthetic hand due to error:', error);
    return <DefaultProstheticHand />;
  }

  if (!model) {
    console.log('No model available, showing default hand');
    return <DefaultProstheticHand />;
  }

  console.log('Rendering OBJ model:', model);
  return (
    <primitive 
      ref={groupRef}
      object={model} 
      position={[0, 0, 0]}
      scale={[scale, scale, scale]}
    />
  );
};

// Default prosthetic hand component (fallback)
const DefaultProstheticHand: React.FC = () => {
  const meshRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main Hand Body */}
      <mesh position={[0, 0, 0]}>
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