import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Job Openings',
  description: 'Explore current job openings at Legend Holding Group. Find your perfect role in automotive, energy, technology, travel, or business operations. Join our growing team and contribute to innovation across the Middle East.',
  keywords: 'Legend Holding Group job openings, current vacancies, UAE job listings, Middle East employment, automotive jobs, energy careers, technology positions, travel industry opportunities',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_683e9ef4bd30c8.05897688_20250603_070628.jpg',
});

export default function CareersJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 