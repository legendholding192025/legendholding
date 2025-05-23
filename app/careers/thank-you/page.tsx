"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowLeft } from "lucide-react"

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in joining our team. We have received your application and will review it shortly. We'll be in touch if your qualifications match our requirements.
          </p>
          <div className="space-y-4">
            <Link href="/careers">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Careers
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full bg-[#5E366D] hover:bg-[#5E366D]/90">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 