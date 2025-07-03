import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Global Media | Digital Media Solutions | UAE',
  description: 'Legend Global Media - Innovative media solutions for the digital age. From content creation to digital marketing, discover cutting-edge media services that drive engagement and growth.',
  keywords: 'Legend Global Media, digital media, content creation, digital marketing, UAE media, Middle East media solutions, innovative media, digital content, media technology, data-driven solutions Dubai, technology-driven enterprises Dubai, innovation-focused companies, Dubai-based conglomerate',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683d9f42113ba5.78852919_20250602_125530.jpg',
});

export default function LegendGlobalMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 