"use client"

import { useState, useEffect, useRef } from "react"
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
  const [loadingMore, setLoadingMore] = useState(false)
  const [filtering, setFiltering] = useState(false) // Loading state for filter changes
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [jobFilter, setJobFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"table" | "grouped">("table")
  const [pageSize] = useState(50) // Reduced limit for faster load
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [filteredCount, setFilteredCount] = useState(0) // Count with job/status filters applied
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  }) // Status counts from database
  const [statusCountsLoading, setStatusCountsLoading] = useState(true) // Track if status counts are being loaded
  const userRoleCache = useRef<{ userId: string; role: string } | null>(null) // Cache user role
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchApplications()
    fetchJobs()
  }, [])

  // Refetch applications when filters change (skip initial mount)
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    // Clear previous data immediately to avoid showing stale data
    setApplications([])
    setFilteredCount(0)
    setStatusCounts({
      pending: 0,
      reviewed: 0,
      shortlisted: 0,
      rejected: 0,
      hired: 0
    })
    setStatusCountsLoading(true) // Show loading for status counts
    setFiltering(true) // Show loading state for filter changes
    fetchApplications(0) // Reset to first page when filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobFilter, statusFilter])

  const fetchApplications = async (offset: number = 0) => {
    try {
      // Get current user (cached in session)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('User not authenticated')
        setLoading(false)
        setFiltering(false)
        return
      }

      // Get user role (cached for performance)
      let userRole: string
      if (userRoleCache.current && userRoleCache.current.userId === user.id) {
        userRole = userRoleCache.current.role
      } else {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single()

        if (roleError || !roleData) {
          console.error('Error fetching user role:', roleError)
          toast.error('Unable to determine user role')
          setLoading(false)
          setFiltering(false)
          return
        }
        userRole = roleData.role
        userRoleCache.current = { userId: user.id, role: userRole }
      }

      // Get user job IDs - only for admin role
      // Include jobs created by user OR assigned to user
      // Always fetch fresh data to handle assignment changes
      let userJobIds: string[] | null = null
      if (userRole === 'admin') {
        // Get jobs created by user
        const { data: createdJobs } = await supabase
          .from('jobs')
          .select('id')
          .eq('created_by', user.id)
        
        // Get jobs assigned to user
        const { data: assignedJobs } = await supabase
          .from('jobs')
          .select('id')
          .eq('assigned_to', user.id)
        
        // Combine and deduplicate
        const createdIds = createdJobs?.map(job => job.id) || []
        const assignedIds = assignedJobs?.map(job => job.id) || []
        userJobIds = [...new Set([...createdIds, ...assignedIds])]
        
        if (userJobIds.length === 0) {
          setApplications([])
          setTotalCount(0)
          setFilteredCount(0)
          setStatusCounts({ pending: 0, reviewed: 0, shortlisted: 0, rejected: 0, hired: 0 })
          setHasMore(false)
          setLoading(false)
          setFiltering(false)
          setStatusCountsLoading(false)
          return
        }
      }

      // Determine if filters are active
      const isFiltered = jobFilter !== "all" || statusFilter !== "all"
      
      // Build data query with count - OPTIMIZED: Get data + count in single request
      let query = supabase
        .from('job_applications')
        .select(`
          id,
          job_id,
          full_name,
          email,
          phone,
          resume_url,
          cover_letter,
          status,
          created_at,
          job:jobs(id, title, department)
        `, { count: 'exact' }) // Include count in same query
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1)

      // Apply role-based filter
      if (userJobIds && userJobIds.length > 0) {
        query = query.in('job_id', userJobIds)
      }

      // Apply job filter
      if (jobFilter !== "all") {
        query = query.eq('job_id', jobFilter)
      }

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter)
      }

      // Execute query - gets data AND count in single request
      const { data: applicationsData, error: applicationsError, count: queryCount } = await query
      
      if (applicationsError) {
        console.error('Applications query error:', applicationsError)
        throw applicationsError
      }

      // Set data immediately for fast display
      if (applicationsData) {
        const transformedData: JobApplication[] = applicationsData.map((app: any) => ({
          ...app,
          job: Array.isArray(app.job) ? app.job[0] : app.job
        }))

        if (offset === 0) {
          setApplications(transformedData)
        } else {
          setApplications(prev => [...prev, ...transformedData])
        }
        
        // Set count and hasMore immediately from query result
        const currentCount = queryCount || 0
        const currentBatchSize = transformedData.length
        const totalLoaded = offset + currentBatchSize
        
        if (isFiltered) {
          setFilteredCount(currentCount)
        } else {
          setTotalCount(currentCount)
          setFilteredCount(currentCount)
        }
        
        // hasMore: got full page AND more items exist
        setHasMore(currentBatchSize === pageSize && totalLoaded < currentCount)
        
        // Clear filtering state immediately
        setFiltering(false)
        
        // For load more (offset > 0), we're done
        if (offset > 0) {
          setStatusCountsLoading(false)
          setLoading(false)
          return
        }
      }

      // Only fetch status counts on initial load (offset === 0) - in background
      if (offset === 0) {
        // Fire and forget - don't await
        const fetchStatusCounts = async () => {
          try {
            // Single query to get all status counts using RPC or parallel optimized queries
            const statusPromises = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(status => {
              let statusQuery = supabase
                .from('job_applications')
                .select('id', { count: 'exact', head: true })
                .eq('status', status)
              
              if (userJobIds && userJobIds.length > 0) {
                statusQuery = statusQuery.in('job_id', userJobIds)
              }
              if (jobFilter !== "all") {
                statusQuery = statusQuery.eq('job_id', jobFilter)
              }
              
              return statusQuery
            })

            const statusResults = await Promise.all(statusPromises)
            
            setStatusCounts({
              pending: statusResults[0]?.count || 0,
              reviewed: statusResults[1]?.count || 0,
              shortlisted: statusResults[2]?.count || 0,
              rejected: statusResults[3]?.count || 0,
              hired: statusResults[4]?.count || 0
            })
            setStatusCountsLoading(false)
          } catch (err) {
            console.error('Error fetching status counts:', err)
            setStatusCountsLoading(false)
          }
        }
        
        // Start background fetch (non-blocking)
        fetchStatusCounts()
        
        // Fetch total count in background if filtered
        if (isFiltered && totalCount === 0) {
          const fetchTotalCount = async () => {
            try {
              let totalQuery = supabase.from('job_applications').select('id', { count: 'exact', head: true })
              if (userJobIds && userJobIds.length > 0) {
                totalQuery = totalQuery.in('job_id', userJobIds)
              }
              const { count } = await totalQuery
              setTotalCount(count || 0)
            } catch (err) {
              console.error('Error fetching total count:', err)
            }
          }
          fetchTotalCount()
        }
      }
    } catch (error: any) {
      const errorMessage = error?.message || error?.code || 'Unknown error'
      console.error('Error fetching applications:', errorMessage, error)
      
      // Handle specific timeout error
      if (error?.code === '57014' || errorMessage?.includes('timeout') || errorMessage?.includes('canceling statement')) {
        toast.error('Query timeout - Loading most recent applications only')
        // Try a more limited query as fallback
        try {
          const { data: limitedData, error: fallbackError } = await supabase
            .from('job_applications')
            .select(`
              id,
              job_id,
              full_name,
              email,
              phone,
              resume_url,
              cover_letter,
              status,
              created_at,
              job:jobs(id, title, department)
            `)
            .order('created_at', { ascending: false })
            .limit(50)
          
          if (fallbackError) {
            console.error('Fallback query error:', fallbackError)
            throw fallbackError
          }
          
          if (limitedData) {
            // Transform data to match JobApplication type
            const transformedLimitedData: JobApplication[] = limitedData.map((app: any) => ({
              ...app,
              job: Array.isArray(app.job) ? app.job[0] : app.job
            }))
            setApplications(transformedLimitedData)
            // Calculate status counts from limited data as fallback
            setStatusCounts({
              pending: transformedLimitedData.filter(app => app.status === 'pending').length,
              reviewed: transformedLimitedData.filter(app => app.status === 'reviewed').length,
              shortlisted: transformedLimitedData.filter(app => app.status === 'shortlisted').length,
              rejected: transformedLimitedData.filter(app => app.status === 'rejected').length,
              hired: transformedLimitedData.filter(app => app.status === 'hired').length
            })
            setTotalCount(transformedLimitedData.length)
            setFilteredCount(transformedLimitedData.length)
            setHasMore(false)
            setStatusCountsLoading(false)
            toast.success('Loaded recent applications')
            return
          }
        } catch (fallbackError: any) {
          console.error('Fallback query also failed:', fallbackError?.message || fallbackError)
        }
      }
      
      // Show user-friendly error message
      const displayMessage = errorMessage === 'Unknown error' 
        ? 'Failed to load applications. Please try again.'
        : `Failed to load applications: ${errorMessage}`
      toast.error(displayMessage)
    } finally {
      setLoading(false)
      setFiltering(false)
    }
  }

  const loadMoreApplications = async () => {
    setLoadingMore(true)
    try {
      await fetchApplications(applications.length)
    } catch (error) {
      console.error('Error loading more applications:', error)
      toast.error('Failed to load more applications')
    } finally {
      setLoadingMore(false)
    }
  }

  const fetchJobs = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Use cached role if available, otherwise fetch
      let userRole: string | null = null
      if (userRoleCache.current && userRoleCache.current.userId === user.id) {
        userRole = userRoleCache.current.role
      } else {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single()
        userRole = roleData?.role || null
        if (roleData) {
          userRoleCache.current = { userId: user.id, role: roleData.role }
        }
      }

      // For super admin, get all active jobs
      if (userRole === 'super_admin') {
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, department')
          .eq('status', 'active')
          .order('title', { ascending: true })
        
        if (jobsError) throw jobsError
        if (jobsData) setJobs(jobsData)
      } else {
        // For admin, get jobs created by OR assigned to user
        const { data: createdJobs } = await supabase
          .from('jobs')
          .select('id, title, department')
          .eq('status', 'active')
          .eq('created_by', user.id)
          .order('title', { ascending: true })
        
        const { data: assignedJobs } = await supabase
          .from('jobs')
          .select('id, title, department')
          .eq('status', 'active')
          .eq('assigned_to', user.id)
          .order('title', { ascending: true })
        
        // Combine and deduplicate by id
        const allJobs = [...(createdJobs || []), ...(assignedJobs || [])]
        const uniqueJobs = allJobs.filter((job, index, self) =>
          index === self.findIndex((j) => j.id === job.id)
        )
        setJobs(uniqueJobs.sort((a, b) => a.title.localeCompare(b.title)))
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
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

      // Update local state
      const deletedApp = applications.find(app => app.id === id)
      setApplications(applications.filter(app => app.id !== id))
      
      // Update counts
      setTotalCount(prev => Math.max(0, prev - 1))
      setFilteredCount(prev => Math.max(0, prev - 1))
      
      // Update status counts if we know the deleted app's status
      if (deletedApp) {
        const status = deletedApp.status as keyof typeof statusCounts
        if (status in statusCounts) {
          setStatusCounts(prev => ({
            ...prev,
            [status]: Math.max(0, prev[status] - 1)
          }))
        }
      }
      
      toast.success('Application deleted successfully')
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    const app = applications.find(a => a.id === applicationId)
    if (!app) return
    const previousStatus = app.status as keyof typeof statusCounts
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', applicationId)

      if (error) throw error

      setApplications(prev =>
        prev.map(a => (a.id === applicationId ? { ...a, status: newStatus } : a))
      )
      setStatusCounts(prev => ({
        ...prev,
        ...(previousStatus in prev && { [previousStatus]: Math.max(0, prev[previousStatus] - 1) }),
        ...(newStatus in prev && { [newStatus]: prev[newStatus as keyof typeof prev] + 1 })
      }))
      toast.success('Status updated successfully')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
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
    // When filters are active, use filteredCount from database; otherwise use totalCount
    const isFiltered = jobFilter !== "all" || statusFilter !== "all"
    
    // Use status counts from database (not from loaded applications)
    // These counts reflect the total in the database, not just the visible 100
    const stats = {
      total: isFiltered ? filteredCount : totalCount, // Use filtered count from DB when filters are active
      loaded: applications.length, // Number currently loaded from database
      pending: statusCounts.pending,
      reviewed: statusCounts.reviewed,
      shortlisted: statusCounts.shortlisted,
      rejected: statusCounts.rejected,
      hired: statusCounts.hired,
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
          <Select
            value={application.status}
            onValueChange={(value) => handleStatusChange(application.id, value)}
          >
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>
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
              {filtering ? (
                <div className="flex items-center gap-1 h-8">
                  <div className="w-2 h-2 rounded-full bg-gray-900 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-900 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-900 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  {stats.loaded < stats.total && (
                    <div className="text-xs text-gray-500 mt-1">
                      {stats.loaded} loaded
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              {filtering || (statusCountsLoading && stats.pending === 0) ? (
                <div className="flex items-center gap-1 h-8">
                  <div className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              {filtering || (statusCountsLoading && stats.reviewed === 0) ? (
                <div className="flex items-center gap-1 h-8">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              {filtering || (statusCountsLoading && stats.shortlisted === 0) ? (
                <div className="flex items-center gap-1 h-8">
                  <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              {filtering || (statusCountsLoading && stats.rejected === 0) ? (
                <div className="flex items-center gap-1 h-8">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
            </CardHeader>
            <CardContent>
              {filtering || (statusCountsLoading && stats.hired === 0) ? (
                <div className="flex items-center gap-1 h-8">
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-purple-600">{stats.hired}</div>
              )}
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
                      {loading || filtering ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
                          <p className="text-sm text-gray-500">Loading applications...</p>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <p>No applications found</p>
                          {userRole?.role === 'admin' && jobs.length === 0 && (
                            <p className="text-sm mt-2">You haven't created any jobs yet. Create a job post to start receiving applications.</p>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="mt-6 text-center">
                <Button
                  onClick={loadMoreApplications}
                  disabled={loadingMore}
                  variant="outline"
                  size="lg"
                >
                  {loadingMore ? 'Loading...' : `Load More (${applications.length} of ${jobFilter !== "all" || statusFilter !== "all" ? filteredCount : totalCount})`}
                </Button>
              </div>
            )}
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
                              <Select
                                value={application.status}
                                onValueChange={(value) => handleStatusChange(application.id, value)}
                              >
                                <SelectTrigger className="w-[120px] h-8">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="reviewed">Reviewed</SelectItem>
                                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                  <SelectItem value="hired">Hired</SelectItem>
                                </SelectContent>
                              </Select>
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
                  {loading || filtering ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
                      <p className="text-sm text-gray-500">Loading applications...</p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <p>No applications found</p>
                      {userRole?.role === 'admin' && jobs.length === 0 && (
                        <p className="text-sm mt-2">You haven't created any jobs yet. Create a job post to start receiving applications.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Load More Button for Grouped View */}
            {hasMore && Object.keys(groupedApplications).length > 0 && (
              <div className="mt-6 text-center">
                <Button
                  onClick={loadMoreApplications}
                  disabled={loadingMore}
                  variant="outline"
                  size="lg"
                >
                  {loadingMore ? 'Loading...' : `Load More (${applications.length} of ${jobFilter !== "all" || statusFilter !== "all" ? filteredCount : totalCount})`}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  )
} 