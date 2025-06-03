"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Heart, Leaf, Users, BookOpen, Globe, Lightbulb } from 'lucide-react';
 
const csrInitiatives = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Community Development",
    description: "Supporting local communities through education, healthcare, and social welfare programs.",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea1e520f8a0.56379725_20250603_071901.jpg",
    initiatives: [
      "Educational Scholarships",
      "Healthcare Access Programs",
      "Community Infrastructure Development",
      "Social Welfare Support"
    ]
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Environmental Sustainability",
    description: "Committed to reducing our environmental footprint and promoting sustainable practices.",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea60e1179f3.75648194_20250603_073646.jpg",
    initiatives: [
      "Carbon Footprint Reduction",
      "Renewable Energy Adoption",
      "Waste Management Programs",
      "Green Building Initiatives"
    ]
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Employee Well-being",
    description: "Investing in our employees' growth, health, and professional development.",
    image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea24ace9db9.23851636_20250603_072042.jpg",
    initiatives: [
      "Professional Development Programs",
      "Health & Wellness Initiatives",
      "Work-Life Balance Support",
      "Employee Assistance Programs"
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
        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>
 
          <div className="w-full max-w-7xl relative z-10">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-[#2C2341] mb-6 font-serif">
                Corporate Social Responsibility
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At Legend Holding Group, we believe in creating lasting positive impact through our commitment to social responsibility. Our CSR initiatives reflect our dedication to sustainable development, community welfare, and environmental stewardship.
              </p>
            </div>
 
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
            <div className="space-y-16 mb-16">
              {csrInitiatives.map((initiative, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={initiative.image}
                        alt={initiative.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4">
                          {initiative.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-[#2C2341]">{initiative.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{initiative.description}</p>
                      <div className="space-y-3">
                        {initiative.initiatives.map((item, idx) => (
                          <div key={idx} className="flex items-center text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Commitment Section */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 mb-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-[#2C2341] mb-6 font-serif">Our Commitment</h2>
                <p className="text-xl text-gray-600 mb-8">
                  We are committed to making a positive difference in the communities we serve. Through our CSR initiatives, we aim to create sustainable value for all stakeholders while contributing to the betterment of society and the environment.
                </p>
                <div className="flex items-center justify-center">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
 
            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-[#2C2341] mb-6 font-serif">Join Our Impact</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Together, we can create a more sustainable and equitable future. Learn more about our CSR initiatives and how you can get involved.
              </p>
              <a
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}