import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Job Openings',
  description: 'Explore current job openings at Legend Holding Group. Find your perfect role in automotive, energy, technology, travel, or business operations. Join our growing team and contribute to innovation across the Middle East.',
  keywords: 'Legend Holding Group job openings, current vacancies, UAE job listings, Middle East employment, automotive jobs, energy careers, technology positions, travel industry opportunities',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_684c0cb0b68659.28788609_20250613_113408.jpg',
});

export default function CareersJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 