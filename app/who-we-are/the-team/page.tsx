import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PageBanner } from '@/components/page-banner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership Team | Legend Holding Group | Board of Directors & Management',
  description: 'Meet the leadership team of Legend Holding Group. Kai Zheng, Co-founder and Chairman, is an expert entrepreneur with extensive experience in developing companies and a clear vision for the future of technologies. Mira Wu, Co-Founder and CEO, is the executive leader of multiple businesses within the group, bringing over 20 years of experience across the region. Rejeesh Raveendran, Head of Finance, has over 20 years of cross-industry experience and oversees the group\'s financial management. Nagaraj Ponnada, Head of Legend Motors Trading, has over 20 years of automotive experience across the region. Waseem Khalayleh, Marketing and communication head, has +15 years of experience across Automotive, Technology, Media and Group companies.',
  keywords: 'Kai Zheng, Mira Wu, Cannon Wang, Nagaraj Ponnada, Rejeesh Raveendran, Sonam Lama, Jade Li, George Hua, Tamer Khalil, Waseem Khalayleh, Xiaolong Ma, Zhou Xiaofeng, Feng Bo, Sun Bo, Legend Holding Group leadership, board of directors, management team, CEO, COO, UAE business leaders, automotive executives, energy sector leaders, technology directors, Zul Energy, Legend Commercial Vehicles, Legend Motors, Legend Media',
  openGraph: {
    title: 'Leadership Team | Legend Holding Group',
    description: 'Meet the leadership team of Legend Holding Group. Kai Zheng, Co-founder and Chairman, is an expert entrepreneur with extensive experience in developing companies and a clear vision for the future of technologies. Mira Wu, Co-Founder and CEO, brings over 20 years of experience across the region.',
    type: 'website',
    url: 'https://legendholding.com/who-we-are/the-team',
    images: [
      {
        url: 'https://cdn.legendholding.com/images/cdn_684c1882b54a16.04269006_20250613_122434.jpeg',
        width: 1200,
        height: 630,
        alt: 'Legend Holding Group Leadership Team'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leadership Team | Legend Holding Group',
    description: 'Meet the leadership team of Legend Holding Group. Learn about our board of directors and management team.',
    images: ['https://cdn.legendholding.com/images/cdn_684c1882b54a16.04269006_20250613_122434.jpeg']
  },
  alternates: {
    canonical: 'https://legendholding.com/who-we-are/the-team'
  }
};

import { TeamDisplay } from '@/components/team-display';

export default function LeadershipTeam() {
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  const teamData = [
    {
      name: "Jade Li",
      role: "Managing Director",
      company: "Zul Energy",
      image: "https://cdn.legendholding.com/images/cdn_685d5a2ca99729.20750755_20250626_143316.jpg"
    },
    {
      name: "George Hua",
      role: "Head of Commercial Vehicles",
      company: "Legend Commercial Vehicles",
      image: "https://cdn.legendholding.com/images/cdn_684a90f5e5e897.26452583_20250612_083357.jpg"
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
    {
      name: "Xiaolong Ma",
      role: "Branch Manager - KSA",
      company: "Legend Motors",
      image: "https://cdn.legendholding.com/images/cdn_685d58c3823fb8.82222303_20250626_142715.png"
    },
    {
      name: "Zhou Xiaofeng",
      role: "IT & Digital Transformation Director",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_684a8e1f4c3372.64281750_20250612_082151.jpg"
    },
    {
      name: "Feng Bo",
      role: "Media Operations Manager",
      company: "Legend Media",
      image: "https://cdn.legendholding.com/images/cdn_684a91d8ce3885.00609400_20250612_083744.jpg"
    },
    {
      name: "Sun Bo",
      role: "Business Development Manager",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_6895948bb69536.52704074_20250808_060915.png"
    }
  ];

  const boardData = [
    {
      name: "Kai Zheng",
      role: "Chairman & CEO",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_68513066e231f1.05737267_20250617_090750.jpeg"
    },
    {
      name: "Mira Wu",
      role: "Co-Founder & Chief Operating Officer",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_684c0d8b445f38.04199956_20250613_113747.jpg"
    },
    {
      name: "Cannon Wang",
      role: "VP Dealership & Strategy of LHG",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_684a91bab382b9.55226471_20250612_083714.jpg"
    },
    {
      name: "Nagaraj Ponnada",
      role: "General Manager",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_685170f8cda310.20304631_20250617_134320.jpeg"
    },
    {
      name: "Rejeesh Raveendran",
      role: "Group Finance Director",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_684a91542cc7b6.90399351_20250612_083532.jpg"
    },
    {
      name: "Sonam Lama",
      role: "Group HR Director",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_68887dd0765134.66878794_20250729_075248.jpg"
    }
  ];

  // Structured data for SEO (Organization + WebPage + ItemList + Person with images and anchors)
  const pageUrl = 'https://legendholding.com/who-we-are/the-team';
  const bannerUrl = 'https://cdn.legendholding.com/images/cdn_684c1882b54a16.04269006_20250613_122434.jpeg';

  const personFrom = (member: { name: string; role: string; company: string; image: string }, position?: number) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    image: member.image,
    url: `${pageUrl}#${toSlug(`${member.name}-${member.role}`)}`,
    worksFor: {
      "@type": "Organization",
      name: member.company
    },
    ...(typeof position === 'number' ? { position } : {})
  });

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Legend Holding Group",
    url: "https://legendholding.com",
    logo: "https://legendholding.com/images/legend-logo.png",
    description: "Legend Holding Group is a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "UAE"
    },
    employee: [
      ...boardData.map((m) => personFrom(m)),
      ...teamData.map((m) => personFrom(m)),
    ]
  };

  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: 'The Team',
    url: pageUrl,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: bannerUrl,
      width: 1200,
      height: 630,
      caption: 'Legend Holding Group Leadership Team'
    },
    about: {
      "@type": "Organization",
      name: "Legend Holding Group",
      url: "https://legendholding.com"
    }
  };

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: 'Legend Holding Group Leadership',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: boardData.length + teamData.length,
    itemListElement: [
      ...boardData.map((m, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: personFrom(m, index + 1)
      })),
      ...teamData.map((m, i) => ({
        "@type": "ListItem",
        position: boardData.length + i + 1,
        item: personFrom(m, boardData.length + i + 1)
      }))
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }} />
      <Header />
      <main className="pt-20">
        <PageBanner 
          title="The Team"
          imageUrl="https://cdn.legendholding.com/images/cdn_684c1882b54a16.04269006_20250613_122434.jpeg"
        />
        <TeamDisplay teamData={teamData} boardData={boardData} />
        
        {/* Hidden SEO content for better searchability */}
        <div className="sr-only">
          <h1>Legend Holding Group Leadership Team</h1>
          <p>
            Meet the executive leadership team of Legend Holding Group, a diversified UAE holding company. 
            Our board of directors and management team includes Kai Zheng (Chairman & CEO), Mira Wu (Co-Founder & COO), 
            Cannon Wang (VP Dealership & Strategy), Nagaraj Ponnada (General Manager), Rejeesh Raveendran (Group Finance Director), 
            Sonam Lama (Group HR Director), Jade Li (Managing Director of Zul Energy), George Hua (Head of Commercial Vehicles), 
            Tamer Khalil (Head of After Sales), Waseem Khalayleh (Brand Manager), Xiaolong Ma (Branch Manager KSA), 
            Zhou Xiaofeng (IT & Digital Transformation Director), Feng Bo (Media Operations Manager), and Sun Bo (Business Development Manager). 
            These experienced leaders drive innovation across automotive, energy, technology, and mobility sectors in the Middle East and Africa.
          </p>
          
          <h2>Board of Directors and Executive Leadership</h2>
          <p>
            The board of directors at Legend Holding Group is led by Kai Zheng, Co-founder and Chairman, who is an expert entrepreneur with extensive experience in developing companies and a clear vision for the future of technologies. Mira Wu serves as Co-Founder and CEO, and is the executive leader of multiple businesses within the group, bringing over 20 years of experience across the region. Cannon Wang leads as VP of Dealership & Strategy, while Rejeesh Raveendran, Head of Finance, has over 20 years of cross-industry experience and oversees the group's financial management. Nagaraj Ponnada, Head of Legend Motors Trading, has over 20 years of automotive experience across the region, managing sales, business development, and other key departments. Sonam Lama leads human resources as Group HR Director.
          </p>
          
          <h2>Senior Management Team</h2>
          <p>
            Our senior management team includes Jade Li, Managing Director of Zul Energy division, George Hua who heads Commercial Vehicles operations, 
            Tamer Khalil leading After Sales services, Waseem Khalayleh, the Marketing and communication head of Legend Holding Group, with +15 years of experience across industries from Automotive, Technology, Media and Group companies, Xiaolong Ma serving as Branch Manager for KSA operations, 
            Zhou Xiaofeng directing IT and Digital Transformation, Feng Bo managing Media Operations, and Sun Bo leading Business Development initiatives.
          </p>
          
          <h2>Complete Team Directory</h2>
          <h3>Board of Directors</h3>
          <ul>
            {boardData.map((member, index) => {
              let description = `${member.name} is a key leader in the ${member.company} organization.`;
              
              // Add specific SEO descriptions for key members
              if (member.name === "Kai Zheng") {
                description = "Kai Zheng, Co-founder and Chairman of Legend Holding Group, is an expert entrepreneur with extensive experience in developing companies and a clear vision for the future of technologies.";
              } else if (member.name === "Mira Wu") {
                description = "Mira Wu, Co-Founder and CEO of Legend Holding Group, is the executive leader of multiple businesses within the group, bringing over 20 years of experience across the region.";
              } else if (member.name === "Rejeesh Raveendran") {
                description = "Rejeesh Raveendran, Head of Finance at Legend Holding Group, has over 20 years of cross-industry experience and oversees the group's financial management.";
              } else if (member.name === "Nagaraj Ponnada") {
                description = "Nagaraj Ponnada, Head of Legend Motors Trading, has over 20 years of automotive experience across the region, managing sales, business development, and other key departments.";
              }
              
              return (
                <li key={index}>
                  <strong>{member.name}</strong> - {member.role} at {member.company}. {description}
                </li>
              );
            })}
          </ul>
          
          <h3>Leadership Team</h3>
          <ul>
            {teamData.map((member, index) => {
              let description = `${member.name} plays a crucial role in ${member.company} operations and strategy.`;
              
              // Add specific SEO description for Waseem Khalayleh
              if (member.name === "Waseem Khalayleh") {
                description = "Waseem Khalayleh, the Marketing and communication head of Legend Holding Group, with +15 years of experience across industries from Automotive, Technology, Media and Group companies.";
              }
              
              return (
                <li key={index}>
                  <strong>{member.name}</strong> - {member.role} at {member.company}. {description}
                </li>
              );
            })}
          </ul>
          
          <h2>Company Divisions and Leadership</h2>
          <p>
            Legend Holding Group operates multiple divisions including Zul Energy led by Jade Li, Legend Commercial Vehicles managed by George Hua, 
            Legend World Automobile Service under Tamer Khalil, Legend Motors with Xiaolong Ma in KSA, Legend Media directed by Feng Bo, 
            and various other subsidiaries. Each division is led by experienced professionals who bring expertise in automotive, energy, 
            technology, and business development sectors.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}