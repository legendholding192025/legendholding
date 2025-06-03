"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-[#2B1C48] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Cookie Policy
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">What Are Cookies?</h2>
                  <p className="text-gray-600 mb-8">
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing site usage, and assisting with our marketing efforts.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Types of Cookies We Use</h2>
                  
                  <h3 className="text-xl font-semibold text-[#2B1C48] mb-4">Essential Cookies</h3>
                  <p className="text-gray-600 mb-6">
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                  </p>

                  <h3 className="text-xl font-semibold text-[#2B1C48] mb-4">Analytics Cookies</h3>
                  <p className="text-gray-600 mb-6">
                    We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's functionality and content.
                  </p>

                  <h3 className="text-xl font-semibold text-[#2B1C48] mb-4">Marketing Cookies</h3>
                  <p className="text-gray-600 mb-6">
                    These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Managing Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                  </p>
                  <p className="text-gray-600 mb-8">
                    However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Your Choices</h2>
                  <p className="text-gray-600 mb-8">
                    When you first visit our website, you'll be presented with a cookie banner where you can choose to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8">
                    <li>Accept all cookies</li>
                    <li>Decline non-essential cookies</li>
                    <li>Manage your preferences</li>
                  </ul>

                  <div className="bg-[rgb(234,226,214)]/30 border border-[#2B1C48]/10 rounded-xl p-6 mb-8">
                    <p className="text-gray-600 text-sm">
                      Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Link 
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-[#EE8900] text-white rounded-lg hover:bg-[#EE8900]/90 transition-colors duration-200"
                    >
                      Contact Us for More Information
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 