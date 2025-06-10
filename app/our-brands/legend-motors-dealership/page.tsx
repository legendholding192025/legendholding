"use client"
 
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
 
const dealerships = [
  {
    name: "Skywell",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da0668d4af4.97651620_20250602_130022.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788882/logo_sisnn9.png",
    description:
      "Legend Motors is the exclusive distributor of Skywell vehicles in Dubai, offering comprehensive retail and fleet solutions across the emirate.",
    needsBackground: false,
    bgColor: "bg-transparent",
    website: "https://skywell-uae.com/",
  },
  {
    name: "Kaiyi",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da11c9c3534.33669103_20250602_130324.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788951/download_wmkc6s.png",
    description:
      "Legend Motors is the exclusive distributor of Kaiyi Automobiles in the UAE, proudly introducing this innovative Chinese SUV brand to the local market.",
    needsBackground: false,
    bgColor: "bg-transparent",
    website: "https://kaiyi.ae/",
  },
  {
    name: "Li Auto",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da13c415753.52591286_20250602_130356.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788883/logo-text-black-en.e6782a94_chlojl.svg",
    description:
      "Legend Motors serves as the official sales partner and authorized provider of after-sales service and maintenance for Li Auto vehicles across the UAE.",
    needsBackground: false,
    bgColor: "bg-transparent",
    website: "https://www.liautouae.com/",
  },
  {
    name: "212",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1530dd2f0.90644648_20250602_130419.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788882/logo212b_qk5xsj.png",
    description:
      "Legend Motors is the exclusive distributor for 212 vehicles in the UAE, managing both sales and after-sales service with a commitment to excellence.",
    needsBackground: false,
    bgColor: "bg-transparent",
    website: "https://212uae.com/",
  },
]
 
export default function LegendMotorsDealershipPage() {
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
                Legend Dealerships
              </h2>
              <div className="flex gap-2">
                <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
                <div className="h-1 w-8 bg-[#ee8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>
 
              <p className="mt-8 text-gray-700 text-lg max-w-3xl animation-delay-400 font-effra">
                Legend Motors represents premium automotive brands across the UAE, providing exceptional sales, service,
                and support for our valued customers. Explore our exclusive dealership portfolio below.
              </p>
            </section>
 
            {/* Dealership Sections */}
            <section className="w-full space-y-12 mb-16">
              {dealerships.map((dealership, idx) => (
                <div
                  key={dealership.name}
                  className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl animate-fade-in-up`}
                  style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image/Logo */}
                    <div className="md:w-2/5 relative group overflow-hidden">
                      <div className="aspect-[4/3] w-full bg-[#2b1c48]/5 relative overflow-hidden">
                        <img
                          src={dealership.image || "/placeholder.svg"}
                          alt={`${dealership.name} vehicle`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c48]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
 
                      {/* Logo overlay - standardized size with transparent background */}
                      <div
                        className={`absolute bottom-4 right-4 p-3 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${dealership.bgColor}`}
                        style={{
                          width: "140px",
                          height: "60px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={dealership.logo || "/placeholder.svg"}
                          alt={`${dealership.name} logo`}
                          className="max-h-10 max-w-full object-contain"
                        />
                      </div>
                    </div>
 
                    {/* Text Content */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
                      <h3 className="text-3xl font-richmond font-bold text-[#2b1c48] mb-4 group-hover:text-[#5d376e] transition-colors duration-300">
                        {dealership.name}
                      </h3>
                      <p className="text-lg font-effra text-gray-700 mb-6 leading-relaxed">{dealership.description}</p>
 
                      {/* CTA Button */}
                      <div className="mt-8 w-full">
                        {dealership.website ? (
                          <a
                            href={dealership.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 group inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg"
                          >
                            <span>Visit Website</span>
                            <ChevronRight
                              className={`w-5 h-5 transform transition-transform duration-300 ${
                                activeIndex === idx ? "translate-x-1" : ""
                              }`}
                            />
                          </a>
                        ) : (
                          <button
                            className="w-full py-4 group inline-flex items-center justify-center gap-2 text-white font-semibold bg-[#F08900] hover:bg-[#d67a00] transition-colors duration-300 cursor-pointer rounded-lg"
                            disabled
                          >
                            <span>Visit Website</span>
                            <ChevronRight
                              className={`w-5 h-5 transform transition-transform duration-300 ${
                                activeIndex === idx ? "translate-x-1" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
 
 