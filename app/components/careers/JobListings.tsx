import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, ChevronRight, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Job {
  id: string
  title: string
  department: string
  location: string
  job_type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  created_at: string
  status: 'active' | 'inactive'
}

interface JobListingsProps {
  jobs: Job[]
  departments: string[]
  selectedDepartment: string
  setSelectedDepartment: (department: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function JobListings({
  jobs,
  departments,
  selectedDepartment,
  setSelectedDepartment,
  searchQuery,
  setSearchQuery
}: JobListingsProps) {
  const router = useRouter()

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-white">
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
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-base">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-base">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.job_type}
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => router.push(`/careers/jobs/${job.id}`)}
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
    </div>
  )
} 