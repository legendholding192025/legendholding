"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type NewsItem = {
  id: string
  title: string
  created_at: string
  excerpt: string
  category: string
  image_url: string
  url: string
  read_time: string
}

export function Newsroom() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 3
  const totalPages = Math.ceil(newsItems.length / itemsPerPage)

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) throw error

      setNewsItems(data || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    if (currentIndex < newsItems.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to the beginning
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(newsItems.length - itemsPerPage) // Loop to the end
    }
  }

  const visibleNews = newsItems.slice(currentIndex, currentIndex + itemsPerPage)

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5E366D] border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[rgb(43,28,72)] mb-2">Latest News</h2>
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

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="bg-[rgb(234,226,214)]/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[rgb(234,226,214)]/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  aria-hidden="true"
                />
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image_url || "/placeholder.svg"}
                    alt={news.title}
                    width={400}
                    height={240}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow relative">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(news.created_at).toLocaleDateString()}
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

          {newsItems.length > itemsPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-[rgb(234,226,214)]/20 border border-[rgb(43,28,72)]/20 text-[rgb(43,28,72)] hover:bg-[rgb(43,28,72)] hover:text-white transition-colors duration-300"
                aria-label="Previous news"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-1.5 px-3">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * itemsPerPage)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      Math.floor(currentIndex / itemsPerPage) === index
                        ? "bg-[rgb(43,28,72)] w-6"
                        : "bg-[rgb(234,226,214)] hover:bg-[rgb(234,226,214)]/70",
                    )}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-[rgb(234,226,214)]/20 border border-[rgb(43,28,72)]/20 text-[rgb(43,28,72)] hover:bg-[rgb(43,28,72)] hover:text-white transition-colors duration-300"
                aria-label="Next news"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
