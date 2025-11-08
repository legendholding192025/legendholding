"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Culture",
    description:
      "We've built a culture rooted in trust, respect, and shared ambition. With over 35 nationalities working toward one vision, we celebrate diversity and grow together. Our leaders are transparent and accessible, and we recognize every win, big or small, because we believe that when one of us grows, we all do.",
    image:
      "https://cdn.legendholding.com/images/cdn_690f2d6f1cfb68.70592687_20251108_114551.webp",
  },
  {
    id: 2,
    title: "Growth",
    description:
      "We don't believe in one-track careers. As a diversified group, we offer cross-industry exposure and clear pathways for development. Whether it's through our training academy, mentorship, or hands-on experience, we give you the tools to shape your career.",
    image:
      "https://cdn.legendholding.com/images/cdn_690f32cdcb8ef8.81099701_20251108_120845.webp",
  },
  {
    id: 3,
    title: "Innovation",
    description:
      "We listen to every idea. We believe great ideas can come from anyone, anywhere. That's why we encourage our team member to share their thoughts and take ownership. If you have an idea, we'll help you shape it, champion it, and bring it to life, because innovation starts with you.",
    image:
      "https://cdn.legendholding.com/images/cdn_684c23b2cdb517.97646813_20250613_131218.jpeg",
  },
]

export default function GrowSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false)

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map((slide, index) => {
        return new Promise<number>((resolve, reject) => {
          const img = new window.Image()
          img.onload = () => {
            setImagesLoaded(prev => new Set(prev).add(index))
            resolve(index)
          }
          img.onerror = () => {
            console.warn(`Failed to load image for slide ${index}:`, slide.image)
            // Still mark as "loaded" to prevent infinite loading states
            setImagesLoaded(prev => new Set(prev).add(index))
            resolve(index)
          }
          img.src = slide.image
        })
      })

      try {
        await Promise.all(imagePromises)
        setAllImagesPreloaded(true)
      } catch (error) {
        console.error('Error preloading images:', error)
        setAllImagesPreloaded(true) // Set to true even on error to prevent blocking
      }
    }
    
    preloadImages()
  }, [])

  const nextSlide = () => {
    if (isTransitioning || !allImagesPreloaded) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning || !allImagesPreloaded) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide || !allImagesPreloaded) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="bg-[#2B1C48] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Header - Left Aligned */}
        <div className="max-w-2xl mb-8 md:mb-12">
          {/* <span className="text-[#EE8900] font-medium mb-4 block">Our Culture</span> */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            A Place of Culture,<br />
            Growth and Innovation
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            At Legend Holdings, we believe in creating an environment where talent thrives, innovation flourishes, and careers reach new heights.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 lg:h-[400px]">
          {/* Left Content */}
          <div className="order-2 lg:order-1 h-full">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-r-none lg:rounded-l-2xl h-full flex flex-col justify-between">
              <div className="max-w-[90%] lg:max-w-[85%]">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EE8900] mb-2 sm:mb-3 transition-all duration-300 ease-in-out">
                  {currentSlideData.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#5E366D] leading-relaxed max-w-[90%] lg:max-w-[85%] transition-all duration-300 ease-in-out">
                  {currentSlideData.description}
                </p>
              </div>
              {/* Navigation */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm sm:text-base transition-all duration-300">
                    {currentSlide + 1} / {slides.length}
                  </span>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning || !allImagesPreloaded}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group ${
                      (isTransitioning || !allImagesPreloaded) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={isTransitioning || !allImagesPreloaded}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group ${
                      (isTransitioning || !allImagesPreloaded) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-full">
            <div className="overflow-hidden rounded-2xl lg:rounded-l-none lg:rounded-r-2xl h-full w-full relative">
              {/* Loading placeholder - only show if image is not loaded */}
              {!imagesLoaded.has(currentSlide) && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 z-10 flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-8 h-8 border-2 border-[#EE8900] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600 text-sm font-medium">Loading {currentSlideData.title}...</span>
                  </div>
                </div>
              )}
              
              {/* Render all images but only show the current one */}
              {slides.map((slide, index) => (
                <Image
                  key={`slide-${index}`}
                  src={slide.image}
                  alt={`${slide.title} - Legend Holdings team collaboration`}
                  width={800}
                  height={600}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                    index === currentSlide && imagesLoaded.has(index) 
                      ? 'opacity-100 z-[5]' 
                      : 'opacity-0 z-[1]'
                  }`}
                  priority={index === 0}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoad={() => setImagesLoaded(prev => new Set(prev).add(index))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={!allImagesPreloaded}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-[#EE8900] scale-110" 
                  : allImagesPreloaded 
                    ? "bg-gray-600 hover:bg-[#EE8900]/40" 
                    : "bg-gray-400"
              } ${!allImagesPreloaded ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}