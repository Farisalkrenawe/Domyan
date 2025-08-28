import React, { Component, ErrorInfo, ReactNode } from 'react';

interface MobileErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface MobileErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class MobileErrorBoundary extends Component<MobileErrorBoundaryProps, MobileErrorBoundaryState> {
  constructor(props: MobileErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): MobileErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Mobile Error Boundary caught an error:', error, errorInfo);
    
    // Log additional mobile-specific information
    if (typeof window !== 'undefined') {
      console.error('Mobile Debug Info:', {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.screen.orientation?.type || 'unknown'
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="text-4xl font-bold text-green-gradient mb-4">DOMYAN</div>
            <p className="text-muted-foreground mb-4">
              Mobile rendering issue detected. Please refresh the page or try again.
            </p>
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined })} 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
            <div className="mt-4 text-xs text-muted-foreground">
              Error: {this.state.error?.message || 'Unknown error'}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MobileErrorBoundary;
