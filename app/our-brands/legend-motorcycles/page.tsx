"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
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
                Legend Motorcycles
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-lg text-gray-700 font-effra leading-relaxed">
                Legend Motorcycles is the official and sole distributor of Lifan motorcycles in the Gulf region, launched in 2024. 
                The company assembles both gasoline and electric (EV) motorcycles locally in the UAE, offering a wide range of products.
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
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da00a4a22c3.88022895_20250602_125850.png"
                        width={800}
                        height={600}
                        alt="Legend Motorcycles - Premium Motorcycle Collection"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        In its first year, Legend Motorcycles sold over{" "}
                        <span className="font-bold text-[#ee8900]">
                          <AnimatedCounter target={1000} suffix=" units" duration={2000} startDelay={800} />
                        </span>
                        , showing strong demand and customer interest.
                      </p>

                      <p className="text-lg text-gray-700 font-effra leading-relaxed">
                        Now, the company is focused on expanding by building dealership partnerships across the GCC countries, 
                        making its motorcycles more accessible to riders throughout the region.
                      </p>
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                        onClick={() => window.open("https://www.legendlifan.com/", "_blank")}
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            activeSection === "motorcycles" ? "translate-x-1" : ""
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