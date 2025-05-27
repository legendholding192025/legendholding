import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <div className="relative bg-[#5E366D] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Modern office workspace with team collaboration"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5E366D]/95 via-[#5E366D]/80 to-[#5E366D]/70" />
      </div>

      <div className="relative container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-4xl">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            Join Our Team
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Shape the Future<br />of Innovation
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            Join a team of passionate innovators and problem-solvers dedicated to pushing the boundaries of what's possible.
          </p>
          <Button
            onClick={() => {
              const jobsSection = document.getElementById('open-positions')
              jobsSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-white hover:bg-white/90 text-[#5E366D] px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg"
          >
            View Open Positions
          </Button>
        </div>
      </div>
    </div>
  )
} 