import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { Newsroom } from "@/components/news-section"
import { CSRSection } from "@/components/csr-section"
import { BrandLogoCarousel } from "@/components/brand-logo-carousel"
import { BrandStatsSection } from "@/components/brand-stats-section"
import { Footer } from "@/components/footer"
import { PartnerSection } from "@/components/partner-section"
import { OurPresenceSection } from "@/components/our-presence-section"
import Newsletter from "@/components/newsletter"
import ValueSection from "@/components/value"
import GroupIndustries from "@/components/group-industries"
import { AboutUsSection } from "@/components/about-us-section"
import BusinessUnit from "@/components/business-unit"
export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <div className="w-full h-1 bg-[#EE8900]" />
      <AboutUsSection />
      <ValueSection />
      <GroupIndustries />
      <BrandStatsSection />
      <BusinessUnit />
      <OurPresenceSection />
      <CSRSection />
      <PartnerSection />    
      <Newsroom />
      <Newsletter />
      <Footer />

    </main>
  )
}

      
