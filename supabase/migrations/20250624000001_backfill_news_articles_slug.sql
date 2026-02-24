-- Backfill slug for ALL news articles: article-1, article-2, ... (by created_at order)
-- Run after 20250624000000_add_news_articles_slug.sql
-- Overwrites any existing slug (e.g. headline-based) so every article uses article-N.

WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM news_articles
)
UPDATE news_articles n
SET slug = 'article-' || numbered.rn
FROM numbered
WHERE n.id = numbered.id;
