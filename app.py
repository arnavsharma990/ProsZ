from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import sys
import threading
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Global variable to track demo process
demo_process = None

@app.route('/')
def home():
    return jsonify({
        "message": "Pros Hand V1.0 Backend Server",
        "status": "running",
        "endpoints": {
            "run_demo": "/run-demo",
            "stop_demo": "/stop-demo",
            "status": "/status"
        }
    })

@app.route('/run-demo', methods=['GET'])
def run_demo():
    global demo_process
    
    try:
        # Check if demo is already running
        if demo_process and demo_process.poll() is None:
            return jsonify({
                "success": False,
                "message": "Demo is already running!",
                "status": "running"
            }), 400
        
        # Get the current directory
        current_dir = os.getcwd()
        demo_script_path = os.path.join(current_dir, "demo.py")
        
        # Check if demo.py exists
        if not os.path.exists(demo_script_path):
            return jsonify({
                "success": False,
                "message": "demo.py not found! Please ensure the file exists.",
                "status": "error"
            }), 404
        
        # Try to open VS Code first (optional)
        try:
            vs_code_process = subprocess.Popen(["code", "."], 
                                             stdout=subprocess.PIPE, 
                                             stderr=subprocess.PIPE)
            time.sleep(1)  # Give VS Code a moment to open
        except Exception as e:
            print(f"VS Code opening failed: {e}")
            # Continue anyway, this is optional
        
        # Run the demo script
        demo_process = subprocess.Popen([sys.executable, "demo.py"],
                                       stdout=subprocess.PIPE,
                                       stderr=subprocess.PIPE,
                                       cwd=current_dir)
        
        return jsonify({
            "success": True,
            "message": "Demo started successfully! Camera should open shortly.",
            "status": "started",
            "pid": demo_process.pid
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error starting demo: {str(e)}",
            "status": "error"
        }), 500

@app.route('/stop-demo', methods=['GET'])
def stop_demo():
    global demo_process
    
    try:
        if demo_process and demo_process.poll() is None:
            demo_process.terminate()
            demo_process.wait(timeout=5)
            return jsonify({
                "success": True,
                "message": "Demo stopped successfully!",
                "status": "stopped"
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "No demo process running!",
                "status": "not_running"
            }), 400
            
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error stopping demo: {str(e)}",
            "status": "error"
        }), 500

@app.route('/status', methods=['GET'])
def get_status():
    global demo_process
    
    if demo_process:
        is_running = demo_process.poll() is None
        return jsonify({
            "success": True,
            "status": "running" if is_running else "stopped",
            "pid": demo_process.pid if is_running else None
        }), 200
    else:
        return jsonify({
            "success": True,
            "status": "not_running",
            "pid": None
        }), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": time.time()
    }), 200

if __name__ == '__main__':
    print("🚀 Starting Pros Hand V1.0 Backend Server...")
    print("📍 Server will run on: http://localhost:8000")
    print("🔗 Frontend can connect to: http://localhost:8000/run-demo")
    print("⏹️  Stop demo at: http://localhost:8000/stop-demo")
    print("📊 Check status at: http://localhost:8000/status")
    print("\n🎬 Ready to launch the Live Demo!")
    
    app.run(host='0.0.0.0', port=8000, debug=True) 