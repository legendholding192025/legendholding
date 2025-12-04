-- Add submitter_signature column to workflow_submissions table
ALTER TABLE workflow_submissions 
ADD COLUMN IF NOT EXISTS submitter_signature TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN workflow_submissions.submitter_signature IS 'Base64 encoded signature image data from the document submitter';

