import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://legendholding.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/careers',
    '/careers/jobs',
    '/news',
    '/sitemap',
    '/privacy-policy',
    '/cookie-policy',
    '/who-we-are',
    '/who-we-are/about-us',
    '/who-we-are/brand-story',
    '/who-we-are/journey',
    '/who-we-are/the-team',
    '/who-we-are/partners',
    '/who-we-are/csr',
    '/our-businesses/legend-automobile-services',
    '/our-businesses/legend-commercial-vehicles',
    '/our-businesses/legend-global-media',
    '/our-businesses/legend-green-energy',
    '/our-businesses/legend-motorcycles',
    '/our-businesses/legend-motors-dealership',
    '/our-businesses/legend-motors-trading',
    '/our-businesses/legend-autohub',
    '/our-businesses/legend-technical-services',
    '/our-businesses/legend-travel',
    '/our-businesses/legend-world-rent-a-car',
    '/our-businesses/zul-energy',
  ]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'weekly' : page.includes('/our-businesses/') ? 'monthly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('/our-businesses/') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
} 