import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Corporate Social Responsibility',
  description: 'Discover Legend Holding Group\'s commitment to Corporate Social Responsibility. Learn about our humanitarian relief, community development, and initiatives in education, environment, and innovation.',
  keywords: 'CSR, Corporate Social Responsibility, Legend Holding Group, humanitarian relief, community development, education, environment, innovation',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_684c0cb0b68659.28788609_20250613_113408.jpg',
});

export default function CSRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 