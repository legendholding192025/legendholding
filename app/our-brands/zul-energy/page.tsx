"use client"
import { useEffect, useState } from "react"
import { ChevronRight, Zap, Award, Globe } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Counter Animation Component
interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
  startDelay?: number
}

function AnimatedCounter({ target, suffix = "", duration = 2000, startDelay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)

          setTimeout(() => {
            const startTime = Date.now()
            const startValue = 0
            const endValue = target

            const animate = () => {
              const now = Date.now()
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)

              // Easing function for smooth deceleration
              const easeOut = 1 - Math.pow(1 - progress, 3)
              const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut)

              setCount(currentValue)

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            animate()
          }, startDelay)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById(`counter-${target}-${suffix}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [target, duration, startDelay, isVisible, suffix])

  return (
    <span
      id={`counter-${target}-${suffix}`}
      className="inline-block tabular-nums"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.5s ease-out",
      }}
    >
      {count}
      {suffix}
    </span>
  )
}

interface EnergySection {
  id: string
  title: string
  image: string
  description: string
}

export default function ZulEnergyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const energySections: EnergySection[] = [
    {
      id: "zul-energy-overview",
      title: "Chemical Additives Excellence & Global Standards",
      image: "https://cdn.legendholding.com/images/68382e9abbe3a.jpg",
      description: `ZUL Energy is a manufacturer of premium quality chemical additives for every stage of Oil & Gas field applications. Our commitment to provide quality products, outstanding service, and zero compromises has established us as a trusted partner in the energy sector.

Our commitment to quality chemical production and following environment regulations have been well acknowledged by the ISO 9001-2015, ISO 14001-2015 and ISO 45001-2018 certifications. These certifications demonstrate our unwavering dedication to quality management, environmental stewardship, and occupational health and safety standards.

ZUL Energy continues to expand its footprint in the energy sector while maintaining the highest standards of quality, environmental responsibility, and customer satisfaction. Our ISO certifications and years of experience make us a trusted partner for all your chemical additive needs.`
    }
  ]

  const handleLearnMore = () => {
    window.open("https://www.zulenergy.com/", "_blank")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden pt-20">
        <div className="relative z-10 flex flex-col items-center py-12">
          <div
            className={`w-full transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Page Header */}
            <section className="w-full mb-16 animate-fade-in-up px-12 md:px-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond">
                Zul Energy
              </h2>
              <div className="flex gap-2 mb-8">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="text-gray-700 text-lg max-w-3xl animation-delay-400 font-effra">
                Part of Legend Holding Group, ZUL Energy is expanding its footprint into new Energy sectors while
                maintaining the highest standards of quality and environmental responsibility.
              </p>
            </section>

            {/* Single Combined Section */}
            <section className="w-full mb-16 px-12 md:px-24">
              {energySections.map((section, idx) => (
                <div
                  key={section.id}
                  className="bg-white shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl animate-fade-in-up rounded-xl"
                  style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                  onMouseEnter={() => setActiveSection(section.id)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/4 relative group overflow-hidden rounded-l-xl">
                      <div className="h-full w-full relative overflow-hidden bg-[#2b1c48]/5">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-richmond font-bold text-[#2b1c48] mb-4 group-hover:text-[#5d376e] transition-colors duration-300">
                        {section.title}
                      </h3>

                      {section.description.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-lg font-effra text-gray-700 mb-6 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}

                      {/* Learn More Button */}
                      <div className="mt-8 w-full">
                        <button
                          onClick={handleLearnMore}
                          className="w-full py-4 group inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg"
                        >
                          <span>View Website</span>
                          <ChevronRight
                            className={`w-5 h-5 transform transition-transform duration-300 ${
                              activeSection === section.id ? "translate-x-1" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
