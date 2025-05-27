import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CTASection() {
  const router = useRouter()

  return (
    <div className="bg-[#5E366D] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button
            onClick={() => router.push('/careers/submit-resume')}
            className="bg-[#EE8900] hover:bg-[#EE8900]/90 text-white px-8 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 text-lg font-medium"
          >
            Submit Your Resume
          </Button>
        </div>
      </div>
    </div>
  )
} 