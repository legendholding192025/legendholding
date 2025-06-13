"use client"
 
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PageBanner } from '@/components/page-banner';

export default function LeadershipTeam() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PageBanner 
          title="The Team"
          imageUrl="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
        />

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
                  src="https://cdn.legendholding.com/images/cdn_684c0fb8617c81.71541014_20250613_114704.png"
                  alt="Mr. Kai Zheng"
                  width={400}
                  height={500}
                  className="mb-6 rounded-xl w-full h-[500px] object-cover"
                />
                <h2 className="text-2xl font-bold text-[#2b1c48] mb-2">Mr. Kai Zheng</h2>
                <div className="flex gap-2 mb-3">
                  <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                  <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                </div>
                <p className="text-lg text-[#EE8900] font-semibold mb-2">Chairman & CEO</p>
                <p className="text-[#5E366D] font-medium text-xl">Legend Holding Group</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Image
                  src="https://cdn.legendholding.com/images/cdn_684c0d8b445f38.04199956_20250613_113747.jpg"
                  alt="Mrs. Mira Wu"
                  width={400}
                  height={500}
                  className="mb-6 rounded-xl w-full h-[500px] object-cover"
                />
                <h2 className="text-2xl font-bold text-[#2b1c48] mb-2">Mrs. Mira Wu</h2>
                <div className="flex gap-2 mb-3">
                  <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                  <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                </div>
                <p className="text-lg text-[#EE8900] font-semibold mb-2">Co-Founder & Chief Operating Officer</p>
                <p className="text-[#5E366D] font-medium text-xl">Legend Holding Group</p>
              </div>
            </div>

            {/* Division Leaders */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2b1c48] mb-6">Division Leaders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Emery Zhou",
                  role: "IT & Digital Transformation Director",
                  image: "https://cdn.legendholding.com/images/cdn_684a8e1f4c3372.64281750_20250612_082151.jpg"
                },
                {
                  name: "George Hua",
                  role: "Head of Commercial Vehicles",
                  image: "https://cdn.legendholding.com/images/cdn_684a90f5e5e897.26452583_20250612_083357.jpg"
                },
                {
                  name: "Cannon Wang",
                  role: "VP Dealership & Strategy of LHG",
                  image: "https://cdn.legendholding.com/images/cdn_684a91bab382b9.55226471_20250612_083714.jpg"
                },
                {
                  name: "Mubasher Farooq ",
                  role: "Head of Rent a Car Division",
                  image: "https://cdn.legendholding.com/images/cdn_684a9178c0b480.93010827_20250612_083608.jpg"
                },
                {
                  name: "Tamer Moutamed Essa Khalil",
                  role: "Head of After Sales",
                  image: "https://cdn.legendholding.com/images/cdn_684a912f82b802.68059638_20250612_083455.jpg"
                },
                {
                  name: "Rejeesh Raveendran Pillai",
                  role: "Group Finance Director",
                  image: "https://cdn.legendholding.com/images/cdn_684a91542cc7b6.90399351_20250612_083532.jpg"
                },
                {
                  name: "Saif El-Dine El-Akkary",
                  role: "General Manager | Premium Brands",
                  image: "https://cdn.legendholding.com/images/cdn_684a919ece14d0.18569119_20250612_083646.jpg"
                },
                {
                  name: "Bo Feng",
                  role: "Media Operations Manager",
                  image: "https://cdn.legendholding.com/images/cdn_684a91d8ce3885.00609400_20250612_083744.jpg"
                },
                {
                  name: "Mabel Niu",
                  role: "Group HR Director",
                  image: "https://cdn.legendholding.com/images/cdn_684a90c70ffd66.48330071_20250612_083311.jpg"
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
                  <h3 className="text-xl font-bold text-[#2b1c48] mb-2">{leader.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                    <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                  </div>
                  <p className="text-[#EE8900] font-semibold mb-2">{leader.role}</p>
                  <p className="text-[#5E366D] font-medium text-xl">Legend Holding Group</p>
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
 