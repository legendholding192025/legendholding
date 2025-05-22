import localFont from 'next/font/local'

// Load Richmond Text font
export const brandFont = localFont({
  src: [
    {
      path: '../public/fonts/fonnts.com-Richmond-Text-Medium.otf',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-brand',
  display: 'swap',
}) 