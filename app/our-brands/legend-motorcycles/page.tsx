"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Bike, Zap, Shield, Award, Globe, TrendingUp, ChevronRight } from "lucide-react"
import Image from "next/image"

type AnimatedCounterProps = {
  target: number
  suffix?: string
  duration?: number
  startDelay?: number
}

function AnimatedCounter({ target, suffix = "", duration = 2000, startDelay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const end = target
      const incrementTime = duration / end

      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) clearInterval(timer)
      }, incrementTime)

      return () => clearInterval(timer)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [target, duration, startDelay])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

type AnimatedTextProps = {
  children: React.ReactNode
  delay?: number
}

function AnimatedText({ children, delay = 0 }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  )
}

export default function MotorcyclesPage() {
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
                Motors Motorcycles
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-lg text-gray-700 font-effra leading-relaxed">
                Legend Motorcycles is the official distributor and assembly of Lifan Bikes in the UAE, the leading choice for
                delivery professionals across the country. Renowned for their efficiency, reliability, and fuel economy, 
                Lifan Bikes are trusted across sectors, from food to pharmaceutical delivery.
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
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1747998254/lifan_yhes49.png"
                        width={800}
                        height={600}
                        alt="Legend Motorcycles - Lifan Logo"
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
                        Our commitment to excellence ensures that every motorcycle meets the highest standards of quality
                        and performance, making us the preferred choice for businesses and individuals alike.
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Bike className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={5000} suffix="+" duration={1000} startDelay={800} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Bikes Delivered</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <TrendingUp className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={98} suffix="%" duration={1000} startDelay={900} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Customer Satisfaction</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto">
                          <Globe className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 font-richmond">
                          <AnimatedCounter target={50} suffix="+" duration={1000} startDelay={1000} />
                        </div>
                        <div className="text-xs text-gray-600 font-effra">Service Centers</div>
                      </div>
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-auto">
                      <button
                        className={`group inline-flex items-center gap-2 text-[#ee8900] font-semibold hover:text-[#2b1c48] transition-colors duration-300 cursor-pointer`}
                        onClick={() => window.open("https://www.legendmotorcycles.com", "_blank")}
                      >
                        <span>Learn more</span>
                        <ChevronRight
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            activeSection === "motorcycles" ? "translate-x-1" : ""
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
              <div className="bg-white rounded-3xl p-8 md:p-12 animate-fade-in-up animation-delay-800 border border-gray-100 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 font-richmond">Fuel Efficient</span>
                    </div>
                    <p className="text-sm text-gray-600 font-effra">
                      Advanced engine technology for maximum fuel economy
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 font-richmond">Reliable</span>
                    </div>
                    <p className="text-sm text-gray-600 font-effra">Built to withstand demanding delivery schedules</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 font-richmond">Quality Assured</span>
                    </div>
                    <p className="text-sm text-gray-600 font-effra">Rigorous quality control and testing standards</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 font-richmond">UAE Wide</span>
                    </div>
                    <p className="text-sm text-gray-600 font-effra">Comprehensive service network across the UAE</p>
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