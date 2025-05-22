-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON contact_submissions FOR
SELECT TO authenticated USING (true);
CREATE POLICY "Enable delete access for authenticated users" ON contact_submissions FOR DELETE TO authenticated USING (true);
CREATE POLICY "Enable insert access for all users" ON contact_submissions FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for authenticated users" ON contact_submissions FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);