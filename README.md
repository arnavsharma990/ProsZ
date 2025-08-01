# Pros Hand V1.0 🦾

Revolutionary prosthetic hand combining MediaPipe AI vision, real-time hand tracking, and Arduino robotics. Built with Python, OpenCV, and 3D printed components for precise gesture-controlled prosthetic movement.

## 🚀 Features

- **3D STL Model Integration**: Load and display custom STL files for realistic prosthetic hand visualization
- **Responsive Design**: Fully responsive UI that works on all devices
- **Live Demo**: Real-time hand tracking with MediaPipe and OpenCV
- **Core Technologies**: ESP32, Bio Amp Patchy, MAX30102 sensors
- **Multi-layered Architecture**: Hardware, Firmware, Software, and AI/ML layers
- **User Spectrum**: Designed for amputees, medical professionals, researchers, and developers

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Three.js** for 3D graphics
- **Framer Motion** for animations
- **Tailwind CSS** for styling

### Backend/Demo
- **Python 3.8+**
- **OpenCV** for computer vision
- **MediaPipe** for hand tracking
- **NumPy** for numerical operations

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd ProsZ

# Install dependencies
npm install

# Start development server
npm run dev
```

### Python Demo Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the live demo
python demo.py
```

## 🎮 Usage

### Web Application
1. Open `http://localhost:5174` in your browser
2. Navigate through different sections:
   - **Hero Section**: Main introduction with 3D model
   - **Core Technologies**: ESP32, Bio Amp Patchy, MAX30102
   - **Core Architecture**: Multi-layered system design
   - **User Spectrum**: Target user groups
   - **Product Technology**: Detailed component breakdown

### Live Demo
1. Click "Live Demo" button on the website
2. Install Python dependencies: `pip install -r requirements.txt`
3. Run: `python demo.py`
4. Camera will open for hand tracking
5. Perform gestures to see real-time recognition
6. Press 'q' to quit

## 🎯 Gesture Recognition

The demo recognizes these hand gestures:
- **Fist**: Close grip command
- **Open Hand**: Open grip command  
- **Point**: Point gesture
- **Peace**: Peace sign
- **Three**: Three fingers
- **Four**: Four fingers
- **Thumbs Up**: Thumbs up gesture
- **Pinky**: Pinky finger
- **Rock On**: Rock on gesture

## 🏗️ Project Structure

```
ProsZ/
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── STLHandModel.tsx      # STL file loader
│   │   │   └── ProstheticHand.tsx    # Default 3D model
│   │   ├── CoreTechnologiesSection.tsx
│   │   ├── CoreArchitectureSection.tsx
│   │   ├── UserSpectrumSection.tsx
│   │   ├── HeroSection.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── models/                       # STL files directory
├── demo.py                           # Python demo script
├── requirements.txt                  # Python dependencies
└── package.json
```

## 🔧 Customization

### Adding STL Files
1. Place your STL files in `public/models/`
2. Update the `stlPath` prop in components:
   ```tsx
   <STLHandModel stlPath="/models/your-hand.stl" />
   ```

### Modifying Gesture Recognition
Edit `demo.py` to add new gestures:
```python
gestures = {
    "00000": "Fist",
    "11111": "Open Hand",
    # Add your custom gestures here
}
```

## 🎨 Design Features

- **Dark Theme**: Professional dark UI with accent colors
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **3D Interactions**: Rotate, zoom, and explore 3D models
- **Real-time Updates**: Live sensor data visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **MediaPipe**: Google's hand tracking technology
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **OpenCV**: Computer vision library
- **ESP32**: Espressif's microcontroller platform

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for the prosthetic community**