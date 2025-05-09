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
  ArrowRight,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/legend-logo-white.png"
                alt="Legend Holding Group"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Legend Holding Group is a diversified business conglomerate with interests spanning automotive, energy,
              facility management, travel, and technology sectors, committed to excellence and innovation.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-secondary group-hover:translate-x-1 transition-transform"
                  />
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/csr" className="text-gray-400 hover:text-white transition-colors flex items-center group">
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
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
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-secondary flex-shrink-0 mr-3 mt-1" />
                <span className="text-gray-400">
                  Legend Holding Group Headquarters
                  <br />
                  Sheikh Zayed Road, Dubai
                  <br />
                  United Arab Emirates
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-secondary flex-shrink-0 mr-3" />
                <Link href="tel:+97144123456" className="text-gray-400 hover:text-white transition-colors">
                  +971 4 412 3456
                </Link>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-secondary flex-shrink-0 mr-3" />
                <Link href="mailto:info@legendholding.com" className="text-gray-400 hover:text-white transition-colors">
                  info@legendholding.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Newsletter</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter to receive the latest updates and news.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white px-5 py-3 rounded-md transition-all duration-300 hover:shadow-lg flex items-center justify-center w-full"
              >
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Legend Holding Group. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-gray-500 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-gray-500 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
