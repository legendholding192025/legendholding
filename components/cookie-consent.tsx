"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import Link from "next/link"

declare global {
  interface Window {
    usercentrics?: {
      init: () => void;
      show: () => void;
      isInitialized: () => boolean;
    };
    UC_UI?: {
      isInitialized: () => boolean;
      showFirstLayer: () => void;
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
      // Wait for the Usercentrics script to load and initialize
      const initUsercentrics = () => {
        if (window.usercentrics) {
          try {
            window.usercentrics.init()
            console.log('Usercentrics CMP initialized successfully')
          } catch (error) {
            console.error('Error initializing Usercentrics CMP:', error)
          }
        } else if (window.UC_UI) {
          try {
            // Alternative initialization method
            window.UC_UI.showFirstLayer()
            console.log('Usercentrics UI initialized successfully')
          } catch (error) {
            console.error('Error initializing Usercentrics UI:', error)
          }
        }
      }

      // Try to initialize immediately if script is already loaded
      if (window.usercentrics || window.UC_UI) {
        initUsercentrics()
      } else {
        // Wait for script to load with retries
        let retryCount = 0
        const maxRetries = 10
        const checkInterval = setInterval(() => {
          retryCount++
          if (window.usercentrics || window.UC_UI) {
            clearInterval(checkInterval)
            initUsercentrics()
          } else if (retryCount >= maxRetries) {
            clearInterval(checkInterval)
            console.warn('Usercentrics CMP script did not load within expected time')
          }
        }, 500)
      }
    }
  }, [])

  const handlePrivacyAccept = () => {
    localStorage.setItem("privacyConsent", "accepted")
    setPrivacyAccepted(true)
  }

  return (
    <>
      {/* Only load Usercentrics CMP script in production - autoblocker moved to layout */}
      {process.env.NODE_ENV === 'production' && (
        <Script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="iRDvHQKYcoYv2X"
          strategy="beforeInteractive"
          onLoad={() => {
            // Script loaded, trigger initialization
            if (window.usercentrics) {
              try {
                window.usercentrics.init()
                console.log('Usercentrics CMP loaded and initialized')
              } catch (error) {
                console.error('Error initializing Usercentrics on load:', error)
              }
            }
          }}
          onError={(error) => {
            console.error('Failed to load Usercentrics CMP script:', error)
          }}
        />
      )}
      
      {/* Privacy Policy Banner - works in all environments */}
      {isLoaded && !privacyAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#2B1C48] mb-2">Privacy Policy Update</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We've updated our privacy policy to better protect your data. Please review our{" "}
                  <Link href="/privacy-policy" className="text-[#EE8900] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/cookie-policy" className="text-[#EE8900] hover:underline">
                    Cookie Policy
                  </Link>
                  {" "}before continuing.
                </p>
              </div>
              <button
                onClick={handlePrivacyAccept}
                className="px-6 py-2 bg-[#EE8900] text-white rounded-lg hover:bg-[#EE8900]/90 transition-colors duration-200 whitespace-nowrap"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 