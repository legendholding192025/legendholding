"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Culture",
    description:
      "We've built a culture rooted in trust, respect, and shared ambition. With over 35 nationalities working toward one vision, we celebrate diversity and grow together. Our leaders are transparent and accessible, and we recognize every win, big or small, because we believe that when one of us grows, we all do.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Growth",
    description:
      "We don't believe in one-track careers. As a diversified group, we offer cross-industry exposure and clear pathways for development. Whether it's through our training academy, mentorship, or hands-on experience, we give you the tools to shape your career.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Innovation",
    description:
      "We listen to every idea. We believe great ideas can come from anyone, anywhere. That's why we encourage our team member to share their thoughts and take ownership. If you have an idea, we'll help you shape it, champion it, and bring it to life, because innovation starts with you.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1374&auto=format&fit=crop",
  },
]

export default function GrowSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-r-none lg:rounded-l-2xl h-full flex flex-col justify-between min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
              <div className="max-w-[90%] lg:max-w-[85%]">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EE8900] mb-2 sm:mb-3">{currentSlideData.title}</h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#5E366D] leading-relaxed max-w-[90%] lg:max-w-[85%]">{currentSlideData.description}</p>
              </div>
              {/* Navigation */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm sm:text-base">
                    {currentSlide + 1} / {slides.length}
                  </span>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={prevSlide}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <div className="overflow-hidden rounded-2xl lg:rounded-l-none lg:rounded-r-2xl h-full w-full">
              <Image
                src={currentSlideData.image}
                alt={`${currentSlideData.title} - Legend Holdings team collaboration`}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                priority
              />
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
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