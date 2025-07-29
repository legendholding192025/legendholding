import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend X | Robotics & AI Solutions | UAE',
  description: 'Legend X is a robotics company specialized in cutting-edge technology and AI-driven innovations. We offer advanced robotics solutions designed to integrate everyday life with AI, both at the corporate and personal level.',
  keywords: 'Legend X, robotics company, AI solutions, artificial intelligence, smart automation, service robots, surveillance robots, inspection robots, personal assistants, UAE robotics, Middle East AI, Dubai robotics, Legend Holding Group',
  imageUrl: 'https://cdn.legendholding.com/images/cdn_687a1f4c67df37.03007310_20250718_101748.png',
});

export default function LegendXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 