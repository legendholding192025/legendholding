-- Fix storage bucket configuration for resume previews
-- Run this script in your Supabase SQL editor

-- First, let's check current bucket configuration
SELECT 
    id, 
    name, 
    public, 
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id IN ('applications', 'resumes');

-- Set resumes bucket to public for preview functionality
UPDATE storage.buckets 
SET public = true 
WHERE id = 'resumes';

-- Set applications bucket to public for preview functionality  
UPDATE storage.buckets 
SET public = true 
WHERE id = 'applications';

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow authenticated users to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to resumes" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for all users" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for resumes bucket" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for resumes bucket" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for applications" ON storage.objects;
DROP POLICY IF EXISTS "Enable download for applications" ON storage.objects;

-- Create new comprehensive policies for both buckets
-- Allow anyone to upload to resumes bucket
CREATE POLICY "public_resume_upload" ON storage.objects
    FOR INSERT 
    TO public
    WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read from resumes bucket  
CREATE POLICY "public_resume_read" ON storage.objects
    FOR SELECT 
    TO public
    USING (bucket_id = 'resumes');

-- Allow anyone to upload to applications bucket
CREATE POLICY "public_applications_upload" ON storage.objects
    FOR INSERT 
    TO public
    WITH CHECK (bucket_id = 'applications');

-- Allow anyone to read from applications bucket
CREATE POLICY "public_applications_read" ON storage.objects
    FOR SELECT 
    TO public
    USING (bucket_id = 'applications');

-- Allow admins to delete files from both buckets
CREATE POLICY "admin_resume_delete" ON storage.objects
    FOR DELETE 
    TO authenticated
    USING (
        bucket_id IN ('resumes', 'applications') 
        AND auth.uid() IN (
            SELECT user_id FROM user_roles 
            WHERE role IN ('admin', 'super_admin')
        )
    );

-- Verify the final configuration
SELECT 
    id, 
    name, 
    public, 
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id IN ('applications', 'resumes');

-- Show all policies for storage objects
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
    AND policyname LIKE '%resume%' OR policyname LIKE '%application%'; 