import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { generatePageMetadata } from '@/config/metadata';

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  image_url: string
  category: string
  author: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  seo_image_url?: string
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data: article } = await supabase
      .from('news_articles')
      .select('title, excerpt, image_url, category, author, seo_title, seo_description, seo_keywords, seo_image_url')
      .eq('id', params.id)
      .eq('published', true)
      .single();

    if (!article) {
      return generatePageMetadata({
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
        keywords: 'Legend Holding Group, news, article',
      });
    }

    // Use SEO fields if available, otherwise fall back to default fields
    const seoTitle = article.seo_title || article.title;
    const seoDescription = article.seo_description || article.excerpt;
    const seoKeywords = article.seo_keywords || `Legend Holding Group, ${article.category}, news, article, ${article.author}`;
    const seoImageUrl = article.seo_image_url || article.image_url;

    return generatePageMetadata({
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords,
      imageUrl: seoImageUrl,
    });
  } catch (error) {
    console.error('Error generating metadata for article:', error);
    
    return generatePageMetadata({
      title: 'News Article',
      description: 'Legend Holding Group news and updates.',
      keywords: 'Legend Holding Group, news, updates, articles',
    });
  }
}

export default function NewsArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 