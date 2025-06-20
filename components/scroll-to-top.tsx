"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasEnoughContent, setHasEnoughContent] = useState(false)
  const pathname = usePathname()

  // Routes where we don't want the scroll-to-top button
  const excludedRoutes = [
    '/our-brands',
    '/contact',
    '/cookie-policy',
    '/privacy-policy',
    '/sitemap'
  ]

  // Check if current path should be excluded
  const shouldExclude = excludedRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    const checkContentHeight = () => {
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      // Only show if document is at least 1.5x the viewport height
      setHasEnoughContent(documentHeight > viewportHeight * 1.5)
    }

    const handleScroll = () => {
      if (!hasEnoughContent) return
      
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrollProgress(Math.min(progress, 100))
      setIsVisible(scrollTop > 300) // Show after 300px scroll
    }

    // Check content height on mount and resize
    checkContentHeight()
    window.addEventListener("resize", checkContentHeight)
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("resize", checkContentHeight)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasEnoughContent])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Don't render if excluded route, not enough content, or not visible
  if (shouldExclude || !hasEnoughContent || !isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        className={cn(
          "group relative w-12 h-12 md:w-14 md:h-14 bg-[#5E366D] hover:bg-[#EE8900] text-white rounded-full",
          "shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center",
          "transform hover:scale-110 active:scale-95"
        )}
        aria-label="Scroll to top"
      >
        {/* Progress ring */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 56 56"
        >
          <circle
            cx="28"
            cy="28"
            r="26"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="28"
            cy="28"
            r="26"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
            className="transition-all duration-300 ease-out"
          />
        </svg>
        
        {/* Icon */}
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </div>
  )
} 