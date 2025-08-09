'use client'

import { useEffect } from 'react'

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Prevent the default browser behavior (console error)
      event.preventDefault()
      
      // Log silently in debug mode to avoid console pollution
      console.debug('Unhandled promise rejection:', event.reason)
      
      // Only show critical errors in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unhandled promise rejection (dev mode):', event.reason)
      }
    }

    // Handle uncaught errors
    const handleError = (event: ErrorEvent) => {
      // Prevent the default browser behavior for non-critical errors
      const errorMessage = event.message || ''
      
      // List of error messages to suppress (common third-party script errors)
      const suppressedErrors = [
        'Script error',
        'Non-Error promise rejection captured',
        'ResizeObserver loop limit exceeded',
        'ChunkLoadError',
        'Loading chunk',
        'Loading CSS chunk',
        'Network request failed',
        'Failed to fetch',
        'NetworkError',
        'The operation was aborted',
        'AbortError',
        'NotAllowedError', // Common with autoplay
        'play() request was interrupted',
        'The play() request was interrupted',
        'Autoplay policy'
      ]

      const shouldSuppress = suppressedErrors.some(suppressedError => 
        errorMessage.toLowerCase().includes(suppressedError.toLowerCase())
      )

      if (shouldSuppress) {
        event.preventDefault()
        console.debug('Suppressed non-critical error:', errorMessage)
        return
      }

      // Log other errors in debug mode
      console.debug('Global error caught:', event.error || errorMessage)
      
      // Only show in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Global error (dev mode):', event.error || errorMessage)
      }
    }

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    // Cleanup
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  // This component doesn't render anything
  return null
}
