import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Company Profile',
  description: 'Explore Legend Holding Group\'s comprehensive company profile. Learn about our corporate structure, business overview, key achievements, and strategic positioning in the UAE and Middle East markets.',
  keywords: 'Legend Holding Group company profile, corporate structure, business overview, UAE company profile, Middle East business, corporate achievements, company information, business portfolio',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683ea90f29b708.04231409_20250603_074935.jpg',
});

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 