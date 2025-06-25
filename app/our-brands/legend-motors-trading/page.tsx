"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Car, TrendingUp, Award, Globe, ChevronRight } from "lucide-react"
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
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
                Legend Motors Trading
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-lg text-gray-700 font-effra leading-relaxed">
              Legend Motors embraces cutting-edge advancements and consistently push boundaries, unleashing the power of possibility in every endeavor.
              Their commitment to sustainability drives them to adopt environmentally conscious practices, ensuring a greener future for generations to come.
              </p>
            </section>

            {/* Main Content Section */}
            <section className="w-full mb-16">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-2/5 relative group overflow-hidden h-[300px] md:h-auto">
                    <div className="h-full w-full relative overflow-hidden">
                      <Image
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png"
                        width={800}
                        height={600}
                        alt="Legend Motors Trading - Luxury Car Collection"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, 40vw"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        Since Their inception in <span className="font-semibold text-[#2b1c48]">2013</span>, Legend Motors has achieved remarkable sales figures, reaching an impressive{" "}
                        <span className="font-bold text-[#ee8900]">
                          <AnimatedCounter target={55} suffix="M USD" duration={2000} startDelay={800} />
                        </span>{" "}
                        in a year.
                      </p>

                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        Building relationships on a global scale, we export cars to our customers across three continents, with more than 7,000 vehicles exported
                        yearly to satisfied clients.
                      </p>

                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        Each passing year, Legend Motors' commitment to excellence and unwavering pursuit of innovation drives them to push boundaries and explore
                        new frontiers in the world of automobiles.
                      </p>
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                        onClick={() => window.open("https://legendmotorsglobal.com/", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            activeSection === "trading" ? "translate-x-1" : ""
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