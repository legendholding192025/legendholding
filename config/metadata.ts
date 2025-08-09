import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'Legend Holding Group | Global Diversified Holding Company | UAE',
    template: '%s | Legend Holding Group'
  },
  description: 'Legend Holding Group is a diversified UAE holding company leading innovation in automotive, energy, tourism, and smart mobility across the Middle East & Africa. Discover our comprehensive business solutions.',
  keywords: 'Legend Holding Group, UAE holding company, automotive group UAE, energy solutions UAE, technology companies Dubai, travel and tourism UAE, smart mobility solutions, diversified business group, Middle East conglomerate, Dubai-based company, automotive dealership UAE, electric vehicles UAE, Chinese car brands UAE, sustainable energy UAE, business innovation Dubai, corporate services UAE, investment company Dubai, asset management UAE, automotive services Dubai, mobility service providers Dubai, intelligent mobility solutions, data-driven solutions Dubai, technology-driven enterprises Dubai, innovation-focused companies, customer-first business group, Dubai-based conglomerate, Middle East business group, UAE automotive, Middle East vehicles, quality vehicles, hybrid cars UAE, green energy companies UAE, sustainable energy UAE, MICE travel solutions UAE, corporate travel Dubai, inbound tourism UAE, Chinese tourism services Dubai, robotics company UAE, AI solutions Dubai, artificial intelligence UAE, smart automation Dubai, service robots UAE, surveillance robots Dubai, inspection robots UAE, personal assistants Dubai, UAE robotics, Middle East AI, Dubai robotics, digital media Dubai, content creation UAE, digital marketing Dubai, innovative media UAE, digital content Dubai, media technology UAE, luxury car rental UAE, vehicle rental Dubai, UAE car hire, premium rental cars Dubai, Middle East car rental, automotive rental services UAE, multi-brand vehicles Dubai, automotive hub UAE, vehicle selection Dubai, Middle East vehicles, quality vehicles UAE, automotive group UAE, electric vehicles UAE, hybrid cars UAE, Chinese car brands UAE, Dubai-based conglomerate, customer-first business group, tourism services UAE, luxury travel Dubai, UAE tourism, Middle East travel, premium tours Dubai, travel experiences UAE, tourism solutions Dubai, Legend Holding Group travel, travel and tourism company UAE, MICE travel solutions UAE, corporate travel Dubai, inbound tourism UAE, Chinese tourism services Dubai, digital media Dubai, content creation UAE, digital marketing Dubai, innovative media UAE, digital content Dubai, media technology UAE, data-driven solutions Dubai, technology-driven enterprises Dubai, innovation-focused companies, Dubai-based conglomerate, robotics company UAE, AI solutions Dubai, artificial intelligence UAE, smart automation Dubai, service robots UAE, surveillance robots Dubai, inspection robots UAE, personal assistants Dubai, UAE robotics, Middle East AI, Dubai robotics, Legend Holding Group, automotive, energy, technology, travel, business, innovation, sustainability, UAE, Middle East',
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