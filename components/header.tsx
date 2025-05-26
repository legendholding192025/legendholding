"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  X,
  ChevronRight,
  History,
  Users,
  Briefcase,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const logoUrl = "/images/legend-logo.png"

// Add ReturnType<typeof setTimeout> type for timeouts
type TimeoutType = ReturnType<typeof setTimeout>;

type SubMenuItem = {
  title: string
  url: string
  image: string
  description: string
  icon?: React.ReactNode
}

type BusinessCategory = {
  title: string
  description: string
  items: {
    title: string
    url: string
    image: string
    description: string
  }[]
}

// No additional types needed for simplified menu structure

type MenuItem = {
  title: string
  url: string
  hasSubmenu?: boolean
  submenu?: SubMenuItem[]
  businessCategories?: BusinessCategory[]
}

const menuItems: MenuItem[] = [
  {
    title: "Who We Are",
    url: "/who-we-are",
    hasSubmenu: true,
    submenu: [
      {
        title: "Vision, Mission & Values",
        url: "/who-we-are/vision-mission",
        image: "https://res.cloudinary.com/dosxengut/image/upload/v1747649702/mission-values-lead_ch3qfe.webp",
        description: "Discover our vision, mission, and the values that drive us forward.",
        icon: <History className="w-5 h-5" />
      },
      {
        title: "The Team",
        url: "/who-we-are/the-team",
        image: "https://res.cloudinary.com/dosxengut/image/upload/v1747650256/1744992098296_cqtkjo.jpg",
        description: "Meet the dedicated professionals behind our continued growth and innovation.",
        icon: <Users className="w-5 h-5" />
      },
      {
        title: "Brand Story",
        url: "/who-we-are/brand-story",
        image: "https://res.cloudinary.com/dosxengut/image/upload/v1747649828/lumo-with-logo_crratq.png",
        description: "Explore our journey and the story behind our brand.",
        icon: <Briefcase className="w-5 h-5" />
      },
      {
        title: "Our Journey",
        url: "/who-we-are/journey",
        image: "https://res.cloudinary.com/dosxengut/image/upload/v1747650381/1746961012298_hxmgin.jpg",
        description: "Follow our path of growth and milestones through the years.",
        icon: <History className="w-5 h-5" />
      },
      {
        title: "CSR",
        url: "/who-we-are/csr",
        image: "https://res.cloudinary.com/dosxengut/image/upload/v1746797713/blog-corporate-social-responsibility-program_olhz5m.webp",
        description: "Our commitment to corporate social responsibility and community impact.",
        icon: <Building2 className="w-5 h-5" />
      },
    ],
  },
  {
    title: "Our Brands",
    url: "/business",
    hasSubmenu: true,
    businessCategories: [
      {
        title: "Our Brands",
        description: "Discover our diverse portfolio of innovative brands across multiple sectors.",
        items: [
          { 
            title: "Zul Energy",
            url: "/our-brands/zul-energy",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747645931/1681896024283_sl22tw.jpg",
            description: "Pioneering sustainable energy solutions for a brighter future."
          },
          { 
            title: "Legend Motors",
            url: "/our-brands/legend-motors-trading",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747649304/Official-Car-Dealers-in-Dubai-Cover-180620210841_ldmnuq.jpg",
            description: "Premium automotive solutions and services."
          },
          { 
            title: "Legend Motors Dealership",
            url: "/our-brands/legend-motors-dealership",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747649304/Official-Car-Dealers-in-Dubai-Cover-180620210841_ldmnuq.jpg",
            description: "Official dealership for premium automotive brands."
          },
          { 
            title: "Legend Motorcycles",
            url: "/our-brands/legend-motorcycles",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747660840/Lifan-Logo_behsab.png",
            description: "Premium motorcycles and accessories."
          },
          { 
            title: "Legend World Rent a Car",
            url: "/our-brands/legend-world-rent-a-car",
            image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748247935/rent-a-car_dyzdgk.png",
            description: "Premium car rental services across UAE."
          },
          { 
            title: "Legend Automobile Services",
            url: "/our-brands/legend-automobile-services",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648445/csm_cruising_visual_43e29fa7bb_ruiloc.jpg",
            description: "Professional automotive maintenance and repair services."
          },
          { 
            title: "Legend Technical Services",
            url: "/our-brands/legend-technical-services",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648530/Stock_Photo_Digital_Media_otoogv.jpg",
            description: "Expert technical solutions and support services."
          },
          { 
            title: "Legend Global Media",
            url: "/our-brands/legend-global-media",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648530/Stock_Photo_Digital_Media_otoogv.jpg",
            description: "Innovative media solutions for the digital age."
          },
          { 
            title: "Legend Travel and Tourism",
            url: "/our-brands/legend-travel",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648726/bliss_travels_and_tours_cover_p7t8ma.jpg",
            description: "Exceptional travel experiences and tourism services."
          },
          { 
            title: "Legend Green Energy Solutions",
            url: "/our-brands/legend-green-energy",
            image: "https://res.cloudinary.com/dosxengut/image/upload/v1747648852/in-copy-about-charging-green_qjoyjk.jpg",
            description: "Sustainable energy solutions for a greener future."
          },
        ],
      },
    ],
  },
  {
    title: "Newsroom",
    url: "/news",
  },
  {
    title: "Careers",
    url: "/careers",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
]

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<{
    menuItems: typeof menuItems,
    brands: {
      category: string;
      items: SubMenuItem[];
    }[];
  } | null>(null)
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const headerRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const submenuTimeoutRef = useRef<TimeoutType | null>(null)
  const searchTimeoutRef = useRef<TimeoutType | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  // Handle scroll direction for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      if (st > lastScrollTop && st > 100) {
        // Scrolling down & past threshold - hide header
        headerRef.current?.classList.add('-translate-y-full');
      } else {
        // Scrolling up or at top - show header
        headerRef.current?.classList.remove('-translate-y-full');
      }
      setLastScrollTop(st);
      setIsScrolled(st > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  // Handle touch events for swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const touchDiff = e.touches[0].clientY - touchStartY;
    if (touchDiff > 50) { // Swipe down threshold
      setMobileMenuOpen(false);
      setTouchStartY(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
  };

  // Focus trap for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      const focusableElements = headerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };
        
        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
      }
    }
  }, [mobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveMenu(null);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      if (query.trim() === "") {
        setSearchResults(null);
        return;
      }

      const searchTerms = query.toLowerCase().split(" ");
      
      // Search through main menu items
      const filteredMenuItems = menuItems.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
        if (titleMatch) return true;

        // Search through submenu items
        if (item.submenu) {
          return item.submenu.some(subItem => 
            subItem.title.toLowerCase().includes(query.toLowerCase()) ||
            (subItem.description && subItem.description.toLowerCase().includes(query.toLowerCase()))
          );
        }

        // Search through business categories
        if (item.businessCategories) {
          return item.businessCategories.some(category =>
            category.items.some(business =>
              business.title.toLowerCase().includes(query.toLowerCase())
            )
          );
        }

        return false;
      });

      // Search through brands specifically
      const brandResults = menuItems
        .filter(item => item.businessCategories)
        .map(item => item.businessCategories![0])
        .map(category => ({
          category: category.title,
          items: category.items.filter(business =>
            searchTerms.every(term =>
              business.title.toLowerCase().includes(term)
            )
          )
        }))
        .filter(result => result.items.length > 0);

      setSearchResults({
        menuItems: filteredMenuItems,
        brands: brandResults
      });
    }, 300); // Debounce delay
  };

  // Clear search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, mobileMenuOpen])

  // Handle clicks outside the header to close the submenu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMenu]);

  const handleMenuHover = (menuTitle: string) => {
    // Set the hovered item immediately for visual feedback
    setHoveredItem(menuTitle)

    // Clear any existing timeout
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
      submenuTimeoutRef.current = null
    }

    // Set active menu with a slight delay to prevent accidental triggers
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(menuTitle)
    }, 100)
  }

  const handleMenuLeave = () => {
    // Clear hovered state immediately
    setHoveredItem(null)

    if (!isMobile) {
      // Add a longer delay before closing the submenu
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current)
      }

      submenuTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null)
      }, 300)
    }
  }

  const cancelMenuClose = () => {
    setHoveredItem(activeMenu)
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
      submenuTimeoutRef.current = null
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 w-full z-[9999]",
          "transition-all duration-300 transform",
          "touch-pan-y",
          isScrolled ? "bg-white shadow-md py-2" : "bg-white py-3 md:py-4",
          mobileMenuOpen && "bg-white py-2"
        )}
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between relative h-12 md:h-16 lg:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-[9999]"
            >
              <Image
                src={logoUrl || "/placeholder.svg"}
                alt="Legend Holding Group"
                width={280}
                height={100}
                className="h-12 md:h-16 lg:h-20 w-auto"
                priority
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden text-primary focus:outline-none relative z-[9999]",
                "w-10 h-10 flex items-center justify-center",
                "rounded-lg hover:bg-gray-100 active:bg-gray-200",
                "transition-colors duration-200"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 rounded-full bg-current transition-all duration-300",
                    mobileMenuOpen ? "top-2.5 w-6 -rotate-45" : "top-2 w-6"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 rounded-full bg-current transition-all duration-300",
                    mobileMenuOpen ? "top-2.5 w-6 rotate-45" : "top-4 w-4"
                  )}
                />
              </div>
            </button>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.hasSubmenu && handleMenuHover(item.title)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={item.url}
                    className={cn(
                      "text-gray-800 font-medium text-base hover:text-primary transition-colors duration-200 flex items-center py-2 px-1 relative group",
                      (activeMenu === item.title || hoveredItem === item.title) && "text-primary",
                    )}
                  >
                    <span className="relative">
                      {item.title}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                          (activeMenu === item.title || hoveredItem === item.title) && "w-full",
                        )}
                      ></span>
                    </span>
                    {item.hasSubmenu && (
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-200",
                          activeMenu === item.title && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {/* About Us Submenu with Images */}
                  {item.hasSubmenu && item.submenu && activeMenu === item.title && (
                    <div
                      className="absolute left-0 right-0 top-full bg-white shadow-lg z-[9998] animate-submenu-slide-down w-screen"
                      onMouseEnter={cancelMenuClose}
                      onMouseLeave={handleMenuLeave}
                      style={{
                        position: 'fixed',
                        top: isScrolled ? '70px' : '84px',
                        maxHeight: 'calc(100vh - 80px)',
                        overflowY: 'auto'
                      }}
                    >
                      <div className="container mx-auto py-8 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.url}
                              className="group overflow-hidden rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-[rgb(234,226,214)]"
                            >
                              <div className="relative h-40 overflow-hidden">
                                <Image
                                  src={subItem.image}
                                  alt={subItem.title}
                                  width={320}
                                  height={160}
                                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4">
                                  <h3 className="text-base font-semibold text-white">{subItem.title}</h3>
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-gray-600 text-sm">{subItem.description}</p>
                                <div className="mt-3 flex items-center text-secondary font-medium text-sm">
                                  <span>Learn more</span>
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Our Business Submenu with Images */}
                  {item.hasSubmenu && item.businessCategories && activeMenu === item.title && (
                    <div
                      className="absolute left-0 right-0 top-full bg-white shadow-lg z-[9998] animate-submenu-slide-down w-screen"
                      onMouseEnter={cancelMenuClose}
                      onMouseLeave={handleMenuLeave}
                      style={{
                        position: 'fixed',
                        top: isScrolled ? '70px' : '84px',
                        maxHeight: 'calc(100vh - 80px)',
                        overflowY: 'auto'
                      }}
                    >
                      <div className="container mx-auto py-6 px-4 md:py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                          {item.businessCategories[0].items.map((business) => (
                            <div key={business.title} className="relative group">
                              <Link
                                href={business.url}
                                className="block overflow-hidden rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-[rgb(234,226,214)] h-full"
                              >
                                <div className="relative h-40 overflow-hidden">
                                  <Image
                                    src={business.image}
                                    alt={business.title}
                                    width={320}
                                    height={180}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-base font-semibold text-white">{business.title}</h3>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <p className="text-gray-600 text-sm">{business.description}</p>
                                  <div className="mt-3 flex items-center text-secondary font-medium text-sm">
                                    <span>Learn more</span>
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </div>
                                </div>
                              </Link>

                              {/* Legend Mobility Services Popup */}
                              {business.title === "Legend Mobility" && (
                                <div className="absolute z-[9999] transition-all duration-300 lg:left-full lg:top-0 lg:ml-2 lg:opacity-0 lg:invisible group-hover:opacity-100 group-hover:visible w-[300px] lg:w-[400px]">
                                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-3 md:p-4 space-y-1 md:space-y-2 w-full">
                                    <div className="flex items-center justify-end border-b border-gray-100 pb-2 mb-2 md:mb-3">
                                      <Image
                                        src="/images/legend-logo.png"
                                        alt="Legend Logo"
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                      />
                                    </div>
                                    {[
                                      "Legend World Rent a Car",
                                      "Legend Automobile Services",
                                      "Legend Technical Services"
                                    ].map((service, index) => (
                                      <Link
                                        key={index}
                                        href={`/our-brands/${service.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="flex items-center text-gray-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-50 group/item text-sm md:text-base"
                                      >
                                        <ChevronRight className="w-4 h-4 mr-2 group-hover/item:translate-x-1 transition-transform" />
                                        <span>{service}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* No submenu for Legend Motors */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Menu - Slides in from top */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation menu"
          className={cn(
            "fixed inset-0 bg-white z-[9998] lg:hidden",
            "transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
          )}
          style={{
            top: '60px', // Height of the header
            height: 'calc(100vh - 60px)',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y pinch-zoom'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="h-full flex flex-col">
            {/* Search Bar */}
            <div 
              className={cn(
                "px-4 py-3 bg-white border-b border-gray-100",
                "transition-opacity duration-300",
                mobileMenuOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search menu items and brands..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    "text-base appearance-none",
                    "transition-all duration-200",
                    isSearchFocused ? "bg-white" : "bg-gray-50"
                  )}
                  aria-label="Search menu items and brands"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
                  onClick={() => {
                    searchInputRef.current?.focus();
                    setSearchQuery("");
                    setSearchResults(null);
                  }}
                  aria-label={searchQuery ? "Clear search" : "Focus search"}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  {searchQuery ? (
                    <X className="h-5 w-5 text-gray-400" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Search Results or Regular Menu */}
            <div 
              className={cn(
                "flex-1 overflow-y-auto px-4 py-2",
                "transition-opacity duration-300 delay-150",
                mobileMenuOpen ? "opacity-100" : "opacity-0"
              )}
            >
              {searchResults ? (
                // Search Results
                <div className="space-y-6">
                  {/* Menu Item Results */}
                  {searchResults.menuItems.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-500 px-1">Menu Items</h3>
                      <nav className="flex flex-col space-y-1">
                        {searchResults.menuItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.url}
                            className={cn(
                              "flex items-center p-4 rounded-lg",
                              "text-base font-medium text-gray-800",
                              "hover:bg-gray-50 active:bg-gray-100",
                              "transition-colors duration-200"
                            )}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setSearchQuery("");
                              setSearchResults(null);
                            }}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* Brand Results */}
                  {searchResults.brands.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-500 px-1">Brands</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {searchResults.brands.map(category => 
                          category.items.map(brand => (
                            <Link
                              key={brand.title}
                              href={brand.url}
                              className="block overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setSearchQuery("");
                                setSearchResults(null);
                              }}
                            >
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                  src={brand.image}
                                  alt={brand.title}
                                  fill
                                  className="object-cover transition-transform duration-300 hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <h4 className="text-lg font-semibold text-white mb-1">
                                    {brand.title}
                                  </h4>
                                  {brand.description && (
                                    <p className="text-sm text-white/90 line-clamp-2">
                                      {brand.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {searchResults && searchResults.menuItems.length === 0 && searchResults.brands.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              ) : (
                // Regular Menu Items
                <nav className="flex flex-col space-y-1">
                  {menuItems.map((item) => (
                    <div 
                      key={item.title} 
                      className="border-b border-gray-100"
                    >
                      {item.hasSubmenu ? (
                        <details 
                          className="group" 
                          open={activeMenu === item.title}
                        >
                          <summary 
                            className="flex justify-between items-center p-4 cursor-pointer"
                          >
                            <span className="text-lg font-medium text-gray-800">{item.title}</span>
                            <ChevronDown className="h-5 w-5 text-primary" />
                          </summary>

                          <div className="bg-gray-50 p-4">
                            {item.submenu && (
                              <div className="space-y-2">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.title}
                                    href={subItem.url}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                      {subItem.icon}
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-gray-800">{subItem.title}</h3>
                                      <p className="text-sm text-gray-500">{subItem.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}

                            {item.businessCategories && (
                              <div className="space-y-4">
                                {item.businessCategories[0].items.map((business) => (
                                  <div key={business.title}>
                                    <Link
                                      href={business.url}
                                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Building2 className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-gray-800">{business.title}</h3>
                                        <p className="text-sm text-gray-500">{business.description}</p>
                                      </div>
                                    </Link>

                                    {/* Legend Mobility Submenu */}
                                    {business.title === "Legend Mobility" && (
                                      <div className="mt-2 ml-12 pl-4 border-l-2 border-primary/20 space-y-2">
                                        {[
                                          "Legend World Rent a Car",
                                          "Legend Automobile Services",
                                          "Legend Technical Services"
                                        ].map((service, index) => (
                                          <Link
                                            key={index}
                                            href={`/our-brands/${service.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="flex items-center space-x-2 p-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                            <span>{service}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    )}

                                    {/* No submenu for Legend Motors */}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </details>
                      ) : (
                        <Link
                          href={item.url}
                          className="block p-4 text-lg font-medium text-gray-800 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Dimming Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997] lg:hidden",
          "transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
