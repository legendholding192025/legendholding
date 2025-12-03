"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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

interface TeamMember {
  name: string;
  role: string;
  company: string;
  image: string;
}

interface TeamDisplayProps {
  teamData: TeamMember[];
  boardData: TeamMember[];
  chinaData?: TeamMember[];
}

export function TeamDisplay({ teamData, boardData, chinaData = [] }: TeamDisplayProps) {
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [loadedImages, setLoadedImages] = useState<Set<string | number>>(new Set());
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const [loadingStats, setLoadingStats] = useState({ loaded: 0, total: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    setLoadingStats({ loaded: 0, total: boardData.length + teamData.length + chinaData.length });

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
      case "Kai Zheng": return "object-[center_20%]";
      case "Liu Xiaochen": return "object-[center_20%]";
      case "Waseem Khalayleh": return "object-[center_60%]";
      case "Xiaolong Ma": return "object-[center_40%]";
      case "Sun Bo": return "object-center";
      case "Rejeesh Raveendran": return "object-[35%_center]";
      default: return "object-center";
    }
  };

  // Get custom height for specific team members
  const getImageHeight = (name: string) => {
    switch (name) {
      case "Noha Mohamed Shekib": return "h-[109%] inset-x-0 top-0";
      default: return "";
    }
  };

  // Create stable, SEO-friendly slug to use as element id/anchor
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-7xl relative z-10">
        {/* United Arab Emirates - Headquarters */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#2b1c48] mb-6">United Arab Emirates - Headquarters</h2>
          <div className="flex gap-2 mb-6">
            <div className="h-1 w-20 bg-[#5E366D] rounded-full animate-expand-width"></div>
            <div className="h-1 w-12 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {boardData.map((director, index) => (
              <div 
                key={`board-${index}`} 
                id={toSlug(`${director.name}-${director.role}`)}
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
                data-index={`board-${index}`}
                ref={(el) => {
                  if (el && observerRef.current) {
                    observerRef.current.observe(el);
                  }
                }}
              >
                <div className="relative mb-4 mx-auto rounded-xl w-full aspect-[5/6] overflow-hidden bg-gray-100 flex-shrink-0">
                  {/* Loading placeholder */}
                  {!loadedImages.has(`board-${index}`) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading...</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Optimized image */}
                  <div className={`absolute inset-0 ${getImageHeight(director.name)}`}>
                    <Image
                      src={optimizeImageUrl(director.image, getImageWidth(), getImageQuality(index))}
                      alt={`${director.name} - ${director.role} at ${director.company}`}
                      fill
                      className={`object-cover ${getObjectPosition(director.name)} transition-opacity duration-500 ${
                        loadedImages.has(`board-${index}`) ? 'opacity-100' : 'opacity-0'
                      }`}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={getImageQuality(index)}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj"
                    onLoad={() => {
                      setLoadedImages(prev => {
                        const newSet = new Set([...prev, `board-${index}`]);
                        setLoadingStats(current => ({
                          ...current,
                          loaded: newSet.size
                        }));
                        return newSet;
                      });
                    }}
                      onError={() => {
                        // Fallback to original image if optimized version fails
                        const img = document.querySelector(`[alt="${director.name}"]`) as HTMLImageElement;
                        if (img) {
                          img.src = director.image;
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2b1c48] mb-2 line-clamp-2">{director.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                    <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                  </div>
                  <p className="text-[#EE8900] font-semibold mb-2 text-sm sm:text-base line-clamp-2">{director.role}</p>
                  <p className="text-[#5E366D] font-medium text-base sm:text-lg line-clamp-1">{director.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kingdom of Saudi Arabia */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2b1c48] mb-6">Kingdom of Saudi Arabia</h2>
          <div className="flex gap-2 mb-6">
            <div className="h-1 w-20 bg-[#5E366D] rounded-full animate-expand-width"></div>
            <div className="h-1 w-12 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamData.map((leader, index) => (
            <div 
              key={index} 
              id={toSlug(`${leader.name}-${leader.role}`)}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
              data-index={index}
              ref={(el) => {
                if (el && observerRef.current) {
                  observerRef.current.observe(el);
                }
              }}
            >
              <div className="relative mb-4 mx-auto rounded-xl w-full aspect-[5/6] overflow-hidden bg-gray-100 flex-shrink-0">
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
                <div className={`absolute inset-0 ${getImageHeight(leader.name)}`}>
                  <Image
                    src={optimizeImageUrl(leader.image, getImageWidth(), getImageQuality(index))}
                    alt={`${leader.name} - ${leader.role} at ${leader.company}`}
                    fill
                    className={`object-cover ${getObjectPosition(leader.name)} transition-opacity duration-500 ${
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
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-[#2b1c48] mb-2 line-clamp-2">{leader.name}</h3>
                <div className="flex gap-2 mb-3">
                  <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                  <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                </div>
                <p className="text-[#EE8900] font-semibold mb-2 text-sm sm:text-base line-clamp-2">{leader.role}</p>
                <p className="text-[#5E366D] font-medium text-base sm:text-lg line-clamp-1">{leader.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* People's Republic of China */}
        {chinaData.length > 0 && (
          <>
            <div className="mb-8 mt-12">
              <h2 className="text-3xl font-bold text-[#2b1c48] mb-6">People's Republic of China</h2>
              <div className="flex gap-2 mb-6">
                <div className="h-1 w-20 bg-[#5E366D] rounded-full animate-expand-width"></div>
                <div className="h-1 w-12 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {chinaData.map((member, index) => (
                <div 
                  key={`china-${index}`} 
                  id={toSlug(`${member.name}-${member.role}`)}
                  className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
                  data-index={`china-${index}`}
                  ref={(el) => {
                    if (el && observerRef.current) {
                      observerRef.current.observe(el);
                    }
                  }}
                >
                  <div className="relative mb-4 mx-auto rounded-xl w-full aspect-[5/6] overflow-hidden bg-gray-100 flex-shrink-0">
                    {/* Loading placeholder */}
                    {!loadedImages.has(`china-${index}`) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-gray-400 text-sm">Loading...</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Optimized image */}
                    <div className={`absolute inset-0 ${getImageHeight(member.name)}`}>
                      <Image
                        src={optimizeImageUrl(member.image, getImageWidth(), getImageQuality(index))}
                        alt={`${member.name} - ${member.role} at ${member.company}`}
                        fill
                        className={`object-cover ${getObjectPosition(member.name)} transition-opacity duration-500 ${
                          loadedImages.has(`china-${index}`) ? 'opacity-100' : 'opacity-0'
                        }`}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={getImageQuality(index)}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj"
                      onLoad={() => {
                        setLoadedImages(prev => {
                          const newSet = new Set([...prev, `china-${index}`]);
                          setLoadingStats(current => ({
                            ...current,
                            loaded: newSet.size
                          }));
                          return newSet;
                        });
                      }}
                        onError={() => {
                          // Fallback to original image if optimized version fails
                          const img = document.querySelector(`[alt="${member.name}"]`) as HTMLImageElement;
                          if (img) {
                            img.src = member.image;
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-[#2b1c48] mb-2 line-clamp-2">{member.name}</h3>
                    <div className="flex gap-2 mb-3">
                      <div className="h-1 w-16 bg-[#5E366D] rounded-full animate-expand-width"></div>
                      <div className="h-1 w-8 bg-[#EE8900] rounded-full animate-expand-width animation-delay-200"></div>
                    </div>
                    <p className="text-[#EE8900] font-semibold mb-2 text-sm sm:text-base line-clamp-2">{member.role}</p>
                    <p className="text-[#5E366D] font-medium text-base sm:text-lg line-clamp-1">{member.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
