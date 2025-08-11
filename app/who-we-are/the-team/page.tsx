"use client"
 
import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PageBanner } from '@/components/page-banner';

// Connection speed detection
const detectConnectionSpeed = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      const { effectiveType, downlink } = connection;
      if (effectiveType === '4g' && downlink > 10) return 'fast';
      if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 1.5)) return 'medium';
      return 'slow';
    }
  }
  return 'medium';
};

// Image optimization helper
const optimizeImageUrl = (url: string, width: number, quality: number) => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('f', 'auto');
    return urlObj.toString();
  } catch {
    return url;
  }
};

export default function LeadershipTeam() {
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const [loadingStats, setLoadingStats] = useState({ loaded: 0, total: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  const teamData = [
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
      name: "Nagaraj P.",
      role: "General Manager",
      company: "Legend Motors - Trading",
      image: "https://cdn.legendholding.com/images/cdn_685170f8cda310.20304631_20250617_134320.jpeg"
    },
    {
      name: "Cannon Wang",
      role: "VP Dealership & Strategy of LHG",
      company: "Legend Motors - Dealerships",
      image: "https://cdn.legendholding.com/images/cdn_684a91bab382b9.55226471_20250612_083714.jpg"
    },
    {
      name: "Rejeesh Pillai",
      role: "Group Finance Director",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_684a91542cc7b6.90399351_20250612_083532.jpg"
    },
    {
      name: "Jade Li",
      role: "Managing Director",
      company: "Zul Energy",
      image: "https://cdn.legendholding.com/images/cdn_685d5a2ca99729.20750755_20250626_143316.jpg"
    },
    {
      name: "Sonam Lama",
      role: "Group HR Director",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_68887dd0765134.66878794_20250729_075248.jpg"
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
    // {
    //   name: "Liu Xiaochen",
    //   role: "General Manager | Operations",
    //   company: "Legend Travel and Tourism",
    //   image: "https://cdn.legendholding.com/images/cdn_68512fb352e378.07080550_20250617_090451.jpeg"
    // },
    // {
    //   name: "Saif El-Akkary",
    //   role: "General Manager | Premium Brands",
    //   company: "Legend Motors - Dealerships",
    //   image: "https://cdn.legendholding.com/images/cdn_684a919ece14d0.18569119_20250612_083646.jpg"
    // },
    {
      name: "Sun Bo",
      role: "Business Development Manager",
      company: "Legend Holding Group",
      image: "https://cdn.legendholding.com/images/cdn_6895948bb69536.52704074_20250808_060915.png"
    },
    // {
    //   name: "Mubasher Farooq",
    //   role: "Head of Rent a Car Division",
    //   company: "Legend Rent a Car",
    //   image: "https://cdn.legendholding.com/images/cdn_684a9178c0b480.93010827_20250612_083608.jpg"
    // },
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
  ];

  // Get image quality based on connection speed
  const getImageQuality = (index: number) => {
    if (connectionSpeed === 'slow') return 60;
    if (connectionSpeed === 'medium') return 70;
    return index < 3 ? 80 : 75; // Higher quality for first 3 images
  };

  // Get image width based on screen size and connection
  const getImageWidth = () => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const baseWidth = isMobile ? 400 : 600;
      return connectionSpeed === 'slow' ? Math.floor(baseWidth * 0.8) : baseWidth;
    }
    return 600;
  };

  // Enhanced preloading with connection awareness
  const preloadImages = () => {
    const preloadCount = connectionSpeed === 'fast' ? 6 : connectionSpeed === 'medium' ? 4 : 2;
    
    teamData.slice(0, preloadCount).forEach((leader, index) => {
      if (!preloadedImages.has(index)) {
        const img = new window.Image();
        const optimizedUrl = optimizeImageUrl(leader.image, getImageWidth(), getImageQuality(index));
        
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, index]));
        };
        
        img.onerror = () => {
          // Fallback to original URL if optimized fails
          const fallbackImg = new window.Image();
          fallbackImg.onload = () => {
            setPreloadedImages(prev => new Set([...prev, index]));
          };
          fallbackImg.src = leader.image;
        };
        
        img.src = optimizedUrl;
      }
    });
  };

  // Enhanced intersection observer
  useEffect(() => {
    const speed = detectConnectionSpeed();
    setConnectionSpeed(speed);
    setLoadingStats({ loaded: 0, total: teamData.length });

    if (typeof window !== 'undefined') {
      // Preload images after a short delay
      setTimeout(preloadImages, 100);

      // Enhanced intersection observer with larger margin
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              
              // Staggered loading for better UX
              setTimeout(() => {
                setLoadedImages(prev => {
                  const newSet = new Set([...prev, index]);
                  setLoadingStats(current => ({
                    ...current,
                    loaded: newSet.size
                  }));
                  return newSet;
                });
              }, index * 50); // 50ms delay between each image
            }
          });
        },
        { 
          rootMargin: '150px',
          threshold: 0.1
        }
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Get object position for specific team members
  const getObjectPosition = (name: string) => {
    switch (name) {
      case "Mr. Kai Zheng": return "object-[center_25%]";
      case "Liu Xiaochen": return "object-[center_20%]";
      case "Waseem Khalayleh": return "object-[center_60%]";
      case "Xiaolong Ma": return "object-[center_40%]";
      case "Sun Bo": return "object-center";
      default: return "object-center";
    }
  };

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
              {teamData.map((leader, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  data-index={index}
                  ref={(el) => {
                    if (el && observerRef.current) {
                      observerRef.current.observe(el);
                    }
                  }}
                >
                  <div className="relative mb-4 mx-auto rounded-xl w-full h-[400px] overflow-hidden bg-gray-100">
                    {/* Loading placeholder */}
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-gray-400 text-sm">Loading...</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Optimized image */}
                    <Image
                      src={optimizeImageUrl(leader.image, getImageWidth(), getImageQuality(index))}
                      alt={leader.name}
                      width={getImageWidth()}
                      height={400}
                      className={`w-full h-full object-cover ${getObjectPosition(leader.name)} transition-opacity duration-500 ${
                        loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={getImageQuality(index)}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj"
                      onLoad={() => {
                        setLoadedImages(prev => {
                          const newSet = new Set([...prev, index]);
                          setLoadingStats(current => ({
                            ...current,
                            loaded: newSet.size
                          }));
                          return newSet;
                        });
                      }}
                      onError={() => {
                        // Fallback to original image if optimized version fails
                        const img = document.querySelector(`[alt="${leader.name}"]`) as HTMLImageElement;
                        if (img) {
                          img.src = leader.image;
                        }
                      }}
                    />
                  </div>
                  
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