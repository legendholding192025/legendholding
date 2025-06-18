import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Legend Holding Group. Contact our team for business inquiries, partnerships, career opportunities, or general information about our automotive, energy, technology, and travel services across the UAE and Middle East.',
  keywords: 'Legend Holding Group contact, business inquiries, UAE contact, Middle East business contact, automotive contact, energy contact, technology contact, partnership inquiries',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9dd2a74833.63027495_20250603_070138.jpg',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 