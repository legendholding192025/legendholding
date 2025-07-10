"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  CalendarIcon,
  ChevronLeft,
  Clock,
  ArrowRight,
  Link2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { toast } from "sonner"

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

interface NewsArticle {
  id: string
  created_at: string
  publication_date: string
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
  images?: NewsArticleImage[]
}

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TwitterIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function NewsArticlePage() {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [latestArticles, setLatestArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (params?.id) {
      fetchArticle()
    }
  }, [params?.id])

  const fetchLatestArticles = async (excludeId?: string) => {
    try {
      let query = supabase
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      // Exclude the current article if an ID is provided
      if (excludeId) {
        query = query.neq("id", excludeId)
      }

      const { data, error } = await query.limit(5)

      if (error) throw error
      setLatestArticles(data || [])
    } catch (error) {
      console.error("Error fetching latest articles:", error)
    }
  }

  const fetchArticle = async () => {
    if (!params?.id) return

    try {
      // Fetch the current article
      const { data: articleData, error: articleError } = await supabase
        .from("news_articles")
        .select("*")
        .eq("id", params.id)
        .single()

      if (articleError) throw articleError

      // Fetch images for the article
      let imagesData = []
      try {
        const { data: fetchedImages, error: imagesError } = await supabase
          .from("news_article_images")
          .select("*")
          .eq("article_id", articleData.id)
          .order("image_order", { ascending: true })

        if (imagesError) {
          // Check if table doesn't exist (common error code: PGRST116)
          if (imagesError.code === 'PGRST116' || imagesError.message?.includes('does not exist')) {
            console.warn("news_article_images table not found. Please run the database migration.")
          } else {
            console.error("Error fetching images:", imagesError)
          }
        } else {
          imagesData = fetchedImages || []
        }
      } catch (error) {
        console.warn("Failed to fetch images (table may not exist yet)")
      }

      setArticle({ ...articleData, images: imagesData })

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

      // Fetch latest articles excluding the current article
      await fetchLatestArticles(articleData.id)
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

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <article className="bg-white p-6 rounded-xl shadow-md">
                {/* Category and Meta Info */}
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-[#5E366D] px-3 py-1 text-sm font-medium text-white">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {new Date(article.publication_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    {article.read_time}
                  </div>
                </div>

                {/* Title */}
                <h1 className="mb-6 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl text-[rgb(43,28,72)]">
                  {article.title}
                </h1>

                {/* Images Gallery */}
                {(() => {
                  // Get all images (both banner and content)
                  const allImages = article.images && article.images.length > 0 
                    ? article.images 
                    : article.image_url 
                      ? [{ id: 'legacy', image_url: article.image_url, alt_text: article.title, caption: '' }] 
                      : []

                  if (allImages.length === 0) return null

                  // Single image - full width
                  if (allImages.length === 1) {
                    const image = allImages[0]
                    return (
                      <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-xl md:h-[500px]">
                        <Image
                          src={image.image_url}
                          alt={image.alt_text || article.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-sm">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    )
                  }

                  // Two images - one above, one below
                  if (allImages.length === 2) {
                    return (
                      <div className="relative mb-6 w-full overflow-hidden rounded-xl">
                        <div className="grid grid-rows-2 gap-1 h-[350px] md:h-[600px]">
                          {allImages.map((image, index) => (
                            <div key={image.id || index} className="relative overflow-hidden">
                              <Image
                                src={image.image_url}
                                alt={image.alt_text || `Image ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  // Three images - one on top, two below
                  if (allImages.length === 3) {
                    return (
                      <div className="relative mb-6 w-full overflow-hidden rounded-xl">
                        <div className="grid grid-rows-2 gap-1 h-[350px] md:h-[600px]">
                          {/* First image - top full width */}
                          <div className="relative overflow-hidden">
                            <Image
                              src={allImages[0].image_url}
                              alt={allImages[0].alt_text || "Main image"}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>
                          {/* Two images - bottom row */}
                          <div className="grid grid-cols-2 gap-1 h-full">
                            {allImages.slice(1).map((image, index) => (
                              <div key={image.id || index} className="relative overflow-hidden">
                                <Image
                                  src={image.image_url}
                                  alt={image.alt_text || `Image ${index + 2}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  // Four or more images - one on top, grid below
                  return (
                    <div className="relative mb-6 w-full overflow-hidden rounded-xl">
                      <div className="grid grid-rows-2 gap-1 h-[350px] md:h-[600px]">
                        {/* First image - top full width */}
                        <div className="relative overflow-hidden">
                          <Image
                            src={allImages[0].image_url}
                            alt={allImages[0].alt_text || "Main image"}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                        {/* Grid of images - bottom row */}
                        <div className="grid grid-cols-3 gap-1 h-full">
                          {allImages.slice(1, 4).map((image, index) => (
                            <div key={image.id || index} className="relative overflow-hidden">
                              <Image
                                src={image.image_url}
                                alt={image.alt_text || `Image ${index + 2}`}
                                fill
                                className="object-cover"
                              />
                              {/* Show +N indicator on last visible image if there are more */}
                              {index === 2 && allImages.length > 4 && (
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                  <span className="text-white text-xl font-bold">
                                    +{allImages.length - 4}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-[rgb(43,28,72)] prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-[rgb(93,55,110)] prose-headings:font-semibold prose-headings:mb-4 prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />



                {/* Share Section */}
                <div className="mt-8 border-t pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        #{article.category}
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <span className="text-sm text-gray-500">Share this article:</span>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors"
                          onClick={() => handleShare("facebook")}
                        >
                          <FacebookIcon className="h-4 w-4" />
                          <span className="sr-only">Share on Facebook</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-colors"
                          onClick={() => handleShare("twitter")}
                        >
                          <TwitterIcon className="h-4 w-4" />
                          <span className="sr-only">Share on Twitter</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-colors"
                          onClick={() => handleShare("linkedin")}
                        >
                          <LinkedInIcon className="h-4 w-4" />
                          <span className="sr-only">Share on LinkedIn</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() => handleShare("copy")}
                        >
                          <Link2 className="h-4 w-4" />
                          <span className="sr-only">Copy link</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-6 text-2xl font-bold text-[rgb(43,28,72)]">Related Articles</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {new Date(relatedArticle.publication_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {relatedArticle.read_time}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-[rgb(43,28,72)] group-hover:text-[#5E366D] transition-colors">
                            {relatedArticle.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Latest Articles */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-6 text-[rgb(43,28,72)]">Latest Articles</h3>
                <div className="divide-y divide-gray-100">
                  {latestArticles.map((latestArticle) => (
                    <Link
                      key={latestArticle.id}
                      href={`/news/${latestArticle.id}`}
                      className="block py-4 first:pt-0 last:pb-0 group"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image 
                            src={latestArticle.image_url || "/placeholder.svg"} 
                            alt={latestArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-medium leading-tight mb-1.5 line-clamp-2 text-[rgb(43,28,72)] group-hover:text-[#5E366D] transition-colors">
                            {latestArticle.title}
                          </h4>
                          <p className="text-sm text-[rgb(93,55,110)] mb-2 line-clamp-2">
                            {latestArticle.excerpt}
                          </p>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 h-3 w-3" />
                              {latestArticle.read_time}
                            </div>
                            <span className="inline-flex items-center text-xs font-medium text-[#F39200] group-hover:text-[#F39200]/80 transition-colors">
                              Read Now
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
} 