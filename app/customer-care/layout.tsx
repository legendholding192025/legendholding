import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Customer Care',
  description: 'Legend Holding Group Customer Care - We are here to help you with any questions, concerns, or support you may need.',
  keywords: 'Legend Holding Group customer care, customer support, help desk, customer service, support center',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_69469335977298.96434588_20251220_121445.webp',
});

export default function CustomerCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

