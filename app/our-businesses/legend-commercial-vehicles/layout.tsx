import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Commercial Vehicles | Business Fleet Solutions | UAE',
  description: 'Legend Commercial Vehicles is the official importer of CHTC, KYC, Wanda Buses, and Forland, offering a wide range of reliable trucks and buses in the UAE. We provide fleet solutions and full aftersales service for businesses across logistics, construction, and transport sectors, delivering performance, value, and long-term service.',
  keywords: 'Legend Commercial Vehicles, commercial vehicles, fleet management, business vehicles, UAE commercial vehicles, Middle East fleet solutions, commercial automotive, business transportation, automotive group UAE, car importer Dubai, GCC automotive distributor, Dubai-based conglomerate, regional holding group UAE',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png',
});

export default function LegendCommercialVehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 