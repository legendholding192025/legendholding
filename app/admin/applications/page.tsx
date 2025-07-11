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
import { Eye, Trash2, Download, Search, Filter } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { UnauthorizedAccess } from "@/components/admin/unauthorized-access"
import { useAdminPermissions } from "@/hooks/use-admin-permissions"

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
  const { userRole, isLoading: permissionsLoading, hasPermission } = useAdminPermissions()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [jobFilter, setJobFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"table" | "grouped">("table")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchApplications()
    fetchJobs()
  }, [])

  const fetchApplications = async () => {
    try {
      // Get current user and role first
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('User not authenticated')
        return
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single()

      if (!roleData) {
        toast.error('Unable to determine user role')
        return
      }

      // The RLS policies will automatically filter applications based on user role
      // Super admins will see all applications, regular admins will see only applications for their jobs
      let query = supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs(id, title, department)
        `)
        .order('created_at', { ascending: false })

      // WORKAROUND: Explicitly filter applications based on user role since RLS is not working
      if (roleData?.role === 'admin') {
        // Regular admins can only see applications for jobs they created
        const { data: userJobs } = await supabase
          .from('jobs')
          .select('id')
          .eq('created_by', user?.id)
        
        const userJobIds = userJobs?.map(job => job.id) || []
        if (userJobIds.length > 0) {
          query = query.in('job_id', userJobIds)
        } else {
          // If admin has no jobs, they should see no applications
          // Return empty array instead of using invalid UUID
          setApplications([])
          return
        }
      }
      // Super admins see all applications (no additional filter needed)

      const { data: applicationsData, error: applicationsError } = await query

      if (applicationsError) throw applicationsError

      if (!applicationsData) {
        setApplications([])
        return
      }

      setApplications(applicationsData)
    } catch (error) {
      console.error('Error fetching applications:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      toast.error(`Failed to load applications: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchJobs = async () => {
    try {
      // Get current user and role first
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
        .select('id, title, department')
        .eq('status', 'active')
        .order('title', { ascending: true })

      // WORKAROUND: Explicitly filter jobs based on user role since RLS is not working
      if (roleData?.role === 'admin') {
        // Regular admins can only see jobs they created
        query = query.eq('created_by', user?.id)
      }
      // Super admins see all jobs (no additional filter needed)

      const { data: jobsData, error: jobsError } = await query

      if (jobsError) throw jobsError

      if (jobsData) {
        setJobs(jobsData)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
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

  const handleDownloadResume = async (url: string, fullName: string) => {
    try {
      let fileExt = 'pdf';
      let fileName = fullName.replace(/\s+/g, '_') + '_resume';
      let downloadUrl: string;
      let blob: Blob;

      if (url.startsWith('data:')) {
        // Base64 file
        const match = url.match(/^data:(.*?);/);
        if (match) {
          const mime = match[1];
          if (mime === 'application/pdf') fileExt = 'pdf';
          else if (mime === 'application/msword') fileExt = 'doc';
          else if (mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') fileExt = 'docx';
          else fileExt = 'bin';
        }
        downloadUrl = url;
      } else {
        // Storage file
        const path = url;
        const extMatch = path.match(/\.([a-zA-Z0-9]+)$/);
        if (extMatch) fileExt = extMatch[1];
        // Fetch the file as blob
        const response = await fetch(url);
        blob = await response.blob();
        downloadUrl = window.URL.createObjectURL(blob);
      }
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${fileName}.${fileExt}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (!url.startsWith('data:')) {
        window.URL.revokeObjectURL(downloadUrl);
      }
      toast.success('Resume download started');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    }
  }

    const handlePreviewResume = async (url: string, fullName: string) => {
    try {
      console.log('Original resume URL:', url);
      
      // Handle base64 encoded files
      if (url.startsWith('data:')) {
        console.log('Processing base64 file...');
        try {
          // Extract the base64 data and MIME type
          const [mimepart, base64Data] = url.split(',');
          const mimeType = mimepart.split(':')[1].split(';')[0];
          
          console.log('Detected MIME type:', mimeType);
          
          // Convert base64 to binary
          const binaryString = atob(base64Data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          // Handle different file types
          if (mimeType === 'application/pdf') {
            // PDF - can be previewed directly
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            
            console.log('Created blob URL for PDF');
            
            const newWindow = window.open(blobUrl, '_blank');
            if (newWindow) {
              toast.success('Resume opened in new tab');
              setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
              }, 30000);
            } else {
              toast.error('Pop-up blocked. Please allow pop-ups for this site.');
              URL.revokeObjectURL(blobUrl);
            }
          } else if (mimeType.includes('word') || mimeType.includes('document') || mimeType.includes('officedocument')) {
            // Word document - create HTML preview page
            console.log('Word document detected - creating preview page');
            
            // Create the actual file blob
            const fileBlob = new Blob([bytes], { type: mimeType });
            const fileBlobUrl = URL.createObjectURL(fileBlob);
            
            // Determine file extension
            const fileExt = mimeType.includes('wordprocessingml') ? 'docx' : 'doc';
            const fileName = `${fullName.replace(/\s+/g, '_')}_resume.${fileExt}`;
            
            // Create HTML preview page
            const htmlContent = `
              <!DOCTYPE html>
              <html>
                <head>
                  <title>Resume Preview - ${fullName}</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      max-width: 800px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #f5f5f5;
                    }
                    .container {
                      background: white;
                      padding: 30px;
                      border-radius: 8px;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                      text-align: center;
                    }
                    .document-icon {
                      font-size: 64px;
                      color: #2B579A;
                      margin-bottom: 20px;
                    }
                    .document-info {
                      margin-bottom: 30px;
                    }
                    .download-btn {
                      background: #2B579A;
                      color: white;
                      padding: 12px 24px;
                      border: none;
                      border-radius: 5px;
                      font-size: 16px;
                      cursor: pointer;
                      text-decoration: none;
                      display: inline-block;
                    }
                    .download-btn:hover {
                      background: #1e3f73;
                    }
                    .file-details {
                      background: #f8f9fa;
                      padding: 15px;
                      border-radius: 5px;
                      margin: 20px 0;
                      text-align: left;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="document-icon">📄</div>
                    <h1>Resume Preview</h1>
                    <div class="document-info">
                      <h2>${fullName}</h2>
                      <p>Word Document (${fileExt.toUpperCase()})</p>
                    </div>
                                         <div class="file-details">
                       <strong>Note:</strong> Browser can't read word files, Please download the resume.
                     </div>
                    <a href="${fileBlobUrl}" download="${fileName}" class="download-btn">
                      📥 Download Resume
                    </a>
                    <script>
                      // Auto cleanup after 5 minutes
                      setTimeout(() => {
                        document.body.innerHTML = '<div class="container"><h2>Session Expired</h2><p>This preview link has expired for security reasons.</p></div>';
                      }, 300000);
                    </script>
                  </div>
                </body>
              </html>
            `;
            
            // Create HTML blob and open it
            const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
            const htmlBlobUrl = URL.createObjectURL(htmlBlob);
            
            const newWindow = window.open(htmlBlobUrl, '_blank');
            if (newWindow) {
              toast.success('Word document preview opened');
              // Clean up after a longer delay since the page contains the download link
              setTimeout(() => {
                URL.revokeObjectURL(fileBlobUrl);
                URL.revokeObjectURL(htmlBlobUrl);
              }, 300000); // 5 minutes
            } else {
              toast.error('Pop-up blocked. Please allow pop-ups for this site.');
              URL.revokeObjectURL(fileBlobUrl);
              URL.revokeObjectURL(htmlBlobUrl);
            }
          } else {
            // Other file types - try direct view
            console.log('Unknown file type, attempting direct view');
            const blob = new Blob([bytes], { type: mimeType });
            const blobUrl = URL.createObjectURL(blob);
            
            const newWindow = window.open(blobUrl, '_blank');
            if (newWindow) {
              toast.success('Resume opened in new tab');
              setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
              }, 30000);
            } else {
              toast.error('Pop-up blocked. Please allow pop-ups for this site.');
              URL.revokeObjectURL(blobUrl);
            }
          }
          return;
        } catch (error) {
          console.error('Error processing base64 file:', error);
          toast.error('Failed to process resume file');
          return;
        }
      }
      
      if (url.startsWith('http')) {
        // Full URL - open directly
        window.open(url, '_blank');
        toast.success('Resume opened in new tab');
        return;
      }
      
      // For storage paths, try public URL approach
      let filePath = url;
      if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
      }
      
      console.log('Processed file path:', filePath);
      
      // Try getting public URL from resumes bucket
      const { data: publicUrlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);
      
      if (publicUrlData?.publicUrl) {
        console.log('Public URL:', publicUrlData.publicUrl);
        window.open(publicUrlData.publicUrl, '_blank');
        toast.success('Resume opened in new tab');
        return;
      }
      
      // Try getting public URL from applications bucket
      const { data: publicUrlData2 } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);
      
      if (publicUrlData2?.publicUrl) {
        console.log('Public URL from applications:', publicUrlData2.publicUrl);
        window.open(publicUrlData2.publicUrl, '_blank');
        toast.success('Resume opened in new tab');
        return;
      }
      
      throw new Error('Unable to generate preview URL');
      
    } catch (error) {
      console.error('Error previewing resume:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to preview resume: ${errorMessage}`);
    }
  }

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'outline'
      case 'reviewed':
        return 'secondary'
      case 'shortlisted':
        return 'default'
      case 'rejected':
        return 'destructive'
      case 'hired':
        return 'default'
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
    const matchesJob = jobFilter === "all" || application.job_id === jobFilter

    return matchesSearch && matchesStatus && matchesJob
  })

  // Group applications by job
  const groupedApplications = filteredApplications.reduce((acc, application) => {
    const jobTitle = application.job?.title || 'Unknown Position'
    const jobId = application.job_id
    
    if (!acc[jobId]) {
      acc[jobId] = {
        job: application.job || { id: jobId, title: jobTitle, department: 'Unknown' },
        applications: []
      }
    }
    
    acc[jobId].applications.push(application)
    return acc
  }, {} as Record<string, { job: Job, applications: JobApplication[] }>)

  const getApplicationStats = () => {
    const stats = {
      total: filteredApplications.length,
      pending: filteredApplications.filter(app => app.status === 'pending').length,
      reviewed: filteredApplications.filter(app => app.status === 'reviewed').length,
      shortlisted: filteredApplications.filter(app => app.status === 'shortlisted').length,
      rejected: filteredApplications.filter(app => app.status === 'rejected').length,
      hired: filteredApplications.filter(app => app.status === 'hired').length,
    }
    return stats
  }

  const handleSignOut = async () => {
    try {
      console.log('Signing out from applications...')
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

  const renderApplicationRow = (application: JobApplication) => (
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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviewResume(application.resume_url, application.full_name)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadResume(application.resume_url, application.full_name)}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
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
  )

  // Check if user has applications permission
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

  if (!hasPermission('applications')) {
    return (
      <UnauthorizedAccess 
        requiredPermission="applications"
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
            <p className="text-sm text-gray-600">Loading applications...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  const stats = getApplicationStats()

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Job Applications</h1>
            <p className="text-sm text-gray-500">
              {userRole?.role === 'super_admin' 
                ? 'You can view applications for all job posts from all admins'
                : 'You can only view applications for job posts you have created'
              }
            </p>
          </div>
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
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              onClick={() => setViewMode("table")}
            >
              Table View
            </Button>
            <Button
              variant={viewMode === "grouped" ? "default" : "outline"}
              onClick={() => setViewMode("grouped")}
            >
              Grouped by Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.hired}</div>
            </CardContent>
          </Card>
        </div>

        {viewMode === "table" ? (
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
                {filteredApplications.map(renderApplicationRow)}
                {filteredApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-gray-500">
                        <p>No applications found</p>
                        {userRole?.role === 'admin' && jobs.length === 0 && (
                          <p className="text-sm mt-2">You haven't created any jobs yet. Create a job post to start receiving applications.</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedApplications).map(([jobId, { job, applications }]) => (
              <Card key={jobId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.department}</div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {applications.length} application{applications.length !== 1 ? 's' : ''}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            {format(new Date(application.created_at), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="font-medium">{application.full_name}</TableCell>
                          <TableCell>{application.email}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(application.status)}>
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreviewResume(application.resume_url, application.full_name)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadResume(application.resume_url, application.full_name)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
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
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
            {Object.keys(groupedApplications).length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="text-gray-500">
                    <p>No applications found</p>
                    {userRole?.role === 'admin' && jobs.length === 0 && (
                      <p className="text-sm mt-2">You haven't created any jobs yet. Create a job post to start receiving applications.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  )
} 