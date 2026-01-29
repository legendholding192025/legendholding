import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'Legend Holding Group',
    template: '%s | Legend Holding Group'
  },
  description: 'Legend Holding Group is a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa. Discover our comprehensive business solutions.',
  keywords: 'dubai investment, investments in dubai, investment companies in dubai, investment in uae, investment funds, uae investors, asset management group, dubai group, company abu dhabi, group dubai, good investment in uae, abu dhabi investment authority, invest in dubai, uae company, travel agency dubai, uae tour packages, dubai city tour, abu dhabi city tour, desert safari dubai, dubai visa services, holiday packages from dubai, international tour packages, umrah package from dubai, airport transfers dubai, used cars in dubai, buy used car dubai, new cars dubai, cars for sale uae, car showroom dubai, affordable cars dubai, second hand cars uae, luxury cars dubai, car dealer in dubai, best car showroom dubai, motorcycles in uae, lifan bikes uae, sports bikes for sale dubai, commuter bikes uae, cheap motorcycles dubai, motorbike showroom uae, 125cc bikes uae, motorcycle dealer dubai, electric cars uae, ev cars dubai, chinese cars uae, kaiyi cars uae, skywell electric car uae, li auto uae, new suv uae, best electric suv uae, affordable electric cars uae, dealership dubai, solar panels uae, solar system installation uae, renewable energy solutions uae, solar inverter uae, solar company in dubai, green energy solutions uae, solar power system dubai, solar battery uae, robotics company uae, industrial robots uae, automation solutions dubai, robotics technology uae, ai automation uae, warehouse automation systems, robotic arms uae, robotic solutions dubai, chemical suppliers uae, industrial chemicals dubai, chemical trading company uae, lubricants supplier uae, solvents suppliers dubai, cleaning chemicals uae, bulk chemicals uae, chemical distributor dubai, car repair dubai, car service dubai, vehicle maintenance uae, car workshop near me dubai, car ac repair dubai, car electrical repair dubai, car engine repair dubai, car detailing dubai, commercial vehicles uae, light trucks uae, pickups for sale dubai, cargo vans uae, commercial fleet uae, commercial vehicle dealer dubai, heavy vehicles uae, van for sale uae, media company uae, digital marketing dubai, content creation dubai, video production uae, social media marketing dubai, corporate video production, branding agency dubai, maintenance company dubai, facility management uae, plumbing services dubai, electrical repair dubai, painting services dubai, ac maintenance dubai, home repair service uae, car rental dubai, rent a car uae, cheap car rental dubai, monthly car rental dubai, luxury car rental uae, suv rental dubai, long term car rental dubai, Legend Holding Group, UAE holding company, investment company Dubai, investment company UAE, automotive group UAE, energy solutions UAE, technology companies Dubai, travel and tourism UAE, smart mobility solutions, diversified business group, Middle East conglomerate, Dubai-based company, automotive dealership UAE, electric vehicles UAE, Chinese car brands UAE, sustainable energy UAE, business innovation Dubai, corporate services UAE, asset management UAE, automotive services Dubai, mobility service providers Dubai, intelligent mobility solutions, data-driven solutions Dubai, technology-driven enterprises Dubai, innovation-focused companies, customer-first business group, Dubai-based conglomerate, Middle East business group, UAE automotive, Middle East vehicles, quality vehicles, hybrid cars UAE, green energy companies UAE, sustainable energy UAE, MICE travel solutions UAE, corporate travel Dubai, inbound tourism UAE, Chinese tourism services Dubai, robotics company UAE, AI solutions Dubai, artificial intelligence UAE, smart automation Dubai, service robots UAE, surveillance robots UAE, inspection robots UAE, personal assistants Dubai, UAE robotics, Middle East AI, Dubai robotics, digital media Dubai, content creation UAE, digital marketing Dubai, innovative media UAE, digital content Dubai, media technology UAE, luxury car rental UAE, vehicle rental Dubai, UAE car hire, premium rental cars Dubai, Middle East car rental, automotive rental services UAE, multi-brand vehicles Dubai, automotive hub UAE, vehicle selection Dubai, Legend Holding Group, automotive, energy, technology, travel, business, innovation, sustainability, UAE, Middle East',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://legendholding.com',
    siteName: 'Legend Holding Group',
    images: [
      {
        url: 'https://cdn.legendholding.com/images/cdn_684c0cb0b68659.28788609_20250613_113408.jpg',
        width: 1200,
        height: 630,
        alt: 'Legend Holding Group - Global Diversified Holding Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@legendholding',
    creator: '@legendholding',
  },
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  imageUrl,
}: PageMetadata): Metadata {
  return {
    ...defaultMetadata,
    title,
    description,
    keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
} 
