import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { STLHandModel } from './3D/STLHandModel';
import { LoadingSpinner } from './LoadingSpinner';
import { ThreeJSErrorBoundary } from './ErrorBoundary';
import { SimpleEnvironment } from './3D/SimpleEnvironment';

const ComponentLabel: React.FC<{ position: [number, number, number]; title: string; description: string }> = ({
  position,
  title,
  description
}) => {
  return (
    <Html position={position} className="pointer-events-none">
      <motion.div
        className="bg-secondary-black/95 backdrop-blur-md border border-accent-color/40 rounded-xl p-6 md:p-8 min-w-[300px] md:min-w-[400px] lg:min-w-[500px] shadow-2xl hover:shadow-accent-color/30 transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.08, y: -8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-4 h-4 bg-accent-color rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <h4 className="text-accent-color font-bold mb-3 text-base md:text-xl lg:text-2xl">{title}</h4>
            <p className="text-text-secondary text-sm md:text-base lg:text-lg leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-secondary-black/95" />
      </motion.div>
    </Html>
  );
};

export const LabeledModelSection: React.FC = () => {
  const components = [
    {
      position: [3.5, 2.5, 0.5] as [number, number, number],
      title: "Servo Motors (MG90/DS3218)",
      description: "5 individual servo motors controlled by MediaPipe angle calculations"
    },
    {
      position: [-3.5, 1.5, 0.8] as [number, number, number],
      title: "3D Printed Frame",
      description: "Recycled ABS plastic for sustainability and affordability"
    },
    {
      position: [0, 1.0, 1.5] as [number, number, number],
      title: "MediaPipe AI",
      description: "Real-time hand landmark detection and angle calculation"
    },
    {
      position: [0, -2.5, 0.8] as [number, number, number],
      title: "Arduino Uno Controller",
      description: "Receives serial data from Python and controls servo motors"
    },
    {
      position: [-2.0, -0.5, 1.2] as [number, number, number],
      title: "Webcam Integration",
      description: "640x480 resolution for hand gesture recognition"
    }
  ];

  return (
    <section id="technology" className="section-padding bg-gradient-accent">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 245, 245, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-fluid relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8">
            <span className="text-gradient">
              Product Technology
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover the innovative technology powering Pros Hand V1.0. Our proof-of-concept 
            demonstrates how affordable components can create life-changing prosthetic solutions.
          </p>
        </motion.div>

        <motion.div
          className="h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[600px] 2xl:h-[700px] relative bg-accent-gray/20 rounded-lg backdrop-blur-sm border border-border-color shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ThreeJSErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 10], fov: 30 }}
              className="rounded-lg"
              shadows
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              {/* Professional lighting setup */}
              <ambientLight intensity={0.4} color="#f0f8ff" />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1.6} 
                castShadow 
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              <directionalLight 
                position={[-10, -10, -5]} 
                intensity={0.8} 
                color="#e6f3ff"
              />
              <pointLight 
                position={[0, 5, 5]} 
                intensity={0.6} 
                color="#ffffff"
              />
              <pointLight 
                position={[0, -5, -5]} 
                intensity={0.4} 
                color="#0066cc"
              />
              
              <Suspense fallback={null}>
                <STLHandModel gltfPath="/models/hand.stl.gltf" scale={4.0} />
                <SimpleEnvironment />
                
                {/* Component Labels */}
              {components.map((component, index) => (
                <ComponentLabel
                  key={index}
                  position={component.position}
                  title={component.title}
                  description={component.description}
                />
              ))}
            </Suspense>
            
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={8}
              maxDistance={20}
              autoRotate
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
          </ThreeJSErrorBoundary>
          
          <Suspense fallback={<LoadingSpinner />}>
            <div />
          </Suspense>
        </motion.div>

        {/* Component Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "MediaPipe FPS", value: "30" },
            { label: "Hand Landmarks", value: "21" },
            { label: "Finger Joints", value: "5" },
            { label: "Serial Baud", value: "9600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-3 sm:p-4 md:p-6 lg:p-8 bg-secondary-black border border-border-color"
              whileHover={{ scale: 1.02, borderColor: "#f5f5f5" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-accent-color mb-1 sm:mb-2 md:mb-3">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};