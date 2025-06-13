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
            imageUrl="https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 bg-white">
            {/* Header Section */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-12">
                <div className="hidden md:block md:col-span-1"></div>
                <div className="md:col-span-1 flex justify-start md:justify-end items-center">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#2B1C48] whitespace-nowrap">At a Glance</h2>
                </div>
                <div className="md:col-span-3 flex items-center">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    We empower our people to lead with confidence and purpose. Working in multiple industries, We foster a strong culture of respect, and space for your ideas to thrive, you'll grow professionally and personally. We offer flexibility, wellness support, and real recognition, because our success starts with you.
                  </p>
                </div>
              </div>
          </div>
          <div className="w-full relative h-[250px] md:h-[300px] lg:h-[350px]">
            <Image
              src="https://cdn.legendholding.com/images/cdn_684bcea2088a00.05884893_20250613_070922.jpeg"
              alt="Legend Holdings Careers"
              fill
              className="object-cover"
              priority
            />
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