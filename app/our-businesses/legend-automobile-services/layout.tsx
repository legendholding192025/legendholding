import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Automobile Services | Professional Auto Maintenance | UAE | Service Center',
  description: 'Legend Automobile Services is the certified aftersales service and maintenance for Kaiyi, Skywell, 212, Li-Auto and wide range of vehicles, including electric, hybrid, and fuel-powered models. From regular maintenance to advanced diagnostics, repairs, and EV servicing, our expert technicians ensure every vehicle receives the precision, reliability, and care it deserves.',
  keywords: 'Legend Automobile Services, auto maintenance, car repair, automotive services, UAE auto services, vehicle maintenance, professional car care, automotive technicians, Middle East auto services, automotive group UAE, electric vehicles UAE, smart mobility solutions, technology-driven enterprises Dubai, customer-first business group, Dubai-based conglomerate',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683d9e25db0112.44798593_20250602_125045.jpg',
});

export default function LegendAutomobileServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 