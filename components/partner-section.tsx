"use client"

import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const partners = [
    { id: 1, logo: 'https://cdn.legendholding.com/images/cdn_683eb86e45e183.72081489_20250603_085510.jpg', name: 'Partner 1' },
    { id: 2, logo: 'https://cdn.legendholding.com/images/cdn_683eb8920b65a7.63176838_20250603_085546.png', name: 'Partner 2' },
    { id: 3, logo: 'https://cdn.legendholding.com/images/cdn_683eb8b588d928.25041842_20250603_085621.png', name: 'Partner 3' },
    { id: 4, logo: 'https://cdn.legendholding.com/images/cdn_683eb934df6a15.04266165_20250603_085828.png', name: 'Partner 4' },
    { id: 5, logo: 'https://cdn.legendholding.com/images/cdn_683eb9848c45a8.14376233_20250603_085948.png', name: 'Partner 5' },
    { id: 6, logo: 'https://cdn.legendholding.com/images/cdn_683eb99c9f6c06.84723846_20250603_090012.png', name: 'Partner 6' },
    { id: 7, logo: 'https://cdn.legendholding.com/images/cdn_683eb9f622b153.33094244_20250603_090142.png', name: 'Partner 7' },
    { id: 8, logo: 'https://cdn.legendholding.com/images/cdn_683eba1b3b9bd9.54350367_20250603_090219.png', name: 'Partner 8' },
    { id: 9, logo: 'https://cdn.legendholding.com/images/cdn_683eba3d465fd3.54437503_20250603_090253.png', name: 'Partner 9' },
    { id: 10, logo: 'https://cdn.legendholding.com/images/cdn_683eba5fd528a4.04920396_20250603_090327.png', name: 'Partner 10' },
    { id: 11, logo: 'https://cdn.legendholding.com/images/cdn_683eba80ac1311.74540241_20250603_090400.png', name: 'Partner 11' },
]

export function PartnerSection() {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isMobileQuery = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 100% )")

  // Determine how many partners to show based on screen size
  const partnersToShow = isMobileQuery ? 2 : isTablet ? 3 : 6

  // Create extended array for infinite scroll
  const extendedPartners = [...partners, ...partners, ...partners]

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    let animationId: number
    let lastTimestamp = 0
    const speed = isPaused ? 0 : 0.15 // pixels per millisecond

    const animate = (timestamp: number) => {
      if (!carouselRef.current) return

      if (lastTimestamp !== 0) {
        const delta = timestamp - lastTimestamp
        const moveAmount = speed * delta

        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + moveAmount
          const partnerItemWidth = carouselRef.current?.firstElementChild?.clientWidth || 200

          if (newPosition >= partnerItemWidth * partners.length) {
            return newPosition - partnerItemWidth * partners.length
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

  // Intersection Observer for animated text
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const textElement = document.getElementById('animated-text')
    if (textElement) {
      observer.observe(textElement)
    }

    return () => {
      if (textElement) {
        observer.unobserve(textElement)
      }
    }
  }, [])

  return (
    <>
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#EE8900] mb-4 text-center">Our Partners</h2>
            <div className="w-24 h-1 bg-[#5E366D] mx-auto rounded-full mb-6"></div>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              ref={carouselRef} 
              className="flex"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {extendedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className={cn(
                    "flex-shrink-0 px-2 flex items-center justify-center transition-transform duration-300",
                    isMobileQuery ? "w-1/2" : isTablet ? "w-1/3" : "w-1/6"
                  )}
                >
                  <div className="rounded-lg p-4 h-28 flex items-center justify-center border transition-all duration-300 mx-1 bg-white hover:shadow-md border-gray-200">
                    <div className="relative w-[120px] sm:w-[150px] h-[60px] sm:h-[80px]">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain transition-opacity duration-300 hover:opacity-90"
                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Animated Text Section - FIXED */}
      <section className="py-8 sm:py-12 md:py-16 overflow-hidden relative bg-gray-50 flex items-center justify-center">
        {/* Responsive Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          {/* Mobile Background Image */}
          <Image
            src="https://cdn.legendholding.com/images/cdn_68564e06066870.03563987_20250621_061534.jpg"
            alt="Together We Grow Background"
            fill
            className="object-contain object-right w-full h-full lg:hidden"
            sizes="100vw"
            priority
          />
          {/* Desktop Background Image */}
          <Image
            src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea373547101.30987392_20250603_072539.jpg"
            alt="Together We Grow Background"
            fill
            className="object-cover w-full h-full hidden lg:block"
            sizes="100vw"
            priority
          />
        </div>
        
        {/* White overlay for left side */}
        <div className="absolute inset-0 w-1/2 bg-white lg:hidden"></div>
        
        <div 
          id="animated-text"
          className={cn(
            "container mx-auto px-3 sm:px-4 text-center transform transition-all duration-1000 relative z-10",
            "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="relative">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#EE8900] mb-2 sm:mb-3 md:mb-4 animate-float">
              Together We Grow
            </h2>
            
            {/* Decorative Elements */}
            {/* <div 
              className="absolute w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-[#2B1C48]/30"
              style={{ 
                left: isMobile ? '20px' : '120px', 
                top: isMobile ? '-5px' : '-10px' 
              }}
            ></div>
            <div 
              className="absolute w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-r-2 border-b-2 border-[#2B1C48]/30"
              style={{ 
                right: isMobile ? '20px' : '120px', 
                bottom: isMobile ? '-5px' : '-10px' 
              }}
            ></div> */}
          </div>
        </div>
      </section>
    </>
  )
}