import { OurJourney } from "@/components/our-journey"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function JourneyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <OurJourney />
      </main>
      <Footer />
    </>
  )
}
