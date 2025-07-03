import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Motors Dealership | Official Premium Dealership | UAE',
  description: 'Legend Motors Dealerships is the official retail network for Li Auto, Skywell, and Kaiyi vehicles in the UAE. With modern showrooms in Dubai and Abu Dhabi, we offer a premium selection of electric, hybrid, and fuel-powered cars, support trade-in solutions, financing, and certified aftersales services. We deliver a seamless customer experience, built on innovation, trust, and smart mobility.',
  keywords: 'Legend Motors Dealership, premium dealership, luxury car sales, official dealership, UAE car dealership, Middle East automotive, premium brands, authorized dealer, luxury vehicles, electric vehicles UAE, EV dealership UAE, smart mobility solutions, Chinese car brands UAE, technology-driven enterprises Dubai',
  imageUrl: 'https://cdn.legendholding.com/images/cloudinary/cloudinary_683da1fac83f95.14534616_20250602_130706.png',
});

export default function LegendMotorsDealershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 