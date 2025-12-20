"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { Phone, Mail } from "lucide-react"

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
    "Legend Motors Trading",
    "Legend Motors Dealership",
    "Legend Commercial Vehicles",
    "Legend AutoHub",
    "Legend Motorcycles",
    "Legend Rent a Car",
    "Legend Auto Services",
    "Legend Global Media",
    "Legend Travel and Tourism",
    "Legend Green Energy Solutions",
    "Legend X",
    "Legend Technical Services",
    "Zul Energy",
  ]
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      // Here you would typically send the form data to your API
      // For now, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Your complaint has been submitted successfully. We will review it shortly.")
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      })
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast.error(error.message || "Failed to submit form. Please try again later.")
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
                <div className="absolute -top-6 -right-6 z-10">
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
            </div>

            {/* What should be reported */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-4" style={{ fontFamily: 'var(--body-font)' }}>WHAT SHOULD BE REPORTED?</h3>
              <div className="text-xl text-[#2B1C48] mb-4 ml-6 leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>Following incidents are examples of matters that should be reported:</div>
              <ol className="list-decimal list-outside space-y-3 text-xl text-[#2B1C48] ml-6 leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                <li>Violation of any applicable laws, rules or regulations;</li>
                <li>Violation of AWR Code of Business Conduct and Ethics;</li>
                <li>Misrepresentation or a false statement by or to a director, officer or employee respecting information included in the financial records, statements or reports;</li>
                <li>Fraud or deliberate error in the preparation, evaluation, or review of financial or non-financial information;</li>
                <li>Fraudulent or corrupt practices, including the offering or accepting bribes or otherwise gaining advantage from a relationship or association with AWR;</li>
                <li>Coercion, harassment or discrimination by, or affecting, any member of the Corporation;</li>
                <li>Safety, health and environment situations or issues;</li>
                <li>Deficiencies or non-compliance with corporate policies and controls;</li>
                <li>Privacy violation, data leakage and misappropriation of company assets;</li>
                <li>Any incident that may expose AWR to a financial, reputational or safety risks;</li>
                <li>ANYTHING that doesn't sound right to you.</li>
              </ol>
            </div>

            {/* Who will receive */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>WHO WILL RECEIVE AND ADMINISTER THE REPORTED COMPLIANT?</h3>
              <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                Integrity hot line is administrated by the Group Compliance Function, where validation of all reported cases falls under the Compliance Function responsibility. Upon receipt and assessment, the Compliance Function may delegate such responsibility to other departments like Group Internal Audit, Group Legal, Group HR when deemed necessary.
              </div>
            </div>

            {/* Can I choose to report anonymously */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>CAN I CHOOSE TO REPORT ANONYMOUSLY?</h3>
              <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                Although the Group encourages you to supply contact information while submitting your request as that may help in validating facts and obtaining more information when needed, you may choose to report ANONYMOUSLY. However, the Group Compliance Function are dedicated to keeping your identity and involvement confidential and will always work to maintain your confidentiality.
              </div>
            </div>

            {/* Will I be able to know */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>WILL I BE ABLE TO KNOW THE INVESTIGATION RESULT?</h3>
              <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                In most cases you will be updated with the investigation conclusion, having said that the company preserves its' right to classify particular cases as confidential (or legally privileged) when deemed necessary.
              </div>
            </div>

            {/* How can I learn more */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>HOW CAN I LEARN MORE ABOUT THE INVESTIGATION PROCESS?</h3>
              <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                Kindly refer to the group investigation policy.
              </div>
            </div>

            {/* Who to reach out */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#EE8900] mb-3" style={{ fontFamily: 'var(--body-font)' }}>WHO TO REACH OUT IN CASE I HAVE MORE QUESTIONS ABOUT THE INTEGRITY HOTLINE?</h3>
              <div className="text-xl text-[#2B1C48] leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>
                Please refer to the Group Compliance Function.
              </div>
            </div>

            {/* Other ways to raise a complaint */}
            <div className="mt-12 mb-8 relative">
              <div className="bg-[#2B1C48] rounded-lg p-6 md:p-8 min-h-[240px] relative z-10">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--body-font)' }}>Other ways to raise a complaint or report an incident</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EE8900] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xl text-white leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>Call: +971 4 123 123</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EE8900] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xl text-white leading-8 font-normal" style={{ fontFamily: 'var(--body-font)' }}>Letter Confidential Email on: info@legendholding.com</div>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-100px] top-[45%] -translate-y-1/2 z-20 md:block hidden">
                <Image
                  src="https://res.cloudinary.com/dzfhqvxnf/image/upload/v1766237702/LUMO_dapjqs.svg"
                  alt="LUMO"
                  width={330}
                  height={340}
                  className="w-auto h-auto"
                  style={{ width: '330px', height: '340px' }}
                />
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 bg-white"
                      >
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                          <option key={company} value={company}>
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
    </>
  )
}

