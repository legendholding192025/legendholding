"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { Building, Car, Globe, Zap, MapPin, Award, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type MilestoneType = {
  year: number
  title: string
  description: string
  image: string
  icon: React.ReactNode
  color: string
  achievements: string[]
}

const TIMELINE_HEIGHT = 70
const ITEM_WIDTH = 120

export function OurJourney() {
  const [activeYearIndex, setActiveYearIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const setSectionRef = useCallback((el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el
  }, [])

  const milestones: MilestoneType[] = [
    {
      year: 2008,
      title: "Oriental Wiseman General Trading",
      description:
        "Our journey began with the establishment of our first trading company, focusing on bringing quality products to the market with a vision for excellence.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      icon: <Building className="w-6 h-6" />,
      color: "#7c3aed",
      achievements: ["Company Foundation", "First Trading Operations", "Market Entry"],
    },
    {
      year: 2013,
      title: "Legend Motors FZCO",
      description:
        "Established our first automotive company in the free zone, marking our entry into the automotive industry with our first showroom.",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683eab0e39b1c2.37745865_20250603_075806.webp",
      icon: <Car className="w-6 h-6" />,
      color: "#6d28d9",
      achievements: ["Legend Motors FZCO", "Legend Motors Br-1 (268)", "Automotive Industry Entry"],
    },
    {
      year: 2014,
      title: "Multi-Brand Expansion",
      description:
        "Expanded our automotive portfolio with multiple brands and opened our second showroom, offering customers a wider range of choices.",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop",
      icon: <Car className="w-6 h-6" />,
      color: "#5b21b6",
      achievements: ["Legend Multi Motors", "Legend Motors Br-2 (116)", "Brand Portfolio Expansion"],
    },
    {
      year: 2016,
      title: "Regional Operations",
      description:
        "Established new regional operations at Jabal Al Barakha to better serve our growing customer base across different territories.",
      image: "https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=2070&auto=format&fit=crop",
      icon: <MapPin className="w-6 h-6" />,
      color: "#4c1d95",
      achievements: ["Jabal Al Barakha Operations", "Regional Expansion", "Territory Coverage"],
    },
    {
      year: 2017,
      title: "Premium Automotive Division",
      description:
        "Launched our premium automotive divisions, catering to luxury vehicle enthusiasts and automatic transmission specialists.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
      icon: <Car className="w-6 h-6" />,
      color: "#7c3aed",
      achievements: ["Highline Motors Trading", "Automatic Motors", "Premium Market Entry"],
    },
    {
      year: 2018,
      title: "Energy Sector Venture",
      description:
        "Ventured into the energy sector with Zul Energy, bringing innovative solutions and diversifying our business portfolio beyond automotive.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
      icon: <Zap className="w-6 h-6" />,
      color: "#6d28d9",
      achievements: ["Zul Energy Launch", "Energy Sector Entry", "Business Diversification"],
    },
    {
      year: 2019,
      title: "Global Investment & Tourism",
      description:
        "Established our global investment division and expanded into tourism, exploring new opportunities and markets worldwide.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      icon: <Globe className="w-6 h-6" />,
      color: "#5b21b6",
      achievements: ["Legend World Investment", "Legend Travel & Tourism", "Global Market Expansion"],
    },
    {
      year: 2020,
      title: "Continued Growth",
      description:
        "Opened our third showroom despite global challenges, demonstrating our resilience and commitment to growth.",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2070&auto=format&fit=crop",
      icon: <Building className="w-6 h-6" />,
      color: "#4c1d95",
      achievements: ["Legend Motors Br-3 (26)", "Pandemic Resilience", "Continued Expansion"],
    },
    {
      year: 2021,
      title: "Service Excellence",
      description:
        "Expanded with our fourth showroom and comprehensive automotive services, including rental and maintenance solutions.",
      image: "https://images.unsplash.com/photo-1613214049841-0d677ddf52af?q=80&w=2070&auto=format&fit=crop",
      icon: <Car className="w-6 h-6" />,
      color: "#7c3aed",
      achievements: ["Legend Motors Br-4 (46)", "Rent A Car Services", "Automobile Services"],
    },
    {
      year: 2022,
      title: "Electric Vehicle Revolution",
      description:
        "Secured multiple prestigious dealerships including Skywell, Kaiyi, Lifan, and Li Auto, embracing the future of sustainable transportation.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
      icon: <Award className="w-6 h-6" />,
      color: "#6d28d9",
      achievements: ["Skywell Dealership", "Kaiyi & Lifan Partnerships", "Li Auto & Project 212"],
    },
    {
      year: 2023,
      title: "Sustainable Innovation",
      description:
        "Opened our fifth showroom in Jebel Ali and launched green energy solutions alongside comprehensive logistics services.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2074&auto=format&fit=crop",
      icon: <Zap className="w-6 h-6" />,
      color: "#5b21b6",
      achievements: ["Legend Motors Br-5 Jebel Ali", "Green Energy Solutions", "Legend Logistics"],
    },
    {
      year: 2025,
      title: "Global Headquarters",
      description:
        "Our future landmark headquarters spanning over 450,000 SQFT in JAFZA will serve as the nerve center for our global operations.",
      image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg",
      icon: <Building className="w-6 h-6" />,
      color: "#4c1d95",
      achievements: ["Global HQ Opening", "450,000 SQFT Facility", "JAFZA Operations Center"],
    },
  ]

  // Optimized timeline scroll with debouncing
  const scrollToActiveYear = useCallback(
    (index: number) => {
      if (timelineRef.current && !isScrolling) {
        const timelineWidth = timelineRef.current.clientWidth
        const scrollPosition = index * ITEM_WIDTH - timelineWidth / 2 + ITEM_WIDTH / 2

        timelineRef.current.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        })
      }
    },
    [isScrolling],
  )

  // Improved scroll to section with offset calculation
  const scrollToSection = useCallback((index: number) => {
    const section = sectionsRef.current[index]
    if (section) {
      setIsScrolling(true)
      const sectionTop = section.offsetTop

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })

      // Reset scrolling flag after animation
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }, [])

  // Optimized scroll detection with throttling
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking && !isScrolling) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + TIMELINE_HEIGHT

          sectionsRef.current.forEach((section, index) => {
            if (section) {
              const sectionTop = section.offsetTop
              const sectionBottom = sectionTop + section.offsetHeight

              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (activeYearIndex !== index) {
                  setActiveYearIndex(index)
                }
              }
            }
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [activeYearIndex, isScrolling])

  // Update timeline scroll position when active year changes
  useEffect(() => {
    scrollToActiveYear(activeYearIndex)
  }, [activeYearIndex, scrollToActiveYear])

  return (
    <>
      <Header />
      <div className="relative w-full overflow-x-hidden">
        {/* Enhanced Timeline Header */}
        <div
          className="fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-sm"
          style={{ 
            height: `${TIMELINE_HEIGHT}px`,
            backgroundColor: '#5E366D'
          }}
        >
          <div className="h-full flex items-center">
            <div
              ref={timelineRef}
              className="flex items-center overflow-x-auto scrollbar-hide w-full px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex items-center space-x-6 mx-auto">
                {milestones.map((milestone, index) => (
                  <button
                    key={milestone.year}
                    onClick={() => {
                      setActiveYearIndex(index)
                      scrollToSection(index)
                    }}
                    className={cn(
                      "flex flex-col items-center min-w-[100px] transition-all duration-300 py-2 px-4 rounded-xl group",
                      index === activeYearIndex
                        ? "bg-white text-[#5E366D] scale-110 shadow-lg"
                        : "hover:bg-white/20 text-white hover:scale-105",
                    )}
                    aria-label={`Go to ${milestone.year} - ${milestone.title}`}
                  >
                    <span
                      className={cn(
                        "font-bold text-lg transition-all duration-300",
                        index === activeYearIndex ? "text-[#5E366D] text-xl" : "text-white/95 group-hover:text-white",
                      )}
                    >
                      {milestone.year}
                    </span>
                    {index === activeYearIndex && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="h-1 bg-[#F08900] rounded-full mt-1"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sections */}
        <div className="w-full">
          {milestones.map((milestone, index) => (
            <section
              key={milestone.year}
              ref={(el) => setSectionRef(el as HTMLDivElement | null, index)}
              className="relative w-full"
              style={{ height: `100vh` }}
              aria-label={`${milestone.year} - ${milestone.title}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={milestone.image || "/placeholder.svg"}
                  alt={`${milestone.title} - ${milestone.year}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index < 3}
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1C48]/85 via-[#2B1C48]/50 to-[#2B1C48]/20" />

                {/* Enhanced Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative z-10 text-white text-center w-full max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="space-y-8"
                    >
                      {/* Scroll Down Indicator - Only show on first section */}
                      {index === 0 && (
                        <motion.div 
                          className="mb-8 cursor-pointer"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 10,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          onClick={() => scrollToSection(1)}
                        >
                          <div className="flex flex-col items-center text-white gap-2">
                            <span className="text-base md:text-lg font-medium tracking-wider">Scroll Down</span>
                            <ChevronDown className="w-6 h-6 text-[#F08900]" />
                          </div>
                        </motion.div>
                      )}

                      {/* Enhanced Header */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                        <motion.div
                          className="bg-[#F08900] p-4 rounded-2xl shadow-2xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {milestone.icon}
                        </motion.div>
                        <div className="text-center md:text-left">
                          <motion.h1
                            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            {milestone.title}
                          </motion.h1>
                          <Badge
                            variant="secondary"
                            className="text-lg md:text-xl px-6 py-3 bg-[#F08900]/95 text-white hover:bg-[#F08900] shadow-lg border-0"
                          >
                            {milestone.year}
                          </Badge>
                        </div>
                      </div>

                      {/* Enhanced Description and Achievements */}
                      <motion.div
                        className="space-y-6 max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-100">
                          {milestone.description}
                        </p>
                        
                        {/* Bullet Points Achievements Display */}
                        <div className="mt-8 space-y-3">
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievement}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + achievementIndex * 0.1, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-3 text-lg md:text-xl text-white/90 font-medium"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#F08900]" />
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
