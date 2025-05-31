"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react"

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.9 5.82s-.51.5 0 0z" />
    <path d="M19 10.5v4.6a7.1 7.1 0 11-7.1-7.1v4.6a2.5 2.5 0 102.5 2.5V5h4.6z" />
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[rgb(43,28,72)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: About */}
          <div className="space-y-6 flex items-center justify-center pt-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://res.cloudinary.com/dosxengut/image/upload/v1746802991/image_ummqsj.png"
                alt="Legend Holding Group"
                width={450}
                height={200}
                className="w-auto"
              />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative text-white">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="text-white/80 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  Our Business
                </Link>
              </li>
              <li>
                <Link
                  href="/newsroom"
                  className="text-white/80 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  Newsroom
                </Link>
              </li>
              <li>
                <Link 
                  href="/csr" 
                  className="text-white/80 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  CSR Initiatives
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white/80 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative text-white">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-secondary flex-shrink-0 mr-3 mt-1" />
                <span className="text-white/80">
                  Jebel Ali Freezone, Gate 5,
                  <br />
                  Legend Holding Group HQ
                  <br />
                  Dubai, United Arab Emirates
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-secondary flex-shrink-0 mr-3" />
                <Link href="tel:+97142340738" className="text-white/80 hover:text-white transition-colors">
                  +971 4 234 0738
                </Link>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-secondary flex-shrink-0 mr-3" />
                <Link href="mailto:info@legendholding.com" className="text-white/80 hover:text-white transition-colors">
                  info@legendholding.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative text-white">
              <span className="relative z-10">Connect With Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary"></span>
            </h3>
            <div className="flex items-center gap-6 mb-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors hover:scale-110"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors hover:scale-110"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors hover:scale-110"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors hover:scale-110"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors hover:scale-110"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors hover:scale-110"
              >
                <TikTokIcon size={20} />
              </Link>
            </div>
            {/* <p className="text-white/60 text-xs">
              Join our growing community of followers and be part of our journey towards excellence and innovation.
            </p> */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/70 text-sm mb-4 md:mb-0">
            © {currentYear} Legend Holding Group. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/privacy-policy" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-white/70 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-white/70 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
