'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { LogOut, Mail, Phone, Calendar, AlertCircle, CheckCircle, Clock, Search, User, MessageSquare, Eye } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Complaint {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  status?: string
  admin_comment?: string | null
  company_comment?: string | null
  resolved?: boolean
}

type FilterStatus = 'all' | 'pending' | 'reviewed' | 'sent'

export default function CompanyDashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [company, setCompany] = useState<{ id: string; companyName: string } | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [isSendingReply, setIsSendingReply] = useState(false)
  const [isMarkingResolved, setIsMarkingResolved] = useState(false)
  const [resolutionComment, setResolutionComment] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/company-auth/verify', {
        credentials: 'include',
      })

      const data = await response.json()

      if (!data.authenticated || !data.company) {
        router.push('/company/login')
        return
      }

      setCompany(data.company)
      fetchComplaints(data.company.companyName)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/company/login')
    } finally {
      setAuthLoading(false)
    }
  }

  const fetchComplaints = async (companyName: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('customer_care_complaints')
        .select('*')
        .eq('company', companyName)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Only show complaints that have been sent to company (status is 'sent', 'reviewed', 'replied', or resolved)
      // Exclude complaints with status 'pending' or null/undefined
      const filteredData = (data || []).filter(complaint => 
        complaint.status === 'sent' || 
        complaint.status === 'reviewed' || 
        complaint.status === 'replied' ||
        complaint.resolved === true
      )

      setComplaints(filteredData)
    } catch (error: any) {
      console.error('Error fetching complaints:', error)
      toast.error('Failed to load complaints')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/company-auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      router.push('/company/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getStatusBadge = (status?: string, resolved?: boolean) => {
    // Company dashboard shows "pending" for "sent" status
    const displayStatus = status === 'sent' ? 'pending' : status || 'pending';
    
    if (resolved) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Resolved
        </span>
      )
    }
    
    switch (displayStatus) {
      case 'reviewed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Reviewed
          </span>
        )
      case 'replied':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
            Replied
          </span>
        )
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Pending
          </span>
        )
    }
  }

  const handleViewComplaint = async (complaint: Complaint) => {
    setSelectedComplaint(complaint)
    
    // If status is 'sent', update it to 'reviewed' when company views it
    if (complaint.status === 'sent' || (!complaint.status || complaint.status === 'pending')) {
      try {
        const response = await fetch(`/api/company/complaints/${complaint.id}/review`, {
          method: 'POST',
          credentials: 'include',
        })

        if (response.ok) {
          // Update local state
          setComplaints(prev =>
            prev.map(c =>
              c.id === complaint.id ? { ...c, status: 'reviewed' } : c
            )
          )
          // Update selected complaint
          setSelectedComplaint({ ...complaint, status: 'reviewed' })
        }
      } catch (error) {
        console.error('Error updating complaint status:', error)
      }
    }
  }

  // Filter complaints based on status and search
  const filteredComplaints = complaints.filter((complaint) => {
    // Status filter - treat 'sent' as 'pending' for company view
    const displayStatus = complaint.status === 'sent' ? 'pending' : complaint.status || 'pending';
    
    if (filterStatus === 'pending' && displayStatus !== 'pending') {
      return false
    }
    if (filterStatus === 'reviewed' && displayStatus !== 'reviewed') {
      return false
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        complaint.subject.toLowerCase().includes(query) ||
        complaint.message.toLowerCase().includes(query) ||
        complaint.name.toLowerCase().includes(query) ||
        complaint.email.toLowerCase().includes(query) ||
        (complaint.admin_comment && complaint.admin_comment.toLowerCase().includes(query))
      )
    }

    return true
  })

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Image
                src="/images/legend-logo.png"
                alt="Legend Holding Group"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Company Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{company.companyName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{complaints.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-[#2B1C48]" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {complaints.filter(c => c.status === 'sent' || !c.status || c.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviewed</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {complaints.filter(c => c.status === 'reviewed' || c.status === 'sent').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-lg shadow">
          {/* Header with Search and Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Complaints</h2>
              
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B1C48]/20 focus:border-[#2B1C48]"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4 border-b border-gray-200">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filterStatus === 'all'
                    ? 'border-[#2B1C48] text-[#2B1C48]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All ({complaints.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filterStatus === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending ({complaints.filter(c => c.status === 'sent' || !c.status || c.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilterStatus('reviewed')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filterStatus === 'reviewed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviewed ({complaints.filter(c => c.status === 'reviewed').length})
              </button>
            </div>
          </div>

          {/* Complaints List */}
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B1C48] border-t-transparent"></div>
                <p className="text-sm text-gray-600">Loading complaints...</p>
              </div>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 font-medium">
                {searchQuery ? 'No complaints match your search' : 'No complaints found'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm text-[#2B1C48] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{complaint.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{complaint.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{complaint.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={complaint.subject}>
                          {complaint.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(complaint.status, complaint.resolved)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewComplaint(complaint)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-[#2B1C48] hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View Complaint Modal */}
        {selectedComplaint && (
          <Dialog open={!!selectedComplaint} onOpenChange={() => {
            setSelectedComplaint(null)
            setReplyMessage('')
            setResolutionComment('')
          }}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{selectedComplaint.subject}</DialogTitle>
                <DialogDescription>
                  Complaint Details
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Customer Name</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedComplaint.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedComplaint.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedComplaint.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Date</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedComplaint.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                      <div className="mt-1">
                        {getStatusBadge(selectedComplaint.status, selectedComplaint.resolved)}
                      </div>
                    </div>
                </div>

                {/* Complaint Message */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Complaint Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedComplaint.message}</p>
                  </div>
                </div>

                {/* Admin Comment */}
                {selectedComplaint.admin_comment && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Admin Comment</label>
                    <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                      <p className="text-sm text-orange-700 leading-relaxed whitespace-pre-wrap">{selectedComplaint.admin_comment}</p>
                    </div>
                  </div>
                )}

                {/* Reply Section - Only show if status is 'reviewed' and not resolved */}
                {selectedComplaint.status === 'reviewed' && !selectedComplaint.resolved && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Send Reply to Customer</label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply to the customer..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B1C48]/20 focus:border-[#2B1C48] resize-none"
                    />
                    <button
                      onClick={async () => {
                        if (!replyMessage.trim()) {
                          toast.error('Please enter a reply message')
                          return
                        }
                        setIsSendingReply(true)
                        try {
                          const response = await fetch(`/api/company/complaints/${selectedComplaint.id}/reply`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                              replyMessage: replyMessage.trim(),
                            }),
                          })

                          const data = await response.json()

                          if (!response.ok) {
                            throw new Error(data.error || 'Failed to send reply')
                          }

                          toast.success('Reply sent successfully to customer')
                          setReplyMessage('')
                          // Update local state
                          setComplaints(prev =>
                            prev.map(c =>
                              c.id === selectedComplaint.id ? { ...c, status: 'replied' } : c
                            )
                          )
                          setSelectedComplaint({ ...selectedComplaint, status: 'replied' })
                        } catch (error: any) {
                          console.error('Error sending reply:', error)
                          toast.error(error.message || 'Failed to send reply')
                        } finally {
                          setIsSendingReply(false)
                        }
                      }}
                      disabled={isSendingReply || !replyMessage.trim()}
                      className="mt-3 px-4 py-2 bg-[#EE8900] hover:bg-[#d67a00] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingReply ? 'Sending...' : 'Send Reply to Customer'}
                    </button>
                  </div>
                )}

                {/* Mark as Resolved Section - Only show if status is 'replied' and not resolved */}
                {selectedComplaint.status === 'replied' && !selectedComplaint.resolved && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Resolution Comment for Admin</label>
                        <p className="text-xs text-gray-500 mb-2">Please provide a comment explaining how this complaint was resolved. This will be visible to the admin team.</p>
                        <textarea
                          value={resolutionComment}
                          onChange={(e) => setResolutionComment(e.target.value)}
                          placeholder="Enter details about how this complaint was resolved..."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B1C48]/20 focus:border-[#2B1C48] resize-none"
                        />
                      </div>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={async () => {
                            if (!resolutionComment.trim()) {
                              toast.error('Please provide a resolution comment before marking as resolved')
                              return
                            }
                            setIsMarkingResolved(true)
                            try {
                              const response = await fetch(`/api/company/complaints/${selectedComplaint.id}/resolve`, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify({
                                  companyComment: resolutionComment.trim(),
                                }),
                              })

                              const data = await response.json()

                              if (!response.ok) {
                                throw new Error(data.error || 'Failed to mark as resolved')
                              }

                              toast.success('Complaint marked as resolved')
                              // Update local state
                              setComplaints(prev =>
                                prev.map(c =>
                                  c.id === selectedComplaint.id ? { ...c, resolved: true, company_comment: resolutionComment.trim() } : c
                                )
                              )
                              setSelectedComplaint({ ...selectedComplaint, resolved: true, company_comment: resolutionComment.trim() })
                              setResolutionComment('')
                            } catch (error: any) {
                              console.error('Error marking as resolved:', error)
                              toast.error(error.message || 'Failed to mark as resolved')
                            } finally {
                              setIsMarkingResolved(false)
                            }
                          }}
                          disabled={isMarkingResolved || !resolutionComment.trim()}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isMarkingResolved ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              <span>Marking...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Mark as Resolved</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}
