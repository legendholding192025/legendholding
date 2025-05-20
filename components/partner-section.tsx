import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const partners = [
    { id: 1, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture4_pqohbf.png', name: 'Partner 1' },
    { id: 2, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture9_dttje6.png', name: 'Partner 2' },
    { id: 3, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727869/Picture10_p3whcu.png', name: 'Partner 3' },
    { id: 4, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture12_stvafn.png', name: 'Partner 4' },
    { id: 5, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture8_jmctgu.png', name: 'Partner 5' },
    { id: 6, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture7_wplkgz.png', name: 'Partner 6' },
    { id: 7, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture13_fqzvhb.png', name: 'Partner 7' },
    { id: 8, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture11_sqgf9y.png', name: 'Partner 8' },
    { id: 9, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727867/Picture14_apmvql.png', name: 'Partner 9' },
    { id: 10, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture5_txk7lq.png', name: 'Partner 10' },
    { id: 11, logo: 'https://res.cloudinary.com/dosxengut/image/upload/v1747727868/Picture6_bcnri8.png', name: 'Partner 11' },
    { id: 12, logo: '/partners/partner12.png', name: 'Partner 12' },
  ]
export function PartnerSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">Our Partners</h2>
          <Link 
            href="/partners" 
            className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors group text-sm sm:text-base"
          >
            <span className="whitespace-nowrap">Learn More About Our Partners</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 sm:p-6 bg-gray-50 rounded-lg h-[100px] sm:h-[120px] w-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-white"
            >
              <div className="relative w-[120px] sm:w-[150px] h-[60px] sm:h-[80px]">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-opacity duration-300 hover:opacity-90"
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 