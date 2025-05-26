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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import Newsletter from "@/components/newsletter"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStep, setFormStep] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Insert into contact_submissions table
      const { error: submissionError } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
        },
      ])

      if (submissionError) {
        console.error("Error submitting to contact_submissions:", submissionError)
        throw new Error("Failed to submit contact form")
      }

      toast.success("Thank you for your message! We will get back to you soon.")
      setFormStep(1) // Move to success state
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
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setFormStep(0)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+971 4 234 0738"],
      color: "bg-[#2B1C48]"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@legendholding.com"],
      color: "bg-[#5D376E]"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: [
        "Legend Holding Group HQ",
        "Jebel Ali Freezone, Gate 5",
        "Dubai, United Arab Emirates"
      ],
      color: "bg-[#EE8900]"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
      color: "bg-[#EE8900]/80"
    }
  ]

  const socialMedia = [
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      url: "https://facebook.com/legendholding",
      color: "bg-[#2B1C48] hover:bg-[#2B1C48]/90",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      url: "https://twitter.com/legendholding",
      color: "bg-[#5D376E] hover:bg-[#5D376E]/90",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      url: "https://instagram.com/legendholding",
      color: "bg-[#EE8900] hover:bg-[#EE8900]/90",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/legendholding",
      color: "bg-[#EE8900]/80 hover:bg-[#EE8900]/70",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      name: "YouTube",
      url: "https://youtube.com/legendholding",
      color: "bg-[#2B1C48] hover:bg-[#2B1C48]/90",
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

        {/* Rest of the content */}
        <div className="min-h-screen bg-white">
          <section className="py-16 md:py-24 relative">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  CONTACT US
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Have a question or want to work together? We'd love to hear from you.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                      >
                        <div
                          className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {item.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                        <div className="space-y-1">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-lg text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  {formStep === 0 ? (
                    <>
                      <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-semibold text-[#2B1C48] mb-2">Send Us a Message</h3>
                        <p className="text-lg text-gray-600">
                          Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                              Subject
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                              placeholder="How can we help?"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                            placeholder="Tell us more about your inquiry..."
                          />
                        </div>

                        <div className="flex justify-center">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                              inline-flex items-center px-8 py-4 rounded-lg text-white
                              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#EE8900] hover:bg-[#EE8900]/90"}
                              transition-all duration-200 font-medium text-base shadow-lg hover:shadow-xl
                            `}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-10">
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-lg text-gray-600 mb-8">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 font-medium text-lg"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section className="py-16 bg-white relative">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  LOCATION
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
                <p className="text-lg md:text-xl text-gray-600">Find us at our convenient location in Jebel Ali Freezone</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              >
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
              </motion.div>
            </div>
          </section>

          {/* Newsletter Component */}
          <Newsletter />
        </div>
      </main>
      <Footer />
    </>
  )
}
