import React from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LabeledModelSection } from './components/LabeledModelSection';
import { SensorDashboard } from './components/SensorDashboard';
import { DeviceControl } from './components/DeviceControl';
import { TerminalSection } from './components/TerminalSection';
import { FooterSection } from './components/FooterSection';

function App() {
  return (
    <div className="min-h-screen bg-primary-black text-text-primary overflow-x-hidden font-inter">
      <Navigation />
      <HeroSection />
      <LabeledModelSection />
      <SensorDashboard />
      <DeviceControl />
      <TerminalSection />
      <FooterSection />
    </div>
  );
}

export default App;