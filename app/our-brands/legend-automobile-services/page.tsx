"use client"

import Image from "next/image"
import { useEffect, useState, ReactNode } from "react"
import { Wrench, Shield, Users, Star, CheckCircle } from "lucide-react"
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
  children: ReactNode
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

export default function AutomobileServicesPage() {
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#3D1A78] font-richmond">
                      Automobile Services
                    </h3>
                  </div>
                </AnimatedText>

                {/* Content Paragraphs */}
                <div className="space-y-6">
                  <AnimatedText delay={400}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Legend Motors proudly operates{" "}
                      <span className="font-semibold text-[#3D1A78]">Legend World Automobile Services</span>, a premier
                      provider of high-end automotive care, offering a full spectrum of repair, maintenance, and detailing
                      solutions for all types of luxury vehicles, including electric models.
                    </p>
                  </AnimatedText>

                  <AnimatedText delay={600}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Certified with the prestigious{" "}
                      <span className="font-semibold text-[#E67E22]">MOIAT (ESMA) 5-star rating</span>, the facility
                      reflects our unwavering commitment to quality, safety, and service excellence.
                    </p>
                  </AnimatedText>

                  <AnimatedText delay={800}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Housed in a state-of-the-art workshop, the center is equipped with the latest diagnostic and repair
                      technologies, and staffed by highly trained professionals who deliver personalized care and
                      precision in every service.
                    </p>
                  </AnimatedText>

                  <AnimatedText delay={1000}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      From mechanical and electrical repairs to bodywork, detailing, and air-conditioning maintenance, we
                      ensure your vehicle receives the highest standard of care and attention.
                    </p>
                  </AnimatedText>

                  {/* Learn More Button */}
                  <AnimatedText delay={1100}>
                    <div className="pt-4">
                      <button
                        className="inline-flex items-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-[#E67E22] rounded-lg hover:bg-[#E67E22]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E67E22] font-richmond"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Learn More
                        <svg
                          className="w-5 h-5 ml-2 -mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </AnimatedText>
                </div>

                {/* Service Features */}
                <AnimatedText delay={1200}>
                  <div className="grid grid-cols-2 gap-6 pt-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E67E22]/10 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-[#E67E22]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">5-Star Certified</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">MOIAT (ESMA) certified excellence in service</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                          <Wrench className="w-4 h-4 text-[#27AE60]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Advanced Technology</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Latest diagnostic and repair equipment</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#3D1A78]/10 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#3D1A78]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Expert Technicians</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Highly trained automotive professionals</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#8E44AD]/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[#8E44AD]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Full Service</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Complete automotive care solutions</p>
                    </div>
                  </div>
                </AnimatedText>

                {/* Stats Section */}
                <AnimatedText delay={1400}>
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#3D1A78]/10 rounded-full mb-3 mx-auto">
                        <Star className="w-6 h-6 text-[#3D1A78]" />
                      </div>
                      <div className="text-2xl font-bold text-[#3D1A78] font-richmond">
                        <AnimatedCounter target={5} duration={1500} startDelay={1600} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Star Rating</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#E67E22]/10 rounded-full mb-3 mx-auto">
                        <Users className="w-6 h-6 text-[#E67E22]" />
                      </div>
                      <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                        <AnimatedCounter target={50} suffix="+" duration={1500} startDelay={1800} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Expert Technicians</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#27AE60]/10 rounded-full mb-3 mx-auto">
                        <Shield className="w-6 h-6 text-[#27AE60]" />
                      </div>
                      <div className="text-2xl font-bold text-[#27AE60] font-richmond">
                        <AnimatedCounter target={99} suffix="%" duration={1500} startDelay={2000} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Customer Satisfaction</div>
                    </div>
                  </div>
                </AnimatedText>
              </div>

              {/* Right Column - Images */}
              <div className="order-first lg:order-last">
                <AnimatedText delay={300}>
                  <div className="relative">
                    {/* Background Geometric Elements */}
                    <div className="absolute inset-0 -z-10">
                      <div
                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3D1A78]/20 to-[#8E44AD]/20 rounded-2xl transform rotate-12"
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

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 gap-6">
                      {/* First Service Image */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                          src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748249090/service_sszlnl.jpg"
                          width={800}
                          height={500}
                          alt="Legend Automobile Services - Professional Service Bay"
                          className="w-full h-full object-cover brightness-110 contrast-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        {/* Service Badge */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                          <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-[#E67E22]" />
                            <span className="text-sm font-semibold text-gray-900 font-richmond">Service Bay</span>
                          </div>
                        </div>
                      </div>

                      {/* Second Service Image */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                          src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748249089/service2_kxs1qb.jpg"
                          width={800}
                          height={500}
                          alt="Legend Automobile Services - Expert Technician at Work"
                          className="w-full h-full object-cover brightness-110 contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        {/* Technician Badge */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#3D1A78]" />
                            <span className="text-sm font-semibold text-gray-900 font-richmond">Expert Care</span>
                          </div>
                        </div>
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
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#3D1A78]/5 to-[#8E44AD]/5 rounded-full"
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
