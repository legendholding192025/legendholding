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

export function DashboardClient() {
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
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/admin/login')
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to sign out")
    }
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="p-8">
        <DashboardHeader onSignOut={handleSignOut} />
        
        <div className="mt-8">
          <DashboardCards submissions={submissions} />
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
    </AdminDashboardLayout>
  )
} 