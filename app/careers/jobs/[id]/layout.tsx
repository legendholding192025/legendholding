import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Job Opening',
  description: 'Explore career opportunities at Legend Holding Group. Join our dynamic team and contribute to innovation across the Middle East.',
  keywords: 'Legend Holding Group jobs, career opportunities, UAE employment, Middle East careers',
  imageUrl: 'https://www.legendholding.com/images/url_logo.png',
});

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
