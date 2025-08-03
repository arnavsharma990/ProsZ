import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { OrbitControls, Environment, Text } from '@react-three/drei';

const ProstheticHand: React.FC = () => {
  const handRef = useRef<Group>(null);
  const fingerRefs = useRef<Group[]>([]);
  const thumbRef = useRef<Group>(null);
  const [animationMode, setAnimationMode] = useState<'idle' | 'grip' | 'wave'>('idle');
  const [batteryLevel, setBatteryLevel] = useState(85);

  // Simulate battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 0.1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (handRef.current) {
      // Gentle breathing animation
      handRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
      handRef.current.position.y = Math.sin(time * 0.5) * 0.02;
    }

    // Animate fingers based on mode
    fingerRefs.current.forEach((finger, index) => {
      if (finger) {
        switch (animationMode) {
          case 'grip':
            finger.rotation.x = -Math.PI / 6 + Math.sin(time * 2 + index) * 0.1;
            break;
          case 'wave':
            finger.rotation.x = Math.sin(time * 3 + index * 0.5) * 0.2;
            break;
          default:
            finger.rotation.x = Math.sin(time * 0.8 + index * 0.3) * 0.05;
        }
      }
    });

    // Animate thumb
    if (thumbRef.current) {
      thumbRef.current.rotation.z = Math.PI / 4 + Math.sin(time * 0.6) * 0.1;
    }
  });

  const FingerSegment: React.FC<{ 
    position: [number, number, number], 
    scale?: number,
    isJoint?: boolean
  }> = ({ position, scale = 1, isJoint = false }) => (
    <mesh position={position}>
      {isJoint ? (
        <sphereGeometry args={[0.08 * scale]} />
      ) : (
        <capsuleGeometry args={[0.07 * scale, 0.3 * scale]} />
      )}
      <meshPhysicalMaterial
        color={isJoint ? "#0088ff" : "#1a1a1a"}
        metalness={isJoint ? 0.9 : 0.8}
        roughness={isJoint ? 0.1 : 0.2}
        emissive={isJoint ? "#0044aa" : "#001122"}
        emissiveIntensity={isJoint ? 0.4 : 0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );

  const StatusLight: React.FC<{ 
    position: [number, number, number], 
    color: string,
    intensity: number
  }> = ({ position, color, intensity }) => (
    <mesh position={position}>
      <sphereGeometry args={[0.04]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        transparent
        opacity={0.9}
      />
      <pointLight
        position={position}
        color={color}
        intensity={intensity * 0.5}
        distance={0.5}
      />
    </mesh>
  );

  return (
    <group ref={handRef}>
      {/* Main Hand Palm */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 2.2, 0.6]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.3}
          emissive="#001122"
          emissiveIntensity={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Hand Back Detail */}
      <mesh position={[0, 0.2, 0.35]}>
        <boxGeometry args={[1.2, 1.8, 0.1]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.9}
          roughness={0.1}
          emissive="#002244"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Fingers */}
      {[...Array(4)].map((_, i) => (
        <group 
          key={i} 
          ref={el => fingerRefs.current[i] = el!}
          position={[-0.45 + i * 0.3, 1.1, 0.1]}
        >
          {/* Finger segments */}
          <FingerSegment position={[0, 0.15, 0]} />
          <FingerSegment position={[0, 0.5, 0]} scale={0.9} />
          <FingerSegment position={[0, 0.8, 0]} scale={0.8} />
          
          {/* Finger joints */}
          <FingerSegment position={[0, 0.32, 0]} isJoint scale={0.8} />
          <FingerSegment position={[0, 0.65, 0]} isJoint scale={0.7} />
          
          {/* Fingertip */}
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.06]} />
            <meshPhysicalMaterial
              color="#0088ff"
              metalness={0.9}
              roughness={0.1}
              emissive="#0044aa"
              emissiveIntensity={0.3}
              clearcoat={1}
            />
          </mesh>
        </group>
      ))}

      {/* Thumb */}
      <group 
        ref={thumbRef}
        position={[-0.8, 0.3, 0.3]} 
        rotation={[0, 0, Math.PI / 4]}
      >
        <FingerSegment position={[0, 0.1, 0]} scale={1.2} />
        <FingerSegment position={[0, 0.4, 0]} />
        <FingerSegment position={[0, 0.25, 0]} isJoint />
        
        {/* Thumb tip */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.07]} />
          <meshPhysicalMaterial
            color="#0088ff"
            metalness={0.9}
            roughness={0.1}
            emissive="#0044aa"
            emissiveIntensity={0.3}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Wrist Assembly */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.65, 0.55, 0.6]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.7}
          roughness={0.3}
          emissive="#004400"
          emissiveIntensity={0.1}
          clearcoat={0.3}
        />
      </mesh>

      {/* Wrist Connection Ring */}
      <mesh position={[0, -1.7, 0]}>
        <torusGeometry args={[0.6, 0.08]} />
        <meshPhysicalMaterial
          color="#555555"
          metalness={0.9}
          roughness={0.1}
          emissive="#002200"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Status Lights */}
      <StatusLight 
        position={[-0.3, -0.5, 0.35]} 
        color="#00ff00" 
        intensity={batteryLevel > 20 ? 0.8 : 0.3} 
      />
      <StatusLight 
        position={[0, -0.5, 0.35]} 
        color="#ffaa00" 
        intensity={0.6} 
      />
      <StatusLight 
        position={[0.3, -0.5, 0.35]} 
        color={batteryLevel < 20 ? "#ff0000" : "#444444"} 
        intensity={batteryLevel < 20 ? 0.8 : 0.1} 
      />

      {/* Power Cable Port */}
      <mesh position={[0.5, -1.3, 0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2]} />
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Circuit Details */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          -0.4 + (i % 3) * 0.4, 
          0.8 - Math.floor(i / 3) * 0.3, 
          0.32
        ]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshPhysicalMaterial
            color="#004488"
            emissive="#002244"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Brand Text */}
      <Text
        position={[0, -0.8, 0.32]}
        fontSize={0.08}
        color="#00aaff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-medium.woff"
      >
        CYBORG v3.1
      </Text>
    </group>
  );
};

const Scene: React.FC = () => {
  const [animationMode, setAnimationMode] = useState<'idle' | 'grip' | 'wave'>('idle');

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h2 className="text-white text-lg font-bold mb-2">Prosthetic Hand Control</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setAnimationMode('idle')}
            className={`px-3 py-1 rounded text-sm ${
              animationMode === 'idle' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            Idle
          </button>
          <button
            onClick={() => setAnimationMode('grip')}
            className={`px-3 py-1 rounded text-sm ${
              animationMode === 'grip' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            Grip
          </button>
          <button
            onClick={() => setAnimationMode('wave')}
            className={`px-3 py-1 rounded text-sm ${
              animationMode === 'wave' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            Wave
          </button>
        </div>
      </div>

      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
        
        <ProstheticHand />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <Environment preset="city" />
        
        <fog attach="fog" args={['#001122', 8, 20]} />
      </Canvas>
    </div>
  );
};

export default Scene;