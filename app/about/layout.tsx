import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Legend Holding Group - a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa. Discover our commitment to excellence and sustainable growth.',
  keywords: 'Legend Holding Group about, UAE holding company, Middle East business, automotive innovation, energy solutions, tourism services, smart mobility, sustainable growth, diversified business',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 