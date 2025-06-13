"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBanner } from "@/components/page-banner"
import AtAGlance from "../components/careers/glance"
import GrowSection from "../components/grow-section"
import EmployeeTestimonials from "../components/careers/employee-testimonials"
import OpenRoles from "../components/careers/open-roles"
import CareerPaths from "../components/careers/CareerPaths"

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
          <AtAGlance />
          <GrowSection />
          <OpenRoles />
        </div>
      </main>
      <Footer />
    </>
  )
} 