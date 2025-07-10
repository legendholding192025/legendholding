"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import Link from "next/link"

declare global {
  interface Window {
    usercentrics?: {
      init: () => void;
      showFirstLayer: () => void;
      isInitialized: () => boolean;
    };
  }
}

export default function CookieConsent() {
  const [privacyAccepted, setPrivacyAccepted] = useState(true) // Start with true to prevent flash
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if privacy policy was previously accepted
    const privacyConsent = localStorage.getItem("privacyConsent")
    if (privacyConsent === "accepted") {
      setPrivacyAccepted(true)
    } else {
      setPrivacyAccepted(false)
    }
    setIsLoaded(true)

    // Only initialize and activate Usercentrics in production
    if (process.env.NODE_ENV === 'production') {
      // Since we're now using synchronous script loading, the scripts should be available sooner
      const activateCMP = () => {
        if (window.usercentrics) {
          try {
            console.log('Initializing Usercentrics CMP...')
            
            // Initialize the CMP
            window.usercentrics.init()
            
            // Wait a bit for initialization to complete, then activate
            setTimeout(() => {
              if (window.usercentrics?.isInitialized && window.usercentrics.isInitialized()) {
                console.log('CMP initialized, showing consent layer...')
                // This will make the CMP active by showing the consent layer
                window.usercentrics.showFirstLayer()
              } else {
                console.warn('CMP not fully initialized yet')
              }
            }, 100)
          } catch (error) {
            console.error('CMP initialization error:', error)
          }
        } else {
          console.warn('Usercentrics not available yet, retrying...')
          // Retry after a short delay
          setTimeout(activateCMP, 100)
        }
      }

      // Start activation process with a minimal delay
      setTimeout(activateCMP, 50)
    }
  }, [])

  const handlePrivacyAccept = () => {
    localStorage.setItem("privacyConsent", "accepted")
    setPrivacyAccepted(true)
  }

  return (
    <>
      {/* Privacy Policy Banner - works in all environments */}
      {isLoaded && !privacyAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-sm text-gray-700">
                <p>
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePrivacyAccept}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 