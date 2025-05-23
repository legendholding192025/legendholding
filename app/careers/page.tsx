"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Search, MapPin, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string // Full-time, Part-time, Contract
  description: string
  requirements: string[]
  responsibilities: string[]
  created_at: string
  status: 'active' | 'inactive'
}

export default function CareersPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      
      // First try with status filter
      let { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      // If we get a column does not exist error, try without the status filter
      if (jobsError && jobsError.code === '42703') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false })
        
        jobsData = fallbackData
        jobsError = fallbackError
      }

      if (jobsError) {
        console.error('Error fetching jobs:', jobsError)
        toast.error(jobsError.message || "Failed to fetch jobs")
        return
      }

      if (!jobsData) {
        console.warn('No jobs data returned')
        setJobs([])
        return
      }

      // Type check and transform the data
      const validJobs = jobsData.map(job => ({
        ...job,
        requirements: Array.isArray(job.requirements) ? job.requirements : [],
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
        status: job.status || 'active' // Provide default status if it doesn't exist
      }))

      setJobs(validJobs)
    } catch (error) {
      console.error('Error in fetchJobs:', error)
      toast.error("An unexpected error occurred while fetching jobs")
    } finally {
      setLoading(false)
    }
  }

  const departments = [...new Set(jobs.map(job => job.department))]
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    
    return matchesSearch && matchesDepartment
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative bg-[#5E366D] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dosxengut/image/upload/v1747999528/1-2_1_1_1_m1wpov.jpg"
              alt="Legend Hero Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#5E366D]/80 mix-blend-multiply" />
          </div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
                Join Our Team
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Shape the Future<br />of Innovation
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mb-8">
                Join a team of passionate innovators and problem-solvers dedicated to pushing the boundaries of what's possible.
              </p>
              <Button
                onClick={() => {
                  const jobsSection = document.getElementById('open-positions')
                  jobsSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white hover:bg-white/90 text-[#5E366D] px-8 py-3 rounded-full text-lg font-medium"
              >
                View Open Positions
              </Button>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-white">
          {/* Main Content Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-[#5E366D]/10 text-[#5E366D] rounded-full text-sm font-medium mb-6">
                We're hiring!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" id="open-positions">
                Open Positions
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-12">
                We're looking for passionate people to join us on our mission. We value
                flat hierarchies, clear communication, and full ownership and responsibility.
              </p>
            </div>

            {/* Department Filters */}
            <div className="mt-12 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedDepartment("all")}
                className={`px-4 py-2 rounded-full text-base font-medium transition-colors
                  ${selectedDepartment === "all" 
                    ? "bg-[#5E366D] text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                View all
              </button>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-base font-medium transition-colors
                    ${selectedDepartment === dept 
                      ? "bg-[#5E366D] text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="mt-12 space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group border-b border-gray-100 pb-6 last:border-0"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#5E366D] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-base text-gray-500 mt-2">
                        We're looking for a {job.title.toLowerCase()} to join our team.
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-3">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-base">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-base">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                      </div>
                      <Button
                        onClick={() => router.push(`/careers/${job.id}`)}
                        className="flex items-center gap-2 bg-[#EE8900] hover:bg-[#EE8900]/90 text-white border-0 font-medium px-6 text-base"
                      >
                        Apply Now
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">No positions found</h3>
                  <p className="text-lg text-gray-500">
                    We couldn't find any positions matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Values Section */}
          <div className="border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Us?</h2>
                <p className="text-base md:text-lg text-gray-600 mb-12">
                  We offer more than just a job. Join us and be part of a team that values innovation, growth, and excellence.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Innovation First",
                    description: "Be part of groundbreaking projects and shape the future of mobility.",
                    icon: "🚀"
                  },
                  {
                    title: "Growth & Development",
                    description: "Continuous learning and career advancement opportunities.",
                    icon: "📈"
                  },
                  {
                    title: "Global Impact",
                    description: "Make a difference in the global mobility and energy landscape.",
                    icon: "🌍"
                  },
                  {
                    title: "Work-Life Balance",
                    description: "Flexible work environment that promotes wellness and personal growth.",
                    icon: "⭐"
                  }
                ].map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-base text-gray-600">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#5E366D] text-white">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Don't See the Right Role?
                </h2>
                <p className="text-base md:text-lg text-gray-200 mb-8">
                  We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <Button
                  onClick={() => router.push('/careers/submit-resume')}
                  className="bg-[#EE8900] hover:bg-[#EE8900]/90 text-white px-8 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 text-lg font-medium"
                >
                  Submit Your Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 