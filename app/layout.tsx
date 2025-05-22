import type { Metadata } from 'next'
import { Toaster } from 'sonner'

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
      <body className="font-brand min-h-screen bg-background antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
