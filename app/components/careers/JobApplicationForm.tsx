"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
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
  isOpen: boolean
  onClose: () => void
}

export function JobApplicationForm({ jobId, jobTitle, isOpen, onClose }: JobApplicationFormProps) {
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Resume file size must be less than 5MB")
        e.target.value = ""
        return
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ]
      if (!allowedTypes.includes(file.type)) {
        toast.error("Resume must be in PDF, DOC, or DOCX format")
        e.target.value = ""
        return
      }

      setResumeFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!resumeFile) {
      toast.error("Please upload your resume")
      return
    }

    setLoading(true)

    try {
      // Upload resume
      const fileExt = resumeFile.name.split(".").pop()?.toLowerCase()
      const fileName = `${Date.now()}-${formData.fullName.replace(/[^a-zA-Z0-9]/g, "_")}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile)

      if (uploadError) throw uploadError

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName)

      // Save application
      const { error: applicationError } = await supabase
        .from("job_applications")
        .insert({
          job_id: jobId,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resume_url: publicUrl,
          cover_letter: formData.coverLetter || null,
          status: "pending",
          created_at: new Date().toISOString()
        })

      if (applicationError) throw applicationError

      toast.success("Application submitted successfully!")
      onClose()
      router.push("/careers/thank-you")
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Please fill out the form below to submit your application. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-base">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1.5"
                placeholder="Enter your full name"
                error={formErrors.fullName}
              />
              {formErrors.fullName && (
                <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-base">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1.5"
                placeholder="Enter your email address"
                error={formErrors.email}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-base">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1.5"
                placeholder="Enter your phone number"
                error={formErrors.phone}
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="resume" className="text-base">
                Resume <span className="text-red-500">*</span>
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                onChange={handleFileChange}
                className="mt-1.5"
                accept=".pdf,.doc,.docx"
              />
              <p className="text-sm text-gray-500 mt-1.5">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            <div>
              <Label htmlFor="coverLetter" className="text-base">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="mt-1.5 min-h-[150px]"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
              <p className="text-sm text-gray-500 mt-1.5">
                Optional but recommended. Help us understand why you're the perfect candidate.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#EE8900] hover:bg-[#EE8900]/90 text-white min-w-[120px]"
              disabled={loading}
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
        </form>
      </DialogContent>
    </Dialog>
  )
} 