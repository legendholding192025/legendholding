'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function LumoWrapper() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered, mounted])

  if (!mounted) return null

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-lg p-4 text-gray-800 whitespace-nowrap"
          >
            <div className="relative">
              <p className="text-lg font-medium">How can I help you today? 👋</p>
              {/* Triangle pointer */}
              <div className="absolute -bottom-7 right-16 w-0 h-0 
                border-l-[8px] border-l-transparent
                border-t-[8px] border-t-white
                border-r-[8px] border-r-transparent">
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] cursor-pointer relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: isHovered ? 0 : [-10, 10],
          x: isHovered ? mousePosition.x / 25 : 0,
          transition: {
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Image
          src="https://res.cloudinary.com/dosxengut/image/upload/v1747740934/lumo-with-logo_c9fly3.png"
          alt="Lumo - Our Brand Mascot"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 120px, 150px"
        />
      </motion.div>
    </div>
  )
} 