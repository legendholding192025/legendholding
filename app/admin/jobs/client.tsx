"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { JobsTable } from "@/components/admin/jobs-table"
import { JobForm } from "@/components/admin/job-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

interface Job {
  id: string
  title: string
  description: string
  requirements: string
  location: string
  job_type: string
  experience_level: string
  salary_range: string
  department: string
  posted_at: string
  deadline: string
  is_active: boolean
  created_at: string
  updated_at: string
}

type JobFormData = {
  title: string
  description: string
  requirements: string
  location: string
  job_type: string
  experience_level: string
  salary_range: string
  department: string
  deadline: string
  is_active: boolean
}

export function JobsClient() {
  const supabase = createClientComponentClient()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setJobs(data || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast.error("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (formData: JobFormData) => {
    try {
      setLoading(true)
      const jobData = {
        ...formData,
        posted_at: new Date().toISOString()
      }
      
      const { data, error } = await supabase
        .from("jobs")
        .insert([jobData])
        .select()
        .single()

      if (error) throw error

      setJobs(prev => [data, ...prev])
      setIsFormOpen(false)
      toast.success("Job created successfully")
    } catch (error) {
      console.error("Error creating job:", error)
      toast.error("Failed to create job")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: string, formData: JobFormData) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("jobs")
        .update(formData)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      setJobs(prev => prev.map(job => job.id === id ? data : job))
      setEditingJob(null)
      setIsFormOpen(false)
      toast.success("Job updated successfully")
    } catch (error) {
      console.error("Error updating job:", error)
      toast.error("Failed to update job")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id)

      if (error) throw error

      setJobs(prev => prev.filter(job => job.id !== id))
      toast.success("Job deleted successfully")
    } catch (error) {
      console.error("Error deleting job:", error)
      toast.error("Failed to delete job")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setIsFormOpen(true)
  }

  return (
    <AdminDashboardLayout onSignOut={() => {}}>
      <div className="p-8">
        <div className="flex items-center justify-between">
          <DashboardHeader 
            title="Jobs Management" 
            description="Create and manage job postings" 
          />
          <Button onClick={() => setIsFormOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </div>

        <div className="mt-8">
          <JobsTable 
            jobs={jobs}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? "Edit Job" : "Create New Job"}
              </DialogTitle>
            </DialogHeader>
            <JobForm
              job={editingJob}
              onSubmit={editingJob ? 
                (data) => handleUpdate(editingJob.id, data) : 
                handleCreate
              }
              onCancel={() => {
                setIsFormOpen(false)
                setEditingJob(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  )
} 