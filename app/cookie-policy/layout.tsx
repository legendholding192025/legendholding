import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description: 'Legend Holding Group\'s Cookie Policy explains how we use cookies and similar technologies to enhance your browsing experience. Learn about our cookie practices and how to manage your preferences.',
  keywords: 'Legend Holding Group cookie policy, website cookies, cookie management, UAE cookie policy, Middle East data practices, website privacy, cookie preferences',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 