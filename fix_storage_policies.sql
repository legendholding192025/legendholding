-- Fix storage policies for workflow-documents bucket
-- Run this in Supabase SQL Editor if files are not accessible

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can upload workflow documents" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read workflow documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete workflow documents" ON storage.objects;

-- Policy for uploading workflow documents (anyone can upload)
CREATE POLICY "Anyone can upload workflow documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'workflow-documents'
);

-- Policy for reading workflow documents (anyone can read)
CREATE POLICY "Anyone can read workflow documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'workflow-documents');

-- Policy for deleting workflow documents (authenticated users only)
CREATE POLICY "Authenticated users can delete workflow documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'workflow-documents');

