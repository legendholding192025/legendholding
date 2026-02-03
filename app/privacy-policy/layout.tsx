import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Legend Holding Group\'s Privacy Policy outlines how we collect, use, and protect your personal information. Learn about our commitment to data privacy and security across all our business operations.',
  keywords: 'Legend Holding Group privacy policy, data protection, personal information, UAE privacy, Middle East data security, business privacy, customer data protection',
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 