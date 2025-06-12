"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Heart, Leaf, Users, BookOpen, Globe, Lightbulb, Check } from 'lucide-react';
import { PageBanner } from "@/components/page-banner"

const csrInitiatives = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Humanitarian Relief",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea1e520f8a0.56379725_20250603_071901.jpg",
    initiatives: [
      "Food Giveaways",
      "Cancer Support",
      "Preservation"
    ]
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Community Development",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea60e1179f3.75648194_20250603_073646.jpg",
    initiatives: [
      "Volunteering",
      "Ramadan Iftar Campaigns"
    ]
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Improving Lives",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea24ace9db9.23851636_20250603_072042.jpg",
    initiatives: [
      "Health & Wellness",
      "Work-life Balance"
    ]
  }
];
 
const impactAreas = [
  {
    title: "Education",
    description: "Supporting educational initiatives and providing opportunities for learning and development.",
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    title: "Environment",
    description: "Implementing sustainable practices and reducing our environmental impact.",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Innovation",
    description: "Fostering innovation in social responsibility and sustainable development.",
    icon: <Lightbulb className="w-6 h-6" />
  }
];
 
export default function CSRPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PageBanner 
          title="Corporate Social Responsibility"
          imageUrl="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
        />

        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>
 
          <div className="w-full max-w-7xl relative z-10">
 
            {/* Impact Areas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {impactAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4">
                      {area.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C2341]">{area.title}</h3>
                  </div>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>
 
            {/* CSR Initiatives */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {csrInitiatives.map((initiative, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={initiative.image}
                      alt={initiative.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-1.5 bg-[#2C2341] rounded-lg text-white">
                        {initiative.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#2C2341]">{initiative.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {initiative.initiatives.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#2C2341]" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}