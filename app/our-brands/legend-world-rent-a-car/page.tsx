"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
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
 
export default function LegendRentACarPage() {
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
            {/* Page Header (title and decorative lines outside) */}
            <section className="w-full mb-16 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond">
                Legend Rent a Car
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>
            </section>
            {/* Main Content Section */}
            <section className="w-full mb-16">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-2/5 relative group overflow-hidden">
                    <div className="aspect-[4/3] md:aspect-auto relative w-full h-[300px] md:h-full">
                      <Image
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da3d88d3185.41319420_20250602_131504.png"
                        alt="Legend Rent a Car - Premium Car Rental Services"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    {/* Description moved inside card */}
                    <p className="text-lg text-gray-700 font-effra leading-relaxed mb-6">
                      Legend Rent-A-Car is a proud subsidiary of Legend World Investment Group, recognized as one of the fastest-growing 
                      and most respected rent-a-car companies in Dubai. Since our inception, we have built a reputation for delivering 
                      premium, reliable, and customer-focused car rental services across Dubai and the wider UAE.
                    </p>
                    <div className="space-y-4">
                      <p className="text-base md:text-lg text-gray-700 font-effra leading-relaxed">
                        Our commitment to excellence, consistency, and customer satisfaction has driven our growth and helped us 
                        adapt to the evolving needs of our customers and communities.
                      </p>
                      <p className="text-base md:text-lg text-gray-700 font-effra leading-relaxed">
                        Today, Legend World Rent-A-Car manages a fleet of over{" "}
                        <span className="font-bold text-[#ee8900]">
                          <AnimatedCounter target={2000} suffix=" vehicles" duration={2000} startDelay={800} />
                        </span>{" "}
                        and operates from more than 14 strategic meet-and-greet locations across Dubai.
                      </p>
                    </div>
                    {/* Learn More Button */}
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                        onClick={() => window.open("https://www.legendrentacar.com/", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            activeSection === "rentacar" ? "translate-x-1" : ""
                          }`}
                        />
                      </button>
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