"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GroupIndustries() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2) // Default to 2 items

  const industries = [
    {
      name: "Automotive",
      image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Oil & Gas",
      image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-[#5D376E]",
    },
    {
      name: "Travel & Tourism",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-[#EE8900]",
      textColor: "text-white",
    },
    {
      name: "Technology",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-[#EE8900]/80",
      textColor: "text-white",
    },
    {
      name: "Logistics",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-[#2B1C48]",
    },
    {
      name: "Media",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-[#5D376E]",
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

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalItems = industries.length

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }

  // Get the visible industries based on current index
  const getVisibleIndustries = () => {
    const visibleItems = []
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % totalItems
      visibleItems.push(industries[index])
    }
    return visibleItems
  }

  const visibleIndustries = getVisibleIndustries()

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond animate-fade-in">
            Group Industries
          </h2>
          <div className="flex gap-2 justify-center">
            <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
            <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[2000px] mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-4 sm:mx-8 md:mx-12">
            <div className="flex transition-transform duration-500 ease-in-out">
              {visibleIndustries.map((industry, index) => (
                <div
                  key={`${industry.name}-${index}`}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  {/* Industry Card */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem]">
                    {/* Image Section */}
                    <div className="h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[24rem] overflow-hidden">
                      <img
                        src={industry.image || "/placeholder.svg"}
                        alt={industry.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content Section */}
                    <div className={`${industry.bgColor} px-3 sm:px-4 md:px-6 py-2 sm:py-3 h-14 sm:h-16 flex items-center justify-center`}>
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
