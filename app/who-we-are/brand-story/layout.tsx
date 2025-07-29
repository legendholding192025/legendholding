import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Brand Story',
  description: 'Discover Legend Holding Group\'s brand story - from our founding vision to becoming a leading diversified business conglomerate. Learn how we\'ve built trust, innovation, and excellence across the Middle East and Africa.',
  keywords: 'Legend Holding Group brand story, company history, brand evolution, UAE business story, Middle East success story, automotive brand, energy brand, technology brand',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_6862aedc3ac7d3.80278555_20250630_153556.png?v=2',
});

export default function BrandStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 