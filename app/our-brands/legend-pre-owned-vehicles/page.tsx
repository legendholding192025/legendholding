"use client"
 
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Car, Award, Shield, CheckCircle, Star } from "lucide-react"
import Image from "next/image"
 
type AnimatedCounterProps = {
  target: number
  suffix?: string
  duration?: number
  startDelay?: number
}
 
// Counter Animation Component
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
 
type AnimatedTextProps = {
  children: React.ReactNode
  delay?: number
}
 
// Animated Text Component
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
 
export default function PreOwnedVehiclesPage() {
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
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2b1c48] font-richmond leading-tight">
                      Certified Pre-Owned
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#E67E22] font-richmond">
                      Vehicles
                    </h3>
                  </div>
                </AnimatedText>
 
                {/* Content Paragraphs */}
                <div className="space-y-6">
                  <AnimatedText delay={400}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Bringing together multiple <span className="font-semibold text-[#2b1c48]">Legend brands</span> under
                      one roof, offering customers a wide selection of high-quality vehicles.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={600}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      This initiative reflects our commitment to delivering{" "}
                      <span className="font-semibold text-[#E67E22]">exceptional service</span> and{" "}
                      <span className="font-semibold text-[#27AE60]">satisfaction</span> across every stage of the
                      ownership journey.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={800}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Every vehicle in our certified pre-owned collection undergoes rigorous inspection and quality
                      assurance processes, ensuring you receive only the finest automobiles with complete peace of mind.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={1000}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      From luxury sedans to premium SUVs, our diverse inventory represents the best of automotive
                      excellence, backed by comprehensive warranties and professional support services.
                    </p>
                  </AnimatedText>
                </div>
 
                {/* Certification Features */}
                <AnimatedText delay={1200}>
                  <div className="grid grid-cols-2 gap-6 pt-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E67E22]/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[#E67E22]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Certified Quality</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Rigorous 150-point inspection process</p>
                    </div>
 
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-[#27AE60]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Warranty Protected</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Comprehensive coverage and protection plans</p>
                    </div>
 
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2b1c48]/10 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-[#2b1c48]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Premium Selection</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Curated collection of luxury vehicles</p>
                    </div>
 
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#8E44AD]/10 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-[#8E44AD]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Expert Service</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Professional support throughout ownership</p>
                    </div>
                  </div>
                </AnimatedText>
 
                {/* Stats Section */}
                <AnimatedText delay={1400}>
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#2b1c48]/10 rounded-full mb-3 mx-auto">
                        <Car className="w-6 h-6 text-[#2b1c48]" />
                      </div>
                      <div className="text-2xl font-bold text-[#2b1c48] font-richmond">
                        <AnimatedCounter target={500} suffix="+" duration={1500} startDelay={1600} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Vehicles Available</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#E67E22]/10 rounded-full mb-3 mx-auto">
                        <CheckCircle className="w-6 h-6 text-[#E67E22]" />
                      </div>
                      <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                        <AnimatedCounter target={150} duration={1500} startDelay={1800} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Point Inspection</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#27AE60]/10 rounded-full mb-3 mx-auto">
                        <Star className="w-6 h-6 text-[#27AE60]" />
                      </div>
                      <div className="text-2xl font-bold text-[#27AE60] font-richmond">
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
                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2b1c48]/20 to-[#8E44AD]/20 rounded-2xl transform rotate-12"
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
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da26519e1d9.85792572_20250602_130853.jpg"
                        width={800}
                        height={600}
                        alt="Legend Pre-Owned Vehicles - Certified Luxury Car Collection"
                        className="w-full h-full object-cover"
                        priority
                      />
 
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/30 via-transparent to-transparent" />
 
                      {/* Floating Certification Badge */}
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#E67E22] to-[#F39200] rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#2b1c48] font-richmond">Certified</div>
                            <div className="text-sm text-gray-600 font-effra">Pre-Owned</div>
                          </div>
                        </div>
                      </div>
 
                      {/* Floating Stats Badge */}
                      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                            <AnimatedCounter target={500} suffix="+" duration={2000} startDelay={1000} />
                          </div>
                          <div className="text-sm text-gray-600 font-effra">Vehicles</div>
                        </div>
                      </div>
 
                      {/* Quality Assurance Badge */}
                      <div className="absolute top-6 right-6 bg-[#27AE60]/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm font-richmond">Quality Assured</span>
                        </div>
                      </div>
 
                      {/* Inspection Badge */}
                      <div className="absolute bottom-6 left-6 bg-[#2b1c48]/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="text-white font-bold text-sm tracking-wider font-richmond">
                          150-POINT INSPECTION
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
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#2b1c48]/5 to-[#8E44AD]/5 rounded-full"
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