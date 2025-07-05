-- Fix job applications with null or undefined status values
-- Run this script in your Supabase SQL editor

-- Update any job applications with null status to 'pending'
UPDATE job_applications 
SET status = 'pending' 
WHERE status IS NULL OR status = '';

-- Ensure the status column has proper constraints
ALTER TABLE job_applications 
ALTER COLUMN status SET DEFAULT 'pending';

-- Add a check constraint to ensure status is one of the valid values
ALTER TABLE job_applications 
DROP CONSTRAINT IF EXISTS job_applications_status_check;

ALTER TABLE job_applications 
ADD CONSTRAINT job_applications_status_check 
CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired'));

-- Verify the fix
SELECT id, full_name, email, status, created_at 
FROM job_applications 
ORDER BY created_at DESC 
LIMIT 10; 