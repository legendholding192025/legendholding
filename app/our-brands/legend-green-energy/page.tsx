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

export default function GreenEnergyPage() {
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
                Legend Green Energy Solutions
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-lg text-gray-700 font-effra leading-relaxed">
                Legend Green Energy Solutions, a trusted provider of sustainable and innovative energy services across the UAE. 
                Specializing in EV chargers (AC & DC), solar power systems, security solutions, and electrical maintenance.
              </p>
            </section>

            {/* Main Content Section */}
            <section className="w-full mb-16">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-2/5 relative group overflow-hidden">
                    <div className="h-full w-full relative overflow-hidden">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748255087/green_energy_solutions_c4gy4a.png"
                        width={800}
                        height={600}
                        alt="Legend Green Energy Solutions - Sustainable Energy Services"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    <div className="space-y-6 mb-8">
                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        The company is committed to enabling a cleaner, smarter future through comprehensive security 
                        solutions including CCTV, access control, and gate barriers. Driven by a team of seasoned 
                        professionals, we support businesses and communities in their transition to renewable energy.
                      </p>
                    </div>

                    {/* View Website Button */}
                    <div className="mt-8 w-full">
                      <button
                        className="w-full py-4 group inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg"
                        onClick={() => window.open("/contact", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            activeSection === "green" ? "translate-x-1" : ""
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
