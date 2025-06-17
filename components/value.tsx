"use client"

import Image from "next/image"

export default function ValueSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Top Left Background Image */}
      <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-[50%] sm:h-[60%] md:h-[70%]">
        <Image
          src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da96eaa2ac2.38253748_20250602_133854.png"
          alt="Top left decoration"
          fill
          className="object-contain object-top"
          sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          priority
        />
      </div>

      {/* Bottom Right Background Image */}
      <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-[50%] sm:h-[60%] md:h-[70%]">
        <Image
          src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da9a99cd6c6.97768081_20250602_133953.png"
          alt="Background decoration"
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          priority
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mt-16 sm:mt-20 md:mt-24 mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F08900] mb-2 sm:mb-3 animate-fade-in">
            Our Foundation
          </h2>
          <div className="w-24 sm:w-28 md:w-32 h-1 bg-[#2B1C48] mx-auto animate-slide-in" style={{ marginTop: '4px' }}></div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 md:gap-16 mb-16 sm:mb-20">
          {/* Vision Column */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <img src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da9c6ede476.24969316_20250602_134022.png" alt="" className="w-full h-auto opacity-90" />
            
            {/* Vision Icon */}
            <div className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
              <Image
                src="https://cdn.legendholding.com/images/cdn_683e960b1997b5.22165608_20250603_062827.png"
                alt="Vision icon"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                priority
                style={{ filter: 'brightness(0) saturate(100%) invert(53%) sepia(86%) saturate(1243%) hue-rotate(360deg) brightness(103%) contrast(102%)' }}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <div className="max-w-2xl pl-3 sm:pl-4 md:pl-6 mt-20 sm:mt-16 md:mt-24 pr-4 sm:pr-0">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-orange-500 mb-3 sm:mb-4">
                  <span className="border-b-2 border-[#2B1C48] pb-1">Our</span> Vision
                </h3>
                <p className="text-sm sm:text-lg md:text-xl leading-relaxed" style={{ color: '#2B1C48' }}>
                  To seamlessly connect the physical and digital worlds, revolutionizing supply chains with cutting-edge financial technology, and become the global leader in intelligent, data-driven solutions that empower businesses to thrive through efficiency transparency, and sustainable growth.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Column */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <img src="https://cdn.legendholding.com/images/cloudinary/cloudinary_683da9c6ede476.24969316_20250602_134022.png" alt="" className="w-full h-auto opacity-90" />
            
            {/* Mission Icon */}
            <div className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
              <Image
                src="https://cdn.legendholding.com/images/cdn_683e960b1997b5.22165608_20250603_062827.png"
                alt="Mission icon"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                priority
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(19%) saturate(1954%) hue-rotate(246deg) brightness(92%) contrast(88%)' }}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <div className="max-w-2xl pl-3 sm:pl-4 md:pl-6 mt-12 sm:mt-16 md:mt-20 pr-4 sm:pr-0">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-orange-500 mb-3 sm:mb-4">
                  <span className="border-b-2 border-[#2B1C48] pb-1">Our</span> Mission
                </h3>
                <p className="text-sm sm:text-lg md:text-xl leading-relaxed" style={{ color: '#2B1C48' }}>
                  To foster happiness and deliver value, with a clear focus on building a sustainable future. Every step we take is guided by purpose, progress, and a commitment to doing things the right way every time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Section - Full Width */}
        <div className="w-full bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="max-w-4xl">
                <h5 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-orange-500 mb-2 sm:mb-3">Chairman Message</h5>
                <h6 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4 sm:mb-6 md:mb-8">Mr. Kai Zheng</h6>
                <div className="flex gap-3 sm:gap-4 md:gap-6">
                  <div className="w-2 sm:w-3 bg-orange-500 rounded-full self-stretch"></div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed" style={{ color: '#2B1C48' }}>
                    Our Vision is to shape a future where innovation, sustainability, and human connection drive meaningful impact across industries. With a strong foundation of continuous growth, a talented global team, and deep roots in the UAE's progressive environment, we are building integrated ecosystems in mobility, energy, digital solutions, and cultural tourism. Together, we are not just expanding, we are leading the way toward a connected and collaborative future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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