"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface UnsubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UnsubscribeModal({ isOpen, onClose }: UnsubscribeModalProps) {
  const [email, setEmail] = useState("")
  const [reason, setReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/newsletters/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, reason }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit unsubscribe request")
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setEmail("")
        setReason("")
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit unsubscribe request")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request to Unsubscribe from Newsletter</DialogTitle>
          <DialogDescription>
            Please enter your email address and reason for unsubscribing. Your request will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUnsubscribe} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || isSuccess}
              className="w-full"
            />
            <Textarea
              placeholder="Why would you like to unsubscribe? (Optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isLoading || isSuccess}
              className="w-full min-h-[100px]"
            />
            {error && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading || isSuccess}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`${
                isSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#E67E22] hover:bg-[#E67E22]/90"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Request Submitted!
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 