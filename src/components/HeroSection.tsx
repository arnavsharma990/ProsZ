import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStates, setButtonStates] = useState({
    viewTech: false,
    liveDemo: false
  });

  const scrollToTechnology = () => {
    setButtonStates(prev => ({ ...prev, viewTech: true }));
    
    // Find the technology section
    const techSection = document.getElementById('core-technologies');
    
    if (techSection) {
      // Calculate offset for fixed navigation (assuming nav height is ~80px)
      const navHeight = 80;
      const elementPosition = techSection.offsetTop - navHeight;
      
      // Add a visual feedback animation to the button
      const button = document.querySelector('[data-tech-button]') as HTMLElement;
      if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 150);
      }
      
      // Smooth scroll to the section
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Add a subtle highlight effect to the target section
      techSection.style.transition = 'all 0.3s ease';
      techSection.style.transform = 'scale(1.02)';
      techSection.style.boxShadow = '0 0 30px rgba(245, 245, 245, 0.2)';
      
      setTimeout(() => {
        techSection.style.transform = 'scale(1)';
        techSection.style.boxShadow = 'none';
        setButtonStates(prev => ({ ...prev, viewTech: false }));
      }, 1000);
    } else {
      // Fallback if section not found
      console.warn('Technology section not found');
      setButtonStates(prev => ({ ...prev, viewTech: false }));
    }
  };

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
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left flex-1 max-w-2xl lg:max-w-none"
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
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 md:mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Revolutionary prosthetic hand combining MediaPipe AI vision, real-time hand tracking, 
              and Arduino robotics. Built with Python, OpenCV, and 3D printed components for 
              precise gesture-controlled prosthetic movement.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                data-tech-button
                className="btn-primary text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent-color/20 w-full sm:w-auto min-w-[160px] md:min-w-[180px] relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTechnology}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-color/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <motion.span 
                    className="text-lg md:text-xl"
                    animate={{ rotate: buttonStates.viewTech ? [0, 360] : [0, 10, -10, 0] }}
                    transition={{ duration: buttonStates.viewTech ? 0.5 : 2, repeat: buttonStates.viewTech ? 0 : Infinity, repeatDelay: 3 }}
                  >
                    🔬
                  </motion.span>
                  <span>{buttonStates.viewTech ? 'Loading...' : 'View Technology'}</span>
                </span>
              </motion.button>

              <motion.button
                className="btn-secondary text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent-color/20 w-full sm:w-auto min-w-[160px] md:min-w-[180px] relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setButtonStates(prev => ({ ...prev, liveDemo: true }));
                  setIsLoading(true);
                  fetch('http://localhost:8000/run-demo')
                    .then(res => res.json())
                    .then(data => {
                      if (data.success) {
                        alert(`✅ ${data.message}`);
                      } else {
                        alert(`⚠️ ${data.message}`);
                      }
                    })
                    .catch(() => {
                      alert('❌ Failed to connect to backend.');
                    })
                    .finally(() => {
                      setIsLoading(false);
                      setTimeout(() => {
                        setButtonStates(prev => ({ ...prev, liveDemo: false }));
                      }, 1000);
                    });
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <motion.span 
                    className="text-lg md:text-xl"
                    animate={{ scale: isLoading ? [1, 1.3, 1] : [1, 1.1, 1], rotate: isLoading ? [0, 360] : [0, 5, -5, 0] }}
                    transition={{ duration: isLoading ? 0.8 : 2, repeat: Infinity, repeatDelay: 0 }}
                  >
                    {isLoading ? '⚡' : '🎬'}
                  </motion.span>
                  <span>{isLoading ? 'Starting Demo...' : 'Live Demo'}</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src="https://i.pinimg.com/736x/ae/7a/b2/ae7ab2b8d99e132ca3063a215a53e343.jpg" 
              alt="Prosthetic Hand Preview" 
              className="rounded-xl shadow-2xl border border-border-color object-contain w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
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
