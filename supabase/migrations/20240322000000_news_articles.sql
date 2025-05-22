-- Create news articles table
CREATE TABLE news_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    read_time TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true
);
-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
-- Create policies
CREATE POLICY "Enable read access for all users" ON news_articles FOR
SELECT USING (published = true);
CREATE POLICY "Enable insert access for authenticated users only" ON news_articles FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update access for authenticated users only" ON news_articles FOR
UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete access for authenticated users only" ON news_articles FOR DELETE TO authenticated USING (true);