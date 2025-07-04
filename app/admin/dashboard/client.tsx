"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { SubmissionsTable } from "@/components/admin/submission-table"
import { DashboardCards } from "@/components/admin/dashboard-card"
import { JobApplicationsDashboard } from "@/components/admin/job-applications-dashboard"
import { UnauthorizedAccess } from "@/components/admin/unauthorized-access"
import { useAdminPermissions } from "@/hooks/use-admin-permissions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MessageSquare } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface ContactSubmission {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  resolved?: boolean
  status?: string
}

export function DashboardClient() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { userRole, isLoading: permissionsLoading, hasPermission } = useAdminPermissions()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [jobApplications, setJobApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    fetchSubmissions()
    fetchJobApplications()
  }, [])

  useEffect(() => {
    // Process submissions for chart data
    const monthlyData = submissions.reduce((acc: Record<string, number>, submission) => {
      const month = new Date(submission.created_at).toLocaleString('default', { month: 'short' })
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {})

    const chartData = Object.entries(monthlyData).map(([name, submissions]) => ({
      name,
      submissions
    }))

    setChartData(chartData)
  }, [submissions])

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setSubmissions(data || [])
    } catch (error) {
      console.error("Error fetching submissions:", error)
      toast.error("Failed to fetch submissions")
    } finally {
      setLoading(false)
    }
  }

  const fetchJobApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobApplications(data || [])
    } catch (error) {
      console.error('Error fetching job applications:', error)
      toast.error("Failed to fetch job applications")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => prev.filter(submission => submission.id !== id))
      toast.success("Submission deleted successfully")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to delete submission")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: string, data: Partial<ContactSubmission>) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("contact_submissions")
        .update(data)
        .eq('id', id)

      if (error) throw error

      const { data: newData, error: fetchError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) throw fetchError

      setSubmissions(newData || [])
      toast.success("Submission updated successfully")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to update submission")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      console.log('Signing out...')
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
        throw error
      }
      console.log('Sign out successful, redirecting to login')
      
      // Clear any local storage
      localStorage.removeItem('supabase.auth.token')
      
      // Force redirect to login page
      window.location.href = '/admin/login'
    } catch (error) {
      console.error("Error signing out:", error)
      toast.error("Failed to sign out")
      
      // Force redirect anyway
      window.location.href = '/admin/login'
    }
  }

  // Check if user has dashboard permission
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

  if (!hasPermission('dashboard')) {
    return (
      <UnauthorizedAccess 
        requiredPermission="dashboard"
        currentUserRole={userRole?.role}
      />
    )
  }

  // Show different dashboards based on user role
  if (userRole?.role === 'super_admin') {
    // Super Admin Dashboard - Full access with job applications
    return (
      <AdminDashboardLayout onSignOut={handleSignOut}>
        <div className="p-8">
          <DashboardHeader onSignOut={handleSignOut} />
          
          {/* Contact Submissions Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Contact Submissions</h2>
            <div className="mt-8">
              <DashboardCards submissions={submissions} jobApplications={jobApplications} />
            </div>

            <div className="mt-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Submissions Over Time</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="submissions" stroke="#5E366D" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none px-6">
                    <TabsTrigger value="all">All Submissions</TabsTrigger>
                    <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="p-6">
                    <SubmissionsTable 
                      submissions={submissions}
                      loading={loading}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  </TabsContent>
                  <TabsContent value="unresolved" className="p-6">
                    <SubmissionsTable 
                      submissions={submissions.filter(s => !s.resolved)}
                      loading={loading}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  </TabsContent>
                  <TabsContent value="resolved" className="p-6">
                    <SubmissionsTable 
                      submissions={submissions.filter(s => s.resolved)}
                      loading={loading}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>

          {/* Job Applications Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Job Applications</h2>
            <JobApplicationsDashboard onSignOut={handleSignOut} showHeader={false} />
          </div>
        </div>
      </AdminDashboardLayout>
    )
  } else {
    // Regular Admin Dashboard - Job Applications only
    return (
      <AdminDashboardLayout onSignOut={handleSignOut}>
        <div className="p-8">
          <JobApplicationsDashboard onSignOut={handleSignOut} showHeader={true} />
        </div>
      </AdminDashboardLayout>
    )
  }
} 