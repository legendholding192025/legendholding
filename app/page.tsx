import dynamic from "next/dynamic"
import { Metadata } from "next"
import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { generatePageMetadata } from '@/config/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Legend Holding Group | Investment Company | UAE',
  description: 'Legend Holding Group is a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa. Delivering excellence with every transaction.',
  keywords: 'dubai investment, investments in dubai, investment companies in dubai, investment in uae, investment funds, uae investors, asset management group, dubai group, company abu dhabi, group dubai, good investment in uae, abu dhabi investment authority, invest in dubai, uae company, travel agency dubai, uae tour packages, dubai city tour, abu dhabi city tour, desert safari dubai, dubai visa services, holiday packages from dubai, international tour packages, umrah package from dubai, airport transfers dubai, used cars in dubai, buy used car dubai, new cars dubai, cars for sale uae, car showroom dubai, affordable cars dubai, second hand cars uae, luxury cars dubai, car dealer in dubai, best car showroom dubai, motorcycles in uae, lifan bikes uae, sports bikes for sale dubai, commuter bikes uae, cheap motorcycles dubai, motorbike showroom uae, 125cc bikes uae, motorcycle dealer dubai, electric cars uae, ev cars dubai, chinese cars uae, kaiyi cars uae, skywell electric car uae, li auto uae, new suv uae, best electric suv uae, affordable electric cars uae, dealership dubai, solar panels uae, solar system installation uae, renewable energy solutions uae, solar inverter uae, solar company in dubai, green energy solutions uae, solar power system dubai, solar battery uae, robotics company uae, industrial robots uae, automation solutions dubai, robotics technology uae, ai automation uae, warehouse automation systems, robotic arms uae, robotic solutions dubai, chemical suppliers uae, industrial chemicals dubai, chemical trading company uae, lubricants supplier uae, solvents suppliers dubai, cleaning chemicals uae, bulk chemicals uae, chemical distributor dubai, car repair dubai, car service dubai, vehicle maintenance uae, car workshop near me dubai, car ac repair dubai, car electrical repair dubai, car engine repair dubai, car detailing dubai, commercial vehicles uae, light trucks uae, pickups for sale dubai, cargo vans uae, commercial fleet uae, commercial vehicle dealer dubai, heavy vehicles uae, van for sale uae, media company uae, digital marketing dubai, content creation dubai, video production uae, social media marketing dubai, corporate video production, branding agency dubai, maintenance company dubai, facility management uae, plumbing services dubai, electrical repair dubai, painting services dubai, ac maintenance dubai, home repair service uae, car rental dubai, rent a car uae, cheap car rental dubai, monthly car rental dubai, luxury car rental uae, suv rental dubai, long term car rental dubai, Legend Holding Group, Automotive, Energy, Technology, Travel, Business, Innovation, Sustainability, UAE, Middle East, UAE holding group driving sustainable growth in automotive, energy, tourism & mobility across the Middle East and Africa, building a better future in every industry',
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
