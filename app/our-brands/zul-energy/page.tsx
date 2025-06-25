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
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da403178ef3.07284478_20250602_131547.jpg",
      description: `ZUL Energy is a manufacturer of premium-quality chemical additives for every stage of oil and gas field applications. Our state-of-the-art facility in Ras Al Khaimah spanning over 700,000 SQFT, is equipped to deliver high-quality products, exceptional service, and zero compromises. Guided by strong business values, we have rapidly grown to become a preferred vendor for both national and international oil companies, as well as global service providers.

With over 200 employees, we proudly serve more than 50 international corporations across the region, delivering with consistency, efficiency, and utmost client satisfaction. Our commitment to quality chemical production and following environment regulations have been well acknowledged by the ISO 2015-9001, ISO 2015-14001 and ISO 2018-45001 certifications. Currently, ZUL Energy is also expanding its footprint to new O&G specialities.`
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
            {/* Page Header (title and decorative lines outside) */}
            <section className="w-full max-w-6xl mx-auto mb-12 px-4 md:px-8 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-4 font-richmond">
                Zul Energy
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>
            </section>
            {/* Single Combined Section */}
            <section className="w-full max-w-6xl mx-auto mb-12 px-4 md:px-8">
              {energySections.map((section, idx) => (
                <div
                  key={section.id}
                  className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl animate-fade-in-up"
                  style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                  onMouseEnter={() => setActiveSection(section.id)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-2/5 relative group overflow-hidden h-[300px] md:h-auto">
                      <div className="h-full w-full relative overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                    {/* Content Section */}
                    <div className="flex-1 p-8 flex flex-col justify-center relative">
                      {/* Description moved inside card */}
                      <p className="text-gray-700 text-lg font-effra mb-6">
                        ZUL Energy is a manufacturer of premium-quality chemical additives for every stage of oil and gas field applications. Our state-of-the-art facility in Ras Al Khaimah spanning over 700,000 SQFT, is equipped to deliver high-quality products, exceptional service, and zero compromises. Guided by strong business values, we have rapidly grown to become a preferred vendor for both national and international oil companies, as well as global service providers.
                      </p>
                      <h3 className="text-2xl font-richmond font-bold text-[#2b1c48] mb-4 group-hover:text-[#5d376e] transition-colors duration-300">
                        {section.title}
                      </h3>
                      <p className="text-lg font-effra text-gray-700 mb-6 leading-relaxed">
                        With over 200 employees, we proudly serve more than 50 international corporations across the region, delivering with consistency, efficiency, and utmost client satisfaction. Our commitment to quality chemical production and following environment regulations have been well acknowledged by the ISO 2015-9001, ISO 2015-14001 and ISO 2018-45001 certifications. Currently, ZUL Energy is also expanding its footprint to new O&G specialities.
                      </p>
                      {/* CTA Button */}
                      <div className="mt-6">
                        <button
                          onClick={handleLearnMore}
                          className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                        >
                          <span>Visit Website</span>
                          <ChevronRight
                            className={`w-4 h-4 transform transition-transform duration-300 ${
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
