import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Newsroom } from "@/components/news-section"
import { CSRSection } from "@/components/csr-section"
import { BrandLogoCarousel } from "@/components/brand-logo-carousel"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection 
        videoUrl="https://res.cloudinary.com/dosxengut/video/upload/v1746786385/LEGEND0416_1_x0nlfv.mp4"
      />
      <BrandLogoCarousel />
      <CSRSection />
      <Newsroom />
      <Footer />
    </>
  )
}

      
