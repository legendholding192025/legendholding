import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Legend Travel and Tourism',
  description: 'Legend Travel and Tourism - Exceptional travel experiences and tourism services. Discover premium travel solutions, luxury tours, and unforgettable destinations across the Middle East and beyond.',
  keywords: 'Legend Travel, tourism services, luxury travel, UAE tourism, Middle East travel, premium tours, travel experiences, tourism solutions, Legend Holding Group travel, travel and tourism company UAE, MICE travel solutions UAE, corporate travel Dubai, inbound tourism UAE, Chinese tourism services Dubai',
});

export default function LegendTravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 