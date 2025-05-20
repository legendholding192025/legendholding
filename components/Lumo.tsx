"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Lumo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  return (
    <motion.div
      className="fixed bottom-8 right-8 w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] cursor-pointer z-50"
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
  )
} 