"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Upload,
  CheckCircle,
  X,
  File,
} from "lucide-react"
import { toast } from "sonner"

export default function WorkflowPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate each file
    const validFiles: File[] = []
    for (const file of files) {
      // Validate file type
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(`${file.name}: Invalid file type. Only PDF, DOC, DOCX, XLS, and XLSX files are allowed.`)
        continue
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        toast.error(`${file.name}: File size must be less than 10MB`)
        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles])
      toast.success(`${validFiles.length} file(s) added successfully`)
    }

    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    toast.success('File removed')
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('message', formData.message)
      
      // Append multiple files
      selectedFiles.forEach((file) => {
        formDataToSend.append('files', file)
      })

      const response = await fetch('/api/workflow', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      // Clear form and show success message
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      toast.success("Document submitted successfully!")
      setFormStep(1)
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast.error(error.message || "Failed to submit document. Please try again later.")
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
      subject: "",
      message: "",
    })
    setErrors({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setSelectedFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setFormStep(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <>
      <main className="min-h-screen bg-slate-100">
      {/* Hero Banner */}
      <div className="relative h-[300px] sm:h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5D376E]/95 to-[#5D376E]/80" />
        </div>
        <div className="relative h-full flex items-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Workflow Document Submission</h1>
            <p className="text-lg sm:text-xl text-white/95">
              Upload your workflow documents securely. Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* Main Submission Section */}
      <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              {formStep === 0 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0, duration: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-[#5D376E] mb-2">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05, duration: 0.5 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-[#5D376E] mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold text-[#5D376E] mb-2">
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter document subject"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 ${
                        errors.subject ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-[#5D376E] mb-2">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message or description"
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#EE8900] focus:border-transparent transition-all duration-200 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </motion.div>

                  {/* File Upload Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label className="block text-sm font-semibold text-[#5D376E] mb-2">
                      Upload Documents {selectedFiles.length > 0 && `(${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''})`}
                    </label>
                    
                    <div className="space-y-3">
                      {/* Upload area - always shown */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#EE8900] transition-colors duration-200">
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          className="hidden"
                          id="file-upload"
                          multiple
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="w-10 h-10 text-[#EE8900] mb-2" />
                          <span className="text-gray-700 font-medium mb-1">
                            Click to upload multiple files
                          </span>
                          <span className="text-sm text-gray-500">
                            PDF, DOC, DOCX, XLS, XLSX (max 10MB each)
                          </span>
                        </label>
                      </div>

                      {/* Selected files list */}
                      {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div key={`${file.name}-${index}`} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <div className="w-10 h-10 bg-[#EE8900] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <File className="w-5 h-5 text-[#EE8900]" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(index)}
                                  className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 ml-2"
                                  title="Remove file"
                                >
                                  <X className="w-5 h-5 text-gray-500 hover:text-red-600" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full bg-[#F08900] hover:bg-[#d67a00] text-white py-4 rounded-lg
                        transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2
                        ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5" />
                          Submit Document
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-3">Document Submitted Successfully!</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Your document has been received and will be processed shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#F08900] text-white font-semibold rounded-lg hover:bg-[#d67a00] transition-colors duration-300"
                  >
                    Submit Another Document
                  </button>
                </div>
              )}
            </div>

            {/* Information Section */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#5D376E] mb-3">Important Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#EE8900] mt-1">•</span>
                  <span>All submitted documents are securely stored and encrypted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EE8900] mt-1">•</span>
                  <span>You will receive a confirmation once your document is processed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EE8900] mt-1">•</span>
                  <span>Maximum file size is 10MB per submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EE8900] mt-1">•</span>
                  <span>Supported formats: PDF, DOC, DOCX, XLS, XLSX</span>
                </li>
              </ul>
            </div>

            {/* View All Submissions Button */}
            <div className="mt-8 text-center">
              <a
                href="/workflow-submissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5D376E] text-white font-semibold rounded-lg hover:bg-[#4a2c5a] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5" />
                View All Submissions
              </a>
              <p className="mt-3 text-sm text-gray-600">
                Track the status of all workflow documents
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

