"use client"
 
import Image from "next/image"
import { Eye, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBanner } from "@/components/page-banner"

// Enhanced preloading with priority management
const preloadImages = () => {
  const criticalImages = [
    { url: 'https://cdn.legendholding.com/images/cdn_6862a6e1eef048.35976175_20250630_150153.jpg', priority: 'high' },
    { url: 'https://cdn.legendholding.com/images/cdn_6862aedc3ac7d3.80278555_20250630_153556.png', priority: 'high' },
    { url: 'https://cdn.legendholding.com/images/cdn_686295fca18de1.20003521_20250630_134948.png', priority: 'medium' }
  ]
  
  // Preload critical images immediately
  criticalImages.forEach(({ url, priority }) => {
    if (priority === 'high') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      link.fetchPriority = 'high'
      document.head.appendChild(link)
    }
  })
}

// Image optimization helper
const optimizeImageUrl = (url: string, width: number, quality: number = 85) => {
  try {
    const urlObj = new URL(url)
    urlObj.searchParams.set('w', width.toString())
    urlObj.searchParams.set('q', quality.toString())
    urlObj.searchParams.set('f', 'auto')
    urlObj.searchParams.set('fit', 'cover')
    return urlObj.toString()
  } catch {
    return url
  }
}

// Connection speed detection for adaptive loading
const detectConnectionSpeed = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection) {
      const { effectiveType, downlink } = connection
      if (effectiveType === '4g' && downlink > 10) return 'fast'
      if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 1.5)) return 'medium'
      return 'slow'
    }
  }
  return 'medium'
}
 
// Counter Animation Component
type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  startDelay?: number;
  formatNumber?: boolean;
  id?: string;
};
function AnimatedCounter({ target, suffix = "", prefix = "", duration = 2000, startDelay = 0, formatNumber = false, id }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [uniqueId] = useState(() => id || `counter-${target}-${Date.now()}`)
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
 
          setTimeout(() => {
            const startTime = Date.now()
            const startValue = 0
            const endValue = target
 
            const animate = () => {
              const now = Date.now()
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
 
              // Easing function for smooth deceleration
              const easeOut = 1 - Math.pow(1 - progress, 3)
              const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut)
 
              setCount(currentValue)
 
              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }
 
            animate()
          }, startDelay)
        }
      },
      { threshold: 0.3 },
    )
 
    const element = document.getElementById(uniqueId)
    if (element) observer.observe(element)
 
    return () => observer.disconnect()
  }, [target, duration, startDelay, isVisible, uniqueId])
 
  const formatDisplayValue = (value: number) => {
    if (formatNumber && value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'
    }
    return value.toString()
  }
 
  return (
    <span
      id={uniqueId}
      className="inline-block tabular-nums"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.6s ease-out",
      }}
    >
      {prefix}{formatDisplayValue(count)}{suffix}
    </span>
  )
}
 
export default function AboutUsPage() {
  const [scrollY, setScrollY] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Add shimmer animation styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
      
      /* Ensure no blue background on images */
      img {
        background-color: transparent !important;
      }
      
      /* Remove any default image borders or backgrounds */
      .vision-image img,
      .vision-image {
        background: transparent !important;
        border: none !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
 
  // Animated counters
  const [yearsCount, setYearsCount] = useState(0)
  const [clientsCount, setClientsCount] = useState(0)
  const yearsTarget = (() => {
    const baseYear = 2008
    const now = new Date()
    let years = now.getFullYear() - baseYear
    if (now.getMonth() >= 0) years += 1
    return years
  })()
  const clientsTarget = 10000

  // Get optimal image dimensions based on connection speed
  const getImageDimensions = (baseWidth: number, baseHeight: number) => {
    if (connectionSpeed === 'slow') {
      return { width: Math.floor(baseWidth * 0.8), height: Math.floor(baseHeight * 0.8) }
    } else if (connectionSpeed === 'medium') {
      return { width: Math.floor(baseWidth * 0.9), height: Math.floor(baseHeight * 0.9) }
    }
    return { width: baseWidth, height: baseHeight }
  }

  // Enhanced intersection observer for lazy loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.getAttribute('data-section')
              if (sectionId) {
                setVisibleSections(prev => new Set([...prev, sectionId]))
              }
            }
          })
        },
        { 
          rootMargin: '100px',
          threshold: 0.1
        }
      )

      // Observe all sections
      const sections = document.querySelectorAll('[data-section]')
      sections.forEach(section => {
        if (observerRef.current) {
          observerRef.current.observe(section)
        }
      })
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])
 
  useEffect(() => {
    let yearsFrame: number, clientsFrame: number
    // Animate years
    if (yearsCount < yearsTarget) {
      yearsFrame = window.setTimeout(() => setYearsCount(yearsCount + 1), 40)
    }
    // Animate clients
    if (clientsCount < clientsTarget) {
      clientsFrame = window.setTimeout(() => setClientsCount(clientsCount + Math.ceil(clientsTarget / 100)), 10)
    }
    return () => {
      clearTimeout(yearsFrame)
      clearTimeout(clientsFrame)
    }
  }, [yearsCount, clientsCount, yearsTarget, clientsTarget])
 
  // Calculate years of excellence dynamically
  const getYearsOfExcellence = () => {
    const baseYear = 2008
    const now = new Date()
    let years = now.getFullYear() - baseYear
    if (now.getMonth() >= 0) years += 1 // January is month 0
    return years
  }
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    
    // Detect connection speed
    const speed = detectConnectionSpeed()
    setConnectionSpeed(speed)
    
    // Preload critical images with priority
    preloadImages()
    
    // Progressive image loading based on connection speed
    const loadDelay = speed === 'fast' ? 50 : speed === 'medium' ? 150 : 300
    const timer = setTimeout(() => setImagesLoaded(true), loadDelay)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])
 
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* About Us and Our Story Section */}
        <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-white">
          {/* Our Story Section */}
          <section className="w-full py-8 md:py-14 px-0 relative bg-[#5D376E] overflow-hidden" data-section="story">
            {/* Background Image with Next.js Image component */}
            <div className="absolute inset-0 z-0 flex justify-end items-end">
              <Image
                src={optimizeImageUrl(
                  "https://cdn.legendholding.com/images/cdn_6862a6e1eef048.35976175_20250630_150153.jpg",
                  getImageDimensions(1600, 1200).width,
                  90
                )}
                alt="Legend Holding Group background"
                width={getImageDimensions(1600, 1200).width}
                height={getImageDimensions(1600, 1200).height}
                priority
                className={`transition-all duration-700 ease-out ${
                  imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                style={{
                  maxWidth: '1600px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'right bottom'
                }}
                quality={90}
                onLoad={() => setImagesLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj"
              />
              {!imagesLoaded && (
                <div className="absolute inset-0 bg-[#5D376E] animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5D376E] via-[#6B4A7A] to-[#5D376E] animate-shimmer"></div>
                </div>
              )}
            </div>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-[#5D376E]/40 z-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
              {/* About Us Heading - Centered across full width */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-richmond">
                  About Us
                </h1>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative">
                {/* Our Story Content */}
                <div className="order-1 lg:order-1 z-10 relative">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#F3A13B] mb-8 font-richmond leading-tight">
                      Our Story
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-white font-effra leading-relaxed">
                      Legend Holding Group is a diversified enterprise headquartered in Dubai, operating across the Middle east and African region. With a strong focus on sustainability and innovation, the group manages a growing portfolio of companies in automotive, trading, energy, Travel and Tourism and mobility services.
                    </p>
                    <p className="text-lg md:text-xl text-white font-effra leading-relaxed">
                      Rooted in Loyalty, Excellence, and Progress, we lead with innovation and technology to seamlessly connect the physical and digital worlds.
                    </p>
                    <p className="text-lg md:text-xl text-white font-effra leading-relaxed">
                      Our goal is to become a leader in intelligent, data-driven solutions because Together We Grow.
                    </p>
                  </div>

                  {/* Story Pillars */}
                  <div className="grid grid-cols-3 gap-6 mt-8 max-w-md">
                    {[
                      { title: "Innovation", desc: "Technology-driven" },
                      { title: "Growth", desc: "Expanding horizons" },
                      { title: "Excellence", desc: "Quality focus" },
                    ].map((pillar, index) => (
                      <div key={index} className="text-center">
                        <div className="w-8 h-1 bg-[#F3A13B] mx-auto mb-2" />
                        <h4 className="text-sm font-semibold text-white mb-2 font-richmond">{pillar.title}</h4>
                        <div className="text-xs text-[#F3A13B] font-effra my-1">&</div>
                        <p className="text-xs text-[#F3A13B] font-effra">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Empty div for grid layout balance */}
                <div className="order-2 lg:order-2"></div>
              </div>
              
              {/* 2008 Founded Badge - Positioned in right corner */}
              <div className="absolute -bottom-6 md:-bottom-8 right-8 text-white font-richmond font-bold text-lg">
                <AnimatedCounter id="founded-counter" target={2008} prefix="" suffix=" Founded" duration={1500} startDelay={200} />
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="w-full py-12 md:py-20 px-0 bg-white relative" data-section="vision">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Vision Content */}
                <div className="order-1 lg:order-1">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#F08900] mb-8 font-richmond leading-tight">
                      Our Vision
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-gray-700 font-effra leading-relaxed">
                      To seamlessly connect the physical and digital worlds, revolutionizing supply chains with cutting-edge financial technology, and become the global leader in intelligent, data-driven solutions that empower businesses to thrive through efficiency, transparency, and sustainable growth.
                    </p>
                  </div>

                  {/* Vision Pillars */}
                  <div className="grid grid-cols-3 gap-6 mt-6 max-w-md">
                    {[
                      { title: "Innovation", desc: "Cutting-edge technology" },
                      { title: "Global Impact", desc: "Worldwide transformation" },
                      { title: "Sustainability", desc: "Future-focused growth" },
                    ].map((pillar, index) => (
                      <div key={index} className="text-center">
                        <div className="w-8 h-1 bg-[#E67E22] mx-auto mb-2" />
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 font-richmond">{pillar.title}</h4>
                        <div className="text-xs text-[#F3A13B] font-effra my-1">&</div>
                        <p className="text-xs text-[#F3A13B] font-effra">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vision Card Image */}
                <div className="order-2 lg:order-2">
                  <div className="relative bg-transparent vision-image">
                    {/* Loading placeholder */}
                    {!visibleSections.has('vision') && (
                      <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading...</div>
                      </div>
                    )}
                    
                    <Image
                      src={optimizeImageUrl(
                        "https://cdn.legendholding.com/images/cdn_6862aedc3ac7d3.80278555_20250630_153556.png",
                        getImageDimensions(600, 400).width,
                        90
                      )}
                      alt="Vision illustration"
                      width={getImageDimensions(600, 400).width}
                      height={getImageDimensions(600, 400).height}
                      className={`w-full h-auto transition-all duration-700 ease-out ${
                        visibleSections.has('vision') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      quality={90}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                      style={{
                        backgroundColor: 'transparent'
                      }}
                    />
                    <div className="absolute -bottom-8 md:-bottom-14 right-6 text-black font-richmond font-bold text-lg z-10">
                      +<AnimatedCounter id="years-counter" target={18} prefix="" suffix=" Years of Excellence" duration={1200} startDelay={400} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section
            className="w-full relative overflow-hidden"
            style={{
              minHeight: '600px',
              background: '#E69736',
            }}
            data-section="mission"
          >
            {/* Purple diagonal overlay - Desktop */}
            <div
              className="absolute inset-0 z-0 hidden md:block"
              style={{
                background: '#5D376E',
                clipPath: 'polygon(100% 0px, 100% 100%, 50% 100%)',
              }}
            />
            {/* Purple diagonal overlay - Mobile */}
            <div
              className="absolute inset-0 z-0 block md:hidden"
              style={{
                background: '#5D376E',
                clipPath: 'polygon(100% 40%, 100% 100%, 0% 100%)',
              }}
            />
            <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px] px-4 md:px-6 lg:px-8 z-10">
              {/* Mission Content */}
              <div className="order-1 lg:order-1 py-16 lg:py-24 pr-0 lg:pr-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 font-richmond leading-tight text-left">
                  Our Mission
                </h2>
                <p className="text-base md:text-lg font-effra leading-relaxed mb-10 text-[#5D376E] text-left max-w-xl">
                  We are dedicated to fostering happiness and delivering value, focusing on building a sustainable future.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-6 max-w-md mx-0">
                  {[
                    { title: "Happiness", desc: "Excellence" },
                    { title: "Value", desc: "Impact" },
                    { title: "Future", desc: "Sustainable Future" },
                  ].map((pillar, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-1 bg-white mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-[#5D376E] font-richmond">{pillar.title}</h4>
                      <div className="text-xs text-white font-effra my-1">&</div>
                      <p className="text-xs text-white font-effra">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mascot Image and Stat */}
              <div className="order-2 lg:order-2 relative flex flex-col items-center justify-center h-full min-h-[500px]">
                <div className="flex-1 flex items-center justify-center w-full lg:ml-16 -mt-12 md:mt-0">
                  <Image
                    src="https://cdn.legendholding.com/images/cdn_68831dafb50c56.86321986_20250725_060119.png"
                    alt="Mascot"
                    width={400}
                    height={400}
                    className="object-contain drop-shadow-2xl bg-transparent"
                    priority
                    sizes="200px"
                    quality={85}
                  />
                </div>
                <div className="absolute bottom-6 right-6 text-white font-richmond font-bold text-lg">
                  +<AnimatedCounter id="clients-counter" target={1} prefix="" suffix="M Global Clients" duration={1000} startDelay={600} />
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16" data-section="values">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-richmond text-[#2C2341] mb-4">Our Core Values</h2>
                <p className="text-lg text-[#2C2341] font-effra max-w-2xl mx-auto">
                  Are the principles that guide every decision and action we take.
                </p>
              </div>
              {/* Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {[
                  {
                    icon: "/loyalty.svg",
                    title: "Loyalty",
                    desc: "Commitment to our stakeholders and partners, building lasting relationships based on trust and mutual respect.",
                  },
                  {
                    icon: "/excellence.svg",
                    title: "Excellence",
                    desc: "Striving for the highest standards in all we do, continuously improving and delivering exceptional results.",
                  },
                  {
                    icon: "/growth.svg",
                    title: "Growth",
                    desc: "Continuous improvement and sustainable development, fostering innovation and embracing new opportunities.",
                  },
                  {
                    icon: "/empathy.svg",
                    title: "Empathy",
                    desc: "Understanding and addressing the needs of others, creating solutions that truly make a difference.",
                  },
                  {
                    icon: "/nimble.svg",
                    title: "Nimble",
                    desc: "Agility and adaptability in a changing world, responding quickly to new challenges and opportunities.",
                  },
                  {
                    icon: "/diversity.svg",
                    title: "Diversity",
                    desc: "Embracing different perspectives and backgrounds, fostering an inclusive environment for innovation.",
                  },
                ].map((value, index) => (
                  <div
                    key={value.title}
                    className={`group bg-[#5D376E] rounded-xl p-6 flex flex-col items-center text-center min-h-40 max-w-lg mx-auto transition-all duration-500 ease-out transform ${
                      visibleSections.has('values') 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-95'
                    } hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#5D376E]/20 cursor-pointer hover:scale-[1.02]`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="text-white mb-2 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={value.icon}
                        alt={`${value.title} icon`}
                        width={48}
                        height={48}
                        className="w-12 h-12 mx-auto"
                        loading={index < 3 ? undefined : "lazy"}
                        priority={index < 3}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#F3A13B] font-richmond mb-2">{value.title}</h3>
                    <p className="text-white font-effra text-base leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}