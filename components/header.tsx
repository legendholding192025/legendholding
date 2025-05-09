"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  Menu,
  X,
  History,
  Users,
  Briefcase,
  Handshake,
  Car,
  Building2,
  CarTaxiFront,
  Zap,
  Wrench,
  Plane,
  Cpu,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { useMediaQuery } from "@/hooks/use-media-query"

const logoUrl = "/images/legend-logo.png"

type SubMenuItem = {
  title: string
  url: string
  icon?: React.ReactNode
  image?: string
  description?: string
}

type BusinessCategory = {
  title: string
  icon: React.ReactNode
  image?: string
  description?: string
  items: SubMenuItem[]
}

type MenuItem = {
  title: string
  url: string
  hasSubmenu?: boolean
  submenu?: SubMenuItem[]
  businessCategories?: BusinessCategory[]
}

const menuItems: MenuItem[] = [
  {
    title: "About Us",
    url: "/about",
    hasSubmenu: true,
    submenu: [
      {
        title: "Our Journey",
        url: "/about/journey",
        icon: <History className="w-5 h-5" />,
        image: "/images/about/journey.png",
        description: "Discover the story of Legend Holding Group and our path to success.",
      },
      {
        title: "Our Team",
        url: "/about/team",
        icon: <Users className="w-5 h-5" />,
        image: "/images/about/team.png",
        description: "Meet the dedicated professionals behind our continued growth and innovation.",
      },
      {
        title: "Capabilities",
        url: "/about/capabilities",
        icon: <Briefcase className="w-5 h-5" />,
        image: "/images/about/capabilities.png",
        description: "Explore our diverse range of expertise across multiple industries.",
      },
      {
        title: "Partners",
        url: "/about/partners",
        icon: <Handshake className="w-5 h-5" />,
        image: "/images/about/partners.png",
        description: "Learn about our strategic partnerships that drive mutual success.",
      },
    ],
  },
  {
    title: "Our Business",
    url: "/business",
    hasSubmenu: true,
    businessCategories: [
      {
        title: "Automotive Trading",
        icon: <Car className="w-5 h-5" />,
        image: "/images/business/automotive-trading.png",
        description: "Premium automotive trading solutions with a focus on quality and customer satisfaction.",
        items: [
          { title: "Legend Motors", url: "/business/legend-motors" },
          { title: "Automatic Motors", url: "/business/automatic-motors" },
          { title: "Miramotors", url: "/business/miramotors" },
        ],
      },
      {
        title: "Dealerships",
        icon: <Building2 className="w-5 h-5" />,
        image: "/images/business/dealerships.png",
        description: "Authorized dealerships for premium automotive brands across the region.",
        items: [
          { title: "Skywell", url: "/business/skywell" },
          { title: "Kaiyi", url: "/business/kaiyi" },
          { title: "Li Auto", url: "/business/li-auto" },
          { title: "JIDU", url: "/business/jidu" },
          { title: "212", url: "/business/212" },
        ],
      },
      {
        title: "Automotive Rental",
        icon: <CarTaxiFront className="w-5 h-5" />,
        image: "/images/business/automotive-rental.png",
        description: "Flexible and reliable automotive rental services for all your transportation needs.",
        items: [{ title: "Rental Services", url: "/business/rental" }],
      },
      {
        title: "Energy",
        icon: <Zap className="w-5 h-5" />,
        image: "/images/business/energy.png",
        description: "Innovative energy solutions focused on sustainability and efficiency.",
        items: [{ title: "Energy Solutions", url: "/business/energy" }],
      },
      {
        title: "Facility Management",
        icon: <Wrench className="w-5 h-5" />,
        image: "/images/business/facility-management.png",
        description: "Comprehensive facility management services to optimize your operations.",
        items: [{ title: "Facility Services", url: "/business/facility" }],
      },
      {
        title: "Tours and Travels",
        icon: <Plane className="w-5 h-5" />,
        image: "/images/business/tours-travels.png",
        description: "Exceptional travel experiences with personalized service and attention to detail.",
        items: [{ title: "Travel Services", url: "/business/travel" }],
      },
      {
        title: "Technology",
        icon: <Cpu className="w-5 h-5" />,
        image: "/images/business/technology.png",
        description: "Cutting-edge technology solutions to drive digital transformation and innovation.",
        items: [{ title: "Tech Solutions", url: "/business/technology" }],
      },
    ],
  },
  {
    title: "Newsroom",
    url: "/newsroom",
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
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const headerRef = useRef<HTMLElement>(null)
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3 md:py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <Image
            src={logoUrl || "/placeholder.svg"}
            alt="Legend Holding Group"
            width={180}
            height={60}
            className="h-8 md:h-10 lg:h-12 w-auto"
            priority
          />
        </Link>

        <button
          className="lg:hidden text-primary focus:outline-none p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

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
                  className="fixed left-0 right-0 top-[calc(100%_+_1px)] bg-white shadow-md border-t-2 border-primary z-50 animate-submenu-slide-down max-h-[80vh] overflow-y-auto"
                  onMouseEnter={cancelMenuClose}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="container mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          className="group overflow-hidden rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={subItem.image || "/placeholder.svg?height=160&width=320&query=corporate office"}
                              alt={subItem.title}
                              width={320}
                              height={160}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 flex items-center space-x-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                {subItem.icon}
                              </div>
                              <h3 className="text-white font-semibold text-lg">{subItem.title}</h3>
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
                  className="fixed left-0 right-0 top-[calc(100%_+_1px)] bg-white shadow-md border-t-2 border-primary z-50 animate-submenu-slide-down max-h-[80vh] overflow-y-auto"
                  onMouseEnter={cancelMenuClose}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="container mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {item.businessCategories.map((category) => (
                        <div
                          key={category.title}
                          className="overflow-hidden rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={category.image || "/placeholder.svg?height=160&width=320&query=business"}
                              alt={category.title}
                              width={320}
                              height={160}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 flex items-center space-x-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                {category.icon}
                              </div>
                              <h3 className="text-white font-semibold text-lg">{category.title}</h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                            <div className="space-y-1">
                              {category.items.map((business) => (
                                <Link
                                  key={business.title}
                                  href={business.url}
                                  className="text-gray-700 hover:text-secondary transition-colors duration-200 py-1 flex items-center group/item"
                                >
                                  <ChevronRight className="h-4 w-4 mr-1 text-gray-400 group-hover/item:text-secondary transition-colors duration-200" />
                                  <span>{business.title}</span>
                                </Link>
                              ))}
                            </div>
                            <Link
                              href={`/business/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                              className="mt-4 inline-flex items-center text-primary font-medium text-sm hover:text-secondary transition-colors duration-200"
                            >
                              <span>View all</span>
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base md:px-6"
          >
            Get in Touch
          </Link>
        </nav>

        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
            mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
          )}
        >
          <div className="container mx-auto px-4 pt-20 pb-16 h-full overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <div key={item.title} className="border-b border-gray-100 pb-4">
                  {item.hasSubmenu ? (
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 -mx-3 rounded-lg hover:bg-gray-50">
                        <span className="text-lg md:text-xl font-medium text-gray-800">{item.title}</span>
                        <ChevronDown className="h-5 w-5 text-primary group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="mt-4 pl-2 md:pl-4 space-y-4">
                        {item.submenu && (
                          <div className="grid grid-cols-1 gap-4">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.url}
                                className="block rounded-lg overflow-hidden border border-gray-100"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className="relative h-32">
                                  <Image
                                    src={
                                      subItem.image || "/placeholder.svg?height=128&width=256&query=corporate office"
                                    }
                                    alt={subItem.title}
                                    width={256}
                                    height={128}
                                    className="object-cover w-full h-full"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                  <div className="absolute bottom-0 left-0 p-3 flex items-center space-x-2">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                      {subItem.icon}
                                    </div>
                                    <h3 className="text-white font-semibold">{subItem.title}</h3>
                                  </div>
                                </div>
                                <div className="p-3">
                                  <p className="text-gray-600 text-sm line-clamp-2">{subItem.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {item.businessCategories && (
                          <div className="grid grid-cols-1 gap-4">
                            {item.businessCategories.map((category) => (
                              <div key={category.title} className="rounded-lg overflow-hidden border border-gray-100">
                                <div className="relative h-32">
                                  <Image
                                    src={category.image || "/placeholder.svg?height=128&width=256&query=business"}
                                    alt={category.title}
                                    width={256}
                                    height={128}
                                    className="object-cover w-full h-full"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                  <div className="absolute bottom-0 left-0 p-3 flex items-center space-x-2">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                      {category.icon}
                                    </div>
                                    <h3 className="text-white font-semibold">{category.title}</h3>
                                  </div>
                                </div>
                                <div className="p-3">
                                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{category.description}</p>
                                  <div className="space-y-1">
                                    {category.items.map((business) => (
                                      <Link
                                        key={business.title}
                                        href={business.url}
                                        className="text-gray-700 hover:text-secondary transition-colors duration-200 py-1 flex items-center text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <ChevronRight className="h-3 w-3 mr-1 text-gray-400" />
                                        <span>{business.title}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-lg md:text-xl font-medium text-gray-800 hover:text-primary transition-colors duration-200 block p-3 -mx-3 rounded-lg hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-all duration-300 text-center font-medium text-lg shadow-md mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </nav>
          </div>

          <button
            className="absolute top-4 right-4 text-primary focus:outline-none p-2 bg-white/80 backdrop-blur-sm rounded-full"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
