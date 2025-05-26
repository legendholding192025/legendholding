"use client"
 
import { useState, useEffect } from "react"
import { ArrowUpRight, Award, Globe, Leaf, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
 
export default function ZulEnergyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
 
  useEffect(() => {
    setIsLoaded(true)
  }, [])
 
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden pt-20 md:pt-24 lg:pt-28">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-50 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
 
        <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
          <div
            className={`max-w-7xl w-full transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Enhanced Text Content */}
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
 
                  <div className="relative z-10">
                    {/* Logo with animation */}
                    <div className="mb-6 transform transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1747995669/zul-energy-logo_jkmlxv.svg"
                        alt="Zul Energy Logo"
                        className="h-20 w-auto bg-white rounded-2xl shadow-lg p-2 transition-shadow duration-300 hover:shadow-xl"
                      />
                    </div>
 
                    {/* Enhanced Typography */}
                    <div className="space-y-4">
                      <h1 className="text-5xl md:text-6xl font-bold text-[#2b1c48] leading-tight">
                        <span className="inline-block animate-fade-in-up">Zul</span>{" "}
                        <span className="inline-block animate-fade-in-up animation-delay-200">Energy</span>
                      </h1>
 
                      <h2 className="text-2xl md:text-3xl font-semibold text-[#ee8900] animate-fade-in-up animation-delay-400">
                        Part of Legend Holding
                      </h2>
 
                      {/* Animated divider */}
                      <div className="h-1 w-16 bg-[#ee8900] rounded-full animate-expand-width"></div>
                    </div>
 
                    {/* Enhanced Content */}
                    <div className="mt-8 text-gray-700 text-lg space-y-6 leading-relaxed animate-fade-in-up animation-delay-600">
                      <p className="relative">
                        <span className="font-bold text-[#2b1c48]">ZUL</span> Energy is a manufacturer of premium quality
                        chemical additives for every stage of Oil & Gas field applications. Our commitment to provide
                        quality products, outstanding service, and zero compromises, as complemented by our business
                        values, has seen us growing rapidly to become the preferred vendor for National and International
                        Oil Companies and other international services providers.
                      </p>
 
                      <p className="relative">
                        Our commitment to quality chemical production and following environment regulations have been well
                        acknowledged by the ISO 9001-2015, ISO 14001-2015 and ISO 45001-2018 certifications. Currently,{" "}
                        <span className="font-bold text-[#2b1c48]">ZUL</span> Energy is also expanding its footprint into
                        new Energy sectors.
                      </p>
                    </div>
 
                    {/* Enhanced Features Grid */}
                    <div className="mt-10 grid grid-cols-3 gap-4 animate-fade-in-up animation-delay-800">
                      <div className="text-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-300 group/feature">
                        <Award className="w-8 h-8 text-[#2b1c48] mx-auto mb-2 group-hover/feature:scale-110 transition-transform duration-300" />
                        <p className="text-sm font-semibold text-[#2b1c48]">Quality</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-300 group/feature">
                        <Leaf className="w-8 h-8 text-[#ee8900] mx-auto mb-2 group-hover/feature:scale-110 transition-transform duration-300" />
                        <p className="text-sm font-semibold text-[#2b1c48]">Environment</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group/feature">
                        <Globe className="w-8 h-8 text-[#5d376e] mx-auto mb-2 group-hover/feature:scale-110 transition-transform duration-300" />
                        <p className="text-sm font-semibold text-[#2b1c48]">Global</p>
                      </div>
                    </div>
 
                    {/* Enhanced CTA Button */}
                    <div className="mt-12 animate-fade-in-up animation-delay-1000">
                      <a
                        href="https://www.zulenergy.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative inline-flex items-center gap-3 bg-[#2b1c48] hover:bg-[#5d376e] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                      >
                        <span className="relative z-10">Learn more about Zul Energy</span>
                        <ArrowUpRight
                          className={`w-6 h-6 transition-all duration-300 ${isHovered ? "translate-x-1 -translate-y-1 rotate-12" : ""}`}
                        />
 
                        {/* Button shine effect */}
                        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Right: Enhanced Image Section */}
              <div className="relative animate-fade-in-left animation-delay-400">
                <div className="relative group">
                  {/* Image container with enhanced effects */}
                  <div className="aspect-[4/3] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group-hover:shadow-3xl transition-all duration-500">
                    <img
                      src="https://res.cloudinary.com/dckrspiqe/image/upload/v1747995492/zul_energy_bcdbsv.jpg"
                      alt="Zul Energy Facility"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
 
                    {/* Image overlay on hover */}
                    <div className="absolute inset-0 bg-[#2b1c48] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  </div>
 
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#ee8900] rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">ISO</span>
                  </div>
 
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#2b1c48] rounded-xl shadow-xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}