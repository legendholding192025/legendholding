"use client"
 
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Plane, Globe, MapPin, Star, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
 
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
 
export default function LegendTravelPage() {
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#E67E22] font-richmond">
                      Travel & Tourism
                    </h3>
                  </div>
                </AnimatedText>
 
                {/* Content Paragraphs */}
                <div className="space-y-6">
                  <AnimatedText delay={400}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Legend Travel & Tourism, an <span className="font-semibold text-[#3D1A78]">upcoming venture</span> under the Legend brand, is set to redefine travel experiences with personalized and memorable journeys.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={600}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Offering comprehensive travel services including <span className="font-semibold text-[#E67E22]">flights, hotels, tours, and visa assistance</span>, we are committed to making your travel dreams a reality.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={800}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Our team of experienced travel experts ensures that every journey is carefully curated to provide the perfect balance of adventure, comfort, and cultural immersion.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={1000}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      From luxury getaways to budget-friendly adventures, we offer tailored travel solutions that cater to every preference and requirement.
                    </p>
                  </AnimatedText>
                </div>
 
                {/* Service Features */}
                <AnimatedText delay={1200}>
                  <div className="grid grid-cols-1 gap-6 pt-8">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-[#E67E22]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plane className="w-5 h-5 text-[#E67E22]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Flight Bookings</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Competitive rates and flexible booking options
                        </p>
                      </div>
                    </div>
 
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-[#27AE60]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-[#27AE60]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Global Destinations</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Access to worldwide travel destinations
                        </p>
                      </div>
                    </div>
 
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-[#3D1A78]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#3D1A78]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-richmond mb-2">Custom Tours</h4>
                        <p className="text-sm text-gray-600 font-effra">
                          Personalized travel itineraries and experiences
                        </p>
                      </div>
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
                        <AnimatedCounter target={50} suffix="+" duration={1500} startDelay={1600} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Destinations</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#E67E22]/10 rounded-full mb-3 mx-auto">
                        <Clock className="w-6 h-6 text-[#E67E22]" />
                      </div>
                      <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                        <AnimatedCounter target={24} suffix="/7" duration={1500} startDelay={1800} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Support</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#27AE60]/10 rounded-full mb-3 mx-auto">
                        <Users className="w-6 h-6 text-[#27AE60]" />
                      </div>
                      <div className="text-2xl font-bold text-[#27AE60] font-richmond">
                        <AnimatedCounter target={1000} suffix="+" duration={1500} startDelay={2000} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Happy Travelers</div>
                    </div>
                  </div>
                </AnimatedText>
 
                {/* Visit Website Button */}
                <AnimatedText delay={1600}>
                  <div className="pt-8">
                    <Link
                      href="https://www.legendtravel.ae/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[#3D1A78] hover:bg-[#2D1258] transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Visit Website
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                </AnimatedText>
              </div>
 
              {/* Right Column - Images */}
              <div className="order-first lg:order-last">
                <AnimatedText delay={300}>
                  <div className="relative space-y-6">
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
 
                    {/* Main Image Container */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748251027/spencer-davis-0QcSnCM0aMc-unsplash_c3aetn.jpg"
                        width={1600}
                        height={900}
                        alt="Legend Travel & Tourism - Premium Travel Services"
                        className="w-full h-full object-cover"
                        priority
                      />
 
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A78]/30 via-transparent to-transparent" />
                    </div>
 
                    {/* Secondary Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748251063/ian-schneider-jk8rarn6lmw-unsplash_hk7v0y.jpg"
                        width={800}
                        height={600}
                        alt="Legend Travel & Tourism - Global Destinations"
                        className="w-full h-full object-cover"
                        priority
                      />
 
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A78]/30 via-transparent to-transparent" />
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