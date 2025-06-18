import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Our Journey',
  description: 'Follow Legend Holding Group\'s path of growth and milestones through the years. From our founding to becoming a diversified business leader, discover the key moments that shaped our success across the Middle East and Africa.',
  keywords: 'Legend Holding Group journey, company milestones, business growth, UAE business history, Middle East expansion, automotive growth, energy development, technology advancement',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_68469aa7bb4020.42147442_20250609_082615.jpg',
});

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 