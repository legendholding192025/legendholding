"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import Link from "next/link"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    usercentrics?: {
      init: () => void;
    };
  }
}

export default function CookieConsent() {
  const pathname = usePathname()
  const isSocialProfilePage = pathname === "/social-profile"
  const isManagementProfilePage = pathname?.startsWith("/profile/")

  const [privacyAccepted, setPrivacyAccepted] = useState(true) // Start with true to prevent flash
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isSocialProfilePage || isManagementProfilePage) {
      setPrivacyAccepted(true)
      setIsLoaded(false)
      return
    }

    // Check if privacy policy was previously accepted
    try {
      const privacyConsent = localStorage.getItem("privacyConsent")
      if (privacyConsent === "accepted") {
        setPrivacyAccepted(true)
      } else {
        setPrivacyAccepted(false)
      }
    } catch (error) {
      // Handle localStorage access errors (e.g., in private browsing)
      console.debug('localStorage access failed, defaulting to show consent')
      setPrivacyAccepted(false)
    }
    setIsLoaded(true)

    // Only initialize Usercentrics in production
    if (process.env.NODE_ENV === 'production') {
      // Small delay to ensure CMP script is fully loaded
      setTimeout(() => {
        try {
          window.usercentrics?.init()
        } catch (error) {
          console.debug('Usercentrics initialization failed:', error)
        }
      }, 100)
    }
  }, [isSocialProfilePage, isManagementProfilePage])

  const handlePrivacyAccept = () => {
    try {
      localStorage.setItem("privacyConsent", "accepted")
      setPrivacyAccepted(true)
    } catch (error) {
      // Handle localStorage write errors
      console.debug('Failed to save privacy consent to localStorage')
      setPrivacyAccepted(true) // Still accept to prevent repeated prompts
    }
  }

  if (isSocialProfilePage || isManagementProfilePage) {
    return null
  }

  return (
    <>
      {/* Only load Usercentrics scripts in production with optimized loading */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            id="usercentrics-autoblocker"
            src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
            strategy="lazyOnload"
          />
          <Script
            id="usercentrics-cmp"
            src="https://web.cmp.usercentrics.eu/ui/loader.js"
            data-settings-id="iRDvHQKYcoYv2X"
            strategy="lazyOnload"
          />
        </>
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