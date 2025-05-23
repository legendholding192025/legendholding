"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PartnerSection } from '@/components/partner-section';
import { Handshake, Globe, Star, TrendingUp } from 'lucide-react';
 
const partnershipBenefits = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Reach",
    description: "Access to international markets and diverse business opportunities through our extensive network of partners."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Quality Assurance",
    description: "Working with industry leaders who share our commitment to excellence and high standards."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Growth Opportunities",
    description: "Strategic partnerships that drive innovation and create sustainable growth for all stakeholders."
  }
];
 
export default function PartnersPage() {
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
                Our Strategic Partnerships
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At Legend Holding Group, we believe in the power of collaboration. Our strategic partnerships enable us to deliver exceptional value to our customers while driving innovation and growth across multiple industries.
              </p>
            </div>
 
            {/* Partnership Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {partnershipBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C2341]">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
 
            {/* Partnership Approach */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 mb-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-[#2C2341] mb-6 font-serif">Our Partnership Approach</h2>
                <p className="text-xl text-gray-600 mb-8">
                  We carefully select and nurture partnerships that align with our values and strategic objectives. Our collaborative approach focuses on creating mutual value and long-term success for all stakeholders.
                </p>
                <div className="flex items-center justify-center">
                  <Handshake className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
 
            {/* Partner Section */}
            <PartnerSection />
 
            {/* Partnership Process */}
            <div className="mt-16 text-center">
              <h2 className="text-4xl font-bold text-[#2C2341] mb-12 font-serif">How We Partner</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">1</div>
                  <h3 className="text-xl font-bold text-[#2C2341] mb-4">Strategic Alignment</h3>
                  <p className="text-gray-600">Identifying partners who share our vision and values</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">2</div>
                  <h3 className="text-xl font-bold text-[#2C2341] mb-4">Due Diligence</h3>
                  <p className="text-gray-600">Thorough evaluation of potential partnership opportunities</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">3</div>
                  <h3 className="text-xl font-bold text-[#2C2341] mb-4">Collaboration</h3>
                  <p className="text-gray-600">Developing joint strategies and implementation plans</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">4</div>
                  <h3 className="text-xl font-bold text-[#2C2341] mb-4">Growth</h3>
                  <p className="text-gray-600">Continuous improvement and expansion of partnership value</p>
                </div>
              </div>
            </div>
 
            {/* Call to Action */}
            <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-[#2C2341] mb-6 font-serif">Become a Partner</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join our network of trusted partners and explore opportunities for growth and innovation. Together, we can achieve more.
              </p>
              <a
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                Contact Us to Partner
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}