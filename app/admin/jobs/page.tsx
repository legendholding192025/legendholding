"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { JobsTable } from "@/components/admin/jobs-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
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
import { Textarea } from "@/components/ui/textarea"

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
  company: string
}

// Helper function to convert description text to bullet points for display
const convertDescriptionToBulletPoints = (description: string | null | undefined): string[] => {
  if (!description || typeof description !== 'string') return []
  return description.split('\n').map(line => line.trim()).filter(line => line !== '')
}

// Helper function to convert bullet points back to text for storage
const convertBulletPointsToText = (bulletPoints: string[]): string => {
  return bulletPoints.join('\n')
}

export default function JobsManagement() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [newJob, setNewJob] = useState<Omit<Job, 'id' | 'created_at'>>({
    title: "",
    department: "",
    location: "",
    description: [],
    requirements: [],
    responsibilities: [],
    job_type: "Full-time",
    status: 'active',
    company: ""
  })
  const [requirementsText, setRequirementsText] = useState("")
  const [responsibilitiesText, setResponsibilitiesText] = useState("")
  const [descriptionText, setDescriptionText] = useState("")


  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast.error("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const validateJob = () => {
    if (!newJob.title.trim()) {
      toast.error("Job title is required")
      return false
    }
    if (!newJob.department.trim()) {
      toast.error("Department is required")
      return false
    }
    if (!newJob.location.trim()) {
      toast.error("Location is required")
      return false
    }
    if (!descriptionText.trim()) {
      toast.error("Description is required")
      return false
    }
    if (!requirementsText.trim()) {
      toast.error("At least one requirement is needed")
      return false
    }
    if (!responsibilitiesText.trim()) {
      toast.error("At least one responsibility is needed")
      return false
    }
    if (!newJob.company.trim()) {
      toast.error("Company name is required")
      return false
    }
    return true
  }

  const handleAddJob = async () => {
    try {
      if (!validateJob()) return

      const description = descriptionText
        .split("\n")
        .map((desc) => desc.trim())
        .filter((desc) => desc !== "");

      const requirements = requirementsText
        .split("\n")
        .map((req) => req.trim())
        .filter((req) => req !== "");

      const responsibilities = responsibilitiesText
        .split("\n")
        .map((resp) => resp.trim())
        .filter((resp) => resp !== "");

      // Create the job data object
      const jobData = {
        title: newJob.title ?? '',
        department: newJob.department ?? '',
        location: newJob.location ?? '',
        description: description,
        status: newJob.status ?? 'active',
        job_type: newJob.job_type ?? 'Full-time',
        requirements: requirements,
        responsibilities: responsibilities,
        company: newJob.company ?? ''
      }

      console.log('jobData to insert:', jobData)

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()

      console.log('Supabase response data:', data);
      console.log('Supabase response error:', error);

      if (error) {
        throw error
      }

      toast.success("Job posted successfully")
      setIsAddingJob(false)
      setNewJob({
        title: "",
        department: "",
        location: "",
        description: [],
        requirements: [],
        responsibilities: [],
        job_type: "Full-time",
        status: 'active',
        company: ""
      })
      setDescriptionText("")
      setRequirementsText("")
      setResponsibilitiesText("")
      fetchJobs()
    } catch (error: any) {
      console.error('Error adding job:', error)
      console.error('Supabase error details:', error)
      toast.error(`Failed to post job: ${error.message || 'An unknown error occurred'}`)
    }
  }

  const handleUpdateJob = async (id: string, data: Partial<Job>) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update(data)
        .eq('id', id)

      if (error) throw error

      setJobs(prev =>
        prev.map(job =>
          job.id === id ? { ...job, ...data } : job
        )
      )
      toast.success("Job updated successfully")
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error("Failed to update job")
      throw error
    }
  }

  const handleDeleteJob = async (id: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)

      if (error) throw error

      setJobs(prev => prev.filter(job => job.id !== id))
      toast.success("Job deleted successfully")
    } catch (error) {
      console.error('Error deleting job:', error)
      toast.error("Failed to delete job")
      throw error
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Jobs Management</h1>
            <p className="text-sm text-gray-500">Manage job postings and view applications</p>
          </div>
          <Button onClick={() => setIsAddingJob(true)} className="bg-[#5E366D] hover:bg-[#5E366D]/90">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <JobsTable
          jobs={jobs}
          loading={loading}
          onDelete={handleDeleteJob}
          onUpdate={handleUpdateJob}
        />
      </div>

      {/* Add Job Dialog */}
      <Dialog open={isAddingJob} onOpenChange={setIsAddingJob}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>
              Fill in the details for the new job posting. Enter each description point, requirement, and responsibility on a new line - each line will become a bullet point.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={newJob.company}
                  onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="e.g. Legend Motors"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={newJob.department}
                  onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g. Engineering"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Dubai, UAE"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job_type">Job Type *</Label>
                <select
                  id="job_type"
                  value={newJob.job_type}
                  onChange={(e) => setNewJob(prev => ({ ...prev, job_type: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Job Description * (each line will become a bullet point)</Label>
              <Textarea
                id="description"
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                placeholder="Enter each description point on a new line&#10;For example:&#10;• Lead development of new features&#10;• Collaborate with cross-functional teams&#10;• Maintain code quality and standards"
                className="h-32"
                required
              />
            </div>
            <div>
              <Label htmlFor="responsibilities">Responsibilities * (one per line)</Label>
              <Textarea
                id="responsibilities"
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                placeholder="Enter each responsibility on a new line"
                className="h-32"
                required
              />
            </div>
            <div>
              <Label htmlFor="requirements">Preferred Skills * (one per line)</Label>
              <Textarea
                id="requirements"
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                placeholder="Enter each requirement on a new line"
                className="h-32"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingJob(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddJob} className="bg-secondary hover:bg-secondary/90">
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  )
} 