-- Test storage bucket access and configuration
-- Run this script in your Supabase SQL editor

-- Check if storage buckets exist
SELECT 
    id, 
    name, 
    public, 
    file_size_limit,
    allowed_mime_types,
    created_at
FROM storage.buckets 
ORDER BY created_at DESC;

-- Check storage policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Test if we can insert into storage.objects (this will fail but show the error)
-- This is just to test the policies
SELECT 
    'Testing storage access...' as test_message,
    COUNT(*) as existing_objects
FROM storage.objects 
WHERE bucket_id IN ('applications', 'resumes')
LIMIT 1; 