"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type NewsItem = {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
  image: string
  url: string
}

const dummyNews: NewsItem[] = [
  {
    id: "news-2",
    title: "Skywell EV Dealership Opens New Flagship Showroom in Dubai",
    date: "April 22, 2024",
    excerpt:
      "Luxury electric vehicle brand expands presence with state-of-the-art facility featuring the latest models.",
    category: "Automotive",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746785190/Skywell-et5-lr-17_result_gram7t.jpg",
    url: "/newsroom/skywell-showroom",
  },
  {
    id: "news-3",
    title: "Legend Holding Group Recognized for Excellence in Facility Management",
    date: "April 10, 2024",
    excerpt:
      "Company receives prestigious industry award for innovative approaches to sustainable facility management.",
    category: "Awards",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg",
    url: "/newsroom/facility-award",
  },
  {
    id: "news-4",
    title: "Legend Motors Introduces New Luxury Vehicle Lineup for 2024",
    date: "March 28, 2024",
    excerpt:
      "Expanded portfolio features cutting-edge technology and premium design across multiple vehicle categories.",
    category: "Product Launch",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746784920/MGC_7670_aa2hn6.jpg",
    url: "/newsroom/new-vehicle-lineup",
  },
  {
    id: "news-5",
    title: "Legend Holding Group Expands Technology Division with New Acquisition",
    date: "March 15, 2024",
    excerpt: "Strategic acquisition strengthens the group's capabilities in AI and digital transformation solutions.",
    category: "Acquisition",
    image: "https://res.cloudinary.com/dosxengut/image/upload/v1746784921/Image_20250416225806_tspyoh.jpg",
    url: "/newsroom/tech-acquisition",
  },
]

export function Newsroom() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(dummyNews.length / itemsPerPage)

  const nextSlide = () => {
    if (currentIndex < dummyNews.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to the beginning
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(dummyNews.length - itemsPerPage) // Loop to the end
    }
  }

  const visibleNews = dummyNews.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#5E366D] mb-2">Latest News</h2>
            <p className="text-[#5E366D]/80 max-w-2xl">
              Stay updated with the latest developments, announcements, and achievements from Legend Holding Group.
            </p>
          </div>
          <Link
            href="/newsroom"
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
                href={news.url}
                className="bg-[rgb(234,226,214)]/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[rgb(234,226,214)]/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  aria-hidden="true"
                />
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    width={400}
                    height={240}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 bg-[#F39200] text-white text-xs font-semibold px-3 py-1 m-3 rounded">
                    {news.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow relative">
                  <div className="flex items-center text-[#5E366D]/70 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {news.date}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-[#5E366D] group-hover:text-[#F39200] transition-colors duration-300 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-[#5E366D]/80 mb-4 line-clamp-3 flex-grow">{news.excerpt}</p>
                  <div className="text-[#5E366D] font-medium text-sm flex items-center group-hover:text-[#F39200] transition-colors duration-300">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {dummyNews.length > itemsPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-[rgb(234,226,214)]/20 border border-[#5E366D]/20 text-[#5E366D] hover:bg-[#5E366D] hover:text-white transition-colors duration-300"
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
                        ? "bg-[#5E366D] w-6"
                        : "bg-[rgb(234,226,214)] hover:bg-[rgb(234,226,214)]/70",
                    )}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-[rgb(234,226,214)]/20 border border-[#5E366D]/20 text-[#5E366D] hover:bg-[#5E366D] hover:text-white transition-colors duration-300"
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
