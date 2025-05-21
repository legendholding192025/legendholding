"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  HeartIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  HandRaisedIcon,
  BoltIcon,
  UsersIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"

export default function CompanyValuesInfographic() {
  const containerRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const values = [
    {
      title: "Loyalty",
      description: "We are loyal to our partners and companies, regardless of the circumstances.",
      Icon: HeartIcon,
      color: "#F39200",
      ariaLabel: "Loyalty value card"
    },
    {
      title: "Excellence",
      description: "We aim for excellence so that everyone works well together.",
      Icon: StarIcon,
      color: "#5E366D",
      ariaLabel: "Excellence value card"
    },
    {
      title: "Growth",
      description: "Our focus is to promote continuous growth and development.",
      Icon: ArrowTrendingUpIcon,
      color: "#F39200",
      ariaLabel: "Growth value card"
    },
    {
      title: "Empathy",
      description: "We recognize potential and acknowledge everyone's potential.",
      Icon: HandRaisedIcon,
      color: "#5E366D",
      ariaLabel: "Empathy value card"
    },
    {
      title: "Nimble",
      description: "We believe in quick minds, being fast in our thinking and actions.",
      Icon: BoltIcon,
      color: "#F39200",
      ariaLabel: "Nimble value card"
    },
    {
      title: "Diversity",
      description: "We create opportunities for people of all sectors.",
      Icon: UsersIcon,
      color: "#5E366D",
      ariaLabel: "Diversity value card"
    }
  ]

  return (
    <section 
      ref={containerRef}
      className="pt-20 pb-32 bg-white relative overflow-hidden"
      aria-labelledby="values-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
        <motion.div 
          style={{ y }}
          className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#5E366D]/5 rounded-full blur-[80px] animate-pulse"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#F39200]/5 rounded-full blur-[80px] animate-pulse"
        />
        
        {/* Decorative image in top right */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
          className="absolute top-0 right-0 w-[180px] h-[180px] md:w-[200px] md:h-[200px] opacity-25"
        >
          <Image
            src="https://res.cloudinary.com/dosxengut/image/upload/v1747730468/Picture18_zo3eri.png"
            alt=""
            fill
            className="object-contain scale-90"
            priority
            sizes="(max-width: 768px) 180px, 200px"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[#F39200] font-medium mb-2 block">Our Foundation</span>
          <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-[#5E366D] mb-6">Our Values</h2>
          <div className="h-1 w-40 md:w-48 bg-gradient-to-r from-[#5E366D] to-[#F39200] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our core values shape who we are and guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `linear-gradient(to bottom right, white, ${value.color}05)`
              }}
              role="article"
              aria-label={value.ariaLabel}
            >
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              
              <div className="flex flex-col items-center text-center mb-4 relative">
                <motion.div 
                  className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl transition-all duration-300"
                  style={{ 
                    backgroundColor: `${value.color}10`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    x: mousePosition.x / 100,
                    y: mousePosition.y / 100,
                    transition: {
                      type: "spring",
                      mass: 0.5,
                      stiffness: 50,
                      damping: 10
                    }
                  }}
                >
                  <value.Icon 
                    className="w-8 h-8 transition-all duration-300 group-hover:scale-110"
                    style={{ color: value.color }}
                  />
                </motion.div>
                <h3 
                  className="text-xl font-semibold mb-3 transition-all duration-300"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
