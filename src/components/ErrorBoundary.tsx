import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex items-center justify-center h-full min-h-[200px] bg-secondary-black border border-border-color rounded-lg">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              3D Model Loading Error
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Unable to load the 3D environment. This might be due to network issues or missing resources.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-accent-color text-primary-black font-medium hover:bg-white transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specialized Error Boundary for Three.js components
export class ThreeJSErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Only catch Three.js related errors
    if (error.message.includes('Failed to fetch') || 
        error.message.includes('Could not load') ||
        error.message.includes('THREE.WebGLRenderer')) {
      return { hasError: true, error };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('ThreeJS ErrorBoundary caught an error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full min-h-[200px] bg-secondary-black border border-border-color rounded-lg">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🎮</div>
            <p className="text-sm text-text-secondary">
              3D environment loading...
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 