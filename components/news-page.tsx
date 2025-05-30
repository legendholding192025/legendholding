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
  ArrowRight,
  ChevronLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cn } from "@/lib/utils"

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
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative bg-[#5E366D] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
              alt="News & Updates"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#5E366D]/80 mix-blend-multiply" />
          </div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
                Latest Updates
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Newsroom
              </h1>
              
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-screen bg-[#f8f9fa]">
          <main className="container mx-auto px-4 py-8 md:px-6">
            <div className="mb-12">
              <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                {/* Featured News */}
                {featuredArticle ? (
                  <Link
                    href={`/news/${featuredArticle.id}`}
                    className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 block group"
                  >
                    <div className="relative h-[300px] w-full md:h-[400px]">
                      <Image
                        src={featuredArticle.image_url || "/placeholder.svg"}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {new Date(featuredArticle.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {featuredArticle.read_time}
                        </div>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold md:text-3xl group-hover:text-[#5E366D] transition-colors">{featuredArticle.title}</h2>
                      <p className="mb-4 text-gray-600">{featuredArticle.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-[#F39200] font-medium flex items-center">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex h-[500px] items-center justify-center rounded-xl bg-white">
                    <p className="text-gray-500">No featured article available</p>
                  </div>
                )}

                {/* Newsletter & Latest News */}
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
                    <h3 className="mb-6 text-xl font-bold">Latest News</h3>
                    <div className="divide-y divide-gray-100">
                      {recentArticles.slice(0, 3).map((article, index) => (
                        <div key={article.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                              <Image 
                                src={article.image_url || "/placeholder.svg"} 
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link href={`/news/${article.id}`}>
                                <h4 className="font-medium leading-tight mb-2 line-clamp-2 hover:text-[#5E366D] transition-colors">
                                  {article.title}
                                </h4>
                              </Link>
                              <p className="text-xs text-gray-500 mb-2">
                                {new Date(article.created_at).toLocaleDateString()} • {article.read_time}
                              </p>
                              <Link 
                                href={`/news/${article.id}`}
                                className="inline-flex items-center text-sm font-medium text-[#5E366D] hover:text-[#3d2147] transition-colors"
                              >
                                Read More
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      {recentArticles.length === 0 && (
                        <div className="py-4 text-center text-gray-500">
                          No articles available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* All News */}
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">All News</h2>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/news/${article.id}`}
                        className="bg-[rgb(234,226,214)]/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
                      >
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-[rgb(234,226,214)]/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                          aria-hidden="true"
                        />
                        <div className="relative h-48 overflow-hidden">
                          <Image 
                            src={article.image_url || "/placeholder.svg"} 
                            alt={article.title} 
                            fill 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow relative">
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {new Date(article.created_at).toLocaleDateString()}
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            {article.read_time}
                          </div>
                          <h3 className="text-lg font-semibold mb-3 text-[rgb(43,28,72)] line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-[rgb(93,55,110)] mb-4 line-clamp-3 flex-grow text-lg">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-[#F39200] font-medium text-sm flex items-center">
                              Read More
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <Share2 className="h-3 w-3" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom Pagination */}
                  <div className="flex justify-center mt-8 gap-2">
                    <Button 
                      variant="outline" 
                      className="p-2 rounded-full bg-[rgb(234,226,214)]/20 border border-[rgb(43,28,72)]/20 text-[rgb(43,28,72)] hover:bg-[rgb(43,28,72)] hover:text-white transition-colors duration-300"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-1.5 px-3">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            currentPage === index + 1
                              ? "bg-[rgb(43,28,72)] w-6"
                              : "bg-[rgb(234,226,214)] hover:bg-[rgb(234,226,214)]/70"
                          )}
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="p-2 rounded-full bg-[rgb(234,226,214)]/20 border border-[rgb(43,28,72)]/20 text-[rgb(43,28,72)] hover:bg-[rgb(43,28,72)] hover:text-white transition-colors duration-300"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </main>
      <Footer />
    </>
  )
}
