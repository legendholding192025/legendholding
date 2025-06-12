"use client"
 
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
 
export default function PreOwnedVehiclesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden pt-20">
        <div className="relative z-10 flex flex-col items-center py-12 px-4">
          <div
            className={`w-full max-w-6xl transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Page Header */}
            <section className="w-full mb-16 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond animation-delay-200">
                Legend Pre-owned Vehicles
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>

              <p className="mt-8 text-gray-700 text-lg font-effra">
                Bringing together multiple Legend brands under one roof, offering customers a wide selection of high-quality certified pre-owned vehicles with comprehensive warranties and professional support services.
              </p>
            </section>

            {/* Main Content Section */}
            <section className="w-full space-y-12 mb-16">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl animate-fade-in-up">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-2/5 relative group overflow-hidden">
                    <div className="h-full w-full relative overflow-hidden">
                      <img
                        src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da26519e1d9.85792572_20250602_130853.jpg"
                        alt="Legend Pre-owned Vehicles"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 p-8 flex flex-col justify-center relative">
                    <h3 className="text-3xl font-richmond font-bold text-[#2b1c48] mb-4">
                      Certified Pre-owned Vehicles
                    </h3>
                    <p className="text-lg font-effra text-gray-700 mb-6 leading-relaxed">
                      Every vehicle in our certified pre-owned collection undergoes rigorous inspection and quality assurance processes, ensuring you receive only the finest automobiles with complete peace of mind. From luxury sedans to premium SUVs, our diverse inventory represents the best of automotive excellence.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg px-6 py-2"
                      >
                        <span>Visit Website</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            activeIndex === 0 ? "translate-x-1" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}