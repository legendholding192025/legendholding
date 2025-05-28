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
          sizes="(max-width: 768px) 100vw, 384px"
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
          sizes="(max-width: 768px) 100vw, 384px"
          priority
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mt-4 mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F08900] mb-3 animate-fade-in">
            Mission <span className="text-[#F08900]">and</span> vision <span className="text-[#F08900]">and</span>{" "}
            values
          </h2>
          <div className="w-32 h-1 bg-[#F08900] mx-auto animate-slide-in" style={{ marginTop: '-8px' }}></div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          {/* Vision Column */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Background shape image */}
            <img src="https://res.cloudinary.com/dosxengut/image/upload/v1748416193/Asset_9_z8nunq.png" alt="" className="w-full h-auto opacity-90" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
              <div className="max-w-2xl">
                <h3 className="text-3xl font-bold text-orange-500 mb-2 pt-14">
                  <span className="border-b-2 border-orange-500 pb-1">Our</span> Vision
                </h3>
                <p className="text-2xl leading-relaxed mt-4" style={{ color: 'rgb(143, 32, 147)' }}>
                  To be the leading diversified business group in the region, setting new standards of excellence and
                  innovation while creating sustainable value for our stakeholders and communities.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Column */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Background shape image */}
            <img src="https://res.cloudinary.com/dosxengut/image/upload/v1748416192/Asset_8_tzvns5.png" alt="" className="w-full h-auto opacity-90" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
              <div className="max-w-2xl">
                <h3 className="text-3xl font-bold text-orange-500 mb-2 pt-14">
                  <span className="border-b-2 border-orange-500 pb-1">Our</span> Mission
                </h3>
                <p className="text-2xl leading-relaxed mt-4" style={{ color: 'rgb(143, 32, 147)' }}>
                  To deliver exceptional products and services through operational excellence, innovative solutions, and
                  sustainable practices while fostering growth, empowering our people, and contributing to society's
                  advancement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section - Full Width */}
      <div className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="w-4 h-1 bg-orange-500 mx-auto mb-8"></div>

            <div className="flex flex-col md:flex-row items-start justify-center gap-12">
              {/* Left side - Photo and Name */}
              <div className="flex-shrink-0">
                <div className="relative w-[250px] h-[330px] overflow-hidden shadow-xl border-8 border-white ring-1 ring-gray-200" style={{ 
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                  background: 'linear-gradient(to bottom right, #ffffff, #f8f8f8)'
                }}>
                  <Image
                    src="https://res.cloudinary.com/dosxengut/image/upload/v1748420220/image_1_oo10il.png"
                    alt="Mr. Kai Zheng - Chairman"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 250px"
                    priority
                  />
                </div>
              </div>

              {/* Right side - Title and Description */}
              <div className="max-w-2xl text-left">
                <h5 className="text-4xl font-semibold text-gray-700 mb-2">Chairman</h5>
                <h6 className="text-3xl font-medium text-orange-500 mb-8">Mr. Kai Zheng</h6>
                <div className="flex gap-6">
                  <div className="w-1.5 bg-orange-500 rounded-full self-stretch"></div>
                  <p className="text-2xl leading-relaxed text-left" style={{ color: 'rgb(143, 32, 147)' }}>
                    With a visionary mindset and years of experience in leadership, our director stands at the helm of
                    innovation and excellence. Known for strategic thinking, strong decision-making, and an unwavering
                    commitment to growth, they continue to inspire the team to reach new heights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Together We Grow Section - Full Width */}
      <div className="relative w-full h-[17vh] bg-purple-900">
        <Image
          src="https://res.cloudinary.com/dosxengut/image/upload/v1748416192/Asset_10_flsdgb.png"
          alt="Together we grow background"
          fill
          className="object-contain md:object-cover w-full"
          style={{ objectPosition: 'center center' }}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-purple-900/80 via-purple-900/40 to-transparent">
          <div className="max-w-6xl w-full mx-auto px-4">
            <div className="flex items-center gap-8">
              <div className="relative w-10 h-10">
                <Image
                  src="https://res.cloudinary.com/dosxengut/image/upload/v1748416191/Asset_11_tftntp.png"
                  alt="Together we grow icon"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#F08900]" style={{
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                Together we grow
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
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
