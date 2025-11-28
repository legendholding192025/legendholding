-- Create storage bucket for workflow documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('workflow-documents', 'workflow-documents', true)
ON CONFLICT (id) DO NOTHING;

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

