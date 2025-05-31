"use client"

import { ArrowRight, Briefcase, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OpenRoles() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-end mb-20">
          {/* Content Side */}
          <div className="flex flex-col h-full">
            <div className="mb-8 mt-auto">
              <span className="text-[#EE8900] font-medium mb-2 block">Career Opportunities</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2B1C48] mb-6 leading-tight">Shape Your Future With Us</h2>
              <p className="text-lg text-gray-600">
                Join a team where innovation meets ambition. At Legend Holdings, we offer diverse opportunities across our portfolio of world-renowned brands, enabling you to make an impact while building an exceptional career.
              </p>
            </div>

            {/* Call to Action Cards */}
            <div className="mt-4">
              {/* Explore Open Roles */}
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#5D376E]/10 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-8">
                  <div className="flex items-center justify-center w-20 h-20 bg-[#5D376E]/10 rounded-2xl group-hover:bg-[#5D376E]/20 transition-colors duration-300 flex-shrink-0">
                    <Briefcase className="w-10 h-10 text-[#5D376E]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-[#2B1C48] mb-4">Explore open roles</h3>
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                      Discover exciting career opportunities across our diverse industries and find the perfect role to advance
                      your career.
                    </p>
                    <Link 
                      href="/careers/jobs" 
                      className="inline-flex items-center px-8 py-4 bg-[#EE8900] text-white font-medium rounded-xl 
                      hover:bg-[#EE8900]/90 transition-all duration-300 ease-in-out
                      hover:shadow-[0_0_20px_rgba(238,137,0,0.3)] 
                      active:transform active:scale-[0.98] group"
                    >
                      <span className="text-lg group-hover:translate-x-[2px] transition-transform duration-300">View Open Positions</span>
                      <ArrowRight className="ml-2 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Explore Our Brands */}
              {/* <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#5D376E]/10 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#5D376E]/10 rounded-2xl group-hover:bg-[#5D376E]/20 transition-colors duration-300 flex-shrink-0">
                    <Building2 className="w-8 h-8 text-[#5D376E]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#2B1C48] mb-3">Explore Our Brands</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Learn about our portfolio of world-renowned brands and discover which division aligns with your passion and
                      expertise.
                    </p>
                    <Link 
                      href="/brands" 
                      className="inline-flex items-center px-6 py-3 bg-[#5D376E] text-white font-medium rounded-xl 
                      hover:bg-[#5D376E]/90 transition-all duration-300 ease-in-out
                      hover:shadow-[0_0_20px_rgba(93,55,110,0.3)] 
                      active:transform active:scale-[0.98] group"
                    >
                      <span className="group-hover:translate-x-[2px] transition-transform duration-300">Discover Our Brands</span>
                      <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop"
              alt="Office workspace"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2B1C48]/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
