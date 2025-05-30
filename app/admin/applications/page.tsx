"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, Download, Search } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
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

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs(id, title, department)
        `)
        .order('created_at', { ascending: false })

      if (applicationsError) throw applicationsError

      if (!applicationsData) {
        setApplications([])
        return
      }

      setApplications(applicationsData)
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) return

    try {
      // First find the application to get the resume URL
      const application = applications.find(app => app.id === id)
      if (application) {
        // Delete the resume file from storage
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
      }

      // Then delete the application record
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)

      if (error) throw error

      setApplications(applications.filter(app => app.id !== id))
      toast.success('Application deleted successfully')
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  const handleDownloadResume = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
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

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'outline'
      case 'reviewing':
        return 'secondary'
      case 'accepted':
        return 'default'
      case 'rejected':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job?.department?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || application.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
            <p className="text-sm text-gray-600">Loading applications...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Applications</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    {format(new Date(application.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="font-medium">{application.full_name}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{application.job?.title || 'N/A'}</div>
                      {application.job?.department && (
                        <div className="text-sm text-gray-500">{application.job.department}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadResume(
                        application.resume_url,
                        `${application.full_name.replace(/\s+/g, '_')}_resume.pdf`
                      )}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(application.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">No applications found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminDashboardLayout>
  )
} 