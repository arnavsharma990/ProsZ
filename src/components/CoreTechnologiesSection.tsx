import React from 'react';
import { motion } from 'framer-motion';

export const CoreTechnologiesSection: React.FC = () => {
  const technologies = [
    {
      id: 1,
      title: "ESP32 – The Control Hub",
      description: "The ESP32 microcontroller serves as the central processing unit of our prosthetic hand. It manages all sensor data, handles signal processing, and enables seamless wireless communication. Its high-speed performance and low power consumption make it ideal for real-time prosthetic control.",
      icon: "🔌",
      color: "from-blue-500 to-cyan-500",
      features: ["Real-time processing", "Wireless communication", "Low power consumption"]
    },
    {
      id: 2,
      title: "Bio Amp Patchy v0.2 – Muscle Signal Decoder",
      description: "This sensor captures electromyographic (EMG) signals from the user's muscles, translating them into precise motor commands. It allows the prosthetic hand to interpret natural muscle movements, enabling responsive and intuitive control based on user intent.",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      features: ["EMG signal processing", "Muscle movement detection", "Intuitive control"]
    },
    {
      id: 3,
      title: "MAX30102 & Heartbeat Pulse Sensor – Health Integration",
      description: "The MAX30102 and additional pulse sensors monitor physiological metrics such as heart rate and blood oxygen saturation (SpO2). These inputs allow future versions of the hand to adapt to the user's physical condition, ensuring smarter, health-aware prosthetic functionality.",
      icon: "❤️",
      color: "from-red-500 to-orange-500",
      features: ["Heart rate monitoring", "SpO2 tracking", "Health-aware adaptation"]
    }
  ];

  return (
    <section id="core-technologies" className="section-padding bg-gradient-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(245, 245, 245, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245, 245, 245, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '200px 200px'
        }} />
      </div>

      <div className="container-fluid relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
            <span className="text-gradient">Core Technologies</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Advanced hardware components working in harmony to create the most intelligent prosthetic hand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-secondary-black/80 backdrop-blur-md border border-border-color rounded-2xl p-8 h-full transition-all duration-500 hover:border-accent-color/50 hover:shadow-2xl hover:shadow-accent-color/20 group-hover:transform group-hover:scale-105">
                {/* Icon Container */}
                <motion.div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${tech.color} flex items-center justify-center text-2xl md:text-3xl mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {tech.icon}
                </motion.div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-text-primary leading-tight">
                  {tech.title}
                </h3>
                
                {/* Description */}
                <p className="text-text-secondary leading-relaxed mb-6 text-sm md:text-base">
                  {tech.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent-color rounded-full"></div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-border-color">
                  <span className="text-sm text-accent-color font-medium">
                    Active Component
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Info */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-secondary-black/60 backdrop-blur-md border border-border-color rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-color to-purple-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
              🔗
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">
              Seamless Integration
            </h3>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              All three core technologies work together in real-time, creating a responsive and intelligent prosthetic system that adapts to user needs and environmental conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 