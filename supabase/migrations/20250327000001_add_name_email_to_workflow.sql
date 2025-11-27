-- Add name and email columns to workflow_submissions table
ALTER TABLE workflow_submissions
ADD COLUMN name TEXT NOT NULL DEFAULT '',
ADD COLUMN email TEXT NOT NULL DEFAULT '';

-- Remove default values after adding columns
ALTER TABLE workflow_submissions
ALTER COLUMN name DROP DEFAULT,
ALTER COLUMN email DROP DEFAULT;

-- Add index for email for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_submissions_email ON workflow_submissions(email);

-- Update the insert policy comment to reflect new required fields
COMMENT ON TABLE workflow_submissions IS 'Stores workflow document submissions with user information (name, email), subject, message, and optional file attachments';

