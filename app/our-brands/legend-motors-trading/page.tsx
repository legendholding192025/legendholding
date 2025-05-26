"use client"
 
import Image from "next/image"
import { useEffect, useState } from "react"
import { Car, TrendingUp, Award, Globe } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { ReactNode } from "react"

interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
  startDelay?: number
}

interface AnimatedTextProps {
  children: ReactNode
  delay?: number
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
 
export default function MotorsTradingPage() {
  const [scrollY, setScrollY] = useState(0)
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
 
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden pt-24">
        {/* Hero Section */}
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
                      Legend Motors
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#E67E22] font-richmond">Trading</h3>
                  </div>
                </AnimatedText>
 
                {/* Content Paragraphs */}
                <div className="space-y-6">
                  <AnimatedText delay={400}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Legend Motors embraces cutting-edge advancements and consistently push boundaries, unleashing the
                      power of possibility in every endeavor. Their commitment to sustainability drives them to adopt
                      environmentally conscious practices, ensuring a greener future for generations to come.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={600}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Since their inception in <span className="font-semibold text-[#3D1A78]">2013</span>, Legend Motors
                      has achieved remarkable sales figures, reaching an impressive{" "}
                      <span className="font-bold text-[#E67E22]">
                        <AnimatedCounter target={55} suffix="M USD" duration={2000} startDelay={800} />
                      </span>{" "}
                      in a year.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={800}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      These numbers not only validate Legend Motors' position as a market leader but also affirm the trust
                      and confidence of their valued customers across the region.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={1000}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Each passing year, Legend Motors' commitment to excellence and unwavering pursuit of innovation
                      drives them to push boundaries and explore new frontiers in the world of automobiles.
                    </p>
                  </AnimatedText>
                </div>
 
                {/* Stats Section */}
                <AnimatedText delay={1200}>
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#3D1A78]/10 rounded-full mb-3 mx-auto">
                        <Car className="w-6 h-6 text-[#3D1A78]" />
                      </div>
                      <div className="text-2xl font-bold text-[#3D1A78] font-richmond">
                        <AnimatedCounter target={2013} duration={1500} startDelay={1400} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Founded</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#E67E22]/10 rounded-full mb-3 mx-auto">
                        <TrendingUp className="w-6 h-6 text-[#E67E22]" />
                      </div>
                      <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                        <AnimatedCounter target={55} suffix="M" duration={1500} startDelay={1600} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Annual Sales</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#27AE60]/10 rounded-full mb-3 mx-auto">
                        <Globe className="w-6 h-6 text-[#27AE60]" />
                      </div>
                      <div className="text-2xl font-bold text-[#27AE60] font-richmond">
                        <AnimatedCounter target={100} suffix="+" duration={1500} startDelay={1800} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Global Reach</div>
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
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748006307/motor-trading_ji1zfj.png"
                        width={800}
                        height={600}
                        alt="Legend Motors Trading - Luxury Car Collection"
                        className="w-full h-full object-cover"
                        priority
                      />
 
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A78]/30 via-transparent to-transparent" />
 
                      {/* Floating Achievement Badge */}
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#E67E22] to-[#F39200] rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#3D1A78] font-richmond">Market Leader</div>
                            <div className="text-sm text-gray-600 font-effra">Since 2013</div>
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
      </main>
      <Footer />
    </>
  )
}