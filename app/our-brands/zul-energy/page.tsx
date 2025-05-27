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
  stats?: Array<{
    icon: React.ElementType
    value: number
    suffix: string
    label: string
  }>
  isLogo?: boolean
}

export default function ZulEnergyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const energySections: EnergySection[] = [
    {
      id: "chemical-additives",
      title: "Chemical Additives Excellence",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1747995492/zul_energy_bcdbsv.jpg",
      description:
        "ZUL Energy is a manufacturer of premium quality chemical additives for every stage of Oil & Gas field applications. Our commitment to provide quality products, outstanding service, and zero compromises has established us as a trusted partner in the energy sector.",
    },
    {
      id: "certifications",
      title: "Global Standards & Certifications",
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1747995669/zul-energy-logo_jkmlxv.svg",
      description:
        "Our commitment to quality chemical production and following environment regulations have been well acknowledged by the ISO 9001-2015, ISO 14001-2015 and ISO 45001-2018 certifications. These certifications demonstrate our unwavering dedication to quality management, environmental stewardship, and occupational health and safety standards.",
      isLogo: true,
      stats: [
        { icon: Award, value: 3, suffix: "", label: "ISO Certifications" },
        { icon: Globe, value: 100, suffix: "%", label: "Quality Standards" },
      ],
    },
  ]

  const handleLearnMore = () => {
    window.open("https://www.zulenergy.com/", "_blank")
  }

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
                Zul Energy
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-gray-700 text-lg max-w-3xl animation-delay-400 font-effra">
                Part of Legend Holding Group, ZUL Energy is expanding its footprint into new Energy sectors while
                maintaining the highest standards of quality and environmental responsibility.
              </p>
            </section>

            {/* Energy Sections */}
            <section className="w-full space-y-12 mb-16">
              {energySections.map((section, idx) => (
                <div
                  key={section.id}
                  className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl animate-fade-in-up`}
                  style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                  onMouseEnter={() => setActiveSection(section.id)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image/Logo */}
                    <div className="md:w-2/5 relative group overflow-hidden">
                      <div
                        className={`h-full w-full relative overflow-hidden ${
                          section.isLogo ? "bg-gray-50 flex items-center justify-center" : "bg-[#2b1c48]/5"
                        }`}
                      >
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt={`${section.title} - ZUL Energy`}
                          className={`${
                            section.isLogo
                              ? "max-w-[60%] h-auto object-contain"
                              : "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          }`}
                        />
                        {!section.isLogo && (
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-richmond font-bold text-[#2b1c48] mb-4 group-hover:text-[#5d376e] transition-colors duration-300">
                        {section.title}
                      </h3>
                      <p className="text-lg font-effra text-gray-700 mb-6 leading-relaxed">{section.description}</p>

                      {/* Stats Grid for second section */}
                      {section.stats && (
                        <div className="grid grid-cols-2 gap-6">
                          {section.stats.map((stat, statIdx) => (
                            <div key={statIdx} className="text-center">
                              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                                <stat.icon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div className="text-xl font-bold text-gray-900 font-richmond">
                                <AnimatedCounter
                                  target={stat.value}
                                  suffix={stat.suffix}
                                  duration={1500}
                                  startDelay={1400 + statIdx * 200}
                                />
                              </div>
                              <div className="text-xs text-gray-600 font-effra">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Learn More Button for first section */}
                      {!section.stats && (
                        <div className="mt-8">
                          <button
                            onClick={handleLearnMore}
                            className={`group inline-flex items-center gap-2 text-[#ee8900] font-semibold hover:text-[#2b1c48] transition-colors duration-300 cursor-pointer`}
                          >
                            <span>Learn more</span>
                            <ChevronRight
                              className={`w-5 h-5 transform transition-transform duration-300 ${
                                activeSection === section.id ? "translate-x-1" : ""
                              }`}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Additional Information Section */}
            <section className="w-full bg-white rounded-3xl p-8 md:p-12 animate-fade-in-up animation-delay-800 border border-gray-100 shadow-2xl">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-2xl font-richmond font-bold text-[#2b1c48] mb-4">Commitment to Excellence</h3>
                <p className="text-lg font-effra text-gray-700 leading-relaxed">
                  ZUL Energy continues to expand its footprint in the energy sector while maintaining the highest
                  standards of quality, environmental responsibility, and customer satisfaction. Our ISO certifications
                  and years of experience make us a trusted partner for all your chemical additive needs.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
