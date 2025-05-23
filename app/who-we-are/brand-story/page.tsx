"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
 
export default function BrandStory() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
          {/* Top Left Decorative Image - closer to heading */}
          <img
            src="https://res.cloudinary.com/dosxengut/image/upload/v1747740934/lumo-with-logo_c9fly3.png"
            alt="Decorative top left"
            className="hidden md:block absolute z-0 opacity-70"
            style={{ top: 48, left: 90, position: 'absolute', width: 140, height: 140, filter: 'contrast(1.2)' }}
          />
          {/* Top Right Decorative Image */}
          <img
            src="https://res.cloudinary.com/dosxengut/image/upload/v1747730468/Picture18_zo3eri.png"
            alt="Decorative top right"
            className="hidden md:block absolute top-0 right-0 m-8 z-0 opacity-70"
            style={{ width: 320, height: 320, filter: 'contrast(1.2)' }}
          />
          {/* Bottom Left Decorative Image */}
          <img
            src="https://res.cloudinary.com/dosxengut/image/upload/v1747730468/Picture18_zo3eri.png"
            alt="Decorative bottom left"
            className="hidden md:block absolute bottom-0 left-0 m-8 z-0 opacity-70"
            style={{ width: 180, height: 180, filter: 'contrast(1.2)' }}
          />
          <div className="w-full max-w-5xl relative z-10">
            <h1 className="text-6xl font-bold text-[#2C2341] mb-12 mt-8 font-serif">Our Brand Story</h1>
            <div className="bg-white rounded-lg p-0 md:p-0">
              <p className="text-lg text-[#2C2341] mb-6 font-sans">
                From humble beginnings to a commanding presence on the global stage, Since 2008 Legend Holding Group has been built on a foundation of vision, perseverance, and a commitment to excellence. Established with the ambition to redefine industries and drive economic growth, Legend Holding Group has emerged as a dynamic and diversified conglomerate spanning Automotive Trading & Dealerships, Energy Solutions, Travel & Tourism, Mobility & Services, Oil & Gas, and Global Media.
              </p>
              <p className="text-lg text-[#2C2341] mb-6 font-sans">
                Headquartered in Dubai, a global nexus of commerce and innovation, Legend Holding Group stands as a bridge between East and West, fostering strategic partnerships and pioneering opportunities that align with the UAE's economic vision. With operations extending across multiple continents, the Group has established itself as a trusted name in international trade, investment, and infrastructure development.
              </p>
              <p className="text-lg text-[#2C2341] mb-6 font-sans">
                At our core lies a relentless pursuit of progress. Whether leading the charge in automotive exports, contributing to the evolution of clean energy, or revolutionizing the mobility sector, the Group continues to set new benchmarks for quality and innovation. Its subsidiary companies operate with agility and foresight, ensuring that every venture is positioned for sustainable growth and long-term success.
              </p>
              <p className="text-lg text-[#2C2341] mb-6 font-sans">
                Our people define our legacy. With a diverse and talented workforce representing over 35 nationalities, we cultivate an ecosystem of collaboration, expertise, and ambition. Each member of the Legend family is driven by a shared purpose, to deliver excellence, create value, and shape the future of industries worldwide.
              </p>
              <p className="text-lg text-[#2C2341] mb-6 font-sans">
                As we look ahead, Legend Holding Group remains steadfast in its mission to drive transformative change, embracing new frontiers and strengthening global ties. More than a business empire, we are a force of progress; one that leaves an indelible mark on industries, economies, and communities.
              </p>
              <p className="text-lg text-[#2C2341] font-bold font-sans">
                Legend Holding Group <span className="font-normal">| Together We Grow.</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}