"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Belong",
    description:
      "Join a vibrant community at Legend Holdings where innovation meets collaboration. Experience a culture that celebrates diversity, empowers individuals, and fosters meaningful connections across our global network.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Grow",
    description:
      "With diverse industries spanning Automotive, Trading, Real Estate, Technology, and Healthcare, Legend Holdings offers unparalleled opportunities for career advancement and professional development across the Middle East and beyond.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Excel",
    description:
      "Achieve excellence through our comprehensive development programs, mentorship opportunities, and exposure to cutting-edge technologies and world-renowned brands. At Legend, your success is our priority.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1374&auto=format&fit=crop",
  },
]

export default function GrowSection() {
  const [currentSlide, setCurrentSlide] = useState(1)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="bg-[#2B1C48] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Header - Left Aligned */}
        <div className="max-w-2xl mb-20">
          <span className="text-[#EE8900] font-medium mb-4 block">Our Culture</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            A Place To Belong,<br />
            Grow, and Excel
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            At Legend Holdings, we believe in creating an environment where talent thrives, innovation flourishes, and careers reach new heights.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#EE8900] mb-8">{currentSlideData.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{currentSlideData.description}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-lg">
                  {currentSlide + 1} / {slides.length}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-[#EE8900]/30 flex items-center justify-center text-[#EE8900] hover:text-white hover:border-[#EE8900] hover:bg-[#EE8900] transition-all duration-300 group"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
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
        <div className="flex justify-center mt-12 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
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