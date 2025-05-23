-- Add status column to jobs table if it doesn't exist
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'jobs'
        AND column_name = 'status'
) THEN
ALTER TABLE jobs
ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
END IF;
END $$;
-- Update any existing rows to have 'active' status
UPDATE jobs
SET status = 'active'
WHERE status IS NULL;
-- Add check constraint to ensure status is either 'active' or 'inactive'
ALTER TABLE jobs
ADD CONSTRAINT jobs_status_check CHECK (status IN ('active', 'inactive'));