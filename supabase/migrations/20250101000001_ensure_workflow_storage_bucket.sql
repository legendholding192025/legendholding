-- Ensure storage bucket for workflow documents exists
-- This migration ensures the bucket is created if it doesn't exist

DO $$
BEGIN
  -- Check if bucket exists, if not create it
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'workflow-documents'
  ) THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'workflow-documents', 
      'workflow-documents', 
      true,
      104857600, -- 100MB limit
      ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ]
    );
  END IF;
END $$;

-- Drop existing policies if they exist to recreate them
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

