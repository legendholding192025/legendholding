"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"
import { Phone, Mail, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CustomerCarePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  const companies = [
    "Legend Motors",
    "212",
    "Kaiyi",
    "Skywell",
    "Legend Commercial Vehicles",
    "Legend AutoHub",
    "Legend Motorcycles - Lifan",
    "Legend Rent a Car",
    "Legend Auto Services",
    "Legend Travel and Tourism",
    "Legend Green Energy Solutions",
    "Legend X",
    "Zul Energy",
  ]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/customer-care', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit complaint')
      }
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      })

      // Show success modal
      setShowSuccessModal(true)
    } catch (error: any) {
      console.error("Error submitting form:", error)
      setErrorMessage(error.message || "Failed to submit form. Please try again later.")
      setShowErrorModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Image Section - Original Size */}
        <section className="w-full relative">
          <div className="w-full relative">
            <Image
              src="https://cdn.legendholding.com/images/cdn_694695344ec442.11492279_20251220_122316.webp"
              alt="Customer Care"
              width={1920}
              height={1080}
              className="w-full h-auto"
              style={{ objectFit: 'contain' }}
              priority
              quality={90}
              sizes="100vw"
            />
            {/* Customer Care Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative inline-block">
                {/* Top Right Shape */}
                <div className="absolute -top-8 -right-8 z-10">
                  <Image
                    src="/icons/shape.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </div>
                {/* Bottom Left Shape */}
                <div className="absolute -bottom-6 -left-6 z-10">
                  <Image
                    src="/icons/shape.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10 rotate-180"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold relative z-0" style={{ fontFamily: 'var(--heading-font)' }}>
                  <span className="text-[#EE8900]">Customer</span> <span className="text-white">Care</span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section - Two Column Layout */}
        <section className="w-full py-12">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">
              {/* Left Column - Content */}
              <div className="text-left" style={{ fontFamily: 'var(--body-font)' }}>
            {/* Important Notice */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#5D376E] mb-2">Important Notice</h2>
              <div className="w-24 h-1 bg-[#EE8900] rounded-full mb-4"></div>
              <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                At Legend Holding Group, we position ourselves close to our customers to ensure the highest levels of satisfaction across all our subsidiaries. To support this commitment, we have established a dedicated channel for escalating any challenges that require Holding-level involvement.
              </div>
            </div>

            {/* What should be reported */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-4" style={{ fontFamily: 'var(--body-font)' }}>WHAT SHOULD BE REPORTED?</h3>
              <div className="text-xl text-[#2B1C48] mb-4 leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>The following are examples of matters that should be escalated:</div>
              <ol className="list-decimal list-outside space-y-3 text-xl text-[#2B1C48] ml-6 leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                <li>Customer issues that were not resolved at the subsidiary level and require intervention from Legend Holding Group.</li>
                <li>Any incident that negatively impacted the customer experience, from the beginning to the end of the customer journey.</li>
                <li>Unresolved issues faced by customers while dealing with any Legend subsidiary, including products, services, or aftersales.</li>
              </ol>
            </div>

            {/* Who will receive */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>WHO WILL RECEIVE AND ADMINISTER THE REPORTED COMPLAINT?</h3>
              <div className="text-xl text-[#2B1C48] mb-4 leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                Our Customer Care Hotline is administered directly by the Holding team. The process follows these steps:
              </div>
              <ol className="list-decimal list-outside space-y-3 text-xl text-[#2B1C48] ml-6 leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                <li>The Holding team receives and validates all reported cases.</li>
                <li>After assessment, the matter is escalated to the relevant business unit for immediate action.</li>
                <li>The Holding team will discuss the issue internally, ensure it reaches the correct management level, and monitor the turnaround time.</li>
                <li>We ensure the matter is resolved promptly and that a high customer satisfaction rate is achieved.</li>
              </ol>
            </div>

            {/* How to reach out */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>HOW TO REACH OUT IF YOU HAVE QUESTIONS ABOUT THE CUSTOMER CARE HOTLINE?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EE8900] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>Call: +971 4 234 0738</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EE8900] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>Letter Confidential Email: hello@legendholding.com</div>
                </div>
              </div>
            </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:sticky lg:top-24 h-fit pt-20">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="mb-6">
                    <span className="text-[#2B1C48] font-semibold text-lg inline-block mb-2">Report an Incident</span>
                    <h3 className="text-2xl font-bold text-[#5D376E] mb-2">Submit Your Complaint</h3>
                    <div className="w-16 h-1 bg-[#EE8900] rounded-full mb-4"></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 bg-white ${!formData.company ? 'text-gray-400' : 'text-gray-900'}`}
                      >
                        <option value="" className="text-gray-400">Select a company</option>
                        {companies.map((company) => (
                          <option key={company} value={company} className="text-gray-900">
                            {company}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Brief description of the issue"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Please provide detailed information about the incident..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 resize-none placeholder:font-normal"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#F08900] hover:bg-[#d67a00] text-white py-3 rounded-lg transition-all duration-200 font-semibold text-base ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Complaint"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl font-semibold text-gray-900">
              Complaint Submitted Successfully
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              Your complaint has been submitted successfully. We will review it shortly and get back to you.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-[#F08900] hover:bg-[#d67a00] text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl font-semibold text-gray-900">
              Submission Failed
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowErrorModal(false)}
              className="px-6 py-2 bg-[#F08900] hover:bg-[#d67a00] text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

