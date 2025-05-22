"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  BookmarkIcon,
  CalendarIcon,
  ChevronLeft,
  Clock,
  Facebook,
  Heart,
  Link2,
  Linkedin,
  Share2,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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

export default function NewsArticlePage() {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      // Fetch the current article
      const { data: articleData, error: articleError } = await supabase
        .from("news_articles")
        .select("*")
        .eq("id", params.id)
        .single()

      if (articleError) throw articleError

      setArticle(articleData)

      // Fetch related articles from the same category
      if (articleData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from("news_articles")
          .select("*")
          .eq("category", articleData.category)
          .neq("id", articleData.id)
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3)

        if (relatedError) throw relatedError
        setRelatedArticles(relatedData || [])
      }
    } catch (error) {
      console.error("Error fetching article:", error)
      toast.error("Failed to load article")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = article?.title || "Check out this article"

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard!")
        break
    }
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

  if (!article) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f8f9fa] pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Article not found</h1>
              <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
              <Link href="/news">
                <Button className="mt-4 bg-[#5E366D] hover:bg-[#5E366D]/90">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Button>
              </Link>
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
          {/* Article Header */}
          <div className="mb-8">
            <Link href="/news" className="inline-flex items-center text-[#5E366D] hover:underline">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to News
            </Link>
          </div>

          <article className="bg-white p-6 rounded-xl shadow-md">
            {/* Category and Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-[#5E366D] px-3 py-1 text-sm font-medium text-white">
                {article.category}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(article.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {article.read_time}
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Author and Share */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#5E366D]"></div>
                <div>
                  <div className="font-medium">{article.author}</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleShare("copy")}
                >
                  <Link2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-xl md:h-[500px]">
              <Image
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags and Actions */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  #{article.category}
                </Button>
                <Button variant="outline" size="sm">
                  #news
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.id}`}
                    className="group overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedArticle.image_url || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-[#F08900] px-3 py-1 text-xs font-medium text-white">
                        {relatedArticle.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {new Date(relatedArticle.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {relatedArticle.read_time}
                        </div>
                      </div>
                      <h3 className="mb-2 text-lg font-bold leading-tight group-hover:text-[#5E366D]">
                        {relatedArticle.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
} 