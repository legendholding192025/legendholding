"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import Newsletter from "@/components/newsletter"

export default function ContactPage() {
  const supabase = createClientComponentClient()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStep, setFormStep] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      toast.success("Thank you for your message! We will get back to you soon.")
      setFormStep(1)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit form. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })
    setFormStep(0)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+971 4 234 0738"],
      color: "text-[#EE8900]"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@legendholding.com"],
      color: "text-[#EE8900]"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: [
        "Legend Holding Group HQ",
        "Jebel Ali Freezone, Gate 5",
        "Dubai, United Arab Emirates"
      ],
      color: "text-[#EE8900]"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
      color: "text-[#EE8900]"
    }
  ]

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative bg-[#5E366D] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
              alt="Contact Us"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#5E366D]/80 mix-blend-multiply" />
          </div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
                Get in Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's Connect<br />Together
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Reach out to us for any inquiries or collaboration opportunities. We're here to help you succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Main Contact Section */}
        <section className="bg-slate-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Contact Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                  <p className="text-gray-600 mb-6">
                    Get in touch with us for any inquiries about our services or collaboration opportunities.
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 gap-3">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`${item.color} group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <div className="space-y-0.5">
                            {item.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-gray-600">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-sm mt-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                  <p className="text-gray-600">You can reach us anytime</p>
                </div>

                {formStep === 0 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="First name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Last name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <select className="w-20 px-2 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent">
                        <option value="+971">+971</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+91">+91</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full bg-[#EE8900] hover:bg-[#EE8900]/90 text-white py-3 rounded-lg
                        transition-all duration-200 font-medium text-base
                        ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                      `}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By contacting us, you agree to our{" "}
                      <Link href="/terms" className="text-[#EE8900] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#EE8900] hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-lg text-gray-600 mb-8">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-[#EE8900] hover:bg-[#EE8900]/90 transition-all duration-200 font-medium"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Map */}
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.8876416068888!2d55.11843827537754!3d24.936844342145934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f0fb4a8a8b8a7%3A0x3e5f0fb4a8a8b8a7!2sJebel%20Ali%20Free%20Zone%20Gate%205!5e0!3m2!1sen!2sae!4v1629789456789!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Location Info */}
              <div>
                <div className="mb-4">
                  <span className="text-[#EE8900] font-medium">Our Location</span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">Visit Our Office</h2>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Headquarters</h3>
                  <div className="space-y-2 text-gray-600">
                    <div>Legend Holding Group HQ</div>
                    <div>Jebel Ali Freezone, Gate 5</div>
                    <div>Dubai, United Arab Emirates</div>
                    <div>P.O. Box 12345</div>
                    <div>United Arab Emirates</div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#EE8900] text-sm mt-2 hover:underline"
                    >
                      Open Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Component */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
