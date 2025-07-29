import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Newsroom',
  description: 'Stay updated with the latest news, announcements, and insights from Legend Holding Group. Discover our latest developments in automotive, energy, technology, and business across the Middle East and Africa.',
  keywords: 'Legend Holding Group news, company announcements, business updates, UAE business news, Middle East developments, automotive news, energy updates, technology innovations',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_685aae9f8a74d0.60885969_20250624_135647.png?v=2',
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 