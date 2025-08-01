# 🚀 Pros Hand V1.0 - Complete Setup Guide

## 📋 **Prerequisites**
- Python 3.8+ installed
- Node.js 16+ installed
- VS Code (optional but recommended)
- Webcam for hand tracking demo

## 🛠️ **Quick Setup (Windows)**

### **Option 1: One-Click Setup**
1. **Double-click** `start_backend.bat` to start the Flask server
2. **Open new terminal** and run: `npm run dev`
3. **Visit** `http://localhost:5176` in your browser
4. **Click "Live Demo"** button to start hand tracking!

### **Option 2: Manual Setup**

#### **Step 1: Install Python Dependencies**
```bash
pip install -r requirements.txt
```

#### **Step 2: Start Flask Backend Server**
```bash
python app.py
```
**Expected Output:**
```
🚀 Starting Pros Hand V1.0 Backend Server...
📍 Server will run on: http://localhost:8000
🔗 Frontend can connect to: http://localhost:8000/run-demo
⏹️  Stop demo at: http://localhost:8000/stop-demo
📊 Check status at: http://localhost:8000/status

🎬 Ready to launch the Live Demo!
 * Running on http://0.0.0.0:8000
```

#### **Step 3: Start React Frontend**
```bash
npm run dev
```
**Expected Output:**
```
  VITE v4.5.14  ready in 366 ms
  ➜  Local:   http://localhost:5176/
  ➜  Network: use --host to expose
```

#### **Step 4: Test the Integration**
1. **Open** `http://localhost:5176` in your browser
2. **Scroll down** to the "Live Demo" button
3. **Click** the button to start hand tracking
4. **Camera should open** with hand tracking demo

## 🎮 **How It Works**

### **Backend (Flask Server)**
- **Port**: `8000`
- **Endpoints**:
  - `GET /run-demo` - Starts the hand tracking demo
  - `GET /stop-demo` - Stops the demo
  - `GET /status` - Check demo status
  - `GET /health` - Server health check

### **Frontend (React App)**
- **Port**: `5176` (or next available)
- **Integration**: Calls Flask backend via fetch API
- **Features**: Real-time communication with Python demo

### **Python Demo Script**
- **File**: `demo.py`
- **Features**: 
  - Hand tracking with MediaPipe
  - Gesture recognition
  - Real-time camera feed
  - Arduino communication simulation

## 🔧 **Troubleshooting**

### **Backend Issues**
```bash
# Check if Flask is running
curl http://localhost:8000/health

# Check demo status
curl http://localhost:8000/status

# Manual demo start
python demo.py
```

### **Frontend Issues**
```bash
# Check if React is running
curl http://localhost:5176

# Restart frontend
npm run dev
```

### **Common Problems**

#### **1. "Backend connection failed"**
- **Solution**: Make sure Flask server is running on port 8000
- **Check**: `python app.py` should show "Running on http://0.0.0.0:8000"

#### **2. "demo.py not found"**
- **Solution**: Ensure `demo.py` is in the same directory as `app.py`
- **Check**: `ls demo.py` or `dir demo.py`

#### **3. "Camera not opening"**
- **Solution**: Check webcam permissions and availability
- **Test**: Try running `python demo.py` directly

#### **4. "Port already in use"**
- **Solution**: Kill existing processes or use different ports
- **Commands**:
  ```bash
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -i :8000
  kill -9 <PID>
  ```

## 📁 **File Structure**
```
ProsZ/
├── app.py                 # Flask backend server
├── demo.py               # Hand tracking demo script
├── requirements.txt      # Python dependencies
├── start_backend.bat    # Windows startup script
├── package.json         # Node.js dependencies
├── src/
│   ├── App.tsx          # Main React app
│   └── components/
│       └── HeroSection.tsx  # Live Demo button
└── README.md
```

## 🎯 **API Endpoints**

### **Run Demo**
```bash
GET http://localhost:8000/run-demo
```
**Response:**
```json
{
  "success": true,
  "message": "Demo started successfully! Camera should open shortly.",
  "status": "started",
  "pid": 12345
}
```

### **Stop Demo**
```bash
GET http://localhost:8000/stop-demo
```
**Response:**
```json
{
  "success": true,
  "message": "Demo stopped successfully!",
  "status": "stopped"
}
```

### **Check Status**
```bash
GET http://localhost:8000/status
```
**Response:**
```json
{
  "success": true,
  "status": "running",
  "pid": 12345
}
```

## 🚀 **Advanced Usage**

### **Custom Ports**
```bash
# Backend on different port
python app.py --port 9000

# Frontend on different port
npm run dev -- --port 3000
```

### **Production Deployment**
```bash
# Build frontend
npm run build

# Serve with nginx/apache
# Backend with gunicorn
gunicorn app:app -w 4 -b 0.0.0.0:8000
```

## 🎉 **Success Indicators**
- ✅ Flask server shows "Ready to launch the Live Demo!"
- ✅ React app loads without errors
- ✅ "Live Demo" button responds to clicks
- ✅ Camera opens with hand tracking
- ✅ Hand gestures are detected in real-time

## 📞 **Support**
If you encounter issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Ensure ports 8000 and 5176 are available
4. Check webcam permissions and availability

**Happy coding! 🎮✨** 