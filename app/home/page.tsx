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
import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Home',
  description: 'Legend Holding Group is a diversified UAE Holding group leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa, Delivering excellence with every transaction, Legend Holding Group | Together We Grow',
  keywords: 'Legend Holding Group, Automotive, Energy, Technology, Travel, Business, Innovation, Sustainability, UAE, Middle East, UAE holding group driving sustainable growth in automotive, energy, tourism & mobility across the Middle East and Africa, building a better future in every industry',
  imageUrl: 'https://cdn.legendholding.com/images/hero-poster.png',
});

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutUsSection />
      <BusinessUnit />
      <ValueSection />
      <GroupIndustries />
      <BrandStatsSection />
      <OurPresenceSection />
      <CSRSection />
      <PartnerSection />    
      <Newsroom />
      <Newsletter />
      <Footer />
    </main>
  )
} 