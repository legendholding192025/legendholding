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
    title: "Environmental Sustainability",
    description:
      "Our commitment to reducing carbon footprint through renewable energy adoption, waste reduction, and sustainable business practices.",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746797599/iStock-1009934102_cre0yr.webp",
    icon: <Leaf className="h-6 w-6" />,
    url: "/csr/environmental-sustainability",
  },
  {
    id: "csr-2",
    title: "Community Development",
    description:
      "Supporting local communities through education initiatives, infrastructure development, and economic empowerment programs.",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746785737/7_cwmzrg.jpg",
    icon: <Users className="h-6 w-6" />,
    url: "/csr/community-development",
  },
  {
    id: "csr-3",
    title: "Humanitarian Relief",
    description:
      "Providing aid and support during crises and natural disasters, ensuring essential resources reach those in need.",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746797713/blog-corporate-social-responsibility-program_olhz5m.webp",
    icon: <Heart className="h-6 w-6" />,
    url: "/csr/humanitarian-relief",
  },
  {
    id: "csr-4",
    title: "Innovation for Good",
    description:
      "Leveraging technology and innovation to address social and environmental challenges across our operational regions.",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746785737/7_cwmzrg.jpg",
    icon: <Lightbulb className="h-6 w-6" />,
    url: "/csr/innovation-for-good",
  },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Corporate Social Responsibility</h2>
          <p className="text-gray-600">
            At Legend Holding Group, we believe in giving back to society and making a positive impact on the
            communities we serve. Our CSR initiatives focus on sustainable development, community welfare, and
            environmental stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Initiative tabs */}
          <div className="space-y-4">
            {csrInitiatives.map((initiative) => (
              <button
                key={initiative.id}
                onClick={() => setActiveInitiative(initiative.id)}
                className={cn(
                  "w-full text-left p-5 rounded-lg transition-all duration-300 flex items-start gap-4 border",
                  activeInitiative === initiative.id
                    ? "bg-white shadow-lg border-primary/20"
                    : "bg-white/50 hover:bg-white hover:shadow-md border-gray-100",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full flex-shrink-0 transition-colors duration-300",
                    activeInitiative === initiative.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500",
                  )}
                >
                  {initiative.icon}
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-semibold text-lg mb-1 transition-colors duration-300",
                      activeInitiative === initiative.id ? "text-primary" : "text-gray-800",
                    )}
                  >
                    {initiative.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm transition-colors duration-300",
                      activeInitiative === initiative.id ? "text-gray-700" : "text-gray-500",
                    )}
                  >
                    {initiative.description}
                  </p>
                </div>
              </button>
            ))}

            <Link
              href="/csr"
              className="inline-flex items-center text-secondary font-medium mt-6 hover:text-secondary/80 transition-colors group"
            >
              View All CSR Initiatives
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right side - Image showcase */}
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
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
                  <h3 className="text-2xl font-bold mb-2">{initiative.title}</h3>
                  <Link
                    href={initiative.url}
                    className="inline-flex items-center text-white/90 hover:text-white transition-colors group text-sm font-medium"
                  >
                    Learn more about this initiative
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </section>
  )
}
