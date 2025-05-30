"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBanner } from "../components/careers/HeroBanner"
import AtAGlance from "../components/careers/glance"
import GrowSection from "../components/grow-section"
import EmployeeTestimonials from "../components/careers/employee-testimonials"
import OpenRoles from "../components/careers/open-roles"
import CareerPaths from "../components/careers/CareerPaths"

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <HeroBanner />
        <AtAGlance />
        <GrowSection />
        <OpenRoles />
      </main>
      <Footer />
    </>
  )
} 