"use client"
 
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Bike, Zap, Shield, Award, Globe, TrendingUp } from "lucide-react"
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
                      Motorcycles
                    </h3>
                  </div>
                </AnimatedText>
 
                {/* Content Paragraphs */}
                <div className="space-y-6">
                  <AnimatedText delay={400}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Legend Motorcycles is the official distributor and assembly of{" "}
                      <span className="font-semibold text-[#2b1c48]">Lifan Bikes</span> in the UAE, the leading choice for
                      delivery professionals across the country.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={600}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Renowned for their <span className="font-semibold text-[#E67E22]">efficiency</span>,{" "}
                      <span className="font-semibold text-[#27AE60]">reliability</span>, and{" "}
                      <span className="font-semibold text-[#2b1c48]">fuel economy</span>, Lifan Bikes are trusted across
                      sectors, from food to pharmaceutical delivery.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={800}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      Our commitment to excellence ensures that every motorcycle meets the highest standards of quality
                      and performance, making us the preferred choice for businesses and individuals alike.
                    </p>
                  </AnimatedText>
 
                  <AnimatedText delay={1000}>
                    <p className="text-lg text-gray-700 font-effra leading-relaxed">
                      With comprehensive after-sales support and a nationwide service network, Legend Motorcycles
                      continues to drive the future of two-wheeler transportation in the UAE.
                    </p>
                  </AnimatedText>
                </div>
 
                {/* Features Grid */}
                <AnimatedText delay={1200}>
                  <div className="grid grid-cols-2 gap-6 pt-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E67E22]/10 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-[#E67E22]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Fuel Efficient</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">
                        Advanced engine technology for maximum fuel economy
                      </p>
                    </div>
 
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-[#27AE60]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Reliable</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Built to withstand demanding delivery schedules</p>
                    </div>
 
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2b1c48]/10 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-[#2b1c48]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">Quality Assured</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Rigorous quality control and testing standards</p>
                    </div>
 
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#8E44AD]/10 rounded-full flex items-center justify-center">
                          <Globe className="w-4 h-4 text-[#8E44AD]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 font-richmond">UAE Wide</span>
                      </div>
                      <p className="text-sm text-gray-600 font-effra">Comprehensive service network across the UAE</p>
                    </div>
                  </div>
                </AnimatedText>
 
                {/* Stats Section */}
                <AnimatedText delay={1400}>
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#2b1c48]/10 rounded-full mb-3 mx-auto">
                        <Bike className="w-6 h-6 text-[#2b1c48]" />
                      </div>
                      <div className="text-2xl font-bold text-[#2b1c48] font-richmond">
                        <AnimatedCounter target={5000} suffix="+" duration={1000} startDelay={800} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Bikes Delivered</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#E67E22]/10 rounded-full mb-3 mx-auto">
                        <TrendingUp className="w-6 h-6 text-[#E67E22]" />
                      </div>
                      <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                        <AnimatedCounter target={98} suffix="%" duration={1000} startDelay={900} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Customer Satisfaction</div>
                    </div>
 
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#27AE60]/10 rounded-full mb-3 mx-auto">
                        <Globe className="w-6 h-6 text-[#27AE60]" />
                      </div>
                      <div className="text-2xl font-bold text-[#27AE60] font-richmond">
                        <AnimatedCounter target={50} suffix="+" duration={1000} startDelay={1000} />
                      </div>
                      <div className="text-sm text-gray-600 font-effra">Service Centers</div>
                    </div>
                  </div>
                </AnimatedText>
              </div>
 
              {/* Right Column - Image */}
              <div className="order-first lg:order-last">
                <AnimatedText delay={300}>
                  <div className="relative">
                    {/* Main Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1747998254/lifan_yhes49.png"
                        width={800}
                        height={600}
                        alt="Legend Motorcycles - Lifan Logo"
                        className="w-full h-full object-contain"
                        priority
                      />
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