"use client"

import { useState, useEffect } from "react"
import {
  BookmarkIcon,
  CalendarIcon,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Search,
  Share2,
  Twitter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "sonner"

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
}

export function NewsPage() {
  const [featuredArticle, setFeaturedArticle] = useState<NewsArticle | null>(null)
  const [recentArticles, setRecentArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const articlesPerPage = 12

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchArticles()
  }, [currentPage])

  const fetchArticles = async () => {
    try {
      // First, fetch all featured articles
      const { data: allFeaturedData, error: featuredError } = await supabase
        .from("news_articles")
        .select("*")
        .eq("is_featured", true)
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (featuredError) throw featuredError

      // Set the most recent featured article as the main featured article
      setFeaturedArticle(allFeaturedData && allFeaturedData.length > 0 ? allFeaturedData[0] : null)

      // Get total count of non-featured articles
      const { count } = await supabase
        .from("news_articles")
        .select("*", { count: "exact", head: true })
        .eq("published", true)
        .eq("is_featured", false)

      setTotalArticles(count || 0)
      setTotalPages(Math.ceil((count || 0) / articlesPerPage))

      // Fetch recent articles with pagination
      const { data: recentData, error: recentError } = await supabase
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .eq("is_featured", false)
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage - 1)

      if (recentError) throw recentError

      setRecentArticles(recentData || [])
    } catch (error) {
      console.error("Error fetching articles:", error)
      toast.error("Failed to load articles")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f8f9fa] pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5E366D] border-t-transparent"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8f9fa] pt-20">
        <main className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-12">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
              {/* Featured News */}
              {featuredArticle ? (
                <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
                  <div className="relative h-[300px] w-full md:h-[400px]">
                    <Image
                      src={featuredArticle.image_url || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-[#5E366D] px-3 py-1 text-xs font-medium text-white">
                        {featuredArticle.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {new Date(featuredArticle.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        {featuredArticle.read_time}
                      </div>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold md:text-3xl">{featuredArticle.title}</h2>
                    <p className="mb-4 text-gray-600">{featuredArticle.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#5E366D]"></div>
                        <span className="text-sm font-medium">{featuredArticle.author}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <BookmarkIcon className="h-4 w-4" />
                          <span className="sr-only">Bookmark</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-[500px] items-center justify-center rounded-xl bg-white">
                  <p className="text-gray-500">No featured article available</p>
                </div>
              )}

              {/* Newsletter & Popular */}
              <div className="flex flex-col gap-8">
                <div className="rounded-xl bg-gradient-to-br from-[#5E366D] to-[#3d2147] p-6 text-white shadow-md">
                  <h3 className="mb-2 text-xl font-bold">Stay Updated</h3>
                  <p className="mb-4 text-sm opacity-90">
                    Subscribe to our newsletter to get the latest news delivered to your inbox.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="border-0 bg-white/20 text-white placeholder:text-white/70"
                    />
                    <Button className="bg-[#F08900] text-white hover:bg-[#d67a00]">Subscribe Now</Button>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md">
                  <h3 className="mb-4 text-xl font-bold">Popular Now</h3>
                  <div className="space-y-4">
                    {recentArticles.slice(0, 3).map((article, index) => (
                      <div key={article.id} className="flex gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5E366D] text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium leading-tight">{article.title}</h4>
                          <p className="text-xs text-gray-500">
                            {article.category} • {new Date(article.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Recent News */}
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Recent News</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Showing {recentArticles.length} of {totalArticles} articles
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="text-[#5E366D] border-[#5E366D] hover:bg-[#5E366D] hover:text-white"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-500 min-w-[100px] text-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  className="text-[#5E366D] border-[#5E366D] hover:bg-[#5E366D] hover:text-white"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>

            {recentArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No articles available</p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {recentArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.id}`}
                      className="group overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1"
                    >
                      <div className="relative h-48 w-full">
                        <Image 
                          src={article.image_url || "/placeholder.svg"} 
                          alt={article.title} 
                          fill 
                          className="object-cover"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-[#F08900] px-3 py-1 text-xs font-medium text-white">
                          {article.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {new Date(article.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {article.read_time}
                          </div>
                        </div>
                        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight group-hover:text-[#5E366D]">
                          {article.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{article.author}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <BookmarkIcon className="h-3 w-3" />
                              <span className="sr-only">Bookmark</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <Share2 className="h-3 w-3" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom Pagination */}
                <div className="mt-8 flex justify-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        className={pageNum === currentPage ? 
                          "bg-[#5E366D] text-white" : 
                          "text-[#5E366D] border-[#5E366D] hover:bg-[#5E366D] hover:text-white"
                        }
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
