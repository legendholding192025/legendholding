"use client"

import { useState, useEffect, useRef } from "react"
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
import { PageBanner } from "@/components/page-banner"
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const articlesPerPage = 3
  const carouselRef = useRef<HTMLDivElement>(null)

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
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
  }

  const nextPage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const prevPage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentPage((prev) => Math.max(1, prev - 1))
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
        <PageBanner 
          title="Newsroom"
          imageUrl="https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg"
        />

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
              <div className="mb-6">
                <h2 className="text-2xl font-bold">All News</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Showing {recentArticles.length} of {totalArticles} articles
                </p>
              </div>

              {recentArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">No articles available</p>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div
                      ref={carouselRef}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-300 ease-out"
                      onTransitionEnd={handleTransitionEnd}
                    >
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

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevPage}
                      disabled={isTransitioning || currentPage === 1}
                      className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>

                    <button
                      onClick={nextPage}
                      disabled={isTransitioning || currentPage === totalPages}
                      className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Bottom Pagination */}
                  <div className="flex justify-center mt-8 gap-2">
                    <div className="flex items-center gap-1.5 px-3">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                        const pageNumber = index + 1;
                        const isCurrentPage = currentPage === pageNumber;
                        return (
                          <button
                            key={index}
                            onClick={() => handlePageChange(pageNumber)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              isCurrentPage
                                ? "bg-[#F08900] w-6"
                                : "bg-gray-300 hover:bg-gray-400"
                            )}
                            aria-label={`Go to page ${pageNumber}`}
                          />
                        );
                      })}
                    </div>
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
