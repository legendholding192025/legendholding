"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

type BrandLogo = {
  id: string
  name: string
  logo: string
  url: string
}

const brandLogos: BrandLogo[] = [
  {
    id: "legend-motors",
    name: "Legend Motors",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788883/Legend_motors_logo_ghitje.png",
    url: "/business/legend-motors",
  },
  
  {
    id: "miramotors",
    name: "Miramotors",
    logo: "/images/brands/miramotors.png",
    url: "/business/miramotors",
  },
  {
    id: "skywell",
    name: "Skywell",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788882/logo_sisnn9.png",
    url: "/business/skywell",
  },
  {
    id: "kaiyi",
    name: "Kaiyi",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788951/download_wmkc6s.png",
    url: "/business/kaiyi",
  },
  {
    id: "li-auto",
    name: "Li Auto",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788922/logo-text-black-en.e6782a94_xfc37w_1_dmhqga.svg",
    url: "/business/li-auto",
  },
  {
    id: "jidu",
    name: "JIDU",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746789093/Jidu-Logo-White-TEXT-ONLY-e1726466708510-300x75_sukedy.png",
    url: "/business/jidu",
  },
  {
    id: "212",
    name: "212",
    logo: "/images/brands/212.png",
    url: "/business/212",
  },
  {
    id: "rental-services",
    name: "Legend Rental",
    logo: "/images/brands/rental.png",
    url: "/business/rental",
  },
  {
    id: "energy-solutions",
    name: "Zul-Energy",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746792126/WhatsApp_Image_2025-05-09_at_4.01.53_PM_ujtdwj.jpg",
    url: "/business/zulenergy",
  },
  {
    id: "facility-services",
    name: "Legend Facility",
    logo: "/images/brands/facility.png",
    url: "/business/facility",
  },
  {
    id: "travel-services",
    name: "Legend Travel",
    logo: "/images/brands/travel.png",
    url: "/business/travel",
  },
  {
    id: "tech-solutions",
    name: "Legend Tech",
    logo: "/images/brands/tech.png",
    url: "/business/technology",
  },
]

export function BrandLogoCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1023px)")

  // Determine how many logos to show based on screen size
  const logosToShow = isMobile ? 2 : isTablet ? 4 : 6

  // Create a duplicate array of logos for seamless infinite scrolling
  // We duplicate the array multiple times to ensure smooth continuous scrolling
  const extendedLogos = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos]

  useEffect(() => {
    let animationId: number
    let lastTimestamp = 0
    const speed = isPaused ? 0 : 0.2 // pixels per millisecond (reduced from 0.5)

    const animate = (timestamp: number) => {
      if (!carouselRef.current) return

      if (lastTimestamp !== 0) {
        const delta = timestamp - lastTimestamp
        const moveAmount = speed * delta

        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + moveAmount

          // Get the width of a single logo item including its padding
          const logoItemWidth = carouselRef.current?.firstElementChild?.clientWidth || 200

          // Reset position when we've scrolled the width of the original array
          // This creates the illusion of infinite scrolling
          if (newPosition >= logoItemWidth * brandLogos.length) {
            return newPosition - logoItemWidth * brandLogos.length
          }

          return newPosition
        })
      }

      lastTimestamp = timestamp
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Brands</h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={carouselRef} className="flex" style={{ transform: `translateX(-${scrollPosition}px)` }}>
            {extendedLogos.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className={cn(
                  "flex-shrink-0 px-4 flex items-center justify-center transition-transform duration-300",
                  isMobile ? "w-1/2" : isTablet ? "w-1/4" : "w-1/6",
                )}
              >
                <div className="bg-white rounded-lg p-6 h-32 flex items-center justify-center border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 mx-2">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={160}
                    height={80}
                    className="max-h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for fade effect on sides */}
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}
