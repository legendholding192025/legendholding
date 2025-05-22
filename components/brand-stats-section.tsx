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
  format?: string
}

const Counter = ({ end, duration, suffix = "", isInView, format }: CounterProps) => {
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

  if (format === "million" && count === 1) {
    return <span>1 Million{suffix}</span>
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: "easeOut",
      duration: 0.8
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function BrandStatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" })

  const stats = [
    {
      icon: <Building2 className="h-7 w-7" />,
      value: 20,
      suffix: "+",
      label: "Brands",
      color: "bg-[#5E366D]",
    },
    {
      icon: <Users className="h-7 w-7" />,
      value: 1,
      suffix: "+",
      label: "Customers a year",
      color: "bg-[#F39200]",
      format: "million"
    },
    {
      icon: <Globe className="h-7 w-7" />,
      value: 10,
      suffix: "+",
      label: "Countries",
      color: "bg-[#5E366D]",
    },
    {
      icon: <Building2 className="h-7 w-7" />,
      value: 1,
      suffix: "B USD",
      label: "Sales Turnover",
      color: "bg-[#F39200]",
    },
  ]

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-white">
      <div className="container relative z-10">
        <div className="flex flex-col items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl font-bold text-[#5E366D] mb-4 text-center"
          >
            <span className="text-[#5E366D]">
              Capabilities
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[#5E366D]/80 max-w-2xl mx-auto text-center"
          >
            For over two decades, Legend Holding Group has been pioneering innovation and excellence across automotive,
            energy, facility management, and technology sectors.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[rgb(234,226,214)]/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group will-change-transform relative"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[rgb(234,226,214)]/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <div className={cn("h-2 transition-all duration-300 group-hover:h-3", stat.color)}></div>
              <div className="p-6 relative">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-lg text-white transition-transform duration-300 group-hover:scale-110 shadow-lg", stat.color)}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#5E366D] mb-1 flex items-center">
                      <Counter 
                        end={stat.value} 
                        duration={2500} 
                        suffix={stat.suffix} 
                        isInView={isInView}
                        format={stat.format}
                      />
                    </h3>
                    <p className="text-[#5E366D]/80">{stat.label}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#5E366D]/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                    className={cn("h-1 rounded-full", stat.color + "/30")}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-[rgb(234,226,214)]/20 text-[#5E366D] text-sm border border-[#5E366D]/20 hover:shadow-md transition-all duration-300 group">
            <span className="w-2 h-2 rounded-full bg-[#F39200] mr-2 animate-pulse"></span>
            Committed to excellence and innovation since 2008
          </div>
        </motion.div>
      </div>
    </section>
  )
}
