"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Handshake, Settings, MapPin, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

const Counter = ({ value, suffix = "", duration = 1.2 }: CounterProps) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return
    let incrementTime = (duration * 1000) / end
    let current = start
    const timer = setInterval(() => {
      current += 1
      setCount(current)
      if (current >= end) {
        clearInterval(timer)
      }
    }, incrementTime)
    return () => clearInterval(timer)
  }, [value, duration])
  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function BrandStatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    {
      icon: <Settings className="h-8 w-8" />,
      value: 20,
      suffix: "+",
      label: "Brand",
      color: "bg-[#2B1C48]",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: 1,
      suffix: " Million+",
      label: "Customers a year",
      color: "bg-[#5D376E]",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      value: 10,
      suffix: "+",
      label: "Countries",
      color: "bg-[#EE8900]",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: 1,
      suffix: "B USD",
      label: "Sales Turnover",
      color: "bg-[#EE8900]/80",
    },
  ]

  return (
    <section ref={ref} className="py-20 relative bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#EE8900] mb-4">Capabilities</h2>
            <div className="w-24 h-1 bg-[#5D376E] mx-auto rounded-full"></div>
          </div>



          <p className="text-[#5E366D] max-w-4xl mx-auto text-center text-lg md:text-xl leading-relaxed">
            For over two decades, Legend Holding Group has been pioneering innovation and excellence across automotive,
            energy, facility management, and technology sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Outer dotted circle */}
              <div className="relative">
                <div
                  className="w-52 h-52 rounded-full border-2 border-dotted flex items-center justify-center"
                  style={{ borderColor: stat.color.replace('bg-[#', '#').replace(']', '') }}
                >
                  {/* Middle circle with thick border */}
                  <div className="w-44 h-44 rounded-full border-[12px] bg-white flex items-center justify-center" style={{ borderColor: '#1D252E', borderStyle: 'solid', borderWidth: '12px' }}>
                    {/* White gap */}
                    <div className="w-[5px] h-[5px] absolute rounded-full bg-transparent"></div>

                    {/* Inner solid circle */}
                    <div
                      className={cn(
                        "w-32 h-32 rounded-full flex flex-col items-center justify-center text-white relative",
                        stat.color,
                      )}
                    >
                      {/* Icon */}
                      <div className="mb-1">{stat.icon}</div>

                      {/* Value */}
                      <div className="text-xl font-bold mb-0.5 text-center leading-tight">
                        {isInView ? <Counter value={stat.value} suffix={stat.suffix} /> : <span>0{stat.suffix}</span>}
                      </div>

                      {/* Label */}
                      <div className="text-xs text-center leading-tight px-2">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <BrandStatsSection />
    </div>
  )
}
