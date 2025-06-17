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
  description: 'Legend Holding Group - Building a sustainable future through innovation and excellence',
  keywords: 'Legend Holding Group, Business, Innovation, Sustainability',
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
        alt: 'Legend Holding Group',
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