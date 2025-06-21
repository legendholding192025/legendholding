"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, ChevronLeft, Share2, Calendar, Building2, Users2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useParams } from "next/navigation"
import { JobApplicationForm } from "@/app/components/careers/JobApplicationForm"
import { format } from "date-fns"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  salary_range?: string
  experience_level?: string
  team_size?: number
  created_at: string
  status: 'active' | 'inactive'
  company: string
}

export default function JobDetails() {
  const params = useParams()
  const jobId = params?.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [similarJobs, setSimilarJobs] = useState<Job[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!jobId) return
    fetchJobDetails()
  }, [jobId])

  const fetchJobDetails = async () => {
    try {
      setLoading(true)
      
      // Fetch job details
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single()

      if (jobError) throw jobError

      if (!jobData) {
        console.warn('No job data returned')
        return
      }

      const job = {
        ...jobData,
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
        responsibilities: Array.isArray(jobData.responsibilities) ? jobData.responsibilities : [],
        benefits: Array.isArray(jobData.benefits) ? jobData.benefits : [],
        company: jobData.company || ''
      }

      setJob(job)

      // Fetch similar jobs
      const { data: similarJobsData } = await supabase
        .from('jobs')
        .select('*')
        .eq('department', job.department)
        .neq('id', job.id)
        .eq('status', 'active')
        .limit(3)

      if (similarJobsData) {
        setSimilarJobs(similarJobsData)
      }

    } catch (error) {
      console.error('Error in fetchJobDetails:', error)
      toast.error("Failed to fetch job details")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Job Opening: ${job?.title}`,
        text: `Check out this job opportunity: ${job?.title} at Legend`,
        url: window.location.href
      })
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5E366D] border-t-transparent"></div>
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
                <Button className="bg-[#5E366D] hover:bg-[#5E366D]/90 text-white">
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
        <div className="bg-[#5E366D] text-white py-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/images/careers-pattern.svg')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Link 
              href="/careers/jobs"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <p className="text-2xl text-white/90 mb-6">{job.company}</p>
              <div className="flex flex-wrap gap-6 text-white/90 mb-8">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
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
                {job.experience_level && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <span>{job.experience_level}</span>
                  </div>
                )}
                {job.team_size && (
                  <div className="flex items-center gap-2">
                    <Users2 className="h-5 w-5" />
                    <span>Team Size: {job.team_size}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Posted {format(new Date(job.created_at), 'MMMM d, yyyy')}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="bg-[#EE8900] hover:bg-[#EE8900]/90 text-white px-8 py-2.5"
                  size="lg"
                >
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
                {/* Job Description */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <div className="prose max-w-none text-gray-600">
                    {job.description}
                  </div>
                </section>

                {/* Key Responsibilities */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex gap-3 text-gray-600">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#EE8900] mt-2"></span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Requirements */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex gap-3 text-gray-600">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#EE8900] mt-2"></span>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits</h2>
                    <ul className="space-y-3">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex gap-3 text-gray-600">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#EE8900] mt-2"></span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>

            {/* Right Column - Similar Jobs */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Jobs</h2>
                {similarJobs.length > 0 ? (
                  <div className="space-y-6">
                    {similarJobs.map((similarJob) => (
                      <Link 
                        key={similarJob.id}
                        href={`/careers/jobs/${similarJob.id}`}
                        className="block p-4 rounded-lg border border-gray-100 hover:border-[#5E366D] transition-colors"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{similarJob.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{similarJob.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{similarJob.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{similarJob.type}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No similar jobs found</p>
                )}
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
          company={job.company}
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      )}
    </>
  )
} 