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
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  useEffect(() => {
    // Check if privacy policy was previously accepted
    const privacyConsent = localStorage.getItem("privacyConsent")
    if (privacyConsent === "accepted") {
      setPrivacyAccepted(true)
    }

    // Only initialize Usercentrics in production
    if (process.env.NODE_ENV === 'production') {
      window.usercentrics?.init()
    }
  }, [])

  const handlePrivacyAccept = () => {
    localStorage.setItem("privacyConsent", "accepted")
    setPrivacyAccepted(true)
  }

  // Only load Usercentrics scripts in production
  if (process.env.NODE_ENV === 'production') {
    return (
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
        {!privacyAccepted && (
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
                  className="px-6 py-2 bg-[#EE8900] text-white rounded-lg hover:bg-[#EE8900]/90 transition-colors duration-200"
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

  // Return null in development
  return null
} 