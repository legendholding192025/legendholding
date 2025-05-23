-- Create a new table for job applications
CREATE TABLE job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    cv_url TEXT NOT NULL,
    cover_letter TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
-- Create an index on job_id for faster lookups
CREATE INDEX job_applications_job_id_idx ON job_applications(job_id);
-- Create an index on status for filtering
CREATE INDEX job_applications_status_idx ON job_applications(status);
-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = TIMEZONE('utc'::text, NOW());
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_job_applications_updated_at BEFORE
UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();