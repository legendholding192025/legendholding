"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GroupIndustries() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const industries = [
    {
      name: "Automotive",
      image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-purple-900",
    },
    {
      name: "Oil & Gas",
      image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-purple-800",
    },
    {
      name: "Travel & Tourism",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      name: "Technology",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-orange-400",
      textColor: "text-white",
    },
    {
      name: "Logistics",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-purple-900",
    },
    {
      name: "Media",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1000",
      bgColor: "bg-purple-700",
    },
  ]

  const itemsPerView = 4
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
    <section className="py-16 bg-gray-50 w-full">
      <div className="w-full px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 animate-fade-in">Group Industries</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[2000px] mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-12">
            <div className="flex transition-transform duration-500 ease-in-out">
              {visibleIndustries.map((industry, index) => (
                <div
                  key={`${industry.name}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  {/* Industry Card - Further Increased Height */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group h-[28rem]">
                    {/* Image Section - Further Increased Height */}
                    <div className="h-[24rem] overflow-hidden">
                      <img
                        src={industry.image || "/placeholder.svg"}
                        alt={industry.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content Section - Height Maintained */}
                    <div className={`${industry.bgColor} px-6 py-3 h-16 flex items-center justify-center`}>
                      <h3
                        className={`text-lg font-bold text-center ${industry.textColor || "text-white"} leading-tight`}
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
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
      `}</style>
    </section>
  )
}
