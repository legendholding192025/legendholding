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
  mobileImage?: string
  icon: React.ReactNode
  color: string
  achievements: string[]
}

const TIMELINE_HEIGHT = 70
const ITEM_WIDTH = 120

// Image optimization helper
const optimizeImageUrl = (url: string, width: number = 1200, quality: number = 80) => {
  // If using a CDN that supports image optimization, add parameters
  if (url.includes('cdn.legendholding.com')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}w=${width}&q=${quality}&f=auto`
  }
  return url
}

export function OurJourney() {
  const [activeYearIndex, setActiveYearIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium')
  const [loadingStats, setLoadingStats] = useState<{loaded: number, total: number, startTime: number}>({
    loaded: 0,
    total: 13,
    startTime: Date.now()
  })
  const timelineRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const preloadQueueRef = useRef<Set<number>>(new Set())

  const milestones: MilestoneType[] = [
    {
      year: 2008,
      title: "Oriental Wiseman General Trading",
      description:
        "Our journey began with the establishment of our first trading company, focusing on bringing quality products to the market with a vision for excellence.",
      image: "https://cdn.legendholding.com/images/cdn_685aacbc54a7d9.24632090_20250624_134844.jpg",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685cdcedd20183.31278729_20250626_053853.png",
      icon: <Building className="w-6 h-6" />,
      color: "#7c3aed",
      achievements: ["Company Foundation", "First Trading Operations", "Market Entry"],
    },
    {
      year: 2013,
      title: "Legend Motors - Trading",
      description:
        "Established our first automotive company in the free zone, marking our entry into the automotive industry with our first showroom.",
      image: "https://cdn.legendholding.com/images/cdn_685b8e2ac73e64.52341855_20250625_055034.jpg",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bd09a601877.95559645_20250625_103402.png",     
      icon: <Car className="w-6 h-6" />,
      color: "#6d28d9",
      achievements: ["Legend Motors FZCO", "Legend Motors Br-1 (268)", "Automotive Industry Entry"],
    },
    {
      year: 2014,
      title: "Legend Motors Expansion",
      description:
        "Expanded our automotive portfolio with multiple brands and opened our second showroom, offering customers a wider range of choices.",
      image: "https://cdn.legendholding.com/images/cdn_685bb478d9dfb1.61228518_20250625_083400.png",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bd07d88a3f2.38711314_20250625_103333.png",
      icon: <Car className="w-6 h-6" />,
      color: "#5b21b6",
      achievements: ["Legend Multi Motors", "Legend Motors Br-2 (116)", "Brand Portfolio Expansion"],
    },
    {
      year: 2016,
      title: "Regional Operations",
      description:
        "Established new regional operations at Jabal Al Barakha to better serve our growing customer base across different territories.",
      image: "https://cdn.legendholding.com/images/cdn_683e930040dfb1.08078741_20250603_061528.png",
      mobileImage: "https://cdn.legendholding.com/images/cdn_683e930040dfb1.08078741_20250603_061528.png",
      icon: <MapPin className="w-6 h-6" />,
      color: "#4c1d95",
      achievements: ["Jabal Al Barakha Operations", "Regional Expansion", "Territory Coverage"],
    },
    {
      year: 2017,
      title: "Premium Automotive Division",
      description:
        "Launched our premium automotive divisions, catering to luxury vehicle enthusiasts and automatic transmission specialists.",
      image: "https://cdn.legendholding.com/images/cdn_685a584abd43c0.45778242_20250624_074826.png",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bdd7b0f68d7.83166278_20250625_112859.png",
      icon: <Car className="w-6 h-6" />,
      color: "#7c3aed",
      achievements: ["Highline Motors Trading", "Automatic Motors", "Premium Market Entry"],
    },
    {
      year: 2018,
      title: "Energy Sector Venture",
      description:
        "Ventured into the energy sector with Zul Energy, bringing innovative solutions and diversifying our business portfolio beyond automotive.",
      image: "https://cdn.legendholding.com/images/cdn_685bdf3fef4343.48662704_20250625_113631.jpg",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bddf0ecd919.71490952_20250625_113056.png",
      icon: <Zap className="w-6 h-6" />,
      color: "#6d28d9",
      achievements: ["Zul Energy Launch", "Energy Sector Entry", "Business Diversification"],
    },
    {
      year: 2019,
      title: "Global Investment & Tourism",
      description:
        "Established our global investment division and expanded into tourism, exploring new opportunities and markets worldwide.",
      image: "https://cdn.legendholding.com/images/cdn_685a585a7222f7.74278267_20250624_074842.png",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bd0ac44fe97.91187563_20250625_103420.png",
      icon: <Globe className="w-6 h-6" />,
      color: "#5b21b6",
      achievements: ["Legend World Investment", "Legend Travel & Tourism", "Global Market Expansion"],
    },
    {
      year: 2020,
      title: "Continued Growth",
      description:
        "Opened our third showroom despite global challenges, demonstrating our resilience and commitment to growth.",
      image: "https://cdn.legendholding.com/images/cdn_685a581a34d806.40648321_20250624_074738.png",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bd05523e603.37366964_20250625_103253.png",
      icon: <Building className="w-6 h-6" />,
      color: "#4c1d95",
      achievements: ["Legend Motors Br-3 (26)", "Pandemic Resilience", "Continued Expansion"],
    },
    {
      year: 2021,
      title: "New Industry Entrance",
      description:
        "Expanded with our fourth showroom and comprehensive automotive services, including rental and maintenance solutions.",
      image: "https://cdn.legendholding.com/images/cdn_685be224c2d3f5.36384524_20250625_114852.jpg",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bde30a274a6.62469051_20250625_113200.png",
      icon: <Car className="w-6 h-6" />,
      color: "#7c3aed",
      achievements: ["Legend Motors Br-4 (46)", "Rent A Car Services", "Automobile Services"],
    },
    {
      year: 2022,
      title: "Legend Motors - Dealerships",
      description:
        "Secured multiple prestigious dealerships including Skywell, Kaiyi, Lifan, and Li Auto, embracing the future of sustainable transportation.",
      image: "https://cdn.legendholding.com/images/cdn_685bdefcc4bd53.51860830_20250625_113524.png",
      mobileImage: "https://cdn.legendholding.com/images/cdn_685be1575c6cb7.08209278_20250625_114527.png",
      icon: <Award className="w-6 h-6" />,
      color: "#6d28d9",
      achievements: ["Skywell Dealership", "Kaiyi & 212 Dealership", "Lifan Dealership"],
    },
    {
      year: 2023,
      title: "Sustainability and Logistics",
      description:
        "Opened our fifth showroom in Jebel Ali and launched green energy solutions alongside comprehensive logistics services.",
      image: "https://cdn.legendholding.com/images/cdn_6846a1c8f3d8c5.57982348_20250609_085640.jpg",
      mobileImage: "https://cdn.legendholding.com/images/cdn_6846a1c8f3d8c5.57982348_20250609_085640.jpg",
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
      mobileImage: "https://cdn.legendholding.com/images/cdn_685bd01b410f75.10777679_20250625_103155.png",
      icon: <Building className="w-6 h-6" />,
      color: "#4c1d95",
      achievements: ["Global HQ Opening", "450,000 SQFT Facility", "JAFZA Operations Center"],
    },
  ]

  const setSectionRef = useCallback((el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el
  }, [])

  // Detect connection speed
  useEffect(() => {
    const detectConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          setConnectionSpeed('slow')
        } else if (connection.effectiveType === '3g') {
          setConnectionSpeed('medium')
        } else {
          setConnectionSpeed('fast')
        }
      }
    }
    
    detectConnectionSpeed()
  }, [])

  // Optimized image preloading with connection-aware loading
  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Optimized preloading strategy based on connection speed
    const preloadCriticalImages = () => {
      const isSlowConnection = connectionSpeed === 'slow'
      const preloadCount = isSlowConnection ? 1 : connectionSpeed === 'medium' ? 2 : 3
      
      // Only preload the most critical images
      const criticalImages = milestones.slice(0, preloadCount)
      
      criticalImages.forEach((milestone, index) => {
        const imageUrl = isMobile && milestone.mobileImage ? milestone.mobileImage : milestone.image
        const optimizedUrl = optimizeImageUrl(imageUrl, isMobile ? 800 : 1200, index === 0 ? 85 : 75)
        
        const img = new window.Image()
        img.onload = () => {
          setImagesLoaded(prev => new Set(prev).add(index))
          setLoadingStats(prev => ({ ...prev, loaded: prev.loaded + 1 }))
        }
        img.onerror = () => {
          // Fallback to original URL if optimization fails
          const fallbackImg = new window.Image()
          fallbackImg.onload = () => {
            setImagesLoaded(prev => new Set(prev).add(index))
            setLoadingStats(prev => ({ ...prev, loaded: prev.loaded + 1 }))
          }
          fallbackImg.src = imageUrl
        }
        img.src = optimizedUrl
      })
    }
    
    // Add optimized preload links
    const addOptimizedPreloadLinks = () => {
      const isSlowConnection = connectionSpeed === 'slow'
      const preloadCount = isSlowConnection ? 1 : connectionSpeed === 'medium' ? 2 : 3
      
      const criticalImages = milestones.slice(0, preloadCount)
      
      criticalImages.forEach((milestone, index) => {
        const imageUrl = isMobile && milestone.mobileImage ? milestone.mobileImage : milestone.image
        const optimizedUrl = optimizeImageUrl(imageUrl, isMobile ? 800 : 1200, index === 0 ? 85 : 75)
        
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = optimizedUrl
        link.setAttribute('importance', index === 0 ? 'high' : 'low')
        document.head.appendChild(link)
      })
    }
    
    preloadCriticalImages()
    addOptimizedPreloadLinks()
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [connectionSpeed, isMobile])

  // Optimized intersection observer with better performance
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '100px', // Increased margin for earlier loading
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (!imagesLoaded.has(index) && !preloadQueueRef.current.has(index)) {
            preloadQueueRef.current.add(index)
            
            // Queue the image loading to avoid overwhelming the network
            setTimeout(() => {
              const milestone = milestones[index]
              const imageUrl = isMobile && milestone.mobileImage ? milestone.mobileImage : milestone.image
              const optimizedUrl = optimizeImageUrl(imageUrl, isMobile ? 800 : 1200, 70)
              
              const img = new window.Image()
              img.onload = () => {
                setImagesLoaded(prev => new Set(prev).add(index))
                setLoadingStats(prev => ({ ...prev, loaded: prev.loaded + 1 }))
                preloadQueueRef.current.delete(index)
              }
              img.onerror = () => {
                // Fallback to original URL
                const fallbackImg = new window.Image()
                fallbackImg.onload = () => {
                  setImagesLoaded(prev => new Set(prev).add(index))
                  setLoadingStats(prev => ({ ...prev, loaded: prev.loaded + 1 }))
                  preloadQueueRef.current.delete(index)
                }
                fallbackImg.src = imageUrl
              }
              img.src = optimizedUrl
            }, index * 200) // Stagger loading to avoid network congestion
          }
        }
      })
    }, observerOptions)

    // Observe sections with better performance
    sectionsRef.current.forEach((section, index) => {
      if (section && index >= (connectionSpeed === 'slow' ? 1 : connectionSpeed === 'medium' ? 2 : 3)) {
        section.setAttribute('data-index', index.toString())
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [imagesLoaded, milestones, connectionSpeed, isMobile])

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index))
    setLoadingStats(prev => ({ ...prev, loaded: prev.loaded + 1 }))
  }, [])

  // Override header scroll behavior for this page
  useEffect(() => {
    let lastScrollY = 0;
    
    const handleHeaderScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isAtTop = currentScrollY <= 100;
      
      const header = document.querySelector('header');
      if (header) {
        if (isAtTop) {
          // Show header when at the top
          header.classList.remove('-translate-y-full');
          header.style.transform = 'translateY(0) !important';
          header.style.visibility = 'visible';
          header.style.opacity = '1';
        } else if (isScrollingUp) {
          // Show header when scrolling up
          header.classList.remove('-translate-y-full');
          header.style.transform = 'translateY(0) !important';
          header.style.visibility = 'visible';
          header.style.opacity = '1';
        } else {
          // Hide header when scrolling down
          header.classList.add('-translate-y-full');
          header.style.transform = 'translateY(-100%) !important';
          header.style.visibility = 'hidden';
          header.style.opacity = '0';
        }
      }
      
      lastScrollY = currentScrollY;
    };

    // Run immediately and on scroll
    handleHeaderScroll();
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleHeaderScroll);
      // Restore header visibility when leaving the page
      const header = document.querySelector('header');
      if (header) {
        header.style.transform = '';
        header.style.visibility = '';
        header.style.opacity = '';
      }
    };
  }, []);

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

  // Optimized scroll detection with throttling and direction detection
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking && !isScrolling) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const isUp = scrollY < lastScrollY
          const isAtTop = scrollY <= 100
          
          // Update scroll direction
          setIsScrollingUp(isUp)
          setLastScrollY(scrollY)
          
          // Show timeline when scrolling up or when past 100px, hide when at top
          if (isAtTop) {
            setShowTimeline(false)
          } else if (isUp || scrollY > 100) {
            setShowTimeline(true)
          } else {
            setShowTimeline(false)
          }

          // Calculate scroll position for section detection
          const scrollPosition = scrollY + 100

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
  }, [activeYearIndex, isScrolling, lastScrollY, isScrollingUp])

  // Update timeline scroll position when active year changes
  useEffect(() => {
    if (showTimeline) {
      scrollToActiveYear(activeYearIndex)
    }
  }, [activeYearIndex, scrollToActiveYear, showTimeline])

  return (
    <>
      <Header />
      <style jsx global>{`
        /* Header behavior for this page */
        header {
          transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease !important;
        }
        /* Hide header when scrolling */
        header.-translate-y-full {
          transform: translateY(-100%) !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
      <div className="relative w-full overflow-x-hidden">
        {/* Enhanced Timeline Header - Only show when scrolling */}
        <motion.div
          className={`fixed shadow-lg backdrop-blur-sm z-50 left-0 right-0 timeline-bar ${
            showTimeline ? (isScrollingUp ? 'timeline-below-header' : 'timeline-at-top') : 'timeline-hidden'
          }`}
          style={{ 
            height: `${TIMELINE_HEIGHT}px`,
            backgroundColor: '#5E366D',
            top: showTimeline ? (isScrollingUp ? '60px' : '0px') : '-70px'
          }}
          initial={{ y: -TIMELINE_HEIGHT }}
          animate={{ y: showTimeline ? 0 : -TIMELINE_HEIGHT }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="h-full flex items-center timeline-content">
            <div
              ref={timelineRef}
              className="flex items-center overflow-x-auto scrollbar-hide w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex items-center space-x-4 md:space-x-6 mx-auto">
                {milestones.map((milestone, index) => (
                  <button
                    key={milestone.year}
                    onClick={() => {
                      setActiveYearIndex(index)
                      scrollToSection(index)
                    }}
                    className={cn(
                      "flex flex-col items-center min-w-[80px] md:min-w-[100px] transition-all duration-300 py-2 px-3 md:px-4 rounded-xl group",
                      index === activeYearIndex
                        ? "bg-white text-[#5E366D] scale-110 shadow-lg"
                        : "hover:bg-white/20 text-white hover:scale-105",
                    )}
                    aria-label={`Go to ${milestone.year} - ${milestone.title}`}
                  >
                    <span
                      className={cn(
                        "font-bold text-sm md:text-lg transition-all duration-300",
                        index === activeYearIndex ? "text-[#5E366D] text-base md:text-xl" : "text-white/95 group-hover:text-white",
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
        </motion.div>

        {/* Enhanced Sections */}
        <div className="w-full">
          {milestones.map((milestone, index) => (
            <section
              key={milestone.year}
              ref={(el) => setSectionRef(el as HTMLDivElement | null, index)}
              className="relative w-full h-[80vh] md:h-screen"
              style={{ 
                minHeight: '80vh'
              }}
              aria-label={`${milestone.year} - ${milestone.title}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={optimizeImageUrl(
                    isMobile && milestone.mobileImage ? milestone.mobileImage : milestone.image,
                    isMobile ? 800 : 1200,
                    index === 0 ? 85 : connectionSpeed === 'slow' ? 60 : 70
                  )}
                  alt={`${milestone.title} - ${milestone.year}`}
                  fill
                  className={cn(
                    "transition-opacity duration-500",
                    milestone.title === "Regional Operations" ? "object-contain" : "object-cover",
                    imagesLoaded.has(index) ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    transform: milestone.title === "Oriental Wiseman General Trading" ? "scale(1.1)" : "scale(1)",
                  }}
                  sizes="100vw"
                  priority={index === 0}
                  quality={index === 0 ? 85 : connectionSpeed === 'slow' ? 60 : 70}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onLoad={() => handleImageLoad(index)}
                  onError={() => {
                    // Fallback to original URL if optimized URL fails
                    const fallbackImg = new window.Image()
                    fallbackImg.onload = () => handleImageLoad(index)
                    fallbackImg.src = isMobile && milestone.mobileImage ? milestone.mobileImage : milestone.image
                  }}
                  loading={index === 0 ? "eager" : index < (connectionSpeed === 'slow' ? 1 : connectionSpeed === 'medium' ? 2 : 3) ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : index < 3 ? "auto" : "low"}
                />
                
                {/* Enhanced Loading placeholder */}
                {!imagesLoaded.has(index) && (
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse",
                    index === 0 && "bg-gradient-to-br from-[#5E366D]/20 to-[#F08900]/20"
                  )}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-[#F08900] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-[#5E366D] font-medium text-sm">
                          {index === 0 ? "Loading..." : `Loading ${milestone.year}...`}
                        </p>
                        {connectionSpeed === 'slow' && (
                          <p className="text-[#5E366D]/70 text-xs mt-1">Optimizing for slow connection...</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
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
                      {/* Title Section - Moved to top */}
                      <motion.div
                        className="mb-8 md:mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <div className="flex items-start justify-start gap-4 md:gap-6">
                          <motion.div
                            className="bg-[#F08900] p-3 md:p-4 rounded-2xl shadow-2xl flex-shrink-0 -mt-0.5 md:mt-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            {milestone.icon}
                          </motion.div>
                          <div className="text-left flex-1">
                            <motion.h1
                              className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight font-[var(--heading-font)]"
                            >
                              {milestone.title}
                            </motion.h1>
                            <Badge
                              variant="secondary"
                              className="text-base md:text-xl px-4 md:px-6 py-2 md:py-3 bg-[#F08900]/95 text-white hover:bg-[#F08900] shadow-lg border-0 font-[var(--body-font)] mt-2 md:mt-3"
                            >
                              {milestone.year}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>

                      {/* Enhanced Description and Achievements */}
                      <motion.div
                        className="space-y-4 md:space-y-6 max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <p className="text-base md:text-xl lg:text-2xl leading-relaxed text-gray-100 font-[var(--body-font)]">
                          {milestone.description}
                        </p>
                        
                        {/* Bullet Points Achievements Display */}
                        <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievement}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + achievementIndex * 0.1, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-3 text-base md:text-xl text-white/90 font-medium font-[var(--body-font)]"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#F08900] flex-shrink-0" />
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Scroll Down Indicator - Only show on first section */}
                {index === 0 && (
                  <motion.div 
                    className="absolute left-0 right-0 mx-auto w-fit cursor-pointer top-8 md:top-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    onClick={() => scrollToSection(1)}
                  >
                    <div className="flex flex-col items-center text-white gap-1">
                      <span className="text-sm md:text-lg font-medium tracking-wider">Scroll Down</span>
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#F08900]" />
                    </div>
                  </motion.div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
} 