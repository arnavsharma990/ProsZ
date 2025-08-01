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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Core Architecture</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Multi-layered system architecture ensuring robust, scalable, and intelligent prosthetic control
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {architectureComponents.map((component, index) => (
              <motion.div
                key={component.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`bg-card-bg border border-border-color rounded-xl p-4 sm:p-6 h-full transition-all duration-300 hover:border-accent-color hover:shadow-lg hover:shadow-accent-color/10`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${component.color} flex items-center justify-center text-lg sm:text-xl mb-3 sm:mb-4`}>
                    {component.icon}
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-text-primary">
                    {component.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
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
          className="bg-card-bg border border-border-color rounded-xl p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-text-primary text-center">
            Data Flow Architecture
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">
                📊
              </div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 text-text-primary">Input Processing</h4>
              <p className="text-xs sm:text-sm text-text-secondary">
                Sensor data collection and initial signal processing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">
                🔄
              </div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 text-text-primary">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-text-secondary">
                Machine learning algorithms and gesture recognition
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">
                🎯
              </div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 text-text-primary">Output Control</h4>
              <p className="text-xs sm:text-sm text-text-secondary">
                Motor control and actuator response
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 