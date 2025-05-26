"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Car, Building2, Globe, Users, Clock, CarTaxiFront, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"

interface CounterProps {
  value: number
  suffix?: string
}

const Counter = ({ value, suffix = "" }: CounterProps) => {
  return (
    <span>
      {value}
      {suffix}
    </span>
  )
}

export function BrandStatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    {
      icon: <Building2 className="h-7 w-7" />,
      value: 20,
      suffix: "+",
      label: "Brands",
      color: "bg-[#2B1C48]",
    },
    {
      icon: <Users className="h-7 w-7" />,
      value: 1,
      suffix: "Million +",
      label: "Customers a year",
      color: "bg-[#5D376E]",
    },
    {
      icon: <Globe className="h-7 w-7" />,
      value: 10,
      suffix: "+",
      label: "Countries",
      color: "bg-[#EE8900]",
    },
    
    {
      icon: <Building2 className="h-7 w-7" />,
      value: 1,
      suffix: "B USD",
      label: "Sales Turnover",
      color: "bg-[#EE8900]/80",
    },
  ]

  return (
    <section ref={ref} className="py-20 relative bg-white">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2B1C48] mb-4 text-center">
            <span className="text-[#2B1C48]">
              Capabilities
            </span>
          </h2>
          <div className="w-24 h-1 bg-[#EE8900] mx-auto rounded-full mb-6"></div>

          <p className="text-[#5D376E]/80 max-w-2xl mx-auto text-center text-lg md:text-xl leading-relaxed">
            For over two decades, Legend Holding Group has been pioneering innovation and excellence across automotive,
            energy, facility management, and technology sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "rounded-xl overflow-hidden shadow-lg",
                stat.color
              )}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10 text-white transform transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1 flex items-center">
                      <Counter 
                        value={stat.value} 
                        suffix={stat.suffix}
                      />
                    </h3>
                    <p className="text-white/80 text-lg font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="h-1 rounded-full bg-white/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
