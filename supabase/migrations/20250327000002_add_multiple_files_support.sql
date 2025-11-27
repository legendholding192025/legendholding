-- Add files column to support multiple file uploads
-- Remove old single file columns and add new JSONB column for multiple files

ALTER TABLE workflow_submissions
ADD COLUMN files JSONB DEFAULT '[]'::jsonb;

-- Migrate existing single file data to the new files array format
UPDATE workflow_submissions
SET files = 
  CASE 
    WHEN file_name IS NOT NULL AND file_url IS NOT NULL THEN
      jsonb_build_array(
        jsonb_build_object(
          'fileName', file_name,
          'fileUrl', file_url,
          'fileType', file_type,
          'fileSize', file_size
        )
      )
    ELSE '[]'::jsonb
  END
WHERE file_name IS NOT NULL;

-- Drop old single file columns (optional - uncomment if you want to remove them)
-- ALTER TABLE workflow_submissions
-- DROP COLUMN file_name,
-- DROP COLUMN file_url,
-- DROP COLUMN file_type,
-- DROP COLUMN file_size;

-- Add index for better query performance on files column
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_files ON workflow_submissions USING GIN (files);

-- Update table comment
COMMENT ON COLUMN workflow_submissions.files IS 'Array of uploaded files stored as JSONB, each containing fileName, fileUrl, fileType, and fileSize';

