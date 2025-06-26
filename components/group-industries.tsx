"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GroupIndustries() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2) // Default to 2 items
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const industries = [
    {
      name: "Automotive",
      image: "https://cdn.legendholding.com/images/cdn_68567a04116383.04854017_20250621_092316.jpg",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Oil & Gas",
      image: "https://cdn.legendholding.com/images/cdn_685bf69ae66996.42021615_20250625_131610.jpg",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Travel & Tourism",
      image: "https://cdn.legendholding.com/images/cdn_68514642e8cbf6.54823807_20250617_104106.jpeg",
      bgColor: "bg-[#EE8900]",
      textColor: "text-white",
    },
    {
      name: "Technology",
      image: "https://cdn.legendholding.com/images/cdn_68565a0f82d193.91550960_20250621_070655.png",
      bgColor: "bg-[#EE8900]/80",
      textColor: "text-white",
    },
    {
      name: "Logistics",
      image: "https://cdn.legendholding.com/images/cdn_685659e09b90b7.91237605_20250621_070608.png",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Media",
      image: "https://cdn.legendholding.com/images/cdn_685bf4da72fab8.92359256_20250625_130842.jpg",
      bgColor: "bg-[#5D376E]",
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2)
        setIsMobile(true)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
        setIsMobile(false)
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3)
        setIsMobile(false)
      } else {
        setItemsPerView(4)
        setIsMobile(false)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Touch event handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  const totalItems = industries.length

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex - 1)
  }, [isTransitioning])

  // Handle infinite loop transitions
  const handleTransitionEnd = () => {
    setIsTransitioning(false)

    if (currentIndex >= totalItems) {
      // Reset to beginning without animation
      if (carouselRef.current) {
        carouselRef.current.style.transition = "none"
        setCurrentIndex(0)
        // Force reflow
        carouselRef.current.offsetHeight
        carouselRef.current.style.transition = "transform 100ms ease-out"
      }
    } else if (currentIndex < 0) {
      // Reset to end without animation
      if (carouselRef.current) {
        carouselRef.current.style.transition = "none"
        setCurrentIndex(totalItems - 1)
        // Force reflow
        carouselRef.current.offsetHeight
        carouselRef.current.style.transition = "transform 100ms ease-out"
      }
    }
  }

  // Create extended array with clones for infinite effect
  const extendedIndustries = [
    ...industries.slice(-itemsPerView), // Clone last items at beginning
    ...industries,
    ...industries.slice(0, itemsPerView), // Clone first items at end
  ]

  // Calculate transform with offset for cloned items
  const translateX = -((currentIndex + itemsPerView) * (100 / itemsPerView))

  // Autoplay Effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (!isPaused) {
      intervalId = setInterval(() => {
        if (!isTransitioning) {
          nextSlide()
        }
      }, 4000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPaused, nextSlide, isTransitioning])

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F08900] mb-6 font-richmond animate-fade-in">
            Group Industries
          </h2>
          <div className="flex gap-2 justify-center">
            <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
            <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-[2000px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className={`absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${isMobile ? 'hidden' : ''}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className={`absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${isMobile ? 'hidden' : ''}`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-1 sm:mx-4 md:mx-8 lg:mx-12">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(${translateX}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {extendedIndustries.map((industry, index) => (
                <div
                  key={`${industry.name}-${index}`}
                  className="flex-shrink-0 px-0.5 sm:px-1 md:px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  {/* Industry Card */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-100 hover:scale-105 group h-[14rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem] xl:h-[24rem] flex flex-col">
                    {/* Image Section */}
                    <div className="flex-1 overflow-hidden">
                      <img
                        src={industry.image || "/placeholder.svg"}
                        alt={industry.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-100"
                        style={{
                          transform: industry.name === "Media" || industry.name === "Automotive" ? "scale(1.15)" : "scale(1)",
                        }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className={`${industry.bgColor} px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-center`}>
                      <h3
                        className={`text-sm sm:text-base md:text-lg font-bold text-center ${industry.textColor || "text-white"} leading-tight`}
                      >
                        {industry.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setCurrentIndex(index)
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === (currentIndex < 0 ? totalItems - 1 : currentIndex >= totalItems ? 0 : currentIndex)
                  ? "bg-[#F08900] w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
        
        .animate-expand-width {
          animation: expandWidth 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </section>
  )
}