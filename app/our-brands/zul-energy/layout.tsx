import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Zul Energy | Sustainable Energy Solutions | UAE',
  description: 'Zul Energy is a premium manufacturer of chemical additives for Oil & Gas field applications. With a cutting-edge production facility in Ras Al Khaimah and over 200 employees, Zul Energy serves 50+ international clients with sustainable, high-performance solutions for upstream operations.',
  keywords: 'Zul Energy, sustainable energy, renewable energy solutions, clean energy, UAE energy, Middle East sustainability, environmental solutions, green technology, energy innovation, chemical additives oil and gas, energy solutions UAE, sustainable business UAE, innovation-focused companies, Dubai-based conglomerate',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da403178ef3.07284478_20250602_131547.jpg',
});

export default function ZulEnergyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 