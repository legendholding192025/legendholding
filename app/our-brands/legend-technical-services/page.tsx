"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Settings, Building, Users, Shield, CheckCircle, Zap, ChevronRight } from "lucide-react"
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

export default function TechnicalServicesPage() {
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
                Technical Services
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-lg text-gray-700 font-effra leading-relaxed">
                Legend Technical Services is world-class facilities management. As part of our one-stop solution concept, 
                becoming self-sufficient in facilities is a critical step. Establishing Legend Facility Management, which 
                serves as our project control gate.
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
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da2fc6fd9b2.48641261_20250602_131124.jpg"
                        width={800}
                        height={600}
                        alt="Legend Technical Services - World-Class Facilities Management"
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
                        Our comprehensive services span across governmental, commercial, residential and industrial 
                        foundations, ensuring optimal facility performance and operational excellence. Through advanced 
                        technology integration and expert project management, we deliver sustainable, efficient, and 
                        cost-effective facility solutions that exceed industry standards.
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Building className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={200} suffix="+" duration={1500} startDelay={1600} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Facilities</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <CheckCircle className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={24} suffix="/7" duration={1500} startDelay={1800} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Operations</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Zap className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={99} suffix="%" duration={1500} startDelay={2000} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Efficiency</div>
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
                        <Building className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Governmental</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Specialized solutions for public sector facilities
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Commercial</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Comprehensive business facility management
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Residential</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Premium residential facility services
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Settings className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Industrial</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Advanced industrial facility solutions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Image */}
                  <div className="relative group overflow-hidden">
                    <div className="h-full w-full relative overflow-hidden">
                      <Image
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da33906dec9.67996794_20250602_131225.jpg"
                        width={800}
                        height={600}
                        alt="Legend Technical Services - Facility Management"
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
