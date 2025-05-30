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
        {/* Hero Banner */}
        <div className="relative bg-[#5E366D] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
              alt="Our Team"
              fill
              className="object-cover object-[center_30%]"
              priority
            />
            <div className="absolute inset-0 bg-[#5E366D]/80 mix-blend-multiply" />
          </div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Team
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Meet the visionaries and experts leading Legend Holding Group towards excellence and innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="w-full max-w-7xl relative z-10">
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
                <h2 className="text-2xl font-bold text-[#EE8900] mb-2">Mr. Kai Zheng</h2>
                <p className="text-lg text-gray-600 mb-2">Chairman & CEO</p>
                <p className="text-[#5E366D] font-medium text-xl">Legend Holding Group</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60"
                  alt="Mrs. Mira Wu"
                  width={400}
                  height={500}
                  className="mb-6 rounded-xl w-full h-[500px] object-cover"
                />
                <h2 className="text-2xl font-bold text-[#EE8900] mb-2">Mrs. Mira Wu</h2>
                <p className="text-lg text-gray-600 mb-2">Co-Founder & Chief Operating Officer</p>
                <p className="text-[#5E366D] font-medium text-xl">Legend Holding Group</p>
              </div>
            </div>

            {/* Division Leaders */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#EE8900] mb-6">Division Leaders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Mr. Nagaraj",
                  role: "Legend Motors Trading",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Mr. Waseem",
                  role: "Brand Manager",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Cannon",
                  role: "Legend Motors – Dealership",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Mr. Mubasher",
                  role: "Legend Rent a Car",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Mr. Tamer",
                  role: "Legend Automobile Service",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Mr. Raouf",
                  role: "Legend Green Energy Solutions",
                  image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Mr. Liu",
                  role: "Legend Travel and Tourism",
                  image: "https://images.unsplash.com/photo-1506795660198-e95c6320213d?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Jade Li",
                  role: "Zul Energy",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60"
                },
                {
                  name: "Mabel Niu",
                  role: "Human Resources",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60"
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
                  <h3 className="text-xl font-bold text-[#EE8900] text-center mb-2">{leader.name}</h3>
                  <div className="w-12 h-1 bg-[#5E366D] mx-auto mb-3"></div>
                  <p className="text-[#EE8900] font-semibold text-center mb-2">{leader.role}</p>
                  <p className="text-[#5E366D] font-medium text-center text-xl">Legend Holding Group</p>
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
 