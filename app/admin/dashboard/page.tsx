"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { SubmissionsTable } from "@/components/admin/submission-table"
import { DashboardCards } from "@/components/admin/dashboard-card"
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

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    fetchSubmissions()
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

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      console.log("[Delete Operation] Starting delete for ID:", id)

      // First, verify if the record exists
      const { data: existingData, error: checkError } = await supabase
        .from("contact_submissions")
        .select("*")
        .eq('id', id)
        .single()

      console.log("[Delete Operation] Verification result:", { existingData, checkError })

      if (checkError) {
        console.error("[Delete Operation] Error checking submission:", checkError)
        throw new Error(`Failed to verify submission: ${checkError.message}`)
      }

      if (!existingData) {
        console.error("[Delete Operation] Submission not found")
        throw new Error("Submission not found")
      }

      // Perform the delete operation with RLS policy bypass
      const { data: deleteData, error: deleteError } = await supabase
        .from("contact_submissions")
        .delete()
        .eq('id', id)
        .select()

      console.log("[Delete Operation] Delete result:", { deleteData, deleteError })

      if (deleteError) {
        console.error("[Delete Operation] Delete error:", deleteError)
        throw new Error(`Delete failed: ${deleteError.message}`)
      }

      // Update local state immediately for better UX
      setSubmissions(prev => {
        const newSubmissions = prev.filter(submission => submission.id !== id)
        console.log("[Delete Operation] Updated local state:", newSubmissions)
        return newSubmissions
      })

      // Show success message
      toast.success("Submission deleted successfully")

      // Fetch fresh data to ensure sync with database
      console.log("[Delete Operation] Fetching fresh data...")
      const { data: newData, error: fetchError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      console.log("[Delete Operation] Fetch result:", { newData, fetchError })

      if (fetchError) {
        console.error("[Delete Operation] Error fetching updated data:", fetchError)
        toast.error("Failed to refresh data. Please reload the page.")
        return
      }

      // Update state with fresh data
      setSubmissions(newData || [])
      console.log("[Delete Operation] Operation completed successfully")

    } catch (error) {
      console.error("[Delete Operation] Error in delete operation:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to delete submission. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: string, data: Partial<ContactSubmission>) => {
    try {
      setLoading(true)
      console.log("Attempting to update submission with ID:", id, "Data:", data)

      const { error: updateError } = await supabase
        .from("contact_submissions")
        .update(data)
        .eq('id', id)

      if (updateError) {
        console.error("Update error:", updateError)
        throw updateError
      }

      // Log success
      console.log("Update operation completed without errors")

      // Fetch fresh data
      const { data: newData, error: fetchError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) {
        console.error("Error fetching updated data:", fetchError)
        throw fetchError
      }

      // Update state with fresh data
      setSubmissions(newData || [])
      toast.success("Submission updated successfully")
    } catch (error) {
      console.error("Error in update operation:", error)
      toast.error("Failed to update submission")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Clear any stored session data
      localStorage.removeItem('supabase.auth.token')
      
      router.refresh()
      router.push("/admin/login")
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out. Please try again.')
    }
  }

  // Add session check on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (!session) {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Session check error:', error)
        router.push('/admin/login')
      }
    }

    checkSession()
  }, [])

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="min-h-screen bg-gray-50/50">
        <div className="flex flex-col gap-8 p-4 md:p-6 min-w-0">
          <DashboardHeader />
          <DashboardCards submissions={submissions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Activity Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Submission Activity</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="submissions" 
                      stroke="#5E366D" 
                      strokeWidth={2}
                      dot={{ fill: '#5E366D', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#F08900' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Link 
                  href="/admin/submissions"
                  className="block w-full p-4 text-left rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Manage Submissions</h4>
                      <p className="text-sm text-gray-500">View and manage all contact form submissions</p>
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </div>

          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-primary">Recent Submissions</h2>
                  <p className="text-sm text-muted-foreground">Manage and review all contact form submissions</p>
                </div>
              </div>

              <Tabs defaultValue="all">
                <div className="flex justify-end mb-6">
                  <TabsList className="bg-gray-100">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all">
                  <SubmissionsTable 
                    submissions={submissions} 
                    loading={loading}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </TabsContent>
                <TabsContent value="pending">
                  <SubmissionsTable 
                    submissions={submissions.filter(s => !s.resolved)} 
                    loading={loading}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </TabsContent>
                <TabsContent value="resolved">
                  <SubmissionsTable 
                    submissions={submissions.filter(s => s.resolved)} 
                    loading={loading}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}
