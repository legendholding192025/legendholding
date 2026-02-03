import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Auto Services | Professional Auto Maintenance | UAE | Service Center',
  description: 'Legend Auto Services is the certified aftersales service and maintenance for Kaiyi, Skywell, 212, Li-Auto and wide range of vehicles, including electric, hybrid, and fuel-powered models. From regular maintenance to advanced diagnostics, repairs, and EV servicing, our expert technicians ensure every vehicle receives the precision, reliability, and care it deserves.',
  keywords: 'Legend Auto Services, auto maintenance, car repair, automotive services, UAE auto services, vehicle maintenance, professional car care, automotive technicians, Middle East auto services, automotive group UAE, electric vehicles UAE, smart mobility solutions, technology-driven enterprises Dubai, customer-first business group, Dubai-based conglomerate',
});

export default function LegendAutoServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

