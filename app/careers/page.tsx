"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBanner } from "@/components/page-banner"
import AtAGlance from "../components/careers/glance"
import GrowSection from "../components/grow-section"
import EmployeeTestimonials from "../components/careers/employee-testimonials"
import OpenRoles from "../components/careers/open-roles"
import CareerPaths from "../components/careers/CareerPaths"
import Image from "next/image"

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="pt-20 w-full overflow-x-hidden">
        <div className="w-full max-w-full">
          <PageBanner 
            title="Careers"
            imageUrl="https://cdn.legendholding.com/images/cdn_685aae9f8a74d0.60885969_20250624_135647.png"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 bg-white">
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-[#2B1C48]">At a Glance</h2>
            </div>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Image Section */}
              <div className="w-full">
                <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn.legendholding.com/images/cdn_684bcea2088a00.05884893_20250613_070922.jpeg"
                    alt="Legend Holdings Careers"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              </div>
              
              {/* Description Section */}
              <div className="flex items-center">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  We empower our people to lead with confidence and purpose. Working in multiple industries, We foster a strong culture of respect, and space for your ideas to thrive, you'll grow professionally and personally. We offer flexibility, wellness support, and real recognition, because our success starts with you.
                </p>
              </div>
            </div>
          </div>
          <AtAGlance />
          <GrowSection />
          <OpenRoles />
        </div>
      </main>
      <Footer />
    </>
  )
} 