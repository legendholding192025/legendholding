"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export default function CookiePolicyPage() {
  const [expandedSections, setExpandedSections] = useState({
    essential: true,
    analytics: true,
    marketing: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      <Header />
      <main className="pt-20 font-effra">
        {/* Hero Section */}
        <section className="bg-[#5E366D] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-brand"
              >
                Cookie Policy
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Last Updated */}
              <div className="text-sm text-gray-500 mb-8">
                Last Updated: December 29, 2025
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#2B1C48] mb-8">Cookie Policy</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  This Cookie Policy explains how Legend Holding Group uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">What are Cookies?</h2>
                <p className="text-gray-600 mb-8">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">Types of Cookies We Use</h2>
                <div className="space-y-6 mb-8">
                  <div>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('essential')}
                    >
                      <h3 className="text-xl font-semibold text-[#2B1C48] mb-2">Essential Cookies</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {expandedSections.essential ? (
                          <Minus className="w-5 h-5 text-[#2B1C48]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2B1C48]" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600">These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.</p>
                    {expandedSections.essential && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2">Cookie Name</th>
                              <th className="border p-2">Provider</th>
                              <th className="border p-2">Duration</th>
                              <th className="border p-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">uc_consent</td>
                              <td className="border p-2">Usercentrics</td>
                              <td className="border p-2">365 days</td>
                              <td className="border p-2">Stores user's cookie consent preferences</td>
                            </tr>
                            <tr>
                              <td className="border p-2">cloudinary</td>
                              <td className="border p-2">Cloudinary</td>
                              <td className="border p-2">Session</td>
                              <td className="border p-2">Image delivery and CDN optimization</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('analytics')}
                    >
                      <h3 className="text-xl font-semibold text-[#2B1C48] mb-2">Analytics Cookies</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {expandedSections.analytics ? (
                          <Minus className="w-5 h-5 text-[#2B1C48]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2B1C48]" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                    {expandedSections.analytics && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2">Cookie Name</th>
                              <th className="border p-2">Provider</th>
                              <th className="border p-2">Duration</th>
                              <th className="border p-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">_ga</td>
                              <td className="border p-2">Google Analytics</td>
                              <td className="border p-2">365 days</td>
                              <td className="border p-2">Distinguishes unique users</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gid</td>
                              <td className="border p-2">Google Analytics</td>
                              <td className="border p-2">24 hours</td>
                              <td className="border p-2">Identifies returning users</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gat</td>
                              <td className="border p-2">Google Analytics</td>
                              <td className="border p-2">1 minute</td>
                              <td className="border p-2">Controls request rate</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gtag</td>
                              <td className="border p-2">Google Tag Manager</td>
                              <td className="border p-2">Session</td>
                              <td className="border p-2">Tag management and tracking</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gtm</td>
                              <td className="border p-2">Google Tag Manager</td>
                              <td className="border p-2">Session</td>
                              <td className="border p-2">Tag management configuration</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('marketing')}
                    >
                      <h3 className="text-xl font-semibold text-[#2B1C48] mb-2">Marketing Cookies</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {expandedSections.marketing ? (
                          <Minus className="w-5 h-5 text-[#2B1C48]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2B1C48]" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600">These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.</p>
                    {expandedSections.marketing && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2">Cookie Name</th>
                              <th className="border p-2">Provider</th>
                              <th className="border p-2">Duration</th>
                              <th className="border p-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">_fbp</td>
                              <td className="border p-2">Facebook</td>
                              <td className="border p-2">90 days</td>
                              <td className="border p-2">Facebook advertising tracking</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gcl_au</td>
                              <td className="border p-2">Google Adsense</td>
                              <td className="border p-2">90 days</td>
                              <td className="border p-2">Google Ads conversion tracking</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_tt_</td>
                              <td className="border p-2">TikTok</td>
                              <td className="border p-2">365 days</td>
                              <td className="border p-2">TikTok advertising tracking</td>
                            </tr>
                            <tr>
                              <td className="border p-2">sc_at</td>
                              <td className="border p-2">Snapchat</td>
                              <td className="border p-2">365 days</td>
                              <td className="border p-2">Snapchat pixel tracking</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">How to Control Cookies</h2>
                <p className="text-gray-600 mb-8">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                </p>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 mb-8">
                  We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 