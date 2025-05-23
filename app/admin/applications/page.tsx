"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, Mail, Phone } from "lucide-react"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import * as XLSX from 'xlsx'

interface Application {
  id: string
  job_id: string
  full_name: string
  email: string
  phone: string
  cover_letter: string
  resume_url: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  created_at: string
  job: {
    title: string
    department: string
  }
}

export default function ApplicationsManagement() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [viewingResume, setViewingResume] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs (
            title,
            department
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error("Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: Application['status']) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      setApplications(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status } : app
        )
      )
      toast.success("Application status updated")
    } catch (error) {
      console.error('Error updating application status:', error)
      toast.error("Failed to update status")
    }
  }

  const downloadResume = async (application: Application) => {
    try {
      const { data, error } = await supabase.storage
        .from('applications')
        .download(application.resume_url)

      if (error) throw error

      // Create a download link
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${application.full_name}_resume.${application.resume_url.split('.').pop()}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading resume:', error)
      toast.error("Failed to download resume")
    }
  }

  const exportToExcel = () => {
    try {
      const exportData = applications.map(app => ({
        'Date': new Date(app.created_at).toLocaleDateString(),
        'Job Title': app.job?.title || 'N/A',
        'Department': app.job?.department || 'N/A',
        'Applicant Name': app.full_name,
        'Email': app.email,
        'Phone': app.phone,
        'Status': app.status.charAt(0).toUpperCase() + app.status.slice(1)
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Applications')
      XLSX.writeFile(wb, 'job_applications.xlsx')
      toast.success("Data exported successfully")
    } catch (error) {
      console.error('Error exporting data:', error)
      toast.error("Failed to export data")
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'reviewed':
        return 'bg-blue-100 text-blue-700'
      case 'shortlisted':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Job Applications</h1>
            <p className="text-sm text-gray-500">View and manage job applications</p>
          </div>
          <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    {new Date(application.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{application.job?.title || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{application.job?.department || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>{application.full_name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <a
                        href={`mailto:${application.email}`}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        {application.email}
                      </a>
                      <a
                        href={`tel:${application.phone}`}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        {application.phone}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value as Application['status'])}
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(application.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedApplication(application)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadResume(application)}
                        title="Download Resume"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Detailed information about the application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Job Details</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedApplication.job?.title} - {selectedApplication.job?.department}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Application Date</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(selectedApplication.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Applicant Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {selectedApplication.full_name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedApplication.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {selectedApplication.phone}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Cover Letter</h3>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                  {selectedApplication.cover_letter}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Status</h3>
                <select
                  value={selectedApplication.status}
                  onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value as Application['status'])}
                  className={`mt-2 px-3 py-1 rounded-md text-sm ${getStatusColor(selectedApplication.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => downloadResume(selectedApplication)}
                  className="bg-[#5E366D] hover:bg-[#5E366D]/90"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminDashboardLayout>
  )
} 