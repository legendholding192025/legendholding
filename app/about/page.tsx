"use client"

import Image from "next/image"
import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Header />
      <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: "#fff" }}>
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
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-32 md:py-40">
          {/* Heading */}
          <h2
            className="font-richmond text-3xl md:text-4xl font-bold text-[#EE8900] text-center mb-4"
            style={{ letterSpacing: "0.01em" }}
          >
            About Us
          </h2>
          {/* Animated Underline */}
          <div className="mx-auto mb-12">
            <span className="block h-1 w-16 bg-[#EE8900] rounded-full animate-pulse" />
          </div>
          {/* Full Content */}
          <div className="font-effra text-white text-center max-w-6xl mb-16">
            <div className="space-y-8">
              <p className="leading-relaxed text-[24px]">
                Legend Holding Group is a diversified enterprise headquartered in Dubai, operating across the Middle east and African region. With a strong focus on sustainability and innovation, the group manages a growing portfolio of companies in automotive, trading, energy, Travel and Tourism and mobility services.
              </p>
              <p className="leading-relaxed text-[24px]">
                Its subsidiaries include Legend Motors, Legend Travel and Tourism, Legend Rent a Car, Zul Energy by Legend holding, Lifan motorcycles and exclusive importer of Li Auto, Skywell, and Kaiyi vehicles, as well as Legend Green Energy Solutions. 
              </p>
              <p className="leading-relaxed text-[24px]">
                Rooted in Loyalty, Excellence, and Progress, we lead with innovation and technology to seamlessly connect the physical and digital worlds.
              </p>
              <p className="leading-relaxed text-[24px]">
                Our goal is to become a leader in intelligent, data-driven solutions because Together We Grow.
              </p>
            </div>
          </div>
          {/* Illustration (centered, responsive) */}
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-2xl aspect-[2.5/1] md:aspect-[2.8/1]">
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
      </section>
      <Footer />
    </>
  )
} 