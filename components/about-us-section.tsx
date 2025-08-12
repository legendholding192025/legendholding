"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

export function AboutUsSection() {
  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24" style={{ backgroundColor: "#fff" }}>
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-10">
          {/* Heading and Underline Group */}
          <div className="space-y-1 md:space-y-2">
            <h2
              className="font-richmond text-3xl md:text-4xl lg:text-5xl font-bold text-[#EE8900]"
              style={{ letterSpacing: "0.01em" }}
            >
              About Us
            </h2>
            {/* Animated Underline */}
            <div>
              <span className="block h-1 w-16 bg-[#EE8900] rounded-full animate-pulse mx-auto" />
            </div>
          </div>
          {/* Summary Sentence */}
          <div className="font-effra text-white max-w-4xl lg:max-w-6xl">
            <p className="leading-relaxed text-lg md:text-xl lg:text-2xl">
              Legend Holding Group is a diversified enterprise headquartered in Dubai, operating across the Middle East and African region. With a strong focus on sustainability and innovation, the group manages a growing portfolio of companies in automotive, trading, energy, Travel and Tourism and mobility services.
              <Link 
                href="/who-we-are/about-us"
                className="inline-block ml-2 text-[#EE8900] hover:text-[#F08900] transition-colors duration-300 font-medium"
              >
                View More
              </Link>
            </p>
          </div>
          {/* Illustration */}
          <div className="w-full max-w-2xl">
            <div className="relative w-full h-56 md:h-64 lg:h-72 xl:h-80 mt-6">
              <img
                src="/lumo.svg"
                alt="About Us Illustration"
                className="w-full h-full object-contain object-center select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 