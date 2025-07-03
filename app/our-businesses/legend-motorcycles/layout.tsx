import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Motorcycles | Premium Motorcycle Solutions | UAE',
  description: 'As the official UAE distributor of Lifan Motorcycles, we provide a wide range of reliable and affordable motorcycles for delivery services, assembled in the UAE. Our after-sales network ensures parts availability and full-service support across the Emirates.',
  keywords: 'Legend Motorcycles, premium motorcycles, motorcycle sales, UAE motorcycles, Middle East bikes, motorcycle accessories, high-performance bikes, motorcycle services, automotive group UAE, smart mobility solutions, intelligent mobility solutions, Dubai-based conglomerate, customer-first business group',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_legend_motorcycles.png',
});

export default function LegendMotorcyclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 