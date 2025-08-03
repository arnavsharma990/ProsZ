import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Battery, 
  Wifi, 
  Cpu, 
  Thermometer, 
  Zap,
  Signal,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Square
} from 'lucide-react';

export const SensorDashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState({
    emgSignal: 75,
    batteryLevel: 87,
    temperature: 23.5,
    connectionStatus: 'connected',
    fingerAngles: [90, 45, 120, 30, 75],
    responseTime: 12,
    accuracy: 94.2,
    cpuUsage: 23,
    memoryUsage: 45,
    uptime: { hours: 2, minutes: 34 },
    emgPeak: 90,
    emgAverage: 60,
    voltage: 3.7,
    fps: 30,
    latency: 12
  });

  const [isConnected, setIsConnected] = useState(true);
  const [isSimulating, setIsSimulating] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(1000); // 1 second

  // Enhanced real-time data simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSensorData(prev => {
        // Simulate realistic EMG signal variations
        const emgVariation = (Math.random() - 0.5) * 15;
        const newEmgSignal = Math.max(20, Math.min(100, prev.emgSignal + emgVariation));
        
        // Simulate battery drain
        const batteryDrain = Math.random() * 0.02;
        const newBatteryLevel = Math.max(0, prev.batteryLevel - batteryDrain);
        
        // Simulate temperature changes
        const tempVariation = (Math.random() - 0.5) * 0.8;
        const newTemperature = Math.max(18, Math.min(35, prev.temperature + tempVariation));
        
        // Simulate finger movements based on EMG activity
        const fingerVariation = (Math.random() - 0.5) * 8;
        const newFingerAngles = prev.fingerAngles.map(angle => {
          const variation = (Math.random() - 0.5) * 6;
          return Math.max(0, Math.min(180, angle + variation));
        });
        
        // Simulate performance metrics
        const newResponseTime = Math.max(8, Math.min(25, prev.responseTime + (Math.random() - 0.5) * 3));
        const newAccuracy = Math.max(85, Math.min(99, prev.accuracy + (Math.random() - 0.5) * 1.5));
        
        // Simulate system metrics
        const newCpuUsage = Math.max(15, Math.min(40, prev.cpuUsage + (Math.random() - 0.5) * 5));
        const newMemoryUsage = Math.max(30, Math.min(60, prev.memoryUsage + (Math.random() - 0.5) * 3));
        
        // Update uptime
        const newUptime = { ...prev.uptime };
        newUptime.minutes += 1;
        if (newUptime.minutes >= 60) {
          newUptime.hours += 1;
          newUptime.minutes = 0;
        }
        
        // Calculate derived values
        const newEmgPeak = Math.max(newEmgSignal, prev.emgPeak * 0.95);
        const newEmgAverage = (prev.emgAverage * 0.9 + newEmgSignal * 0.1);
        const newVoltage = newBatteryLevel > 20 ? 3.7 : Math.max(3.0, 3.7 - (87 - newBatteryLevel) * 0.01);
        const newFps = newCpuUsage < 30 ? 30 : Math.max(15, 30 - (newCpuUsage - 30) * 0.5);
        const newLatency = newResponseTime;

        return {
          ...prev,
          emgSignal: newEmgSignal,
          batteryLevel: newBatteryLevel,
          temperature: newTemperature,
          fingerAngles: newFingerAngles,
          responseTime: newResponseTime,
          accuracy: newAccuracy,
          cpuUsage: newCpuUsage,
          memoryUsage: newMemoryUsage,
          uptime: newUptime,
          emgPeak: newEmgPeak,
          emgAverage: newEmgAverage,
          voltage: newVoltage,
          fps: newFps,
          latency: newLatency
        };
      });
    }, simulationSpeed);

    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'connecting': return 'text-yellow-400';
      case 'disconnected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} className="text-green-400" />;
      case 'connecting': return <AlertCircle size={16} className="text-yellow-400" />;
      case 'disconnected': return <XCircle size={16} className="text-red-400" />;
      default: return <XCircle size={16} className="text-gray-400" />;
    }
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const changeSimulationSpeed = (speed: number) => {
    setSimulationSpeed(speed);
  };

  return (
    <section id="dashboard" className="section-padding bg-gradient-dark">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
            <span className="text-gradient">Real-Time Sensor Dashboard</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Live monitoring of Pros Hand V1.0's vital sensors and performance metrics. 
            Track EMG signals, battery status, temperature, and finger positioning in real-time.
          </p>
        </motion.div>

        {/* Simulation Controls */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={toggleSimulation}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 ${
              isSimulating 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isSimulating ? <Square size={16} /> : <Play size={16} />}
            <span>{isSimulating ? 'Stop Simulation' : 'Start Simulation'}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Speed:</span>
            <select
              value={simulationSpeed}
              onChange={(e) => changeSimulationSpeed(Number(e.target.value))}
              className="bg-secondary-black border border-border-color text-text-primary px-3 py-2 rounded-lg text-sm"
            >
              <option value={500}>Fast (0.5s)</option>
              <option value={1000}>Normal (1s)</option>
              <option value={2000}>Slow (2s)</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-text-secondary">
              {isSimulating ? 'Live Data' : 'Paused'}
            </span>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          
          {/* EMG Signal Monitor */}
          <motion.div
            className="bg-secondary-black/80 backdrop-blur-md border border-border-color p-6 md:p-8 h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-3">
                <Activity size={20} className="text-accent-color" />
                <h3 className="text-lg md:text-xl font-semibold text-text-primary">EMG Signal</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary">Active</span>
              </div>
            </div>
            
            <div className="mb-4 md:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl md:text-3xl font-bold text-text-primary">{sensorData.emgSignal.toFixed(0)}%</span>
                <span className="text-sm text-text-secondary">Signal Strength</span>
              </div>
              <div className="w-full bg-accent-gray rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-accent-color h-3 rounded-full"
                  style={{ width: `${sensorData.emgSignal}%` }}
                  animate={{ width: `${sensorData.emgSignal}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
              <div>
                <span className="text-text-secondary">Peak:</span>
                <span className="text-text-primary ml-2">{sensorData.emgPeak.toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-text-secondary">Avg:</span>
                <span className="text-text-primary ml-2">{sensorData.emgAverage.toFixed(0)}%</span>
              </div>
            </div>
          </motion.div>

          {/* Battery Status */}
          <motion.div
            className="bg-secondary-black/80 backdrop-blur-md border border-border-color p-6 md:p-8 h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-3">
                <Battery size={20} className="text-accent-color" />
                <h3 className="text-lg md:text-xl font-semibold text-text-primary">Battery Status</h3>
              </div>
              <div className="flex items-center space-x-2">
                {sensorData.batteryLevel > 20 ? (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                )}
                <span className="text-sm text-text-secondary">
                  {sensorData.batteryLevel > 20 ? 'Good' : 'Low'}
                </span>
              </div>
            </div>
            
            <div className="mb-4 md:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl md:text-3xl font-bold text-text-primary">{sensorData.batteryLevel.toFixed(0)}%</span>
                <span className="text-sm text-text-secondary">Remaining</span>
              </div>
              <div className="w-full bg-accent-gray rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    sensorData.batteryLevel > 50 ? 'bg-green-400' :
                    sensorData.batteryLevel > 20 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${sensorData.batteryLevel}%` }}
                  animate={{ width: `${sensorData.batteryLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
              <div>
                <span className="text-text-secondary">Voltage:</span>
                <span className="text-text-primary ml-2">{sensorData.voltage.toFixed(1)}V</span>
              </div>
              <div>
                <span className="text-text-secondary">Temp:</span>
                <span className="text-text-primary ml-2">{sensorData.temperature.toFixed(1)}°C</span>
              </div>
            </div>
          </motion.div>

          {/* Connection Status */}
          <motion.div
            className="bg-secondary-black/80 backdrop-blur-md border border-border-color p-6 md:p-8 h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-3">
                <Wifi size={20} className="text-accent-color" />
                <h3 className="text-lg md:text-xl font-semibold text-text-primary">Connection</h3>
              </div>
              {getStatusIcon(sensorData.connectionStatus)}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu size={16} className="text-green-400" />
                  <span className="text-sm text-text-secondary">Arduino</span>
                </div>
                <CheckCircle size={16} className="text-green-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Signal size={16} className="text-green-400" />
                  <span className="text-sm text-text-secondary">EMG Sensor</span>
                </div>
                <CheckCircle size={16} className="text-green-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap size={16} className="text-green-400" />
                  <span className="text-sm text-text-secondary">MediaPipe</span>
                </div>
                <CheckCircle size={16} className="text-green-400" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border-color">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Response Time:</span>
                <span className="text-sm font-semibold text-text-primary">{sensorData.responseTime.toFixed(1)}ms</span>
              </div>
            </div>
          </motion.div>

          {/* Finger Angles */}
          <motion.div
            className="bg-secondary-black/80 backdrop-blur-md border border-border-color p-6 md:p-8 h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-3">
                <Activity size={20} className="text-accent-color" />
                <h3 className="text-lg md:text-xl font-semibold text-text-primary">Finger Positions</h3>
              </div>
              <span className="text-sm text-text-secondary">Real-time</span>
            </div>
            
            <div className="space-y-3">
              {['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((finger, index) => (
                <div key={finger} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary w-16">{finger}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-accent-gray rounded-full h-2">
                      <motion.div
                        className="bg-accent-color h-2 rounded-full"
                        style={{ width: `${(sensorData.fingerAngles[index] / 180) * 100}%` }}
                        animate={{ width: `${(sensorData.fingerAngles[index] / 180) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-text-primary w-12 text-right">
                    {sensorData.fingerAngles[index].toFixed(0)}°
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            className="bg-secondary-black/80 backdrop-blur-md border border-border-color p-6 md:p-8 h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-3">
                <Cpu size={20} className="text-accent-color" />
                <h3 className="text-lg md:text-xl font-semibold text-text-primary">Performance</h3>
              </div>
              <span className="text-sm text-text-secondary">Live</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">Accuracy</span>
                  <span className="text-sm font-semibold text-text-primary">{sensorData.accuracy.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-accent-gray rounded-full h-2">
                  <motion.div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${sensorData.accuracy}%` }}
                    animate={{ width: `${sensorData.accuracy}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">FPS</span>
                  <span className="text-sm font-semibold text-text-primary">{sensorData.fps.toFixed(0)}</span>
                </div>
                <div className="w-full bg-accent-gray rounded-full h-2">
                  <motion.div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: `${(sensorData.fps / 30) * 100}%` }}
                    animate={{ width: `${(sensorData.fps / 30) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">Latency</span>
                  <span className="text-sm font-semibold text-text-primary">{sensorData.latency.toFixed(1)}ms</span>
                </div>
                <div className="w-full bg-accent-gray rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      sensorData.latency < 15 ? 'bg-green-400' : 'bg-yellow-400'
                    }`}
                    style={{ width: `${Math.max(20, (25 - sensorData.latency) * 4)}%` }}
                    animate={{ width: `${Math.max(20, (25 - sensorData.latency) * 4)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Health */}
          <motion.div
            className="bg-secondary-black/80 backdrop-blur-md border border-border-color p-6 md:p-8 h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-3">
                <Thermometer size={20} className="text-accent-color" />
                <h3 className="text-lg md:text-xl font-semibold text-text-primary">System Health</h3>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Temperature</span>
                <span className="text-sm font-semibold text-text-primary">{sensorData.temperature.toFixed(1)}°C</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">CPU Usage</span>
                <span className="text-sm font-semibold text-text-primary">{sensorData.cpuUsage.toFixed(0)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Memory</span>
                <span className="text-sm font-semibold text-text-primary">{sensorData.memoryUsage.toFixed(0)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Uptime</span>
                <span className="text-sm font-semibold text-text-primary">
                  {sensorData.uptime.hours}h {sensorData.uptime.minutes}m
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border-color">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm text-text-secondary">All systems operational</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connection Toggle */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
              isConnected 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isConnected ? 'Disconnect Device' : 'Connect Device'}
          </button>
          <p className="text-sm text-text-secondary mt-2">
            {isConnected ? 'Device is connected and streaming data' : 'Device is disconnected'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 