-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE,
    submission_id UUID REFERENCES contact_submissions(id) ON DELETE CASCADE
);
-- Add indexes
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_submission_id ON notifications(submission_id);
-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON notifications FOR
SELECT TO authenticated USING (true);
CREATE POLICY "Enable insert for all users" ON notifications FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON notifications FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);