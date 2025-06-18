import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Sitemap',
  description: 'Navigate Legend Holding Group\'s website with our comprehensive sitemap. Find all our pages, services, and information about automotive, energy, technology, and travel solutions across the Middle East.',
  keywords: 'Legend Holding Group sitemap, website navigation, site structure, UAE business pages, Middle East services, automotive pages, energy pages, technology pages',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 