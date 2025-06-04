"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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
                Privacy Policy
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
                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">Introduction</h2>
                  <p className="text-gray-600 mb-8 font-effra">
                    Welcome to Legend Holding Group ("we," "our," or "us"). Your privacy is important to us, and this Privacy Policy outlines how we collect, use, and protect your personal information when you visit and interact with our website, www.legendholding.com (the "Website").
                  </p>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4 font-effra">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8 font-effra">
                    <li><strong>Personal Information:</strong> Includes your name, email address, phone number, and any other information you voluntarily provide when filling out forms on our Website.</li>
                    <li><strong>Usage Data:</strong> Information about how you use the Website, such as your IP address, browser type, pages visited, and the time and date of your visits.</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to monitor activity on our Website and store certain information. You can manage cookie preferences through your browser settings.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4 font-effra">We use the information we collect for various purposes, including:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8 font-effra">
                    <li>To provide, operate, and maintain our Website</li>
                    <li>To improve, personalize, and expand our services</li>
                    <li>To communicate with you, respond to inquiries, and provide customer support</li>
                    <li>To send you updates, marketing materials, and other information related to our services, subject to your consent</li>
                    <li>To monitor and analyze usage and trends to enhance your experience</li>
                    <li>To ensure the security and integrity of our Website</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">3. Sharing Your Information</h2>
                  <p className="text-gray-600 mb-4 font-effra">We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8 font-effra">
                    <li><strong>Service Providers:</strong> Third-party companies or individuals we employ to facilitate our services, such as hosting, analytics, or payment processing. These parties are obligated to maintain the confidentiality of your information.</li>
                    <li><strong>Legal Compliance:</strong> If required by law or in response to valid requests by public authorities, we may disclose your personal information.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">4. Security of Your Information</h2>
                  <p className="text-gray-600 mb-8 font-effra">
                    We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                  </p>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">5. Your Rights</h2>
                  <p className="text-gray-600 mb-4 font-effra">You have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8 font-effra">
                    <li>Access, update, or delete your personal information</li>
                    <li>Withdraw consent for the processing of your personal data</li>
                    <li>Object to the processing of your personal data for marketing purposes</li>
                    <li>Request the transfer of your data to another service provider (data portability)</li>
                  </ul>
                  <p className="text-gray-600 mb-8 font-effra">To exercise these rights, please contact us using the information provided below.</p>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">6. Third-Party Links</h2>
                  <p className="text-gray-600 mb-8 font-effra">
                    Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to read the privacy policies of any linked sites.
                  </p>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">7. Children's Privacy</h2>
                  <p className="text-gray-600 mb-8 font-effra">
                    Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                  </p>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">8. Changes to This Privacy Policy</h2>
                  <p className="text-gray-600 mb-8 font-effra">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this Privacy Policy periodically.
                  </p>

                  <h2 className="text-2xl font-bold text-[#5E366D] mb-6 font-brand">9. Contact Us</h2>
                  <p className="text-gray-600 mb-6 font-effra">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="mb-8">
                    <p className="text-gray-600 font-effra">
                      Jebel Ali Freezone, Gate 5,<br />
                      Legend Holding Group HQ<br />
                      Dubai, United Arab Emirates<br />
                      Phone: +971 4 234 0738<br />
                      Email: info@legendholding.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-[rgb(234,226,214)]/30 border border-[#5E366D]/10 rounded-xl p-6 mb-8">
                    <p className="text-gray-600 text-sm font-effra">
                      Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Link 
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-[#F08900] text-white rounded-lg hover:bg-[#F08900]/90 transition-colors duration-200 font-effra"
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