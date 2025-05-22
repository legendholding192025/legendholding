-- Create messages table
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    resolved BOOLEAN DEFAULT false
);
-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON messages FOR
SELECT TO authenticated USING (true);
CREATE POLICY "Enable delete access for authenticated users" ON messages FOR DELETE TO authenticated USING (true);
CREATE POLICY "Enable insert access for authenticated users" ON messages FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update access for authenticated users" ON messages FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
-- Add indexes
CREATE INDEX messages_created_at_idx ON messages (created_at DESC);
CREATE INDEX messages_resolved_idx ON messages (resolved);