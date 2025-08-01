import React from 'react';
import { motion } from 'framer-motion';

export const CoreTechnologiesSection: React.FC = () => {
  const technologies = [
    {
      id: 1,
      title: "ESP32 – The Control Hub",
      description: "The ESP32 microcontroller serves as the central processing unit of our prosthetic hand. It manages all sensor data, handles signal processing, and enables seamless wireless communication. Its high-speed performance and low power consumption make it ideal for real-time prosthetic control.",
      icon: "🔌",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Bio Amp Patchy v0.2 – Muscle Signal Decoder",
      description: "This sensor captures electromyographic (EMG) signals from the user's muscles, translating them into precise motor commands. It allows the prosthetic hand to interpret natural muscle movements, enabling responsive and intuitive control based on user intent.",
      icon: "⚡",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "MAX30102 & Heartbeat Pulse Sensor – Health Integration",
      description: "The MAX30102 and additional pulse sensors monitor physiological metrics such as heart rate and blood oxygen saturation (SpO2). These inputs allow future versions of the hand to adapt to the user's physical condition, ensuring smarter, health-aware prosthetic functionality.",
      icon: "❤️",
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <section id="core-technologies" className="section-padding bg-gradient-dark">
      <div className="container-fluid">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Core Technologies</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Advanced hardware components working in harmony to create the most intelligent prosthetic hand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-card-bg border border-border-color rounded-xl p-4 sm:p-6 lg:p-8 h-full transition-all duration-300 hover:border-accent-color hover:shadow-lg hover:shadow-accent-color/10 group-hover:transform group-hover:scale-105">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r ${tech.color} flex items-center justify-center text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6`}>
                  {tech.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-text-primary">
                  {tech.title}
                </h3>
                
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {tech.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-border-color">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent-color font-medium">
                      Active Component
                    </span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-card-bg border border-border-color rounded-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-text-primary">
              Seamless Integration
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
              All three core technologies work together in real-time, creating a responsive and intelligent prosthetic system that adapts to user needs and environmental conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 