"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  videoUrl: string
  posterUrl?: string
}

export function HeroSection({ videoUrl, posterUrl = "https://res.cloudinary.com/dosxengut/video/upload/v1746786385/LEGEND0416_1_x0nlfv.mp4" }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true)

    // Auto-play video on desktop (optional)
    const videoElement = document.getElementById("bg-video") as HTMLVideoElement
    if (videoElement && window.innerWidth > 768) {
      videoElement.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Autoplay prevented by browser")
      })
    }
  }, [])

  const handlePlayVideo = () => {
    const videoElement = document.getElementById("bg-video") as HTMLVideoElement
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play()
        setIsPlaying(true)
      } else {
        videoElement.pause()
        setIsPlaying(false)
      }
    }
  }

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
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Add WebM source for better browser compatibility */}
          <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Minimal Overlay for Video Controls */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Video Controls */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center justify-center">
        <button
          onClick={handlePlayVideo}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 
          transition-all duration-300 border border-white/20 group"
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
        >
          <Play className={cn("h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110", isPlaying && "opacity-0")} />
          <span
            className={cn("h-5 w-5 bg-white rounded-sm transition-transform duration-300 group-hover:scale-110", !isPlaying && "opacity-0")}
            style={{ position: "absolute" }}
          ></span>
        </button>
      </div>
    </section>
  )
}
