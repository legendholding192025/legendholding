import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Technical Services | Facilities Management | UAE',
  description: 'Legend Technical Services provides expert installation, maintenance, and support solutions for automotive, energy, and mobility systems. Our certified team delivers on-site diagnostics, system integrations, and technical repairs with a focus on precision, safety, and long-term reliability, supporting both corporate clients and fleet operators across the UAE.',
  keywords: 'Legend Technical Services, facilities management, technical solutions, engineering services, UAE technical services, Middle East facilities, maintenance services, technical engineering, business solutions, diversified group UAE, sustainable business UAE, innovation-focused companies, Dubai-based conglomerate, regional holding group UAE, Middle East business group',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da2fc6fd9b2.48641261_20250602_131124.jpg',
});

export default function LegendTechnicalServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 