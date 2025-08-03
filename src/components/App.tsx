import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load heavy components
const LabeledModelSection = lazy(() => import('./components/LabeledModelSection').then(module => ({ default: module.LabeledModelSection })));
const CoreTechnologiesSection = lazy(() => import('./components/CoreTechnologiesSection').then(module => ({ default: module.CoreTechnologiesSection })));
const CoreArchitectureSection = lazy(() => import('./components/CoreArchitectureSection').then(module => ({ default: module.CoreArchitectureSection })));
const SensorDashboard = lazy(() => import('./components/SensorDashboard').then(module => ({ default: module.SensorDashboard })));
const DeviceControl = lazy(() => import('./components/DeviceControl').then(module => ({ default: module.DeviceControl })));
const AboutTeamSection = lazy(() => import('./components/AboutTeamSection').then(module => ({ default: module.AboutTeamSection })));
const FooterSection = lazy(() => import('./components/FooterSection').then(module => ({ default: module.FooterSection })));
const ThemeToggle = lazy(() => import('./components/ThemeToggle').then(module => ({ default: module.ThemeToggle })));

// Scroll to top button component
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-accent-color text-primary-black p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary-black text-text-primary overflow-x-hidden font-inter transition-colors duration-300">
        <Suspense fallback={<LoadingSpinner />}>
          <ThemeToggle />
        </Suspense>
        <Navigation />
        <HeroSection />
        
        <Suspense fallback={<LoadingSpinner />}>
          <LabeledModelSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <CoreTechnologiesSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <CoreArchitectureSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <SensorDashboard />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <DeviceControl />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <AboutTeamSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <FooterSection />
        </Suspense>

        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App; 