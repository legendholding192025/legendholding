-- Fix existing job applications with incorrect status values
-- Run this script in your Supabase SQL editor

-- Update old status values to new ones
UPDATE job_applications 
SET status = 'reviewed' 
WHERE status = 'reviewing';

UPDATE job_applications 
SET status = 'shortlisted' 
WHERE status = 'accepted';

-- Verify the changes
SELECT 
    id, 
    full_name, 
    email, 
    status,
    created_at
FROM job_applications 
ORDER BY created_at DESC 
LIMIT 10;

-- Check status distribution
SELECT 
    status, 
    COUNT(*) as count
FROM job_applications 
GROUP BY status 
ORDER BY count DESC; 