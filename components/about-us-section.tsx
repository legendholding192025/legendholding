"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

export function AboutUsSection() {
  return (
    <section className="relative w-full h-[80vh]" style={{ backgroundColor: "#fff" }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683d3c6534d604.31267381_20250602_055341.png"
          alt="About Us Background"
          fill
          className="object-cover object-center opacity-100"
          priority
        />
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col items-center justify-center">
          {/* Heading */}
          <h2
            className="font-richmond text-3xl md:text-4xl font-bold text-[#EE8900] text-center mb-4"
            style={{ letterSpacing: "0.01em" }}
          >
            About Us
          </h2>
          {/* Animated Underline */}
          <div className="mx-auto mb-8">
            <span className="block h-1 w-16 bg-[#EE8900] rounded-full animate-pulse" />
          </div>
          {/* Summary Sentence */}
          <div className="font-effra text-white text-center max-w-6xl mb-12">
            <p className="leading-relaxed text-[24px]">
              Legend Holding Group is a diversified enterprise headquartered in Dubai, operating across the Middle east and African region. With a strong focus on sustainability and innovation, the group manages a growing portfolio of companies in automotive, trading, energy, Travel and Tourism and mobility services.
              <Link 
                href="/about"
                className="inline-block ml-2 text-[#EE8900] hover:text-[#F08900] transition-colors duration-300 font-medium"
              >
                View More
              </Link>
            </p>
          </div>
          {/* Illustration */}
          <div className="w-full max-w-2xl">
            <div className="relative w-full h-48 md:h-56 lg:h-64">
              <Image
                src="https://cdn.legendholding.com/images/cdn_683e937dd5c436.17836257_20250603_061733.png"
                alt="About Us Illustration"
                fill
                className="object-contain object-center select-none pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 