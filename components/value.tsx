"use client"

import { motion } from "framer-motion"
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
      color: "#F39200"
    },
    {
      title: "Excellence",
      description: "We aim for excellence so that everyone works well together.",
      Icon: StarIcon,
      color: "#5D2A8A"
    },
    {
      title: "Growth",
      description: "Our focus is to promote continuous growth and development.",
      Icon: ArrowTrendingUpIcon,
      color: "#F39200"
    },
    {
      title: "Empathy",
      description: "We recognize potential and acknowledge everyone's potential.",
      Icon: HandRaisedIcon,
      color: "#5D2A8A"
    },
    {
      title: "Nimble",
      description: "We believe in quick minds, being fast in our thinking and actions.",
      Icon: BoltIcon,
      color: "#F39200"
    },
    {
      title: "Diversity",
      description: "We create opportunities for people of all sectors.",
      Icon: UsersIcon,
      color: "#5D2A8A"
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#5D2A8A]/5 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#5D2A8A]/5 rounded-full blur-[80px] animate-pulse"></div>
        
        {/* Decorative image in top right */}
        <div className="absolute top-0 right-0 w-[180px] h-[180px] md:w-[200px] md:h-[200px] opacity-25 pointer-events-none">
          <Image
            src="https://res.cloudinary.com/dosxengut/image/upload/v1747730468/Picture18_zo3eri.png"
            alt="Decorative background"
            fill
            className="object-contain scale-90"
            priority
            sizes="(max-width: 768px) 180px, 200px"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#5D2A8A] mb-4">Our Values</h2>
          <div className="h-1 w-40 md:w-48 bg-[#5D2A8A] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our core values shape who we are and guide everything we do
          </p>
        </motion.div>

        <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-6 lg:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              className="flex-none w-[280px] lg:w-auto bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <motion.div 
                  className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl transition-all duration-300"
                  style={{ 
                    backgroundColor: `${value.color}10`,
                  }}
                  animate={{
                    x: mousePosition.x / 50,
                    y: mousePosition.y / 50,
                    transition: {
                      type: "spring",
                      mass: 0.5,
                      stiffness: 50,
                      damping: 10
                    }
                  }}
                >
                  <value.Icon 
                    className="w-6 h-6 transition-all duration-300"
                    style={{ color: value.color }}
                  />
                </motion.div>
                <h3 
                  className="text-lg font-semibold mb-2 transition-all duration-300"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 text-base">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
