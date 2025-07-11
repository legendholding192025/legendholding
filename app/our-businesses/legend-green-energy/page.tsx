"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import Image from "next/image"
import { AnimatedCounter } from "../../../components/animated-counter"

export default function LegendGreenEnergyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
 
  useEffect(() => {
    setIsLoaded(true)
  }, [])
 
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden pt-20">
        <div className="relative z-10 flex flex-col items-center py-12 px-4">
          <div
            className={`w-full max-w-6xl transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Page Header (title and decorative lines outside) */}
            <section className="w-full mb-16 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond animation-delay-200">
                Legend Green Energy Solutions
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>
            </section>
            {/* Main Content Section */}
            <section className="w-full mb-16">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/2 relative group overflow-hidden h-[300px] md:h-auto">
                    <div className="h-full w-full relative overflow-hidden">
                      <Image
                        src="https://cdn.legendholding.com/images/cdn_6856599ed32869.86610075_20250621_070502.png"
                        width={800}
                        height={600}
                        alt="Legend Green Energy Solutions - Sustainable Energy Services"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: "center 95%" }}
                        priority
                        sizes="(max-width: 768px) 100vw, 40vw"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    {/* Description moved inside card */}
                    <p className="text-gray-700 text-lg font-effra mb-6">
                      Legend Green Energy Solutions, a trusted provider of sustainable and innovative
                      energy services across the UAE. Specializing in EV chargers (AC & DC), solar power
                      systems, security solutions (including CCTV, access control, and gate barriers),
                      and electrical maintenance, the company is committed to enabling a cleaner,
                      smarter future.
                    </p>
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        Driven by a team of seasoned professionals, Legend Green Energy Solutions
                        supports businesses and communities in their transition to renewable energy by
                        offering tailored solutions that reduce carbon footprints and meet distinct energy
                        needs. From promoting clean transportation through EV charger installations to
                        enhancing property safety and ensuring operational continuity, the team delivers
                        with precision and a focus on exceptional customer satisfaction.
                      </p>
                    </div>
                    {/* Learn More Button */}
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                        onClick={() => window.open("https://www.legendenergysolutions.com/", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            activeSection === "energy" ? "translate-x-1" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
