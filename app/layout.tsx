import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import CookieConsent from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import GoogleTagManager from "@/components/GoogleTagManager"
import PageTracker from "@/components/PageTracker"

import './globals.css'
import { brandFont } from './fonts'

export const metadata: Metadata = {
  title: 'Legend Web',
  description: 'Legend Web - Your trusted partner in digital solutions',
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
      </head>
      <body className="font-brand min-h-screen bg-background antialiased overflow-x-hidden">
        <GoogleTagManager />
        <Suspense fallback={null}>
          <PageTracker />
        </Suspense>
        {children}
        <Toaster position="top-right" />
        <CookieConsent />
        <ScrollToTop />
      </body>
    </html>
  )
}
