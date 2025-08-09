'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error silently to prevent console pollution
    console.debug('ErrorBoundary caught an error:', error, errorInfo)
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI or nothing to prevent broken components from showing
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} />
      }
      
      // Return null to render nothing instead of broken component
      return null
    }

    return this.props.children
  }
}

// Simple fallback component
export const SimpleFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div className="p-4 text-center text-gray-500">
    <p>Something went wrong loading this component.</p>
    {process.env.NODE_ENV === 'development' && error && (
      <details className="mt-2 text-xs text-left">
        <summary>Error details (development only)</summary>
        <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
      </details>
    )}
  </div>
)

export default ErrorBoundary
