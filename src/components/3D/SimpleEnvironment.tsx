import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const SimpleEnvironment: React.FC = () => {
  const { scene } = useThree();

  React.useEffect(() => {
    // Set a simple background color instead of HDR environment
    scene.background = null;
    
    // Add some ambient lighting
    const ambientLight = scene.getObjectByName('ambient-light');
    if (!ambientLight) {
      const light = new THREE.AmbientLight(0x404040, 0.6);
      light.name = 'ambient-light';
      scene.add(light);
    }
  }, [scene]);

  return null;
}; 