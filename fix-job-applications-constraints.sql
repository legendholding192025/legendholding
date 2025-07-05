-- Fix job applications table constraints and ensure proper schema
-- Run this script in your Supabase SQL editor

-- First, let's check the current table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'job_applications' 
ORDER BY ordinal_position;

-- Check current constraints
SELECT conname, contype, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'job_applications'::regclass;

-- Drop any conflicting status constraints
ALTER TABLE job_applications 
DROP CONSTRAINT IF EXISTS job_applications_status_check;

-- Add the correct status constraint with all valid values
ALTER TABLE job_applications 
ADD CONSTRAINT job_applications_status_check 
CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired'));

-- Ensure the status column has a default value
ALTER TABLE job_applications 
ALTER COLUMN status SET DEFAULT 'pending';

-- Update any existing applications with invalid status values
UPDATE job_applications 
SET status = 'pending' 
WHERE status IS NULL OR status NOT IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired');

-- Ensure all required columns are properly set
ALTER TABLE job_applications 
ALTER COLUMN full_name SET NOT NULL,
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN phone SET NOT NULL,
ALTER COLUMN resume_url SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON job_applications(email);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications(status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON job_applications(created_at DESC);

-- Verify the fixes
SELECT 
    id, 
    full_name, 
    email, 
    status, 
    created_at 
FROM job_applications 
ORDER BY created_at DESC 
LIMIT 5;

-- Check for any remaining constraint issues
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'job_applications'::regclass; 