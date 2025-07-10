-- Add support for multiple images in news articles

-- Create news_article_images table
CREATE TABLE news_article_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES news_articles(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER NOT NULL DEFAULT 1,
    image_type TEXT NOT NULL DEFAULT 'content' CHECK (image_type IN ('banner', 'content')),
    alt_text TEXT,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX idx_news_article_images_article_id ON news_article_images(article_id);
CREATE INDEX idx_news_article_images_order ON news_article_images(article_id, image_order);
CREATE INDEX idx_news_article_images_type ON news_article_images(article_id, image_type);

-- Enable RLS on the new table
ALTER TABLE news_article_images ENABLE ROW LEVEL SECURITY;

-- Create policies for news_article_images
CREATE POLICY "Enable read access for all users" ON news_article_images FOR SELECT USING (true);
CREATE POLICY "Enable insert/update/delete for authenticated users only" ON news_article_images FOR ALL USING (auth.role() = 'authenticated');

-- Migrate existing image_url data to the new table
INSERT INTO news_article_images (article_id, image_url, image_order, image_type, alt_text)
SELECT 
    id as article_id,
    image_url,
    1 as image_order,
    'banner' as image_type,
    title || ' - Banner Image' as alt_text
FROM news_articles 
WHERE image_url IS NOT NULL AND image_url != '';

-- Make the old image_url column optional since we're moving to the new structure
-- We'll keep it for backward compatibility but it's no longer required
ALTER TABLE news_articles ALTER COLUMN image_url DROP NOT NULL;

-- Add a comment to the old column
COMMENT ON COLUMN news_articles.image_url IS 'Deprecated: Use news_article_images table instead. Kept for backward compatibility.'; 