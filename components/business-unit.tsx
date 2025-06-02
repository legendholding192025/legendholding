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
      image: "https://res.cloudinary.com/dosxengut/image/upload/v1747645931/1681896024283_sl22tw.jpg",
      url: "/our-brands/zul-energy",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Legend Motors Trading",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748006307/motor-trading_ji1zfj.png",
      url: "/our-brands/legend-motors-trading",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Skywell",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000669/skywell_sprhgv.jpg",
      url: "/our-brands/legend-motors-dealership#skywell",
      bgColor: "bg-[#EE8900]",
    },
    {
      name: "Li Auto",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000658/liauto_luvwcv.jpg",
      url: "/our-brands/legend-motors-dealership#liauto",
      bgColor: "bg-[#EE8900]/80",
    },
    {
      name: "Kaiyi",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000659/kaiyi_bf8xzf.jpg",
      url: "/our-brands/legend-motors-dealership#kaiyi",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "212",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000399/212_zctz1o.jpg",
      url: "/our-brands/legend-motors-dealership#212",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Legend Motorcycles",
      image: "https://res.cloudinary.com/dosxengut/image/upload/v1747660840/Lifan-Logo_behsab.png",
      url: "/our-brands/legend-motorcycles",
      bgColor: "bg-[#EE8900]",
    },
    {
      name: "Legend Rent a Car",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748247935/rent-a-car_dyzdgk.png",
      url: "/our-brands/legend-world-rent-a-car",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Legend Automobile Services",
      image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648445/csm_cruising_visual_43e29fa7bb_ruiloc.jpg",
      url: "/our-brands/legend-automobile-services",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Legend Global Media",
      image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648530/Stock_Photo_Digital_Media_otoogv.jpg",
      url: "/our-brands/legend-global-media",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Legend Travel and Tourism",
      image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648726/bliss_travels_and_tours_cover_p7t8ma.jpg",
      url: "/our-brands/legend-travel",
      bgColor: "bg-[#EE8900]",
    },
    {
      name: "Legend Green Energy Solutions",
      image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648852/in-copy-about-charging-green_qjoyjk.jpg",
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
            className="absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-4 sm:mx-8 md:mx-12">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
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
                  <Link href={business.url} className="block">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem]">
                      {/* Image Section */}
                      <div className="h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[24rem] overflow-hidden">
                        <img
                          src={business.image || "/placeholder.svg"}
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Content Section */}
                      <div
                        className={`${business.bgColor} px-3 sm:px-4 md:px-6 py-2 sm:py-3 h-14 sm:h-16 flex items-center justify-center`}
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
