import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Careers',
  description: 'Join Legend Holding Group\'s dynamic team and build your career with a leading diversified business conglomerate. Discover exciting opportunities across automotive, energy, technology, and travel sectors in the UAE and Middle East.',
  keywords: 'Legend Holding Group careers, job opportunities, UAE jobs, Middle East careers, automotive careers, energy jobs, technology careers, travel industry jobs, professional development',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9ef4bd30c8.05897688_20250603_070628.jpg',
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 