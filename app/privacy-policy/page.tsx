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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Last Updated */}
              <div className="text-sm text-gray-500 mb-8">
                Last Updated: December 29, 2025
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#2B1C48] mb-8">Privacy Policy</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  At Legend Holding Group, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-6">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-8 text-gray-600">
                  <li>Fill out forms on our website</li>
                  <li>Subscribe to our newsletters</li>
                  <li>Contact us for support</li>
                  <li>Apply for employment</li>
                  <li>Engage with our services</li>
                  <li>Customer Care to resolve any matters</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-6">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-6 mb-8 text-gray-600">
                  <li>To provide and maintain our services</li>
                  <li>To notify you about changes to our services</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our services</li>
                  <li>To monitor the usage of our services</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>Tracking and improving our services as per customer experience.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">Data Security</h2>
                <p className="text-gray-600 mb-8">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-6">
                  Under GDPR, you have the following rights:
                </p>
                <ul className="list-disc pl-6 mb-8 text-gray-600">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure of your data</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#2B1C48] mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 mb-8">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
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