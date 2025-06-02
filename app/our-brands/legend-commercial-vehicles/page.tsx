"use client"

import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { AnimatedCounter } from "../../../components/animated-counter"

export default function LegendCommercialVehiclesPage() {
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
            {/* Page Header */}
            <section className="w-full mb-16 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond">
                Legend Commercial Vehicles
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-lg text-gray-700 font-effra leading-relaxed">
                Legend Commercial Vehicles specializes in providing comprehensive commercial vehicle solutions, 
                offering a wide range of trucks, vans, and specialized vehicles for businesses across the UAE. 
                Our commitment to quality, reliability, and customer service makes us the preferred choice for 
                commercial vehicle needs.
              </p>
            </section>

            {/* Main Content Section */}
            <section className="w-full mb-16">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/2 relative group overflow-hidden">
                    <div className="aspect-[4/3] md:h-full w-full relative overflow-hidden">
                      <Image
                        src="https://cdn.legendholding.com/images/cdn_683ab636326ef8.83143422_20250531_075638.jpg"
                        width={1000}
                        height={800}
                        alt="Legend Commercial Vehicles - Business Solutions"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-10 md:p-12 flex flex-col justify-center">
                    <div className="space-y-8 mb-8">
                      <p className="text-xl text-gray-700 font-effra leading-relaxed">
                        Since their inception in <span className="font-semibold text-[#2b1c48]">2013</span>, Legend Commercial Vehicles
                        has achieved remarkable sales figures, reaching an impressive{" "}
                        <span className="font-bold text-[#ee8900]">
                          <AnimatedCounter target={55} suffix="M USD" duration={2000} startDelay={800} />
                        </span>{" "}
                        in a year.
                      </p>

                      <p className="text-xl text-gray-700 font-effra leading-relaxed">
                        These numbers not only validate Legend Commercial Vehicles' position as a market leader but also affirm the trust
                        and confidence of their valued customers across the region.
                      </p>
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-10 w-full">
                      <button
                        className="w-full py-5 group inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg text-lg"
                        onClick={() => window.open("https://www.legendcommercialvehicles.com", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-6 h-6 transform transition-transform duration-300 ${
                            activeSection === "commercial" ? "translate-x-1" : ""
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