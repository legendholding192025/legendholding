import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Job Opening',
  description: 'Explore career opportunities at Legend Holding Group. Join our dynamic team and contribute to innovation across the Middle East.',
  keywords: 'Legend Holding Group jobs, career opportunities, UAE employment, Middle East careers',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_684c0cb0b68659.28788609_20250613_113408.jpg',
});

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
