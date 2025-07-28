import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ProstheticHand } from './3D/ProstheticHand';
import { LoadingSpinner } from './LoadingSpinner';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="section-padding relative overflow-hidden bg-gradient-dark">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 245, 245, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="container-fluid">
        <div className="flex-responsive justify-between items-center">
          {/* Text Content */}
          <motion.div
            className="text-center md:text-left flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-gradient">
                Pros Hand
              </span>
              <br />
              <span className="text-text-primary">V1.0</span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Revolutionary prosthetic hand combining MediaPipe AI vision, real-time hand tracking, 
              and Arduino robotics. Built with Python, OpenCV, and 3D printed components for 
              precise gesture-controlled prosthetic movement.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="btn-primary text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Technology
              </motion.button>
              <motion.button
                className="btn-secondary text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] relative flex-1 mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="rounded-none border border-border-color"
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f5f5f5" />
              
              <Suspense fallback={null}>
                <ProstheticHand />
                <Environment preset="studio" />
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.75}
                  scale={8}
                  blur={2.5}
                  far={4}
                />
              </Suspense>
              
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={8}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            
            {/* Loading Overlay */}
            <Suspense fallback={<LoadingSpinner />}>
              <div />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-4 h-6 md:w-6 md:h-10 border border-accent-color rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-accent-color rounded-full mt-1 md:mt-2" />
        </div>
      </motion.div>
    </section>
  );
};