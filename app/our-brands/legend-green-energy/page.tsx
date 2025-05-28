"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Zap, Leaf, Shield, Car, Sun, Eye, ChevronRight } from "lucide-react"
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
                Green Energy Solutions
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

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Leaf className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={500} suffix="+" duration={1500} startDelay={1600} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Green Projects</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Car className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={1000} suffix="+" duration={1500} startDelay={1800} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">EV Chargers</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Shield className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={99} suffix="%" duration={1500} startDelay={2000} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Satisfaction</div>
                      </div>
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-auto">
                      <button
                        className={`group inline-flex items-center gap-2 text-[#ee8900] font-semibold hover:text-[#2b1c48] transition-colors duration-300 cursor-pointer`}
                        onClick={() => window.open("/contact", "_blank")}
                      >
                        <span>Learn more</span>
                        <ChevronRight
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            activeSection === "services" ? "translate-x-1" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="w-full mb-16">
              <div className="bg-white rounded-3xl overflow-hidden animate-fade-in-up animation-delay-800 border border-gray-100 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Features List */}
                  <div className="p-8 md:p-12 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Car className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">EV Chargers</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          AC & DC charging solutions for electric vehicles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sun className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Solar Power</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Renewable solar energy systems and installations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Security Solutions</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          CCTV, access control, and gate barrier systems
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Image */}
                  <div className="relative group overflow-hidden">
                    <div className="h-full w-full relative overflow-hidden">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748336314/nuno-marques-Az0Ed9t8hpk-unsplash_ruc7xi.jpg"
                        width={800}
                        height={600}
                        alt="Legend Green Energy Solutions - Sustainable Energy Services"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
