import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Careers',
  description: 'Join Legend Holding Group\'s dynamic team and build your career with a leading diversified business conglomerate. Discover exciting opportunities across automotive, energy, technology, and travel sectors in the UAE and Middle East.',
  keywords: 'Legend Holding Group careers, job opportunities, UAE jobs, Middle East careers, automotive careers, energy jobs, technology careers, travel industry jobs, professional development',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_684bcbb1411ca6.12573119_20250613_065649.jpg?v=2',
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 