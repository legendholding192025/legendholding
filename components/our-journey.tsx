"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import React from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Building, Car, Globe, Zap, Truck, MapPin, Award, Sparkles, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { JSX } from "react/jsx-runtime"

// Error boundary component
interface AnimationErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface AnimationErrorBoundaryState {
  hasError: boolean
}

class AnimationErrorBoundary extends React.Component<AnimationErrorBoundaryProps, AnimationErrorBoundaryState> {
  constructor(props: AnimationErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AnimationErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

type MilestoneType = {
  year: number
  achievements: {
    title: string
    description?: string
    icon: JSX.Element
    color: string
    image?: string
  }[]
}

interface Screenshot {
  id: string
  title: string
  year: number
  image: string
  description: string
  category: string
}

// Animation configurations
const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
}

const slideUpAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export function OurJourney() {
  const [activeYearIndex, setActiveYearIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const milestones: MilestoneType[] = [
    {
      year: 2008,
      achievements: [
        {
          title: "Oriental wiseman general trading",
          description:
            "Our journey began with the establishment of our first trading company, focusing on bringing quality products to the market.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=company%20founding%20ceremony",
        },
      ],
    },
    {
      year: 2013,
      achievements: [
        {
          title: "Legend motors FZCO",
          description:
            "Established our first automotive company in the free zone, marking our entry into the automotive industry.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=automotive%20launch",
        },
        {
          title: "Legend Motors Br-1",
          description:
            "Opened our first showroom (268), showcasing our commitment to providing exceptional customer experiences.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=modern%20car%20showroom",
        },
      ],
    },
    {
      year: 2014,
      achievements: [
        {
          title: "Legend Multi Motors",
          description:
            "Expanded our automotive portfolio with multiple brands, offering customers a wider range of choices.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=multiple%20car%20brands%20showroom",
        },
        {
          title: "Legend Motors Br-2",
          description: "Opened our second showroom (116), further expanding our physical presence in the market.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=luxury%20car%20dealership",
        },
      ],
    },
    {
      year: 2016,
      achievements: [
        {
          title: "Jabal Al Barakha",
          description:
            "Established new regional operations to better serve our growing customer base across different territories.",
          icon: <MapPin className="w-5 h-5" />,
          color: "bg-emerald-100 text-emerald-700",
          image: "/placeholder.svg?height=300&width=500&query=regional%20operations%20center",
        },
      ],
    },
    {
      year: 2017,
      achievements: [
        {
          title: "Highline Motors Trading",
          description:
            "Launched our premium automotive division, catering to luxury vehicle enthusiasts with exclusive offerings.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=luxury%20car%20showroom",
        },
        {
          title: "Automatic Motors",
          description:
            "Specialized division for automatic transmission vehicles, meeting the growing demand for this technology.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=automatic%20transmission%20vehicles",
        },
      ],
    },
    {
      year: 2018,
      achievements: [
        {
          title: "Zul Energy",
          description:
            "Ventured into the energy sector with innovative solutions, diversifying our business portfolio beyond automotive.",
          icon: <Zap className="w-5 h-5" />,
          color: "bg-blue-100 text-blue-700",
          image: "/placeholder.svg?height=300&width=500&query=renewable%20energy%20landscape",
        },
      ],
    },
    {
      year: 2019,
      achievements: [
        {
          title: "Legend World Investment",
          description: "Established our global investment division to explore new opportunities and markets worldwide.",
          icon: <Globe className="w-5 h-5" />,
          color: "bg-indigo-100 text-indigo-700",
          image: "/placeholder.svg?height=300&width=500&query=global%20investment%20office",
        },
        {
          title: "Legend Travel & Tourism",
          description:
            "Expanded into the tourism and hospitality sector, offering premium travel experiences to our customers.",
          icon: <Globe className="w-5 h-5" />,
          color: "bg-indigo-100 text-indigo-700",
          image: "/placeholder.svg?height=300&width=500&query=travel%20tourism%20agency",
        },
      ],
    },
    {
      year: 2020,
      achievements: [
        {
          title: "Legend Motors Br-3",
          description: "Opened our third showroom (26), continuing our expansion despite global challenges.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=modern%20automotive%20showroom",
        },
      ],
    },
    {
      year: 2021,
      achievements: [
        {
          title: "Legend Motors Br-4",
          description:
            "Opened our fourth showroom (46), strengthening our market presence with a state-of-the-art facility.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=futuristic%20car%20showroom",
        },
        {
          title: "Legend World Rent A Car",
          description:
            "Launched our vehicle rental services, providing flexible mobility solutions for various customer needs.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=car%20rental%20service",
        },
        {
          title: "Legend World Automobile Services",
          description:
            "Comprehensive automotive service centers ensuring top-quality maintenance and support for all vehicles.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=automobile%20service%20center",
        },
      ],
    },
    {
      year: 2022,
      achievements: [
        {
          title: "Skywell Dealership",
          description:
            "Secured exclusive dealership rights for Skywell, bringing innovative electric vehicles to our market.",
          icon: <Award className="w-5 h-5" />,
          color: "bg-rose-100 text-rose-700",
          image: "/placeholder.svg?height=300&width=500&query=skywell%20electric%20vehicles",
        },
        {
          title: "Kaiyi Dealership",
          description: "Expanded our brand portfolio with Kaiyi, offering customers more diverse automotive options.",
          icon: <Award className="w-5 h-5" />,
          color: "bg-rose-100 text-rose-700",
          image: "/placeholder.svg?height=300&width=500&query=kaiyi%20vehicles%20showroom",
        },
        {
          title: "Lifan Dealership",
          description: "Added another prestigious brand to our lineup, strengthening our position in the market.",
          icon: <Award className="w-5 h-5" />,
          color: "bg-rose-100 text-rose-700",
          image: "/placeholder.svg?height=300&width=500&query=lifan%20vehicles%20display",
        },
        {
          title: "Li Auto",
          description:
            "Partnered with electric vehicle manufacturer Li Auto, embracing the future of sustainable transportation.",
          icon: <Car className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=li%20auto%20electric%20vehicles",
        },
        {
          title: "212",
          description:
            "Special project launch that marked a significant milestone in our company's innovation journey.",
          icon: <MapPin className="w-5 h-5" />,
          color: "bg-emerald-100 text-emerald-700",
          image: "/placeholder.svg?height=300&width=500&query=special%20project%20launch%20event",
        },
      ],
    },
    {
      year: 2023,
      achievements: [
        {
          title: "Legend Motors Br-5",
          description:
            "Opened our fifth showroom in Jebel Ali, featuring our most advanced facilities and technologies.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=jebel%20ali%20car%20showroom",
        },
        {
          title: "Legend Green Energy Solution",
          description:
            "Launched sustainable energy initiatives, contributing to environmental conservation and green technology.",
          icon: <Zap className="w-5 h-5" />,
          color: "bg-green-100 text-green-700",
          image: "/placeholder.svg?height=300&width=500&query=green%20energy%20solutions",
        },
        {
          title: "Legend Logistics",
          description:
            "Established comprehensive logistics services to optimize our supply chain and delivery capabilities.",
          icon: <Truck className="w-5 h-5" />,
          color: "bg-orange-100 text-orange-700",
          image: "/placeholder.svg?height=300&width=500&query=logistics%20and%20transportation%20fleet",
        },
      ],
    },
    {
      year: 2025,
      achievements: [
        {
          title: "Opening Global Headquarters in JAFZA",
          description:
            "Our future landmark headquarters spanning over 450,000 SQFT will serve as the nerve center for our global operations.",
          icon: <Building className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=futuristic%20corporate%20headquarters",
        },
      ],
    },
  ]

  // Generate screenshots data
  const screenshots: Screenshot[] = milestones.flatMap((milestone) =>
    milestone.achievements.map((achievement, index) => ({
      id: `${milestone.year}-${index}`,
      title: achievement.title,
      year: milestone.year,
      image: achievement.image || "/placeholder.svg?height=300&width=500&query=default",
      description: achievement.description || "",
      category:
        achievement.title.includes("Motors") || achievement.title.includes("Car")
          ? "Automotive"
          : achievement.title.includes("Energy")
            ? "Energy"
            : achievement.title.includes("Travel") || achievement.title.includes("Tourism")
              ? "Tourism"
              : "Business",
    })),
  )

  // Scroll-based navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 800)

      if (e.deltaY > 0) {
        setActiveYearIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : prev))
      } else {
        setActiveYearIndex((prev) => (prev > 0 ? prev - 1 : prev))
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [milestones.length, isScrolling])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveYearIndex((prev) => {
          const next = prev < milestones.length - 1 ? prev + 1 : 0
          scrollToActiveYear(next, true)
          return next
        })
      }, 4000)
    }

    return () => clearInterval(interval)
  }, [isAutoPlaying, milestones.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActiveYearIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActiveYearIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : prev))
      } else if (e.key === "Escape") {
        setSelectedAchievement(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const scrollToActiveYear = useCallback(
    (index: number, isSmooth: boolean) => {
      setActiveYearIndex(index)
      setSelectedAchievement(null)

      if (timelineRef.current) {
        const timelineWidth = timelineRef.current.clientWidth
        const itemWidth = 100
        const scrollPosition = index * itemWidth - timelineWidth / 2 + itemWidth / 2

        timelineRef.current.scrollTo({
          left: scrollPosition,
          behavior: isSmooth ? "smooth" : "auto",
        })
      }
    },
    [timelineRef],
  )

  return (
    <SidebarProvider>
      <div className="h-screen w-full overflow-hidden relative bg-white flex">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 opacity-30 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-secondary/5 opacity-20 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 25,
              ease: "easeInOut",
            }}
          />
        </div>

        <AppSidebar
          activeYear={milestones[activeYearIndex].year}
          screenshots={screenshots}
          side="left"
          className="w-1/4"
        />

        <SidebarInset>
          <section ref={sectionRef} className="h-full w-full overflow-hidden relative flex flex-col">
            <div ref={scrollRef} className="container relative z-10 px-6 mx-auto max-w-6xl flex flex-col h-full">
              {/* Timeline visualization */}
              <div className="relative py-6 overflow-hidden border-b border-primary/10">
                <div
                  ref={timelineRef}
                  className="flex items-center overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex items-center space-x-6 px-4 mx-auto">
                    {milestones.map((milestone, index) => (
                      <button
                        key={milestone.year}
                        onClick={() => {
                          scrollToActiveYear(index, true)
                          setIsAutoPlaying(false)
                        }}
                        className={cn(
                          "flex flex-col items-center min-w-[100px] transition-all duration-500 relative py-3 group",
                          index === activeYearIndex ? "scale-110" : "opacity-60 hover:opacity-90",
                        )}
                        aria-label={`View milestones from ${milestone.year}`}
                        aria-current={index === activeYearIndex ? "true" : "false"}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full border-3 transition-all duration-500 mb-3 relative overflow-hidden",
                            index === activeYearIndex
                              ? "border-secondary bg-white shadow-lg"
                              : "border-gray-300 bg-white group-hover:border-secondary",
                          )}
                        >
                          {index === activeYearIndex && (
                            <motion.div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="w-5 h-5 rounded-full bg-secondary"
                                animate={{
                                  scale: [1, 1.3, 1],
                                  rotate: [0, 180, 360],
                                }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 3,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                        <div
                          className={cn(
                            "h-1 w-24 rounded-full transition-all duration-500",
                            index === activeYearIndex
                              ? "bg-secondary"
                              : "bg-gray-300 group-hover:bg-secondary/30",
                          )}
                        />
                        <span
                          className={cn(
                            "font-bold mt-3 transition-all duration-500",
                            index === activeYearIndex
                              ? "text-secondary text-xl"
                              : "text-gray-500 group-hover:text-secondary",
                          )}
                        >
                          {milestone.year}
                        </span>
                        <Badge
                          variant={index === activeYearIndex ? "default" : "secondary"}
                          className={cn(
                            "mt-1 text-xs transition-all duration-500",
                            index === activeYearIndex ? "bg-secondary text-white" : "bg-gray-100 text-gray-600",
                          )}
                        >
                          {milestone.achievements.length} milestone{milestone.achievements.length > 1 ? "s" : ""}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
              </div>

              {/* Main content area - Achievements */}
              <div className="flex-1 overflow-hidden relative pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`year-${activeYearIndex}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="h-full flex flex-col"
                  >
                    {/* Year title */}
                    <div className="text-center mb-6">
                      <motion.h2
                        className="text-3xl font-bold text-primary mb-2"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {milestones[activeYearIndex].year}{" "}
                        <span className="text-xl font-normal text-primary/60">Achievements</span>
                      </motion.h2>
                      <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    {/* Achievements grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-6 achievements-container">
                      {milestones[activeYearIndex].achievements.map((achievement, index) => (
                        <motion.div
                          key={`${milestones[activeYearIndex].year}-${index}`}
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            "bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group cursor-pointer h-full",
                            selectedAchievement === index
                              ? "ring-2 ring-primary ring-offset-2 scale-105"
                              : "hover:scale-105",
                          )}
                          onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
                          whileHover={{ y: -5 }}
                        >
                          <div className="p-6 h-full flex flex-col">
                            <div className="flex items-start gap-4 mb-4">
                              <div
                                className={cn(
                                  "p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                                  achievement.color,
                                )}
                              >
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                                  {achievement.title}
                                </h3>
                              </div>
                            </div>

                            <motion.div
                              initial={{ height: selectedAchievement === index ? "auto" : "60px", overflow: "hidden" }}
                              animate={{ height: selectedAchievement === index ? "auto" : "60px", overflow: "hidden" }}
                              transition={{ duration: 0.4 }}
                              className="flex-1"
                            >
                              {achievement.description && (
                                <p className="text-primary/70 leading-relaxed">{achievement.description}</p>
                              )}
                            </motion.div>

                            {achievement.description && achievement.description.length > 100 && (
                              <motion.button
                                className="mt-4 text-sm font-medium text-primary hover:text-secondary transition-colors flex items-center self-start group/btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedAchievement(selectedAchievement === index ? null : index)
                                }}
                                whileHover={{ x: 5 }}
                              >
                                {selectedAchievement === index ? "Show less" : "Read more"}
                                <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Future vision for 2025 */}
                    {activeYearIndex === milestones.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-6 p-6 bg-primary text-white text-center relative overflow-hidden rounded-2xl"
                      >
                        <div className="absolute inset-0 bg-secondary/10"></div>
                        <div className="relative z-10">
                          <Sparkles className="w-8 h-8 mx-auto mb-3 text-secondary" />
                          <h3 className="text-2xl font-bold mb-3">Our Vision for the Future</h3>
                          <p className="max-w-3xl mx-auto text-lg opacity-90">
                            Our new global headquarters represents the next chapter in our journey, setting the stage
                            for even greater achievements and innovations to come.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
        </SidebarInset>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .achievements-container::-webkit-scrollbar {
          width: 8px;
        }
        .achievements-container::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }
        .achievements-container::-webkit-scrollbar-thumb {
          background: #5E366D;
          border-radius: 10px;
        }
        .achievements-container::-webkit-scrollbar-thumb:hover {
          background: #F08900;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SidebarProvider>
  )
}
