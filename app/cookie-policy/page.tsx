"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export default function CookiePolicyPage() {
  const [expandedSections, setExpandedSections] = useState({
    essential: false,
    analytics: false,
    marketing: false
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
                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Introduction</h2>
                  <p className="text-gray-600 mb-8">
                    Legend Holding Group ("we," "our," or "us") is committed to protecting your privacy and ensuring you have a positive experience on our website. This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website at www.legendholding.com. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">What Are Cookies?</h2>
                  <p className="text-gray-600 mb-8">
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Legend Holding Group) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Why Do We Use Cookies?</h2>
                  <p className="text-gray-600 mb-8">
                    We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for analytics and other purposes.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Types of Cookies We Use</h2>
                  
                  <div className="mb-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('essential')}
                    >
                      <h3 className="text-xl font-semibold text-[#2B1C48]">Essential Cookies</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {expandedSections.essential ? (
                          <Minus className="w-5 h-5 text-[#2B1C48]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2B1C48]" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">
                      These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
                    </p>
                    {expandedSections.essential && (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2">Cookie Name</th>
                              <th className="border p-2">Provider</th>
                              <th className="border p-2">Expiry</th>
                              <th className="border p-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">uc_consent</td>
                              <td className="border p-2">Usercentrics</td>
                              <td className="border p-2">1 year</td>
                              <td className="border p-2">Stores user's cookie consent preferences and settings</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_cf_bm</td>
                              <td className="border p-2">Cloudflare</td>
                              <td className="border p-2">30 minutes</td>
                              <td className="border p-2">Bot protection and security measures</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('analytics')}
                    >
                      <h3 className="text-xl font-semibold text-[#2B1C48]">Analytics and Performance Cookies</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {expandedSections.analytics ? (
                          <Minus className="w-5 h-5 text-[#2B1C48]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2B1C48]" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">
                      These cookies are used to collect information about traffic to our website and how users use our website. The information gathered does not identify any individual visitor. The information is aggregated and therefore anonymous. It includes the number of visitors to our website, the websites that referred them to our website, the pages they visited on our website, what time of day they visited our website, whether they have visited our website before, and other similar information.
                    </p>
                    {expandedSections.analytics && (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2">Cookie Name</th>
                              <th className="border p-2">Provider</th>
                              <th className="border p-2">Expiry</th>
                              <th className="border p-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">_ga</td>
                              <td className="border p-2">Google Analytics</td>
                              <td className="border p-2">2 years</td>
                              <td className="border p-2">Distinguishes unique users and tracks user behavior</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gid</td>
                              <td className="border p-2">Google Analytics</td>
                              <td className="border p-2">24 hours</td>
                              <td className="border p-2">Identifies returning users and their session</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gat</td>
                              <td className="border p-2">Google Analytics</td>
                              <td className="border p-2">1 minute</td>
                              <td className="border p-2">Controls request rate and prevents overloading</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('marketing')}
                    >
                      <h3 className="text-xl font-semibold text-[#2B1C48]">Marketing and Advertising Cookies</h3>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        {expandedSections.marketing ? (
                          <Minus className="w-5 h-5 text-[#2B1C48]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2B1C48]" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">
                      These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
                    </p>
                    {expandedSections.marketing && (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2">Cookie Name</th>
                              <th className="border p-2">Provider</th>
                              <th className="border p-2">Expiry</th>
                              <th className="border p-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">_fbp</td>
                              <td className="border p-2">Facebook</td>
                              <td className="border p-2">3 months</td>
                              <td className="border p-2">Tracks user behavior for Facebook advertising</td>
                            </tr>
                            <tr>
                              <td className="border p-2">_gcl_au</td>
                              <td className="border p-2">Google Adsense</td>
                              <td className="border p-2">3 months</td>
                              <td className="border p-2">Tracks conversions for Google Ads</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">How Can You Control Cookies?</h2>
                  <p className="text-gray-600 mb-4">
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences through our cookie consent banner. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                  </p>
                  <p className="text-gray-600 mb-8">
                    The specific types of first and third-party cookies served through our website and the purposes they perform are described in the tables above. Please note that the specific cookies served may vary depending on the specific online properties you visit.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Updates to This Policy</h2>
                  <p className="text-gray-600 mb-8">
                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Contact Us</h2>
                  <p className="text-gray-600 mb-8">
                    If you have any questions about our use of cookies or other technologies, please contact us at:
                  </p>
                  <div className="bg-[rgb(234,226,214)]/30 border border-[#2B1C48]/10 rounded-xl p-6 mb-8">
                    <p className="text-gray-600">
                      Legend Holding Group<br />
                      Email: privacy@legendholding.com<br />
                      Address: [Your Company Address]<br />
                      Dubai, United Arab Emirates
                    </p>
                    <p className="text-gray-600 text-sm mt-4">
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