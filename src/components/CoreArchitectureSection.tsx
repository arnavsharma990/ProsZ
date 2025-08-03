import React from 'react';
import { motion } from 'framer-motion';

export const CoreArchitectureSection: React.FC = () => {
  const architectureComponents = [
    {
      id: 1,
      title: "Hardware Layer",
      description: "ESP32 microcontroller, sensors (EMG, pulse, temperature), actuators, and power management system",
      icon: "🔧",
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      title: "Firmware Layer",
      description: "Real-time signal processing, sensor fusion, motor control algorithms, and wireless communication protocols",
      icon: "⚙️",
      color: "from-green-600 to-green-800"
    },
    {
      id: 3,
      title: "Software Layer",
      description: "Python-based AI vision system, MediaPipe integration, gesture recognition, and user interface",
      icon: "💻",
      color: "from-purple-600 to-purple-800"
    },
    {
      id: 4,
      title: "AI/ML Layer",
      description: "Machine learning models for gesture recognition, adaptive control algorithms, and predictive analytics",
      icon: "🤖",
      color: "from-orange-600 to-orange-800"
    }
  ];

  return (
    <section id="core-architecture" className="section-padding bg-gradient-dark">
      <div className="container-fluid">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
            <span className="text-gradient">Core Architecture</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Multi-layered system architecture ensuring robust, scalable, and intelligent prosthetic control
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          className="relative mb-16 md:mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {architectureComponents.map((component, index) => (
              <motion.div
                key={component.id}
                className="relative h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`bg-secondary-black/80 backdrop-blur-md border border-border-color rounded-xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:border-accent-color hover:shadow-lg hover:shadow-accent-color/10`}>
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${component.color} flex items-center justify-center text-lg md:text-xl mb-4 md:mb-6 flex-shrink-0`}>
                    {component.icon}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-text-primary flex-shrink-0">
                    {component.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed flex-grow">
                    {component.description}
                  </p>
                </div>
                
                {/* Connection Lines */}
                {index < architectureComponents.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-accent-color transform -translate-y-1/2 z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Flow Diagram */}
        <motion.div
          className="bg-secondary-black/80 backdrop-blur-md border border-border-color rounded-xl p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-text-primary text-center">
            Data Flow Architecture
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold mx-auto mb-4 md:mb-6">
                📊
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-text-primary">Input Processing</h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Sensor data collection and initial signal processing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold mx-auto mb-4 md:mb-6">
                🔄
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-text-primary">AI Analysis</h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Machine learning algorithms and gesture recognition
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold mx-auto mb-4 md:mb-6">
                🎯
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-text-primary">Output Control</h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Motor control and actuator response
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 