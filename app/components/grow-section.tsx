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
      "https://cdn.legendholding.com/images/cdn_684c22e344b9e8.68563671_20250613_130851.jpeg",
  },
  {
    id: 2,
    title: "Growth",
    description:
      "We don't believe in one-track careers. As a diversified group, we offer cross-industry exposure and clear pathways for development. Whether it's through our training academy, mentorship, or hands-on experience, we give you the tools to shape your career.",
    image:
      "https://cdn.legendholding.com/images/cdn_684c22c6e23ed4.90404297_20250613_130822.jpg",
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

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide, index) => {
        const img = new window.Image()
        img.onload = () => {
          setImagesLoaded(prev => new Set(prev).add(index))
        }
        img.src = slide.image
      })
    }
    
    preloadImages()
  }, [])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 300)
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
                    disabled={isTransitioning}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
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
            <div className="overflow-hidden rounded-2xl lg:rounded-l-none lg:rounded-r-2xl h-full w-full">
              {/* Loading placeholder */}
              {!imagesLoaded.has(currentSlide) && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse z-10" />
              )}
              
              <Image
                src={currentSlideData.image}
                alt={`${currentSlideData.title} - Legend Holdings team collaboration`}
                width={800}
                height={600}
                className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
                  imagesLoaded.has(currentSlide) ? 'opacity-100' : 'opacity-0'
                }`}
                priority={currentSlide === 0}
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onLoad={() => setImagesLoaded(prev => new Set(prev).add(currentSlide))}
              />
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#EE8900] scale-110" : "bg-gray-600 hover:bg-[#EE8900]/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}