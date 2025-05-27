"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
  isOpen: boolean
  onClose: () => void
}

export function JobApplicationForm({ jobId, jobTitle, isOpen, onClose }: JobApplicationFormProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const fullName = formData.get('fullName') as string
      const email = formData.get('email') as string
      const phone = formData.get('phone') as string
      const resumeFile = formData.get('resume') as File
      const coverLetter = formData.get('coverLetter') as string

      if (!fullName || !email || !phone || !resumeFile) {
        throw new Error('Please fill in all required fields')
      }

      // Validate file size (5MB max)
      const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
      if (resumeFile.size > MAX_FILE_SIZE) {
        throw new Error('Resume file size must be less than 5MB')
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(resumeFile.type)) {
        throw new Error('Resume must be in PDF, DOC, or DOCX format')
      }

      // Upload resume
      let resumeUrl = ''
      if (resumeFile instanceof File && resumeFile.size > 0) {
        const fileExt = resumeFile.name.split('.').pop()?.toLowerCase()
        const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
        const fileName = `${sanitizedName}_${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(`public/${fileName}`, resumeFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: resumeFile.type
          })

        if (uploadError) {
          console.error('Resume upload error:', uploadError)
          throw new Error(uploadError.message || 'Failed to upload resume')
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(`public/${fileName}`)

        resumeUrl = publicUrl
      }

      // Save application to database
      const { error: applicationError } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          full_name: fullName,
          email,
          phone,
          resume_url: resumeUrl,
          cover_letter: coverLetter,
          status: 'pending',
          created_at: new Date().toISOString()
        })

      if (applicationError) {
        console.error('Application submission error:', applicationError)
        throw new Error(applicationError.message || 'Failed to submit application')
      }

      toast.success('Application submitted successfully!')
      onClose()
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume * (Max 5MB)</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            <div>
              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                className="h-32"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#EE8900] hover:bg-[#EE8900]/90 text-white"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 