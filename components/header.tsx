"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  X,
  ChevronRight,
  History,
  Users,
  Briefcase,
  Building2,
  Target,
  Heart,
  BookOpen,
  Award,
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
  hasNestedSubmenu?: boolean
  nestedSubmenu?: {
    title: string
    url: string
    description: string
  }[]
}

type BusinessCategory = {
  title: string
  description: string
  items: {
    title: string
    url: string
    image: string
    description: string
    hasNestedSubmenu?: boolean
    nestedSubmenu?: {
      title: string
      url: string
      description: string
    }[]
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
    url: "/who-we-are/about-us",
    hasSubmenu: true,
    submenu: [
      {
        title: "About Us",
        url: "/who-we-are/about-us",
        image: "https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg",
        description: "Discover our vision, mission, and the values that drive us forward."
      },
      // {
      //   title: "Company Profile",
      //   url: "/who-we-are/company-profile",
      //   image: "https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg",
      //   description: "Learn about our company profile, structure, and business overview."
      // },
      {
        title: "The Team",
        url: "/who-we-are/the-team",
        image: "https://cdn.legendholding.com/images/cdn_683e9ef4bd30c8.05897688_20250603_070628.jpg",
        description: "Meet the dedicated professionals behind our continued growth and innovation."
      },
      {
        title: "Our Journey",
        url: "/who-we-are/journey",
        image: "https://cdn.legendholding.com/images/cdn_68469aa7bb4020.42147442_20250609_082615.jpg",
        description: "Follow our path of growth and milestones through the years."
      }
    ],
  },
  {
    title: "Our Businesses",
    url: "#",
    hasSubmenu: true,
    businessCategories: [
      {
        title: "Our Businesses",
        description: "Discover our diverse portfolio of innovative brands across multiple sectors.",
        items: [
          { 
            title: "Legend Motors",
            url: "/our-businesses/legend-motors",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png",
            description: "Comprehensive automotive solutions and services.",
            hasNestedSubmenu: true,
            nestedSubmenu: [
              {
                title: "Legend Motors Trading",
                url: "/our-businesses/legend-motors-trading",
                description: "Premium automotive solutions and services."
              },
              {
                title: "Legend Motors Dealership",
                url: "/our-businesses/legend-motors-dealership",
                description: "Official dealership for premium automotive brands."
              },
              {
                title: "Legend Commercial Vehicles",
                url: "/our-businesses/legend-commercial-vehicles",
                description: "Comprehensive commercial vehicle solutions for businesses."
              },
              {
                title: "Legend AutoHub",
                url: "/our-businesses/legend-autohub",
                description: "Offering customers a wide selection of high-quality vehicles."
              }
            ]
          },
          { 
            title: "Legend Motorcycles",
            url: "/our-businesses/legend-motorcycles",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_legend_motorcycles.png",
            description: "Premium motorcycles and accessories."
          },
          { 
            title: "Legend Rent a Car",
            url: "/our-businesses/legend-world-rent-a-car",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da3d88d3185.41319420_20250602_131504.png",
            description: "Premium car rental services across UAE."
          },
          { 
            title: "Legend Auto Services",
            url: "/our-businesses/legend-auto-services",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683d9e25db0112.44798593_20250602_125045.jpg",
            description: "Professional automotive maintenance and repair services."
          },
          { 
            title: "Legend Global Media",
            url: "/our-businesses/legend-global-media",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683d9f42113ba5.78852919_20250602_125530.jpg",
            description: "Innovative media solutions for the digital age."
          },
          { 
            title: "Legend Travel and Tourism",
            url: "/our-businesses/legend-travel",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da36902ee20.33408729_20250602_131313.jpg",
            description: "Exceptional travel experiences and tourism services."
          },
          { 
            title: "Legend Green Energy Solutions",
            url: "/our-businesses/legend-green-energy",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683d9fb5d95276.90087674_20250602_125725.png",
            description: "Sustainable energy solutions for a greener future."
          },
          { 
            title: "Legend X",
            url: "/our-businesses/legend-x",
            image: "https://cdn.legendholding.com/images/cdn_687a1f4c67df37.03007310_20250718_101748.png",
            description: "Robotics company specialized in cutting-edge technology and AI-driven innovations."
          },
          { 
            title: "Legend Technical Services",
            url: "/our-businesses/legend-technical-services",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da2fc6fd9b2.48641261_20250602_131124.jpg",
            description: "World-class facilities management and technical solutions."
          },
          { 
            title: "Zul Energy",
            url: "/our-businesses/zul-energy",
            image: "https://cdn.legendholding.com/images/cloudinary/cloudinary_683da403178ef3.07284478_20250602_131547.jpg",
            description: "Pioneering sustainable energy solutions for a brighter future."
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

export function Header({ hideHeader = false }: { hideHeader?: boolean }) {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null)
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
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const headerRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const submenuTimeoutRef = useRef<TimeoutType | null>(null)
  const nestedSubmenuTimeoutRef = useRef<TimeoutType | null>(null)
  const searchTimeoutRef = useRef<TimeoutType | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredNestedItem, setHoveredNestedItem] = useState<string | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const menuItemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const legendMotorsRef = useRef<HTMLDivElement | null>(null)
  const [mobileNestedMenuOpen, setMobileNestedMenuOpen] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const isActivePath = (url: string): boolean => {
    if (!url || url === "#") return false
    if (url === "/") return pathname === "/"
    return pathname === url || pathname.startsWith(`${url}/`)
  }

  const isMenuItemActive = (item: MenuItem): boolean => {
    if (isActivePath(item.url)) return true
    if (item.submenu && item.submenu.some((sub) => isActivePath(sub.url))) return true
    if (item.businessCategories) {
      for (const category of item.businessCategories) {
        for (const business of category.items) {
          if (isActivePath(business.url)) return true
          if (business.nestedSubmenu && business.nestedSubmenu.some((n) => isActivePath(n.url))) return true
        }
      }
    }
    return false
  }

  // Handle scroll direction for header visibility
  useEffect(() => {
    const handleScroll = () => {
      // Don't handle scroll when any dropdown menu is open (except Who We Are)
      if (activeMenu && activeMenu !== "Who We Are") {
        return;
      }
      
      const st = window.scrollY;
      // Only handle header visibility if no menus are open or if Who We Are is open
      if ((!mobileMenuOpen && !activeMenu) || activeMenu === "Who We Are") {
        if (st > lastScrollTop && st > 100) {
          headerRef.current?.classList.add('-translate-y-full');
          setIsHeaderHidden(true);
        } else {
          headerRef.current?.classList.remove('-translate-y-full');
          setIsHeaderHidden(false);
        }
      }
      setLastScrollTop(st);
      setIsScrolled(st > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop, mobileMenuOpen, activeMenu]);

  // Prevent body scroll only when mobile menu is open (not for desktop dropdowns)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when header is hidden
  useEffect(() => {
    if (mobileMenuOpen && isHeaderHidden) {
      setMobileMenuOpen(false);
    }
  }, [mobileMenuOpen, isHeaderHidden]);

  // Close mobile dropdowns when mobile menu is closed
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileDropdownOpen(null);
      setMobileNestedMenuOpen(null);
    }
  }, [mobileMenuOpen]);

  // Manage body classes for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  // Remove click outside handler for mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveNestedMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  // Close menu on escape key - only for dropdowns
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setActiveNestedMenu(null);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  // Remove touch handlers for mobile menu
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!mobileMenuOpen) return;
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null || !mobileMenuOpen) return;
    const touchDiff = e.touches[0].clientY - touchStartY;
    if (touchDiff > 50) {
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

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current)
      }
      if (nestedSubmenuTimeoutRef.current) {
        clearTimeout(nestedSubmenuTimeoutRef.current)
      }
    }
  }, [])

  const handleMenuHover = (menuTitle: string, e?: React.MouseEvent) => {
    // Prevent any scroll behavior when opening dropdown
    const currentScrollY = window.scrollY;
    setHoveredItem(menuTitle);
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveMenu(menuTitle);
    
    // Ensure scroll position doesn't change
    requestAnimationFrame(() => {
      if (window.scrollY !== currentScrollY) {
        window.scrollTo(0, currentScrollY);
      }
    });
  };

  const handleMenuLeave = () => {
    setHoveredItem(null);
    if (!isMobile) {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
      submenuTimeoutRef.current = setTimeout(() => {
        // Only close the main menu if no nested menu is active
        if (!hoveredNestedItem && !activeNestedMenu) {
          setActiveMenu(null);
        }
      }, 300);
    }
  };

  const handleNestedMenuHover = (itemTitle: string) => {
    setHoveredNestedItem(itemTitle);
    if (nestedSubmenuTimeoutRef.current) {
      clearTimeout(nestedSubmenuTimeoutRef.current);
    }
    setActiveNestedMenu(itemTitle);
  };

  const handleNestedMenuLeave = () => {
    setHoveredNestedItem(null);
    if (nestedSubmenuTimeoutRef.current) {
      clearTimeout(nestedSubmenuTimeoutRef.current);
    }
    nestedSubmenuTimeoutRef.current = setTimeout(() => {
      setActiveNestedMenu(null);
      // Only close the main menu if we're not hovering over it
      if (!hoveredItem) {
        setActiveMenu(null);
      }
    }, 300);
  };

  const cancelMenuClose = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  const cancelNestedMenuClose = () => {
    if (nestedSubmenuTimeoutRef.current) {
      clearTimeout(nestedSubmenuTimeoutRef.current);
      nestedSubmenuTimeoutRef.current = null;
    }
  };

  // Function to get dropdown position for "Who We Are" menu
  const getDropdownPosition = (menuTitle: string) => {
    if (menuTitle === "Who We Are" || menuTitle === "Our Businesses") {
      const menuItemElement = menuItemRefs.current[menuTitle];
      if (menuItemElement) {
        const rect = menuItemElement.getBoundingClientRect();
        const menuItemCenter = rect.left + rect.width / 2;
        const dropdownWidth = menuTitle === "Who We Are" ? 192 : 192; // w-48 = 12rem = 192px
        const leftPosition = menuItemCenter - (dropdownWidth / 2) + (menuTitle === "Who We Are" ? 10 : 0); // Add 10px offset for Who We Are
        
        return {
          position: 'fixed' as const,
          top: isScrolled ? '70px' : '84px',
          left: `${leftPosition}px`,
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto' as const,
          transform: 'none' // Prevent any transform that might cause shifting
        };
      }
    }
    
    // Default positioning for other menus
    return {
      position: 'fixed' as const,
      top: isScrolled ? '70px' : '84px',
      maxHeight: 'calc(100vh - 80px)',
      overflowY: 'auto' as const,
    };
  };

  // Function to get nested dropdown position
  const getNestedDropdownPosition = () => {
    if (legendMotorsRef.current) {
      const rect = legendMotorsRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 224; // w-56 = 14rem = 224px
      
      // Check if there's enough space to the right
      const spaceRight = viewportWidth - rect.right;
      
      if (spaceRight >= dropdownWidth + 16) {
        // Position to the right with some margin
        return {
          position: 'fixed' as const,
          top: `${rect.top}px`,
          left: `${rect.right + 8}px`, // 8px gap between dropdowns
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto' as const,
        };
      } else {
        // Position to the left if not enough space on the right
        return {
          position: 'fixed' as const,
          top: `${rect.top}px`,
          left: `${rect.left - dropdownWidth - 8}px`, // 8px gap between dropdowns
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto' as const,
        };
      }
    }
    
    // Fallback positioning
    return {
      position: 'fixed' as const,
      top: isScrolled ? '70px' : '84px',
      left: '400px',
      maxHeight: 'calc(100vh - 80px)',
      overflowY: 'auto' as const,
    };
  };

  // Remove backdrop handling effect
  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [activeMenu]);

  return (
    <>
      {!hideHeader && (
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
            <div className="container mx-auto px-4 lg:px-6 xl:px-8">
              <div className="flex items-center justify-between relative h-12 md:h-16 lg:h-20">
                {/* Logo */}
                <Link 
                  href="/" 
                  className="relative z-[9999] flex-shrink-0"
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
                <nav className="hidden lg:flex items-center justify-center flex-1">
                  <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
                    {menuItems.map((item) => (
                      <div
                        key={item.title}
                        ref={(el) => {
                          menuItemRefs.current[item.title] = el;
                        }}
                        className="relative"
                        onMouseEnter={(e) => {
                          if (item.hasSubmenu) {
                            e.preventDefault();
                            handleMenuHover(item.title, e);
                          }
                        }}
                        onMouseLeave={handleMenuLeave}
                      >
                        <Link
                          href={item.url}
                          className={cn(
                            "text-gray-800 font-medium text-base hover:text-primary transition-colors duration-200 flex items-center py-2 px-1 relative group",
                            (activeMenu === item.title || hoveredItem === item.title) && "text-primary",
                            isMenuItemActive(item) && "text-primary",
                          )}
                          onClick={(e) => {
                            if (item.hasSubmenu) {
                              e.preventDefault();
                              // Toggle the dropdown on click
                              setActiveMenu(activeMenu === item.title ? null : item.title);
                            }
                          }}
                        >
                          <span className="relative">
                            {item.title}
                            <span
                              className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                                (activeMenu === item.title || hoveredItem === item.title) && "w-full",
                                isMenuItemActive(item) && "w-full",
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
                            className={cn(
                              "absolute top-full bg-white shadow-lg z-[9998] animate-submenu-slide-down",
                              item.title === "Who We Are" ? "w-48" : "w-screen"
                            )}
                            onMouseEnter={(e) => {
                              e.preventDefault();
                              cancelMenuClose();
                            }}
                            onMouseLeave={handleMenuLeave}
                            style={getDropdownPosition(item.title)}
                          >
                            {item.title === "Who We Are" ? (
                              <div className="w-full bg-white rounded-lg">
                                <div className="space-y-1 p-2">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.url}
                                      className={cn(
                                        "block px-5 py-3 text-sm hover:text-primary rounded-md transition-colors group",
                                        isActivePath(subItem.url) ? "text-primary" : "text-gray-700"
                                      )}
                                    >
                                      <span className="relative">
                                        {subItem.title}
                                        <span
                                          className={cn(
                                            "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                                            isActivePath(subItem.url) && "w-full"
                                          )}
                                        ></span>
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="container mx-auto py-8 px-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.url}
                                      className={cn(
                                        "group overflow-hidden rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-white",
                                        isActivePath(subItem.url) && "ring-1 ring-secondary"
                                      )}
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
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Our Business Submenu with Nested Legend Motors */}
                        {item.hasSubmenu && item.businessCategories && activeMenu === item.title && (
                          <div
                            className={cn(
                              "absolute top-full bg-white shadow-lg z-[9998] animate-submenu-slide-down",
                              "w-52"
                            )}
                            onMouseEnter={(e) => {
                              e.preventDefault();
                              cancelMenuClose();
                            }}
                            onMouseLeave={handleMenuLeave}
                            style={getDropdownPosition(item.title)}
                          >
                            <div className="w-full">
                              <div className="space-y-1 p-2">
                                {item.businessCategories[0].items.map((business) => (
                                  <div key={business.title} className="relative">
                                    {business.hasNestedSubmenu ? (
                                      <div
                                        ref={business.title === "Legend Motors" ? legendMotorsRef : null}
                                        className="relative"
                                        onMouseEnter={() => handleNestedMenuHover(business.title)}
                                        onMouseLeave={handleNestedMenuLeave}
                                      >
                                        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:text-primary rounded-md transition-colors group cursor-pointer">
                                          <span className="relative">
                                            {business.title}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                                          </span>
                                          <ChevronRight className={cn(
                                            "h-4 w-4 transition-transform duration-200",
                                            activeNestedMenu === business.title && "rotate-90"
                                          )} />
                                        </div>
                                      </div>
                                    ) : (
                                      <Link
                                        href={business.url}
                                        className={cn(
                                          "block px-4 py-3 text-sm hover:text-primary rounded-md transition-colors group",
                                          isActivePath(business.url) ? "text-primary" : "text-gray-700"
                                        )}
                                      >
                                        <span className="relative">
                                          {business.title}
                                          <span
                                            className={cn(
                                              "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                                              isActivePath(business.url) && "w-full"
                                            )}
                                          ></span>
                                        </span>
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Separate Nested submenu for Legend Motors - positioned independently */}
                        {activeNestedMenu === "Legend Motors" && (
                          <div
                            className="fixed bg-white shadow-lg z-[10000] w-52 animate-submenu-slide-down"
                            onMouseEnter={cancelNestedMenuClose}
                            onMouseLeave={handleNestedMenuLeave}
                            style={getNestedDropdownPosition()}
                          >
                            <div className="w-full bg-white rounded-lg">
                              <div className="space-y-1 p-2">
                                {menuItems
                                  .find(item => item.title === "Our Businesses")
                                  ?.businessCategories?.[0]
                                  .items.find(business => business.title === "Legend Motors")
                                  ?.nestedSubmenu?.map((nestedItem) => (
                                  <Link
                                    key={nestedItem.title}
                                    href={nestedItem.url}
                                    className={cn(
                                      "block px-4 py-3 text-sm hover:text-primary rounded-md transition-colors group",
                                      isActivePath(nestedItem.url) ? "text-primary" : "text-gray-700"
                                    )}
                                  >
                                    <span className="relative">
                                      {nestedItem.title}
                                      <span
                                        className={cn(
                                          "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                                          isActivePath(nestedItem.url) && "w-full"
                                        )}
                                      ></span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </header>

          {/* Mobile Navigation Menu - Slides in from top */}
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
            className={cn(
              "fixed bg-white z-[9998] lg:hidden",
              "transition-transform duration-300 ease-in-out",
              mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
              // Always cover full viewport
              "top-0 left-0 right-0 bottom-0 h-screen w-full"
            )}
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y pinch-zoom'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="h-full w-full flex flex-col">
              {/* Header spacer when header is visible */}
              {!isHeaderHidden && (
                <div className="h-[60px] flex-shrink-0" />
              )}
              
              {/* Regular Menu */}
              <div 
                className={cn(
                  "flex-1 w-full overflow-y-auto px-4 py-2",
                  "transition-opacity duration-300 delay-150",
                  mobileMenuOpen ? "opacity-100" : "opacity-0"
                )}
                style={{
                  minHeight: 0,
                  flex: 1
                }}
              >
                <nav className="flex flex-col space-y-1">
                  {menuItems.map((item) => (
                    <div 
                      key={item.title} 
                      className="border-b border-gray-100"
                    >
                      {item.hasSubmenu ? (
                        <div className="group">
                          <button
                            onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.title ? null : item.title)}
                            className="w-full flex justify-between items-center p-4 cursor-pointer"
                          >
                            <span className={cn("text-lg font-medium", isMenuItemActive(item) ? "text-primary" : "text-gray-800")}>{item.title}</span>
                            <ChevronDown className={cn(
                              "h-5 w-5 text-primary transition-transform duration-200",
                              mobileDropdownOpen === item.title && "rotate-180"
                            )} />
                          </button>

                          {mobileDropdownOpen === item.title && (
                            <div className="bg-gray-50 p-4">
                              {item.submenu && (
                                <div className="space-y-2">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.url}
                                      className="block p-3 rounded-lg hover:bg-gray-100"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <h3 className="text-base font-medium text-gray-800">{subItem.title}</h3>
                                    </Link>
                                  ))}
                                </div>
                              )}

                              {item.businessCategories && (
                                <div className="space-y-4">
                                  {item.businessCategories[0].items.map((business) => (
                                    <div key={business.title}>
                                      {business.hasNestedSubmenu ? (
                                        <div className="group">
                                          <button
                                            onClick={() => setMobileNestedMenuOpen(
                                              mobileNestedMenuOpen === business.title ? null : business.title
                                            )}
                                            className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                                          >
                                            <h3 className="text-base font-medium text-gray-800">{business.title}</h3>
                                            <ChevronRight className={cn(
                                              "h-4 w-4 text-primary transition-transform duration-200",
                                              mobileNestedMenuOpen === business.title && "rotate-90"
                                            )} />
                                          </button>
                                          {mobileNestedMenuOpen === business.title && (
                                            <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/20 space-y-2">
                                              {business.nestedSubmenu?.map((nestedItem) => (
                                                <Link
                                                  key={nestedItem.title}
                                                  href={nestedItem.url}
                                                  className="block p-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                                  onClick={() => setMobileMenuOpen(false)}
                                                >
                                                  <div className="font-medium">{nestedItem.title}</div>
                                                </Link>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <Link
                                          href={business.url}
                                          className="block p-3 rounded-lg hover:bg-gray-100"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          <h3 className="text-base font-medium text-gray-800">{business.title}</h3>
                                        </Link>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.url}
                          className={cn("block p-4 text-lg font-medium hover:bg-gray-50", isMenuItemActive(item) ? "text-primary" : "text-gray-800")}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile menu backdrop */}
          <div
            className={cn(
              "fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997] lg:hidden mobile-menu-backdrop",
              "transition-opacity duration-300",
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
        </>
      )}
    </>
  )
}