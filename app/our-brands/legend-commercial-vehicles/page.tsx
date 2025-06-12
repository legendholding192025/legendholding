"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Animated Text Component
interface AnimatedTextProps {
  children: React.ReactNode
  delay?: number
}

function AnimatedText({ children, delay = 0 }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById(`animated-text-${delay}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      id={`animated-text-${delay}`}
      className="transition-all duration-1000 ease-out"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  )
}

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
            <section className="w-full mb-12 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-4 font-richmond">
                Legend Commercial Vehicles
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-6 text-lg text-gray-700 font-effra leading-relaxed">
                Legend Commercial Vehicles is a leading provider of commercial vehicle solutions in the UAE, offering a comprehensive range of trucks, buses, and specialized vehicles. Our commitment to quality, reliability, and customer service has made us the preferred choice for businesses across various industries.
              </p>
            </section>

            {/* Main Content Section */}
            <section className="w-full mb-12">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-2/5 relative group overflow-hidden">
                    <div className="aspect-[3/2] w-full relative overflow-hidden">
                      <Image
                        src="https://cdn.legendholding.com/images/cdn_683ab636326ef8.83143422_20250531_075638.jpg"
                        width={800}
                        height={600}
                        alt="Legend Commercial Vehicles - Fleet Solutions"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        With a diverse fleet of commercial vehicles and a team of experienced professionals, we provide tailored solutions for transportation, logistics, and construction needs. Our comprehensive after-sales support ensures maximum uptime and operational efficiency for your business.
                      </p>
                    </div>

                    {/* Visit Website Button */}
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                        onClick={() => window.open("https://legendcommercialvehicles.com", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
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