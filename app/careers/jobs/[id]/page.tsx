"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useParams } from "next/navigation"
import { JobApplicationForm } from "@/app/components/careers/JobApplicationForm"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  created_at: string
  status: 'active' | 'inactive'
}

export default function JobDetails() {
  const params = useParams()
  const jobId = params?.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!jobId) return
    fetchJobDetails()
  }, [jobId])

  const fetchJobDetails = async () => {
    try {
      setLoading(true)
      
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single()

      if (jobError) {
        console.error('Error fetching job details:', jobError)
        toast.error(jobError.message || "Failed to fetch job details")
        return
      }

      if (!jobData) {
        console.warn('No job data returned')
        return
      }

      setJob({
        ...jobData,
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
        responsibilities: Array.isArray(jobData.responsibilities) ? jobData.responsibilities : [],
      })
    } catch (error) {
      console.error('Error in fetchJobDetails:', error)
      toast.error("An unexpected error occurred while fetching job details")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
              <p className="text-sm text-gray-600">Loading job details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!job) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
              <p className="text-gray-600 mb-8">The job posting you're looking for doesn't exist or has been removed.</p>
              <Link href="/careers/jobs">
                <Button className="bg-[#2B1C48] hover:bg-[#2B1C48]/90 text-white">
                  View All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-20 bg-gray-50">
        {/* Hero Section */}
        <div className="bg-[#2B1C48] text-white py-16">
          <div className="container mx-auto px-4">
            <Link 
              href="/careers/jobs"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Link>
            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Role</h2>
                <div className="prose max-w-none text-gray-600">
                  {job.description}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EE8900] mt-2" />
                      <span className="text-gray-600">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EE8900] mt-2" />
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Button */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <Button 
                  className="w-full bg-[#EE8900] hover:bg-[#EE8900]/90 text-white"
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  Apply Now
                </Button>
              </div>

              {/* Share Job */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Share this job</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success("Link copied to clipboard!")
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {job && (
        <JobApplicationForm
          jobId={job.id}
          jobTitle={job.title}
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      )}
    </>
  )
} 