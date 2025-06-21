"use client"

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

interface Job {
  id: string
  title: string
  department: string
  location: string
  description: string[]
  requirements: string[]
  responsibilities: string[]
  job_type: string
  created_at: string
  status: 'active' | 'inactive'
  company: string
}

interface JobsTableProps {
  jobs: Job[]
  loading: boolean
  onDelete: (id: string) => Promise<void>
  onUpdate: (id: string, data: Partial<Job>) => Promise<void>
}

export function JobsTable({ jobs = [], loading, onDelete, onUpdate }: JobsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const itemsPerPage = 10
  const totalPages = Math.ceil((jobs?.length || 0) / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = jobs?.slice(startIndex, startIndex + itemsPerPage) || []

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
  }

  const handleUpdate = async () => {
    if (!editingJob) return
    try {
      await onUpdate(editingJob.id, editingJob)
      setEditingJob(null)
      toast.success("Job updated successfully")
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error("Failed to update job")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      await onDelete(id)
      setDeleteConfirmId(null)
      toast.success("Job deleted successfully")
    } catch (error) {
      console.error('Error deleting job:', error)
      toast.error("Failed to delete job")
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    )
  }

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No jobs posted yet</p>
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
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.map((job, index) => (
              <TableRow key={job?.id || index} className="hover:bg-gray-50">
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-medium">{job?.title || 'N/A'}</TableCell>
                <TableCell>{job?.company || 'N/A'}</TableCell>
                <TableCell>{job?.department || 'N/A'}</TableCell>
                <TableCell>{job?.location || 'N/A'}</TableCell>
                <TableCell>{job?.job_type || 'N/A'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job?.status === 'active'
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {job?.status === 'active' ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => job && handleEdit(job)}
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => job?.id && setDeleteConfirmId(job.id)}
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
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, jobs.length)} of {jobs.length} entries
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

      {/* Edit Job Dialog */}
      <Dialog open={!!editingJob} onOpenChange={(open) => !open && setEditingJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Make changes to the job posting.
            </DialogDescription>
          </DialogHeader>
          {editingJob && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Job Title</Label>
                  <Input
                    id="edit-title"
                    value={editingJob.title}
                    onChange={(e) =>
                      setEditingJob((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    value={editingJob.department}
                    onChange={(e) =>
                      setEditingJob((prev) =>
                        prev ? { ...prev, department: e.target.value } : null
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editingJob.location}
                  onChange={(e) =>
                    setEditingJob((prev) =>
                      prev ? { ...prev, location: e.target.value } : null
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Job Description (each line will become a bullet point)</Label>
                <Textarea
                  id="edit-description"
                  value={editingJob.description.join('\n')}
                  onChange={(e) =>
                    setEditingJob((prev) =>
                      prev
                        ? {
                            ...prev,
                            description: e.target.value.split('\n'),
                          }
                        : null
                    )
                  }
                  className="h-32"
                  placeholder="Enter each description point on a new line"
                />
              </div>
              <div>
                <Label htmlFor="edit-requirements">Requirements (one per line)</Label>
                <Textarea
                  id="edit-requirements"
                  value={Array.isArray(editingJob.requirements) ? editingJob.requirements.join('\n') : ''}
                  onChange={(e) =>
                    setEditingJob((prev) =>
                      prev ? { 
                        ...prev, 
                        requirements: e.target.value.split('\n').map(req => req.trim()).filter(req => req !== '')
                      } : null
                    )
                  }
                  className="h-32"
                  placeholder="Enter each requirement on a new line"
                />
              </div>
              <div>
                <Label htmlFor="edit-responsibilities">Responsibilities (one per line)</Label>
                <Textarea
                  id="edit-responsibilities"
                  value={Array.isArray(editingJob.responsibilities) ? editingJob.responsibilities.join('\n') : ''}
                  onChange={(e) =>
                    setEditingJob((prev) =>
                      prev ? { 
                        ...prev, 
                        responsibilities: e.target.value.split('\n').map(resp => resp.trim()).filter(resp => resp !== '')
                      } : null
                    )
                  }
                  className="h-32"
                  placeholder="Enter each responsibility on a new line"
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={editingJob.status}
                  onChange={(e) =>
                    setEditingJob((prev) =>
                      prev
                        ? { ...prev, status: e.target.value as 'active' | 'inactive' }
                        : null
                    )
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingJob(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-secondary hover:bg-secondary/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job posting? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 