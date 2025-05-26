"use client"

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
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface UnsubscribeRequest {
  id: number
  newsletter_subscription: {
    email: string
  }
  reason: string
  status: "pending" | "approved" | "rejected"
  admin_comment?: string
  created_at: string
  processed_at?: string
}

export function UnsubscribeTable() {
  const [requests, setRequests] = useState<UnsubscribeRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<number | null>(null)

  // Fetch unsubscribe requests
  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/admin/newsletters/unsubscribe/list")
      if (!response.ok) {
        throw new Error("Failed to fetch requests")
      }
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error("Error fetching unsubscribe requests:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  // Handle request processing
  const handleProcess = async (requestId: number, action: "approve" | "reject") => {
    setProcessingId(requestId)
    try {
      const response = await fetch("/api/admin/newsletters/unsubscribe/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          action,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process request")
      }

      // Refresh the requests list
      await fetchRequests()
    } catch (error) {
      console.error("Error processing request:", error)
    } finally {
      setProcessingId(null)
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
        <h2 className="text-2xl font-bold">Unsubscribe Requests</h2>
        <Button 
          className="bg-[#E67E22] hover:bg-[#E67E22]/90 text-white"
          onClick={fetchRequests}
        >
          Refresh
        </Button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No unsubscribe requests found.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead>Processed Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.newsletter_subscription.email}
                  </TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(request.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {request.processed_at
                      ? format(new Date(request.processed_at), "MMM d, yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                          onClick={() => handleProcess(request.id, "approve")}
                          disabled={processingId === request.id}
                        >
                          {processingId === request.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          onClick={() => handleProcess(request.id, "reject")}
                          disabled={processingId === request.id}
                        >
                          {processingId === request.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
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