import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Customer Care',
  description: 'Legend Holding Group Customer Care - We are here to help you with any questions, concerns, or support you may need.',
  keywords: 'Legend Holding Group customer care, customer support, help desk, customer service, support center',
});

export default function CustomerCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

