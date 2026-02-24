-- Add slug column for news URLs: article-1, article-2, ...
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS slug TEXT;

-- Unique index so slug is unique when set (NULLs allowed for legacy rows)
CREATE UNIQUE INDEX IF NOT EXISTS news_articles_slug_key ON news_articles (slug) WHERE slug IS NOT NULL;
