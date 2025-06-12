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
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

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
        .limit(3) // Only fetch 3 latest news items

      if (error) throw error

      setNewsItems(data || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

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
                <Image
                  src={news.image_url || "/placeholder.svg"}
                  alt={news.title}
                  width={400}
                  height={240}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 rounded-xl"
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
      </div>
    </section>
  )
}
