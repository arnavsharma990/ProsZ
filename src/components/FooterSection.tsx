import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <section id="footer" className="py-16 md:py-24 relative overflow-hidden bg-secondary-black">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 245, 245, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
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
              Contact Neoroxolabs
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Interested in Pros Hand V1.0? Get in touch for product inquiries, technical support, 
            or collaboration opportunities in affordable prosthetic technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4">NeuroxoLabs</h3>
            <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">
              Making advanced prosthetics affordable and accessible. 
              Empowering amputees with smart, responsive technology.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <motion.a
                href="https://neuroxolabs.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-color transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Globe size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/aaenterprice/Pros-hand-v1.0.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-color transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/ayush-sarkar-660b83284"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-color transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base md:text-lg font-semibold text-text-primary mb-4 md:mb-6">Contact Info</h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail size={16} className="text-accent-color" />
                <span className="text-sm md:text-base">info@neuroxolabs.in</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Phone size={16} className="text-accent-color" />
                <span className="text-sm md:text-base">+91 (Contact for details)</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin size={16} className="text-accent-color" />
                <span className="text-sm md:text-base">India</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base md:text-lg font-semibold text-text-primary mb-4 md:mb-6">Quick Links</h4>
            <div className="space-y-3 md:space-y-4">
              <a href="#hero" className="block text-text-secondary hover:text-accent-color transition-colors duration-300 text-sm md:text-base">
                Product
              </a>
              <a href="#labeled" className="block text-text-secondary hover:text-accent-color transition-colors duration-300 text-sm md:text-base">
                Technology
              </a>
              <a href="#terminal" className="block text-text-secondary hover:text-accent-color transition-colors duration-300 text-sm md:text-base">
                Live Demo
              </a>
              <a href="https://github.com/aaenterprice/Pros-hand-v1.0.git" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block text-text-secondary hover:text-accent-color transition-colors duration-300 text-sm md:text-base">
                GitHub
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-border-color mt-12 md:mt-16 pt-6 md:pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-text-muted text-sm md:text-base">
            © 2024 Neoroxolabs. All rights reserved. | Pros Hand V1.0 - Advanced Affordable Prosthetics
          </p>
        </motion.div>
      </div>
    </section>
  );
};