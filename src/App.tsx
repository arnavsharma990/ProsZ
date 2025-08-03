import React, { Suspense, lazy } from 'react';
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
      </div>
    </ThemeProvider>
  );
}

export default App;