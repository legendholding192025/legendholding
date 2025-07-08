'use client'

import { usePathname } from 'next/navigation'

export default function StructuredData() {
  const pathname = usePathname()

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Legend Holding Group",
    "url": "https://legendholding.com",
    "logo": "https://legendholding.com/images/legend-logo.png",
    "description": "Legend Holding Group is a diversified enterprise headquartered in Dubai, operating across the Middle east and African region. With a strong focus on sustainability and innovation, the group manages a growing portfolio of companies in automotive, trading, energy, Travel and Tourism and mobility services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No- S30502 - opposite Redington, Gate5 - JAFZA",
      "addressLocality": "Dubai",
      "addressCountry": "UAE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971 4 234 0738",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/LegendHoldingGroup",
      "https://www.instagram.com/legendholdinggroup",
      "https://www.linkedin.com/company/legend-holding-group"
    ]
  }

  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Legend Holding Group",
    "url": "https://legendholding.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://legendholding.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // Breadcrumb structured data
  const getBreadcrumbData = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    if (pathSegments.length === 0) return null

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://legendholding.com"
      }
    ]

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://legendholding.com${currentPath}`
      })
    })

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    }
  }

  // Navigation structured data for better sitelinks
  const navigationData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "url": [
      {
        "@type": "WebPage",
        "name": "About Us",
        "url": "https://legendholding.com/who-we-are/about-us"
      },
      {
        "@type": "WebPage", 
        "name": "Our Businesses",
        "url": "https://legendholding.com/our-businesses"
      },
      {
        "@type": "WebPage",
        "name": "Careers",
        "url": "https://legendholding.com/careers"
      },
      {
        "@type": "WebPage",
        "name": "Job Openings",
        "url": "https://legendholding.com/careers/jobs"
      },
      {
        "@type": "WebPage",
        "name": "Contact Us",
        "url": "https://legendholding.com/contact"
      },
      {
        "@type": "WebPage",
        "name": "News",
        "url": "https://legendholding.com/news"
      }
    ]
  }

  const breadcrumbData = getBreadcrumbData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationData)
        }}
      />
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />
      )}
    </>
  )
} 