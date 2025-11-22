import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PageBanner } from '@/components/page-banner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership Team | Legend Holding Group | Board of Directors & Management',
  description: 'Meet the leadership team of Legend Holding Group. Our board includes Kai Zheng (Founder & Chairman), Mira Wu (Co-Founder & Vice Chairman), Cannon Wang (VP Dealership & Strategy), Nagaraj Ponnada (General Manager), Rejeesh Raveendran (Group Finance Director), and Sonam Lama (Group HR Director). Our management team features Jade Li (Managing Director at Zul Energy), George Hua (Head of Commercial Vehicles), Tamer Khalil (Head of After Sales), Waseem Khalayleh (Brand Manager), Xiaolong Ma (Branch Manager - KSA), Sun Bo (Business Development Manager), and Pawan Rathi (General Manager at Legend Rent a Car).',
  keywords: 'Kai Zheng, Mira Wu, Cannon Wang, Nagaraj Ponnada, Rejeesh Raveendran, Sonam Lama, Jade Li, George Hua, Tamer Khalil, Waseem Khalayleh, Xiaolong Ma, Sun Bo, Pawan Rathi, Legend Holding Group leadership, board of directors, management team, Founder, Chairman, Vice Chairman, General Manager, UAE business leaders, automotive executives, energy sector leaders, technology directors, Zul Energy, Legend Commercial Vehicles, Legend Motors, Legend Rent a Car',
  openGraph: {
    title: 'Leadership Team | Legend Holding Group',
    description: 'Meet the leadership team of Legend Holding Group. Our board includes Kai Zheng (Founder & Chairman), Mira Wu (Co-Founder & Vice Chairman), Cannon Wang, Nagaraj Ponnada, Rejeesh Raveendran, and Sonam Lama. Management team: Jade Li, George Hua, Tamer Khalil, Waseem Khalayleh, Xiaolong Ma, Sun Bo, and Pawan Rathi.',
    type: 'website',
    url: 'https://legendholding.com/who-we-are/the-team',
    images: [
      {
        url: 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761119956/cdn_684c1882b54a16.04269006_20250613_122434_vwphxo.jpg',
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
    images: ['https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761119956/cdn_684c1882b54a16.04269006_20250613_122434_vwphxo.jpg']
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
  const boardData = [
    {
      name: "Kai Zheng",
      role: "Founder & Chairman",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054607/image_5_xtngrn.jpg"
    },
    {
      name: "Mira Wu",
      role: "Co-Founder & Vice Chairman",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054550/10_copy_xhh1bh.jpg"
    },
    {
      name: "Cannon Wang",
      role: "VP Dealership & Strategy of LHG",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054569/8_copy_wxobcr.jpg"
    },
    {
      name: "Rejeesh Raveendran",
      role: "Group Finance Director",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054567/5_copy_uuxcob.jpg"
    },
    {
      name: "Nagaraj Ponnada",
      role: "General Manager",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054540/image_8_swwqoy.jpg"
    },
    {
      name: "Sonam Lama",
      role: "Group HR Director",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054545/sonam_bwxv4m.jpg"
    },
    {
      name: "Waseem Khalayleh",
      role: "Head of Brand",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763818241/WhatsApp_Image_2025-06-20_at_12.082222_asqhsk.png"
    },
    {
      name: "Jade Li",
      role: "Managing Director",
      company: "Zul Energy",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763817365/WhatsApp_Image_2025-06-20_at_12.08_1_ch0zex.png"
    },
    {
      name: "George Hua",
      role: "Head of Commercial Vehicles",
      company: "Legend Commercial Vehicles",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054559/3_copy_mxnwc7.jpg"
    },
    {
      name: "Tamer Khalil",
      role: "Head of After Sales",
      company: "Legend Auto Services",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054567/4_copy_upgmzf.jpg"
    }, 
    {
      name: "Sun Bo",
      role: "Business Development Manager",
      company: "Legend Holding Group",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054580/sun_bo-new_wzmjs1.png"
    },
    {
      name: "Pawan Rathi",
      role: "General Manager",
      company: "Legend Rent a Car",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763818661/656_ynivxt.png"
    }
  ];

  const teamData = [
    {
      name: "Xiaolong Ma",
      role: "Branch Manager - KSA",
      company: "Legend Motors",
      image: "https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054605/Mou-new_eh2vsp.png"
    }
  ];

  // Structured data for SEO (Organization + WebPage + ItemList + Person with images and anchors)
  const pageUrl = 'https://legendholding.com/who-we-are/the-team';
  const bannerUrl = 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761119956/cdn_684c1882b54a16.04269006_20250613_122434_vwphxo.jpg';

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
          imageUrl="https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761119956/cdn_684c1882b54a16.04269006_20250613_122434_vwphxo.jpg"
        />
        <TeamDisplay teamData={teamData} boardData={boardData} />
        
        {/* Hidden SEO content for better searchability */}
        <div className="sr-only">
          <h1>Legend Holding Group Leadership Team</h1>
          <p>
            Meet the executive leadership team of Legend Holding Group, a diversified UAE holding company. 
            Our board of directors includes Kai Zheng (Founder & Chairman), Mira Wu (Co-Founder & Vice Chairman), 
            Cannon Wang (VP Dealership & Strategy), Nagaraj Ponnada (General Manager), Rejeesh Raveendran (Group Finance Director), 
            and Sonam Lama (Group HR Director). Our management team features Jade Li (Managing Director of Zul Energy), 
            George Hua (Head of Commercial Vehicles), Tamer Khalil (Head of After Sales), Waseem Khalayleh (Brand Manager), 
            Xiaolong Ma (Branch Manager - KSA), Sun Bo (Business Development Manager), and Pawan Rathi (General Manager at Legend Rent a Car). 
            These experienced leaders drive innovation across automotive, energy, technology, and mobility sectors in the Middle East and Africa.
          </p>
          
          <h2>Board of Directors and Executive Leadership</h2>
          <p>
            The board of directors at Legend Holding Group is led by Kai Zheng, Founder & Chairman, who is an expert entrepreneur with extensive experience in developing companies and a clear vision for the future of technologies. Mira Wu serves as Co-Founder & Vice Chairman, and is the executive leader of multiple businesses within the group, bringing over 20 years of experience across the region. Cannon Wang leads as VP of Dealership & Strategy of Legend Holding Group, while Rejeesh Raveendran, Group Finance Director, has over 20 years of cross-industry experience and oversees the group's financial management. Nagaraj Ponnada serves as General Manager of Legend Holding Group, bringing over 20 years of automotive experience across the region. Sonam Lama leads human resources as Group HR Director.
          </p>
          
          <h2>Senior Management Team</h2>
          <p>
            Our senior management team includes Jade Li, Managing Director of Zul Energy division, George Hua who heads Commercial Vehicles operations at Legend Commercial Vehicles, 
            Tamer Khalil leading After Sales services at Legend World Automobile Service, Waseem Khalayleh serving as Brand Manager of Legend Holding Group with over 15 years of experience across Automotive, Technology, and Media industries, Xiaolong Ma serving as Branch Manager for Legend Motors KSA operations, 
            Sun Bo leading Business Development initiatives at Legend Holding Group, and Pawan Rathi as General Manager of Legend Rent a Car.
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
              
              // Add specific SEO descriptions for key members
              if (member.name === "Waseem Khalayleh") {
                description = "Waseem Khalayleh, Brand Manager of Legend Holding Group, with over 15 years of experience across industries from Automotive, Technology, Media and Group companies.";
              } else if (member.name === "Jade Li") {
                description = "Jade Li serves as Managing Director of Zul Energy, leading the company's sustainable energy initiatives and strategic growth.";
              } else if (member.name === "George Hua") {
                description = "George Hua leads Legend Commercial Vehicles operations, bringing extensive expertise in commercial vehicle solutions and fleet management.";
              } else if (member.name === "Pawan Rathi") {
                description = "Pawan Rathi serves as General Manager of Legend Rent a Car, overseeing the premium car rental services and operations across the UAE.";
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
            Legend World Automobile Service under Tamer Khalil, Legend Motors with Xiaolong Ma in KSA, Legend Rent a Car managed by Pawan Rathi, 
            and various other subsidiaries. Each division is led by experienced professionals who bring expertise in automotive, energy, 
            technology, and business development sectors. Our leadership team drives innovation and excellence across all business units.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}