"use client"

import Image from "next/image"

export default function ValueSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Top Left Background Image */}
      <div className="absolute top-0 left-0 w-96 h-[70%]">
        <Image
          src="https://res.cloudinary.com/dosxengut/image/upload/v1748416192/Asset_6_prtg5f.png"
          alt="Top left decoration"
          fill
          className="object-contain object-top"
          sizes="384px"
          priority
        />
      </div>

      {/* Bottom Right Background Image */}
      <div className="absolute bottom-0 right-0 w-96 h-[70%]">
        <Image
          src="https://res.cloudinary.com/dosxengut/image/upload/v1748416192/Asset_7_nyeomc.png"
          alt="Background decoration"
          fill
          className="object-contain object-bottom"
          sizes="384px"
          priority
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mt-24 mb-14">
          <h2 className="text-4xl font-bold text-[#F08900] mb-3 animate-fade-in">
            Our Foundation
          </h2>
          <div className="w-32 h-1 bg-[#2B1C48] mx-auto animate-slide-in" style={{ marginTop: '4px' }}></div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="grid grid-cols-2 gap-16 mb-20">
          {/* Vision Column */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Background shape image */}
            <img src="https://res.cloudinary.com/dosxengut/image/upload/v1748596917/image_2_m9a1pw.png" alt="" className="w-full h-auto opacity-90" />
            
            {/* Vision Icon */}
            <div className="absolute top-4 right-4 w-16 h-16">
              <Image
                src="https://res.cloudinary.com/dosxengut/image/upload/v1748416191/Asset_11_tftntp.png"
                alt="Vision icon"
                fill
                className="object-contain"
                sizes="64px"
                priority
                style={{ filter: 'brightness(0) saturate(100%) invert(53%) sepia(86%) saturate(1243%) hue-rotate(360deg) brightness(103%) contrast(102%)' }}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <div className="max-w-2xl pl-6 mt-16">
                <h3 className="text-3xl font-bold text-orange-500 mb-4">
                  <span className="border-b-2 border-[#2B1C48] pb-1">Our</span> Vision
                </h3>
                <p className="text-xl leading-normal" style={{ color: '#2B1C48' }}>
                  To seamlessly connect the physical and digital worlds, revolutionizing supply chains with cutting-edge financial technology, and become the global leader in intelligent, data-driven solutions that empower businesses to thrive through efficiency transparency, and sustainable growth.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Column */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Background shape image */}
            <img src="https://res.cloudinary.com/dosxengut/image/upload/v1748596917/image_2_m9a1pw.png" alt="" className="w-full h-auto opacity-90" />

            {/* Mission Icon */}
            <div className="absolute top-4 right-4 w-16 h-16">
              <Image
                src="https://res.cloudinary.com/dosxengut/image/upload/v1748416191/Asset_11_tftntp.png"
                alt="Mission icon"
                fill
                className="object-contain"
                sizes="64px"
                priority
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(19%) saturate(1954%) hue-rotate(246deg) brightness(92%) contrast(88%)' }}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-start p-10 pt-32">
              <div className="max-w-2xl pl-6 mt-8">
                <h3 className="text-3xl font-bold text-orange-500 mb-6">
                  <span className="border-b-2 border-[#2B1C48] pb-1">Our</span> Mission
                </h3>
                <p className="text-xl leading-normal" style={{ color: '#2B1C48' }}>
                  To foster happiness and deliver value, with a clear focus on building a sustainable future. Every step we take is guided by purpose, progress, and a commitment to doing things the right way every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section - Full Width */}
      <div className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="max-w-4xl">
              <h5 className="text-4xl font-semibold text-orange-500 mb-2">Chairman Message</h5>
              <h6 className="text-3xl font-medium text-gray-700 mb-8">Mr. Kai Zheng</h6>
              <div className="flex gap-6">
                <div className="w-1.5 bg-orange-500 rounded-full self-stretch"></div>
                <p className="text-2xl leading-relaxed" style={{ color: '#2B1C48' }}>
                Our Vision is to shape a future where innovation, sustainability, and human connection drive meaningful impact across industries. With a strong foundation of continuous growth, a talented global team, and deep roots in the UAE's progressive environment, we are building integrated ecosystems in mobility, energy, digital solutions, and cultural tourism. Together, we are not just expanding, we are leading the way toward a connected and collaborative future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles remain unchanged */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from { 
            width: 0;
          }
          to { 
            width: 4rem;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slideIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
