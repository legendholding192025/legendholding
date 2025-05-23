-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON jobs;
DROP POLICY IF EXISTS "Enable insert/update/delete for authenticated users only" ON jobs;
-- Create new policies with proper public access
CREATE POLICY "Enable public read access for active jobs" ON jobs FOR
SELECT USING (status = 'active');
CREATE POLICY "Enable authenticated users full access" ON jobs FOR ALL USING (auth.role() = 'authenticated');
-- Enable RLS on the jobs table
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
-- Grant necessary permissions
GRANT SELECT ON jobs TO anon;
GRANT SELECT ON jobs TO authenticated;
GRANT ALL ON jobs TO authenticated;