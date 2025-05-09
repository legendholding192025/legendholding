"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Car, Building2, Globe, Users, Clock, CarTaxiFront, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"

interface CounterProps {
  end: number
  duration: number
  suffix?: string
  isInView: boolean
}

const Counter = ({ end, duration, suffix = "", isInView }: CounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const progressPercent = Math.min(progress / duration, 1)

      setCount(Math.floor(progressPercent * end))

      if (progressPercent < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, isInView])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function BrandStatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const stats = [
    {
      icon: <Users className="h-7 w-7" />,
      value: 500,
      suffix: "+",
      label: "Employees",
      color: "bg-primary",
      delay: 0,
    },
    {
      icon: <Globe className="h-7 w-7" />,
      value: 35,
      suffix: "+",
      label: "Countries",
      color: "bg-secondary",
      delay: 0.1,
    },
    {
      icon: <Building2 className="h-7 w-7" />,
      value: 20,
      suffix: "+",
      label: "Business",
      color: "bg-primary",
      delay: 0.2,
    },
    {
      icon: <Clock className="h-7 w-7" />,
      value: 20,
      suffix: "+",
      label: "Years",
      color: "bg-secondary",
      delay: 0.3,
    },
    {
      icon: <Car className="h-7 w-7" />,
      value: 20,
      suffix: "+",
      label: "Car Brands",
      color: "bg-primary",
      delay: 0.4,
    },
    {
      icon: <Users className="h-7 w-7" />,
      value: 34,
      suffix: "+",
      label: "Nationalites",
      color: "bg-secondary",
      delay: 0.5,
    },
    {
      icon: <CarTaxiFront className="h-7 w-7" />,
      value: 4000,
      suffix: "+",
      label: "Vehicles on road",
      color: "bg-primary",
      delay: 0.6,
    },
    {
      icon: <Handshake className="h-7 w-7" />,
      value: 70,
      suffix: "+",
      label: "Partners",
      color: "bg-secondary",
      delay: 0.7,
    },
  ]

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 z-0"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[80px] animate-pulse"></div>
      </div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] bg-repeat opacity-5 mix-blend-overlay z-0"></div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Image
              src="/images/legend-logo.png"
              alt="Legend Holding Group"
              width={180}
              height={60}
              className="h-16 w-auto"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            Driving Excellence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Across Industries
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto text-center"
          >
            For over two decades, Legend Holding Group has been pioneering innovation and excellence across automotive,
            energy, facility management, and technology sectors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={cn("h-2", stat.color)}></div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-lg text-white", stat.color)}>{stat.icon}</div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1 flex items-center">
                      <Counter end={stat.value} duration={2000} suffix={stat.suffix} isInView={isInView} />
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.5, delay: stat.delay + 0.5, ease: "easeOut" }}
                    className="h-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-gray-700 text-sm backdrop-blur-sm border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
            Committed to excellence and innovation since 2003
          </div>
        </motion.div>
      </div>
    </section>
  )
}
