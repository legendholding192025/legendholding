-- Create contact_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    subject VARCHAR NOT NULL,
    message TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE
);
-- Add indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_resolved ON contact_submissions(resolved);
-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- Create policies
CREATE POLICY "Enable insert access for all users" ON contact_submissions FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for authenticated users" ON contact_submissions FOR
SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users" ON contact_submissions FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);