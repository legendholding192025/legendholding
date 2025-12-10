import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Holding Group | Investment Company | UAE',
  description: 'Legend Holding Group is a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa. Delivering excellence with every transaction.',
  keywords: 'dubai investment, investments in dubai, investment companies in dubai, investment in uae, investment funds, uae investors, asset management group, dubai group, company abu dhabi, group dubai, good investment in uae, abu dhabi investment authority, invest in dubai, uae company, Legend Holding Group, Automotive, Energy, Technology, Travel, Business, Innovation, Sustainability, UAE, Middle East, UAE holding group driving sustainable growth in automotive, energy, tourism & mobility across the Middle East and Africa, building a better future in every industry',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg',
});

// Defer heavy/below-the-fold sections
const AboutUsSection = dynamic(() => import("@/components/about-us-section").then(m => m.AboutUsSection), { ssr: true, loading: () => null })
const BusinessUnit = dynamic(() => import("@/components/business-unit"), { loading: () => null })
const ValueSection = dynamic(() => import("@/components/value"), { ssr: true, loading: () => null })
const GroupIndustries = dynamic(() => import("@/components/group-industries"), { loading: () => null })
const BrandStatsSection = dynamic(() => import("@/components/brand-stats-section").then(m => m.BrandStatsSection), { ssr: true, loading: () => null })
const OurPresenceSection = dynamic(() => import("@/components/our-presence-section").then(m => m.OurPresenceSection), { ssr: true, loading: () => null })
const CSRSection = dynamic(() => import("@/components/csr-section").then(m => m.CSRSection), { loading: () => null })
const PartnerSection = dynamic(() => import("@/components/partner-section").then(m => m.PartnerSection), { loading: () => null })
const Newsroom = dynamic(() => import("@/components/news-section").then(m => m.Newsroom), { loading: () => null })
const Newsletter = dynamic(() => import("@/components/newsletter"), { loading: () => null })

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
