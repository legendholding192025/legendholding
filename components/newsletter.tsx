"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { UnsubscribeModal } from "@/components/unsubscribe-modal"
import Link from "next/link"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setIsSuccess(false)

    try {
      const response = await fetch("/api/admin/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to subscribe")
      }

      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="w-full py-12 md:py-16 bg-[#EAE2D6]">
        <div className="w-full px-4 md:px-6">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Content Section */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Never miss an update</h2>
                <p className="text-lg md:text-xl text-[#5D376E]">
                Stay connected to the latest news of Legend Holding Group
                </p>
              </div>

              {/* Newsletter Form Section */}
              <div className="flex-1 max-w-md w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12 text-base rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isLoading || isSuccess}
                    className="w-full h-12 px-8 font-semibold rounded-xl bg-[#E67E22] hover:bg-[#E67E22]/90 text-white flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle size={16} className="mr-2" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </form>
                <p className="text-sm text-muted-foreground mt-4 text-center lg:text-left">
                  By signing up you agree to our{" "}
                  <Link href="/terms" className="text-[#E67E22] hover:text-[#E67E22]/80 underline focus:outline-none">
                    Terms & Conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UnsubscribeModal
        isOpen={isUnsubscribeModalOpen}
        onClose={() => setIsUnsubscribeModalOpen(false)}
      />
    </>
  )
}
