import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { Mesh, BufferGeometry, Color, Group } from 'three';
import { Environment } from '@react-three/drei';

interface STLHandModelProps {
  stlPath?: string;
  gltfPath?: string;
  color?: string;
  scale?: number;
}

export const STLHandModel: React.FC<STLHandModelProps> = ({ 
  stlPath = '/models/hand.stl', 
  gltfPath = '/models/hand.stl.gltf',
  color = '#1a1a1a',
  scale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const [gltfModel, setGltfModel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to load GLTF file first, then fallback to STL
  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        // Try GLTF first
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(gltfPath);
        setGltfModel(gltf);
        setLoading(false);
        console.log('GLTF model loaded successfully');
      } catch (gltfErr) {
        console.warn('GLTF file not found, trying STL');
        try {
          // Fallback to STL
          const stlLoader = new STLLoader();
          const geometry = await stlLoader.loadAsync(stlPath);
          setGeometry(geometry);
          setLoading(false);
          console.log('STL model loaded successfully');
        } catch (stlErr) {
          console.warn('Both GLTF and STL files not found, using default geometry');
          setError('Model files not found');
          setLoading(false);
        }
      }
    };
    
    loadModel();
  }, [gltfPath, stlPath]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
    }
  });

  // If GLTF model loaded, render it
  if (gltfModel && gltfModel.scene) {
    return (
      <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
        <primitive object={gltfModel.scene} />
        {/* Add extra lighting for the model */}
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#0066cc" />
      </group>
    );
  }

  // If STL loading failed, use default prosthetic hand
  if (error) {
    return <ProfessionalProstheticHand />;
  }

  if (loading) {
    return null; // Loading state
  }

  // Render STL geometry
  if (geometry) {
    return (
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        scale={[scale, scale, scale]}
      >
        <primitive object={geometry} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9} 
          roughness={0.1}
          emissive="#001a33"
          emissiveIntensity={0.05}
          envMapIntensity={1.2}
        />
      </mesh>
    );
  }

  return null;
};

// Professional prosthetic hand component (fallback)
const ProfessionalProstheticHand: React.FC = () => {
  const handRef = useRef<Mesh>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  useFrame((state) => {
    if (handRef.current) {
      handRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      handRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
    }
  });

  const baseMaterial = {
    color: "#1a1a1a",
    metalness: 0.9,
    roughness: 0.1,
    emissive: "#001a33",
    emissiveIntensity: 0.05
  };

  const accentMaterial = {
    color: "#0066cc",
    metalness: 0.8,
    roughness: 0.2,
    emissive: "#003366",
    emissiveIntensity: 0.3
  };

  const highlightMaterial = {
    color: "#00aaff",
    metalness: 0.7,
    roughness: 0.15,
    emissive: "#0066cc",
    emissiveIntensity: 0.5
  };

  return (
    <group ref={handRef}>
      {/* Main Hand Body - More sophisticated design */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 2.8, 1]} />
        <meshStandardMaterial 
          {...baseMaterial}
          color={hoveredPart === 'body' ? "#2a2a2a" : "#1a1a1a"}
        />
      </mesh>

      {/* Hand Surface Details */}
      <mesh position={[0, 0.5, 0.51]} castShadow>
        <boxGeometry args={[1.6, 1.8, 0.05]} />
        <meshStandardMaterial 
          color="#0d0d0d"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Fingers - More realistic design */}
      {[...Array(4)].map((_, i) => (
        <group key={i} position={[-0.7 + i * 0.45, 1.4, 0.2]}>
          {/* Finger segments with better proportions */}
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[0, j * 0.35, 0]} castShadow>
              <boxGeometry args={[0.12, 0.3, 0.12]} />
              <meshStandardMaterial 
                {...baseMaterial}
                color={hoveredPart === `finger-${i}` ? "#2a2a2a" : "#1a1a1a"}
              />
            </mesh>
          ))}
          
          {/* Finger joints with better design */}
          {[...Array(2)].map((_, j) => (
            <mesh key={j} position={[0, 0.175 + j * 0.35, 0]} castShadow>
              <sphereGeometry args={[0.07]} />
              <meshStandardMaterial 
                {...accentMaterial}
                color={hoveredPart === `joint-${i}` ? "#0088ff" : "#0066cc"}
              />
            </mesh>
          ))}

          {/* Finger tips */}
          <mesh position={[0, 1.05, 0]} castShadow>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial 
              color="#0d0d0d"
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
        </group>
      ))}

      {/* Thumb - More realistic positioning */}
      <group position={[-1.2, 0.3, 0.4]} rotation={[0, 0, Math.PI / 3]}>
        {[...Array(2)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.25, 0]} castShadow>
            <boxGeometry args={[0.12, 0.22, 0.12]} />
            <meshStandardMaterial 
              {...baseMaterial}
              color={hoveredPart === 'thumb' ? "#2a2a2a" : "#1a1a1a"}
            />
          </mesh>
        ))}
        <mesh position={[0, 0.125, 0]} castShadow>
          <sphereGeometry args={[0.07]} />
          <meshStandardMaterial {...accentMaterial} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial 
            color="#0d0d0d"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </group>

      {/* Wrist/Connection Point - More sophisticated */}
      <group position={[0, -1.6, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.6, 0.6]} />
          <meshStandardMaterial 
            color="#333333"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Wrist details */}
        <mesh position={[0, 0, 0.35]} castShadow>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshStandardMaterial 
            color="#0066cc"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Status Lights - More professional */}
      {[...Array(3)].map((_, i) => (
        <group key={i} position={[-0.5 + i * 0.5, -0.3, 0.55]}>
          <mesh castShadow>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial 
              color={i === 0 ? "#00ff88" : i === 1 ? "#ffaa00" : "#ff4444"}
              emissive={i === 0 ? "#00ff88" : i === 1 ? "#ffaa00" : "#ff4444"}
              emissiveIntensity={0.8}
            />
          </mesh>
          {/* Light glow effect */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial 
              color={i === 0 ? "#00ff88" : i === 1 ? "#ffaa00" : "#ff4444"}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Circuit patterns on hand surface */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[-0.4 + i * 0.2, 0.2, 0.53]} castShadow>
          <boxGeometry args={[0.1, 0.02, 0.01]} />
          <meshStandardMaterial 
            color="#0066cc"
            emissive="#003366"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Additional tech details */}
      <mesh position={[0.6, 0.8, 0.53]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.01]} />
        <meshStandardMaterial 
          color="#0d0d0d"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Ventilation holes */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-0.3 + i * 0.1, -0.5, 0.53]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.02]} />
          <meshStandardMaterial 
            color="#0d0d0d"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}; 