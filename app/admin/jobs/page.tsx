"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { JobsTable } from "@/components/admin/jobs-table"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
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
import { UnauthorizedAccess } from "@/components/admin/unauthorized-access"
import { useAdminPermissions } from "@/hooks/use-admin-permissions"

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
  created_by?: string
  created_by_user?: {
    email: string
    role: string
  }
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
  const { userRole, isLoading: permissionsLoading, hasPermission } = useAdminPermissions()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [isSubmittingJob, setIsSubmittingJob] = useState(false)
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
      
      // Get current user and role
      const { data: { user } } = await supabase.auth.getUser()
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single()
      
      // The RLS policies will automatically filter jobs based on user role
      // Super admins will see all jobs, regular admins will see only their own
      let query = supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
      
      // WORKAROUND: Explicitly filter jobs based on user role since RLS is not working
      if (roleData?.role === 'admin') {
        // Regular admins can only see jobs they created
        query = query.eq('created_by', user?.id)
      }
      // Super admins see all jobs (no additional filter needed)
      
      const { data: jobsData, error } = await query

      if (error) throw error
      
      // Fetch user information for each job
      const jobsWithUsers = await Promise.all(
        (jobsData || []).map(async (job) => {
          if (job.created_by) {
            try {
              // First try to get from user_roles table
              const { data: userRoleData } = await supabase
                .from('user_roles')
                .select('email, role')
                .eq('user_id', job.created_by)
                .single()
              
              if (userRoleData) {
                return {
                  ...job,
                  created_by_user: userRoleData
                }
              }
              
              // If not found in user_roles, call the function to add missing users
              try {
                await supabase.rpc('add_missing_user_roles')
                
                // Try again after adding missing users
                const { data: retryUserData } = await supabase
                  .from('user_roles')
                  .select('email, role')
                  .eq('user_id', job.created_by)
                  .single()
                
                if (retryUserData) {
                  return {
                    ...job,
                    created_by_user: retryUserData
                  }
                }
              } catch (functionError) {
                console.log('Could not auto-add missing user roles:', functionError)
              }
              
              // Final fallback - show user ID if available
              return {
                ...job,
                created_by_user: {
                  email: `User ${job.created_by.substring(0, 8)}...`,
                  role: 'admin'
                }
              }
            } catch (error) {
              console.error('Error fetching user data for job:', job.id, error)
              return {
                ...job,
                created_by_user: {
                  email: `User ${job.created_by.substring(0, 8)}...`,
                  role: 'admin'
                }
              }
            }
          }
          return job
        })
      )
      
      setJobs(jobsWithUsers)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      toast.error(`Failed to fetch jobs: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
    if (!newJob.company.trim()) {
      toast.error("Company name is required")
      return false
    }
    return true
  }

  const handleAddJob = async () => {
    try {
      if (!validateJob()) return

      // Prevent multiple submissions
      setIsSubmittingJob(true)

      // Get current user to set as created_by
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("You must be logged in to create a job")
        setIsSubmittingJob(false)
        return
      }

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
        company: newJob.company ?? '',
        created_by: user.id
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
    } finally {
      setIsSubmittingJob(false)
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
    try {
      console.log('Signing out from jobs...')
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
      }
      
      // Clear any local storage
      localStorage.removeItem('supabase.auth.token')
      
      // Force redirect to login page
      window.location.href = '/admin/login'
    } catch (error) {
      console.error("Error signing out:", error)
      // Force redirect anyway
      window.location.href = '/admin/login'
    }
  }

  // Check if user has jobs permission
  if (permissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading permissions...</p>
        </div>
      </div>
    )
  }

  if (!hasPermission('jobs')) {
    return (
      <UnauthorizedAccess 
        requiredPermission="jobs"
        currentUserRole={userRole?.role}
      />
    )
  }

  if (loading) {
    return (
      <AdminDashboardLayout onSignOut={handleSignOut}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
            <p className="text-sm text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Jobs Management</h1>
            <p className="text-sm text-gray-500">
              {userRole?.role === 'super_admin' 
                ? 'You can view and manage all job posts from all admins'
                : 'You can only view and manage job posts you have created'
              }
            </p>
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
      <Dialog 
        open={isAddingJob} 
        onOpenChange={(open) => {
          // Prevent closing dialog while submitting
          if (!isSubmittingJob) {
            setIsAddingJob(open)
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>
              Fill in the required details for the new job posting. Description, responsibilities, and preferred skills are optional. If provided, enter each point on a new line - each line will become a bullet point.
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
              <Label htmlFor="description">Job Description (optional - each line will become a bullet point)</Label>
              <Textarea
                id="description"
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                placeholder="Enter each description point on a new line&#10;For example:&#10;• Lead development of new features&#10;• Collaborate with cross-functional teams&#10;• Maintain code quality and standards"
                className="h-32"
              />
            </div>
            <div>
              <Label htmlFor="responsibilities">Responsibilities (optional - one per line)</Label>
              <Textarea
                id="responsibilities"
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                placeholder="Enter each responsibility on a new line"
                className="h-32"
              />
            </div>
            <div>
              <Label htmlFor="requirements">Preferred Skills (optional - one per line)</Label>
              <Textarea
                id="requirements"
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                placeholder="Enter each requirement on a new line"
                className="h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddingJob(false)}
              disabled={isSubmittingJob}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddJob} 
              className="bg-secondary hover:bg-secondary/90"
              disabled={isSubmittingJob}
            >
              {isSubmittingJob ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting Job...
                </>
              ) : (
                'Post Job'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  )
} 