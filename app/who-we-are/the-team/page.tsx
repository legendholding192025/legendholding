"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';

export default function LeadershipTeam() {
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#2C2341] mb-2">Our Leadership Team</h1>
              <div className="w-24 h-1 bg-primary mb-6"></div>
              <p className="text-xl text-gray-600">
                Meet our leadership team helping shape Legend Holding Group&apos;s goals.
              </p>
            </div>

            {/* Main Leadership - Kai and Mira */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60"
                  alt="Mr. Kai Zheng"
                  width={400}
                  height={500}
                  className="mb-6 rounded-xl w-full h-[500px] object-cover"
                />
                <h2 className="text-2xl font-bold text-primary mb-2">Mr. Kai Zheng</h2>
                <p className="text-lg text-gray-600 mb-4">Chairman & CEO, Legend Holding Group</p>
                <p className="text-gray-700 leading-relaxed">
                  Mr. Kai Zheng is the visionary leader behind Legend Holding Group&apos;s remarkable growth and
                  diversification. With over 20 years of experience in strategic business development and international
                  markets, he has successfully guided the company&apos;s expansion across multiple industries including
                  automotive, energy, and tourism. His innovative approach to business and commitment to sustainable growth
                  has positioned Legend Holding Group as a leading conglomerate in the region. Under his leadership, the
                  company has achieved significant milestones in green energy solutions and automotive excellence.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60"
                  alt="Mrs. Mira Wu"
                  width={400}
                  height={500}
                  className="mb-6 rounded-xl w-full h-[500px] object-cover"
                />
                <h2 className="text-2xl font-bold text-primary mb-2">Mrs. Mira Wu</h2>
                <p className="text-lg text-gray-600 mb-4">Co-Founder & Chief Operating Officer</p>
                <p className="text-gray-700 leading-relaxed">
                  Mrs. Mira Wu brings exceptional operational expertise and strategic insight to Legend Holding Group. As
                  Co-Founder and COO, she oversees the day-to-day operations across all business divisions, ensuring seamless
                  coordination and optimal performance. Her background in finance and operations management has been
                  instrumental in establishing robust systems and processes that support the company&apos;s rapid growth. Mira
                  is particularly passionate about fostering innovation and maintaining the highest standards of service
                  excellence across all Legend Group companies. Her leadership in human resources and organizational
                  development has created a strong corporate culture focused on excellence and integrity.
                </p>
              </div>
            </div>

            {/* Division Leaders */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2C2341] mb-6">Division Leaders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Mr. Nagaraj",
                  role: "Legend Motors Trading",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
                  description: "Leading our automotive trading division with expertise in vehicle procurement and distribution."
                },
                {
                  name: "Cannon",
                  role: "Legend Motors – Dealership",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60",
                  description: "Managing our dealership operations and customer relations with a focus on exceptional service."
                },
                {
                  name: "Mr. Mubasher",
                  role: "Legend Rent a Car",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
                  description: "Overseeing our rental car services and fleet management operations."
                },
                {
                  name: "Mr. Tamer",
                  role: "Legend Automobile Service",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
                  description: "Leading our automotive service division with technical excellence and customer satisfaction."
                },
                {
                  name: "Mr. Raouf",
                  role: "Legend Green Energy Solutions",
                  image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60",
                  description: "Driving our sustainable energy initiatives and green technology solutions."
                },
                {
                  name: "Mr. Liu",
                  role: "Legend Travel and Tourism",
                  image: "https://images.unsplash.com/photo-1506795660198-e95c6320213d?w=800&auto=format&fit=crop&q=60",
                  description: "Managing our travel and tourism services with a commitment to exceptional experiences."
                },
                {
                  name: "Jade Li",
                  role: "Zul Energy",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60",
                  description: "Leading our energy sector operations with innovation and strategic vision."
                },
                {
                  name: "Mabel Niu",
                  role: "Human Resources",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60",
                  description: "Overseeing talent management and organizational development across all divisions."
                },
                {
                  name: "Mr. Waseem",
                  role: "Brand Manager",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
                  description: "Driving brand strategy and creative direction across all Legend Group companies, ensuring consistent and impactful brand presence."
                }
              ].map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={250}
                    height={300}
                    className="mb-4 mx-auto rounded-xl w-full h-[300px] object-cover"
                  />
                  <h3 className="text-xl font-bold text-[#2C2341] text-center mb-2">{leader.name}</h3>
                  <div className="w-12 h-1 bg-primary mx-auto mb-3"></div>
                  <p className="text-primary font-semibold text-center mb-3">{leader.role}</p>
                  <p className="text-gray-700 text-center">{leader.description}</p>
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
 