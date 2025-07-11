-- Check current bucket configuration
SELECT 
    id, 
    name, 
    public, 
    file_size_limit,
    allowed_mime_types,
    created_at,
    updated_at
FROM storage.buckets 
WHERE id IN ('applications', 'resumes')
ORDER BY name; 