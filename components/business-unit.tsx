"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function BusinessUnit() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const businesses = [
    {
      name: "Zul Energy",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da403178ef3.07284478_20250602_131547.jpg",
      url: "/our-brands/zul-energy",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Legend Motors Trading",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png",
      url: "/our-brands/legend-motors-trading",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Skywell",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da0668d4af4.97651620_20250602_130022.jpg",
      url: "/our-brands/legend-motors-dealership#skywell",
      bgColor: "bg-[#EE8900]",
    },
    {
      name: "Li Auto",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da13c415753.52591286_20250602_130356.jpg",
      url: "/our-brands/legend-motors-dealership#liauto",
      bgColor: "bg-[#EE8900]/80",
    },
    {
      name: "Kaiyi",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da11c9c3534.33669103_20250602_130324.jpg",
      url: "/our-brands/legend-motors-dealership#kaiyi",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "212",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1530dd2f0.90644648_20250602_130419.jpg",
      url: "/our-brands/legend-motors-dealership#212",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Legend Motorcycles",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da00a4a22c3.88022895_20250602_125850.png",
      url: "/our-brands/legend-motorcycles",
      bgColor: "bg-[#EE8900]",
    },
    {
      name: "Legend Rent a Car",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da3d88d3185.41319420_20250602_131504.png",
      url: "/our-brands/legend-world-rent-a-car",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Legend Automobile Services",
      image: "https://cdn.legendholding.com/images/cdn_6846a290084766.80604483_20250609_090000.jpg",
      url: "/our-brands/legend-automobile-services",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Legend Global Media",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da84af1b770.67607576_20250602_133402.jpg",
      url: "/our-brands/legend-global-media",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Legend Travel and Tourism",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da8647f3229.83699836_20250602_133428.jpg",
      url: "/our-brands/legend-travel",
      bgColor: "bg-[#EE8900]",
    },
    {
      name: "Legend Green Energy Solutions",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da878b846d7.93249932_20250602_133448.jpg",
      url: "/our-brands/legend-green-energy",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Legend Commercial Vehicles",
      image: "https://cdn.legendholding.com/images/cdn_683ab636326ef8.83143422_20250531_075638.jpg",
      url: "/our-brands/legend-commercial-vehicles",
      bgColor: "bg-[#EE8900]/80",
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalItems = businesses.length

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

  // Autoplay Effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (!isPaused) {
      intervalId = setInterval(nextSlide, 4000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPaused, nextSlide])

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
        carouselRef.current.style.transition = "transform 500ms ease-out"
      }
    } else if (currentIndex < 0) {
      // Reset to end without animation
      if (carouselRef.current) {
        carouselRef.current.style.transition = "none"
        setCurrentIndex(totalItems - 1)
        // Force reflow
        carouselRef.current.offsetHeight
        carouselRef.current.style.transition = "transform 500ms ease-out"
      }
    }
  }

  // Create extended array with clones for infinite effect
  const extendedBusinesses = [
    ...businesses.slice(-itemsPerView), // Clone last items at beginning
    ...businesses,
    ...businesses.slice(0, itemsPerView), // Clone first items at end
  ]

  // Calculate transform with offset for cloned items
  const translateX = -((currentIndex + itemsPerView) * (100 / itemsPerView))

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F08900] mb-6 font-richmond animate-fade-in">
            Our Businesses
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
            className="absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-4 sm:mx-8 md:mx-12">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(${translateX}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedBusinesses.map((business, index) => (
                <div
                  key={`${business.name}-${index}`}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <Link href={business.url} className="block h-full">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-100 hover:scale-105 group h-[14rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem] flex flex-col">
                      {/* Image Section */}
                      <div className="flex-1 overflow-hidden">
                        <img
                          src={business.image || "/placeholder.svg"}
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-100"
                          loading="lazy"
                        />
                      </div>

                      {/* Content Section */}
                      <div
                        className={`${business.bgColor} px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-center`}
                      >
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-center text-white leading-tight">
                          {business.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {businesses.map((_, index) => (
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
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
        
        .animate-expand-width {
          animation: expandWidth 1.2s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </section>
  )
}
