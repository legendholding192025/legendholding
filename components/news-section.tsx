"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"

interface NewsArticleImage {
  id: string
  article_id: string
  image_url: string
  image_order: number
  image_type: 'banner' | 'content'
  alt_text?: string
  caption?: string
  created_at: string
}

type NewsItem = {
  id: string
  title: string
  created_at: string
  publication_date: string
  excerpt: string
  category: string
  image_url: string
  url: string
  read_time: string
  images?: NewsArticleImage[]
}

export function Newsroom() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)



  // Helper function to get display image for a news item
  const getDisplayImage = (newsItem: NewsItem) => {
    if (newsItem.images && newsItem.images.length > 0) {
      // Try to find a banner image first
      const bannerImage = newsItem.images.find(img => img.image_type === 'banner')
      if (bannerImage) {
        return { src: bannerImage.image_url, alt: bannerImage.alt_text || newsItem.title }
      }
      // Otherwise use the first image
      return { src: newsItem.images[0].image_url, alt: newsItem.images[0].alt_text || newsItem.title }
    }
    // Fallback to legacy image_url
    return { src: newsItem.image_url || "/placeholder.svg", alt: newsItem.title }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setError(null)
      
      // Check if supabase client is properly configured
      if (!supabase) {
        console.error("Supabase client is not configured")
        setError("Configuration error")
        return
      }
      
      const { data, error } = await supabase!
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .order("publication_date", { ascending: false })
        .limit(3) // Only fetch 3 latest news items

      if (error) {
        console.error("Supabase error:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        setError("Failed to load news articles")
        return
      }

      if (!data || data.length === 0) {
        console.warn("No news articles found")
        setNewsItems([])
        return
      }

      // For home page, we don't need to fetch additional images to improve loading speed
      // The legacy image_url field should be sufficient for the home page display
      setNewsItems(data.map(newsItem => ({ ...newsItem, images: [] })))
    } catch (error) {
      console.error("Error fetching news:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      })
      setError("Failed to load news articles")
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 bg-[#EAE2D6]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5E366D] border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 bg-[#EAE2D6]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F08900] mb-4">Latest News</h2>
            <p className="text-[rgb(93,55,110)] text-lg">Unable to load news articles at this time. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-[#FFFFF]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 -translate-y-[5px]">
                <Image
                  src="https://cdn.legendholding.com/images/cdn_683e960b1997b5.22165608_20250603_062827.png"
                  alt="News icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F08900]">Latest News</h2>
            </div>
            <p className="text-[rgb(93,55,110)] max-w-2xl text-lg md:text-xl leading-relaxed">
              Stay updated with the latest developments, announcements, and achievements from Legend Holding Group.
            </p>
          </div>
          <Link
            href="/news"
            className="mt-4 md:mt-0 inline-flex items-center text-[#F39200] font-medium hover:text-[#F39200]/80 transition-colors group"
          >
            View All News
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="bg-[rgb(234,226,214)]/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[rgb(234,226,214)]/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                aria-hidden="true"
              />
              <div className="relative h-48 overflow-hidden m-2 rounded-xl">
                {(() => {
                  const displayImage = getDisplayImage(news)
                  return (
                    <Image
                      src={displayImage.src}
                      alt={displayImage.alt}
                      width={400}
                      height={240}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    />
                  )
                })()}
              </div>
              <div className="p-5 flex flex-col flex-grow relative">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(news.publication_date).toLocaleDateString()}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[rgb(43,28,72)] line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-[rgb(93,55,110)] mb-4 line-clamp-3 flex-grow text-lg">{news.excerpt}</p>
                <div className="text-[#F39200] font-medium text-sm flex items-center">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
