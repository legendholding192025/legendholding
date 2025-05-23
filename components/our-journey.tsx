"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import React from "react"
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion"
import {
  ChevronRight,
  ChevronLeft,
  Building,
  Car,
  Globe,
  Zap,
  Truck,
  MapPin,
  Award,
  Play,
  Pause,
  ChevronDown,
  ChevronsDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

// Modify the animation configurations
const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}

const slideUpAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export function OurJourney() {
  const [activeYearIndex, setActiveYearIndex] = useState(0) // Start with first year
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonYear, setComparisonYear] = useState<number | null>(null)
  const [previousYearIndex, setPreviousYearIndex] = useState(0) // Track previous year for animation
  const [animatingCircle, setAnimatingCircle] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const circleAnimationControls = useAnimation()
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  const milestones: MilestoneType[] = [
    {
      year: 2008,
      achievements: [
        {
          title: "Oriental wiseman general trading",
          description:
            "Our journey began with the establishment of our first trading company, focusing on bringing quality products to the market.",
          icon: <Building />,
          color: "bg-purple-100 text-purple-700",
          image: "/company-founding-ceremony.png",
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
          icon: <Car />,
          color: "bg-amber-100 text-amber-700",
          image: "/automotive-launch.png",
        },
        {
          title: "Legend Motors Br-1",
          description:
            "Opened our first showroom (268), showcasing our commitment to providing exceptional customer experiences.",
          icon: <Building />,
          color: "bg-purple-100 text-purple-700",
          image: "/modern-car-showroom.png",
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
          icon: <Car />,
          color: "bg-amber-100 text-amber-700",
          image: "/multiple-car-brands-showroom.png",
        },
        {
          title: "Legend Motors Br-2",
          description: "Opened our second showroom (116), further expanding our physical presence in the market.",
          icon: <Building />,
          color: "bg-purple-100 text-purple-700",
          image: "/luxury-car-dealership.png",
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
          icon: <MapPin />,
          color: "bg-emerald-100 text-emerald-700",
          image: "/placeholder-a6e59.png",
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
          icon: <Car />,
          color: "bg-amber-100 text-amber-700",
          image: "/luxury-car-showroom.png",
        },
        {
          title: "Automatic Motors",
          description:
            "Specialized division for automatic transmission vehicles, meeting the growing demand for this technology.",
          icon: <Car />,
          color: "bg-amber-100 text-amber-700",
          image: "/automatic-transmission-vehicles.png",
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
          icon: <Zap />,
          color: "bg-blue-100 text-blue-700",
          image: "/renewable-energy-landscape.png",
        },
      ],
    },
    {
      year: 2019,
      achievements: [
        {
          title: "Legend World Investment",
          description: "Established our global investment division to explore new opportunities and markets worldwide.",
          icon: <Globe />,
          color: "bg-indigo-100 text-indigo-700",
          image: "/global-investment-office.png",
        },
        {
          title: "Legend Travel & Tourism",
          description:
            "Expanded into the tourism and hospitality sector, offering premium travel experiences to our customers.",
          icon: <Globe />,
          color: "bg-indigo-100 text-indigo-700",
          image: "/travel-tourism-agency.png",
        },
      ],
    },
    {
      year: 2020,
      achievements: [
        {
          title: "Legend Motors Br-3",
          description: "Opened our third showroom (26), continuing our expansion despite global challenges.",
          icon: <Building />,
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
          icon: <Building />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=futuristic%20car%20showroom",
        },
        {
          title: "Legend World Rent A Car",
          description:
            "Launched our vehicle rental services, providing flexible mobility solutions for various customer needs.",
          icon: <Car />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=car%20rental%20service",
        },
        {
          title: "Legend World Automobile Services",
          description:
            "Comprehensive automotive service centers ensuring top-quality maintenance and support for all vehicles.",
          icon: <Car />,
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
          icon: <Award />,
          color: "bg-rose-100 text-rose-700",
          image: "/placeholder.svg?height=300&width=500&query=skywell%20electric%20vehicles",
        },
        {
          title: "Kaiyi Dealership",
          description: "Expanded our brand portfolio with Kaiyi, offering customers more diverse automotive options.",
          icon: <Award />,
          color: "bg-rose-100 text-rose-700",
          image: "/placeholder.svg?height=300&width=500&query=kaiyi%20vehicles%20showroom",
        },
        {
          title: "Lifan Dealership",
          description: "Added another prestigious brand to our lineup, strengthening our position in the market.",
          icon: <Award />,
          color: "bg-rose-100 text-rose-700",
          image: "/placeholder.svg?height=300&width=500&query=lifan%20vehicles%20display",
        },
        {
          title: "Li Auto",
          description:
            "Partnered with electric vehicle manufacturer Li Auto, embracing the future of sustainable transportation.",
          icon: <Car />,
          color: "bg-amber-100 text-amber-700",
          image: "/placeholder.svg?height=300&width=500&query=li%20auto%20electric%20vehicles",
        },
        {
          title: "212",
          description:
            "Special project launch that marked a significant milestone in our company's innovation journey.",
          icon: <MapPin />,
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
          icon: <Building />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=jebel%20ali%20car%20showroom",
        },
        {
          title: "Legend Green Energy Solution",
          description:
            "Launched sustainable energy initiatives, contributing to environmental conservation and green technology.",
          icon: <Zap />,
          color: "bg-green-100 text-green-700",
          image: "/placeholder.svg?height=300&width=500&query=green%20energy%20solutions",
        },
        {
          title: "Legend Logistics",
          description:
            "Established comprehensive logistics services to optimize our supply chain and delivery capabilities.",
          icon: <Truck />,
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
          icon: <Building />,
          color: "bg-purple-100 text-purple-700",
          image: "/placeholder.svg?height=300&width=500&query=futuristic%20corporate%20headquarters",
        },
      ],
    },
  ]

  // Scroll-based navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 800) // Debounce scrolling

      if (e.deltaY > 0) {
        // Scrolling down
        setActiveYearIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : prev))
      } else {
        // Scrolling up
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
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [isAutoPlaying, milestones.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrevYear()
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNextYear()
      } else if (e.key === "Escape") {
        setSelectedAchievement(null)
        setShowComparison(false)
      } else if (e.key === " ") {
        setIsAutoPlaying((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Animate circle when active year changes
  useEffect(() => {
    if (previousYearIndex !== activeYearIndex) {
      animateCircleJump(previousYearIndex, activeYearIndex)
      setPreviousYearIndex(activeYearIndex)
    }
  }, [activeYearIndex, previousYearIndex])

  // Scroll to active year when it changes
  useEffect(() => {
    scrollToActiveYear(activeYearIndex, true)
  }, [activeYearIndex])

  const animateCircleJump = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    setAnimatingCircle(true)
    
    try {
      await circleAnimationControls.start({
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      })
    } catch (error) {
      console.error("Animation error:", error)
    }
    
    setAnimatingCircle(false)
  }

  const handlePrevYear = () => {
    setIsAutoPlaying(false)
    setActiveYearIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextYear = () => {
    setIsAutoPlaying(false)
    setActiveYearIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : prev))
  }

  const scrollToActiveYear = useCallback(
    (index: number, isSmooth: boolean) => {
      setActiveYearIndex(index)
      setSelectedAchievement(null)

      if (timelineRef.current) {
        const timelineWidth = timelineRef.current.clientWidth
        const itemWidth = 100 // Approximate width of each year item
        const scrollPosition = index * itemWidth - timelineWidth / 2 + itemWidth / 2

        timelineRef.current.scrollTo({
          left: scrollPosition,
          behavior: isSmooth ? "smooth" : "auto",
        })
      }
    },
    [timelineRef],
  )

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  const toggleComparison = (yearIndex: number | null) => {
    if (yearIndex === comparisonYear) {
      setComparisonYear(null)
      setShowComparison(false)
    } else {
      setComparisonYear(yearIndex)
      setShowComparison(true)
    }
  }

  const getYearDifference = () => {
    if (comparisonYear === null) return null

    const currentYear = milestones[activeYearIndex].year
    const compareYear = milestones[comparisonYear].year
    const diff = currentYear - compareYear

    return {
      years: Math.abs(diff),
      direction: diff > 0 ? "after" : "before",
    }
  }

  const yearDiff = getYearDifference()

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-hidden relative bg-gradient-to-b from-white to-[#5E366D]/5 flex flex-col"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#5E366D]/10 opacity-20 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#F39200]/20 opacity-20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full bg-[#5E366D]/20 opacity-20 blur-3xl"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
      </div>

      <div ref={scrollRef} className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl flex flex-col h-full">
        {/* Header section */}
        <div className="flex flex-col items-center pt-10 pb-6">
          <AnimationErrorBoundary>
            <motion.div
              {...fadeInAnimation}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#5E366D]/10 text-[#5E366D] text-sm font-medium mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#5E366D] mr-2"></span>
              Our History
            </motion.div>

            <motion.h2
              {...slideUpAnimation}
              className="text-3xl sm:text-4xl font-bold text-[#5E366D] mb-2 text-center leading-tight"
            >
              <span className="relative">
                Our Journey
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#F39200] to-[#F39200]/70 rounded-full"
                ></motion.span>
              </span>
            </motion.h2>

            <motion.p
              {...slideUpAnimation}
              transition={{ delay: 0.1 }}
              className="text-[#5E366D]/80 max-w-2xl mx-auto text-center text-base mb-2"
            >
              Scroll to explore our company's remarkable growth over the years
            </motion.p>
          </AnimationErrorBoundary>

          {/* Scroll indicator */}
          <AnimationErrorBoundary>
            <motion.div
              {...fadeInAnimation}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center text-[#5E366D]/60 text-sm"
            >
              <ChevronsDown className="w-5 h-5 animate-bounce" />
              <span className="sr-only">Scroll to navigate</span>
            </motion.div>
          </AnimationErrorBoundary>
        </div>

        {/* Timeline visualization */}
        <div className="relative py-4 overflow-hidden">
          <div
            ref={timelineRef}
            className="flex items-center overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-center space-x-4 px-4 mx-auto">
              {milestones.map((milestone, index) => (
                <button
                  key={milestone.year}
                  onClick={() => {
                    if (showComparison && activeYearIndex !== index) {
                      toggleComparison(index)
                    } else {
                      scrollToActiveYear(index, true)
                      setIsAutoPlaying(false)
                    }
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    if (activeYearIndex !== index) {
                      toggleComparison(index)
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center min-w-[80px] transition-all duration-300 relative py-2",
                    index === activeYearIndex ? "scale-110" : "opacity-70 hover:opacity-100",
                    comparisonYear === index ? "ring-2 ring-[#F39200] ring-offset-2 rounded-lg" : "",
                  )}
                  aria-label={`View milestones from ${milestone.year}`}
                  aria-current={index === activeYearIndex ? "true" : "false"}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all duration-300 mb-2 relative",
                      index === activeYearIndex
                        ? "border-[#5E366D] bg-white"
                        : comparisonYear === index
                          ? "border-[#F39200] bg-[#F39200]/10"
                          : "border-gray-300 bg-gray-100",
                    )}
                  >
                    {/* Inner dot for active year */}
                    {index === activeYearIndex && (
                      <motion.div className="absolute inset-0 flex items-center justify-center" initial={false}>
                        <motion.div
                          className="w-4 h-4 rounded-full bg-[#5E366D]"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "h-0.5 w-20 transition-all duration-300",
                      index === activeYearIndex
                        ? "bg-[#5E366D]"
                        : comparisonYear === index
                          ? "bg-[#F39200]"
                          : "bg-gray-300",
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium mt-2 transition-all duration-300",
                      index === activeYearIndex
                        ? "text-[#5E366D] text-lg"
                        : comparisonYear === index
                          ? "text-[#F39200] font-bold"
                          : "text-gray-500",
                    )}
                  >
                    {milestone.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated jumping circle indicator */}
          <AnimationErrorBoundary>
            <AnimatePresence>
              {!animatingCircle && (
                <motion.div
                  key={`circle-${activeYearIndex}`}
                  className="absolute bottom-0 left-0 w-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute left-0 bottom-0 w-full flex justify-center"
                    style={{
                      left: `${activeYearIndex * 100 + 40}px`,
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <div className="w-3 h-3 bg-[#5E366D] rounded-full shadow-lg" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimationErrorBoundary>

          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-4 py-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleAutoPlay}
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isAutoPlaying ? "bg-[#5E366D]/10 text-[#5E366D] border-[#5E366D]/30" : "",
                  )}
                  aria-label={isAutoPlaying ? "Pause story mode" : "Play story mode"}
                >
                  {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isAutoPlaying ? "Pause story mode" : "Play story mode"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center bg-white rounded-full shadow-sm border border-[#5E366D]/10 p-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handlePrevYear}
                    disabled={activeYearIndex === 0}
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 text-[#5E366D] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5E366D]/5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="sr-only">Previous Year</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous year</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="px-3 font-bold text-lg text-[#5E366D] flex items-center gap-2">
              <motion.span
                key={milestones[activeYearIndex].year}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-w-12 text-center"
              >
                {milestones[activeYearIndex].year}
              </motion.span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleNextYear}
                    disabled={activeYearIndex === milestones.length - 1}
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 text-[#5E366D] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5E366D]/5 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span className="sr-only">Next Year</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Next year</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main content area - Achievements */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`year-${activeYearIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col"
            >
              {/* Year title */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-[#5E366D]">
                  {milestones[activeYearIndex].year}{" "}
                  <span className="text-lg font-normal text-[#5E366D]/70">Milestones</span>
                </h3>
              </div>

              {/* Achievements grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-4 achievements-container">
                {milestones[activeYearIndex].achievements.map((achievement, index) => (
                  <motion.div
                    key={`${milestones[activeYearIndex].year}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-[#5E366D]/10 group cursor-pointer h-full",
                      selectedAchievement === index ? "ring-2 ring-[#5E366D] ring-offset-2" : "",
                    )}
                    onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
                  >
                    <div className="flex h-full">
                      {/* Achievement image (if available) */}
                      {achievement.image && (
                        <div className="relative w-1/3 overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${achievement.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      )}

                      {/* Achievement content */}
                      <div className={cn("p-4 flex flex-col", achievement.image ? "w-2/3" : "w-full")}>
                        <div
                          className={cn(
                            "p-2 rounded-lg w-fit mb-2 transition-all duration-300 group-hover:scale-110",
                            achievement.color,
                          )}
                        >
                          {achievement.icon}
                        </div>
                        <h4 className="text-base font-bold text-[#5E366D] mb-1">{achievement.title}</h4>

                        <motion.div
                          initial={{ height: selectedAchievement === index ? "auto" : "40px", overflow: "hidden" }}
                          animate={{ height: selectedAchievement === index ? "auto" : "40px", overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                          className="text-sm"
                        >
                          {achievement.description && <p className="text-[#5E366D]/70">{achievement.description}</p>}
                        </motion.div>

                        {achievement.description && achievement.description.length > 60 && (
                          <button
                            className="mt-auto text-xs font-medium text-[#5E366D] hover:text-[#5E366D]/80 transition-colors flex items-center self-end"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedAchievement(selectedAchievement === index ? null : index)
                            }}
                          >
                            {selectedAchievement === index ? "Read less" : "Read more"}
                            <ChevronDown
                              className={cn(
                                "ml-1 w-3 h-3 transition-transform",
                                selectedAchievement === index ? "rotate-180" : "",
                              )}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Future vision for 2025 */}
              {activeYearIndex === milestones.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-4 p-4 bg-gradient-to-r from-[#5E366D] to-[#F39200] rounded-xl text-white text-center relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2">Our Vision for the Future</h3>
                    <p className="max-w-3xl mx-auto text-sm">
                      Our new global headquarters represents the next chapter in our journey, setting the stage for even
                      greater achievements to come.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll instruction */}
        <div className="text-center text-xs text-[#5E366D]/60 py-2">
          <p>Use mouse wheel or arrow keys to navigate through years</p>
        </div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .achievements-container::-webkit-scrollbar {
          width: 6px;
        }
        .achievements-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .achievements-container::-webkit-scrollbar-thumb {
          background: #5E366D20;
          border-radius: 10px;
        }
        .achievements-container::-webkit-scrollbar-thumb:hover {
          background: #5E366D40;
        }
      `}</style>
    </section>
  )
}
