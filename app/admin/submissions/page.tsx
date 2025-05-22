"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { SubmissionsTable } from "@/components/admin/submission-table"
import { MessageTable } from "@/components/admin/message-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import * as XLSX from 'xlsx'
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"

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

interface Message {
  id: string
  created_at: string
  name: string
  email: string
  message: string
  resolved?: boolean
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong:</h2>
      <pre className="text-sm text-red-600 whitespace-pre-wrap mb-4">{error.message}</pre>
      <Button onClick={resetErrorBoundary} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
        Try again
      </Button>
    </div>
  )
}

export default function ContactManagement() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("submissions")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      if (!supabase) {
        throw new Error("Supabase client not initialized")
      }

      setLoading(true)
      
      // Fetch submissions with error handling
      const submissionsPromise = supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .throwOnError()

      // Fetch messages with error handling
      const messagesPromise = supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .throwOnError()

      const [submissionsResult, messagesResult] = await Promise.allSettled([
        submissionsPromise,
        messagesPromise
      ])

      // Handle submissions result
      if (submissionsResult.status === 'fulfilled') {
        setSubmissions(submissionsResult.value.data || [])
      } else {
        console.error("Error fetching submissions:", submissionsResult.reason)
        toast.error("Failed to fetch submissions")
        setSubmissions([])
      }

      // Handle messages result
      if (messagesResult.status === 'fulfilled') {
        setMessages(messagesResult.value.data || [])
      } else {
        console.error("Error fetching messages:", messagesResult.reason)
        toast.error("Failed to fetch messages")
        setMessages([])
      }

    } catch (error) {
      console.error("Error in fetchData:", error)
      toast.error("An error occurred while fetching data")
      setSubmissions([])
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSubmission = async (id: string) => {
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
      console.error("Error deleting submission:", error)
      toast.error("Failed to delete submission")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessages(prev => prev.filter(message => message.id !== id))
      toast.success("Message deleted successfully")
    } catch (error) {
      console.error("Error deleting message:", error)
      toast.error("Failed to delete message")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSubmission = async (id: string, data: Partial<ContactSubmission>) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("contact_submissions")
        .update(data)
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => 
        prev.map(submission => 
          submission.id === id ? { ...submission, ...data } : submission
        )
      )
      toast.success("Submission updated successfully")
    } catch (error) {
      console.error("Error updating submission:", error)
      toast.error("Failed to update submission")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateMessage = async (id: string, data: Partial<Message>) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("messages")
        .update(data)
        .eq('id', id)

      if (error) throw error

      setMessages(prev => 
        prev.map(message => 
          message.id === id ? { ...message, ...data } : message
        )
      )
      toast.success("Message updated successfully")
    } catch (error) {
      console.error("Error updating message:", error)
      toast.error("Failed to update message")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  const exportToExcel = () => {
    try {
      const dataToExport = activeTab === "submissions" ? submissions : messages
      const exportData = dataToExport.map(item => ({
        Date: new Date(item.created_at).toLocaleDateString(),
        Name: item.name,
        Email: item.email,
        ...(activeTab === "submissions" && {
          Phone: (item as ContactSubmission).phone || "N/A",
          Subject: (item as ContactSubmission).subject,
        }),
        Message: item.message,
        Status: item.resolved ? "Resolved" : "Pending"
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, activeTab === "submissions" ? "Contact Submissions" : "Messages")

      const fileName = `${activeTab}_${new Date().toISOString().split('T')[0]}.xlsx`
      XLSX.writeFile(wb, fileName)
      toast.success("Data exported successfully")
    } catch (error) {
      console.error("Error exporting data:", error)
      toast.error("Failed to export data")
    }
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="min-h-screen bg-gray-50/50">
        <div className="flex flex-col gap-8 p-4 md:p-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Contact Management</h1>
              <p className="text-sm text-gray-500">View and manage all contact form submissions and messages</p>
            </div>
            <Button
              onClick={exportToExcel}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm">
            <Tabs defaultValue="submissions" className="w-full" onValueChange={setActiveTab}>
              <div className="border-b px-6 pt-6">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="submissions" className="flex-1 sm:flex-none">
                    Contact Submissions
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex-1 sm:flex-none">
                    Messages
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="submissions">
                  <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => {
                      // Reset the state here
                      fetchData()
                    }}
                  >
                    <SubmissionsTable 
                      submissions={submissions} 
                      loading={loading} 
                      onDelete={handleDeleteSubmission}
                      onUpdate={handleUpdateSubmission}
                    />
                  </ErrorBoundary>
                </TabsContent>
                
                <TabsContent value="messages">
                  <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => {
                      // Reset the state here
                      fetchData()
                    }}
                  >
                    <MessageTable 
                      messages={messages}
                      loading={loading}
                      onDelete={handleDeleteMessage}
                      onUpdate={handleUpdateMessage}
                    />
                  </ErrorBoundary>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
} 