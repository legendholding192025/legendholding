import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend World Rent a Car | Premium Car Rental | UAE',
  description: 'Legend Rent a Car offers short and long term affordable car rental services in UAE, including daily, weekly, and long-term rentals. With a modern fleet and personalized service, we support both individual travelers and corporate clients with seamless mobility solutions.',
  keywords: 'Legend World Rent a Car, car rental UAE, luxury car rental, vehicle rental, UAE car hire, premium rental cars, Middle East car rental, automotive rental services, mobility service providers Dubai, intelligent mobility solutions, customer-first business group, Dubai-based conglomerate',
});

export default function LegendWorldRentACarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 