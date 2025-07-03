import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend AutoHub | Multi-Brand Vehicle Hub | UAE',
  description: 'Legend AutoHub brings together multiple automotive brands under one roof, offering customers a comprehensive selection of high-quality vehicles. Experience exceptional service and satisfaction across every stage of your ownership journey.',
  keywords: 'Legend AutoHub, multi-brand vehicles, automotive hub, vehicle selection, UAE automotive, Middle East vehicles, quality vehicles, automotive group UAE, electric vehicles UAE, hybrid cars UAE, Chinese car brands UAE, Dubai-based conglomerate, customer-first business group',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png',
});

export default function LegendAutoHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 