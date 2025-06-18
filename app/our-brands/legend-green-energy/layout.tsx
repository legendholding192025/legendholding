import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Green Energy Solutions | Charging The World | Renewable Energy | UAE',
  description: 'Legend Green Energy Solutions - Sustainable energy solutions for a greener future. Discover our innovative renewable energy technologies and commitment to environmental sustainability across the Middle East and Africa.',
  keywords: 'Legend Green Energy, renewable energy, sustainable energy, green energy solutions, solar energy, wind energy, UAE renewable energy, Middle East sustainability, clean energy, energy solutions UAE, green energy companies UAE, sustainable energy UAE, eco-friendly energy providers, solar energy UAE, renewable energy Dubai',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683d9fb5d95276.90087674_20250602_125725.png',
});

export default function LegendGreenEnergyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 