-- Add review timestamp columns to existing workflow_submissions table
-- Run this migration if the table already exists

-- Add new columns if they don't exist
DO $$ 
BEGIN
  -- Add finance_reviewed_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workflow_submissions' 
    AND column_name = 'finance_reviewed_at'
  ) THEN
    ALTER TABLE workflow_submissions ADD COLUMN finance_reviewed_at TIMESTAMPTZ;
  END IF;

  -- Add cofounder_reviewed_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workflow_submissions' 
    AND column_name = 'cofounder_reviewed_at'
  ) THEN
    ALTER TABLE workflow_submissions ADD COLUMN cofounder_reviewed_at TIMESTAMPTZ;
  END IF;

  -- Add founder_reviewed_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workflow_submissions' 
    AND column_name = 'founder_reviewed_at'
  ) THEN
    ALTER TABLE workflow_submissions ADD COLUMN founder_reviewed_at TIMESTAMPTZ;
  END IF;
END $$;

-- Update any existing status values to new format if needed
-- This is safe to run multiple times
UPDATE workflow_submissions 
SET status = 'finance_rejected' 
WHERE status = 'rejected';

UPDATE workflow_submissions 
SET status = 'approved' 
WHERE status = 'approved';

-- No need to modify 'pending' or other statuses

