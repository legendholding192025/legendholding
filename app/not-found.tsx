import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-9xl font-bold text-[#5D376E] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-[#5D376E] hover:bg-[#4A2B5A]">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 