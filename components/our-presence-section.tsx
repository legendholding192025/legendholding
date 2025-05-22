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
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative image */}
      <div className="absolute -bottom-10 -left-5 w-[250px] h-[250px] opacity-25 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/dosxengut/image/upload/v1747730468/Picture18_zo3eri.png"
          alt="Decorative background"
          fill
          className="object-contain scale-100"
          priority
          sizes="250px"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Title Section */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Our Presence
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left side - Text content */}
          <div className="lg:col-span-4 space-y-6 relative z-10">
            <motion.p 
              className="text-lg text-gray-600"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              spanning three continents, {continents.join(", ")} we operate in key markets including:
            </motion.p>
            <motion.div 
              className="space-y-4 mt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {countries.map((country) => (
                <motion.div
                  key={country}
                  variants={itemVariants}
                  className="flex items-center space-x-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  <span className="text-gray-700 text-lg">{country}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Image */}
          <motion.div 
            className="lg:col-span-8 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Image
              src="https://res.cloudinary.com/dosxengut/image/upload/v1747729868/Picture17_ffqrwc.png"
              alt="Global Presence Map"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 65vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 