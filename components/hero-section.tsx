"use client"

import { useRef, useEffect } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5 // Increase speed by 50%
    }
  }, [])

  return (
    <section className="relative w-full h-[85vh] md:h-[100vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="https://cdn.legendholding.com/videos/video_cdn_685bb23504db43.66336453_20250625_082421.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" style={{ zIndex: 1 }}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
          <span className="text-orange-400 block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-10 lg:mb-14">Welcome to</span>
          <span className="text-white">Legend Holding Group</span>
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wider"
          style={{ color: '#FFFFFF' }}
        >
          Together We Grow
        </p>
      </div>
    </section>
  )
}
