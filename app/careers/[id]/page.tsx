"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Briefcase, MapPin, Clock } from "lucide-react"
import Image from "next/image"

interface Job {
  id: string
  title: string
  department: string
  location: string
  description: string[]
  requirements: string[]
  responsibilities: string[]
  job_type: string
  created_at: string
  status: 'active' | 'inactive'
}

interface ApplicationFormProps {
  isOpen: boolean
  onClose: () => void
  jobId: string
  jobTitle: string
}

// Move ApplicationForm component outside
const ApplicationForm = ({ isOpen, onClose, jobId, jobTitle }: ApplicationFormProps) => {
  const supabase = createClientComponentClient()
  const [formState, setFormState] = useState({
    full_name: "",
    email: "",
    phone: "",
    cv_url: "",
    cover_letter: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const resetForm = useCallback(() => {
    setFormState({
      full_name: "",
      email: "",
      phone: "",
      cv_url: "",
      cover_letter: "",
    })
    setCvFile(null)
  }, [])

  const handleClose = useCallback(() => {
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      if (!formState.full_name || !formState.email || !formState.phone || !cvFile) {
        toast.error("Please fill in all required fields and upload your CV")
        return
      }

      const cvFileName = `${Date.now()}-${cvFile.name}`
      const { error: cvError } = await supabase
        .storage
        .from('cvs')
        .upload(cvFileName, cvFile)

      if (cvError) throw cvError

      const { data: { publicUrl } } = supabase
        .storage
        .from('cvs')
        .getPublicUrl(cvFileName)

      // Submit application using API endpoint
      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_id: jobId,
          full_name: formState.full_name,
          email: formState.email,
          phone: formState.phone,
          resume_url: publicUrl,
          cover_letter: formState.cover_letter,
        })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Application creation error:', result)
        throw new Error(result.error || 'Failed to submit application')
      }

      handleClose()
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Fill in your details below to apply for this position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formState.full_name}
              onChange={(e) => setFormState(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formState.phone}
              onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1234567890"
              required
            />
          </div>
          <div>
            <Label htmlFor="cv">CV/Resume *</Label>
            <Input
              id="cv"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Validate file type
                  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                  if (!allowedTypes.includes(file.type)) {
                    toast.error("Please upload a PDF, DOC, or DOCX file")
                    e.target.value = ""
                    return
                  }
                  
                  // Validate file size (2MB limit)
                  if (file.size > 2 * 1024 * 1024) {
                    toast.error("File size must be less than 2MB")
                    e.target.value = ""
                    return
                  }
                  
                  setCvFile(file)
                }
              }}
              accept=".pdf,.doc,.docx"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX (Max 2MB)
            </p>
          </div>
          <div>
            <Label htmlFor="cover_letter">Cover Letter (Optional)</Label>
            <textarea
              id="cover_letter"
              className="w-full min-h-[100px] px-3 py-2 border rounded-md"
              value={formState.cover_letter}
              onChange={(e) => setFormState(prev => ({ ...prev, cover_letter: e.target.value }))}
              placeholder="Tell us why you're interested in this position..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-primary hover:bg-primary/90"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to convert description text to bullet points for display
const convertDescriptionToBulletPoints = (description: string | null | undefined): string[] => {
  if (!description || typeof description !== 'string') return []
  return description.split('\n').map(line => line.trim()).filter(line => line !== '')
}

// Main component
const JobDetails = () => {
  const params = useParams()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)

  const fetchJob = useCallback(async () => {
    if (!params?.id) return
    try {
      // Use API endpoint to fetch job details
      const response = await fetch(`/api/careers/jobs/${params.id}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch job details')
      }

      const job = await response.json()
      setJob(job)
    } catch (error) {
      console.error('Error fetching job:', error)
      toast.error("Failed to load job details")
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    if (!params || !params.id) {
      router.push('/careers')
      return
    }
    fetchJob()
  }, [params, router, fetchJob])

  if (loading) {
    return (
      <>
        <Header hideHeader={isApplyDialogOpen} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!job) {
    return (
      <>
        <Header hideHeader={isApplyDialogOpen} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Job Not Found</h1>
            <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
            <Button
              onClick={() => router.push('/careers')}
              className="mt-4"
            >
              Back to Careers
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header hideHeader={isApplyDialogOpen} />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative bg-[#5E366D] text-white min-h-[400px] overflow-hidden">

          
          {/* Background Logo */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://res.cloudinary.com/dosxengut/image/upload/v1747999528/1-2_1_1_1_m1wpov.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5E366D] via-[#5E366D]/90 to-[#5E366D]/85 z-20"></div>

          {/* Content */}
          <div className="container mx-auto px-4 py-16 md:py-20 relative z-30">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{job.job_type}</span>
                </div>
              </div>
              <Button
                onClick={() => setIsApplyDialogOpen(true)}
                className="mt-8 bg-[#EE8900] hover:bg-[#EE8900]/90 text-white px-8 py-2.5 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>

        {/* Job Details Content */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="prose max-w-none">
                  {Array.isArray(job.description) && job.description.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                      <div>
                        {job.description.map((desc, index) => (
                          <p key={index} className="break-words">{desc}</p>
                        ))}
                      </div>
                    </>
                  )}

                  {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold mt-8 mb-4">Preferred Skills</h2>
                      <ul className="list-disc pl-5">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="break-words">{req}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold mt-8 mb-4">Responsibilities</h2>
                      <ul className="list-disc pl-5">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="break-words">{resp}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Button
                    onClick={() => setIsApplyDialogOpen(true)}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90"
                  >
                    Apply for this Position
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {job && (
        <ApplicationForm
          isOpen={isApplyDialogOpen}
          onClose={() => setIsApplyDialogOpen(false)}
          jobId={job.id}
          jobTitle={job.title}
        />
      )}
      <Footer />
    </>
  )
}

export default JobDetails 