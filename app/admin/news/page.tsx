"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Editor } from '@tinymce/tinymce-react'

interface NewsArticle {
  id: string
  created_at: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  author: string
  read_time: string
  is_featured: boolean
  published: boolean
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  seo_image_url?: string
}

type FormData = Omit<NewsArticle, 'id' | 'created_at'> & {
  seo_title: string
  seo_description: string
  seo_keywords: string
  seo_image_url: string
}

export default function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const articlesPerPage = 10
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchArticles()
  }, [currentPage])

  // TinyMCE configuration
  const editorConfig = {
    height: 500,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | image media | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  }

  // Handle editor content change
  const handleEditorChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }))
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.refresh()
      router.push("/admin/login")
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    author: "",
    read_time: "",
    is_featured: false,
    published: true,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_image_url: "",
  })

  // Fetch articles on component mount
  const fetchArticles = async () => {
    try {
      // Get total count of articles
      const { count } = await supabase
        .from("news_articles")
        .select("*", { count: "exact", head: true })

      // Calculate total pages
      setTotalPages(Math.ceil((count || 0) / articlesPerPage))

      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage - 1)

      if (error) throw error

      setArticles(data || [])
    } catch (error) {
      console.error("Error fetching articles:", error)
      toast.error("Failed to load articles")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  // Add new article
  const handleAdd = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .insert([formData])
        .select()
        .single()

      if (error) throw error

      setArticles([data, ...articles])
      setIsAddDialogOpen(false)
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image_url: "",
        category: "",
        author: "",
        read_time: "",
        is_featured: false,
        published: true,
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        seo_image_url: "",
      })
      toast.success("Article added successfully")
    } catch (error) {
      console.error("Error adding article:", error)
      toast.error("Failed to add article")
    }
  }

  // Update article
  const handleUpdate = async () => {
    if (!editingArticle) return

    try {
      const { data, error } = await supabase
        .from("news_articles")
        .update(formData)
        .eq("id", editingArticle.id)
        .select()
        .single()

      if (error) throw error

      setArticles(articles.map(article => 
        article.id === editingArticle.id ? data : article
      ))
      setEditingArticle(null)
      toast.success("Article updated successfully")
    } catch (error) {
      console.error("Error updating articles:", error)
      toast.error("Failed to update article")
    }
  }

  // Delete article
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("news_articles")
        .delete()
        .eq("id", id)

      if (error) throw error

      setArticles(articles.filter(article => article.id !== id))
      setDeleteConfirmId(null)
      toast.success("Article deleted successfully")
    } catch (error) {
      console.error("Error deleting article:", error)
      toast.error("Failed to delete article")
    }
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">News Articles</h1>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#5E366D] hover:bg-[#5E366D]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Button>
        </div>

        {/* Articles Table */}
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>{article.is_featured ? "Yes" : "No"}</TableCell>
                    <TableCell>{article.published ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setFormData({
                              ...article,
                              seo_title: article.seo_title || "",
                              seo_description: article.seo_description || "",
                              seo_keywords: article.seo_keywords || "",
                              seo_image_url: article.seo_image_url || "",
                            })
                            setEditingArticle(article)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setDeleteConfirmId(article.id)}
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

          {/* Pagination Controls */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {articles.length} of {totalPages * articlesPerPage} articles
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  className={pageNum === currentPage ? 
                    "bg-[#5E366D] text-white" : 
                    "border-[#5E366D] text-[#5E366D] hover:bg-[#5E366D] hover:text-white"
                  }
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog 
          open={isAddDialogOpen || editingArticle !== null} 
          onOpenChange={(open) => {
            if (!open) {
              setIsAddDialogOpen(false)
              setEditingArticle(null)
              setFormData({
                title: "",
                excerpt: "",
                content: "",
                image_url: "",
                category: "",
                author: "",
                read_time: "",
                is_featured: false,
                published: true,
                seo_title: "",
                seo_description: "",
                seo_keywords: "",
                seo_image_url: "",
              })
            }
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#5E366D]">
                {editingArticle ? "Edit Article" : "Add New Article"}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Fill in the details for the news article. All fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              {/* Title and Category Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-semibold">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter article title"
                    className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="category"
                    placeholder="Enter article category"
                    className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              {/* Author and Read Time Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author" className="font-semibold">
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    placeholder="Enter author name"
                    className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="read_time" className="font-semibold">
                    Read Time
                  </Label>
                  <Input
                    id="read_time"
                    placeholder="e.g., 5 min read"
                    className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image_url" className="font-semibold">
                  Image URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="image_url"
                  placeholder="Enter image URL"
                  className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="font-semibold">
                  Excerpt <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter a brief excerpt"
                  className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D] min-h-[100px]"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="font-semibold">
                  Content <span className="text-red-500">*</span>
                </Label>
                <div className="border rounded-md overflow-hidden">
                  <Editor
                    id="content"
                    apiKey="yskbz96z5yqtsgand5dgq29lr1ju0xilsvyo0phv6b1xnkqq"
                    init={editorConfig}
                    value={formData.content}
                    onEditorChange={handleEditorChange}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Use the toolbar above to format your content, add images, and more.
                </p>
              </div>

              {/* SEO Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-[#5E366D] mb-4">SEO Settings (Optional)</h3>
                <div className="grid gap-4">
                  {/* SEO Title */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_title" className="font-semibold">
                      SEO Title
                    </Label>
                    <Input
                      id="seo_title"
                      placeholder="Custom title for search engines (optional)"
                      className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                      value={formData.seo_title || ""}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Leave empty to use the article title. Recommended length: 50-60 characters.
                    </p>
                  </div>

                  {/* SEO Description */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_description" className="font-semibold">
                      SEO Description
                    </Label>
                    <Textarea
                      id="seo_description"
                      placeholder="Custom description for search engines (optional)"
                      className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D] min-h-[80px]"
                      value={formData.seo_description || ""}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Leave empty to use the article excerpt. Recommended length: 150-160 characters.
                    </p>
                  </div>

                  {/* SEO Keywords */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_keywords" className="font-semibold">
                      SEO Keywords
                    </Label>
                    <Input
                      id="seo_keywords"
                      placeholder="Comma-separated keywords (optional)"
                      className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                      value={formData.seo_keywords || ""}
                      onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Example: Legend Holding Group, automotive, UAE, innovation, sustainability
                    </p>
                  </div>

                  {/* SEO Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="seo_image_url" className="font-semibold">
                      SEO Image URL
                    </Label>
                    <Input
                      id="seo_image_url"
                      placeholder="Custom image for social sharing (optional)"
                      className="border-gray-300 focus:border-[#5E366D] focus:ring-[#5E366D]"
                      value={formData.seo_image_url || ""}
                      onChange={(e) => setFormData({ ...formData, seo_image_url: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Leave empty to use the article image. Recommended size: 1200x630 pixels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkboxes Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="is_featured"
                    className="rounded border-gray-300 text-[#5E366D] focus:ring-[#5E366D]"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                  <Label htmlFor="is_featured" className="font-medium">Featured Article</Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="published"
                    className="rounded border-gray-300 text-[#5E366D] focus:ring-[#5E366D]"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                  <Label htmlFor="published" className="font-medium">Published</Label>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  setEditingArticle(null)
                }}
                className="border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#5E366D] hover:bg-[#5E366D]/90 text-white px-6"
                onClick={editingArticle ? handleUpdate : handleAdd}
              >
                {editingArticle ? "Update" : "Add"} Article
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deleteConfirmId}
          onOpenChange={(open) => !open && setDeleteConfirmId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this article? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              >
                Delete Article
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  )
} 