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
    id: "rental-services",
    name: "Legend Rental",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746794059/Legend-world-rent-a-car-Logo-1_oqrb2x.webp",
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
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746793661/WhatsApp_Image_2025-05-09_at_4.26.34_PM_p8xzld.jpg",
    url: "/business/facility",
  },
  {
    id: "travel-services",
    name: "Legend Travel",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746791315/ltt1_epvsac.png",
    url: "/business/travel",
  },
  {
    id: "tech-solutions",
    name: "Legend Tech",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746793661/WhatsApp_Image_2025-05-09_at_4.26.15_PM_qnt87i.jpg",
    url: "/business/technology",
  },
  {
    id: "Legend-dealership",
    name: "Legend dealership",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1747988307/Picture1_gkrsxy.png",
    url: "/business/dealership",
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
    const speed = isPaused ? 0 : 0.08 // pixels per millisecond (reduced from 0.2)

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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2B1C48] mb-4">Our Brands</h2>
          <div className="w-24 h-1 bg-[#EE8900] mx-auto rounded-full"></div>
        </div>

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
                <div className={cn(
                  "rounded-lg p-6 h-32 flex items-center justify-center border transition-all duration-300 mx-2",
                  // Add dark background for specific logos that are white
                  brand.id === "jidu" || brand.id === "kaiyi" ? "bg-gray-900" : "bg-white",
                  "hover:shadow-md border-gray-200"
                )}>
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={160}
                    height={80}
                    className={cn(
                      "max-h-16 w-auto object-contain transition-opacity duration-300",
                      (brand.id === "jidu" || brand.id === "kaiyi") ? "opacity-100" : "opacity-90 hover:opacity-100"
                    )}
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
