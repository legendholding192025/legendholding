import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Pre-Owned Vehicles | Quality Used Cars | UAE',
  description: 'Legend Pre-Owned Vehicles offers a trusted selection of certified used cars across multiple brands, including electric, hybrid, and fuel powered models. Every vehicle is quality inspected, Pre-approved, and backed by warranty and aftersales support ensuring value, reliability, and peace of mind for every customer.',
  keywords: 'Legend Pre-Owned Vehicles, used cars, pre-owned vehicles, certified used cars, UAE used cars, Middle East pre-owned, quality used vehicles, certified pre-owned, vehicle inspection, automotive group UAE, electric vehicles UAE, hybrid cars distributor UAE, Chinese car brands UAE, Dubai-based conglomerate, customer-first business group',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png',
});

export default function LegendPreOwnedVehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 