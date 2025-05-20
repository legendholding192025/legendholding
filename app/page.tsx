import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Newsroom } from "@/components/news-section"
import { CSRSection } from "@/components/csr-section"
import { BrandLogoCarousel } from "@/components/brand-logo-carousel"
import { BrandStatsSection } from "@/components/brand-stats-section"
import { Footer } from "@/components/footer"
import { PartnerSection } from "@/components/partner-section"
import { OurPresenceSection } from "@/components/our-presence-section"
import CompanyValuesInfographic from "@/components/value"
import LumoWrapper from "@/components/LumoWrapper"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection 
        videoUrl="https://res.cloudinary.com/dosxengut/video/upload/v1746786385/LEGEND0416_1_x0nlfv.mp4"
      />
      <CompanyValuesInfographic />
      <BrandLogoCarousel />
      <BrandStatsSection />
      <OurPresenceSection />
      <CSRSection />
      <PartnerSection />    
      <Newsroom />
      <Footer />
      <LumoWrapper />
    </main>
  )
}

      
