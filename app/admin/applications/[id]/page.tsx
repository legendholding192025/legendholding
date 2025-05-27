"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, Download, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { format } from "date-fns"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"

interface Job {
  id: string
  title: string
  department: string
}

interface JobApplication {
  id: string
  job_id: string
  full_name: string
  email: string
  phone: string
  resume_url: string
  cover_letter: string | null
  status: string
  created_at: string
  job?: Job
}

export default function ApplicationDetails() {
  const params = useParams()
  const applicationId = params?.id as string
  const router = useRouter()
  const [application, setApplication] = useState<JobApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!applicationId) return
    fetchApplicationDetails()
  }, [applicationId])

  const fetchApplicationDetails = async () => {
    try {
      const { data: applicationData, error: applicationError } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs(id, title, department)
        `)
        .eq('id', applicationId)
        .single()

      if (applicationError) throw applicationError

      if (!applicationData) {
        setApplication(null)
        return
      }

      setApplication(applicationData)
    } catch (error) {
      console.error('Error fetching application details:', error)
      toast.error('Failed to load application details')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!application) return

    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', application.id)

      if (error) throw error

      setApplication({ ...application, status: newStatus })
      toast.success('Status updated successfully')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async () => {
    if (!application || !confirm('Are you sure you want to delete this application? This action cannot be undone.')) return

    try {
      // First delete the resume from storage
      const resumeFileName = application.resume_url.split('/').pop()
      if (resumeFileName) {
        const { error: storageError } = await supabase
          .storage
          .from('resumes')
          .remove([`public/${resumeFileName}`])

        if (storageError) {
          console.error('Error deleting resume file:', storageError)
        }
      }

      // Then delete the application record
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', application.id)

      if (error) throw error

      toast.success('Application deleted successfully')
      router.push('/admin/applications')
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  const handleDownloadResume = async () => {
    if (!application) return

    try {
      const response = await fetch(application.resume_url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${application.full_name.replace(/\s+/g, '_')}_resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      
      toast.success('Resume download started')
    } catch (error) {
      console.error('Error downloading resume:', error)
      toast.error('Failed to download resume')
    }
  }

  const handleViewResume = () => {
    if (application?.resume_url) {
      window.open(application.resume_url, '_blank')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <AdminDashboardLayout onSignOut={handleSignOut}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
            <p className="text-sm text-gray-600">Loading application details...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (!application) {
    return (
      <AdminDashboardLayout onSignOut={handleSignOut}>
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h1>
            <p className="text-gray-600 mb-8">The application you're looking for doesn't exist or has been removed.</p>
            <Link href="/admin/applications">
              <Button>Back to Applications</Button>
            </Link>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/admin/applications"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Applications
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Application from {application.full_name}
                </h1>
                <p className="text-gray-600">
                  Applied for {application.job?.title || 'Unknown Position'}
                  {application.job?.department && ` in ${application.job.department}`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted on {format(new Date(application.created_at), 'MMMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={application.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Phone</h2>
                <p className="text-gray-900">{application.phone}</p>
              </div>
            </div>

            {application.cover_letter && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-500 mb-2">Cover Letter</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{application.cover_letter}</p>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">Resume</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={handleViewResume}
                  className="inline-flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
} 