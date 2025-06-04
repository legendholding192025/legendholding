"use client"
 
import Image from "next/image"
import { Heart, Award, TrendingUp, Users, Zap, Globe, Eye, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
 
// Counter Animation Component
type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  duration?: number;
  startDelay?: number;
};
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
 
    const element = document.getElementById(`counter-${target}`)
    if (element) observer.observe(element)
 
    return () => observer.disconnect()
  }, [target, duration, startDelay, isVisible])
 
  return (
    <span
      id={`counter-${target}`}
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
 
export default function VisionMissionValuesPage() {
  const [scrollY, setScrollY] = useState(0)
 
  // Animated counters
  const [yearsCount, setYearsCount] = useState(0)
  const [clientsCount, setClientsCount] = useState(0)
  const yearsTarget = (() => {
    const baseYear = 2008
    const now = new Date()
    let years = now.getFullYear() - baseYear
    if (now.getMonth() >= 0) years += 1
    return years
  })()
  const clientsTarget = 10000
 
  useEffect(() => {
    let yearsFrame: number, clientsFrame: number
    // Animate years
    if (yearsCount < yearsTarget) {
      yearsFrame = window.setTimeout(() => setYearsCount(yearsCount + 1), 40)
    }
    // Animate clients
    if (clientsCount < clientsTarget) {
      clientsFrame = window.setTimeout(() => setClientsCount(clientsCount + Math.ceil(clientsTarget / 100)), 10)
    }
    return () => {
      clearTimeout(yearsFrame)
      clearTimeout(clientsFrame)
    }
  }, [yearsCount, clientsCount, yearsTarget, clientsTarget])
 
  // Calculate years of excellence dynamically
  const getYearsOfExcellence = () => {
    const baseYear = 2008
    const now = new Date()
    let years = now.getFullYear() - baseYear
    if (now.getMonth() >= 0) years += 1 // January is month 0
    return years
  }
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
 
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-x-hidden">
        {/* Minimal Hero Section */}
        <section className="relative py-24 md:py-32 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block mb-6">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] font-effra">
                  Our Foundation
                </span>
                <div className="h-px w-16 bg-[#E67E22] mx-auto mt-2" />
              </div>
 
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 font-richmond leading-[1.1] tracking-tight">
                Vision, Mission
                <br />
                <span className="font-normal text-[#2b1c48]">& Values</span>
              </h1>
 
              <p className="text-lg md:text-xl text-gray-600 font-effra leading-relaxed max-w-2xl mx-auto">
                The principles that guide our commitment to transforming industries and creating sustainable value
                worldwide.
              </p>
            </div>
          </div>
        </section>
 
        {/* Vision Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-[#F5F1EB]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Vision Content */}
              <div className="order-2 lg:order-1">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 font-richmond leading-tight">
                    Our Vision
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 font-effra leading-relaxed">
                    To seamlessly connect the physical and digital worlds, revolutionizing supply chains with cutting-edge financial technology, and become the global leader in intelligent, data-driven solutions that empower businesses to thrive through efficiency, transparency, and sustainable growth.
                  </p>
                </div>

                {/* Vision Pillars */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                  {[
                    { title: "Innovation", desc: "Cutting-edge technology" },
                    { title: "Global Impact", desc: "Worldwide transformation" },
                    { title: "Sustainability", desc: "Future-focused growth" },
                  ].map((pillar, index) => (
                    <div key={index} className="text-center">
                      <div className="w-2 h-2 bg-[#E67E22] rounded-full mx-auto mb-3" />
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 font-richmond">{pillar.title}</h4>
                      <p className="text-xs text-gray-600 font-effra">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision Image */}
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg"
                      width={800}
                      height={600}
                      alt="Vision"
                      className="w-full h-full object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6 border border-gray-100 max-w-[calc(100%-2rem)]">
                    <div className="text-2xl font-bold text-[#2b1c48] font-richmond">
                      <AnimatedCounter target={yearsTarget} suffix="+" duration={1200} startDelay={200} />
                    </div>
                    <div className="text-sm text-gray-600 font-effra">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* Mission Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Mission Image */}
              <div>
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg"
                      width={800}
                      height={600}
                      alt="Mission"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-6 border border-gray-100 max-w-[calc(100%-2rem)]">
                    <div className="text-2xl font-bold text-[#E67E22] font-richmond">
                      <AnimatedCounter target={10} suffix="K+" duration={1500} startDelay={100} />
                    </div>
                    <div className="text-sm text-gray-600 font-effra">Global Clients</div>
                  </div>
                </div>
              </div>

              {/* Mission Content */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 font-richmond leading-tight">
                    Our Mission
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 font-effra leading-relaxed">
                    We are dedicated to fostering happiness and delivering value, focusing on building a sustainable future.
                  </p>
                </div>

                {/* Mission Pillars */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                  {[
                    { title: "Excellence", desc: "Highest standards" },
                    { title: "Collaboration", desc: "Working together" },
                    { title: "Impact", desc: "Meaningful change" },
                  ].map((pillar, index) => (
                    <div key={index} className="text-center">
                      <div className="w-2 h-2 bg-[#27AE60] rounded-full mx-auto mb-3" />
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 font-richmond">{pillar.title}</h4>
                      <p className="text-xs text-gray-600 font-effra">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* Values Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-[#F5F1EB]">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] font-effra">
                  Our Foundation
                </span>
                <div className="h-px w-16 bg-[#27AE60] mx-auto mt-2" />
              </div>
 
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 font-richmond leading-tight">
                Our Core Values
              </h2>
 
              <p className="text-lg text-gray-600 font-effra leading-relaxed max-w-3xl mx-auto">
                Our values spell out <span className="font-semibold text-[#2b1c48]">LEGEND</span> — the principles that guide every decision and action we take.
              </p>
            </div>
 
            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Loyalty",
                  desc: "Commitment to our stakeholders and partners, building lasting relationships based on trust and mutual respect.",
                  color: "text-[#C0392B]",
                  bg: "bg-[#FADBD8]",
                  border: "border-[#F1948A]",
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Excellence",
                  desc: "Striving for the highest standards in all we do, continuously improving and delivering exceptional results.",
                  color: "text-[#E67E22]",
                  bg: "bg-[#FDF2E9]",
                  border: "border-[#F8C471]",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Growth",
                  desc: "Continuous improvement and sustainable development, fostering innovation and embracing new opportunities.",
                  color: "text-[#27AE60]",
                  bg: "bg-[#D5F4E6]",
                  border: "border-[#82E0AA]",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Empathy",
                  desc: "Understanding and addressing the needs of others, creating solutions that truly make a difference.",
                  color: "text-[#2b1c48]",
                  bg: "bg-[#EBE7F0]",
                  border: "border-[#D2B4DE]",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Nimble",
                  desc: "Agility and adaptability in a changing world, responding quickly to new challenges and opportunities.",
                  color: "text-[#8E44AD]",
                  bg: "bg-[#F4ECF7]",
                  border: "border-[#D7BDE2]",
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Diversity",
                  desc: "Embracing different perspectives and backgrounds, fostering an inclusive environment for innovation.",
                  color: "text-[#16A085]",
                  bg: "bg-[#D1F2EB]",
                  border: "border-[#7FB3D3]",
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className={`group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border ${value.border} hover:-translate-y-1`}
                >
                  {/* Header with icon and letter */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 ${value.bg} rounded-xl flex items-center justify-center ${value.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {value.icon}
                    </div>
                  </div>
 
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 font-richmond group-hover:text-gray-800 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 font-effra leading-relaxed text-sm">{value.desc}</p>
                  </div>
 
                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 w-0 h-1 ${value.bg.replace("bg-", "bg-gradient-to-r from-")} group-hover:w-full transition-all duration-500 rounded-b-xl`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
