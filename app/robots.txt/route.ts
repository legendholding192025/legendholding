import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://legendholding.com/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow specific pages that Google should index
Allow: /
Allow: /contact
Allow: /careers
Allow: /careers/jobs
Allow: /news
Allow: /who-we-are
Allow: /our-businesses
Allow: /sitemap

# Crawl delay
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
} 