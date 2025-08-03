import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Product', href: '#hero' },
    { name: 'Technology', href: '#core-technologies' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Control', href: '#control' },
    { name: 'Team', href: '#about-team' },
    { name: 'Demo', href: '#demo' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-primary-black/90 backdrop-blur-xl border-b border-border-color' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div
            className="text-xl sm:text-2xl font-bold text-text-primary"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Neuroxo<span className="text-accent-color">Labs</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm lg:text-base text-text-secondary hover:text-text-primary font-medium transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-color group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <motion.button
              className="bg-accent-color text-primary-black px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base font-medium hover:bg-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary hover:text-accent-color p-2 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-4 pb-6 space-y-4 bg-primary-black/95 backdrop-blur-xl rounded-2xl mt-4 border border-border-color">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-text-secondary hover:text-text-primary font-medium py-2 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="w-full bg-accent-color text-primary-black px-6 py-3 font-medium hover:bg-white transition-colors duration-300 mt-4">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};