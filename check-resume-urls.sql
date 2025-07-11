-- Check resume URL formats in the database
SELECT 
    id,
    full_name,
    email,
    resume_url,
    CASE 
        WHEN resume_url LIKE 'data:%' THEN 'BASE64'
        WHEN resume_url LIKE 'http%' THEN 'FULL_URL'
        WHEN resume_url LIKE '/%' THEN 'PATH_WITH_SLASH'
        ELSE 'RELATIVE_PATH'
    END as url_type,
    LENGTH(resume_url) as url_length,
    created_at
FROM job_applications 
ORDER BY created_at DESC 
LIMIT 5; 