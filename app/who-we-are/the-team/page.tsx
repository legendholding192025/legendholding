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
          imageUrl="https://cdn.legendholding.com/images/cdn_684c1882b54a16.04269006_20250613_122434.jpeg"
        />

        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="w-full max-w-7xl relative z-10">
            {/* Leadership Team */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2b1c48] mb-6">Leadership Team</h2>
            </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Mr. Kai Zheng",
                  role: "Chairman & CEO",
                  company: "Legend Holding Group",
                  image: "https://cdn.legendholding.com/images/cdn_68513066e231f1.05737267_20250617_090750.jpeg"
                },
                {
                  name: "Mrs. Mira Wu",
                  role: "Co-Founder & Chief Operating Officer",
                  company: "Legend Holding Group",
                  image: "https://cdn.legendholding.com/images/cdn_684c0d8b445f38.04199956_20250613_113747.jpg"
                },
                {
                  name: "Rejeesh Pillai",
                  role: "Group Finance Director",
                  company: "Legend Holding Group",
                  image: "https://cdn.legendholding.com/images/cdn_684a91542cc7b6.90399351_20250612_083532.jpg"
                },
                {
                  name: "Mabel Niu",
                  role: "Group HR Director",
                  company: "Legend Holding Group",
                  image: "https://cdn.legendholding.com/images/cdn_684a90c70ffd66.48330071_20250612_083311.jpg"
                },
                {
                  name: "Cannon Wang",
                  role: "VP Dealership & Strategy of LHG",
                  company: "Legend Motors - Dealerships",
                  image: "https://cdn.legendholding.com/images/cdn_684a91bab382b9.55226471_20250612_083714.jpg"
                },
                {
                  name: "Nagaraj P.",
                  role: "General Manager",
                  company: "Legend Motors - Trading",
                  image: "https://cdn.legendholding.com/images/cdn_685170f8cda310.20304631_20250617_134320.jpeg"
                },
                {
                  name: "Jade Li",
                  role: "Managing Director",
                  company: "Zul Energy",
                  image: "https://cdn.legendholding.com/images/cdn_685d5a2ca99729.20750755_20250626_143316.jpg"
                },
                {
                  name: "Bo Feng",
                  role: "Media Operations Manager",
                  company: "Legend Media",
                  image: "https://cdn.legendholding.com/images/cdn_684a91d8ce3885.00609400_20250612_083744.jpg"
                },
                {
                  name: "Emery Zhou",
                  role: "IT & Digital Transformation Director",
                  company: "Legend Holding Group",
                  image: "https://cdn.legendholding.com/images/cdn_684a8e1f4c3372.64281750_20250612_082151.jpg"
                },
                {
                  name: "George Hua",
                  role: "Head of Commercial Vehicles",
                  company: "Legend Commercial Vehicles",
                  image: "https://cdn.legendholding.com/images/cdn_684a90f5e5e897.26452583_20250612_083357.jpg"
                },
                {
                  name: "Xiaolong Ma",
                  role: "Branch Manager - KSA",
                  company: "Legend Motors",
                  image: "https://cdn.legendholding.com/images/cdn_685d58c3823fb8.82222303_20250626_142715.png"
                },
                {
                  name: "Liu Xiaochen",
                  role: "General Manager | Operations",
                  company: "Legend Travel and Tourism",
                  image: "https://cdn.legendholding.com/images/cdn_68512fb352e378.07080550_20250617_090451.jpeg"
                },
                {
                  name: "Saif El-Akkary",
                  role: "General Manager | Premium Brands",
                  company: "Legend Motors - Dealerships",
                  image: "https://cdn.legendholding.com/images/cdn_684a919ece14d0.18569119_20250612_083646.jpg"
                },
                {
                  name: "Mubasher Farooq",
                  role: "Head of Rent a Car Division",
                  company: "Legend Rent a Car",
                  image: "https://cdn.legendholding.com/images/cdn_684a9178c0b480.93010827_20250612_083608.jpg"
                },
                {
                  name: "Tamer Khalil",
                  role: "Head of After Sales",
                  company: "Legend World Automobile Service",
                  image: "https://cdn.legendholding.com/images/cdn_684a912f82b802.68059638_20250612_083455.jpg"
                },
                {
                  name: "Waseem Khalayleh",
                  role: "Brand Manager",
                  company: "Legend Holding Group",
                  image: "https://cdn.legendholding.com/images/cdn_685bac3b05ebd8.00933704_20250625_075851.jpg"
                },
              
              ].map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={250}
                    height={400}
                    className={`mb-4 mx-auto rounded-xl w-full h-[400px] ${
                      leader.name === "Mr. Kai Zheng" ? "object-cover object-[center_25%]" :
                      leader.name === "Liu Xiaochen" ? "object-cover object-[center_20%]" : 
                      leader.name === "Waseem Khalayleh" ? "object-cover object-[center_60%]" : 
                      leader.name === "Xiaolong Ma" ? "object-cover object-[center_40%]" : "object-cover"
                    }`}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  <h3 className="text-xl font-bold text-[#2b1c48] mb-2">{leader.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                    <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                  </div>
                  <p className="text-[#EE8900] font-semibold mb-2">{leader.role}</p>
                  <p className="text-[#5E366D] font-medium text-xl">{leader.company}</p>
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