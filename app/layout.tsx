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
  title: {
    default: 'Legend Holding Group | Global Diversified Holding Company | UAE',
    template: '%s | Legend Holding Group'
  },
  description: 'Legend Holding Group is a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa. Discover our comprehensive business solutions.',
  keywords: 'Legend Holding Group, UAE holding company, automotive group UAE, energy solutions UAE, technology companies Dubai, travel and tourism UAE, smart mobility solutions, diversified business group, Middle East conglomerate, Dubai-based company, automotive dealership UAE, electric vehicles UAE, Chinese car brands UAE, sustainable energy UAE, business innovation Dubai, corporate services UAE, investment company Dubai, asset management UAE, automotive services Dubai, mobility service providers Dubai, intelligent mobility solutions, data-driven solutions Dubai, technology-driven enterprises Dubai, innovation-focused companies, customer-first business group, Dubai-based conglomerate, Middle East business group, UAE automotive, Middle East vehicles, quality vehicles, hybrid cars UAE, green energy companies UAE, sustainable energy UAE, MICE travel solutions UAE, corporate travel Dubai, inbound tourism UAE, Chinese tourism services Dubai, robotics company UAE, AI solutions Dubai, artificial intelligence UAE, smart automation Dubai, service robots UAE, surveillance robots UAE, inspection robots UAE, personal assistants Dubai, UAE robotics, Middle East AI, Dubai robotics, digital media Dubai, content creation UAE, digital marketing Dubai, innovative media UAE, digital content Dubai, media technology UAE, luxury car rental UAE, vehicle rental Dubai, UAE car hire, premium rental cars Dubai, Middle East car rental, automotive rental services UAE, multi-brand vehicles Dubai, automotive hub UAE, vehicle selection Dubai, Middle East vehicles, quality vehicles UAE, automotive group UAE, electric vehicles UAE, hybrid cars UAE, Chinese car brands UAE, Dubai-based conglomerate, customer-first business group, tourism services UAE, luxury travel Dubai, UAE tourism, Middle East travel, premium tours Dubai, travel experiences UAE, tourism solutions Dubai, Legend Holding Group travel, travel and tourism company UAE, MICE travel solutions UAE, corporate travel Dubai, inbound tourism UAE, Chinese tourism services Dubai, digital media Dubai, content creation UAE, digital marketing Dubai, innovative media UAE, digital content Dubai, media technology UAE, data-driven solutions Dubai, technology-driven enterprises Dubai, innovation-focused companies, Dubai-based conglomerate, robotics company UAE, AI solutions Dubai, artificial intelligence UAE, smart automation Dubai, service robots UAE, surveillance robots UAE, inspection robots UAE, personal assistants Dubai, UAE robotics, Middle East AI, Dubai robotics, Legend Holding Group, automotive, energy, technology, travel, business, innovation, sustainability, UAE, Middle East',
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
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/fonnts.com-Richmond-Text-Medium.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Effra_Std_Rg.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//cdn.legendholding.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//web.cmp.usercentrics.eu" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.legendholding.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            body { margin: 0; padding: 0; font-family: var(--font-brand), system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
            .font-brand { font-family: var(--font-brand), system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
            .min-h-screen { min-height: 100vh; }
            .bg-background { background-color: #fff; }
            .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            .overflow-x-hidden { overflow-x: hidden; }
            
            /* Font loading optimization */
            @font-face {
              font-family: "Richmond Text";
              src: url("/fonts/fonnts.com-Richmond-Text-Medium.otf") format("opentype");
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            
            @font-face {
              font-family: "Effra";
              src: url("/fonts/Effra_Std_Rg.ttf") format("truetype");
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
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
