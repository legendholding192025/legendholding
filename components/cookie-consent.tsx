"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import Link from "next/link"

declare global {
  interface Window {
    usercentrics?: {
      init: () => void;
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

    // Only initialize Usercentrics in production
    if (process.env.NODE_ENV === 'production') {
      // Small delay to ensure CMP script is fully loaded
      setTimeout(() => {
        window.usercentrics?.init()
      }, 100)
    }
  }, [])

  const handlePrivacyAccept = () => {
    localStorage.setItem("privacyConsent", "accepted")
    setPrivacyAccepted(true)
  }

  return (
    <>
      {/* Only load Usercentrics scripts in production */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            id="usercentrics-autoblocker"
            src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
            strategy="beforeInteractive"
          />
          <Script
            id="usercentrics-cmp"
            src="https://web.cmp.usercentrics.eu/ui/loader.js"
            data-settings-id="iRDvHQKYcoYv2X"
            strategy="beforeInteractive"
          />
        </>
      )}
      
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