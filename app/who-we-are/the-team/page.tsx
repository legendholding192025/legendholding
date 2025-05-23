"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Building2, Users, Briefcase, Handshake, Globe, Lightbulb } from 'lucide-react';
import Link from 'next/link';
 
// Department data
const departments = [
  {
    title: "Executive Leadership",
    icon: <Building2 className="w-8 h-8" />,
    description: "Our executive team provides strategic direction and leadership across all business units, ensuring alignment with our vision and mission.",
    responsibilities: [
      "Strategic Planning & Vision",
      "Corporate Governance",
      "Business Development",
      "Stakeholder Relations"
    ]
  },
  {
    title: "Operations & Technology",
    icon: <Briefcase className="w-8 h-8" />,
    description: "Driving operational excellence and technological innovation across all business units to ensure sustainable growth and efficiency.",
    responsibilities: [
      "Process Optimization",
      "Digital Transformation",
      "Quality Assurance",
      "Supply Chain Management"
    ]
  },
  {
    title: "Human Capital",
    icon: <Users className="w-8 h-8" />,
    description: "Building and nurturing our diverse talent pool while fostering a culture of excellence, innovation, and continuous learning.",
    responsibilities: [
      "Talent Acquisition",
      "Learning & Development",
      "Employee Engagement",
      "Performance Management"
    ]
  },
  {
    title: "Business Development",
    icon: <Handshake className="w-8 h-8" />,
    description: "Identifying and pursuing new opportunities for growth while strengthening existing partnerships and market presence.",
    responsibilities: [
      "Market Expansion",
      "Strategic Partnerships",
      "Business Innovation",
      "Growth Strategy"
    ]
  },
  {
    title: "Global Operations",
    icon: <Globe className="w-8 h-8" />,
    description: "Managing our international presence and ensuring seamless operations across multiple markets and regions.",
    responsibilities: [
      "International Expansion",
      "Market Analysis",
      "Global Strategy",
      "Cross-border Operations"
    ]
  },
  {
    title: "Innovation & Research",
    icon: <Lightbulb className="w-8 h-8" />,
    description: "Pioneering new solutions and technologies to stay ahead of industry trends and maintain our competitive edge.",
    responsibilities: [
      "R&D Initiatives",
      "Technology Innovation",
      "Future Trends Analysis",
      "Product Development"
    ]
  }
];
 
export default function TeamPage() {
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
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#2C2341] mb-6 font-serif tracking-tight">
                Our Organizational Structure
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                At Legend Holding Group, we've built a robust organizational structure that enables us to excel across multiple industries. Our departments work in harmony to drive innovation, maintain operational excellence, and deliver sustainable growth.
              </p>
            </div>
 
            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4">
                        {dept.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#2C2341]">{dept.title}</h3>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">{dept.description}</p>
                    <div className="space-y-3">
                      {dept.responsibilities.map((item, idx) => (
                        <div key={idx} className="flex items-center text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          <span className="text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Culture Section */}
            <div className="mt-24 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2341] mb-12 font-serif tracking-tight">Our Culture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2341] mb-4">Collaboration</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">We foster a culture of teamwork and cross-functional collaboration, breaking down silos to achieve common goals.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2341] mb-4">Innovation</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">We encourage creative thinking and continuous improvement, embracing new ideas and technologies.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2341] mb-4">Excellence</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">We maintain high standards in everything we do, striving for excellence in all our operations and services.</p>
                </div>
              </div>
            </div>
 
            {/* Join Us Section */}
            <div className="mt-24 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2341] mb-6 font-serif tracking-tight">Join Our Team</h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Be part of a dynamic organization that's shaping the future of multiple industries. We're always looking for talented individuals who share our vision and values.
              </p>
              <Link
                href="/careers"
                className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 text-lg"
              >
                Explore Career Opportunities
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
 