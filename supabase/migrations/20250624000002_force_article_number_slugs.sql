-- Force every news article to use article-1, article-2, ... (overwrite any headline-based slugs)
-- Run this if some articles still have old headline slugs and you want all to use article-N.

WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM news_articles
)
UPDATE news_articles n
SET slug = 'article-' || numbered.rn
FROM numbered
WHERE n.id = numbered.id;
