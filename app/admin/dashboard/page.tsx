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
import { MessageSquare, Car } from "lucide-react"

interface ContactSubmission {
  id: number
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  resolved?: boolean
}

// Sample data for the chart - replace with real data
const chartData = [
  { name: 'Jan', submissions: 4 },
  { name: 'Feb', submissions: 3 },
  { name: 'Mar', submissions: 6 },
  { name: 'Apr', submissions: 8 },
  { name: 'May', submissions: 7 },
  { name: 'Jun', submissions: 9 },
]

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

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
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="min-h-screen bg-gray-50/50">
        <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto w-full">
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

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Review Submissions</h4>
                      <p className="text-sm text-gray-500">Check and respond to new contact form submissions</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-secondary/20 hover:bg-secondary/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary/20">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Test Drive Requests</h4>
                      <p className="text-sm text-gray-500">Manage pending test drive appointments</p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-primary">Recent Submissions</h2>
                  <p className="text-sm text-muted-foreground">Manage and review all contact form submissions</p>
                </div>
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <SubmissionsTable submissions={submissions} loading={loading} />
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                <SubmissionsTable 
                  submissions={submissions.filter(s => !s.resolved)} 
                  loading={loading} 
                />
              </TabsContent>
              <TabsContent value="resolved" className="mt-0">
                <SubmissionsTable 
                  submissions={submissions.filter(s => s.resolved)} 
                  loading={loading} 
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}
