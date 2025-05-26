"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Zap, Leaf, Shield, Car, Sun, Eye } from "lucide-react"
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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden">
        <section className="relative py-24 md:py-32 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Main Heading */}
                <AnimatedText delay={200}>
                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3D1A78] font-richmond leading-tight">
                      Legend
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#27AE60] font-richmond">
                      Green Energy Solutions
                    </h3>
                  </div>
                </AnimatedText>

                {/* Content Paragraphs */}
                <div className="space-y-6">
                  <AnimatedText delay={400}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Legend Green Energy Solutions, a{" "}
                      <span className="font-semibold text-[#27AE60]">trusted provider of sustainable and innovative</span>{" "}
                      energy services across the UAE. Specializing in{" "}
                      <span className="font-semibold text-[#3D1A78]">EV chargers (AC & DC)</span>, solar power systems,
                      security solutions, and electrical maintenance.
                    </p>
                  </AnimatedText>

                  <AnimatedText delay={600}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      The company is committed to enabling a{" "}
                      <span className="font-semibold text-[#27AE60]">cleaner, smarter future</span> through comprehensive
                      security solutions including{" "}
                      <span className="font-semibold text-[#E67E22]">CCTV, access control, and gate barriers</span>.
                    </p>
                  </AnimatedText>

                  <AnimatedText delay={800}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Driven by a team of <span className="font-semibold text-[#3D1A78]">seasoned professionals</span>,
                      Legend Green Energy Solutions supports businesses and communities in their transition to renewable
                      energy by offering tailored solutions that reduce carbon footprints.
                    </p>
                  </AnimatedText>

                  <AnimatedText delay={1000}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      From promoting clean transportation through EV charger installations to enhancing property safety
                      and ensuring operational continuity, the team delivers with{" "}
                      <span className="font-semibold text-[#E67E22]">
                        precision and exceptional customer satisfaction
                      </span>
                      .
                    </p>
                  </AnimatedText>
                </div>

                {/* Energy Solutions Grid */}
                <AnimatedText delay={1200}>
                  <div className="grid grid-cols-2 gap-6 pt-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                          <Car className="w-4 h-4 text-[#27AE60]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">EV Chargers</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">AC & DC charging solutions for electric vehicles</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F39200]/10 rounded-full flex items-center justify-center">
                          <Sun className="w-4 h-4 text-[#F39200]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Solar Power</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Renewable solar energy systems and installations</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#3D1A78]/10 rounded-full flex items-center justify-center">
                          <Eye className="w-4 h-4 text-[#3D1A78]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Security Solutions</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">CCTV, access control, and gate barrier systems</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E67E22]/10 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-[#E67E22]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Electrical Maintenance</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Comprehensive electrical service and maintenance</p>
                    </div>
                  </div>
                </AnimatedText>

                {/* Stats Section */}
                <AnimatedText delay={1400}>
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#27AE60]/10 rounded-full mb-3 mx-auto">
                        <Leaf className="w-6 h-6 text-[#27AE60]" />
                      </div>
                      <div className="text-2xl font-bold text-[#27AE60] font-richmond">
                        <AnimatedCounter target={500} suffix="+" duration={1500} startDelay={1600} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Green Projects</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#E67E22]/10 rounded-full mb-3 mx-auto">
                        <Car className="w-6 h-6 text-[#E67E22]" />
                      </div>
                      <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                        <AnimatedCounter target={1000} suffix="+" duration={1500} startDelay={1800} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">EV Chargers Installed</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#3D1A78]/10 rounded-full mb-3 mx-auto">
                        <Shield className="w-6 h-6 text-[#3D1A78]" />
                      </div>
                      <div className="text-2xl font-bold text-[#3D1A78] font-richmond">
                        <AnimatedCounter target={99} suffix="%" duration={1500} startDelay={2000} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Customer Satisfaction</div>
                    </div>
                  </div>
                </AnimatedText>
              </div>

              {/* Right Column - Image */}
              <div className="order-first lg:order-last">
                <AnimatedText delay={300}>
                  <div className="relative">
                    {/* Background Geometric Elements */}
                    <div className="absolute inset-0 -z-10">
                      <div
                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#27AE60]/20 to-[#2ECC71]/20 rounded-2xl transform rotate-12"
                        style={{
                          transform: `rotate(12deg) translateY(${scrollY * 0.1}px)`,
                          transition: "transform 0.1s ease-out",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#E67E22]/20 to-[#F39200]/20 rounded-2xl transform -rotate-12"
                        style={{
                          transform: `rotate(-12deg) translateY(${scrollY * -0.05}px)`,
                          transition: "transform 0.1s ease-out",
                        }}
                      />
                    </div>

                    {/* Main Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748255087/green_energy_solutions_c4gy4a.png"
                        width={800}
                        height={600}
                        alt="Legend Green Energy Solutions - Sustainable Energy Services"
                        className="w-full h-full object-cover brightness-110 contrast-105"
                        priority
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#27AE60]/30 via-transparent to-transparent" />

                      {/* Floating Green Energy Badge */}
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#27AE60] to-[#2ECC71] rounded-full flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#27AE60] font-richmond">Sustainable</div>
                            <div className="text-sm text-gray-600 font-effra">Energy Solutions</div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Stats Badge */}
                      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#27AE60] font-richmond">
                            <AnimatedCounter target={500} suffix="+" duration={2000} startDelay={1000} />
                          </div>
                          <div className="text-sm text-gray-600 font-effra">Green Projects</div>
                        </div>
                      </div>

                      {/* EV Charging Badge */}
                      <div className="absolute top-6 right-6 bg-[#E67E22]/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm font-richmond">EV Charging Solutions</span>
                        </div>
                      </div>

                      {/* Clean Future Badge */}
                      <div className="absolute bottom-6 left-6 bg-[#3D1A78]/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="text-white font-bold text-sm tracking-wider font-richmond">CLEANER FUTURE</div>
                      </div>

                      {/* Solar Power Indicator */}
                      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#F39200]/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Sun className="w-5 h-5 text-white" />
                      </div>

                      {/* Security Solutions Indicator */}
                      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#3D1A78]/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>
        </section>

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#27AE60]/5 to-[#2ECC71]/5 rounded-full"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#E67E22]/5 to-[#F39200]/5 rounded-full"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
