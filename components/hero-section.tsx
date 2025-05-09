"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  videoUrl: string
  posterUrl?: string
}

export function HeroSection({ videoUrl, posterUrl = "https://res.cloudinary.com/dosxengut/video/upload/v1746786385/LEGEND0416_1_x0nlfv.mp4" }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true)

    // Auto-play video
    const videoElement = document.getElementById("bg-video") as HTMLVideoElement
    if (videoElement) {
      videoElement.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Autoplay prevented by browser")
      })
    }
  }, [])

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          id="bg-video"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          poster={posterUrl}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Add WebM source for better browser compatibility */}
          <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Minimal Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Content can be added here */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center justify-center">
      </div>
    </section>
  )
}
