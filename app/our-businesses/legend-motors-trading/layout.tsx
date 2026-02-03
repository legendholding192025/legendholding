import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Motors Trading',
  description: 'Legend Motors Trading - Premium automotive solutions and services. Since 2013, delivering exceptional performance with annual sales up to 55M USD across 10+ countries. Discover our cutting-edge automotive innovations and sustainable practices.',
  keywords: 'Legend Motors Trading, automotive trading, car trading, UAE automotive, premium cars, automotive solutions, Legend Holding Group, automotive innovation, sustainable automotive, automotive group UAE, car importer Dubai, Chinese car brands UAE, hybrid cars distributor UAE, GCC automotive distributor, Dubai-based conglomerate',
});

export default function LegendMotorsTradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 