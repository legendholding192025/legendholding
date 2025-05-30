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
    <div className="bg-[#2B1C48] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Header - Left Aligned */}
        <div className="max-w-2xl mb-20">
          {/* <span className="text-[#EE8900] font-medium mb-4 block">Our Culture</span> */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            A Place of Culture,<br />
            Growth and Innovation
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            At Legend Holdings, we believe in creating an environment where talent thrives, innovation flourishes, and careers reach new heights.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          {/* Left Content */}
          <div className="space-y-8 h-full">
            <div className="h-full">
              <div className="bg-white p-8 rounded-l-2xl h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl lg:text-6xl font-bold text-[#EE8900] mb-6">{currentSlideData.title}</h2>
                  <p className="text-[#5E366D] text-lg leading-relaxed">{currentSlideData.description}</p>
                </div>
                {/* Navigation */}
                <div className="flex items-center justify-between pt-8 mt-8">
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
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-full">
            <div className="aspect-[4/3] overflow-hidden rounded-r-2xl h-full">
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