"use client"

import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const partners = [
    { id: 1, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture4_pqohbf.png', name: 'Partner 1' },
    { id: 2, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture9_dttje6.png', name: 'Partner 2' },
    { id: 3, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727869/Picture10_p3whcu.png', name: 'Partner 3' },
    { id: 4, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture12_stvafn.png', name: 'Partner 4' },
    { id: 5, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture8_jmctgu.png', name: 'Partner 5' },
    { id: 6, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture7_wplkgz.png', name: 'Partner 6' },
    { id: 7, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture13_fqzvhb.png', name: 'Partner 7' },
    { id: 8, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture11_sqgf9y.png', name: 'Partner 8' },
    { id: 9, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture14_apmvql.png', name: 'Partner 9' },
    { id: 10, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture5_txk7lq.png', name: 'Partner 10' },
    { id: 11, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture6_bcnri8.png', name: 'Partner 11' },
]

export function PartnerSection() {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 100% )")

  // Determine how many partners to show based on screen size
  const partnersToShow = isMobile ? 2 : isTablet ? 3 : 6

  // Create extended array for infinite scroll
  const extendedPartners = [...partners, ...partners, ...partners]

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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B1C48] mb-4 text-center">Our Partners</h2>
            <div className="w-24 h-1 bg-[#EE8900] mx-auto rounded-full mb-6"></div>
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
                    isMobile ? "w-1/2" : isTablet ? "w-1/3" : "w-1/6"
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

      {/* Animated Text Section */}
      <section 
        className="py-16 overflow-hidden relative"
        style={{
          backgroundImage: 'url("https://res.cloudinary.com/dosxengut/image/upload/v1748501083/image_2_q3lfk4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          id="animated-text"
          className={cn(
            "container mx-auto px-4 text-center transform transition-all duration-1000 relative z-10",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2B1C48] mb-4 animate-float">
              Together We Grow
            </h2>
            <p className="text-lg md:text-xl text-[#EE8900] max-w-2xl mx-auto animate-float-delayed">
              Building partnerships that drive success and innovation
            </p>
            
            {/* Decorative Elements */}
            <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-[#2B1C48]/30"></div>
            <div className="absolute -right-4 -bottom-4 w-8 h-8 border-r-2 border-b-2 border-[#2B1C48]/30"></div>
          </div>
        </div>
      </section>
    </>
  )
} 