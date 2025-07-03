-- Add publication_date column to news_articles table
ALTER TABLE news_articles 
ADD COLUMN publication_date DATE DEFAULT CURRENT_DATE;

-- Update existing articles to use created_at as publication_date
UPDATE news_articles 
SET publication_date = DATE(created_at) 
WHERE publication_date IS NULL;

-- Make publication_date NOT NULL after setting default values
ALTER TABLE news_articles 
ALTER COLUMN publication_date SET NOT NULL; 