'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView, motion, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration: number
  suffix?: string
}

export function AnimatedCounter({ end, duration, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Using spring animation for smoother counting
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      springValue.set(end)
      
      // Update count based on spring animation
      return springValue.onChange((latest) => {
        setCount(Math.floor(latest))
      })
    }
  }, [isInView, end, hasAnimated, springValue])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-block"
    >
      {count}{suffix}
    </motion.span>
  )
} 