"use client"

import Link from "next/link";
import { brandFont } from "../fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

const brands = [
  { name: "Legend Commercial Vehicles", path: "/our-brands/legend-commercial-vehicles" },
  { name: "Legend World Rent A Car", path: "/our-brands/legend-world-rent-a-car" },
  { name: "Zul Energy", path: "/our-brands/zul-energy" },
  { name: "Legend Automobile Services", path: "/our-brands/legend-automobile-services" },
  { name: "Legend Global Media", path: "/our-brands/legend-global-media" },
  { name: "Legend Green Energy", path: "/our-brands/legend-green-energy" },
  { name: "Legend Motorcycles", path: "/our-brands/legend-motorcycles" },
  { name: "Legend Motors Dealership", path: "/our-brands/legend-motors-dealership" },
  { name: "Legend Motors Trading", path: "/our-brands/legend-motors-trading" },
  { name: "Legend Travel", path: "/our-brands/legend-travel" },
  { name: "Legend Pre-Owned Vehicles", path: "/our-brands/legend-pre-owned-vehicles" },
  { name: "Legend Technical Services", path: "/our-brands/legend-technical-services" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 font-brand">
        <div className="max-w-7xl mx-auto px-4 py-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold mb-16 text-[rgb(43,28,72)]" 
            style={{ fontFamily: 'var(--heading-font)' }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Sitemap</h2>
            <div className="w-16 h-1 bg-[#EE8900] rounded-full mb-4"></div>
          </motion.h1>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Column 1: Main & Who We Are */}
            <motion.div variants={itemVariants}>
              <ul className="space-y-4">
                <li><Link href="/" className="text-secondary font-semibold text-lg hover:underline">Home</Link></li>
                <li className="mt-8 mb-2 text-secondary font-semibold text-lg">Who We Are</li>
                <li><Link href="/who-we-are/brand-story" className="text-gray-700 hover:text-secondary transition-colors">Brand Story</Link></li>
                <li><Link href="/who-we-are/vision-mission" className="text-gray-700 hover:text-secondary transition-colors">Vision & Mission</Link></li>
                <li><Link href="/who-we-are/the-team" className="text-gray-700 hover:text-secondary transition-colors">The Team</Link></li>
                <li><Link href="/who-we-are/journey" className="text-gray-700 hover:text-secondary transition-colors">Our Journey</Link></li>
                <li><Link href="/who-we-are/partners" className="text-gray-700 hover:text-secondary transition-colors">Partners</Link></li>
                <li><Link href="/who-we-are/csr" className="text-gray-700 hover:text-secondary transition-colors">CSR</Link></li>
              </ul>
            </motion.div>
            {/* Column 2: Our Brands */}
            <motion.div variants={itemVariants}>
              <div className="text-secondary font-semibold text-lg mb-4">Our Brands</div>
              <ul className="space-y-4">
                {brands.map((brand) => (
                  <li key={brand.path}>
                    <Link href={brand.path} className="text-gray-700 hover:text-secondary transition-colors">{brand.name}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Column 3: News, Careers, Contact */}
            <motion.div variants={itemVariants}>
              <ul className="space-y-4">
                <li><Link href="/news" className="text-secondary font-semibold text-lg hover:underline">News</Link></li>
                <li><Link href="/careers" className="text-secondary font-semibold text-lg hover:underline">Careers</Link></li>
                <li><Link href="/contact" className="text-secondary font-semibold text-lg hover:underline">Contact</Link></li>
              </ul>
            </motion.div>
            {/* Column 4: Policies & Legal */}
            <motion.div variants={itemVariants}>
              <ul className="space-y-4">
                <li><Link href="/privacy-policy" className="text-secondary font-semibold text-lg hover:underline">Privacy Policy</Link></li>
                <li><Link href="/cookie-policy" className="text-secondary font-semibold text-lg hover:underline">Cookie Policy</Link></li>
                {/* Add more legal/policy links as needed */}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 