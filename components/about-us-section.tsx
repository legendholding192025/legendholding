"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

export function AboutUsSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#fff" }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748417832/about-us_yzut9i.png"
          alt="About Us Background"
          fill
          className="object-cover object-center opacity-100"
          priority
        />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 md:py-20">
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
        {/* Illustration (centered, responsive) */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-2xl aspect-[2.5/1] md:aspect-[2.8/1]">
            <Image
              src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748418916/lumo_rlzjdt.png"
              alt="About Us Illustration"
              fill
              className="object-contain object-center select-none pointer-events-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
} 