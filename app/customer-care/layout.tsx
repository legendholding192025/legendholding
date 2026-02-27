import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Customer Care',
  description: 'Legend Customer Care reflects our commitment to excellence across all Legend Holding companies. Contact us for fast support, service assistance, feedback, and complaint resolution.',
  keywords: 'Legend Holding Group customer care, customer support, help desk, customer service, support center',
});

export default function CustomerCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

