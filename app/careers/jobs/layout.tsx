import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Job Openings',
  description: 'Explore current job openings at Legend Holding Group. Find your perfect role in automotive, energy, technology, travel, or business operations. Join our growing team and contribute to innovation across the Middle East.',
  keywords: 'Legend Holding Group job openings, current vacancies, UAE job listings, Middle East employment, automotive jobs, energy careers, technology positions, travel industry opportunities',
  imageUrl: 'https://res.cloudinary.com/dzfhqvxnf/image/upload/w_1200,h_630,c_pad,f_auto,q_auto,b_white/LHG_yp2g8y.png',
});

export default function CareersJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 