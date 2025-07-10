import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import Script from 'next/script'
import CookieConsent from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import GoogleTagManager from "@/components/GoogleTagManager"
import PageTracker from "@/components/PageTracker"
import StructuredData from "@/components/StructuredData"

import './globals.css'
import { brandFont } from './fonts'

export const metadata: Metadata = {
  title: 'Legend Web',
  description: 'Legend Web - Your trusted partner in digital solutions',
  icons: {
    icon: '/images/url_logo.png',
    shortcut: '/images/url_logo.png',
    apple: '/images/url_logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${brandFont.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Autoblocker script must be first - only in production */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="usercentrics-autoblocker"
            src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="font-brand min-h-screen bg-background antialiased overflow-x-hidden">
        <GoogleTagManager />
        <Suspense fallback={null}>
          <PageTracker />
          <StructuredData />
        </Suspense>
        {children}
        <Toaster position="top-right" />
        <CookieConsent />
        <ScrollToTop />
      </body>
    </html>
  )
}
