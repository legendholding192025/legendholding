-- Fix storage configuration for job application uploads
-- Run this script in your Supabase SQL editor

-- Ensure the applications bucket exists with proper configuration for public uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'applications', 
    'applications', 
    false, -- Keep private for security
    52428800, -- 50MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
) ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable upload for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for all users" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for resumes bucket" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for resumes bucket" ON storage.objects;

-- Create policies for applications bucket
-- Allow anyone to upload to applications bucket (for job applications)
CREATE POLICY "Enable upload for applications" ON storage.objects FOR
INSERT TO public WITH CHECK (
    bucket_id = 'applications' 
    AND (storage.foldername(name))[1] != 'private'
);

-- Allow authenticated users to download from applications bucket (for admin access)
CREATE POLICY "Enable download for applications" ON storage.objects FOR
SELECT TO authenticated USING (
    bucket_id = 'applications'
);

-- Allow authenticated users to update files in applications bucket
CREATE POLICY "Enable update for applications" ON storage.objects FOR
UPDATE TO authenticated USING (
    bucket_id = 'applications'
) WITH CHECK (
    bucket_id = 'applications'
);

-- Allow authenticated users to delete files in applications bucket
CREATE POLICY "Enable delete for applications" ON storage.objects FOR
DELETE TO authenticated USING (
    bucket_id = 'applications'
);

-- Also ensure the resumes bucket exists as fallback
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'resumes', 
    'resumes', 
    false, 
    52428800, -- 50MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
) ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create policies for resumes bucket as well
CREATE POLICY "Enable upload for resumes" ON storage.objects FOR
INSERT TO public WITH CHECK (
    bucket_id = 'resumes' 
    AND (storage.foldername(name))[1] != 'private'
);

CREATE POLICY "Enable download for resumes" ON storage.objects FOR
SELECT TO authenticated USING (
    bucket_id = 'resumes'
);

-- Verify the configuration
SELECT 
    id, 
    name, 
    public, 
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id IN ('applications', 'resumes');

-- Check existing policies
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
AND schemaname = 'storage'; 