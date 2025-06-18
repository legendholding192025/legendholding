import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Vision & Mission',
  description: 'Legend Holding Group\'s vision and mission drive our commitment to innovation, sustainability, and excellence. Discover our strategic goals and values that shape our future across automotive, energy, and technology sectors.',
  keywords: 'Legend Holding Group vision, company mission, strategic goals, corporate values, UAE business vision, Middle East innovation, sustainable growth, company objectives',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function VisionMissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 