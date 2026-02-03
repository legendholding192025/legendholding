import { generatePageMetadata } from '@/config/metadata';

export const metadata = generatePageMetadata({
  title: 'Who We Are',
  description: 'Discover Legend Holding Group\'s foundation, leadership team, brand story, and journey. Learn about our vision, mission, values, and the dedicated professionals driving innovation across the Middle East and Africa.',
  keywords: 'dubai investment, investments in dubai, investment companies in dubai, investment in uae, investment funds, uae investors, asset management group, dubai group, company abu dhabi, group dubai, good investment in uae, abu dhabi investment authority, invest in dubai, uae company, Legend Holding Group, who we are, company history, leadership team, brand story, vision mission, company journey, UAE business, Middle East leadership',
});

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 