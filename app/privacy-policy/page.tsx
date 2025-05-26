"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-white/80"
              >
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </motion.p>
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
                    Legend Holding Group ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Information We Collect</h2>
                  <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8">
                    <li>Contact information (name, email address, phone number)</li>
                    <li>Business information (company name, job title)</li>
                    <li>Communication preferences</li>
                    <li>Feedback and correspondence</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8">
                    <li>Provide and maintain our services</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Information Sharing</h2>
                  <p className="text-gray-600 mb-8">
                    We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business.
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Your Rights</h2>
                  <p className="text-gray-600 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-8">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Contact Us</h2>
                  <p className="text-gray-600 mb-6">
                    If you have any questions about this Privacy Policy or our practices, please contact us:
                  </p>
                </motion.div>

                {/* Contact Information Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                  <div className="bg-[rgb(234,226,214)] rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Phone className="w-5 h-5 text-[#2B1C48] mr-2" />
                      <h3 className="text-lg font-semibold text-[#2B1C48]">Phone</h3>
                    </div>
                    <p className="text-gray-600">+971 4 234 0738</p>
                  </div>

                  <div className="bg-[rgb(234,226,214)] rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Mail className="w-5 h-5 text-[#2B1C48] mr-2" />
                      <h3 className="text-lg font-semibold text-[#2B1C48]">Email</h3>
                    </div>
                    <p className="text-gray-600">info@legendholding.com</p>
                  </div>

                  <div className="bg-[rgb(234,226,214)] rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-5 h-5 text-[#2B1C48] mr-2" />
                      <h3 className="text-lg font-semibold text-[#2B1C48]">Address</h3>
                    </div>
                    <p className="text-gray-600">
                      Legend Holding Group HQ<br />
                      Jebel Ali Freezone, Gate 5<br />
                      Dubai, UAE
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-[#2B1C48] mb-6">Updates to This Policy</h2>
                  <p className="text-gray-600 mb-8">
                    We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
                  </p>

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