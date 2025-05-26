import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"

interface NewsletterSubscription {
  id: number
  email: string
  status: "active" | "unsubscribed"
  created_at: string
  updated_at: string
}

export function NewsletterTable() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch newsletter subscriptions
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/admin/newsletters")
      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions")
      }
      const data = await response.json()
      console.log("Fetched subscriptions:", data) // Debug log
      setSubscriptions(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching newsletter subscriptions:", error)
      setLoading(false)
    }
  }

  // Fetch subscriptions on component mount
  useEffect(() => {
    fetchSubscriptions()
  }, [])

  // Handle status toggle
  const handleStatusToggle = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "unsubscribed" : "active"
      const response = await fetch(`/api/admin/newsletters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      setSubscriptions(subscriptions.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      ))
    } catch (error) {
      console.error("Error updating subscription status:", error)
    }
  }

  // Handle deletion
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return

    try {
      const response = await fetch(`/api/admin/newsletters/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete subscription")
      }

      setSubscriptions(subscriptions.filter(sub => sub.id !== id))
    } catch (error) {
      console.error("Error deleting subscription:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Newsletter Subscriptions</h2>
        <Button 
          className="bg-[#E67E22] hover:bg-[#E67E22]/90 text-white"
          onClick={fetchSubscriptions}
        >
          Refresh
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No newsletter subscriptions found.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed Date</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {subscription.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center ${
                      subscription.status === "active" ? "text-green-600" : "text-red-600"
                    }`}>
                      {subscription.status === "active" ? (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      {subscription.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(subscription.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(subscription.updated_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white"
                      onClick={() => handleStatusToggle(subscription.id, subscription.status)}
                    >
                      {subscription.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(subscription.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
} 