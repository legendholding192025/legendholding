"use client"

import { useState, useEffect, useRef } from "react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  label: string
  color: string
}

function AnimatedCounter({ end, duration = 2000, suffix = "", label, color }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration])

  return (
    <div ref={counterRef} className="text-center">
      <div className={`${color} rounded-xl overflow-hidden shadow-lg p-8 h-full flex flex-col justify-center`}>
        <div className="flex flex-col items-center justify-center pt-6">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 flex items-center justify-center w-full -ml-2">
            {suffix}
            {count.toLocaleString()}
          </h3>
          <p className="text-white/80 text-lg font-medium uppercase tracking-wide text-center px-2">
            {label}
          </p>
        </div>
        <div className="mt-8 pt-4 border-t border-white/10">
          <div className="h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}

export default function AtAGlance() {
  const stats = [
    { 
      end: 500, 
      suffix: "+", 
      label: "Colleagues",
      color: "bg-[#2B1C48]"
    },
    { 
      end: 35, 
      suffix: "+", 
      label: "Nationalities",
      color: "bg-[#5D376E]"
    },
    { 
      end: 10, 
      suffix: "+", 
      label: "Countries",
      color: "bg-[#EE8900]"
    },
    { 
      end: 20, 
      suffix: "+", 
      label: "Brands",
      color: "bg-[#EE8900]/80"
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 bg-white">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <AnimatedCounter
            key={index}
            end={stat.end}
            suffix={stat.suffix}
            label={stat.label}
            color={stat.color}
            duration={2000 + index * 200}
          />
        ))}
      </div>
    </div>
  )
}
