import Image from "next/image"
import React from "react"

export function AboutUsSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#fff" }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748417832/about-us_yzut9i.png"
          alt="About Us Background"
          fill
          className="object-cover object-center opacity-100"
          priority
        />
        {/* No overlay, pure image */}
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 md:py-32">
        {/* Heading */}
        <h2
          className="font-richmond text-4xl md:text-5xl font-bold text-[#EE8900] text-center mb-4"
          style={{ letterSpacing: "0.01em" }}
        >
          ABOUT US
        </h2>
        {/* Animated Underline */}
        <div className="mx-auto mb-8">
          <span className="block h-1 w-16 bg-[#EE8900] rounded-full animate-pulse" />
        </div>
        {/* Summary Sentence */}
        <p className="font-effra text-lg md:text-xl text-white text-center max-w-3xl mb-12">
          To be the leading diversified business group in the region, setting new standards of excellence and innovation while creating sustainable value for our stakeholders and communities.
        </p>
        {/* Illustration (centered, responsive) */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-2xl aspect-[2.5/1] md:aspect-[2.8/1]">
            <Image
              src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748418916/lumo_rlzjdt.png"
              alt="About Us Illustration"
              fill
              className="object-contain object-center select-none pointer-events-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
} 