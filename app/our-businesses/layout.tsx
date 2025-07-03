import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Our Businesses',
  description: 'Legend Holding Group is a diversified UAE holding company managing a fast-growing portfolio of subsidiaries across automotive, travel and tourism, car rental, energy, motorcycles, and green technology. Each company is strategically built to drive innovation, customer satisfaction, and sustainable growth across the Middle East and Africa.',
  keywords: 'Legend Holding Group brands, Legend Motors, Legend Green Energy, Zul Energy, Legend Travel, automotive brands, energy solutions, UAE brands, Middle East business',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png',
});

export default function OurBrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 