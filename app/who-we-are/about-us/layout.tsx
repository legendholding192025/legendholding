import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Legend Holding Group\'s foundation drives our commitment to innovation, sustainability, and excellence. Discover our strategic goals and values that shape our future across automotive, energy, and technology sectors.',
  keywords: 'dubai investment, investments in dubai, investment companies in dubai, investment in uae, investment funds, uae investors, asset management group, dubai group, company abu dhabi, group dubai, good investment in uae, abu dhabi investment authority, invest in dubai, uae company, Legend Holding Group foundation, company mission, strategic goals, corporate values, UAE business vision, Middle East innovation, sustainable growth, company objectives',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_6862a6e1eef048.35976175_20250630_150153.jpg?v=2',
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 