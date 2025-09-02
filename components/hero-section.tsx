"use client"

import { useRef, useEffect } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      
      // Set playback rate for slow motion
      video.playbackRate = 0.5
      
      // Simple autoplay function
      const startVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          // Silently handle autoplay failures - this is expected behavior in many browsers
          console.debug('Video autoplay prevented by browser policy')
          // Fallback: play on first user interaction
          const playOnInteraction = () => {
            video.play().catch(() => {
              // Silently handle play failures
              console.debug('Video play failed on user interaction')
            })
            document.removeEventListener('click', playOnInteraction)
            document.removeEventListener('touchstart', playOnInteraction)
          }
          document.addEventListener('click', playOnInteraction)
          document.addEventListener('touchstart', playOnInteraction)
        }
      }
      
      // Try to play immediately, then on load
      startVideo()
      
      // Also try when video is loaded
      video.addEventListener('loadedmetadata', startVideo, { once: true })
      video.addEventListener('canplay', startVideo, { once: true })
      
      // Handle video errors
      video.addEventListener('error', (e) => {
        console.debug('Video loading error:', e)
      })
      
      // Cleanup
      return () => {
        video.removeEventListener('loadedmetadata', startVideo)
        video.removeEventListener('canplay', startVideo)
      }
    }
  }, [])

  return (
    <section className="relative w-full h-[90vh] md:h-[100vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="none"
        poster="https://cdn.legendholding.com/images/hero-poster.png"
        className="absolute inset-0 w-full h-full object-cover mt-6 md:mt-28"
        style={{ zIndex: 0 }}
      >
        <source src="https://cdn.legendholding.com/videos/video_cdn_6864e391983559.20054383_20250702_074521.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 md:bg-opacity-30" style={{ zIndex: 1 }}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 md:px-4 flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <span className="text-orange-400 block text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-medium">Welcome to</span>
          <span className="text-white drop-shadow-lg">Legend Holding Group</span>
        </h1>
        <p
          className="text-lg sm:text-xl md:text-xl lg:text-2xl font-medium tracking-wide md:tracking-wider px-4 sm:px-0"
          style={{ color: '#FFFFFF' }}
        >
          Together We Grow
        </p>
      </div>
    </section>
  )
}
