"use client"

import type React from "react"
import { useState, useId, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, Leaf, Lightbulb, Users } from "lucide-react"
import { cn } from "@/lib/utils"

type CSRInitiative = {
  id: string
  title: string
  description: string
  image: string
  icon: React.ReactNode
  url: string
}

const csrInitiatives: CSRInitiative[] = [
  {
    id: "csr-1",
    title: "Humanitarian Relief",
    description:
      "Providing immediate emergency response and long-term support during natural disasters, including earthquake relief efforts, ensuring essential aid reaches affected communities.",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746786003/Emergency-Relief-Initiative-796x372-1_xktqfm.webp",
    icon: <Heart className="h-6 w-6" />,
    url: "/csr/humanitarian-relief",
  },
  {
    id: "csr-2",
    title: "Community Development",
    description:
      "Supporting communities through year-round initiatives, including special Ramadan programs providing food, essential supplies, and support to families in need.",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1748260264/0f47e352-6e32-4d03-a8ef-bd4ad4e14f54_vp6yiq.jpg",
    icon: <Users className="h-6 w-6" />,
    url: "/csr/community-development",
  }
]

// Pre-generate background circles to avoid hydration issues
const backgroundCircles = Array.from({ length: 20 }).map((_, i) => ({
  id: `circle-${i}`,
  width: Math.floor(Math.random() * 300 + 50),
  height: Math.floor(Math.random() * 300 + 50),
  top: Math.floor(Math.random() * 100),
  left: Math.floor(Math.random() * 100),
}))

export function CSRSection() {
  const [mounted, setMounted] = useState(false)
  const [activeInitiative, setActiveInitiative] = useState(csrInitiatives[0].id)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})
  const backgroundId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageError = (initiativeId: string) => {
    setImageError((prev) => ({ ...prev, [initiativeId]: true }))
  }

  if (!mounted) {
    return null // Return null on server-side to prevent hydration mismatch
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-primary" style={{ opacity: 0.03 }}></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {backgroundCircles.map((circle) => (
            <div
              key={`${backgroundId}-${circle.id}`}
              className="absolute rounded-full bg-primary"
              style={{
                width: `${circle.width}px`,
                height: `${circle.height}px`,
                top: `${circle.top}%`,
                left: `${circle.left}%`,
                opacity: 0.03,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F08900] mb-4">Corporate Social Responsibility</h2>
          <div className="w-24 h-1 bg-[#5E366D] mx-auto rounded-full mb-6"></div>
          <p className="text-[#5E366D] max-w-4xl mx-auto text-center text-lg md:text-xl leading-relaxed">
            At Legend Holding Group, we believe in giving back to society and making a positive impact on the
            communities we serve. Our CSR initiatives focus on sustainable development, community welfare, and
            environmental stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Initiative tabs */}
          <div className="space-y-4 h-full flex flex-col justify-center">
            {csrInitiatives.map((initiative) => (
              <button
                key={initiative.id}
                onClick={() => setActiveInitiative(initiative.id)}
                className={cn(
                  "w-full text-left p-5 rounded-lg transition-all duration-300 flex items-start gap-4 border",
                  activeInitiative === initiative.id
                    ? "bg-[#5E366D] shadow-lg border-[#5E366D]/20 text-white"
                    : "bg-[#F08900] hover:bg-[#F08900]/90 hover:shadow-md border-[#F08900]/20 text-white",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full flex-shrink-0 transition-colors duration-300",
                    activeInitiative === initiative.id ? "bg-white text-[#5E366D]" : "bg-white text-[#F08900]",
                  )}
                >
                  {initiative.icon}
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-semibold text-xl mb-2 transition-colors duration-300",
                      activeInitiative === initiative.id ? "text-white" : "text-white",
                    )}
                  >
                    {initiative.title}
                  </h3>
                  <p
                    className={cn(
                      "text-base md:text-lg transition-colors duration-300",
                      activeInitiative === initiative.id ? "text-white/90" : "text-white/90",
                    )}
                  >
                    {initiative.description}
                  </p>
                </div>
              </button>
            ))}

            <Link
              href="/csr"
              className="inline-flex items-center text-[#EE8900] font-medium mt-6 hover:text-[#EE8900]/80 transition-colors group text-lg"
            >
              View All CSR Initiatives
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right side - Image showcase */}
          <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl">
            {csrInitiatives.map((initiative) => (
              <div
                key={initiative.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  activeInitiative === initiative.id ? "opacity-100 z-10" : "opacity-0 z-0",
                )}
              >
                <Image
                  src={imageError[initiative.id] ? "/placeholder.jpg" : initiative.image}
                  alt={initiative.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => handleImageError(initiative.id)}
                  priority={activeInitiative === initiative.id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{initiative.title}</h3>
                  <p className="text-white/90 text-base md:text-lg">
                    Learn more about how we're making a difference
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </section>
  )
}
