import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'The Team',
  description: 'Meet the dedicated professionals behind Legend Holding Group\'s continued growth and innovation. Our leadership team brings together expertise from automotive, energy, technology, and business sectors.',
  keywords: 'Legend Holding Group team, company leadership, executive team, UAE business leaders, Middle East executives, automotive leadership, energy experts, technology innovators',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_684c1882b54a16.04269006_20250613_122434.jpeg?v=2',
});

export default function TheTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 