import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Hand, 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  Zap,
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const DeviceControl: React.FC = () => {
  const [fingerAngles, setFingerAngles] = useState([90, 90, 90, 90, 90]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedGestures, setRecordedGestures] = useState<string[]>([]);

  const fingerNames = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

  const handleFingerChange = (fingerIndex: number, value: number) => {
    const newAngles = [...fingerAngles];
    newAngles[fingerIndex] = value;
    setFingerAngles(newAngles);
  };

  const handleGesture = (gesture: string) => {
    const gestureAngles = {
      'Open Hand': [180, 180, 180, 180, 180],
      'Closed Fist': [0, 0, 0, 0, 0],
      'Point': [90, 180, 0, 0, 0],
      'Peace Sign': [90, 180, 180, 0, 0],
      'Thumbs Up': [180, 0, 0, 0, 0],
      'Custom': fingerAngles
    };
    
    setFingerAngles(gestureAngles[gesture as keyof typeof gestureAngles] || fingerAngles);
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(0);
  };

  const nextCalibrationStep = () => {
    if (calibrationStep < 4) {
      setCalibrationStep(calibrationStep + 1);
    } else {
      setIsCalibrating(false);
      setCalibrationStep(0);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordedGestures([]);
    }
  };

  const resetToDefault = () => {
    setFingerAngles([90, 90, 90, 90, 90]);
  };

  return (
    <section id="control" className="section-padding bg-gradient-accent">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg text-gradient mb-6">Device Control Center</h2>
          <p className="body-lg text-text-secondary max-w-3xl mx-auto">
            Interactive testing and calibration interface for Pros Hand V1.0. 
            Control individual fingers, test gestures, and calibrate the system for optimal performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Virtual Hand Display */}
          <motion.div
            className="bg-secondary-black border border-border-color p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Hand size={24} className="text-accent-color" />
                <h3 className="text-xl font-semibold text-text-primary">Virtual Hand</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary">Live</span>
              </div>
            </div>

            {/* Hand Visualization */}
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64 bg-accent-gray rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <div className="text-sm text-text-secondary">Pros Hand V1.0</div>
                </div>
                
                {/* Finger indicators */}
                {fingerNames.map((finger, index) => (
                  <div
                    key={finger}
                    className="absolute text-xs text-accent-color font-mono"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: '20%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {fingerAngles[index]}°
                  </div>
                ))}
              </div>
            </div>

            {/* Current Angles Display */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {fingerNames.map((finger, index) => (
                <div key={finger} className="text-center">
                  <div className="text-xs text-text-secondary mb-1">{finger}</div>
                  <div className="text-lg font-bold text-text-primary">{fingerAngles[index]}°</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleGesture('Open Hand')}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-none hover:bg-green-700 transition-colors"
              >
                Open Hand
              </button>
              <button
                onClick={() => handleGesture('Closed Fist')}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-none hover:bg-red-700 transition-colors"
              >
                Close Fist
              </button>
              <button
                onClick={() => handleGesture('Point')}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-none hover:bg-blue-700 transition-colors"
              >
                Point
              </button>
              <button
                onClick={resetToDefault}
                className="px-4 py-2 bg-gray-600 text-white text-sm rounded-none hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            
            {/* Individual Finger Controls */}
            <div className="bg-secondary-black border border-border-color p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings size={20} className="text-accent-color" />
                <h3 className="text-lg font-semibold text-text-primary">Finger Controls</h3>
              </div>
              
              <div className="space-y-4">
                {fingerNames.map((finger, index) => (
                  <div key={finger} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">{finger}</span>
                      <span className="text-sm font-semibold text-text-primary">{fingerAngles[index]}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="180"
                      value={fingerAngles[index]}
                      onChange={(e) => handleFingerChange(index, parseInt(e.target.value))}
                      className="w-full h-2 bg-accent-gray rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>0°</span>
                      <span>90°</span>
                      <span>180°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calibration Panel */}
            <div className="bg-secondary-black border border-border-color p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Target size={20} className="text-accent-color" />
                <h3 className="text-lg font-semibold text-text-primary">Calibration</h3>
              </div>
              
              {isCalibrating ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={16} className="text-yellow-400" />
                    <span className="text-sm text-text-secondary">
                      Calibrating {fingerNames[calibrationStep]}...
                    </span>
                  </div>
                  <div className="w-full bg-accent-gray rounded-full h-2">
                    <div 
                      className="bg-accent-color h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((calibrationStep + 1) / 5) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={nextCalibrationStep}
                    className="w-full px-4 py-2 bg-accent-color text-black font-semibold rounded-none hover:bg-white transition-colors"
                  >
                    {calibrationStep < 4 ? 'Next Step' : 'Complete Calibration'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary">
                    Calibrate each finger for optimal performance and accuracy.
                  </p>
                  <button
                    onClick={startCalibration}
                    className="w-full px-4 py-2 bg-accent-color text-black font-semibold rounded-none hover:bg-white transition-colors"
                  >
                    Start Calibration
                  </button>
                </div>
              )}
            </div>

            {/* Gesture Recording */}
            <div className="bg-secondary-black border border-border-color p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Zap size={20} className="text-accent-color" />
                <h3 className="text-lg font-semibold text-text-primary">Gesture Recording</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Recording Status</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-400 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-text-secondary">
                      {isRecording ? 'Recording...' : 'Stopped'}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={toggleRecording}
                  className={`w-full px-4 py-2 font-semibold rounded-none transition-colors ${
                    isRecording 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isRecording ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Square size={16} />
                      <span>Stop Recording</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Play size={16} />
                      <span>Start Recording</span>
                    </div>
                  )}
                </button>
                
                {recordedGestures.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-text-primary mb-2">Recorded Gestures:</h4>
                    <div className="space-y-1">
                      {recordedGestures.map((gesture, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle size={12} className="text-green-400" />
                          <span className="text-text-secondary">{gesture}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-secondary-black border border-border-color p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle size={20} className="text-accent-color" />
                <h3 className="text-lg font-semibold text-text-primary">System Status</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Arduino Connection</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm text-text-secondary">Connected</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">EMG Sensor</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm text-text-secondary">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">MediaPipe AI</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm text-text-secondary">Processing</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Calibration</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm text-text-secondary">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 