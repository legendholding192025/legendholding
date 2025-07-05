-- Fix existing job applications with public URLs instead of file paths
-- Run this script in your Supabase SQL editor

-- Update resume_url to extract file path from public URLs
UPDATE job_applications 
SET resume_url = 
  CASE 
    WHEN resume_url LIKE 'https://%' THEN
      -- Extract the file path from the URL
      SUBSTRING(
        resume_url FROM 
        POSITION('/storage/v1/object/public/' IN resume_url) + 28
      )
    WHEN resume_url LIKE 'http://%' THEN
      -- Extract the file path from the URL
      SUBSTRING(
        resume_url FROM 
        POSITION('/storage/v1/object/public/' IN resume_url) + 28
      )
    ELSE resume_url
  END
WHERE resume_url LIKE 'http%';

-- Also fix any resume_url that might have the bucket name included
UPDATE job_applications 
SET resume_url = 
  CASE 
    WHEN resume_url LIKE 'applications/%' THEN
      SUBSTRING(resume_url FROM 13) -- Remove 'applications/' prefix
    WHEN resume_url LIKE 'resumes/%' THEN
      SUBSTRING(resume_url FROM 8) -- Remove 'resumes/' prefix
    ELSE resume_url
  END
WHERE resume_url LIKE 'applications/%' OR resume_url LIKE 'resumes/%';

-- Verify the changes
SELECT 
    id, 
    full_name, 
    email, 
    resume_url,
    created_at
FROM job_applications 
ORDER BY created_at DESC 
LIMIT 10; 