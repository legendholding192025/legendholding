# Fix "Bucket not found" Error

## Problem
You're getting a `{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}` error when trying to download or view files.

## Solution

The `workflow-documents` storage bucket doesn't exist in your Supabase project. You need to create it.

### Option 1: Run the Migration (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Run the migration file: `supabase/migrations/20250101000001_ensure_workflow_storage_bucket.sql`

Or if you're using Supabase CLI:
```bash
supabase db push
```

### Option 2: Create Manually via Supabase Dashboard

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Set the following:
   - **Name**: `workflow-documents`
   - **Public bucket**: ✅ Enabled (checked)
   - **File size limit**: 100 MB (104857600 bytes)
   - **Allowed MIME types**: 
     - `application/pdf`
     - `application/msword`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
     - `application/vnd.ms-excel`
     - `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
     - `application/vnd.ms-powerpoint`
     - `application/vnd.openxmlformats-officedocument.presentationml.presentation`
5. Click **Create bucket**

### Option 3: Run SQL Directly

Go to **SQL Editor** in Supabase Dashboard and run:

```sql
-- Create storage bucket for workflow documents
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
)
ON CONFLICT (id) DO NOTHING;

-- Create policies
CREATE POLICY "Anyone can upload workflow documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'workflow-documents');

CREATE POLICY "Anyone can read workflow documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'workflow-documents');

CREATE POLICY "Authenticated users can delete workflow documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'workflow-documents');
```

## Verify

After creating the bucket:

1. Go to **Storage** → **workflow-documents** in Supabase Dashboard
2. You should see the bucket exists
3. Try uploading a file through the workflow form
4. Try downloading/viewing a file - it should work now

## Note

If you have existing submissions with file URLs, they may not work until you re-upload the files. The bucket needs to exist before files can be stored and accessed.

