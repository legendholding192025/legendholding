"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Calendar, User, Mail, Phone, FileText } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface JobApplication {
  id: string
  job_id: string
  full_name: string
  email: string
  phone: string
  cover_letter: string
  resume_url: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired'
  created_at: string
  job?: {
    title: string
    company: string
    department: string
  }
}

interface JobApplicationsDashboardProps {
  onSignOut: () => void
  showHeader?: boolean
}

export function JobApplicationsDashboard({ onSignOut, showHeader = true }: JobApplicationsDashboardProps) {
  const supabase = createClientComponentClient()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  // Auto-refresh data every 30 seconds to keep dashboard up to date
  useEffect(() => {
    const interval = setInterval(() => {
      fetchApplications()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Refresh data when user returns to the tab
  useEffect(() => {
    const handleFocus = () => {
      fetchApplications()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Stats are computed via lightweight count queries inside fetchApplications

  const fetchApplications = async () => {
    try {
      setLoading(true)
      // Fetch recent applications and counts in parallel for performance
      const [
        appsRes,
        totalRes,
        pendingRes,
        reviewedRes,
        shortlistedRes,
        rejectedRes,
        hiredRes
      ] = await Promise.all([
        supabase
          .from('job_applications')
          .select(`
            id, job_id, full_name, email, phone, status, created_at,
            job:jobs(title, department)
          `)
          .order('created_at', { ascending: false })
          .limit(50),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'reviewed'),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'shortlisted'),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'rejected'),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'hired')
      ])

      if (appsRes.error) throw appsRes.error

      const processedData = (appsRes.data || []).map(app => ({
        ...app,
        status: (app as any).status || 'pending'
      }))

      setApplications(processedData)

      setStats({
        total: totalRes.count || 0,
        pending: pendingRes.count || 0,
        reviewed: reviewedRes.count || 0,
        shortlisted: shortlistedRes.count || 0,
        rejected: rejectedRes.count || 0,
        hired: hiredRes.count || 0
      })
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error("Failed to fetch applications")
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: JobApplication['status']) => {
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
      console.error('Error updating application:', error)
      toast.error("Failed to update application")
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchApplications()
    toast.success("Data refreshed")
    setRefreshing(false)
  }

  const getStatusBadge = (status: JobApplication['status']) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      reviewed: { color: 'bg-blue-100 text-blue-800', label: 'Reviewed' },
      shortlisted: { color: 'bg-green-100 text-green-800', label: 'Shortlisted' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      hired: { color: 'bg-purple-100 text-purple-800', label: 'Hired' }
    }
    
    // Handle undefined, null, or invalid status values
    if (!status || !statusConfig[status as keyof typeof statusConfig]) {
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
    
    const config = statusConfig[status]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const downloadResume = async (resumeUrl: string, fileName: string) => {
    try {
      console.log('Attempting to download resume:', resumeUrl)
      
      // Handle base64 files stored in database
      if (resumeUrl.startsWith('data:')) {
        console.log('Downloading base64 file')
        const link = document.createElement('a')
        link.href = resumeUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("Resume downloaded successfully")
        return
      }
      
      // Handle different URL formats
      let filePath = resumeUrl
      
      // If it's a full URL, extract the path
      if (resumeUrl.startsWith('http')) {
        const url = new URL(resumeUrl)
        filePath = url.pathname.split('/').slice(-2).join('/') // Get last two parts of path
      }
      
      // Remove leading slash if present
      if (filePath.startsWith('/')) {
        filePath = filePath.substring(1)
      }
      
      console.log('Processed file path:', filePath)
      
      const { data, error } = await supabase.storage
        .from('applications')
        .download(filePath)

      if (error) {
        console.error('Storage download error:', error)
        
        // Try alternative bucket name
        if (error.message.includes('bucket') || error.message.includes('not found')) {
          console.log('Trying alternative bucket: resumes')
          const { data: altData, error: altError } = await supabase.storage
            .from('resumes')
            .download(filePath)
          
          if (altError) {
            console.error('Alternative bucket also failed:', altError)
            throw new Error(`File not found: ${fileName}`)
          }
          
          // Use alternative data
          const url = URL.createObjectURL(altData)
          const link = document.createElement('a')
          link.href = url
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          toast.success("Resume downloaded successfully")
          return
        }
        
        throw error
      }

      const url = URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast.success("Resume downloaded successfully")
    } catch (error) {
      console.error('Error downloading resume:', error)
      
      // Provide more specific error messages
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      if (errorMessage.includes('not found') || errorMessage.includes('File not found')) {
        toast.error("Resume file not found. It may have been deleted or moved.")
      } else if (errorMessage.includes('permission') || errorMessage.includes('access')) {
        toast.error("Permission denied. Please contact an administrator.")
      } else {
        toast.error("Failed to download resume. Please try again later.")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
          <p className="text-sm text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Only show if showHeader prop is true */}
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Job Applications Dashboard</h1>
            <p className="text-sm text-gray-500">Manage and review job applications</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={refreshing}>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {stats.total}
              {refreshing && <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.hired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            View and manage job applications by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed ({stats.reviewed})</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted ({stats.shortlisted})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
              <TabsTrigger value="hired">Hired ({stats.hired})</TabsTrigger>
            </TabsList>
            
            {['all', 'pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map((status) => (
              <TabsContent key={status} value={status} className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications
                        .filter(app => status === 'all' || (app.status || 'pending') === status)
                        .map((application) => (
                          <TableRow key={application.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{application.full_name}</div>
                                <div className="text-sm text-gray-500">{application.job?.title || 'N/A'}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{application.job?.title || 'N/A'}</div>
                                <div className="text-sm text-gray-500">{application.job?.department || 'N/A'}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="h-3 w-3" />
                                  {application.email}
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <Phone className="h-3 w-3" />
                                  {application.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {new Date(application.created_at).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(application.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Link href={`/admin/applications/${application.id}`}>
                                  <Button variant="ghost" size="sm" title="View Details">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 