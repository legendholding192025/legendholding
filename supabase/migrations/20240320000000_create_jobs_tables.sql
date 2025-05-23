-- Create jobs table
CREATE TABLE jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT [] NOT NULL DEFAULT '{}',
    responsibilities TEXT [] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
-- Create job_applications table
CREATE TABLE job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    cover_letter TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', false);
-- Create policies for jobs table
CREATE POLICY "Enable read access for all users" ON jobs FOR
SELECT USING (status = 'active');
CREATE POLICY "Enable insert/update/delete for authenticated users only" ON jobs FOR ALL USING (auth.role() = 'authenticated');
-- Create policies for job_applications table
CREATE POLICY "Enable insert for all users" ON job_applications FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable read/update/delete for authenticated users only" ON job_applications FOR ALL USING (auth.role() = 'authenticated');
-- Create policy for storage bucket
CREATE POLICY "Enable upload for all users" ON storage.objects FOR
INSERT WITH CHECK (bucket_id = 'applications');
CREATE POLICY "Enable download for authenticated users" ON storage.objects FOR
SELECT USING (
        bucket_id = 'applications'
        AND auth.role() = 'authenticated'
    );
-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = TIMEZONE('utc', NOW());
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_jobs_updated_at BEFORE
UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE
UPDATE ON job_applications FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();