import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Who We Are',
  description: 'Discover Legend Holding Group\'s foundation, leadership team, brand story, and journey. Learn about our vision, mission, values, and the dedicated professionals driving innovation across the Middle East and Africa.',
  keywords: 'Legend Holding Group, who we are, company history, leadership team, brand story, vision mission, company journey, UAE business, Middle East leadership',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_6862a6e1eef048.35976175_20250630_150153.jpg?v=2',
});

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 