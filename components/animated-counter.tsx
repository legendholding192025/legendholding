"use client"

import { useState, useEffect } from "react"

type AnimatedCounterProps = {
  target: number
  suffix?: string
  duration?: number
  startDelay?: number
}

export function AnimatedCounter({ target, suffix = "", duration = 2000, startDelay = 0 }: AnimatedCounterProps) {
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