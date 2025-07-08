"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { z } from "zod"

// Form validation schema
const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  coverLetter: z.string().optional(),
})

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
  company: string
  isOpen: boolean
  onClose: () => void
}

export function JobApplicationForm({ jobId, jobTitle, company, isOpen, onClose }: JobApplicationFormProps) {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()

  // Debug: Log Supabase env variables in browser
  useEffect(() => {
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }, []);

  const validateForm = () => {
    try {
      applicationSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message
          }
        })
        setFormErrors(errors)
      }
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF, DOC, or DOCX file")
        e.target.value = ""
        return
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        e.target.value = ""
        return
      }
      
      setResumeFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (loading) {
      console.log('Submission already in progress, ignoring duplicate submit')
      return
    }
    
    let fileName: string | null = null
    let finalFileName: string | null = null
    
    try {
      if (!validateForm()) {
        return
      }

      if (!resumeFile) {
        toast.error("Please upload your resume")
        return
      }

      setLoading(true)

      try {
        // First, create a unique filename and upload the resume
        const fileExt = resumeFile.name.split(".").pop()?.toLowerCase() || ""
        const timestamp = new Date().getTime()
        fileName = `${timestamp}/${timestamp}.${fileExt}`

        console.log('Attempting to upload resume:', fileName, 'to applications bucket')

        // Use base64 storage as primary method since storage buckets are having issues
        let uploadSuccess = false
        let finalFileName = fileName
        let bucketUsed = 'base64'

        // Strategy 1: Convert to base64 and store in database (primary method)
        try {
          console.log('Converting file to base64 for database storage')
          
          // Check file size - limit to 5MB for base64 conversion
          if (resumeFile.size > 5 * 1024 * 1024) {
            console.log('File too large for base64, trying storage instead')
            throw new Error('File too large for base64 conversion')
          }
          
          // Use FileReader for safer base64 conversion
          const reader = new FileReader()
          const base64Promise = new Promise<string>((resolve, reject) => {
            reader.onload = () => {
              const result = reader.result as string
              resolve(result)
            }
            reader.onerror = () => reject(new Error('Failed to read file'))
          })
          
          // Add timeout to prevent hanging
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('File read timeout')), 10000) // 10 second timeout
          })
          
          reader.readAsDataURL(resumeFile)
          const base64Data = await Promise.race([base64Promise, timeoutPromise])
          
          finalFileName = base64Data
          uploadSuccess = true
          console.log('Successfully converted file to base64')
        } catch (error) {
          console.error("Base64 conversion failed:", error)
        }

        // Strategy 2: Try applications bucket as fallback (if base64 fails)
        if (!uploadSuccess) {
          try {
            const { error: uploadError } = await supabase.storage
              .from("applications")
              .upload(fileName, resumeFile, {
                cacheControl: "3600",
                upsert: true,
                contentType: resumeFile.type
              })

            if (!uploadError) {
              uploadSuccess = true
              bucketUsed = 'applications'
              console.log('Successfully uploaded to applications bucket')
            } else {
              console.error("Applications bucket upload failed:", uploadError)
            }
          } catch (error) {
            console.error("Applications bucket upload error:", error)
          }
        }

        // Strategy 3: Try resumes bucket if applications failed
        if (!uploadSuccess) {
          try {
            console.log('Trying resumes bucket as fallback')
            const { error: altUploadError } = await supabase.storage
              .from("resumes")
              .upload(fileName, resumeFile, {
                cacheControl: "3600",
                upsert: true,
                contentType: resumeFile.type
              })

            if (!altUploadError) {
              uploadSuccess = true
              bucketUsed = 'resumes'
              finalFileName = `resumes/${fileName}`
              console.log('Successfully uploaded to resumes bucket')
            } else {
              console.error("Resumes bucket upload also failed:", altUploadError)
            }
          } catch (error) {
            console.error("Resumes bucket upload error:", error)
          }
        }

        // Strategy 4: Try with a simpler path structure
        if (!uploadSuccess) {
          try {
            const simpleFileName = `${timestamp}.${fileExt}`
            console.log('Trying simple filename:', simpleFileName)
            
            const { error: simpleUploadError } = await supabase.storage
              .from("applications")
              .upload(simpleFileName, resumeFile, {
                cacheControl: "3600",
                upsert: true,
                contentType: resumeFile.type
              })

            if (!simpleUploadError) {
              uploadSuccess = true
              finalFileName = simpleFileName
              console.log('Successfully uploaded with simple filename')
            } else {
              console.error("Simple filename upload failed:", simpleUploadError)
            }
          } catch (error) {
            console.error("Simple filename upload error:", error)
          }
        }

        if (!uploadSuccess) {
          throw new Error("All upload strategies failed. Please check your file and try again.")
        }

        // Store the file path for admin access
        const resumeUrl = finalFileName

        // Debug: Log all fields before insert
        console.log('Submitting application with data:', {
          job_id: jobId,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resume_url: resumeUrl,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

        // Now create the job application with the resume path
        const insertData = {
          job_id: jobId,
          full_name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          resume_url: resumeUrl,
          cover_letter: formData.coverLetter?.trim() || null,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        console.log('Attempting to submit application with data:', insertData)

        // Submit application using API endpoint
        console.log('Sending POST request to /api/job-applications')
        const response = await fetch('/api/job-applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(insertData)
        })

        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))

        let result
        try {
          const responseText = await response.text()
          console.log('Raw response text:', responseText)
          result = JSON.parse(responseText)
          console.log('API response parsed successfully:', result)
        } catch (jsonError) {
          console.error('Failed to parse response as JSON:', jsonError)
          throw new Error('Invalid response format from server')
        }

        if (!response.ok) {
          // If application creation fails, log the error but don't try to clean up
          // Base64 files don't need cleanup, and storage cleanup is complex
          console.log('Application creation failed, skipping file cleanup')
          
          console.error("Application creation error:", result)
          console.error("Error details:", result.details)
          
          // Improved error handling with more specific error messages
          if (result.error?.includes('Invalid job reference')) {
            throw new Error("Invalid job reference. Please try again.")
          } else if (result.error?.includes('already applied')) {
            throw new Error("You have already applied for this position.")
          } else if (result.error?.includes('Missing required fields')) {
            throw new Error("Please fill in all required fields.")
          } else if (result.error) {
            throw new Error(result.error)
          } else {
            throw new Error("Failed to submit application. Please try again.")
          }
        }

        console.log('Application created successfully:', result)
        onClose()
        router.push("/careers/thank-you")
      } catch (error) {
        // Clean up on error - simplified approach
        console.log('Submission process error, skipping file cleanup for simplicity')

        console.error("Submission process error:", error)
        if (error instanceof Error) {
          // Provide more specific error messages
          if (error.message.includes('File too large for base64 conversion')) {
            toast.error("File is too large. Please use a smaller file (under 5MB) or try again.")
          } else if (error.message.includes('File read timeout')) {
            toast.error("File processing took too long. Please try with a smaller file.")
          } else if (error.message.includes('Failed to upload resume')) {
            toast.error("Unable to upload resume. Please check your file and try again.")
          } else if (error.message.includes('Invalid job reference')) {
            toast.error("Job posting not found. Please refresh the page and try again.")
          } else if (error.message.includes('already applied')) {
            toast.error("You have already applied for this position.")
          } else if (error.message.includes('Database error:')) {
            toast.error(error.message)
          } else {
            toast.error(error.message)
          }
        } else {
          toast.error("Failed to submit application. Please try again.")
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-[95vw] max-w-[600px] h-[90vh] max-h-[90vh] flex flex-col p-0 rounded-lg"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          margin: '0',
          zIndex: 60,
        }}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 z-10 rounded-t-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-2xl leading-tight">Apply for {jobTitle} at {company}</DialogTitle>
              <DialogDescription className="text-sm sm:text-base mt-1">
                Please fill out the form below to submit your application. All fields marked with * are required.
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm sm:text-base">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`mt-1.5 text-sm sm:text-base ${formErrors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your full name"
                  aria-invalid={!!formErrors.fullName}
                  aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
                />
                {formErrors.fullName && (
                  <p id="fullName-error" className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1.5 text-sm sm:text-base ${formErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your email address"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm sm:text-base">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1.5 text-sm sm:text-base ${formErrors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your phone number"
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? "phone-error" : undefined}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="resume" className="text-sm sm:text-base">
                  Resume <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1.5 text-sm"
                  accept=".pdf,.doc,.docx"
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <div>
                <Label htmlFor="coverLetter" className="text-sm sm:text-base">
                  Cover Letter
                </Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="mt-1.5 min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Optional but recommended. Help us understand why you're the perfect candidate.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 rounded-b-lg">
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#EE8900] hover:bg-[#EE8900]/90 text-white w-full sm:w-auto min-w-[120px]"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e as any);
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 