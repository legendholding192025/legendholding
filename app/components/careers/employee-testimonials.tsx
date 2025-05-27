"use client"

import Image from "next/image"
import { useState } from "react"
import { X, Quote, MapPin, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Employee {
  id: number
  name: string
  position: string
  department: string
  location: string
  image: string
  testimonial: string
  yearsAtCompany: number
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Sarah Al-Rashid",
    position: "Senior Project Manager",
    department: "Real Estate",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
    testimonial:
      "Legend Holdings has given me the platform to lead transformative real estate projects that shape Dubai's skyline. The company's commitment to innovation and sustainable development makes every day exciting and meaningful.",
    yearsAtCompany: 5,
  },
  {
    id: 2,
    name: "Mohammed Al-Hashimi",
    position: "Operations Director",
    department: "Automotive",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
    testimonial:
      "Being part of Legend's automotive division has been incredible. We represent some of the world's most prestigious brands, and the company's focus on excellence and customer satisfaction drives us to set new industry standards.",
    yearsAtCompany: 7,
  },
  {
    id: 3,
    name: "Lisa Chen",
    position: "Head of Innovation",
    department: "Technology",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop",
    testimonial:
      "At Legend Holdings, we're not just keeping pace with technology - we're driving innovation across all our sectors. The company's investment in digital transformation and emerging technologies creates endless opportunities for growth.",
    yearsAtCompany: 4,
  },
  {
    id: 4,
    name: "Amir Patel",
    position: "General Manager",
    department: "Energy Solutions",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1470&auto=format&fit=crop",
    testimonial:
      "Legend's commitment to sustainable energy solutions is inspiring. We're not just building a business; we're contributing to a greener future. The company's vision aligns perfectly with global sustainability goals.",
    yearsAtCompany: 6,
  },
  {
    id: 5,
    name: "Fatima Al-Qasimi",
    position: "Chief Financial Analyst",
    department: "Finance",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=764&auto=format&fit=crop",
    testimonial:
      "Legend Holdings provides a dynamic environment where financial expertise meets strategic growth. The diverse portfolio of businesses offers unique challenges and learning opportunities that have accelerated my professional development.",
    yearsAtCompany: 4,
  },
  {
    id: 6,
    name: "David Anderson",
    position: "Retail Director",
    department: "Trading",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop",
    testimonial:
      "Leading retail operations at Legend has been rewarding. Our global partnerships and commitment to excellence create an environment where innovation thrives and customer experience is paramount.",
    yearsAtCompany: 5,
  },
  {
    id: 7,
    name: "Dr. Layla Hassan",
    position: "Medical Director",
    department: "Healthcare",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=687&auto=format&fit=crop",
    testimonial:
      "Legend's healthcare division is at the forefront of medical excellence in the UAE. The company's investment in advanced medical technology and focus on patient care allows us to deliver world-class healthcare services.",
    yearsAtCompany: 6,
  },
  {
    id: 8,
    name: "Raj Mehta",
    position: "Technical Director",
    department: "Facility Management",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop",
    testimonial:
      "Legend's approach to facility management combines innovation with sustainability. We're constantly implementing smart solutions that enhance operational efficiency while reducing environmental impact.",
    yearsAtCompany: 3,
  },
]

export default function EmployeeTestimonials() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const openTestimonial = (employee: Employee) => {
    setSelectedEmployee(employee)
  }

  const closeTestimonial = () => {
    setSelectedEmployee(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-white">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        <div>
          <span className="text-[#EE8900] font-medium mb-4 block">Our Team</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2B1C48]">Our People, Our Strength</h2>
        </div>
        <div className="space-y-6">
          <p className="text-xl text-gray-600">
            Meet the diverse talents who drive Legend Holdings' success across our various sectors. Each team member brings unique expertise and passion, contributing to our legacy of excellence in real estate, automotive, healthcare, and technology.
          </p>
          <div>
            <Link 
              href="/careers/jobs" 
              className="inline-flex items-center px-6 py-3 bg-[#EE8900] text-white font-medium rounded-xl 
              hover:bg-[#EE8900]/90 transition-all duration-300 ease-in-out
              hover:shadow-[0_0_20px_rgba(238,137,0,0.3)] 
              active:transform active:scale-[0.98] group"
            >
              <span className="group-hover:translate-x-[2px] transition-transform duration-300">View Open Positions</span>
              <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            onClick={() => openTestimonial(employee)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2B1C48]/5 to-[#EE8900]/5 p-1 rounded-2xl">
              <div className="aspect-square overflow-hidden rounded-xl">
                <Image
                  src={employee.image || "/placeholder.svg"}
                  alt={employee.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1C48]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-sm mb-1">{employee.name}</h3>
                  <p className="text-xs opacity-90">{employee.position}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Quote className="w-4 h-4 text-[#EE8900]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="relative p-8 pb-6">
              <button
                onClick={closeTestimonial}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex items-start space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 overflow-hidden bg-gradient-to-br from-[#2B1C48]/5 to-[#EE8900]/5 p-1 rounded-2xl">
                    <Image
                      src={selectedEmployee.image || "/placeholder.svg"}
                      alt={selectedEmployee.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2B1C48] mb-2">{selectedEmployee.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-sm">{selectedEmployee.position}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{selectedEmployee.location}</span>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-[#2B1C48]/10 text-[#2B1C48] text-sm font-medium">
                    {selectedEmployee.department}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8">
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#EE8900]/20" />
                <blockquote className="text-lg text-gray-700 leading-relaxed pl-6 italic">
                  "{selectedEmployee.testimonial}"
                </blockquote>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  <span>{selectedEmployee.yearsAtCompany} years at Legend Holdings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
