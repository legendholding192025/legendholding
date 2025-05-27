"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface CareerPath {
  id: string
  title: string
  image: string
  description: string
  helpContent: {
    title: string
    points: string[]
  }
}

const careerPaths: CareerPath[] = [
  {
    id: "students",
    title: "Students & Interns",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop",
    description: "Start your journey with real-world experience",
    helpContent: {
      title: "How We Support Students & Interns",
      points: [
        "Structured internship programs across all our businesses",
        "Mentorship from industry experts",
        "Hands-on experience with real projects",
        "Networking opportunities with professionals",
        "Potential for full-time conversion",
        "Competitive stipends and benefits"
      ]
    }
  },
  {
    id: "early-careers",
    title: "Early Careers",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1587&auto=format&fit=crop",
    description: "Build your foundation for success",
    helpContent: {
      title: "How We Support Early Career Professionals",
      points: [
        "Comprehensive onboarding and training programs",
        "Rotational opportunities across departments",
        "Leadership development programs",
        "Regular feedback and career guidance",
        "Clear growth and promotion paths",
        "Professional certification support"
      ]
    }
  },
  {
    id: "experienced",
    title: "Experienced Professionals",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1470&auto=format&fit=crop",
    description: "Take your expertise to the next level",
    helpContent: {
      title: "How We Support Experienced Professionals",
      points: [
        "Leadership roles across diverse industries",
        "Global project opportunities",
        "Advanced skill development programs",
        "Executive mentorship",
        "Industry-leading benefits",
        "Work-life balance initiatives"
      ]
    }
  }
]

export default function CareerPaths() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null)

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <span className="text-[#EE8900] font-medium mb-2 block">Growth & Development</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2B1C48] leading-tight">Empowering Excellence <br />at Every Step</h2>
          </div>
          <div>
            <p className="text-lg text-gray-600">
              Your career is a journey of continuous evolution. At Legend Holdings, we nurture talent across all stages - from fresh graduates to seasoned experts. Join us to unlock your potential in an environment where innovation meets opportunity, and every day brings new possibilities for growth.
            </p>
          </div>
        </div>

        {/* Career Paths Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {careerPaths.map((path) => (
            <div
              key={path.id}
              className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedPath(path)}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] relative">
                <Image
                  src={path.image}
                  alt={path.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1C48] via-[#2B1C48]/70 to-transparent opacity-80" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                <p className="text-white/90 mb-4">{path.description}</p>
                <button className="inline-flex items-center text-[#EE8900] font-medium group-hover:text-white transition-colors duration-300">
                  Learn how we help
                  <svg
                    className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dialog for showing help content */}
        <Dialog open={!!selectedPath} onOpenChange={() => setSelectedPath(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#2B1C48]">
                {selectedPath?.helpContent.title}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-4">
              <ul className="space-y-3">
                {selectedPath?.helpContent.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EE8900] mt-2" />
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 