'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const countries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "China",
  "Germany",
  "Kuwait",
  "Bahrain",
  "Ethiopia",
  "Nigeria"
]

const continents = ["Asia", "Europe", "Africa"]

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function OurPresenceSection() {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Heading with lines */}
        <div className="flex items-center justify-center mb-6 md:mb-10">
          <div className="hidden md:block flex-1 h-0.5 bg-[#6C4896] mr-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EE8900] text-center font-richmond tracking-wide">
            Our Presence
          </h2>
          <div className="hidden md:block flex-1 h-0.5 bg-[#6C4896] ml-4" />
        </div>
        {/* Subheading in rounded box */}
        {/* <div className="flex justify-center mb-10">
          <div className="border-2 border-[#EE8900] rounded-full px-3 py-1 md:px-5 md:py-2 bg-white text-center inline-block">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-[#5E366D]">
              Spanning three continents, Asia, Europe, Africa we operate in key markets including:
            </p>
          </div>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left side - Map */}
          <motion.div 
            className="lg:col-span-7 relative h-[320px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Image
              src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748431906/Asset_13_rgva8a.png"
              alt="Global Presence Map"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 65vw"
              priority
            />
          </motion.div>
          {/* Right side - Country list */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start ml-0 md:ml-10 lg:ml-32">
            <motion.div 
              className="space-y-5 md:space-y-6 mt-2 md:mt-8 w-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {countries.map((country, idx) => (
                <motion.div
                  key={country}
                  variants={itemVariants}
                  custom={idx}
                  className="flex items-center gap-3 md:gap-4"
                >
                  <Image
                    src="https://res.cloudinary.com/dckrspiqe/image/upload/v1748439238/Asset_11_fzl19r.png"
                    alt="bullet"
                    width={18}
                    height={18}
                    className="min-w-[18px] min-h-[18px]"
                  />
                  <span className="text-[#4B4068] text-lg md:text-xl font-medium">{country}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 