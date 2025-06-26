import Image from "next/image"

interface PageBannerProps {
  title: string
  imageUrl: string
}

export function PageBanner({ title, imageUrl }: PageBannerProps) {
  return (
    <div className="relative bg-[#5E366D] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-[center_20%]"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-[#5E366D]/80 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
} 