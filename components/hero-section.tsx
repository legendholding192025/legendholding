"use client"
 
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
 
interface HeroSectionProps {
  images?: string[]
  autoPlayInterval?: number
}
 
export function HeroSection({
  images = [
    "https://res.cloudinary.com/dckrspiqe/image/upload/v1743327581/L6-%E8%A7%92%E6%A0%87_1_ify5ms.jpg",
    "https://res.cloudinary.com/dckrspiqe/image/upload/v1743155797/PC-%E9%A6%96%E5%B1%8F_1_re3h24.jpg",
    "https://res.cloudinary.com/dckrspiqe/image/upload/v1742800862/PC-%E9%A6%96%E5%B1%8F_yxs6mc.jpg",
    "https://res.cloudinary.com/dckrspiqe/image/upload/v1742558853/5-10%E4%BE%BF%E6%8D%B7%E4%B8%8A%E4%B8%8B_dqzzar.jpg",
  ],
  autoPlayInterval = 3000,
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
 
  useEffect(() => {
    setIsLoaded(true)
  }, [])
 
  // Auto-play functionality
  useEffect(() => {
    if (!isLoaded || images.length <= 1) return
 
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)
 
    return () => clearInterval(interval)
  }, [isLoaded, autoPlayInterval, images.length])
 
  const handleDotClick = useCallback(
    (index: number) => {
      if (index === currentImageIndex) return
      setCurrentImageIndex(index)
    },
    [currentImageIndex],
  )
 
  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])
 
  const handleNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])
 
  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
              index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Hero image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
 
      {/* Minimal Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
 
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center justify-center">
        {/* Add your content here */}
      </div>
 
      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-110",
                index === currentImageIndex
                  ? "bg-[#ED8B21] shadow-lg" // Active dot now in Dawn
                  : "bg-[#ED8B21]/50 hover:bg-[#ED8B21]/70" // Inactive in Dawn tint
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Active dot ring */}
              {index === currentImageIndex && (
                <div className="absolute inset-0 rounded-full border-2 border-[#ED8B21]/50 scale-150 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
 
        {/* Progress bar for current slide */}
        <div className="mt-4 w-full bg-[#2E085B]/20 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-[#2E085B] rounded-full transition-all duration-300 ease-linear"
            style={{
              width: `${((currentImageIndex + 1) / images.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
 
      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center z-30">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-[#2E085B]/20 hover:bg-[#2E085B]/30 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
 
      <div className="absolute inset-y-0 right-4 flex items-center z-30">
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-[#2E085B]/20 hover:bg-[#2E085B]/30 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
 
 
 
      {/* Image counter */}
      <div className="absolute top-8 right-8 z-30">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </section>
  )
}