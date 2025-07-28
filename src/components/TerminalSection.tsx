import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Terminal, Play, Square, Code, Cpu, Camera } from 'lucide-react';

export const TerminalSection: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);
  
  const terminalLogs = [
    "$ python pros_hand_training.py",
    "> Initializing MediaPipe Hands...",
    "> Setting up webcam (640x480)... [OK]",
    "> Opening serial port COM10... [OK]",
    "> Loading finger joint configurations...",
    "> Starting hand landmark detection...",
    "> Processing frame: Hand detected",
    "> Calculating finger angles...", 
    "> Thumb: 45°, Index: 120°, Middle: 90°",
    "> Ring: 75°, Pinky: 60°",
    "> Sending to Arduino: $45,120,90,75,60",
    "> Arduino response: Motors updated",
    "$ pros-hand --status",
    "> MediaPipe: ACTIVE",
    "> Webcam: Connected (30 FPS)",
    "> Serial: COM10 (9600 baud)",
    "> All systems operational",
    "$ _"
  ];

  useEffect(() => {
    if (isActive && currentLog < terminalLogs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLog(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isActive, currentLog, terminalLogs.length]);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setCurrentLog(0);
    } else {
      setIsActive(true);
    }
  };

  return (
    <section id="demo" className="section-padding bg-gradient-dark">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 245, 245, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
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
              AI Training System
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Real-time MediaPipe hand tracking with Arduino integration. Watch as AI processes 
            hand gestures and converts them to servo motor commands for precise prosthetic control.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Terminal Header */}
          <div className="bg-secondary-black rounded-none border border-border-color p-3 md:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Terminal className="text-accent-color" size={16} />
              <span className="text-accent-color font-mono font-semibold text-sm md:text-base">Neoroxolabs AI Training Terminal v1.0</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-black rounded-none border-l border-r border-b border-border-color p-4 md:p-6 min-h-[300px] md:min-h-[400px] font-mono text-xs md:text-sm">
            <div className="text-accent-color mb-4">
              Welcome to Neoroxolabs AI Training System
              <br />
              MediaPipe + Arduino Integration Active
              <br />
              <br />
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {terminalLogs.slice(0, currentLog + 1).map((log, index) => (
                    <motion.div
                      key={index}
                      className={`mb-2 ${
                        log.startsWith('$') 
                          ? 'text-accent-color' 
                          : log.includes('[OK]') 
                          ? 'text-green-400'
                          : log.includes('ACTIVE')
                          ? 'text-green-400'
                          : log.includes('Connected')
                          ? 'text-blue-400'
                          : log.includes('°')
                          ? 'text-yellow-400'
                          : log.includes('Arduino')
                          ? 'text-purple-400'
                          : 'text-text-secondary'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {index === currentLog && index < terminalLogs.length - 1 ? (
                        <Typewriter
                          words={[log]}
                          loop={1}
                          cursor={false}
                          typeSpeed={40}
                        />
                      ) : (
                        log
                      )}
                      {index === currentLog && log.includes('$_') && (
                        <motion.span
                          className="text-accent-color"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ▋
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!isActive && (
              <div className="text-text-muted">
                AI Training System ready. Click "Start Training" to begin MediaPipe hand tracking.
                <motion.span
                  className="text-accent-color ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ▋
                </motion.span>
              </div>
            )}
          </div>

          {/* Control Panel */}
          <div className="mt-6 md:mt-8 flex justify-center">
            <motion.button
              onClick={handleToggle}
              className={`flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 rounded-none font-semibold transition-all duration-300 text-sm md:text-base ${
                isActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-accent-color hover:bg-white text-primary-black'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive ? <Square size={16} /> : <Play size={16} />}
              <span>{isActive ? 'Stop Training' : 'Start Training'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* System Status Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { title: "MediaPipe AI", status: "Processing", color: "green", icon: Cpu },
            { title: "Webcam Feed", status: "Active", color: "accent", icon: Camera },
            { title: "Arduino Link", status: "Connected", color: "yellow", icon: Code }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-secondary-black border border-border-color p-4 md:p-6"
              whileHover={{ scale: 1.02, borderColor: "#f5f5f5" }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-2">
                  <item.icon size={16} className="text-accent-color" />
                  <h3 className="text-base md:text-lg font-semibold text-text-primary">{item.title}</h3>
                </div>
                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                  item.color === 'green' ? 'bg-green-500' :
                  item.color === 'accent' ? 'bg-accent-color' : 'bg-yellow-500'
                } animate-pulse`} />
              </div>
              <p className={`font-mono text-xs md:text-sm ${
                item.color === 'green' ? 'text-green-400' :
                item.color === 'accent' ? 'text-accent-color' : 'text-yellow-400'
              }`}>
                Status: {item.status}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Code Preview */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-secondary-black border border-border-color p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4">Training Code Preview</h3>
            <div className="bg-black p-4 rounded-none font-mono text-xs md:text-sm overflow-x-auto">
              <pre className="text-text-secondary">
{`import cv2
import mediapipe as mp
import serial
import time

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, 
                      min_detection_confidence=0.7)

# Setup Arduino communication
ser = serial.Serial('COM10', 9600, timeout=1)

# Finger joint configurations
finger_joints = [
    (2, 3, 4),   # Thumb
    (5, 6, 8),   # Index
    (9, 10, 12), # Middle
    (13, 14, 16),# Ring
    (17, 18, 20) # Pinky
]

# Real-time processing loop
while cap.isOpened():
    ret, frame = cap.read()
    results = hands.process(rgb)
    
    if results.multi_hand_landmarks:
        # Calculate finger angles
        angles = calculate_angles(hand_landmarks)
        
        # Send to Arduino
        serial_data = f"$" + ",".join(map(str, angles)) + "\\n"
        ser.write(serial_data.encode())`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};