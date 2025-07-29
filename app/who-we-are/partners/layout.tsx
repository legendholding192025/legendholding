import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Our Partners',
  description: 'Legend Holding Group\'s strategic partnerships drive innovation and growth. Discover our network of trusted partners across automotive, energy, technology, and business sectors in the Middle East and beyond.',
  keywords: 'Legend Holding Group partners, strategic partnerships, business collaborations, UAE partnerships, Middle East alliances, automotive partners, energy partners, technology partners',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_68564e06066870.03563987_20250621_061534.jpg?v=2',
});

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 