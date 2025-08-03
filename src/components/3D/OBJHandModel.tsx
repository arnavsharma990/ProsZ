import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const ProstheticImage = () => {
  return (
    <Canvas style={{ height: '100vh', background: '#000' }}>
      <Html center>
        <img
          src="https://texteditor.pro/assets/TextEditorPro.png"
          alt="Prosthetic Hand"
          className="w-[300px] rounded-xl shadow-lg"
        />
      </Html>
    </Canvas>
  );
};

export default ProstheticImage;