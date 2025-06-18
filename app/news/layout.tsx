import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Newsroom',
  description: 'Stay updated with the latest news, announcements, and insights from Legend Holding Group. Discover our latest developments in automotive, energy, technology, and business across the Middle East and Africa.',
  keywords: 'Legend Holding Group news, company announcements, business updates, UAE business news, Middle East developments, automotive news, energy updates, technology innovations',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 