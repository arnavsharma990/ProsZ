import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LabeledModelSection } from './components/LabeledModelSection';
import { CoreTechnologiesSection } from './components/CoreTechnologiesSection';
import { CoreArchitectureSection } from './components/CoreArchitectureSection';
import { SensorDashboard } from './components/SensorDashboard';
import { DeviceControl } from './components/DeviceControl';
import { AboutTeamSection } from './components/AboutTeamSection';
import { FooterSection } from './components/FooterSection';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary-black text-text-primary overflow-x-hidden font-inter transition-colors duration-300">
        <ThemeToggle />
        <Navigation />
        <HeroSection />
        <LabeledModelSection />
        <CoreTechnologiesSection />
        <CoreArchitectureSection />
        <SensorDashboard />
        <DeviceControl />
        <AboutTeamSection />
        <FooterSection />
      </div>
    </ThemeProvider>
  );
}

export default App;