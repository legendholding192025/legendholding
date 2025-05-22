import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, Edit2, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Message {
  id: string
  created_at: string
  name: string
  email: string
  message: string
  resolved?: boolean
}

interface MessageTableProps {
  messages: Message[]
  loading: boolean
  onDelete: (id: string) => Promise<void>
  onUpdate: (id: string, data: Partial<Message>) => Promise<void>
}

export function MessageTable({ messages = [], loading, onDelete, onUpdate }: MessageTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const itemsPerPage = 10
  const totalPages = Math.ceil((messages?.length || 0) / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMessages = messages?.slice(startIndex, startIndex + itemsPerPage) || []

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = (message: Message) => {
    setEditingMessage(message)
  }

  const handleUpdate = async () => {
    if (!editingMessage) return
    try {
      await onUpdate(editingMessage.id, editingMessage)
      setEditingMessage(null)
      toast.success("Message updated successfully")
    } catch (error) {
      console.error('[MessageTable] Error updating message:', error)
      toast.error("Failed to update message")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      console.log("[MessageTable] Starting delete operation for ID:", id)
      setIsDeleting(true)
      await onDelete(id)
      console.log("[MessageTable] Delete operation completed successfully")
      setDeleteConfirmId(null)
      toast.success("Message deleted successfully")
    } catch (error) {
      console.error('[MessageTable] Error deleting message:', error)
      toast.error("Failed to delete message")
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No messages yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">S.N.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMessages.map((message, index) => (
              <TableRow key={message?.id || index}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-medium">
                  {message?.created_at ? new Date(message.created_at).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>{message?.name || 'N/A'}</TableCell>
                <TableCell>{message?.email || 'N/A'}</TableCell>
                <TableCell className="max-w-[300px] truncate">{message?.message || 'N/A'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    message?.resolved 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {message?.resolved ? "Resolved" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => message && handleEdit(message)}
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => message?.id && setDeleteConfirmId(message.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 mt-4">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, messages.length)} of {messages.length} entries
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {editingMessage && (
        <Dialog open={!!editingMessage} onOpenChange={() => setEditingMessage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Message</DialogTitle>
              <DialogDescription>
                Make changes to the message here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingMessage.name || ''}
                  onChange={(e) => setEditingMessage({
                    ...editingMessage,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingMessage.email || ''}
                  onChange={(e) => setEditingMessage({
                    ...editingMessage,
                    email: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={editingMessage.message || ''}
                  onChange={(e) => setEditingMessage({
                    ...editingMessage,
                    message: e.target.value
                  })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status">Status</Label>
                <input
                  type="checkbox"
                  id="status"
                  checked={editingMessage.resolved || false}
                  onChange={(e) => setEditingMessage({
                    ...editingMessage,
                    resolved: e.target.checked
                  })}
                  className="ml-2"
                />
                <span className="text-sm text-gray-500">Mark as resolved</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingMessage(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {deleteConfirmId && (
        <Dialog 
          open={!!deleteConfirmId} 
          onOpenChange={(open) => {
            console.log("[MessageTable] Delete dialog state change:", { open, deleteConfirmId })
            if (!open) setDeleteConfirmId(null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this message? This action cannot be undone.
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {deleteConfirmId}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log("[MessageTable] Delete operation cancelled")
                  setDeleteConfirmId(null)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  console.log("[MessageTable] Delete button clicked for ID:", deleteConfirmId)
                  handleDelete(deleteConfirmId)
                }}
                disabled={isDeleting || loading}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 