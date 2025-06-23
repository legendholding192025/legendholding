import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Our Foundation',
  description: 'Legend Holding Group\'s foundation drives our commitment to innovation, sustainability, and excellence. Discover our strategic goals and values that shape our future across automotive, energy, and technology sectors.',
  keywords: 'Legend Holding Group foundation, company mission, strategic goals, corporate values, UAE business vision, Middle East innovation, sustainable growth, company objectives',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function OurFoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 